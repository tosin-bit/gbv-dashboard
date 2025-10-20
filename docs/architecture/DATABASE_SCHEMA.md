# Database Schema - GBV Dashboard

Complete documentation of the database structure for the GBV Dashboard.

## 📊 Database Overview

**Type**: Cloudflare D1 (SQLite-based, globally distributed)  
**Tables**: 14 core tables  
**Views**: 1 view for common queries  
**Migrations**: 2 migration files

---

## 🗂️ Table Structure

### Core Tables
1. [countries](#countries) - Country/region information
2. [districts](#districts) - Administrative regions (16 Sierra Leone districts)
3. [sub_districts](#sub_districts) - Sub-regions (chiefdoms, wards)
4. [gbv_types](#gbv_types) - Violence type classifications (13 types)
5. [gbv_cases](#gbv_cases) - **Main cases table** (incident records)
6. [service_providers](#service_providers) - Service organizations (7 providers)
7. [users](#users) - System users and portal accounts
8. [user_roles](#user_roles) - Role definitions (5 roles)
9. [sessions](#sessions) - Authentication sessions
10. [case_services](#case_services) - Service referrals and tracking
11. [case_notes](#case_notes) - Case updates and notes
12. [monthly_stats](#monthly_stats) - Aggregated statistics
13. [system_config](#system_config) - System settings

---

## 📋 Detailed Table Schemas

### countries
Country and region information.

```sql
CREATE TABLE countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    region TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Store country information (currently Sierra Leone).

**Sample Data**:
| id | name | code | region |
|----|------|------|--------|
| 1 | Sierra Leone | SL | West Africa |

---

### districts
Administrative districts (states/provinces).

```sql
CREATE TABLE districts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    population INTEGER,
    area_km2 REAL,
    latitude REAL,
    longitude REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);
```

**Purpose**: Store 16 Sierra Leone districts with geographic and demographic data.

**Key Fields**:
- `population`: Used for per-capita analysis
- `latitude/longitude`: Geographic coordinates for mapping
- `code`: 2-3 letter district code (e.g., "WAU", "BO")

**Sample Data**:
| id | name | code | population | latitude | longitude |
|----|------|------|------------|----------|-----------|
| 1 | Western Area Urban | WAU | 1,050,301 | 8.484 | -13.234 |
| 3 | Bo | BO | 574,462 | 7.9644 | -11.7383 |

**Relationships**:
- Referenced by: `gbv_cases.district_id`
- Referenced by: `service_providers.district_id`
- Referenced by: `users.district_id`

---

### sub_districts
Sub-regions within districts (chiefdoms, wards, communes).

```sql
CREATE TABLE sub_districts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    district_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'chiefdom',
    population INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id)
);
```

**Purpose**: Store granular location data for precise case mapping.

**Type Values**: `chiefdom`, `ward`, `commune`

---

### gbv_types
Classification of GBV incident types.

```sql
CREATE TABLE gbv_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT,
    severity_level INTEGER DEFAULT 1
);
```

**Purpose**: Define and categorize types of gender-based violence.

**Categories**:
- `sexual_violence` - Rape, sexual assault, child abuse
- `physical_violence` - Domestic violence, assault, FGM
- `emotional_violence` - Threats, intimidation, abuse
- `economic_violence` - Economic abuse, forced marriage

**Sample Data**:
| id | name | category | severity_level |
|----|------|----------|----------------|
| 1 | Rape | sexual_violence | 5 |
| 2 | Child Sexual Abuse | sexual_violence | 5 |
| 3 | Domestic Violence | physical_violence | 4 |
| 6 | Female Genital Mutilation | physical_violence | 5 |

**All 13 Types**:
1. Rape
2. Child Sexual Abuse
3. Domestic Violence
4. Economic Abuse
5. Emotional Abuse
6. Female Genital Mutilation (FGM)
7. Forced Marriage
8. Human Trafficking
9. Intimate Partner Violence
10. Physical Assault
11. Sexual Assault
12. Sexual Harassment
13. Threats and Intimidation

---

### gbv_cases
**Main table** - stores all GBV incident records.

```sql
CREATE TABLE gbv_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_number TEXT UNIQUE NOT NULL,
    
    -- Incident Details
    incident_date DATE NOT NULL,
    reported_date DATE DEFAULT CURRENT_DATE,
    gbv_type_id INTEGER NOT NULL,
    incident_description TEXT,
    
    -- Location
    district_id INTEGER NOT NULL,
    sub_district_id INTEGER,
    location_details TEXT,
    
    -- Survivor Info (Anonymized)
    survivor_age_group TEXT NOT NULL,
    survivor_gender TEXT NOT NULL,
    survivor_marital_status TEXT,
    survivor_education_level TEXT,
    survivor_occupation TEXT,
    survivor_disability TEXT,
    
    -- Perpetrator Info (Anonymized)
    perpetrator_relationship TEXT,
    perpetrator_age_group TEXT,
    perpetrator_gender TEXT,
    number_of_perpetrators INTEGER DEFAULT 1,
    
    -- Case Management
    reported_by TEXT NOT NULL,
    reporting_channel TEXT,
    case_status TEXT DEFAULT 'reported',
    priority_level TEXT DEFAULT 'medium',
    
    -- Services
    immediate_needs TEXT,
    services_required TEXT,
    consent_to_services BOOLEAN DEFAULT FALSE,
    consent_to_data_sharing BOOLEAN DEFAULT FALSE,
    
    -- Privacy
    safety_concerns TEXT,
    confidentiality_level TEXT DEFAULT 'high',
    
    -- System
    created_by INTEGER NOT NULL,
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (gbv_type_id) REFERENCES gbv_types(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);
```

**Purpose**: Core table storing all case information with privacy-first design.

**Key Features**:
- **Anonymized**: No survivor names or identifying information
- **Auto-generated case numbers**: Format `GBV-YYYY-XXXX`
- **Comprehensive tracking**: Incident to resolution
- **Privacy levels**: high, maximum for sensitive cases

**Case Status Values**:
- `reported` - Newly reported
- `under_investigation` - Being investigated
- `services_provided` - Receiving services
- `closed` - Case closed
- `referred` - Referred to another provider

**Age Groups**:
- `0-10`, `11-15`, `16-17`, `18-25`, `26-35`, `36+`

**Indexes**:
```sql
CREATE INDEX idx_gbv_cases_district ON gbv_cases(district_id);
CREATE INDEX idx_gbv_cases_date ON gbv_cases(incident_date);
CREATE INDEX idx_gbv_cases_status ON gbv_cases(case_status);
CREATE INDEX idx_gbv_cases_type ON gbv_cases(gbv_type_id);
```

---

### service_providers
Service provider organizations.

```sql
CREATE TABLE service_providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    contact_person TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    district_id INTEGER,
    services_offered TEXT,
    operating_hours TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id)
);
```

**Purpose**: Directory of GBV service providers.

**Provider Types**:
- `health` - Medical services (Rainbo Initiative, One-Stop Centers)
- `legal` - Legal services (Police FSU)
- `psychosocial` - Counseling and support
- `shelter` - Safe housing
- `police` - Law enforcement

**Sample Data**:
| id | name | type | operating_hours |
|----|------|------|-----------------|
| 1 | Rainbo Initiative | health | 24/7 |
| 3 | Police FSU | police | 24/7 |
| 4 | One-Stop Centers | health | 12 hours |
| 5 | 116 Hotline | health | 24/7 |

---

### users
System users and portal accounts.

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    organization TEXT,
    phone TEXT,
    district_id INTEGER,
    active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Added in migration 0002:
    username TEXT,
    password_hash TEXT,
    role TEXT,
    service_provider_id INTEGER,
    service_provider_type TEXT,
    FOREIGN KEY (role_id) REFERENCES user_roles(id),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);
```

**Purpose**: User accounts for dashboard access and portals.

**Current Test Accounts** (4):
1. Dr. Sarah Kamara (`rainbo.freetown`) - Rainbo staff
2. Nurse Mary Koroma (`rainbo.bo`) - Rainbo staff  
3. Inspector John Bangura (`police.freetown`) - Police FSU
4. Sergeant Ibrahim Sesay (`police.bo`) - Police FSU

**User Roles**:
- `system_admin`
- `rainbo_staff`
- `police_fsu`
- `case_manager`
- `data_entry`

---

### user_roles
Role definitions and permissions.

```sql
CREATE TABLE user_roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    permissions TEXT
);
```

**Purpose**: Define user roles with granular permissions.

**5 Defined Roles**:
1. **System Admin** - Full access
2. **National Coordinator** - National-level management
3. **District Coordinator** - District-level management
4. **Caseworker** - Case management
5. **Data Entry** - Basic data entry

---

### sessions
Authentication session management.

```sql
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

**Purpose**: Manage portal login sessions.

**Session Flow**:
1. User logs in → Generate UUID session ID
2. Store in database with expiration
3. Return session ID to client
4. Client includes in subsequent requests
5. Auto-expire after timeout

---

### case_services
Service referrals and delivery tracking.

```sql
CREATE TABLE case_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    service_provider_id INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    referral_date DATE DEFAULT CURRENT_DATE,
    service_date DATE,
    status TEXT DEFAULT 'pending',
    outcome TEXT,
    follow_up_needed BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id)
);
```

**Purpose**: Track services provided to survivors.

**Service Types**:
- `medical` - Medical examination, treatment
- `legal` - Legal advice, court support
- `psychosocial` - Counseling, therapy
- `shelter` - Safe housing
- `economic` - Financial assistance

**Status Values**:
- `pending` - Referral made, awaiting service
- `provided` - Service delivered
- `completed` - Service completed successfully
- `cancelled` - Service cancelled
- `no_show` - Survivor did not attend

---

### case_notes
Case updates and progress notes.

```sql
CREATE TABLE case_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    note_type TEXT DEFAULT 'general',
    note_content TEXT NOT NULL,
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES gbv_cases(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

**Purpose**: Document case progress and updates.

**Note Types**:
- `general` - General updates
- `follow_up` - Follow-up visit notes
- `service_update` - Service delivery updates
- `safety_plan` - Safety planning notes

---

### monthly_stats
Pre-aggregated statistics for dashboard performance.

```sql
CREATE TABLE monthly_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    district_id INTEGER,
    gbv_type_id INTEGER,
    total_cases INTEGER DEFAULT 0,
    cases_by_age_group TEXT,
    cases_by_gender TEXT,
    services_provided INTEGER DEFAULT 0,
    cases_resolved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (gbv_type_id) REFERENCES gbv_types(id),
    UNIQUE(year, month, district_id, gbv_type_id)
);
```

**Purpose**: Speed up dashboard queries with pre-computed statistics.

**Note**: Currently populated with sample data. In production, would be updated via scheduled job.

---

### system_config
System-wide configuration settings.

```sql
CREATE TABLE system_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Store configuration without code deployment.

**Example Settings**:
- Dashboard refresh interval
- Default case status
- Email notification settings
- System maintenance mode

---

## 🔍 Database Views

### case_summary
Commonly used case information with joins.

```sql
CREATE VIEW case_summary AS
SELECT 
    c.id,
    c.case_number,
    c.incident_date,
    c.reported_date,
    gt.name as gbv_type,
    gt.category as gbv_category,
    d.name as district,
    sd.name as sub_district,
    c.survivor_age_group,
    c.survivor_gender,
    c.case_status,
    c.priority_level,
    u.name as assigned_case_worker,
    COUNT(cs.id) as services_count
FROM gbv_cases c
LEFT JOIN gbv_types gt ON c.gbv_type_id = gt.id
LEFT JOIN districts d ON c.district_id = d.id
LEFT JOIN sub_districts sd ON c.sub_district_id = sd.id
LEFT JOIN users u ON c.assigned_to = u.id
LEFT JOIN case_services cs ON c.id = cs.case_id
GROUP BY c.id;
```

**Purpose**: Pre-joined case data for quick queries.

**Usage**: `SELECT * FROM case_summary WHERE district = 'Bo'`

---

## 📊 Relationships Diagram

```
countries
    ↓
districts ─────┬──→ gbv_cases (main)
    ↓          │       ↓
sub_districts ─┤   case_services → service_providers
               │       ↓
user_roles ────┤   case_notes
    ↓          │
users ─────────┴──→ sessions
    ↓
gbv_types ────────→ gbv_cases
```

---

## 🔧 Common Queries

### Get All Cases for a District
```sql
SELECT * FROM case_summary 
WHERE district = 'Bo'
ORDER BY incident_date DESC;
```

### Count Cases by Violence Type
```sql
SELECT 
    gt.name,
    COUNT(gc.id) as case_count
FROM gbv_cases gc
JOIN gbv_types gt ON gc.gbv_type_id = gt.id
GROUP BY gt.id
ORDER BY case_count DESC;
```

### Recent Cases with Services
```sql
SELECT 
    c.case_number,
    c.incident_date,
    d.name as district,
    gt.name as violence_type,
    COUNT(cs.id) as services_received
FROM gbv_cases c
JOIN districts d ON c.district_id = d.id
JOIN gbv_types gt ON c.gbv_type_id = gt.id
LEFT JOIN case_services cs ON c.id = cs.case_id
WHERE c.reported_date >= date('now', '-30 days')
GROUP BY c.id
ORDER BY c.reported_date DESC;
```

---

## 📈 Current Data Volume

**Production Database**:
- Districts: 16 records
- GBV Types: 13 records
- Service Providers: 7 records
- User Roles: 5 records
- Users: 4 portal accounts
- Cases: Growing (starts at 0)
- Monthly Stats: Sample historical data

---

## 🔐 Privacy & Security

**Anonymization**:
- No survivor names stored
- No addresses or identifying details
- Age groups instead of exact ages
- Generic location descriptions

**Access Control**:
- Role-based permissions
- Session-based authentication
- Audit trail via `created_by` fields

**Data Protection**:
- Confidentiality levels per case
- Consent tracking
- Safety concern documentation

---

## 🚀 Migration Management

**Migration Files**:
1. `0001_initial_schema.sql` - Core schema
2. `0002_add_authentication.sql` - Auth system

**Apply Migrations**:
```bash
# Local development
npm run db:migrate:local

# Production
npm run db:migrate:prod
```

**Create New Migration**:
```bash
# Create file: migrations/XXXX_description.sql
# Apply with: npm run db:migrate:local
```

---

## 📚 Related Documentation

- [System Architecture](SYSTEM_ARCHITECTURE.md) - Overall system design
- [API Documentation](API_DOCUMENTATION.md) - API endpoints
- [Getting Started](../setup/GETTING_STARTED.md) - Setup guide

---

**Need to modify the schema?** Create a new migration file and document changes here.
