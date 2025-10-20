# Getting Started - GBV Dashboard

Welcome! This guide will help you set up the GBV Dashboard on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - We recommend [VS Code](https://code.visualstudio.com/)
- **Wrangler CLI** (will be installed with npm)

## 🚀 Quick Setup (5 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/tosin-bit/gbv-dashboard.git
cd gbv-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Hono (backend framework)
- Cloudflare Workers tools
- TypeScript
- Vite (build tool)
- All other dependencies

### Step 3: Setup Environment Variables

Create a `.dev.vars` file for local development:

```bash
# Create the file
cat > .dev.vars << 'EOF'
# Local Development Environment Variables

# Database (Cloudflare D1 in local mode)
# No configuration needed - wrangler handles it automatically

# API Keys (if needed in future)
# API_KEY=your-key-here

# Session Secret (for authentication)
SESSION_SECRET=your-random-secret-key-here
EOF
```

**Important**: Never commit `.dev.vars` to Git! It's already in `.gitignore`.

### Step 4: Setup Local Database

```bash
# Apply database migrations
npm run db:migrate:local

# Seed with initial data
npm run db:seed
```

This creates:
- 16 Sierra Leone districts
- 13 GBV types
- 7 service providers
- 5 user roles
- 4 test portal accounts

### Step 5: Build and Start

```bash
# Build the application
npm run build

# Start development server
npm run dev:sandbox
```

The server will start at: **http://localhost:3000**

### Step 6: Verify Setup

Open your browser and visit:
- **Dashboard**: http://localhost:3000
- **API Stats**: http://localhost:3000/api/stats
- **Districts**: http://localhost:3000/api/districts

You should see the dashboard with charts and statistics!

## 🔐 Test Portal Logins

Use these credentials to test portal access:

### Rainbo Initiative Portal
**Username**: `rainbo.freetown`  
**Password**: `rainbo2025`

### Police FSU Portal
**Username**: `police.freetown`  
**Password**: `police2025`

## 📁 Project Structure Overview

```
gbv-dashboard/
├── src/
│   └── index.tsx              # Main backend application (API routes)
├── public/
│   └── static/
│       ├── app-simplified.js  # Dashboard logic
│       ├── tab-system.js      # Tab navigation
│       ├── report-case-form.js # Case submission
│       └── ...                # Other frontend files
├── migrations/
│   ├── 0001_initial_schema.sql      # Database schema
│   └── 0002_add_authentication.sql  # Auth system
├── wrangler.jsonc            # Cloudflare configuration
├── package.json              # Dependencies and scripts
└── docs/                     # Documentation (you are here!)
```

## 🛠️ Available Commands

### Development

```bash
# Start development server (after building)
npm run dev:sandbox

# Build the project
npm run build

# Clean and rebuild
npm run clean-port && npm run build
```

### Database

```bash
# Run migrations on local database
npm run db:migrate:local

# Seed local database with data
npm run db:seed

# Reset local database (careful!)
npm run db:reset

# Execute SQL on local database
npm run db:console:local
```

### Production

```bash
# Deploy to Cloudflare Pages
npm run deploy

# Run migrations on production database
npm run db:migrate:prod
```

### Utilities

```bash
# Clean port 3000 (if something is stuck)
npm run clean-port

# Test the running server
npm run test

# View git status
npm run git:status

# View git log
npm run git:log
```

## 🔍 Understanding the Stack

### Backend
- **Hono**: Lightweight web framework (like Express)
- **TypeScript**: Type-safe JavaScript
- **Cloudflare Workers**: Serverless runtime
- **Cloudflare D1**: SQLite database

### Frontend
- **Vanilla JavaScript**: No framework - pure JS
- **Tailwind CSS**: Utility-first styling (via CDN)
- **Chart.js**: Data visualization
- **Axios**: HTTP requests

### Deployment
- **Cloudflare Pages**: Global edge deployment
- **Wrangler**: CLI tool for Cloudflare

## 🐛 Common Issues and Solutions

### Issue: Port 3000 already in use
```bash
# Solution: Clean the port
npm run clean-port
# or
fuser -k 3000/tcp
```

### Issue: Database not found
```bash
# Solution: Run migrations
npm run db:migrate:local
npm run db:seed
```

### Issue: Build fails
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Can't connect to database
```bash
# Solution: Reset local database
npm run db:reset
```

### Issue: Changes not showing
```bash
# Solution: Rebuild and restart
npm run build
pm2 restart gbv-dashboard
```

## 📚 Next Steps

Now that you're set up, check out:

1. **[System Architecture](../architecture/SYSTEM_ARCHITECTURE.md)** - Understand how it works
2. **[API Documentation](../architecture/API_DOCUMENTATION.md)** - Learn the API endpoints
3. **[Database Schema](../architecture/DATABASE_SCHEMA.md)** - Understand the data model
4. **[Feature Development](../development/FEATURE_DEVELOPMENT.md)** - Start building!

## 🎯 Quick Test Checklist

Verify everything works:

- [ ] Dashboard loads at http://localhost:3000
- [ ] Charts render on Overview tab
- [ ] Submit a test case in Report Case tab
- [ ] View the case in View Cases tab
- [ ] District map displays all 16 districts
- [ ] Rainbo portal login works
- [ ] Police FSU portal login works
- [ ] API endpoints return data

## 💡 Development Tips

1. **Hot Reload**: Wrangler automatically reloads on file changes
2. **Console Logs**: Check browser console (F12) for frontend errors
3. **Server Logs**: Use `pm2 logs gbv-dashboard --nostream` for backend logs
4. **Database**: Local database is at `.wrangler/state/v3/d1/`
5. **Git**: Commit frequently with clear messages

## 📞 Need Help?

- **Documentation**: Check other files in `/docs`
- **Issues**: https://github.com/tosin-bit/gbv-dashboard/issues
- **Code Comments**: Read inline comments in source files

---

**Ready to start developing?** Check out [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines!
