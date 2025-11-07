-- Migration 0004: Evidence Chain of Custody and Comprehensive Audit Logging System
-- For Police FSU advanced investigation tracking

-- Evidence Chain of Custody Table
CREATE TABLE IF NOT EXISTS evidence_chain_of_custody (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    evidence_number TEXT NOT NULL UNIQUE,
    evidence_type TEXT NOT NULL, -- physical_evidence, digital_evidence, documents, forensic_samples
    description TEXT NOT NULL,
    collected_by_user_id INTEGER NOT NULL,
    collected_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    collection_location TEXT,
    
    -- Chain of custody tracking
    current_custodian_user_id INTEGER,
    current_location TEXT,
    storage_facility TEXT,
    
    -- Evidence details
    quantity INTEGER DEFAULT 1,
    unit_of_measure TEXT, -- items, grams, liters, etc.
    condition_at_collection TEXT, -- excellent, good, fair, poor, damaged
    packaging_method TEXT,
    seal_number TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'collected', -- collected, in_storage, in_lab, transferred, presented_in_court, destroyed
    chain_intact BOOLEAN DEFAULT TRUE,
    
    -- Additional metadata
    notes TEXT,
    photo_urls TEXT, -- JSON array of photo URLs
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (collected_by_user_id) REFERENCES users(id),
    FOREIGN KEY (current_custodian_user_id) REFERENCES users(id)
);

CREATE INDEX idx_evidence_case_id ON evidence_chain_of_custody(case_id);
CREATE INDEX idx_evidence_number ON evidence_chain_of_custody(evidence_number);
CREATE INDEX idx_evidence_status ON evidence_chain_of_custody(status);

-- Evidence Transfer Log Table (for complete chain of custody)
CREATE TABLE IF NOT EXISTS evidence_transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evidence_id INTEGER NOT NULL,
    
    -- Transfer details
    transferred_from_user_id INTEGER NOT NULL,
    transferred_to_user_id INTEGER NOT NULL,
    transfer_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    transfer_reason TEXT NOT NULL,
    
    -- Location tracking
    from_location TEXT,
    to_location TEXT,
    
    -- Verification
    evidence_condition TEXT, -- excellent, good, fair, poor
    seal_intact BOOLEAN DEFAULT TRUE,
    seal_number_verified TEXT,
    
    -- Digital signatures (in production, would use actual digital signatures)
    transferred_by_signature TEXT, -- Base64 encoded signature or user confirmation
    received_by_signature TEXT,
    witness_user_id INTEGER,
    witness_signature TEXT,
    
    -- Additional details
    transport_method TEXT,
    transfer_notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (evidence_id) REFERENCES evidence_chain_of_custody(id),
    FOREIGN KEY (transferred_from_user_id) REFERENCES users(id),
    FOREIGN KEY (transferred_to_user_id) REFERENCES users(id),
    FOREIGN KEY (witness_user_id) REFERENCES users(id)
);

CREATE INDEX idx_evidence_transfers_evidence_id ON evidence_transfers(evidence_id);
CREATE INDEX idx_evidence_transfers_datetime ON evidence_transfers(transfer_datetime);

-- Comprehensive Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Who did what
    user_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    user_role TEXT NOT NULL,
    organization_type TEXT NOT NULL, -- ministry, rainbo, police_fsu
    
    -- Action details
    action_type TEXT NOT NULL, -- CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT, PRINT
    table_name TEXT, -- Which table was affected
    record_id INTEGER, -- Which record was affected
    
    -- What changed
    field_name TEXT, -- Which field was modified
    old_value TEXT, -- Previous value (JSON if complex object)
    new_value TEXT, -- New value (JSON if complex object)
    
    -- Context
    case_id INTEGER, -- If action relates to a case
    case_number TEXT,
    action_description TEXT NOT NULL,
    
    -- Technical details
    ip_address TEXT,
    user_agent TEXT,
    session_id TEXT,
    
    -- Timestamp
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id)
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_case_id ON audit_logs(case_id);
CREATE INDEX idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);

-- Witness Statements Table
CREATE TABLE IF NOT EXISTS witness_statements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    
    -- Witness information
    witness_name TEXT NOT NULL,
    witness_relationship TEXT, -- victim, family_member, neighbor, stranger, police_officer, medical_staff
    witness_contact TEXT,
    
    -- Statement details
    statement_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statement_location TEXT,
    statement_text TEXT NOT NULL,
    
    -- Recording details
    recorded_by_user_id INTEGER NOT NULL,
    recording_method TEXT, -- written, audio_recorded, video_recorded
    recording_file_url TEXT, -- If audio/video recorded
    
    -- Verification
    witness_signature TEXT, -- Base64 or confirmation
    witness_id_verified BOOLEAN DEFAULT FALSE,
    witness_id_type TEXT, -- national_id, passport, drivers_license
    
    -- Status
    statement_status TEXT DEFAULT 'draft', -- draft, finalized, signed, sworn_affidavit
    
    -- Additional details
    interpreter_used BOOLEAN DEFAULT FALSE,
    interpreter_name TEXT,
    notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (recorded_by_user_id) REFERENCES users(id)
);

CREATE INDEX idx_witness_case_id ON witness_statements(case_id);
CREATE INDEX idx_witness_status ON witness_statements(statement_status);

-- Court Case Tracking Table
CREATE TABLE IF NOT EXISTS court_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    
    -- Court details
    court_name TEXT NOT NULL,
    court_type TEXT, -- magistrate, high_court, supreme_court
    case_number TEXT UNIQUE,
    filing_date DATE,
    
    -- Parties
    prosecutor_name TEXT,
    defense_attorney_name TEXT,
    judge_name TEXT,
    
    -- Charges
    charges TEXT NOT NULL, -- JSON array of charges
    charge_severity TEXT, -- misdemeanor, felony
    
    -- Status tracking
    court_status TEXT DEFAULT 'filed', -- filed, under_trial, adjourned, verdict_reached, appealed
    next_hearing_date DATE,
    
    -- Outcomes
    verdict TEXT, -- guilty, not_guilty, dismissed, plea_bargain
    verdict_date DATE,
    sentence TEXT,
    
    -- Additional details
    bail_status TEXT, -- granted, denied, not_applicable
    bail_amount REAL,
    court_notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id)
);

CREATE INDEX idx_court_cases_case_id ON court_cases(case_id);
CREATE INDEX idx_court_cases_status ON court_cases(court_status);
CREATE INDEX idx_court_cases_filing_date ON court_cases(filing_date);

-- Court Hearings Table (for tracking multiple hearings)
CREATE TABLE IF NOT EXISTS court_hearings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    court_case_id INTEGER NOT NULL,
    
    -- Hearing details
    hearing_date DATE NOT NULL,
    hearing_time TIME,
    hearing_type TEXT, -- arraignment, pre_trial, trial, sentencing, appeal
    
    -- Outcome
    hearing_outcome TEXT, -- adjourned, evidence_presented, witness_testified, verdict, other
    next_hearing_date DATE,
    
    -- Attendance
    prosecutor_present BOOLEAN DEFAULT FALSE,
    defense_present BOOLEAN DEFAULT FALSE,
    defendant_present BOOLEAN DEFAULT FALSE,
    victim_present BOOLEAN DEFAULT FALSE,
    
    -- Notes
    proceedings_summary TEXT,
    evidence_presented TEXT,
    witnesses_called TEXT,
    
    -- Documentation
    recorded_by_user_id INTEGER,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (court_case_id) REFERENCES court_cases(id),
    FOREIGN KEY (recorded_by_user_id) REFERENCES users(id)
);

CREATE INDEX idx_court_hearings_court_case_id ON court_hearings(court_case_id);
CREATE INDEX idx_court_hearings_date ON court_hearings(hearing_date);
