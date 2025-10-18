-- Add username and password columns to users table
ALTER TABLE users ADD COLUMN username TEXT;
ALTER TABLE users ADD COLUMN password_hash TEXT;
ALTER TABLE users ADD COLUMN role TEXT; -- 'admin', 'rainbo_staff', 'police_fsu', etc.
ALTER TABLE users ADD COLUMN service_provider_id INTEGER;
ALTER TABLE users ADD COLUMN service_provider_type TEXT; -- 'rainbo_centre', 'police_fsu', etc.

-- Create sessions table for authentication
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create index on sessions for faster lookups
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
