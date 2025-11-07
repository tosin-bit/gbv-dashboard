-- Retroactively assign cases that were created before auto-assignment rules

-- Case 2, 3, 4 are Rape - assign to Police FSU and Rainbo
-- Case 6 is Economic Abuse - assign to Ministry

-- Case GBV-2025-0002 (Rape)
INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (2, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (2, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

-- Create notifications for case 2
INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  2,
  (SELECT id FROM case_assignments WHERE case_id = 2 AND organization_type = 'police_fsu'),
  'police_fsu',
  'new_case',
  'New Case Assigned: GBV-2025-0002',
  'A new rape case has been assigned to Police FSU for investigation.',
  '/cases/GBV-2025-0002',
  datetime('now')
);

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  2,
  (SELECT id FROM case_assignments WHERE case_id = 2 AND organization_type = 'rainbo'),
  'rainbo',
  'new_case',
  'New Case Assigned: GBV-2025-0002',
  'A new rape case has been assigned to Rainbo for immediate medical attention.',
  '/cases/GBV-2025-0002',
  datetime('now')
);

-- Case GBV-2025-0003 (Rape)
INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (3, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (3, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  3,
  (SELECT id FROM case_assignments WHERE case_id = 3 AND organization_type = 'police_fsu'),
  'police_fsu',
  'new_case',
  'New Case Assigned: GBV-2025-0003',
  'A new rape case has been assigned to Police FSU for investigation.',
  '/cases/GBV-2025-0003',
  datetime('now')
);

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  3,
  (SELECT id FROM case_assignments WHERE case_id = 3 AND organization_type = 'rainbo'),
  'rainbo',
  'new_case',
  'New Case Assigned: GBV-2025-0003',
  'A new rape case has been assigned to Rainbo for immediate medical attention.',
  '/cases/GBV-2025-0003',
  datetime('now')
);

-- Case GBV-2025-0004 (Rape)
INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (4, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (4, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  4,
  (SELECT id FROM case_assignments WHERE case_id = 4 AND organization_type = 'police_fsu'),
  'police_fsu',
  'new_case',
  'New Case Assigned: GBV-2025-0004',
  'A new rape case has been assigned to Police FSU for investigation.',
  '/cases/GBV-2025-0004',
  datetime('now')
);

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  4,
  (SELECT id FROM case_assignments WHERE case_id = 4 AND organization_type = 'rainbo'),
  'rainbo',
  'new_case',
  'New Case Assigned: GBV-2025-0004',
  'A new rape case has been assigned to Rainbo for immediate medical attention.',
  '/cases/GBV-2025-0004',
  datetime('now')
);

-- Case GBV-2025-0006 (Economic Abuse) - assign to Ministry
INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (6, 'ministry', 'Economic violence requires social welfare intervention and economic empowerment support', 'normal', 'pending');

-- For Rainbo - may need psychosocial support
INSERT OR IGNORE INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (6, 'rainbo', 'Economic abuse survivors may benefit from psychosocial counseling', 'normal', 'pending');

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  6,
  (SELECT id FROM case_assignments WHERE case_id = 6 AND organization_type = 'ministry'),
  'ministry',
  'new_case',
  'New Case Assigned: GBV-2025-0006',
  'A new economic abuse case has been assigned to the Ministry for social welfare intervention.',
  '/cases/GBV-2025-0006',
  datetime('now')
);

INSERT INTO case_notifications (
  case_id, assignment_id, organization_type, notification_type, title, message, action_url, created_at
) VALUES (
  6,
  (SELECT id FROM case_assignments WHERE case_id = 6 AND organization_type = 'rainbo'),
  'rainbo',
  'new_case',
  'New Case Assigned: GBV-2025-0006',
  'A new economic abuse case has been assigned to Rainbo for psychosocial support.',
  '/cases/GBV-2025-0006',
  datetime('now')
);

-- Add timeline updates for all cases
INSERT INTO case_updates (case_id, assignment_id, update_type, update_category, title, description, created_by, created_by_organization, is_milestone)
VALUES (2, NULL, 'case_created', 'general', 'Case Created', 'Case reported and entered into system', 1, 'ministry', TRUE);

INSERT INTO case_updates (case_id, assignment_id, update_type, update_category, title, description, created_by, created_by_organization, is_milestone)
VALUES (3, NULL, 'case_created', 'general', 'Case Created', 'Case reported and entered into system', 1, 'ministry', TRUE);

INSERT INTO case_updates (case_id, assignment_id, update_type, update_category, title, description, created_by, created_by_organization, is_milestone)
VALUES (4, NULL, 'case_created', 'general', 'Case Created', 'Case reported and entered into system', 1, 'ministry', TRUE);

INSERT INTO case_updates (case_id, assignment_id, update_type, update_category, title, description, created_by, created_by_organization, is_milestone)
VALUES (6, NULL, 'case_created', 'general', 'Case Created', 'Case reported and entered into system', 1, 'ministry', TRUE);
