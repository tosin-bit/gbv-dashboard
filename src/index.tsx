import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer for HTML responses
app.use(renderer)

// API Routes for GBV Dashboard

// Get Dashboard Statistics
app.get('/api/stats', async (c) => {
  const { env } = c;
  
  try {
    // Get total cases by status
    const totalCasesResult = await env.DB.prepare(`
      SELECT 
        case_status,
        COUNT(*) as count
      FROM gbv_cases 
      GROUP BY case_status
    `).all();

    // Get cases by district (top 10)
    const casesByDistrictResult = await env.DB.prepare(`
      SELECT 
        d.name as district_name,
        COUNT(gc.id) as case_count
      FROM districts d
      LEFT JOIN gbv_cases gc ON d.id = gc.district_id
      GROUP BY d.id, d.name
      ORDER BY case_count DESC
      LIMIT 10
    `).all();

    // Get cases by GBV type
    const casesByTypeResult = await env.DB.prepare(`
      SELECT 
        gt.name as gbv_type,
        gt.category,
        COUNT(gc.id) as case_count
      FROM gbv_types gt
      LEFT JOIN gbv_cases gc ON gt.id = gc.gbv_type_id
      GROUP BY gt.id, gt.name, gt.category
      ORDER BY case_count DESC
    `).all();

    // Get monthly trends (last 6 months)
    const monthlyTrendsResult = await env.DB.prepare(`
      SELECT 
        year,
        month,
        SUM(total_cases) as total_cases
      FROM monthly_stats
      WHERE year >= 2024 AND month >= 5
      GROUP BY year, month
      ORDER BY year, month
    `).all();

    // Get service providers count
    const serviceProvidersResult = await env.DB.prepare(`
      SELECT 
        type,
        COUNT(*) as count
      FROM service_providers
      WHERE active = TRUE
      GROUP BY type
    `).all();

    const stats = {
      totalCases: totalCasesResult.results?.reduce((sum: number, row: any) => sum + row.count, 0) || 0,
      casesByStatus: totalCasesResult.results || [],
      casesByDistrict: casesByDistrictResult.results || [],
      casesByType: casesByTypeResult.results || [],
      monthlyTrends: monthlyTrendsResult.results || [],
      serviceProviders: serviceProvidersResult.results || []
    };

    return c.json({ stats, loading: false });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch statistics', loading: false }, 500);
  }
});

// Get Districts
app.get('/api/districts', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        d.id,
        d.name,
        d.code,
        d.population,
        d.latitude,
        d.longitude,
        COUNT(gc.id) as case_count
      FROM districts d
      LEFT JOIN gbv_cases gc ON d.id = gc.district_id
      GROUP BY d.id, d.name, d.code, d.population, d.latitude, d.longitude
      ORDER BY d.name
    `).all();

    return c.json({ districts: result.results || [] });
  } catch (error) {
    console.error('Error fetching districts:', error);
    return c.json({ error: 'Failed to fetch districts' }, 500);
  }
});

// Get district report
app.get('/api/districts/:districtId/report', async (c) => {
  const { env } = c;
  const districtId = c.req.param('districtId');
  
  try {
    // Get district summary
    const summary = await env.DB.prepare(`
      SELECT COUNT(*) as total_cases
      FROM gbv_cases
      WHERE district_id = ?
    `).bind(districtId).first();
    
    // Get monthly trends (last 6 months)
    const monthlyTrends = await env.DB.prepare(`
      SELECT 
        strftime('%Y-%m', incident_date) as month,
        COUNT(*) as case_count
      FROM gbv_cases
      WHERE district_id = ?
        AND incident_date >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', incident_date)
      ORDER BY month
    `).bind(districtId).all();
    
    // Get case outcomes
    const outcomes = await env.DB.prepare(`
      SELECT 
        SUM(CASE WHEN case_status = 'reported' THEN 1 ELSE 0 END) as reported,
        SUM(CASE WHEN case_status = 'under_investigation' THEN 1 ELSE 0 END) as investigating,
        SUM(CASE WHEN case_status = 'resolved' THEN 1 ELSE 0 END) as resolved,
        SUM(CASE WHEN case_status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM gbv_cases
      WHERE district_id = ?
    `).bind(districtId).first();
    
    // Service providers placeholder (would need service providers table)
    const serviceProviders = [];
    
    return c.json({
      summary: summary,
      monthly_trends: monthlyTrends.results || [],
      outcomes: outcomes,
      service_providers: serviceProviders
    });
  } catch (error) {
    console.error('Error fetching district report:', error);
    return c.json({ error: 'Failed to fetch district report' }, 500);
  }
});

// Get Cases (with pagination and filters)
app.get('/api/cases', async (c) => {
  const { env } = c;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const district = c.req.query('district');
  const status = c.req.query('status');
  const offset = (page - 1) * limit;

  try {
    let whereClause = '1=1';
    const params: any[] = [];

    if (district && district !== 'all') {
      whereClause += ' AND gc.district_id = ?';
      params.push(district);
    }

    if (status && status !== 'all') {
      whereClause += ' AND gc.case_status = ?';
      params.push(status);
    }

    const result = await env.DB.prepare(`
      SELECT 
        gc.id,
        gc.case_number,
        gc.incident_date,
        gc.reported_date,
        gt.name as violence_types,
        d.name as district_name,
        gc.survivor_age_group,
        gc.survivor_gender,
        gc.case_status,
        gc.priority_level
      FROM gbv_cases gc
      LEFT JOIN districts d ON gc.district_id = d.id
      LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
      WHERE ${whereClause}
      ORDER BY gc.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...params, limit, offset).all();

    // Get total count for pagination
    const countResult = await env.DB.prepare(`
      SELECT COUNT(*) as total
      FROM gbv_cases gc
      WHERE ${whereClause}
    `).bind(...params).first();

    return c.json({
      cases: result.results || [],
      pagination: {
        page,
        limit,
        total: countResult?.total || 0,
        totalPages: Math.ceil((countResult?.total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return c.json({ error: 'Failed to fetch cases' }, 500);
  }
});

// Get Service Providers
app.get('/api/service-providers', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        sp.id,
        sp.name,
        sp.type,
        sp.contact_person,
        sp.phone,
        sp.email,
        d.name as district_name,
        sp.services_offered
      FROM service_providers sp
      LEFT JOIN districts d ON sp.district_id = d.id
      WHERE sp.active = TRUE
      ORDER BY sp.name
    `).all();

    return c.json({ serviceProviders: result.results || [] });
  } catch (error) {
    console.error('Error fetching service providers:', error);
    return c.json({ error: 'Failed to fetch service providers' }, 500);
  }
});

// Authentication Endpoints

// Login
app.post('/api/auth/login', async (c) => {
  const { env } = c;
  
  try {
    const { username, password } = await c.req.json();
    
    // Fetch user with service provider info
    const user = await env.DB.prepare(`
      SELECT u.*, sp.name as service_provider_name, sp.type as service_provider_type
      FROM users u
      LEFT JOIN service_providers sp ON u.service_provider_id = sp.id
      WHERE u.username = ? AND u.active = 1
    `).bind(username).first();
    
    if (!user) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }
    
    // Verify password (in production, use proper password hashing like bcrypt)
    // For demo purposes, we're using plain text comparison
    if (!user.password_hash || password !== user.password_hash) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }
    
    // Create session
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await env.DB.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `).bind(sessionId, user.id, expiresAt.toISOString()).run();
    
    return c.json({
      success: true,
      session_id: sessionId,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.name, // Map 'name' from DB to 'full_name' for frontend
        name: user.name,
        email: user.email,
        organization: user.organization,
        service_provider_name: user.service_provider_name,
        service_provider_type: user.service_provider_type
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ success: false, error: 'Login failed' }, 500);
  }
});

// Logout
app.post('/api/auth/logout', async (c) => {
  const { env } = c;
  
  try {
    const { session_id } = await c.req.json();
    await env.DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(session_id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ success: false, error: 'Logout failed' }, 500);
  }
});

// Session validation
app.get('/api/auth/session/:sessionId', async (c) => {
  const { env } = c;
  const sessionId = c.req.param('sessionId');
  
  try {
    const session = await env.DB.prepare(`
      SELECT s.*, u.id as user_id, u.username, u.role, u.name, u.email, u.organization,
             sp.name as service_provider_name, sp.type as service_provider_type
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN service_providers sp ON u.service_provider_id = sp.id
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `).bind(sessionId).first();
    
    if (!session) {
      return c.json({ valid: false, user: null });
    }
    
    return c.json({
      valid: true,
      user: {
        id: session.user_id,
        username: session.username,
        role: session.role,
        full_name: session.name,
        name: session.name,
        email: session.email,
        organization: session.organization,
        service_provider_name: session.service_provider_name,
        service_provider_type: session.service_provider_type
      }
    });
  } catch (error) {
    console.error('Session validation error:', error);
    return c.json({ valid: false, user: null }, 500);
  }
});

// Get cases assigned to current user (for Rainbo/Police portals)
app.get('/api/my-cases', async (c) => {
  const { env } = c;
  const sessionId = c.req.header('X-Session-ID');
  
  if (!sessionId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Validate session
    const session = await env.DB.prepare(`
      SELECT u.id, u.role, u.service_provider_id
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `).bind(sessionId).first();
    
    if (!session) {
      return c.json({ error: 'Invalid session' }, 401);
    }
    
    // Fetch cases based on role
    let cases;
    if (session.role === 'rainbo_staff') {
      // Get cases referred to this Rainbo center - for now show all cases
      cases = await env.DB.prepare(`
        SELECT gc.*, d.name as district_name, gt.name as violence_types
        FROM gbv_cases gc
        LEFT JOIN districts d ON gc.district_id = d.id
        LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
        ORDER BY gc.created_at DESC
        LIMIT 50
      `).all();
    } else if (session.role === 'police_fsu') {
      // Get cases for police investigation
      cases = await env.DB.prepare(`
        SELECT gc.*, d.name as district_name, gt.name as violence_types
        FROM gbv_cases gc
        LEFT JOIN districts d ON gc.district_id = d.id
        LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
        WHERE gc.case_status IN ('reported', 'under_investigation')
        ORDER BY gc.created_at DESC
        LIMIT 50
      `).all();
    } else {
      // Admin sees all cases
      cases = await env.DB.prepare(`
        SELECT gc.*, d.name as district_name, gt.name as violence_types
        FROM gbv_cases gc
        LEFT JOIN districts d ON gc.district_id = d.id
        LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
        ORDER BY gc.created_at DESC
        LIMIT 50
      `).all();
    }
    
    return c.json({ cases: cases.results || [] });
  } catch (error) {
    console.error('Error fetching my cases:', error);
    return c.json({ error: 'Failed to fetch cases' }, 500);
  }
});

// Create New Case
app.post('/api/cases', async (c) => {
  const { env } = c;
  let formData: any = null;
  
  try {
    formData = await c.req.json();
    
    console.log('📋 Received form data:', JSON.stringify(formData, null, 2));
    
    // Helper to convert empty/null/undefined to null
    const n = (v: any) => (v === '' || v === undefined || v === null) ? null : v;
    
    // Generate case number
    const year = new Date().getFullYear();
    const count = await env.DB.prepare(`SELECT COUNT(*) as c FROM gbv_cases WHERE strftime('%Y', created_at) = ?`).bind(year.toString()).first();
    const caseNumber = `GBV-${year}-${String((count?.c || 0) + 1).padStart(4, '0')}`;
    
    // Get district ID
    let districtId: number = 1; // Default to first district
    
    // Handle both district_id (number) and district (name) fields
    if (formData.district_id) {
      districtId = parseInt(formData.district_id);
      console.log('✅ Using district_id:', districtId);
    } else if (formData.district) {
      if (typeof formData.district === 'string' && isNaN(parseInt(formData.district))) {
        // District name provided
        const d = await env.DB.prepare(`SELECT id FROM districts WHERE name = ?`).bind(formData.district).first();
        districtId = (d?.id as number) || 1;
        console.log('✅ Looked up district name:', formData.district, '→ ID:', districtId);
      } else {
        // District ID as string
        districtId = parseInt(formData.district);
        console.log('✅ Using district:', districtId);
      }
    }
    
    // Get GBV type ID
    let gbvTypeId = 1; // Default to Rape
    
    // Handle both old format (gbv_type_id as number) and new format (violence_types as array)
    if (formData.gbv_type_id) {
      // Old format: direct ID number
      gbvTypeId = parseInt(formData.gbv_type_id);
      console.log('✅ Using gbv_type_id:', gbvTypeId);
    } else if (formData.violence_types && Array.isArray(formData.violence_types) && formData.violence_types.length > 0) {
      // New format: array of violence type names
      const firstType = formData.violence_types[0];
      console.log('🔍 Looking up violence type:', firstType);
      const typeResult = await env.DB.prepare(`SELECT id FROM gbv_types WHERE name = ?`).bind(firstType).first();
      console.log('🔍 Database lookup result:', typeResult);
      if (typeResult) {
        gbvTypeId = typeResult.id as number;
        console.log('✅ Found GBV type ID:', gbvTypeId);
      } else {
        console.log('⚠️ Violence type not found in database, defaulting to Rape (ID 1)');
      }
    } else {
      console.log('⚠️ No violence type provided, defaulting to Rape (ID 1)');
    }
    
    // Map survivor age to age group
    let ageGroup = formData.survivor_age_group || '18-25'; // Use provided age group or default
    
    // If age_group not provided but age is, calculate it
    if (!formData.survivor_age_group && formData.survivor_age) {
      const age = parseInt(formData.survivor_age);
      if (age < 11) ageGroup = '0-10';
      else if (age < 16) ageGroup = '11-15';
      else if (age < 18) ageGroup = '16-17';
      else if (age < 26) ageGroup = '18-25';
      else if (age < 36) ageGroup = '26-35';
      else ageGroup = '36+';
    }
    
    // Create incident description from form data
    let incidentDesc = formData.incident_description || formData.case_notes || formData.additional_info || '';
    
    // If no description provided, create one from available data
    if (!incidentDesc) {
      const violenceTypesList = (formData.violence_types || []).join(', ');
      incidentDesc = `Violence Types: ${violenceTypesList}. Location: ${formData.location || formData.location_details || 'Not specified'}.`;
    }
    
    // Map location details  
    const locationDetails = formData.location_details || 
      `Chiefdom: ${formData.chiefdom || 'N/A'}, Location: ${formData.location || formData.specific_location || 'N/A'}`;
    
    // Insert using existing schema columns
    const result = await env.DB.prepare(`
      INSERT INTO gbv_cases (
        case_number, incident_date, reported_date, gbv_type_id, incident_description,
        district_id, location_details,
        survivor_age_group, survivor_gender, survivor_marital_status, survivor_disability,
        perpetrator_relationship, perpetrator_age_group, perpetrator_gender, number_of_perpetrators,
        reported_by, reporting_channel, case_status, priority_level,
        immediate_needs, services_required,
        created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      caseNumber,
      n(formData.incident_date) || new Date().toISOString().split('T')[0],
      new Date().toISOString().split('T')[0],
      gbvTypeId,
      incidentDesc || 'No description provided',
      districtId,
      locationDetails || 'No location details',
      ageGroup || '18-25',
      n(formData.survivor_gender) || 'Not Specified',
      n(formData.survivor_marital_status) || null,
      n(formData.survivor_disability) || null,
      n(formData.perpetrator_relationship) || null,
      n(formData.perpetrator_age_group) || null,
      n(formData.perpetrator_gender) || null,
      (formData.multiple_perpetrators === 'yes' || formData.multiple_perpetrators === 'Yes') ? 2 : 1,
      n(formData.reported_by) || 'Anonymous',
      n(formData.reporting_channel) || 'Web Form',
      'reported',
      n(formData.priority) || n(formData.priority_level) || 'medium',
      n(formData.urgency) || n(formData.immediate_needs) || 'routine',
      JSON.stringify(formData.services_needed || formData.services_required || []),
      1
    ).run();

    const caseId = result.meta.last_row_id;
    
    // AUTO-ASSIGN CASE TO RELEVANT ORGANIZATIONS
    try {
      // Get referral rules for this GBV type
      const rules = await env.DB.prepare(`
        SELECT * FROM case_referral_rules 
        WHERE (gbv_type_id = ? OR gbv_type_id IS NULL) 
        AND is_active = TRUE
      `).bind(gbvTypeId).all();
      
      console.log(`🔄 Auto-assigning case ${caseNumber} based on ${rules.results?.length || 0} rules`);
      
      for (const rule of (rules.results || [])) {
        // Create assignment
        await env.DB.prepare(`
          INSERT INTO case_assignments (
            case_id, organization_type, assignment_reason, priority, status
          ) VALUES (?, ?, ?, ?, 'pending')
        `).bind(
          caseId,
          rule.organization_type,
          rule.assignment_reason,
          rule.priority
        ).run();
        
        console.log(`✅ Assigned to ${rule.organization_type} with priority ${rule.priority}`);
        
        // Create notification for the organization
        const notificationTitle = `🚨 New Case Assignment: ${caseNumber}`;
        const violenceType = formData.violence_types?.[0] || 'GBV';
        const notificationMessage = `A new ${violenceType} case has been assigned to your organization. ` +
          `Priority: ${(rule.priority as string).toUpperCase()}. Immediate action required.`;
        
        await env.DB.prepare(`
          INSERT INTO case_notifications (
            case_id, notification_type, target_organization, title, message, priority, action_url
          ) VALUES (?, 'new_case', ?, ?, ?, ?, ?)
        `).bind(
          caseId,
          rule.organization_type,
          notificationTitle,
          notificationMessage,
          rule.priority,
          `/cases/${caseNumber}`
        ).run();
        
        console.log(`📢 Created notification for ${rule.organization_type}`);
      }
      
      // Create initial case update
      await env.DB.prepare(`
        INSERT INTO case_updates (
          case_id, update_type, update_category, title, description,
          created_by, created_by_organization, is_milestone
        ) VALUES (?, 'status_change', 'general', ?, ?, ?, 'ministry', TRUE)
      `).bind(
        caseId,
        'Case Created',
        `Case ${caseNumber} has been created and assigned to relevant organizations for action.`,
        1
      ).run();
      
      console.log(`✅ Case ${caseNumber} created with auto-assignments`);
    } catch (assignError) {
      console.error('Error during auto-assignment:', assignError);
      // Don't fail the whole request if assignment fails
    }

    return c.json({ 
      success: true, 
      case_id: caseId,
      case_number: caseNumber,
      message: `Case ${caseNumber} successfully recorded and assigned to relevant organizations.`
    });
  } catch (error) {
    console.error('Error creating case:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Form data received:', JSON.stringify(formData, null, 2));
    return c.json({ 
      success: false, 
      error: 'Failed to create case', 
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ==========================================
// ORGANIZATION-SPECIFIC API ENDPOINTS
// ==========================================

// Get cases assigned to an organization (Rainbo/Police FSU/etc.)
app.get('/api/organization/:orgType/cases', async (c) => {
  const { env } = c;
  const orgType = c.req.param('orgType'); // 'rainbo', 'police_fsu', etc.
  
  try {
    const query = `
      SELECT 
        c.id,
        c.case_number,
        c.incident_date,
        c.reported_date,
        gt.name as violence_type,
        gt.category as violence_category,
        d.name as district_name,
        c.survivor_age_group,
        c.survivor_gender,
        c.case_status,
        c.priority_level,
        ca.status as assignment_status,
        ca.assigned_at,
        ca.priority as assignment_priority,
        ca.id as assignment_id,
        ca.assignment_reason,
        -- Latest update
        (SELECT title FROM case_updates 
         WHERE case_id = c.id 
         ORDER BY created_at DESC LIMIT 1) as last_update_title,
        (SELECT created_at FROM case_updates 
         WHERE case_id = c.id 
         ORDER BY created_at DESC LIMIT 1) as last_update_at,
        -- Unread notifications
        (SELECT COUNT(*) FROM case_notifications 
         WHERE case_id = c.id 
         AND target_organization = ?
         AND is_read = FALSE) as unread_count
      FROM gbv_cases c
      INNER JOIN case_assignments ca ON c.id = ca.case_id
      LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
      LEFT JOIN districts d ON c.district_id = d.id
      WHERE ca.organization_type = ?
      ORDER BY 
        CASE WHEN ca.status = 'pending' THEN 1 
             WHEN ca.status = 'in_progress' THEN 2 
             ELSE 3 END,
        ca.priority = 'urgent' DESC,
        ca.priority = 'high' DESC,
        c.incident_date DESC
    `;
    
    const result = await env.DB.prepare(query).bind(orgType, orgType).all();
    
    const cases = result.results || [];
    const summary = {
      total: cases.length,
      pending: cases.filter((c: any) => c.assignment_status === 'pending').length,
      in_progress: cases.filter((c: any) => c.assignment_status === 'in_progress').length,
      completed: cases.filter((c: any) => c.assignment_status === 'completed').length,
      urgent: cases.filter((c: any) => c.assignment_priority === 'urgent').length
    };
    
    return c.json({ cases, summary });
  } catch (error) {
    console.error(`Error fetching ${orgType} cases:`, error);
    return c.json({ error: 'Failed to fetch cases' }, 500);
  }
});

// Get notifications for an organization
app.get('/api/organization/:orgType/notifications', async (c) => {
  const { env } = c;
  const orgType = c.req.param('orgType');
  const unreadOnly = c.req.query('unread_only') === 'true';
  
  try {
    const query = `
      SELECT 
        cn.*,
        c.case_number
      FROM case_notifications cn
      LEFT JOIN gbv_cases c ON cn.case_id = c.id
      WHERE cn.target_organization = ?
      ${unreadOnly ? 'AND cn.is_read = FALSE' : ''}
      AND (cn.expires_at IS NULL OR cn.expires_at > datetime('now'))
      ORDER BY 
        cn.priority = 'urgent' DESC,
        cn.priority = 'high' DESC,
        cn.created_at DESC
      LIMIT 100
    `;
    
    const result = await env.DB.prepare(query).bind(orgType).all();
    
    return c.json({
      notifications: result.results || [],
      unread_count: (result.results || []).filter((n: any) => !n.is_read).length
    });
  } catch (error) {
    console.error(`Error fetching ${orgType} notifications:`, error);
    return c.json({ error: 'Failed to fetch notifications' }, 500);
  }
});

// Mark notification as read
app.post('/api/notifications/:id/read', async (c) => {
  const { env } = c;
  const notificationId = c.req.param('id');
  
  try {
    await env.DB.prepare(`
      UPDATE case_notifications 
      SET is_read = TRUE, read_at = datetime('now')
      WHERE id = ?
    `).bind(notificationId).run();
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return c.json({ error: 'Failed to update notification' }, 500);
  }
});

// Update assignment status
app.post('/api/assignments/:id/status', async (c) => {
  const { env } = c;
  const assignmentId = c.req.param('id');
  const { status, user_id, notes } = await c.req.json();
  
  try {
    const timeField = status === 'accepted' ? ', accepted_at = datetime(\'now\')' : 
                     status === 'completed' ? ', completed_at = datetime(\'now\')' : '';
    
    await env.DB.prepare(`
      UPDATE case_assignments 
      SET status = ?, assigned_user_id = ?, notes = ? ${timeField}
      WHERE id = ?
    `).bind(status, user_id, notes || null, assignmentId).run();
    
    // Get case info for notification
    const assignment = await env.DB.prepare(`
      SELECT ca.*, c.case_number
      FROM case_assignments ca
      LEFT JOIN gbv_cases c ON ca.case_id = c.id
      WHERE ca.id = ?
    `).bind(assignmentId).first();
    
    // Notify ministry of status change
    if (assignment && status !== 'pending') {
      await env.DB.prepare(`
        INSERT INTO case_notifications (
          case_id, notification_type, target_organization, 
          title, message, priority
        ) VALUES (?, 'case_update', 'ministry', ?, ?, 'normal')
      `).bind(
        assignment.case_id,
        `${assignment.organization_type} updated Case ${assignment.case_number}`,
        `Status changed to: ${status.replace('_', ' ').toUpperCase()}`,
      ).run();
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating assignment status:', error);
    return c.json({ error: 'Failed to update assignment' }, 500);
  }
});

// Get case details with timeline
app.get('/api/cases/:caseNumber/details', async (c) => {
  const { env } = c;
  const caseNumber = c.req.param('caseNumber');
  const orgType = c.req.query('organization') || c.req.query('org_type'); // Optional: filter by organization
  
  try {
    // Get case info
    const caseInfo = await env.DB.prepare(`
      SELECT 
        c.*,
        gt.name as violence_type,
        gt.category as violence_category,
        d.name as district_name
      FROM gbv_cases c
      LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
      LEFT JOIN districts d ON c.district_id = d.id
      WHERE c.case_number = ?
    `).bind(caseNumber).first();
    
    if (!caseInfo) {
      return c.json({ error: 'Case not found' }, 404);
    }
    
    // Get assignments
    const assignmentsQuery = orgType 
      ? env.DB.prepare(`
          SELECT 
            ca.*,
            u.name as assigned_user_name
          FROM case_assignments ca
          LEFT JOIN users u ON ca.assigned_user_id = u.id
          WHERE ca.case_id = ? AND ca.organization_type = ?
          ORDER BY ca.priority DESC
        `).bind(caseInfo.id, orgType)
      : env.DB.prepare(`
          SELECT 
            ca.*,
            u.name as assigned_user_name
          FROM case_assignments ca
          LEFT JOIN users u ON ca.assigned_user_id = u.id
          WHERE ca.case_id = ?
          ORDER BY ca.priority DESC
        `).bind(caseInfo.id);
    
    const assignments = await assignmentsQuery.all();
    
    // Get timeline
    const timeline = await env.DB.prepare(`
      SELECT 
        cu.*,
        u.name as created_by_name
      FROM case_updates cu
      LEFT JOIN users u ON cu.created_by = u.id
      WHERE cu.case_id = ?
      ORDER BY cu.created_at DESC
    `).bind(caseInfo.id).all();
    
    return c.json({
      case: caseInfo,
      assignments: assignments.results || [],
      timeline: timeline.results || []
    });
  } catch (error) {
    console.error('Error fetching case details:', error);
    return c.json({ error: 'Failed to fetch case details' }, 500);
  }
});

// Get full case details (for modal display)
app.get('/api/cases/:caseNumber/full-details', async (c) => {
  const { env } = c;
  const caseNumber = c.req.param('caseNumber');
  
  try {
    // Get case info
    const caseInfo = await env.DB.prepare(`
      SELECT c.*, gt.name as violence_type, gt.category as violence_category, d.name as district_name
      FROM gbv_cases c
      LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
      LEFT JOIN districts d ON c.district_id = d.id
      WHERE c.case_number = ?
    `).bind(caseNumber).first();
    
    if (!caseInfo) {
      return c.json({ error: 'Case not found' }, 404);
    }
    
    // Get assignments
    const assignments = await env.DB.prepare(`
      SELECT ca.*, u.name as assigned_user_name
      FROM case_assignments ca
      LEFT JOIN users u ON ca.assigned_user_id = u.id
      WHERE ca.case_id = ?
      ORDER BY ca.priority DESC
    `).bind(caseInfo.id).all();
    
    // Get timeline
    const timeline = await env.DB.prepare(`
      SELECT cu.*, u.name as created_by_name
      FROM case_updates cu
      LEFT JOIN users u ON cu.created_by = u.id
      WHERE cu.case_id = ?
      ORDER BY cu.created_at DESC
    `).bind(caseInfo.id).all();
    
    // Get services provided (Rainbo)
    const services = await env.DB.prepare(`
      SELECT ms.*
      FROM medical_services ms
      WHERE ms.case_id = ?
      ORDER BY ms.service_date DESC
    `).bind(caseInfo.id).all();
    
    // Get latest investigation update (Police FSU)
    const investigation = await env.DB.prepare(`
      SELECT iu.*
      FROM investigation_updates iu
      WHERE iu.case_id = ?
      ORDER BY iu.updated_at DESC
      LIMIT 1
    `).bind(caseInfo.id).first();
    
    return c.json({
      case: caseInfo,
      assignments: assignments.results || [],
      timeline: timeline.results || [],
      services: services.results || [],
      investigation: investigation
    });
  } catch (error) {
    console.error('Error fetching full case details:', error);
    return c.json({ error: 'Failed to fetch case details' }, 500);
  }
});

// Add investigation update (Police FSU)
app.post('/api/cases/:caseId/investigation', async (c) => {
  const { env } = c;
  const caseId = c.req.param('caseId');
  const data = await c.req.json();
  
  try {
    const result = await env.DB.prepare(`
      INSERT INTO investigation_updates (
        case_id, assignment_id, investigation_status, suspect_status,
        evidence_collected, witness_count, next_action, next_action_date,
        notes, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      caseId,
      data.assignment_id,
      data.investigation_status,
      data.suspect_status || null,
      data.evidence_collected || null,
      data.witness_count || 0,
      data.next_action || null,
      data.next_action_date || null,
      data.notes || null,
      data.user_id
    ).run();
    
    // Create timeline update
    await env.DB.prepare(`
      INSERT INTO case_updates (
        case_id, assignment_id, update_type, update_category,
        title, description, created_by, created_by_organization
      ) VALUES (?, ?, 'investigation_update', 'investigation', ?, ?, ?, 'police_fsu')
    `).bind(
      caseId,
      data.assignment_id,
      `Investigation Update: ${data.investigation_status}`,
      data.notes || 'Investigation progress updated',
      data.user_id
    ).run();
    
    return c.json({ success: true, update_id: result.meta.last_row_id });
  } catch (error) {
    console.error('Error adding investigation update:', error);
    return c.json({ error: 'Failed to add investigation update' }, 500);
  }
});

// Add medical service record (Rainbo) - ENHANCED with comprehensive services
app.post('/api/cases/:caseId/medical', async (c) => {
  const { env } = c;
  const caseId = c.req.param('caseId');
  const data = await c.req.json();
  
  try {
    // Build comprehensive services description
    const servicesProvided = [];
    if (data.pep_given) servicesProvided.push('PEP Administration');
    if (data.sti_test) servicesProvided.push('STI Testing');
    if (data.forensic_exam) servicesProvided.push('Forensic Examination');
    if (data.emergency_contraception) servicesProvided.push('Emergency Contraception');
    if (data.wound_care) servicesProvided.push('Wound Care');
    if (data.pregnancy_test) servicesProvided.push('Pregnancy Testing');
    if (data.crisis_counseling) servicesProvided.push('Crisis Counseling');
    if (data.trauma_therapy) servicesProvided.push('Trauma Therapy');
    if (data.family_counseling) servicesProvided.push('Family Counseling');
    if (data.support_group) servicesProvided.push('Support Group Referral');
    if (data.dignity_kit) servicesProvided.push('Dignity Kit');
    if (data.legal_referral) servicesProvided.push('Legal Referral');
    if (data.safe_house) servicesProvided.push('Safe House Referral');
    if (data.economic_support) servicesProvided.push('Economic Support');
    
    const result = await env.DB.prepare(`
      INSERT INTO medical_services (
        case_id, assignment_id, examination_type, medical_status,
        services_provided, pep_administered, sti_testing_done,
        pregnancy_test_done, forensic_evidence_collected,
        injuries_documented, treatment_provided,
        follow_up_required, follow_up_date, notes, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      caseId,
      data.assignment_id,
      'comprehensive_services',
      'completed',
      JSON.stringify(servicesProvided),
      data.pep_given ? 1 : 0,
      data.sti_test ? 1 : 0,
      data.pregnancy_test ? 1 : 0,
      data.forensic_exam ? 1 : 0,
      data.wound_description || null,
      JSON.stringify({
        medical: {
          pep: data.pep_given ? {
            start_date: data.pep_start_date,
            medication: data.pep_medication,
            dosage_days: data.pep_dosage_days
          } : null,
          sti: data.sti_test ? {
            results: data.sti_results,
            notes: data.sti_notes
          } : null,
          forensic: data.forensic_exam ? {
            findings: data.forensic_findings,
            evidence: data.evidence_collected
          } : null,
          contraception: data.emergency_contraception ? {
            type: data.contraception_type
          } : null,
          wound: data.wound_care ? {
            description: data.wound_description,
            treatment: data.wound_treatment
          } : null,
          pregnancy: data.pregnancy_test ? {
            result: data.pregnancy_result,
            notes: data.pregnancy_notes
          } : null
        },
        psychosocial: {
          crisis: data.crisis_counseling ? {
            sessions: data.counseling_sessions,
            counselor: data.counselor_name
          } : null,
          trauma: data.trauma_therapy ? {
            type: data.therapy_type
          } : null,
          family: data.family_counseling ? {
            members_count: data.family_members_count
          } : null,
          support_group: data.support_group ? {
            name: data.support_group_name
          } : null
        },
        additional: {
          dignity_kit: data.dignity_kit ? {
            contents: data.dignity_kit_contents
          } : null,
          legal: data.legal_referral ? {
            organization: data.legal_organization,
            lawyer: data.lawyer_name
          } : null,
          safe_house: data.safe_house ? {
            name: data.safe_house_name
          } : null,
          economic: data.economic_support ? {
            type: data.economic_support_type
          } : null
        },
        provider: data.provider_name
      }),
      data.follow_up_date ? 1 : 0,
      data.follow_up_date || null,
      data.service_notes || null,
      data.user_id
    ).run();
    
    // Create timeline update with comprehensive description
    await env.DB.prepare(`
      INSERT INTO case_updates (
        case_id, assignment_id, update_type, update_category,
        title, description, created_by, created_by_organization, is_milestone
      ) VALUES (?, ?, 'medical_update', 'medical', ?, ?, ?, 'rainbo', TRUE)
    `).bind(
      caseId,
      data.assignment_id,
      'Rainbo Services Provided',
      `Comprehensive services by ${data.provider_name}: ${servicesProvided.join(', ')}. ${data.service_notes || ''}`,
      data.user_id
    ).run();
    
    return c.json({ success: true, service_id: result.meta.last_row_id });
  } catch (error) {
    console.error('Error adding medical service:', error);
    return c.json({ error: 'Failed to record medical services. Please try again.' }, 500);
  }
});

// ==================== RAINBO STATISTICS & REPORTS API ====================

// Get Rainbo-specific statistics
app.get('/api/organization/rainbo/statistics', async (c) => {
  const { env } = c;
  
  try {
    // Get total cases assigned to Rainbo
    const totalCases = await env.DB.prepare(`
      SELECT COUNT(DISTINCT ca.case_id) as count
      FROM case_assignments ca
      WHERE ca.organization_type = 'rainbo'
    `).first();
    
    // Get cases by status
    const casesByStatus = await env.DB.prepare(`
      SELECT 
        ca.status,
        COUNT(*) as count
      FROM case_assignments ca
      WHERE ca.organization_type = 'rainbo'
      GROUP BY ca.status
    `).all();
    
    // Get PEP administration stats
    const pepStats = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total_pep,
        COUNT(CASE WHEN pep_administered = 1 THEN 1 END) as pep_given
      FROM medical_services ms
      JOIN case_assignments ca ON ms.assignment_id = ca.id
      WHERE ca.organization_type = 'rainbo'
    `).first();
    
    // Get services provided breakdown
    const servicesBreakdown = await env.DB.prepare(`
      SELECT 
        SUM(CASE WHEN pep_administered = 1 THEN 1 ELSE 0 END) as pep_count,
        SUM(CASE WHEN sti_testing_done = 1 THEN 1 ELSE 0 END) as sti_count,
        SUM(CASE WHEN pregnancy_test_done = 1 THEN 1 ELSE 0 END) as pregnancy_test_count,
        SUM(CASE WHEN forensic_evidence_collected = 1 THEN 1 ELSE 0 END) as forensic_exam_count,
        SUM(CASE WHEN follow_up_required = 1 THEN 1 ELSE 0 END) as follow_up_required_count
      FROM medical_services ms
      JOIN case_assignments ca ON ms.assignment_id = ca.id
      WHERE ca.organization_type = 'rainbo'
    `).first();
    
    // Get follow-ups needed
    const followUps = await env.DB.prepare(`
      SELECT 
        COUNT(*) as count
      FROM medical_services ms
      JOIN case_assignments ca ON ms.assignment_id = ca.id
      WHERE ca.organization_type = 'rainbo' 
        AND ms.follow_up_required = 1
        AND ms.follow_up_date >= date('now')
    `).first();
    
    // Get monthly service trends (last 6 months)
    const monthlyTrends = await env.DB.prepare(`
      SELECT 
        strftime('%Y-%m', ms.service_date) as month,
        COUNT(*) as service_count
      FROM medical_services ms
      JOIN case_assignments ca ON ms.assignment_id = ca.id
      WHERE ca.organization_type = 'rainbo'
        AND ms.service_date >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', ms.service_date)
      ORDER BY month
    `).all();
    
    return c.json({
      summary: {
        total_cases: totalCases?.count || 0,
        pending: casesByStatus.results?.find((s: any) => s.status === 'pending')?.count || 0,
        in_progress: casesByStatus.results?.find((s: any) => s.status === 'accepted')?.count || 0,
        completed: casesByStatus.results?.find((s: any) => s.status === 'completed')?.count || 0,
        pep_administered: pepStats?.pep_given || 0,
        follow_ups_needed: followUps?.count || 0
      },
      services: servicesBreakdown || {},
      monthly_trends: monthlyTrends.results || [],
      cases_by_status: casesByStatus.results || []
    });
  } catch (error) {
    console.error('Error fetching Rainbo statistics:', error);
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Get Rainbo follow-up appointments
app.get('/api/organization/rainbo/followups', async (c) => {
  const { env } = c;
  
  try {
    const followUps = await env.DB.prepare(`
      SELECT 
        gc.case_number,
        gc.incident_date,
        gt.name as violence_type,
        ms.follow_up_date,
        ms.service_date,
        ms.notes,
        d.name as district_name
      FROM medical_services ms
      JOIN case_assignments ca ON ms.assignment_id = ca.id
      JOIN gbv_cases gc ON ms.case_id = gc.id
      LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
      LEFT JOIN districts d ON gc.district_id = d.id
      WHERE ca.organization_type = 'rainbo'
        AND ms.follow_up_required = 1
        AND ms.follow_up_date >= date('now')
      ORDER BY ms.follow_up_date ASC
    `).all();
    
    return c.json({ followups: followUps.results || [] });
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
    return c.json({ error: 'Failed to fetch follow-ups' }, 500);
  }
});

// ==================== POLICE FSU STATISTICS & REPORTS API ====================

// Get Police FSU-specific statistics
app.get('/api/organization/police_fsu/statistics', async (c) => {
  const { env } = c;
  
  try {
    // Total cases assigned to Police FSU
    const totalCases = await env.DB.prepare(`
      SELECT COUNT(DISTINCT ca.case_id) as count
      FROM case_assignments ca
      WHERE ca.organization_type = 'police_fsu'
    `).first();
    
    // Cases by assignment status
    const casesByStatus = await env.DB.prepare(`
      SELECT 
        ca.status,
        COUNT(*) as count
      FROM case_assignments ca
      WHERE ca.organization_type = 'police_fsu'
      GROUP BY ca.status
    `).all();
    
    // Investigation status breakdown
    const investigationStats = await env.DB.prepare(`
      SELECT 
        iu.investigation_status,
        COUNT(*) as count
      FROM (
        SELECT case_id, investigation_status,
               ROW_NUMBER() OVER (PARTITION BY case_id ORDER BY updated_at DESC) as rn
        FROM investigation_updates
      ) iu
      WHERE iu.rn = 1
      GROUP BY iu.investigation_status
    `).all();
    
    // Suspect status breakdown
    const suspectStats = await env.DB.prepare(`
      SELECT 
        iu.suspect_status,
        COUNT(*) as count
      FROM (
        SELECT case_id, suspect_status,
               ROW_NUMBER() OVER (PARTITION BY case_id ORDER BY updated_at DESC) as rn
        FROM investigation_updates
        WHERE suspect_status IS NOT NULL
      ) iu
      WHERE iu.rn = 1
      GROUP BY iu.suspect_status
    `).all();
    
    // Evidence collection stats
    const evidenceStats = await env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT case_id) as cases_with_evidence,
        SUM(witness_count) as total_witnesses
      FROM investigation_updates
      WHERE evidence_collected IS NOT NULL AND evidence_collected != ''
    `).first();
    
    // Cases by priority
    const priorityStats = await env.DB.prepare(`
      SELECT 
        ca.priority,
        COUNT(*) as count
      FROM case_assignments ca
      WHERE ca.organization_type = 'police_fsu'
      GROUP BY ca.priority
    `).all();
    
    // Monthly investigation trends
    const monthlyTrends = await env.DB.prepare(`
      SELECT 
        strftime('%Y-%m', ca.assigned_at) as month,
        COUNT(*) as case_count
      FROM case_assignments ca
      WHERE ca.organization_type = 'police_fsu'
        AND ca.assigned_at >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', ca.assigned_at)
      ORDER BY month
    `).all();
    
    return c.json({
      summary: {
        total_cases: totalCases?.count || 0,
        pending: casesByStatus.results?.find((s: any) => s.status === 'pending')?.count || 0,
        investigating: casesByStatus.results?.find((s: any) => s.status === 'accepted')?.count || 0,
        completed: casesByStatus.results?.find((s: any) => s.status === 'completed')?.count || 0,
        cases_with_evidence: evidenceStats?.cases_with_evidence || 0,
        total_witnesses: evidenceStats?.total_witnesses || 0,
        urgent_cases: priorityStats.results?.find((p: any) => p.priority === 'urgent')?.count || 0
      },
      investigation_status: investigationStats.results || [],
      suspect_status: suspectStats.results || [],
      priority_breakdown: priorityStats.results || [],
      monthly_trends: monthlyTrends.results || []
    });
  } catch (error) {
    console.error('Error fetching Police FSU statistics:', error);
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Get Police FSU investigation reports
app.get('/api/organization/police_fsu/reports', async (c) => {
  const { env } = c;
  const reportType = c.req.query('type') || 'investigation_summary';
  
  try {
    if (reportType === 'investigation_summary') {
      // Detailed investigation summary
      const report = await env.DB.prepare(`
        SELECT 
          gc.case_number,
          gc.incident_date,
          gt.name as violence_type,
          d.name as district,
          iu.investigation_status,
          iu.suspect_status,
          iu.witness_count,
          iu.updated_at as last_update,
          ca.priority,
          ca.status as assignment_status
        FROM case_assignments ca
        JOIN gbv_cases gc ON ca.case_id = gc.id
        LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
        LEFT JOIN districts d ON gc.district_id = d.id
        LEFT JOIN (
          SELECT case_id, investigation_status, suspect_status, witness_count, updated_at,
                 ROW_NUMBER() OVER (PARTITION BY case_id ORDER BY updated_at DESC) as rn
          FROM investigation_updates
        ) iu ON gc.id = iu.case_id AND iu.rn = 1
        WHERE ca.organization_type = 'police_fsu'
        ORDER BY gc.incident_date DESC
      `).all();
      
      return c.json({ report: report.results || [], type: 'investigation_summary' });
    }
    
    return c.json({ error: 'Unknown report type' }, 400);
  } catch (error) {
    console.error('Error generating Police FSU report:', error);
    return c.json({ error: 'Failed to generate report' }, 500);
  }
});

// Rainbo Centre Dashboard - ENHANCED VERSION
app.get('/rainbo-dashboard', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rainbo Initiative - GBV One-Stop Center</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 min-h-screen">
        <div id="rainbo-dashboard-root"></div>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="/static/rainbo-dashboard-enhanced.js"></script>
      </body>
    </html>
  );
});

// Police FSU Dashboard - ENHANCED VERSION with Evidence Chain of Custody
app.get('/police-dashboard', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sierra Leone Police FSU - Evidence & Investigation System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 min-h-screen">
        <div id="police-dashboard-root"></div>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="/static/police-dashboard-enhanced.js"></script>
      </body>
    </html>
  );
});

// Demo Flow Page
app.get('/demo', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Interactive Demo - GBV Response System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-gray-50">
        <div id="demo-flow-root"></div>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/demo-flow.js"></script>
      </body>
    </html>
  `);
});

// Educational Modules Hub Page
app.get('/education', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Educational Modules Hub</h1>
              <p className="text-purple-100 mt-1">Interactive Training for GBV Prevention & Response</p>
            </div>
            <a href="/" className="px-4 py-2 bg-white text-purple-600 rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-graduation-cap text-purple-600 text-2xl"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Learning Hub</h2>
              <p className="text-gray-600 mb-4">
                Enhance your knowledge and skills in GBV prevention, response, and survivor support through our interactive modules.
                Each module includes lessons, quizzes, and practical scenarios.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Self-paced learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Interactive quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Completion certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">
            All Modules
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Prevention
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Service Provider Training
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Community Education
          </button>
        </div>

        {/* Modules Grid */}
        <div id="modules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modules loaded by JavaScript */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">GBV Dashboard</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">Insyt Solutions</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Version 2.0 - 2025</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">© 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Load Education Hub JavaScript */}
      <script src="/static/education-hub.js"></script>
    </div>
  );
});

// Resource Library Page
app.get('/resources', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resource Library</h1>
              <p className="text-blue-100 mt-1">Sierra Leone Spotlight Initiative - GBV Resources</p>
            </div>
            <a href="/" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              id="resource-search"
              placeholder="Search resources by title, keywords, or tags..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Breadcrumb */}
        <div id="resource-breadcrumb" className="text-sm text-gray-600 mb-6">
          <span>All Resources</span>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
          <div id="category-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categories loaded by JavaScript */}
          </div>
        </div>

        {/* Resources List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Resources</h2>
          <div id="resources-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resources loaded by JavaScript */}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="tel:116" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <i className="fas fa-phone text-2xl text-blue-600"></i>
              <div>
                <div className="font-semibold text-gray-800">GBV Hotline</div>
                <div className="text-sm text-gray-600">Call 116 (24/7)</div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
              <i className="fas fa-hospital text-2xl text-green-600"></i>
              <div>
                <div className="font-semibold text-gray-800">Rainbo Centers</div>
                <div className="text-sm text-gray-600">Medical Care & Support</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
              <i className="fas fa-shield-alt text-2xl text-red-600"></i>
              <div>
                <div className="font-semibold text-gray-800">Police FSU</div>
                <div className="text-sm text-gray-600">Report & Investigation</div>
              </div>
            </div>
            <a href="/education" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <i className="fas fa-graduation-cap text-2xl text-purple-600"></i>
              <div>
                <div className="font-semibold text-gray-800">Training Hub</div>
                <div className="text-sm text-gray-600">Interactive Modules</div>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">GBV Dashboard</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">Insyt Solutions</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Version 2.0 - 2025</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">© 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Load Resource Library JavaScript */}
      <script src="/static/resource-library.js"></script>
    </div>
  );
});

// Main Dashboard Page
app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4" style="border-bottom-color: #1e3a8a;">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Official Ministry Logo */}
              <img src="/static/ministry-logo.png" alt="Ministry of Gender and Children's Affairs" className="w-20 h-20 object-contain" />
              <div>
                <h1 className="text-2xl font-bold" style="color: #1e3a8a;">Sierra Leone GBV Dashboard</h1>
                <p className="text-sm font-semibold" style="color: #1e3a8a;">Ministry of Gender and Children's Affairs</p>
                <p className="text-xs" style="color: #1e3a8a;">Real-time Gender-Based Violence Incident Tracking System</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded" style="background-color: #1e90ff; color: white;">Powered by Insyt Solutions</span>
                  <span className="text-xs px-2 py-0.5 rounded" style="background-color: #1e3a8a; color: white;">USAID</span>
                  <span className="text-xs px-2 py-0.5 rounded" style="background-color: #1e90ff; color: white;">WHO</span>
                  <span className="text-xs px-2 py-0.5 rounded" style="background-color: #9333ea; color: white;">UN Women</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm" style="color: #1e3a8a;">Last Updated</div>
              <div className="text-lg font-semibold" style="color: #1e3a8a;" id="last-updated">10/17/2025</div>
              <div className="text-xs text-gray-400">© 2025 Insyt Solutions</div>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style="background-color: #32cd32; color: white;">
                  <span className="w-2 h-2 rounded-full mr-1" style="background-color: #90ee90;"></span>
                  System Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b" style="background-color: #008000;">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            <button className="dashboard-tab bg-white py-3 px-4 text-sm font-medium whitespace-nowrap rounded-t" style="color: #1e3a8a;">
              <i className="fas fa-eye mr-2"></i>Overview
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-file-alt mr-2"></i>Report Case
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-list-alt mr-2"></i>View Cases
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-map mr-2"></i>District Map
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap relative" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-chart-bar mr-2"></i>Analytics
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded" style="background-color: #ffd700; color: #1e3a8a;">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap relative" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-hospital mr-2"></i>Rainbo Portal
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded" style="background-color: #ffd700; color: #1e3a8a;">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap relative" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-shield-alt mr-2"></i>Police FSU
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded" style="background-color: #ffd700; color: #1e3a8a;">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-book mr-2"></i>Resources
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-microphone mr-2"></i>Voice Report
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-user-cog mr-2"></i>Admin
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap relative" style="background-color: transparent;" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='transparent'">
              <i className="fas fa-play-circle mr-2"></i>Interactive Demo
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded animate-pulse" style="background-color: #00ff00; color: #1e3a8a;">Live</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Loading State */}
        <div id="loading-state" className="text-center py-12">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-lg text-gray-600">Loading GBV Dashboard...</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Connecting to database and loading statistics...</p>
        </div>

        {/* Dashboard Content (hidden by default) */}
        <div id="dashboard-content" className="hidden">
          {/* Emergency Banner */}
          <div className="text-white p-3 rounded mb-4 text-center" style="background-color: #32cd32;">
            <i className="fas fa-phone-alt mr-2"></i>
            <strong>EMERGENCY: Call 116 (Toll-Free) for immediate GBV support</strong>
            <span className="ml-4">| Available 24/7 in Krio, English, Mende & Temne</span>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div className="flex gap-3 flex-wrap">
              <button onclick="showMessagingSystem()" 
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-comments"></i>
                <span>Team Chat</span>
              </button>
              <button onclick="showInteractiveTraining()" 
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-gamepad"></i>
                <span>Training</span>
              </button>
              <button onclick="showSurvivorPortal()" 
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-user-shield"></i>
                <span>Survivor Portal</span>
              </button>
              <button onclick="showVideoResources()" 
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-video"></i>
                <span>Videos</span>
              </button>
              <button onclick="showCustomReportBuilder()" 
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-file-invoice"></i>
                <span>Reports</span>
              </button>
              <button onclick="showWhatsAppSMS()" 
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-mobile-alt"></i>
                <span>WhatsApp/SMS</span>
              </button>
              <button onclick="showExportSystem()" 
                      className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all font-semibold shadow-md flex items-center gap-2">
                <i className="fas fa-file-download"></i>
                <span>Export</span>
              </button>
            </div>
            <button 
              onclick="refreshDashboard()"
              className="px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2"
              style="background-color: #32cd32;"
              title="Refresh dashboard data"
            >
              <i className="fas fa-sync"></i>
              <span>Refresh Data</span>
            </button>
          </div>

          {/* Current Alerts */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Current Alerts</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div><strong>Bo:</strong> 25% increase in cases this week - response team deployed</div>
                  <div><strong>Kailahun:</strong> Medical supplies low at One-Stop Center - resupply scheduled</div>
                  <div><strong>Western Area:</strong> Successful conviction - life sentence for child rape case</div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards - 4 cards layout */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Total Cases (2025)</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: rgba(50, 205, 50, 0.2);">
                  <i className="fas fa-folder" style="color: #32cd32;"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="total-cases">0</div>
              <div className="text-xs mt-1" style="color: #32cd32;">
                <i className="fas fa-check-circle mr-1"></i>Based on actual reporting
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">This Month</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: rgba(30, 58, 138, 0.2);">
                  <i className="fas fa-calendar" style="color: #1e3a8a;"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="this-month-cases">0</div>
              <div className="text-xs mt-1" style="color: #1e3a8a;">
                <i className="fas fa-calendar-alt mr-1"></i><span id="current-month">October 2025</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Sexual Assault Cases</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: rgba(255, 215, 0, 0.2);">
                  <i className="fas fa-exclamation-triangle" style="color: #ffd700;"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="sexual-assault-cases">0</div>
              <div className="text-xs mt-1" style="color: #ffd700;">
                <i className="fas fa-percentage mr-1"></i><span id="assault-percentage">94%</span> of all cases
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Service Coverage</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: rgba(50, 205, 50, 0.2);">
                  <i className="fas fa-hand-holding-heart" style="color: #32cd32;"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="service-coverage">0%</div>
              <div className="text-xs mt-1" style="color: #32cd32;">
                <i className="fas fa-check mr-1"></i>Survivors receiving care
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trends Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Trends (2025)</h3>
                <div className="flex space-x-4 text-sm">
                  <button className="text-blue-600 border-b-2 border-blue-600 pb-1 font-medium">Cases</button>
                  <button className="text-gray-500 hover:text-gray-700">Services</button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs mb-3">
                <span className="flex items-center"><span className="w-3 h-3 mr-1" style="background-color: #1e3a8a;"></span>Total Cases</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-1"></span>Sexual Assault</span>
              </div>
              <canvas id="monthlyTrendsChart" width="400" height="250"></canvas>
            </div>

            {/* Age Group Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Age Group Distribution</h3>
              <div className="flex items-center justify-center" style="height: 300px;">
                <canvas id="ageDistributionChart" width="300" height="300"></canvas>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>0-10</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>11-15</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>16-17</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>18-25</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>26-35</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>36+</div>
              </div>
            </div>
          </div>

          {/* District Case Distribution & Service Providers - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* District Case Distribution - Takes 2 columns */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">District Case Distribution</h3>
              
              {/* District Cards Grid - Dynamically populated */}
              <div id="district-cards-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Districts will be populated dynamically by JavaScript */}
                <div className="col-span-full text-center py-8 text-gray-500">
                  <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
                  <div>Loading district data...</div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="border rounded-lg p-8 text-center" style="background-color: rgba(50, 205, 50, 0.1); border-color: #32cd32;">
                <i className="fas fa-map text-4xl mb-3" style="color: #32cd32;"></i>
                <div className="text-gray-700 font-medium mb-1">Interactive Sierra Leone Map</div>
                <div className="text-sm text-gray-500">Click districts above to highlight</div>
              </div>
            </div>

            {/* Service Providers - Takes 1 column */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Providers</h3>
              
              <div className="space-y-4">
                {/* Rainbo Initiative */}
                <div className="pl-4 py-2" style="border-left: 4px solid #1e3a8a;">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Rainbo Initiative</div>
                    <span className="text-xs text-orange-500">24 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">9 Centers</div>
                  <div className="text-sm font-semibold" style="color: #1e3a8a;">1247 cases</div>
                </div>

                {/* One-Stop Centers */}
                <div className="pl-4 py-2" style="border-left: 4px solid #1e3a8a;">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">One-Stop Centers</div>
                    <span className="text-xs text-yellow-500">12 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">7 Hospitals</div>
                  <div className="text-sm font-semibold" style="color: #1e3a8a;">692 cases</div>
                </div>

                {/* Police FSU */}
                <div className="pl-4 py-2" style="border-left: 4px solid #1e3a8a;">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Police FSU</div>
                    <span className="text-xs text-orange-500">48 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">16 Districts</div>
                  <div className="text-sm font-semibold" style="color: #1e3a8a;">654 cases</div>
                </div>

                {/* 116 Hotline */}
                <div className="pl-4 py-2" style="border-left: 4px solid #1e3a8a;">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">116 Hotline</div>
                    <span className="text-xs" style="color: #32cd32;">2 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">National</div>
                  <div className="text-sm font-semibold" style="color: #1e3a8a;">189 cases</div>
                </div>

                {/* Community Reports */}
                <div className="pl-4 py-2" style="border-left: 4px solid #1e3a8a;">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Community Reports</div>
                    <span className="text-xs text-yellow-500">72 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Village Level</div>
                  <div className="text-sm font-semibold" style="color: #1e3a8a;">89 cases</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">GBV Dashboard</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">Insyt Solutions</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Version 2.0 - 2025</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">© 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Load JavaScript */}
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="/static/app-simplified.js"></script>
      <script src="/static/tab-system.js"></script>
      <script src="/static/report-case-form.js"></script>
      <script src="/static/district-map.js"></script>
      <script src="/static/analytics-dashboard.js"></script>
      <script src="/static/portal-systems.js"></script>
      <script src="/static/voice-recording.js"></script>
      <script src="/static/view-cases.js"></script>
      <script src="/static/case-notes.js"></script>
      <script src="/static/dark-mode.js"></script>
      <script src="/static/notifications.js"></script>
      <script src="/static/ai-chatbot.js"></script>
      <script src="/static/risk-assessment.js"></script>
      <script src="/static/advanced-analytics.js"></script>
      <script src="/static/panic-button.js"></script>
      <script src="/static/internal-messaging.js"></script>
      <script src="/static/interactive-training.js"></script>
      <script src="/static/survivor-portal.js"></script>
      <script src="/static/whatsapp-sms.js"></script>
      <script src="/static/custom-report-builder.js"></script>
      <script src="/static/video-resources.js"></script>
      <script src="/static/keyboard-shortcuts.js"></script>
      <script src="/static/quick-stats-widget.js"></script>
      <script src="/static/export-system.js"></script>
    </div>
  );
});

export default app
