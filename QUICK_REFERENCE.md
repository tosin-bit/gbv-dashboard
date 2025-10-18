# 🚀 GBV Dashboard - Quick Reference

## 🌐 Production URLs
**Main Application**: https://gbv-dashboard.pages.dev  
**Alternative URL**: https://9ac86be3.gbv-dashboard.pages.dev

---

## 🔐 Login Credentials

### Rainbo Initiative Portal (Medical Staff)
| Location | Username | Password |
|----------|----------|----------|
| Freetown PCMH | `rainbo.freetown` | `rainbo2025` |
| Bo Hospital | `rainbo.bo` | `rainbo2025` |

### Police FSU Portal (Law Enforcement)
| Location | Username | Password |
|----------|----------|----------|
| Freetown FSU | `police.freetown` | `police2025` |
| Bo FSU | `police.bo` | `police2025` |

---

## 📱 How to Access Portals

1. **Open the dashboard**: https://gbv-dashboard.pages.dev
2. **Click the portal tab**:
   - For medical staff: Click "Rainbo Portal" tab
   - For police: Click "Police FSU" tab
3. **Enter credentials** from the table above
4. **Click "Login"**

---

## 🧪 Test the Application

### Submit a Test Case
1. Click "Report Case" tab
2. Fill in the form with test data
3. Click "Submit Report"
4. You'll receive a case number (e.g., GBV-2025-0002)

### View Cases
1. Click "View Cases" tab
2. See all submitted cases
3. Use filters to search by:
   - Violence type
   - District
   - Date range

### Check Dashboard Statistics
1. Click "Overview" tab
2. See real-time statistics:
   - Total cases
   - Cases by district
   - Cases by violence type
   - Monthly trends

### Explore District Map
1. Click "District Map" tab
2. See interactive map of Sierra Leone
3. Filter by:
   - Region (Northern, Southern, Eastern, Western)
   - Risk level (High, Medium, Low)

---

## 📊 API Endpoints (For Developers)

```bash
# Get dashboard statistics
curl https://gbv-dashboard.pages.dev/api/stats

# Get all districts
curl https://gbv-dashboard.pages.dev/api/districts

# Get all cases
curl https://gbv-dashboard.pages.dev/api/cases

# Submit a new case (POST)
curl -X POST https://gbv-dashboard.pages.dev/api/cases \
  -H "Content-Type: application/json" \
  -d '{"reporter_name":"Test","violence_types":["Rape"],...}'

# Login to portal
curl -X POST https://gbv-dashboard.pages.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"rainbo.freetown","password":"rainbo2025"}'
```

---

## 🎯 Key Features

### Public Dashboard
- ✅ Real-time GBV statistics
- ✅ Interactive district mapping
- ✅ Case reporting form
- ✅ View all submitted cases
- ✅ Advanced analytics
- ✅ Voice recording (experimental)

### Rainbo Portal (Medical Staff)
- ✅ Medical examination records
- ✅ Treatment documentation
- ✅ Forensic evidence tracking
- ✅ Post-exposure prophylaxis (PEP)
- ✅ Psychosocial support notes

### Police FSU Portal (Law Enforcement)
- ✅ Criminal investigation tracking
- ✅ Statement recording
- ✅ Evidence chain of custody
- ✅ Court case management
- ✅ Perpetrator tracking

---

## 🔧 Support & Troubleshooting

### Common Issues

**Can't login to portal:**
- Check username format (use dots, not underscores)
- Verify password is correct
- Try refreshing the page

**Cases not showing:**
- Click the "Refresh Data" button on Overview page
- Wait a few seconds for data to load
- Check browser console for errors

**Form submission fails:**
- Ensure all required fields are filled
- Check date is in valid format (YYYY-MM-DD)
- Verify district name matches dropdown options

### Getting Help

- **Technical Issues**: Check browser console (F12)
- **Data Issues**: Verify API endpoints are responding
- **Account Issues**: Contact system administrator

---

## 📈 Database Information

**Production Database ID**: `cd3924d5-b44e-4557-854a-12d8de3d223d`  
**Database Name**: `gbv-dashboard-production`  
**Platform**: Cloudflare D1 (SQLite-based)  
**Status**: ✅ Active and seeded with initial data

### Database Contents
- **Districts**: 16 Sierra Leone districts
- **GBV Types**: 13 violence categories
- **Service Providers**: 7 organizations
- **User Roles**: 5 defined roles
- **Portal Users**: 4 test accounts

---

## 🚀 Quick Actions

### For Ministry Staff
1. **Monitor Statistics**: Open https://gbv-dashboard.pages.dev
2. **Review New Cases**: Click "View Cases" tab
3. **Generate Reports**: Click "Analytics" tab
4. **Check District Data**: Click "District Map" tab

### For Medical Staff (Rainbo)
1. **Login**: Click "Rainbo Portal" tab
2. **Enter credentials**: `rainbo.freetown` / `rainbo2025`
3. **View assigned cases**: See cases pending medical examination
4. **Document treatment**: Record medical interventions

### For Police Officers (FSU)
1. **Login**: Click "Police FSU" tab
2. **Enter credentials**: `police.freetown` / `police2025`
3. **View investigations**: See cases pending investigation
4. **Update case status**: Record progress and evidence

---

## 📞 Emergency Contact

**GBV Hotline**: 116 (Toll-Free)  
**Available**: 24/7  
**Languages**: English, Krio, Mende, Temne

---

**System Version**: 2.0  
**Last Updated**: October 18, 2025  
**Status**: ✅ Production Ready  
**Deployed by**: Insyt Solutions Healthcare Technology
