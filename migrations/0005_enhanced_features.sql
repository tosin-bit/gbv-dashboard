-- Migration 0005: Enhanced Features for Comprehensive GBV System
-- Based on Sierra Leone Spotlight Initiative 4 Pillars
-- Created: 2025-01-13

-- ============================================================================
-- PILLAR 3: RESPONSE SERVICES - Note-Taking System
-- ============================================================================

-- Case notes for detailed documentation
CREATE TABLE IF NOT EXISTS case_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  note_type TEXT NOT NULL CHECK(note_type IN ('general', 'medical', 'legal', 'psychosocial', 'followup', 'safety_planning', 'referral')),
  note_content TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT 0,
  voice_transcription BOOLEAN DEFAULT 0, -- Indicates if created via speech-to-text
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES gbv_cases(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_case_notes_case_id ON case_notes(case_id);
CREATE INDEX IF NOT EXISTS idx_case_notes_user_id ON case_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_case_notes_type ON case_notes(note_type);
CREATE INDEX IF NOT EXISTS idx_case_notes_created ON case_notes(created_at DESC);

-- Note attachments (for documents, photos, etc.)
CREATE TABLE IF NOT EXISTS note_attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_url TEXT NOT NULL,
  uploaded_by INTEGER NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (note_id) REFERENCES case_notes(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_note_attachments_note_id ON note_attachments(note_id);

-- ============================================================================
-- PILLAR 1: LAWS, POLICIES & INSTITUTIONS - Legal Resources Library
-- ============================================================================

-- Resource categories
CREATE TABLE IF NOT EXISTS resource_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT, -- Icon class for UI
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT OR IGNORE INTO resource_categories (name, description, icon, display_order) VALUES
('Laws & Legislation', 'Sierra Leone GBV laws, Sexual Offences Act, Domestic Violence Act, Child Rights Act', 'fa-gavel', 1),
('Policies & Guidelines', 'National policies, institutional guidelines, SOPs for service providers', 'fa-file-text', 2),
('Procedures & Protocols', 'Case management protocols, referral procedures, investigation guidelines', 'fa-list-check', 3),
('Training Materials', 'Capacity building resources, training modules, workshops', 'fa-graduation-cap', 4),
('Educational Content', 'Survivor rights, prevention education, community awareness', 'fa-book-open', 5),
('Forms & Templates', 'Intake forms, assessment tools, reporting templates', 'fa-file-alt', 6),
('Advocacy Resources', 'Campaign materials, advocacy toolkits, grassroots organizing', 'fa-bullhorn', 7),
('Research & Data', 'GBV statistics, research reports, impact studies', 'fa-chart-line', 8);

-- Resources library
CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK(content_type IN ('document', 'video', 'audio', 'interactive', 'link', 'infographic')),
  content_url TEXT, -- URL to document/media or NULL for text content
  text_content TEXT, -- For text-based content
  author TEXT,
  source TEXT,
  publication_date DATE,
  language TEXT DEFAULT 'English',
  tags TEXT, -- JSON array of tags
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  is_public BOOLEAN DEFAULT 1, -- Public resources visible to all
  required_role TEXT, -- NULL = all roles, or specific role requirement
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES resource_categories(id)
);

CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(content_type);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_resources_public ON resources(is_public);

-- Insert sample legal resources
INSERT OR IGNORE INTO resources (category_id, title, description, content_type, text_content, author, source, publication_date, language, tags, is_featured) VALUES
(1, 'Sexual Offences Act 2012', 'The Sexual Offences Act 2012 criminalizes sexual offenses including rape, sexual assault, and child sexual abuse. It establishes the Special Court for Sexual Offences and provides protection for survivors.', 'document', 
'KEY PROVISIONS:

Part I: Preliminary
- Defines sexual assault, rape, sexual penetration, child sexual abuse
- Age of consent: 18 years

Part II: Sexual Offenses
Section 4 - Rape: Any person who commits rape is liable on conviction to life imprisonment
Section 5 - Sexual Penetration: Liable to imprisonment for a minimum of 5 years and maximum of 15 years
Section 6 - Sexual Assault: Minimum of 3 years, maximum of 10 years
Section 19 - Child Sexual Abuse: Life imprisonment

Part III: Protection of Survivors
- Right to legal representation
- Right to privacy and protection from intimidation
- Right to medical examination and treatment
- Right to psychosocial support

Part IV: Special Court for Sexual Offences
- Fast-track adjudication of sexual offence cases
- Survivor-sensitive procedures
- In-camera hearings for survivor protection', 
'Government of Sierra Leone', 'Official Gazette', '2012-08-15', 'English', '["law", "sexual offences", "rape", "child protection", "survivors rights"]', 1),

(1, 'Domestic Violence Act 2007', 'Provides legal protection against domestic violence, including physical, sexual, psychological, and economic abuse within domestic relationships.', 'document',
'KEY PROVISIONS:

Section 3 - Definition of Domestic Violence:
- Physical abuse: assault, battery, harm
- Sexual abuse: forced sexual acts
- Psychological abuse: threats, intimidation, harassment
- Economic abuse: control of finances, denial of resources

Section 4 - Protection Orders:
- Occupation Orders (remove abuser from home)
- Tenancy Orders (transfer tenancy rights)
- Protection Orders (prohibit contact/harassment)

Section 5 - Powers of Police:
- Arrest without warrant
- Immediate protection of survivors
- Referral to support services

Section 7 - Offences and Penalties:
- Violation of protection order: up to 2 years imprisonment
- Domestic violence offences: fines and imprisonment',
'Government of Sierra Leone', 'Official Gazette', '2007-06-07', 'English', '["law", "domestic violence", "protection orders", "family law"]', 1),

(1, 'Child Rights Act 2007', 'Comprehensive legislation protecting children from abuse, neglect, and exploitation. Establishes minimum age for marriage at 18.', 'document',
'KEY PROVISIONS:

Part III - Protection from Abuse and Neglect
Section 26 - Physical and sexual abuse
Section 27 - Child marriage prohibited (minimum age 18)
Section 28 - FGM/C prohibited
Section 29 - Child trafficking prohibited

Part IV - Child Justice System
Section 65 - Child-friendly court procedures
Section 66 - Best interests of the child principle
Section 67 - Rehabilitation over punishment

Part V - Responsibilities
- Parental responsibilities and rights
- State responsibility to protect children
- Community duty to report abuse',
'Government of Sierra Leone', 'Official Gazette', '2007-06-14', 'English', '["law", "child rights", "child protection", "child marriage", "FGM"]', 1);

-- Insert sample educational content
INSERT OR IGNORE INTO resources (category_id, title, description, content_type, text_content, language, tags, is_featured, is_public) VALUES
(5, 'Your Rights as a GBV Survivor', 'Know your rights: Every survivor has the right to safety, dignity, confidentiality, and justice.', 'interactive',
'SURVIVOR RIGHTS:

1. RIGHT TO SAFETY
- Protection from further violence
- Safe accommodation if needed
- Police protection and escort services
- Emergency response (Call 116 - National GBV Hotline)

2. RIGHT TO MEDICAL CARE
- Free emergency medical treatment at Rainbo Centers
- Post-exposure prophylaxis (PEP) within 72 hours
- Emergency contraception
- Treatment for injuries
- HIV testing and counseling
- Documentation of injuries for legal proceedings

3. RIGHT TO CONFIDENTIALITY
- Your information is protected
- Services are provided in private settings
- Your identity is protected in court (can testify behind screen)
- Medical records are confidential

4. RIGHT TO JUSTICE
- Free legal representation
- Right to report to police
- Fast-track court procedures (Sexual Offences Court)
- Right to be heard in court
- Protection from intimidation
- Right to compensation

5. RIGHT TO PSYCHOSOCIAL SUPPORT
- Counseling services
- Support groups
- Crisis intervention
- Mental health services
- Long-term support

6. RIGHT TO INFORMATION
- Right to understand the legal process
- Right to know your options
- Right to ask questions
- Right to updates on your case

REMEMBER: You did nothing wrong. Help is available. You are not alone.',
'English', '["survivor rights", "education", "empowerment", "support services"]', 1, 1);

-- ============================================================================
-- PILLAR 2: PREVENTION - Educational Content & Training
-- ============================================================================

-- Educational modules
CREATE TABLE IF NOT EXISTS educational_modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  module_type TEXT NOT NULL CHECK(module_type IN ('survivor_rights', 'prevention', 'bystander_intervention', 'service_provider_training', 'community_education', 'youth_education')),
  target_audience TEXT NOT NULL, -- survivors, service_providers, community, youth, etc.
  duration_minutes INTEGER,
  difficulty_level TEXT CHECK(difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  content_json TEXT, -- JSON structure for lessons/slides
  animation_url TEXT, -- URL to animation/video
  completion_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0.0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_modules_type ON educational_modules(module_type);
CREATE INDEX IF NOT EXISTS idx_modules_audience ON educational_modules(target_audience);
CREATE INDEX IF NOT EXISTS idx_modules_active ON educational_modules(is_active);

-- Module completion tracking
CREATE TABLE IF NOT EXISTS module_completions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  module_id INTEGER NOT NULL,
  user_id INTEGER,
  completion_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  score REAL,
  feedback TEXT,
  FOREIGN KEY (module_id) REFERENCES educational_modules(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_completions_module ON module_completions(module_id);
CREATE INDEX IF NOT EXISTS idx_completions_user ON module_completions(user_id);

-- Insert sample educational modules
INSERT OR IGNORE INTO educational_modules (title, description, module_type, target_audience, duration_minutes, difficulty_level, content_json) VALUES
('Understanding GBV: Types and Forms', 'Learn about different types of gender-based violence including physical, sexual, psychological, and economic abuse.', 'prevention', 'community', 15, 'beginner',
'{"lessons": [
  {"title": "What is GBV?", "content": "Gender-based violence is any harmful act directed at individuals based on their gender. It includes physical violence, sexual violence, psychological abuse, and economic abuse.", "duration": 3},
  {"title": "Types of GBV", "content": "Physical violence (hitting, slapping, burning), Sexual violence (rape, sexual assault, FGM), Psychological (threats, intimidation, isolation), Economic (controlling money, preventing work)", "duration": 5},
  {"title": "Warning Signs", "content": "Recognize warning signs: controlling behavior, extreme jealousy, isolation from friends/family, threats, intimidation, forced sexual activity", "duration": 4},
  {"title": "How to Help", "content": "Listen without judgment, believe survivors, provide information about services, respect their decisions, maintain confidentiality", "duration": 3}
]}'),

('Bystander Intervention: How to Safely Help', 'Learn safe and effective ways to intervene when you witness GBV or support someone experiencing violence.', 'bystander_intervention', 'community', 20, 'intermediate',
'{"lessons": [
  {"title": "The 5 Ds of Bystander Intervention", "content": "Direct: Directly address the situation if safe. Distract: Create a distraction to interrupt. Delegate: Get help from others or authorities. Delay: Check in with the person later. Document: Record evidence safely if appropriate.", "duration": 5},
  {"title": "Assessing Safety", "content": "Before intervening, assess: Is it safe for you? Is it safe for the survivor? What resources are available? Do you have support?", "duration": 5},
  {"title": "Supporting a Survivor", "content": "Believe them, listen without judgment, respect their autonomy, provide information about services, follow up if they want support", "duration": 5},
  {"title": "Taking Care of Yourself", "content": "Witnessing or responding to GBV can be traumatic. Seek support, practice self-care, connect with others, know your limits", "duration": 5}
]}'),

('Case Management Best Practices', 'Comprehensive training for service providers on survivor-centered case management.', 'service_provider_training', 'service_providers', 60, 'advanced',
'{"lessons": [
  {"title": "Survivor-Centered Approach", "content": "Put survivor safety, dignity, confidentiality, and autonomy at the center of all interventions. Respect their choices and pace.", "duration": 10},
  {"title": "Initial Assessment", "content": "Safety assessment, immediate needs, risk factors, support systems, consent for services", "duration": 10},
  {"title": "Service Coordination", "content": "Coordinate medical, legal, psychosocial, and safety services. Use referral pathways. Follow up on referrals.", "duration": 15},
  {"title": "Documentation", "content": "Accurate, confidential documentation. Use standard forms. Document injuries for legal proceedings. Maintain confidentiality.", "duration": 10},
  {"title": "Safety Planning", "content": "Develop personalized safety plans. Identify safe people and places. Emergency contacts. Safety at home, work, school.", "duration": 10},
  {"title": "Self-Care for Providers", "content": "Preventing secondary trauma, setting boundaries, peer support, supervision, work-life balance", "duration": 5}
]}');

-- ============================================================================
-- PILLAR 4: WOMEN'S MOVEMENTS - Support for Organizations
-- ============================================================================

-- Community organizations and grassroots groups
CREATE TABLE IF NOT EXISTS community_organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  organization_type TEXT CHECK(organization_type IN ('womens_group', 'youth_group', 'survivor_led', 'advocacy', 'service_provider', 'faith_based', 'traditional_leaders')),
  district_id INTEGER,
  chiefdom TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  services_offered TEXT, -- JSON array
  target_population TEXT,
  is_verified BOOLEAN DEFAULT 0,
  partnership_status TEXT CHECK(partnership_status IN ('active', 'inactive', 'pending')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

CREATE INDEX IF NOT EXISTS idx_orgs_type ON community_organizations(organization_type);
CREATE INDEX IF NOT EXISTS idx_orgs_district ON community_organizations(district_id);
CREATE INDEX IF NOT EXISTS idx_orgs_status ON community_organizations(partnership_status);

-- Training and capacity building events
CREATE TABLE IF NOT EXISTS training_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  training_type TEXT CHECK(training_type IN ('workshop', 'webinar', 'field_training', 'conference', 'mentorship')),
  organizer TEXT,
  district_id INTEGER,
  venue TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  target_audience TEXT,
  facilitators TEXT, -- JSON array
  materials_url TEXT,
  certificate_available BOOLEAN DEFAULT 0,
  status TEXT CHECK(status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

CREATE INDEX IF NOT EXISTS idx_training_district ON training_events(district_id);
CREATE INDEX IF NOT EXISTS idx_training_status ON training_events(status);
CREATE INDEX IF NOT EXISTS idx_training_date ON training_events(start_date);

-- ============================================================================
-- User Activity & Engagement Tracking
-- ============================================================================

-- Track resource views and downloads
CREATE TABLE IF NOT EXISTS resource_activity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL,
  user_id INTEGER,
  activity_type TEXT CHECK(activity_type IN ('view', 'download', 'share', 'bookmark')),
  activity_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_resource_activity_resource ON resource_activity(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_activity_user ON resource_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_activity_type ON resource_activity(activity_type);

-- User bookmarks for quick access
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  resource_type TEXT NOT NULL CHECK(resource_type IN ('case', 'resource', 'training', 'organization')),
  resource_id INTEGER NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_type ON user_bookmarks(resource_type);

-- ============================================================================
-- Speech-to-Text Configuration
-- ============================================================================

-- Store speech transcription sessions
CREATE TABLE IF NOT EXISTS speech_transcriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  case_id INTEGER,
  transcription_text TEXT NOT NULL,
  audio_duration_seconds INTEGER,
  language TEXT DEFAULT 'en',
  confidence_score REAL,
  status TEXT CHECK(status IN ('processing', 'completed', 'error')) DEFAULT 'completed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (case_id) REFERENCES gbv_cases(id)
);

CREATE INDEX IF NOT EXISTS idx_transcriptions_user ON speech_transcriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_case ON speech_transcriptions(case_id);

-- ============================================================================
-- Reporting Templates
-- ============================================================================

CREATE TABLE IF NOT EXISTS report_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_name TEXT NOT NULL,
  template_type TEXT CHECK(template_type IN ('case_report', 'district_report', 'monthly_summary', 'incident_report', 'service_provider_report', 'advocacy_report')),
  description TEXT,
  template_json TEXT NOT NULL, -- JSON structure for template
  required_role TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_templates_type ON report_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_templates_active ON report_templates(is_active);

-- ============================================================================
-- Notifications System
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  notification_type TEXT CHECK(notification_type IN ('case_update', 'training', 'resource', 'system', 'reminder')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  is_read BOOLEAN DEFAULT 0,
  priority TEXT CHECK(priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- ============================================================================
-- Initial Data for Testing
-- ============================================================================

-- Insert sample community organizations
INSERT OR IGNORE INTO community_organizations (name, organization_type, district_id, contact_person, phone, services_offered, target_population, is_verified, partnership_status) VALUES
('Survivor Solidarity Movement', 'survivor_led', 1, 'Fatmata Kamara', '+232 76 123456', '["peer support", "advocacy", "awareness"]', 'GBV survivors', 1, 'active'),
('Women Against Violence Initiative', 'womens_group', 1, 'Aminata Sesay', '+232 77 234567', '["community education", "prevention", "support groups"]', 'Women and girls', 1, 'active'),
('Youth for Change - Freetown', 'youth_group', 1, 'Mohamed Bangura', '+232 78 345678', '["youth education", "bystander intervention", "male engagement"]', 'Youth 15-35', 1, 'active');

-- Insert sample training events
INSERT OR IGNORE INTO training_events (title, description, training_type, organizer, district_id, venue, start_date, end_date, capacity, target_audience, status) VALUES
('Survivor-Centered Case Management', 'Comprehensive training on best practices for case management with GBV survivors', 'workshop', 'Ministry of Gender and Children Affairs', 1, 'Freetown Conference Center', '2025-02-15 09:00:00', '2025-02-17 17:00:00', 50, 'Service providers from all sectors', 'upcoming'),
('Community Champions Training', 'Training community leaders and volunteers on GBV prevention and response', 'field_training', 'Spotlight Initiative', 2, 'Bo Community Center', '2025-03-10 09:00:00', '2025-03-12 17:00:00', 100, 'Traditional leaders, community volunteers', 'upcoming');

-- Note: Notifications for system launch can be added after users are created
