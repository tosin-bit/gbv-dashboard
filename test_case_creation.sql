-- Test creating a rape case to verify auto-assignment
-- This should automatically assign to both Police FSU and Rainbo Initiative

-- First, get the rape GBV type ID
SELECT 'GBV Types:' as info;
SELECT id, name, category FROM gbv_types WHERE category = 'sexual_violence';

-- Get district ID for Western Area Urban
SELECT 'Districts:' as info;
SELECT id, name FROM districts WHERE name = 'Western Area Urban';

-- Check case_referral_rules
SELECT 'Referral Rules:' as info;
SELECT * FROM case_referral_rules WHERE is_active = TRUE;

-- Count existing cases
SELECT 'Existing Cases:' as info;
SELECT COUNT(*) as total_cases FROM gbv_cases;

-- Count existing case assignments
SELECT 'Existing Assignments:' as info;
SELECT organization_type, COUNT(*) as count FROM case_assignments GROUP BY organization_type;

-- Count existing notifications
SELECT 'Existing Notifications:' as info;
SELECT target_organization, COUNT(*) as count FROM case_notifications GROUP BY target_organization;
