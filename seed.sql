-- Enhanced GBV Dashboard Seed Data
-- Includes Sierra Leone geographic data and sample configuration

-- Insert Countries (Starting with Sierra Leone)
INSERT OR IGNORE INTO countries (id, name, code, region) VALUES 
(1, 'Sierra Leone', 'SL', 'West Africa'),
(2, 'Nigeria', 'NG', 'West Africa'),
(3, 'Ghana', 'GH', 'West Africa'),
(4, 'Liberia', 'LR', 'West Africa');

-- Sierra Leone Districts (All 16 Districts)
INSERT OR IGNORE INTO districts (id, country_id, name, code, population, latitude, longitude) VALUES 
(1, 1, 'Western Area Urban', 'WAU', 1050301, 8.4840, -13.2340),
(2, 1, 'Western Area Rural', 'WAR', 442951, 8.4500, -13.1800),
(3, 1, 'Bo', 'BO', 574462, 7.9644, -11.7383),
(4, 1, 'Bombali', 'BOM', 606183, 9.0000, -12.0000),
(5, 1, 'Bonthe', 'BON', 200730, 7.5264, -12.5056),
(6, 1, 'Moyamba', 'MOY', 318064, 8.1570, -12.4308),
(7, 1, 'Tonkolili', 'TON', 531435, 8.7000, -11.7833),
(8, 1, 'Port Loko', 'PL', 614063, 8.7678, -12.7876),
(9, 1, 'Kambia', 'KAM', 345474, 9.1250, -12.9167),
(10, 1, 'Kenema', 'KEN', 609873, 7.8767, -11.1900),
(11, 1, 'Kailahun', 'KAI', 525372, 8.2833, -10.5833),
(12, 1, 'Pujehun', 'PUJ', 345577, 7.3500, -11.7167),
(13, 1, 'Koinadugu', 'KOI', 409372, 9.7167, -11.3333),
(14, 1, 'Falaba', 'FAL', 204417, 9.7833, -10.7167),
(15, 1, 'Karene', 'KAR', 284042, 9.2833, -12.0500),
(16, 1, 'Kono', 'KON', 506365, 8.6411, -10.9608);

-- Sample Sub-districts for major districts
INSERT OR IGNORE INTO sub_districts (district_id, name, type) VALUES 
-- Western Area Urban chiefdoms
(1, 'Freetown', 'municipality'),
-- Bo District chiefdoms
(3, 'Baoma', 'chiefdom'),
(3, 'Bagbo', 'chiefdom'),
(3, 'Bagbwe', 'chiefdom'),
(3, 'Bumpe', 'chiefdom'),
-- Bombali District chiefdoms
(4, 'Makeni', 'municipality'),
(4, 'Bombali Sebora', 'chiefdom'),
(4, 'Gbendembu Ngowahun', 'chiefdom'),
-- Kenema District chiefdoms
(10, 'Kenema', 'municipality'),
(10, 'Dama', 'chiefdom'),
(10, 'Gorama Mende', 'chiefdom');

-- User Roles
INSERT OR IGNORE INTO user_roles (id, name, description, permissions) VALUES 
(1, 'System Administrator', 'Full system access and configuration', '["admin", "view_all", "edit_all", "manage_users", "manage_system"]'),
(2, 'National Coordinator', 'National level oversight and reporting', '["view_all", "edit_cases", "generate_reports", "manage_referrals"]'),
(3, 'District Coordinator', 'District level case management', '["view_district", "edit_district_cases", "manage_referrals"]'),
(4, 'Case Worker', 'Individual case management and services', '["view_assigned", "edit_assigned", "add_notes", "manage_services"]'),
(5, 'Data Entry Clerk', 'Case data entry and updates', '["add_cases", "edit_cases", "view_assigned"]'),
(6, 'Service Provider', 'View referrals and update service status', '["view_referrals", "update_services"]'),
(7, 'Report Viewer', 'Read-only access to reports and statistics', '["view_reports", "view_statistics"]');

-- Sample Users
INSERT OR IGNORE INTO users (id, email, name, role_id, organization, district_id) VALUES 
(1, 'admin@gbvdashboard.gov.sl', 'System Administrator', 1, 'Ministry of Gender and Children Affairs', NULL),
(2, 'national.coord@gbvdashboard.gov.sl', 'Dr. Aminata Koroma', 2, 'Ministry of Gender and Children Affairs', NULL),
(3, 'freetown.coord@gbvdashboard.gov.sl', 'Michael Bangura', 3, 'Freetown City Council', 1),
(4, 'bo.coord@gbvdashboard.gov.sl', 'Fatmata Sesay', 3, 'Bo District Council', 3),
(5, 'caseworker.freetown@ngo.org', 'Isatu Kamara', 4, 'Women Against Violence', 1),
(6, 'data.entry@health.gov.sl', 'Abdul Rahman', 5, 'Ministry of Health', 1);

-- GBV Types and Classifications
INSERT OR IGNORE INTO gbv_types (id, name, category, description, severity_level) VALUES 
(1, 'Rape', 'sexual_violence', 'Non-consensual sexual intercourse', 5),
(2, 'Sexual Assault', 'sexual_violence', 'Non-consensual sexual contact', 4),
(3, 'Sexual Harassment', 'sexual_violence', 'Unwelcome sexual advances or conduct', 2),
(4, 'Intimate Partner Violence', 'physical_violence', 'Violence by current or former intimate partner', 4),
(5, 'Domestic Violence', 'physical_violence', 'Violence within domestic setting', 4),
(6, 'Physical Assault', 'physical_violence', 'Non-domestic physical violence', 3),
(7, 'Emotional Abuse', 'emotional_violence', 'Psychological harm and intimidation', 2),
(8, 'Threats and Intimidation', 'emotional_violence', 'Verbal threats of harm', 3),
(9, 'Economic Abuse', 'economic_violence', 'Control over financial resources', 2),
(10, 'Forced Marriage', 'economic_violence', 'Marriage without consent', 4),
(11, 'Female Genital Mutilation', 'physical_violence', 'Harmful traditional practice', 4),
(12, 'Child Sexual Abuse', 'sexual_violence', 'Sexual violence against children', 5),
(13, 'Human Trafficking', 'economic_violence', 'Exploitation through force or coercion', 5);

-- Sample Service Providers
INSERT OR IGNORE INTO service_providers (name, type, contact_person, phone, district_id, services_offered, active) VALUES 
('Connaught Hospital', 'health', 'Dr. Sarah Johnson', '+232-22-234567', 1, '["medical_care", "forensic_examination", "counseling"]', TRUE),
('Bo Government Hospital', 'health', 'Dr. Mohamed Kargbo', '+232-32-234567', 3, '["medical_care", "counseling"]', TRUE),
('Sierra Leone Police - Family Support Unit', 'legal', 'Inspector Aminata Turay', '+232-22-345678', 1, '["legal_assistance", "investigation", "protection"]', TRUE),
('Legal Aid Board', 'legal', 'Barrister James Kamara', '+232-22-456789', 1, '["legal_representation", "court_support"]', TRUE),
('Women Against Violence SL', 'psychosocial', 'Fatmata Bangura', '+232-77-123456', 1, '["counseling", "support_groups", "advocacy"]', TRUE),
('Rainbo Centre', 'psychosocial', 'Dr. Olayinka Creighton-Randall', '+232-22-567890', 1, '["counseling", "medical_care", "legal_support"]', TRUE),
('Don Bosco Shelter', 'shelter', 'Sister Mary Joseph', '+232-22-678901', 1, '["temporary_accommodation", "food", "clothing"]', TRUE);

-- System Configuration
INSERT OR IGNORE INTO system_config (config_key, config_value, description) VALUES 
('dashboard_title', 'Enhanced GBV Dashboard - Sierra Leone', 'Main dashboard title'),
('primary_country', 'Sierra Leone', 'Primary country for the system'),
('case_number_prefix', 'GBV-SL-', 'Prefix for auto-generated case numbers'),
('default_language', 'en', 'Default system language'),
('enable_sms_notifications', 'true', 'Enable SMS notifications for referrals'),
('enable_email_notifications', 'true', 'Enable email notifications'),
('data_retention_months', '84', 'Number of months to retain case data (7 years)'),
('minimum_age_consent', '18', 'Minimum age for independent consent'),
('emergency_hotline', '116', 'National GBV emergency hotline number'),
('system_timezone', 'GMT', 'System timezone');

-- Sample Monthly Statistics (for dashboard demonstration)
INSERT OR IGNORE INTO monthly_stats (year, month, district_id, gbv_type_id, total_cases, cases_by_age_group, cases_by_gender, services_provided, cases_resolved) VALUES 
(2024, 10, 1, 1, 12, '{"0-17": 2, "18-24": 5, "25-34": 3, "35-49": 2}', '{"female": 11, "male": 1}', 15, 8),
(2024, 10, 1, 4, 18, '{"18-24": 7, "25-34": 8, "35-49": 3}', '{"female": 18}', 22, 12),
(2024, 10, 3, 1, 8, '{"0-17": 1, "18-24": 3, "25-34": 3, "35-49": 1}', '{"female": 8}', 10, 6),
(2024, 10, 3, 4, 14, '{"18-24": 5, "25-34": 6, "35-49": 3}', '{"female": 14}', 18, 10),
(2024, 9, 1, 1, 10, '{"0-17": 1, "18-24": 4, "25-34": 3, "35-49": 2}', '{"female": 9, "male": 1}', 12, 7),
(2024, 9, 1, 4, 16, '{"18-24": 6, "25-34": 7, "35-49": 3}', '{"female": 16}', 20, 14),
(2024, 9, 3, 1, 6, '{"0-17": 0, "18-24": 2, "25-34": 3, "35-49": 1}', '{"female": 6}', 8, 5),
(2024, 9, 3, 4, 12, '{"18-24": 4, "25-34": 5, "35-49": 3}', '{"female": 12}', 15, 9);