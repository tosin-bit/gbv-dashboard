# Portal Login Credentials

## 🏥 Rainbo Initiative Portal

**URL**: `/rainbo-dashboard`

**Credentials**:
- **Freetown**: `rainbo.freetown` / `rainbo2025`
- **Bo**: `rainbo.bo` / `rainbo2025`

**Organization**: Rainbo Initiative
**Description**: One-Stop Center for GBV Survivors - Free Medical, Psychosocial, and Legal Referral Services

---

## 🚔 Police FSU Portal

**URL**: `/police-dashboard`

**Credentials**:
- **Freetown**: `fsu.freetown` / `police2025`
- **Bo**: `fsu.bo` / `police2025`

**Organization**: Police FSU (Family Support Unit)
**Description**: Sierra Leone Police - Family Support Unit Investigation & Evidence Management

---

## 🏛️ Ministry Portal

**URL**: `/` (main dashboard)

**Credentials**:
- **Admin**: `ministry.admin` / `ministry2025`

**Organization**: Ministry of Gender and Children Affairs
**Description**: Main dashboard for ministry officials

---

## 📝 Notes

- All passwords are set to match the organization name + "2025"
- Rainbo users have role: `rainbo_staff`
- Police FSU users have role: `police_fsu`
- Ministry users have role: `ministry_admin`
- Session data is stored in localStorage
- If you see wrong organization name, clear browser cache/localStorage

---

## 🔄 Clearing Session (if needed)

If you see incorrect organization information in the header:

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear localStorage:
   - Remove `gbv_session_id`
   - Remove `gbv_user_data`
4. Refresh the page and login again

Or use the logout button and login again with correct credentials.
