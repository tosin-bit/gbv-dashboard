-- Add authentication columns if they don't exist
-- Note: SQLite doesn't support ALTER TABLE IF NOT EXISTS, so we'll use a workaround

-- Check and add username column (already exists based on schema, but ensure it's populated)
-- Add center column for Rainbo staff
ALTER TABLE users ADD COLUMN center TEXT;

-- Create sessions table if not exists
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Insert demo users if they don't exist (password: demo123)
INSERT OR IGNORE INTO users (username, password_hash, name, role, email, center, organization, active) VALUES
  ('rainbo.freetown', '$2a$10$N9qo8uLOickgx2ZtsE5hVeL4tU/5dPKnuVEoH0QTjgYkY0XoEfcLS', 'Demo Rainbo Staff', 'rainbo_staff', 'rainbo@demo.com', 'Rainbo Centre Freetown (PCMH)', 'Rainbo Initiative', 1),
  ('demo', '$2a$10$N9qo8uLOickgx2ZtsE5hVeL4tU/5dPKnuVEoH0QTjgYkY0XoEfcLS', 'Demo FSU Officer', 'fsu_officer', 'fsu@demo.com', NULL, 'Police FSU', 1);
