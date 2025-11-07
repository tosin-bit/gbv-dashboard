-- Populate case_referral_rules now that gbv_types has data

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

-- Verify
SELECT 'Referral Rules Created:' as info;
SELECT COUNT(*) as total FROM case_referral_rules;

SELECT 'Rules by Organization:' as info;
SELECT organization_type, COUNT(*) as count, GROUP_CONCAT(priority) as priorities 
FROM case_referral_rules 
GROUP BY organization_type;
