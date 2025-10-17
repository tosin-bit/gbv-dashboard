# Enhanced GBV Dashboard

## Project Overview
- **Name**: Enhanced GBV Dashboard - Sierra Leone & Beyond
- **Goal**: Comprehensive Gender-Based Violence monitoring and case management system
- **Features**: Real-time dashboard, case tracking, service provider management, geographic visualization, privacy-focused design

## URLs
- **Development**: https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai
- **Production**: (To be deployed to Cloudflare Pages)
- **GitHub**: (To be configured)

## ✨ Key Features

### Currently Implemented Features
- ✅ **Real-time Statistics Dashboard**: KPI cards showing total cases, pending cases, resolved cases, and service providers
- ✅ **Geographic Coverage**: Complete Sierra Leone district mapping (all 16 districts with population data)
- ✅ **Data Visualization**: Interactive charts showing cases by district and GBV type using Chart.js
- ✅ **Comprehensive Database Schema**: Full relational database with cases, districts, service providers, users, and roles
- ✅ **Privacy-First Design**: Anonymized survivor data with multiple confidentiality levels
- ✅ **RESTful API**: Complete API for statistics, districts, cases, and service providers
- ✅ **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ✅ **Service Provider Directory**: Health facilities, legal aid, psychosocial support, shelters

### API Endpoints Currently Available
- `GET /api/stats` - Dashboard statistics with cases by status, district, type, and trends
- `GET /api/districts` - All 16 Sierra Leone districts with coordinates and case counts
- `GET /api/cases?page=1&limit=20&district=all&status=all` - Paginated case listing with filters
- `GET /api/service-providers` - Active service provider directory
- `POST /api/cases` - Create new GBV case (with auto-generated case numbers)

### Data Models and Architecture
- **Countries & Geographic Data**: Multi-country support starting with Sierra Leone
- **Districts & Sub-districts**: Complete administrative boundaries with GPS coordinates
- **GBV Cases**: Comprehensive case management with 13 violence types and multiple status tracking
- **Service Providers**: 4 types (health, legal, psychosocial, shelter) with contact information
- **User Management**: Role-based access with 7 user roles from system admin to report viewers
- **Privacy Controls**: Multiple confidentiality levels and anonymization features

## 🚀 Features Not Yet Implemented (Enhancements Beyond Original)
- ⏳ **Interactive Geographic Map**: District-level incident mapping with clickable regions
- ⏳ **Advanced Case Management**: Full case workflow with notes, referrals, and follow-ups  
- ⏳ **Multi-language Support**: Krio, Mende, Temne language options
- ⏳ **SMS/Email Notifications**: Automated alerts for case updates and referrals
- ⏳ **Export/Reporting System**: PDF reports, CSV exports, and printable summaries
- ⏳ **User Authentication**: Secure login system with role-based permissions
- ⏳ **Real-time Collaboration**: Live case updates and team coordination tools
- ⏳ **Mobile App Support**: PWA capabilities for field workers
- ⏳ **Data Analytics**: Predictive analytics and trend analysis
- ⏳ **Integration APIs**: Connect with health information systems and police databases

## 🛠 Technology Stack
- **Backend**: Hono framework on Cloudflare Workers/Pages
- **Database**: Cloudflare D1 (SQLite) with comprehensive schema
- **Frontend**: Server-side rendered HTML with vanilla JavaScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Chart.js for data visualization
- **Process Management**: PM2 for development server management
- **Deployment**: Cloudflare Pages with edge computing

## 📊 Database Schema Highlights
```sql
-- Core entities: 15+ tables including:
- countries (multi-country support)
- districts (16 Sierra Leone districts)
- gbv_cases (comprehensive case tracking)
- service_providers (healthcare, legal, psychosocial, shelter)
- users & user_roles (7-tier role system)
- case_services (referral tracking)
- monthly_stats (aggregated analytics)
```

## 🏥 Service Provider Integration
- **Health Facilities**: Connaught Hospital, Bo Government Hospital
- **Legal Services**: Sierra Leone Police FSU, Legal Aid Board  
- **Psychosocial Support**: Women Against Violence SL, Rainbo Centre
- **Shelter Services**: Don Bosco Shelter and temporary accommodations

## 🔐 Privacy & Security Features
- **Data Anonymization**: No personally identifiable information stored
- **Confidentiality Levels**: Low, Medium, High, Maximum security settings
- **Role-based Access**: Granular permissions from national to case-worker level
- **Audit Trails**: Complete case history and update tracking
- **Consent Management**: Explicit consent for services and data sharing

## 🌍 Multi-Country Expansion Ready
Currently configured for Sierra Leone with architecture supporting:
- Nigeria, Ghana, Liberia (pre-configured)
- Easy addition of new countries and administrative boundaries
- Localized service provider categories
- Country-specific legal and cultural considerations

## 📈 Development Workflow

### Setup and Installation
```bash
# Clone and setup
cd webapp
npm install

# Database setup (local development)
npm run db:migrate:local
npm run db:seed

# Build and start development server
npm run build
npm run dev:sandbox
```

### Development Commands
```bash
# Development
npm run dev:sandbox          # Start with D1 database
npm run build               # Build for production
npm run test                # Test the application

# Database operations
npm run db:migrate:local    # Apply migrations locally
npm run db:seed            # Seed with sample data
npm run db:reset           # Reset and reseed database
npm run db:console:local   # Database console

# Production deployment
npm run deploy:prod        # Deploy to Cloudflare Pages
```

## 🚀 Deployment Status
- **Platform**: Cloudflare Pages (ready for deployment)
- **Status**: ✅ Local Development Active
- **Environment**: Sandbox testing environment
- **Database**: Local D1 SQLite (production D1 ready)
- **Last Updated**: October 17, 2024

## 🎯 Recommended Next Steps
1. **Complete Enhanced Features**: Implement interactive maps and advanced case management
2. **User Authentication**: Add secure login system with role-based access
3. **Multi-language Support**: Add Krio and local language translations  
4. **Production Deployment**: Deploy to Cloudflare Pages with production D1 database
5. **Mobile Optimization**: Enhance PWA capabilities for field workers
6. **Integration Testing**: Connect with existing health and legal information systems
7. **User Training**: Develop training materials for case workers and coordinators

## 👨‍💻 Development Team
- **Developer**: Insyt FamilyCare Healthcare Technology
- **Original Inspiration**: Sierra Leone Ministry of Gender and Children's Affairs GBV Dashboard
- **Enhancement Focus**: Privacy, scalability, and comprehensive case management

## 📞 Support & Contact
For technical support, feature requests, or deployment assistance, please contact the development team through the appropriate channels.

---

**Note**: This enhanced system builds upon and extends the original Sierra Leone GBV Dashboard concept, adding comprehensive case management, privacy controls, and multi-country support while maintaining the original's focus on data-driven GBV response coordination.