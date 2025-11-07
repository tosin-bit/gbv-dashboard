-- Add comprehensive auto-assignment rules for ALL GBV types

-- Get GBV type IDs first
-- Economic Abuse, Psychological Abuse, Child Marriage, Forced Marriage, Denial of Resources

-- Economic Abuse - should go to Ministry for social services
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Economic Abuse'),
  'ministry',
  'Economic violence requires social welfare intervention and economic empowerment support',
  'normal',
  TRUE,
  TRUE
);

-- Psychological Abuse - Ministry and potentially Rainbo for counseling
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Psychological Abuse'),
  'rainbo',
  'Psychological violence requires psychosocial counseling and trauma support',
  'high',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Psychological Abuse'),
  'ministry',
  'Psychological violence requires social welfare case management',
  'normal',
  TRUE,
  TRUE
);

-- Child Marriage - Police FSU (criminal) and Ministry (protection)
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Child Marriage'),
  'police_fsu',
  'Child marriage is illegal and requires criminal investigation',
  'urgent',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Child Marriage'),
  'ministry',
  'Child marriage requires child protection intervention',
  'urgent',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Child Marriage'),
  'rainbo',
  'Child marriage survivor may require medical examination and counseling',
  'high',
  TRUE,
  TRUE
);

-- Forced Marriage - Similar to child marriage
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Forced Marriage'),
  'police_fsu',
  'Forced marriage requires criminal investigation',
  'high',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Forced Marriage'),
  'ministry',
  'Forced marriage requires social welfare intervention',
  'high',
  TRUE,
  TRUE
);

-- Denial of Resources - Ministry for economic support
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Denial of Resources'),
  'ministry',
  'Denial of resources requires social welfare and economic support',
  'normal',
  TRUE,
  TRUE
);

-- Add Police FSU for ALL physical violence cases (not just some)
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Intimate Partner Violence'),
  'police_fsu',
  'Physical violence requires police investigation and protection orders',
  'high',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Domestic Violence'),
  'police_fsu',
  'Domestic violence requires police investigation and protection orders',
  'high',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Physical Assault'),
  'police_fsu',
  'Physical assault requires police investigation',
  'high',
  TRUE,
  TRUE
);

INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  (SELECT id FROM gbv_types WHERE name = 'Female Genital Mutilation'),
  'police_fsu',
  'FGM is illegal and requires criminal investigation',
  'urgent',
  TRUE,
  TRUE
);

-- DEFAULT RULE: All unmatched cases should at least go to Ministry
INSERT OR IGNORE INTO case_referral_rules (
  gbv_type_id, organization_type, assignment_reason, priority, is_active, auto_assign
) VALUES (
  NULL,  -- NULL means this applies to ALL types as fallback
  'ministry',
  'All GBV cases require Ministry coordination and case management',
  'normal',
  TRUE,
  TRUE
);
