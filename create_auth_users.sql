-- Create authentication users for portal access
-- Using role_id 6 (Service Provider) for organization staff

-- Rainbo Initiative Users
INSERT INTO users (username, password_hash, role_id, role, service_provider_type, name, email, organization, active, created_at)
VALUES 
  ('rainbo.freetown', '$2a$10$abcdefghijklmnopqrstuv', 6, 'rainbo_staff', 'rainbo', 'Rainbo Staff - Freetown', 'rainbo.freetown@rainbo.org', 'Rainbo Initiative - Freetown', TRUE, datetime('now')),
  ('rainbo.bo', '$2a$10$abcdefghijklmnopqrstuv', 6, 'rainbo_staff', 'rainbo', 'Rainbo Staff - Bo', 'rainbo.bo@rainbo.org', 'Rainbo Initiative - Bo', TRUE, datetime('now'));

-- Police FSU Users  
INSERT INTO users (username, password_hash, role_id, role, service_provider_type, name, email, organization, active, created_at)
VALUES
  ('fsu.freetown', '$2a$10$abcdefghijklmnopqrstuv', 6, 'police_fsu', 'police_fsu', 'FSU Officer - Freetown', 'fsu.freetown@police.gov.sl', 'Police FSU - Freetown', TRUE, datetime('now')),
  ('fsu.bo', '$2a$10$abcdefghijklmnopqrstuv', 6, 'police_fsu', 'police_fsu', 'FSU Officer - Bo', 'fsu.bo@police.gov.sl', 'Police FSU - Bo', TRUE, datetime('now'));

-- Ministry Users
INSERT INTO users (username, password_hash, role_id, role, service_provider_type, name, email, organization, active, created_at)
VALUES
  ('ministry.admin', '$2a$10$abcdefghijklmnopqrstuv', 1, 'ministry_admin', 'ministry', 'Ministry Administrator', 'admin@gender.gov.sl', 'Ministry of Gender and Children Affairs', TRUE, datetime('now'));

-- Verify users created
SELECT 'Authentication Users Created:' as info;
SELECT username, role, service_provider_type, name, organization FROM users WHERE username IS NOT NULL ORDER BY service_provider_type, username;
