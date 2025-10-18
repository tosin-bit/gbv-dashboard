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
      SELECT s.*, u.id as user_id, u.username, u.role, u.full_name, u.email,
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
        full_name: session.full_name,
        email: session.email,
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

    return c.json({ 
      success: true, 
      case_id: result.meta.last_row_id,
      case_number: caseNumber,
      message: `Case ${caseNumber} successfully recorded.`
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

// Rainbo Centre Dashboard
app.get('/rainbo-dashboard', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rainbo Centre Dashboard - GBV System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-gray-50">
        <div id="rainbo-dashboard-root"></div>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/rainbo-dashboard.js"></script>
      </body>
    </html>
  );
});

// Police FSU Dashboard
app.get('/police-dashboard', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Police FSU Dashboard - GBV System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-gray-50">
        <div id="police-dashboard-root"></div>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/police-dashboard.js"></script>
      </body>
    </html>
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Loading State */}
        <div id="loading-state" className="text-center py-12">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-lg text-gray-600">Loading Enhanced GBV Dashboard...</span>
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

          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
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
              <span className="text-sm text-gray-500">Enhanced GBV Dashboard</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">Insyt FamilyCare Healthcare Technology</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Version 2.0</span>
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
    </div>
  );
});

export default app
