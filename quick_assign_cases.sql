-- Quick assignment of missed cases

-- Case 2 (Rape)
INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (2, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (2, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

-- Case 3 (Rape)
INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (3, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (3, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

-- Case 4 (Rape)
INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (4, 'police_fsu', 'Sexual violence requires criminal investigation', 'high', 'pending');

INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (4, 'rainbo', 'Sexual violence requires immediate medical attention (PEP within 72 hours)', 'urgent', 'pending');

-- Case 6 (Economic Abuse)
INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (6, 'ministry', 'Economic violence requires social welfare intervention', 'normal', 'pending');

INSERT INTO case_assignments (case_id, organization_type, assignment_reason, priority, status)
VALUES (6, 'rainbo', 'Economic abuse survivors may benefit from psychosocial counseling', 'normal', 'pending');

-- Notifications for Police FSU
INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (2, 'new_case', 'police_fsu', 'New Case Assigned: GBV-2025-0002', 'Rape case assigned to Police FSU', '/cases/GBV-2025-0002', 'high');

INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (3, 'new_case', 'police_fsu', 'New Case Assigned: GBV-2025-0003', 'Rape case assigned to Police FSU', '/cases/GBV-2025-0003', 'high');

INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (4, 'new_case', 'police_fsu', 'New Case Assigned: GBV-2025-0004', 'Rape case assigned to Police FSU', '/cases/GBV-2025-0004', 'high');

-- Notifications for Rainbo
INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (2, 'new_case', 'rainbo', 'New Case Assigned: GBV-2025-0002', 'Rape case assigned to Rainbo - urgent medical attention needed', '/cases/GBV-2025-0002', 'urgent');

INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (3, 'new_case', 'rainbo', 'New Case Assigned: GBV-2025-0003', 'Rape case assigned to Rainbo - urgent medical attention needed', '/cases/GBV-2025-0003', 'urgent');

INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (4, 'new_case', 'rainbo', 'New Case Assigned: GBV-2025-0004', 'Rape case assigned to Rainbo - urgent medical attention needed', '/cases/GBV-2025-0004', 'urgent');

INSERT INTO case_notifications (case_id, notification_type, target_organization, title, message, action_url, priority)
VALUES (6, 'new_case', 'rainbo', 'New Case Assigned: GBV-2025-0006', 'Economic abuse case assigned to Rainbo for psychosocial support', '/cases/GBV-2025-0006', 'normal');
