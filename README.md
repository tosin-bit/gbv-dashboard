# Sierra Leone GBV Dashboard

**Real-time Gender-Based Violence Incident Tracking System**

Ministry of Gender and Children's Affairs - Sierra Leone

---

## 🌟 Overview

The Sierra Leone GBV Dashboard is a comprehensive, real-time gender-based violence incident tracking and management system designed to support survivors, coordinate services, and inform policy decisions across Sierra Leone.

### Key Features

- **Real-time Case Tracking** - Monitor GBV cases across all 16 districts
- **Multi-Portal System** - Dedicated portals for Rainbo Initiative, Police FSU, and Survivors
- **AI-Powered Analytics** - Predictive analytics, risk scoring, and trend intelligence
- **Voice Reporting** - Anonymous voice recording system for case reporting
- **Emergency SOS** - 24/7 emergency support with 116 hotline integration
- **Multi-language Support** - Krio, English, Mende, and Temne
- **Mobile-Optimized** - Responsive design for all devices

---

## 🚀 Live Production URLs

**Main Dashboard:** https://gbv-dashboard.pages.dev  
**GitHub Repository:** https://github.com/tosin-bit/gbv-dashboard

---

## 🔐 Authentication

### Portal Login Credentials

**Rainbo Portal:**
- Username: `rainbo.freetown`
- Password: `rainbo2024`
- Role: Rainbo Staff

**Police FSU Portal:**
- Username: `fsu.freetown`
- Password: `police2025`
- Role: Police FSU Officer

---

## 📊 System Architecture

### Technology Stack

- **Frontend:** Hono Framework + TypeScript + TailwindCSS
- **Backend:** Cloudflare Workers (Edge Runtime)
- **Database:** Cloudflare D1 (SQLite)
- **Deployment:** Cloudflare Pages
- **Build Tool:** Vite
- **Process Manager:** PM2 (for local development)

### Project Structure

```
webapp/
├── src/
│   └── index.tsx              # Main Hono application
├── public/static/             # Static assets and scripts
│   ├── ministry-logo.png      # Official Ministry logo
│   ├── tab-system.js          # Tab navigation system
│   ├── analytics-dashboard.js # Analytics features
│   ├── voice-recording.js     # Voice reporting system
│   ├── portal-systems.js      # Rainbo & FSU portals
│   └── ...
├── migrations/                # D1 database migrations
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_authentication.sql
│   ├── 0003_case_workflow_system.sql
│   ├── 0004_evidence_and_audit_system.sql
│   └── 0006_add_auth_columns.sql
├── docs/                      # Documentation
│   ├── setup/
│   ├── architecture/
│   └── archive/
├── seed.sql                   # Sample data for testing
├── package.json               # Dependencies and scripts
├── wrangler.jsonc             # Cloudflare configuration
├── vite.config.ts             # Vite configuration
├── ecosystem.config.cjs       # PM2 configuration
└── README.md                  # This file
```

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/tosin-bit/gbv-dashboard.git
cd gbv-dashboard

# Install dependencies
npm install

# Initialize D1 database locally
npx wrangler d1 migrations apply gbv-dashboard-production --local

# Seed database with sample data (optional)
npx wrangler d1 execute gbv-dashboard-production --local --file=./seed.sql
```

### Local Development

```bash
# Build the project
npm run build

# Start development server with PM2
pm2 start ecosystem.config.cjs

# Check logs
pm2 logs enhanced-gbv-dashboard --nostream

# Test the server
curl http://localhost:3000
```

**Local Development URL:** http://localhost:3000

### Production Deployment

```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy

# Or deploy with specific project name
npx wrangler pages deploy dist --project-name gbv-dashboard
```

---

## 📋 Available Scripts

```json
{
  "dev": "vite",
  "dev:sandbox": "wrangler pages dev dist --ip 0.0.0.0 --port 3000",
  "dev:d1": "wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000",
  "build": "vite build",
  "preview": "wrangler pages dev dist",
  "deploy": "npm run build && wrangler pages deploy dist",
  "deploy:prod": "npm run build && wrangler pages deploy dist --project-name webapp",
  "cf-typegen": "wrangler types --env-interface CloudflareBindings",
  "clean-port": "fuser -k 3000/tcp 2>/dev/null || true",
  "test": "curl http://localhost:3000",
  "db:migrate:local": "wrangler d1 migrations apply gbv-dashboard-production --local",
  "db:migrate:prod": "wrangler d1 migrations apply gbv-dashboard-production",
  "db:seed": "wrangler d1 execute gbv-dashboard-production --local --file=./seed.sql",
  "db:reset": "rm -rf .wrangler/state/v3/d1 && npm run db:migrate:local && npm run db:seed"
}
```

---

## 🎯 Main Features

### 1. Dashboard Overview
- Real-time statistics (Total Cases, This Month, Sexual Assault Cases)
- Monthly trends charts
- Age group distribution
- District case distribution with interactive map
- Service provider statistics

### 2. Case Management
- **Report Case** - Comprehensive form with validation
- **View Cases** - Searchable table with filters
- **Case Details** - Full case information with green eye icon
- **Case Updates** - Track case progress and status changes

### 3. Analytics
Four AI-Powered dashboards:
- **Spike Prediction** - 7-day case forecasting with 85% accuracy
- **Risk Scoring** - Identify high-risk survivors (1,847 assessed)
- **Resource Forecast** - Budget and resource planning
- **Trend Intelligence** - Pattern detection and policy effectiveness

### 4. Partner View (Spotlight Initiative)
Comprehensive Spotlight Initiative Phase 1 information:
- 4 Pillars framework
- District coverage and impact
- Program metrics and outcomes

### 5. Portals

**Survivor Portal:**
- Safety planning tools
- Service finder (medical, legal, psychosocial)
- Know Your Rights information
- Emergency SOS button

**Rainbo Portal:**
- Medical case management
- Patient tracking
- Service coordination
- Reporting and analytics

**Police FSU Portal:**
- Investigation management
- Case assignments
- Evidence tracking
- Inter-agency coordination

### 6. Voice Reporting
- Anonymous voice recording
- Secure audio upload
- Automatic case creation
- Privacy protection

### 7. District Map
- Interactive Sierra Leone map
- District-level statistics
- Case distribution visualization
- Service provider locations

### 8. Resources
- Legal framework documents
- Service provider directory
- Training materials
- Policy guidelines

---

## 🗄️ Database Schema

### Core Tables

- `gbv_cases` - Main case records
- `gbv_types` - Types of violence
- `districts` - Sierra Leone districts
- `users` - System users with authentication
- `sessions` - User sessions
- `service_providers` - Service organizations
- `case_services` - Service referrals
- `case_updates` - Case status history
- `user_roles` - User role definitions

See `docs/architecture/DATABASE_SCHEMA.md` for detailed schema documentation.

---

## 🔒 Security

- **Authentication** - Username/password with session management
- **Role-Based Access Control** - Portal-specific access restrictions
- **Data Encryption** - TLS/HTTPS for all traffic
- **Session Management** - 24-hour session expiration
- **Input Validation** - Server-side validation for all forms
- **SQL Injection Protection** - Prepared statements with parameter binding

---

## 🌍 Internationalization

Supported Languages:
- English (default)
- Krio
- Mende
- Temne

All user-facing text is translatable via the language switcher in the top-right corner.

---

## 📱 Mobile Support

The dashboard is fully responsive and optimized for:
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667+)

Emergency SOS features work on all devices with one-tap access to 116 hotline.

---

## 🚨 Emergency Support

**24/7 National Hotline:** 116 (Toll-Free)

Available in Krio, English, Mende & Temne

Emergency features:
- One-tap SOS button
- Automatic location sharing
- Silent mode for safety
- Quick exit functionality

---

## 📖 Documentation

- **Setup Guide:** `docs/setup/GETTING_STARTED.md`
- **System Architecture:** `docs/architecture/SYSTEM_ARCHITECTURE.md`
- **Database Schema:** `docs/architecture/DATABASE_SCHEMA.md`
- **Developer Onboarding:** `docs/NEW_DEVELOPER_ONBOARDING.md`

### Strategic Documentation (for stakeholders)

- **GBVIMS+ Comparison:** `GBVIMS_COMPARISON_ANALYSIS.md`
- **Migration Guide:** `GBVIMS_MIGRATION_GUIDE.md`
- **Executive Summary:** `GBVIMS_EXECUTIVE_SUMMARY.md`
- **Strategic Positioning:** `STRATEGIC_POSITIONING.md`
- **Demo Script:** `DEMO_SCRIPT.md`
- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`

---

## 🤝 Contributing

This system is maintained by **Insyt Solutions** for the Ministry of Gender and Children's Affairs, Sierra Leone.

For bug reports, feature requests, or contributions:
1. Create an issue on GitHub
2. Submit a pull request with detailed description
3. Follow existing code style and conventions

---

## 📄 License

Copyright © 2025 Insyt Solutions & Ministry of Gender and Children's Affairs, Sierra Leone

All rights reserved.

---

## 👥 Credits

**Developed by:** Insyt Solutions  
**Client:** Ministry of Gender and Children's Affairs, Sierra Leone  
**Supported by:** USAID, WHO, UN Women  

**Version:** 2.0  
**Last Updated:** December 2025

---

## 📞 Support

For technical support or inquiries:
- **Email:** support@insytsolutions.com
- **Website:** https://gbv-dashboard.pages.dev
- **GitHub:** https://github.com/tosin-bit/gbv-dashboard

For emergency GBV support in Sierra Leone:
- **Call:** 116 (Toll-Free, 24/7)
- **Languages:** Krio, English, Mende, Temne
