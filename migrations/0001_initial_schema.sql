-- Enhanced GBV Dashboard Database Schema
-- Initial migration for comprehensive GBV case management system

-- Countries/Regions Table
CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    region TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Administrative Districts/States/Provinces
CREATE TABLE IF NOT EXISTS districts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    population INTEGER,
    area_km2 REAL,
    latitude REAL,
    longitude REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- Sub-districts/Chiefdoms/Local Government Areas  
CREATE TABLE IF NOT EXISTS sub_districts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    district_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'chiefdom', -- chiefdom, ward, commune
    population INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- User Roles and Authentication
CREATE TABLE IF NOT EXISTS user_roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    permissions TEXT -- JSON array of permissions
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    organization TEXT,
    phone TEXT,
    district_id INTEGER, -- Users may be assigned to specific districts
    active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Service Provider Organizations
CREATE TABLE IF NOT EXISTS service_providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- health, legal, psychosocial, shelter, police
    contact_person TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    district_id INTEGER,
    sub_district_id INTEGER,
    services_offered TEXT, -- JSON array of services
    operating_hours TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (sub_district_id) REFERENCES sub_districts(id)
);

-- GBV Incident Types and Classifications
CREATE TABLE IF NOT EXISTS gbv_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- sexual_violence, physical_violence, emotional_violence, economic_violence
    description TEXT,
    severity_level INTEGER DEFAULT 1 -- 1-5 scale
);

-- Main GBV Cases/Incidents Table
CREATE TABLE IF NOT EXISTS gbv_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_number TEXT UNIQUE NOT NULL, -- Auto-generated unique case ID
    
    -- Incident Details
    incident_date DATE NOT NULL,
    reported_date DATE DEFAULT CURRENT_DATE,
    gbv_type_id INTEGER NOT NULL,
    incident_description TEXT,
    
    -- Location Information
    district_id INTEGER NOT NULL,
    sub_district_id INTEGER,
    location_details TEXT,
    
    -- Survivor Information (Anonymized)
    survivor_age_group TEXT NOT NULL, -- 0-17, 18-24, 25-34, 35-49, 50+
    survivor_gender TEXT NOT NULL,
    survivor_marital_status TEXT,
    survivor_education_level TEXT,
    survivor_occupation TEXT,
    survivor_disability TEXT, -- none, physical, intellectual, sensory, psychosocial
    
    -- Perpetrator Information (Anonymized)
    perpetrator_relationship TEXT, -- intimate_partner, family_member, acquaintance, stranger, authority_figure
    perpetrator_age_group TEXT,
    perpetrator_gender TEXT,
    number_of_perpetrators INTEGER DEFAULT 1,
    
    -- Case Management
    reported_by TEXT NOT NULL, -- survivor, family, witness, service_provider, other
    reporting_channel TEXT, -- hotline, police, health_facility, ngo, community_worker
    case_status TEXT DEFAULT 'reported', -- reported, under_investigation, services_provided, closed, referred
    priority_level TEXT DEFAULT 'medium', -- low, medium, high, critical
    
    -- Services and Follow-up
    immediate_needs TEXT, -- JSON array of immediate needs identified
    services_required TEXT, -- JSON array of services needed
    consent_to_services BOOLEAN DEFAULT FALSE,
    consent_to_data_sharing BOOLEAN DEFAULT FALSE,
    
    -- Privacy and Security
    safety_concerns TEXT,
    confidentiality_level TEXT DEFAULT 'high', -- low, medium, high, maximum
    
    -- System Fields
    created_by INTEGER NOT NULL, -- User who created the case
    assigned_to INTEGER, -- Case worker assigned
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (gbv_type_id) REFERENCES gbv_types(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (sub_district_id) REFERENCES sub_districts(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Case Services/Referrals Tracking
CREATE TABLE IF NOT EXISTS case_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    service_provider_id INTEGER NOT NULL,
    service_type TEXT NOT NULL, -- medical, legal, psychosocial, shelter, economic
    referral_date DATE DEFAULT CURRENT_DATE,
    service_date DATE,
    status TEXT DEFAULT 'pending', -- pending, provided, completed, cancelled, no_show
    outcome TEXT,
    follow_up_needed BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id)
);

-- Case Notes and Updates
CREATE TABLE IF NOT EXISTS case_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    note_type TEXT DEFAULT 'general', -- general, follow_up, service_update, safety_plan
    note_content TEXT NOT NULL,
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Statistical Aggregations (for dashboard performance)
CREATE TABLE IF NOT EXISTS monthly_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    district_id INTEGER,
    gbv_type_id INTEGER,
    total_cases INTEGER DEFAULT 0,
    cases_by_age_group TEXT, -- JSON object with age group counts
    cases_by_gender TEXT, -- JSON object with gender counts
    services_provided INTEGER DEFAULT 0,
    cases_resolved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (gbv_type_id) REFERENCES gbv_types(id),
    UNIQUE(year, month, district_id, gbv_type_id)
);

-- System Configuration
CREATE TABLE IF NOT EXISTS system_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_gbv_cases_district ON gbv_cases(district_id);
CREATE INDEX IF NOT EXISTS idx_gbv_cases_date ON gbv_cases(incident_date);
CREATE INDEX IF NOT EXISTS idx_gbv_cases_status ON gbv_cases(case_status);
CREATE INDEX IF NOT EXISTS idx_gbv_cases_type ON gbv_cases(gbv_type_id);
CREATE INDEX IF NOT EXISTS idx_gbv_cases_created_by ON gbv_cases(created_by);

CREATE INDEX IF NOT EXISTS idx_case_services_case ON case_services(case_id);
CREATE INDEX IF NOT EXISTS idx_case_services_provider ON case_services(service_provider_id);

CREATE INDEX IF NOT EXISTS idx_users_district ON users(district_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);

CREATE INDEX IF NOT EXISTS idx_monthly_stats_date ON monthly_stats(year, month);
CREATE INDEX IF NOT EXISTS idx_monthly_stats_district ON monthly_stats(district_id);

-- Create Views for Common Queries
CREATE VIEW IF NOT EXISTS case_summary AS
SELECT 
    c.id,
    c.case_number,
    c.incident_date,
    c.reported_date,
    gt.name as gbv_type,
    gt.category as gbv_category,
    d.name as district,
    sd.name as sub_district,
    c.survivor_age_group,
    c.survivor_gender,
    c.case_status,
    c.priority_level,
    u.name as assigned_case_worker,
    COUNT(cs.id) as services_count
FROM gbv_cases c
LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
LEFT JOIN districts d ON c.district_id = d.id
LEFT JOIN sub_districts sd ON c.sub_district_id = sd.id
LEFT JOIN users u ON c.assigned_to = u.id
LEFT JOIN case_services cs ON c.id = cs.case_id
GROUP BY c.id;