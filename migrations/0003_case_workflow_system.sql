-- Case Workflow and Multi-Organization System
-- Migration 0003: Add case assignments, notifications, and status tracking

-- Case Assignments Table
-- Tracks which organizations are working on which cases
CREATE TABLE IF NOT EXISTS case_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    organization_type TEXT NOT NULL, -- 'ministry', 'rainbo', 'police_fsu', 'ngo', etc.
    organization_id INTEGER, -- Reference to service_providers table
    assigned_user_id INTEGER, -- User handling this case
    assignment_reason TEXT NOT NULL, -- 'initial_report', 'automatic_referral', 'manual_referral'
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'in_progress', 'completed', 'declined'
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    accepted_at DATETIME,
    completed_at DATETIME,
    notes TEXT,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (organization_id) REFERENCES service_providers(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id)
);

-- Case Updates/Timeline Table
-- Tracks all updates and progress on cases
CREATE TABLE IF NOT EXISTS case_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    assignment_id INTEGER, -- Which assignment this update is for
    update_type TEXT NOT NULL, -- 'status_change', 'note', 'service_provided', 'investigation_update', 'medical_update'
    update_category TEXT, -- 'medical', 'legal', 'investigation', 'psychosocial', 'general'
    title TEXT NOT NULL,
    description TEXT,
    status_before TEXT,
    status_after TEXT,
    visibility TEXT DEFAULT 'all_assigned', -- 'all_assigned', 'organization_only', 'ministry_only', 'public'
    created_by INTEGER NOT NULL,
    created_by_organization TEXT, -- 'ministry', 'rainbo', 'police_fsu'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_milestone BOOLEAN DEFAULT FALSE, -- Major updates like case completion
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (assignment_id) REFERENCES case_assignments(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Case Notifications Table
-- Real-time notifications for new cases and updates
CREATE TABLE IF NOT EXISTS case_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    notification_type TEXT NOT NULL, -- 'new_case', 'case_update', 'case_assigned', 'status_change', 'urgent_action'
    target_organization TEXT NOT NULL, -- 'ministry', 'rainbo', 'police_fsu'
    target_user_id INTEGER, -- Specific user or NULL for all in organization
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    action_url TEXT, -- Link to relevant case/update
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME, -- Auto-hide after certain time
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id)
);

-- Investigation Updates (Police FSU specific)
CREATE TABLE IF NOT EXISTS investigation_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    assignment_id INTEGER NOT NULL,
    investigation_status TEXT DEFAULT 'initiated', -- 'initiated', 'evidence_collection', 'suspect_identified', 'arrest_made', 'case_filed', 'court_proceedings', 'closed'
    suspect_status TEXT, -- 'unknown', 'identified', 'arrested', 'charged', 'convicted', 'acquitted'
    evidence_collected TEXT, -- JSON array of evidence types
    witness_count INTEGER DEFAULT 0,
    court_case_number TEXT,
    next_action TEXT,
    next_action_date DATE,
    investigating_officer_id INTEGER,
    notes TEXT,
    updated_by INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (assignment_id) REFERENCES case_assignments(id),
    FOREIGN KEY (investigating_officer_id) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Medical Services (Rainbo specific)
CREATE TABLE IF NOT EXISTS medical_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    assignment_id INTEGER NOT NULL,
    service_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    examination_type TEXT, -- 'initial', 'follow_up', 'forensic'
    medical_status TEXT DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed'
    services_provided TEXT, -- JSON array: ['pep', 'sti_testing', 'pregnancy_test', 'forensic_exam', 'counseling']
    pep_administered BOOLEAN DEFAULT FALSE,
    pep_start_date DATE,
    sti_testing_done BOOLEAN DEFAULT FALSE,
    pregnancy_test_done BOOLEAN DEFAULT FALSE,
    pregnancy_test_result TEXT,
    forensic_evidence_collected BOOLEAN DEFAULT FALSE,
    injuries_documented TEXT, -- Description of injuries
    treatment_provided TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    referrals_made TEXT, -- JSON array of referrals
    attending_staff_id INTEGER,
    notes TEXT,
    updated_by INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (assignment_id) REFERENCES case_assignments(id),
    FOREIGN KEY (attending_staff_id) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Case Referral Rules
-- Defines which cases should be automatically assigned to which organizations
CREATE TABLE IF NOT EXISTS case_referral_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gbv_type_id INTEGER, -- If NULL, applies to all types
    organization_type TEXT NOT NULL, -- 'rainbo', 'police_fsu', 'ngo'
    auto_assign BOOLEAN DEFAULT TRUE,
    priority TEXT DEFAULT 'medium',
    assignment_reason TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (gbv_type_id) REFERENCES gbv_types(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_case_assignments_case ON case_assignments(case_id);
CREATE INDEX IF NOT EXISTS idx_case_assignments_org ON case_assignments(organization_type);
CREATE INDEX IF NOT EXISTS idx_case_assignments_user ON case_assignments(assigned_user_id);
CREATE INDEX IF NOT EXISTS idx_case_assignments_status ON case_assignments(status);

CREATE INDEX IF NOT EXISTS idx_case_updates_case ON case_updates(case_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_assignment ON case_updates(assignment_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_created_by ON case_updates(created_by);
CREATE INDEX IF NOT EXISTS idx_case_updates_created_at ON case_updates(created_at);

CREATE INDEX IF NOT EXISTS idx_case_notifications_target_org ON case_notifications(target_organization);
CREATE INDEX IF NOT EXISTS idx_case_notifications_target_user ON case_notifications(target_user_id);
CREATE INDEX IF NOT EXISTS idx_case_notifications_is_read ON case_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_case_notifications_created_at ON case_notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_investigation_updates_case ON investigation_updates(case_id);
CREATE INDEX IF NOT EXISTS idx_investigation_updates_assignment ON investigation_updates(assignment_id);

CREATE INDEX IF NOT EXISTS idx_medical_services_case ON medical_services(case_id);
CREATE INDEX IF NOT EXISTS idx_medical_services_assignment ON medical_services(assignment_id);

-- Insert default referral rules
-- All sexual violence cases → Police FSU (for investigation)
INSERT INTO case_referral_rules (gbv_type_id, organization_type, auto_assign, priority, assignment_reason, is_active)
SELECT id, 'police_fsu', TRUE, 'high', 'Sexual violence requires criminal investigation', TRUE
FROM gbv_types 
WHERE category = 'sexual_violence';

-- All sexual violence cases → Rainbo (for medical care)
INSERT INTO case_referral_rules (gbv_type_id, organization_type, auto_assign, priority, assignment_reason, is_active)
SELECT id, 'rainbo', TRUE, 'urgent', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', TRUE
FROM gbv_types 
WHERE category = 'sexual_violence';

-- Physical violence cases → Rainbo (for medical care)
INSERT INTO case_referral_rules (gbv_type_id, organization_type, auto_assign, priority, assignment_reason, is_active)
SELECT id, 'rainbo', TRUE, 'high', 'Physical violence may require medical attention', TRUE
FROM gbv_types 
WHERE category = 'physical_violence';

-- View for case overview with all assignments
CREATE VIEW IF NOT EXISTS case_overview AS
SELECT 
    c.id as case_id,
    c.case_number,
    c.incident_date,
    c.reported_date,
    gt.name as violence_type,
    gt.category as violence_category,
    d.name as district,
    c.survivor_age_group,
    c.survivor_gender,
    c.case_status,
    c.priority_level,
    -- Count assignments by organization
    COUNT(DISTINCT CASE WHEN ca.organization_type = 'rainbo' THEN ca.id END) as rainbo_assignments,
    COUNT(DISTINCT CASE WHEN ca.organization_type = 'police_fsu' THEN ca.id END) as police_assignments,
    -- Latest update
    (SELECT MAX(created_at) FROM case_updates WHERE case_id = c.id) as last_update,
    -- Unread notifications
    COUNT(DISTINCT CASE WHEN cn.is_read = FALSE THEN cn.id END) as unread_notifications
FROM gbv_cases c
LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
LEFT JOIN districts d ON c.district_id = d.id
LEFT JOIN case_assignments ca ON c.id = ca.case_id
LEFT JOIN case_notifications cn ON c.id = cn.case_id
GROUP BY c.id;
