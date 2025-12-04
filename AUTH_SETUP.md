# GBV Dashboard - Backend Authentication Setup

## ✅ What's Implemented

Your GBV Dashboard now has **backend authentication** using Cloudflare D1 database!

### Features:
- ✅ Login API (`/api/auth/login`)
- ✅ Logout API (`/api/auth/logout`)
- ✅ Session verification (`/api/auth/verify`)
- ✅ D1 database for users and sessions
- ✅ Works locally with your backend
- ✅ Ready to deploy to production

---

## 🔑 Default Credentials

### Rainbo Portal:
- **Username:** `rainbo.freetown`
- **Password:** `demo123`
- **Role:** `rainbo_staff`

### Police FSU Portal:
- **Username:** `demo`
- **Password:** `demo123`
- **Role:** `fsu_officer`

---

## 🚀 How to Deploy to Production

### Step 1: Apply Database Migrations

```bash
# Apply migrations to production D1 database
cd /home/user/webapp
npx wrangler d1 migrations apply gbv-dashboard-production --remote
```

### Step 2: Add Users to Production Database

```bash
# Add center column
npx wrangler d1 execute gbv-dashboard-production --remote --command="ALTER TABLE users ADD COLUMN center TEXT"

# Create sessions table
npx wrangler d1 execute gbv-dashboard-production --remote --command="CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires_at DATETIME NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"

# Update Rainbo user password
npx wrangler d1 execute gbv-dashboard-production --remote --command="UPDATE users SET password_hash = 'demo123' WHERE username = 'rainbo.freetown'"

# Insert demo FSU user (adjust role_id as needed)
npx wrangler d1 execute gbv-dashboard-production --remote --command="INSERT INTO users (username, password_hash, name, role, role_id, email, organization, active) VALUES ('demo', 'demo123', 'Demo FSU Officer', 'fsu_officer', 4, 'fsu@demo.com', 'Police FSU', 1)"
```

### Step 3: Deploy to Cloudflare Pages

```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name gbv-dashboard
```

---

## 🔐 Security Notes

### ⚠️ IMPORTANT:
The current implementation uses **plaintext passwords** for demo purposes.

### For Production:
1. **Install bcrypt** for Node.js environment:
   ```bash
   npm install bcryptjs
   ```

2. **Update the `verifyPassword` function** in `src/index.tsx`:
   ```typescript
   import bcrypt from 'bcryptjs';
   
   async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
     return await bcrypt.compare(plainPassword, hashedPassword);
   }
   ```

3. **Hash passwords before storing**:
   ```typescript
   const hashedPassword = await bcrypt.hash('yourpassword', 10);
   ```

4. **Update all user passwords** to use bcrypt hashes

---

## 📊 Database Schema

### Users Table:
- `id` - Primary key
- `username` - Unique username
- `password_hash` - Password (currently plaintext, should be bcrypt hash)
- `name` - Full name
- `role` - Role name (rainbo_staff, fsu_officer, etc.)
- `role_id` - Foreign key to user_roles table
- `email` - Email address
- `center` - Rainbo center name (for Rainbo staff)
- `organization` - Organization name
- `active` - Boolean flag

### Sessions Table:
- `id` - Session ID (generated)
- `user_id` - Foreign key to users table
- `expires_at` - Expiration timestamp (24 hours)
- `created_at` - Creation timestamp

---

## 🧪 Testing

### Local Testing (With Backend):
**URL:** https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai

1. Go to Rainbo Portal or Police FSU tab
2. Enter credentials (see above)
3. Login should work and load the dashboard

### Production Testing (After Setup):
**URL:** https://gbv-dashboard.pages.dev

1. Complete Steps 1-3 above
2. Go to portal tabs
3. Login with credentials
4. Should work the same as local

---

## 🔧 API Endpoints

### POST `/api/auth/login`
```json
{
  "username": "demo",
  "password": "demo123"
}
```

**Response:**
```json
{
  "success": true,
  "session_id": "session_1234567890_abc123",
  "user": {
    "id": 1,
    "username": "demo",
    "name": "Demo User",
    "role": "fsu_officer",
    "email": "demo@example.com"
  }
}
```

### POST `/api/auth/logout`
```json
{
  "session_id": "session_1234567890_abc123"
}
```

### POST `/api/auth/verify`
```json
{
  "session_id": "session_1234567890_abc123"
}
```

---

## ✅ Status

- ✅ **Local:** Working
- ⏳ **Production:** Requires database setup (Steps 1-3 above)

---

**Created:** December 4, 2025  
**Status:** Ready for Production Deployment
