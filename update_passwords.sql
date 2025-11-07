-- Update passwords to plain text for easy demo access
UPDATE users SET password_hash = 'rainbo2024' WHERE username LIKE 'rainbo.%';
UPDATE users SET password_hash = 'fsu2024' WHERE username LIKE 'fsu.%';
UPDATE users SET password_hash = 'ministry2024' WHERE username = 'ministry.admin';

-- Verify
SELECT 'Updated Passwords:' as info;
SELECT username, password_hash, role, service_provider_type FROM users WHERE username IS NOT NULL;
