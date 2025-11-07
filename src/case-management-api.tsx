// Case Management API - Multi-Organization Workflow System
// This file contains all case management, assignment, and notification logic

import { Context } from 'hono'

// Helper function to create case assignments based on GBV type
export async function autoAssignCase(c: Context, caseId: number, gbvTypeId: number) {
  const { env } = c;
  
  try {
    // Get referral rules for this GBV type
    const rules = await env.DB.prepare(`
      SELECT * FROM case_referral_rules 
      WHERE (gbv_type_id = ? OR gbv_type_id IS NULL) 
      AND is_active = TRUE
    `).bind(gbvTypeId).all();
    
    const assignments = [];
    const notifications = [];
    
    for (const rule of (rules.results || [])) {
      // Create assignment
      const assignmentResult = await env.DB.prepare(`
        INSERT INTO case_assignments (
          case_id, organization_type, assignment_reason, priority, status
        ) VALUES (?, ?, ?, ?, 'pending')
      `).bind(
        caseId,
        rule.organization_type,
        rule.assignment_reason,
        rule.priority
      ).run();
      
      assignments.push({
        id: assignmentResult.meta.last_row_id,
        organization: rule.organization_type,
        priority: rule.priority
      });
      
      // Create notification for the organization
      const caseInfo = await env.DB.prepare(`
        SELECT 
          c.case_number,
          c.incident_date,
          gt.name as violence_type,
          d.name as district,
          c.survivor_age_group,
          c.survivor_gender,
          c.priority_level
        FROM gbv_cases c
        LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
        LEFT JOIN districts d ON c.district_id = d.id
        WHERE c.id = ?
      `).bind(caseId).first();
      
      const notificationTitle = `New Case Assignment: ${caseInfo?.case_number}`;
      const notificationMessage = `A new ${caseInfo?.violence_type} case has been assigned to your organization. ` +
        `Location: ${caseInfo?.district}. Priority: ${rule.priority.toUpperCase()}. ` +
        `Immediate action required.`;
      
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
        `/cases/${caseInfo?.case_number}`
      ).run();
      
      notifications.push({
        organization: rule.organization_type,
        message: notificationMessage
      });
    }
    
    return { assignments, notifications };
  } catch (error) {
    console.error('Error auto-assigning case:', error);
    throw error;
  }
}

// Create a case update/timeline entry
export async function createCaseUpdate(c: Context, data: {
  caseId: number,
  assignmentId?: number,
  updateType: string,
  updateCategory?: string,
  title: string,
  description?: string,
  statusBefore?: string,
  statusAfter?: string,
  visibility?: string,
  createdBy: number,
  createdByOrganization: string,
  isMilestone?: boolean
}) {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      INSERT INTO case_updates (
        case_id, assignment_id, update_type, update_category,
        title, description, status_before, status_after,
        visibility, created_by, created_by_organization, is_milestone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.caseId,
      data.assignmentId || null,
      data.updateType,
      data.updateCategory || null,
      data.title,
      data.description || null,
      data.statusBefore || null,
      data.statusAfter || null,
      data.visibility || 'all_assigned',
      data.createdBy,
      data.createdByOrganization,
      data.isMilestone || false
    ).run();
    
    // Notify other organizations about the update (if milestone or status change)
    if (data.isMilestone || data.statusBefore !== data.statusAfter) {
      const caseInfo = await env.DB.prepare(`
        SELECT case_number FROM gbv_cases WHERE id = ?
      `).bind(data.caseId).first();
      
      // Get all organizations assigned to this case
      const assignments = await env.DB.prepare(`
        SELECT DISTINCT organization_type 
        FROM case_assignments 
        WHERE case_id = ? AND organization_type != ?
      `).bind(data.caseId, data.createdByOrganization).all();
      
      for (const assignment of (assignments.results || [])) {
        await env.DB.prepare(`
          INSERT INTO case_notifications (
            case_id, notification_type, target_organization, 
            title, message, priority, action_url
          ) VALUES (?, 'case_update', ?, ?, ?, 'normal', ?)
        `).bind(
          data.caseId,
          assignment.organization_type,
          `Update on Case ${caseInfo?.case_number}`,
          `${data.createdByOrganization} has updated case ${caseInfo?.case_number}: ${data.title}`,
          `/cases/${caseInfo?.case_number}`
        ).run();
      }
    }
    
    return { success: true, updateId: result.meta.last_row_id };
  } catch (error) {
    console.error('Error creating case update:', error);
    throw error;
  }
}

// Get cases assigned to a specific organization
export async function getOrganizationCases(c: Context, organizationType: string, userId?: number) {
  const { env } = c;
  
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
        -- Latest update
        (SELECT title FROM case_updates 
         WHERE case_id = c.id 
         ORDER BY created_at DESC LIMIT 1) as last_update_title,
        (SELECT created_at FROM case_updates 
         WHERE case_id = c.id 
         ORDER BY created_at DESC LIMIT 1) as last_update_at,
        -- Unread notifications for this organization
        (SELECT COUNT(*) FROM case_notifications 
         WHERE case_id = c.id 
         AND target_organization = ?
         AND is_read = FALSE) as unread_count
      FROM gbv_cases c
      INNER JOIN case_assignments ca ON c.id = ca.case_id
      LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
      LEFT JOIN districts d ON c.district_id = d.id
      WHERE ca.organization_type = ?
      ${userId ? 'AND (ca.assigned_user_id = ? OR ca.assigned_user_id IS NULL)' : ''}
      ORDER BY 
        CASE WHEN ca.status = 'pending' THEN 1 ELSE 2 END,
        ca.priority = 'urgent' DESC,
        ca.priority = 'high' DESC,
        c.incident_date DESC
    `;
    
    const bindings = userId ? [organizationType, organizationType, userId] : [organizationType, organizationType];
    const result = await env.DB.prepare(query).bind(...bindings).all();
    
    return {
      cases: result.results || [],
      summary: {
        total: result.results?.length || 0,
        pending: result.results?.filter((c: any) => c.assignment_status === 'pending').length || 0,
        in_progress: result.results?.filter((c: any) => c.assignment_status === 'in_progress').length || 0,
        completed: result.results?.filter((c: any) => c.assignment_status === 'completed').length || 0
      }
    };
  } catch (error) {
    console.error('Error fetching organization cases:', error);
    throw error;
  }
}

// Get notifications for organization
export async function getOrganizationNotifications(c: Context, organizationType: string, userId?: number, unreadOnly: boolean = false) {
  const { env } = c;
  
  try {
    const query = `
      SELECT 
        cn.*,
        c.case_number,
        c.incident_date
      FROM case_notifications cn
      LEFT JOIN gbv_cases c ON cn.case_id = c.id
      WHERE cn.target_organization = ?
      ${userId ? 'AND (cn.target_user_id = ? OR cn.target_user_id IS NULL)' : ''}
      ${unreadOnly ? 'AND cn.is_read = FALSE' : ''}
      AND (cn.expires_at IS NULL OR cn.expires_at > datetime('now'))
      ORDER BY 
        cn.priority = 'urgent' DESC,
        cn.priority = 'high' DESC,
        cn.created_at DESC
      LIMIT 50
    `;
    
    const bindings = userId ? [organizationType, userId] : [organizationType];
    const result = await env.DB.prepare(query).bind(...bindings).all();
    
    return {
      notifications: result.results || [],
      unread_count: result.results?.filter((n: any) => !n.is_read).length || 0
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

// Mark notification as read
export async function markNotificationRead(c: Context, notificationId: number) {
  const { env } = c;
  
  try {
    await env.DB.prepare(`
      UPDATE case_notifications 
      SET is_read = TRUE, read_at = datetime('now')
      WHERE id = ?
    `).bind(notificationId).run();
    
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

// Update assignment status
export async function updateAssignmentStatus(c: Context, assignmentId: number, status: string, userId: number) {
  const { env } = c;
  
  try {
    const timeField = status === 'accepted' ? 'accepted_at' : 
                     status === 'completed' ? 'completed_at' : null;
    
    const updateQuery = timeField 
      ? `UPDATE case_assignments SET status = ?, ${timeField} = datetime('now'), assigned_user_id = ? WHERE id = ?`
      : `UPDATE case_assignments SET status = ?, assigned_user_id = ? WHERE id = ?`;
    
    await env.DB.prepare(updateQuery).bind(status, userId, assignmentId).run();
    
    return { success: true };
  } catch (error) {
    console.error('Error updating assignment status:', error);
    throw error;
  }
}

// Get case details with full timeline
export async function getCaseDetails(c: Context, caseId: number, organizationType?: string) {
  const { env } = c;
  
  try {
    // Get basic case info
    const caseInfo = await env.DB.prepare(`
      SELECT 
        c.*,
        gt.name as violence_type,
        gt.category as violence_category,
        d.name as district_name,
        d.code as district_code,
        creator.name as created_by_name
      FROM gbv_cases c
      LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
      LEFT JOIN districts d ON c.district_id = d.id
      LEFT JOIN users creator ON c.created_by = creator.id
      WHERE c.id = ?
    `).bind(caseId).first();
    
    if (!caseInfo) {
      return { error: 'Case not found' };
    }
    
    // Get assignments
    const assignments = await env.DB.prepare(`
      SELECT 
        ca.*,
        u.name as assigned_user_name,
        u.email as assigned_user_email
      FROM case_assignments ca
      LEFT JOIN users u ON ca.assigned_user_id = u.id
      WHERE ca.case_id = ?
      ${organizationType ? 'AND ca.organization_type = ?' : ''}
      ORDER BY ca.assigned_at DESC
    `).bind(organizationType ? [caseId, organizationType] : [caseId]).all();
    
    // Get timeline/updates
    const updates = await env.DB.prepare(`
      SELECT 
        cu.*,
        u.name as created_by_name
      FROM case_updates cu
      LEFT JOIN users u ON cu.created_by = u.id
      WHERE cu.case_id = ?
      ${organizationType ? 'AND (cu.visibility = "all_assigned" OR cu.created_by_organization = ?)' : ''}
      ORDER BY cu.created_at DESC
    `).bind(organizationType ? [caseId, organizationType] : [caseId]).all();
    
    // Get investigation updates if Police FSU
    let investigationUpdates = null;
    if (!organizationType || organizationType === 'police_fsu') {
      const invResult = await env.DB.prepare(`
        SELECT 
          iu.*,
          u.name as officer_name
        FROM investigation_updates iu
        LEFT JOIN users u ON iu.investigating_officer_id = u.id
        WHERE iu.case_id = ?
        ORDER BY iu.updated_at DESC
      `).bind(caseId).all();
      investigationUpdates = invResult.results;
    }
    
    // Get medical services if Rainbo
    let medicalServices = null;
    if (!organizationType || organizationType === 'rainbo') {
      const medResult = await env.DB.prepare(`
        SELECT 
          ms.*,
          u.name as staff_name
        FROM medical_services ms
        LEFT JOIN users u ON ms.attending_staff_id = u.id
        WHERE ms.case_id = ?
        ORDER BY ms.service_date DESC
      `).bind(caseId).all();
      medicalServices = medResult.results;
    }
    
    return {
      case: caseInfo,
      assignments: assignments.results || [],
      timeline: updates.results || [],
      investigation: investigationUpdates,
      medical: medicalServices
    };
  } catch (error) {
    console.error('Error fetching case details:', error);
    throw error;
  }
}
