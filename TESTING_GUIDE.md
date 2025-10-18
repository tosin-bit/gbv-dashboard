# GBV Dashboard - Complete Testing Guide

## 🌐 Access URLs

**Main Dashboard:** https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai

**Direct Portal Access:**
- Rainbo Dashboard: https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai/rainbo-dashboard
- Police Dashboard: https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai/police-dashboard

---

## 🎯 What's Been Fixed

### 1. ✅ Charts Issue - FIXED
**Problem:** Charts weren't re-initializing when returning to Overview tab

**Solution:** 
- Added chart re-initialization when switching back to Overview tab
- 300ms delay to ensure canvas elements are visible before drawing

**Test It:**
1. Open dashboard → You should see charts on Overview tab
2. Click another tab (e.g., "Report Case")
3. Click back to "Overview" tab
4. Charts should re-draw correctly

---

### 2. ✅ View Cases - NEW FEATURE ADDED
**Problem:** User couldn't find submitted records

**Solution:**
- Created complete "View Cases" tab with:
  - Full cases table showing all submitted cases
  - Search by case number
  - Filter by district, status, priority
  - Refresh button
  - Case count display

**Test It:**
1. Click "View Cases" tab
2. Should see table with all cases
3. Try search box (type case number)
4. Try filters (district/status/priority dropdowns)
5. Click "Refresh" to reload
6. Click "Clear Filters" to reset

---

### 3. ✅ Voice Recording - FUNCTIONAL
**Status:** Already working from previous update

**Test It:**
1. Click "Voice Report" tab
2. Click "Start Recording"
3. Allow microphone access
4. Speak: "This is a test GBV case report for Western Area"
5. Click "Stop Recording"
6. Listen to playback
7. Click "Submit Report"
8. Should see success with case number
9. Go to "View Cases" tab to see your voice report

---

## 🧪 Step-by-Step Testing Sequence

### Test 1: Form Submission & View Cases
```
1. Click "Report Case" tab
2. Fill in the form:
   - Incident Date: Today's date
   - District: Select "Western Area Urban"
   - Violence Types: Check "Rape" and "Domestic Violence"
   - Survivor Age: 25
   - Survivor Gender: Female
   - Perpetrator Relationship: "Known acquaintance"
   - Reported By: "Survivor"
   - Priority: High
3. Scroll down and click "Submit Report"
4. You should see: "✓ Case Reported Successfully! Case Number: GBV-2025-XXXX"
5. Click "View Cases" tab
6. You should see your newly submitted case in the table
7. Click "Overview" tab
8. Total Cases should show "1" (or incremented)
```

### Test 2: Voice Recording
```
1. Click "Voice Report" tab
2. Click green "Start Recording" button
3. Browser will ask for microphone permission → Click "Allow"
4. Speak clearly: "I am reporting a GBV case in Freetown. The incident happened yesterday."
5. Click red "Stop Recording" button
6. Audio player appears → Click play to review
7. Click "Submit Report" button
8. Wait for processing (2 seconds)
9. Should see: "✅ Voice Report Submitted! Case Number: GBV-2025-XXXX"
10. Click "View Cases" tab
11. Should see voice report with violence type: "Voice Report - Pending Transcription"
```

### Test 3: Portal Login - Rainbo Centre
```
1. Click "Rainbo Portal" tab
2. You should see login form
3. Select Center: "Rainbo Centre Freetown (PCMH)"
4. Username: rainbo_freetown
5. Password: password123
6. Click "Sign In to Rainbo Portal"
7. Should redirect to Rainbo dashboard at /rainbo-dashboard
8. Should see:
   - Header: "Rainbo Centre Dashboard"
   - KPI cards: Total Cases, Medical Exams, PEP Administered, Counseling Sessions
   - Cases table with assigned cases
9. Click "Logout" button
10. Should return to main dashboard
```

### Test 4: Portal Login - Police FSU
```
1. Click "Police FSU" tab
2. You should see login form
3. Select Station: "Central Police Station - Freetown"
4. Officer ID: fsu_central
5. Password: password123
6. Click "Access FSU Portal"
7. Should redirect to Police dashboard at /police-dashboard
8. Should see:
   - Header: "Police FSU Dashboard"
   - KPI cards: Active Investigations, Statements Taken, Arrests Made, Court Cases
   - Investigation cases table
9. Click "Logout" button
10. Should return to main dashboard
```

### Test 5: Charts Display
```
1. Open main dashboard (should default to Overview tab)
2. Scroll down to "Monthly Trends" chart
3. Should see line chart with blue and red lines
4. Scroll to "Age Group Distribution" chart
5. Should see colorful doughnut chart
6. Click "Analytics" tab
7. Click back to "Overview" tab
8. Charts should re-appear and draw correctly
```

### Test 6: Search & Filters in View Cases
```
1. Click "View Cases" tab
2. In search box, type part of a case number (e.g., "GBV-2025")
3. Table should filter to matching cases
4. Clear search box
5. Click "Filter District" dropdown → Select "Western Area Urban"
6. Table should show only cases from that district
7. Click "Filter Status" dropdown → Select "reported"
8. Table should further filter to reported status
9. Click "Clear Filters" button
10. Table should show all cases again
11. Click "Refresh" button
12. Should reload all cases from server
```

---

## 🔑 Test Credentials

| Portal | Field | Value | Notes |
|--------|-------|-------|-------|
| **Rainbo Centre** | Username | `rainbo_freetown` | Select any Rainbo center from dropdown |
| | Password | `password123` | Same for all test accounts |
| **Police FSU** | Officer ID | `fsu_central` | Select any station from dropdown |
| | Password | `password123` | Same for all test accounts |
| **Admin** | Username | `admin` | Full system access |
| | Password | `password123` | Same for all test accounts |

---

## 🐛 Troubleshooting

### If Charts Don't Show:
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check if Chart.js is loaded: `console.log(typeof Chart)`
4. Should show "function" not "undefined"
5. Try clearing browser cache and reload

### If Voice Recording Doesn't Work:
1. Check browser is Chrome/Edge (best WebRTC support)
2. Ensure you clicked "Allow" for microphone permission
3. Check if microphone is working in system settings
4. Firefox/Safari may have limited MediaRecorder support

### If Login Fails:
1. Check credentials are exactly: `password123` (lowercase, no spaces)
2. Open browser console for error messages
3. Verify you're using correct username for each portal
4. Try clearing localStorage: `localStorage.clear()` in console

### If Cases Don't Appear:
1. Check that form submission was successful (saw success message)
2. Click "Refresh" button in View Cases tab
3. Clear filters if any are active
4. Check browser console for API errors
5. Run database reset if needed: `npm run db:reset`

---

## 📊 Expected Behavior

### Overview Tab:
- ✅ Shows 4 KPI cards (Total Cases, This Month, Sexual Assault, Service Coverage)
- ✅ Shows Monthly Trends line chart (blue and red lines)
- ✅ Shows Age Distribution doughnut chart (6 colored sections)
- ✅ Shows District Case Distribution cards
- ✅ Shows Service Providers list
- ✅ Auto-refreshes every 5 seconds (watch case count)

### Report Case Tab:
- ✅ Shows 7-section form (Incident, Survivor, Perpetrator, etc.)
- ✅ All fields work (dropdowns, checkboxes, text inputs)
- ✅ Submit button shows loading state
- ✅ Success message displays with case number
- ✅ Form resets after successful submission

### View Cases Tab (NEW):
- ✅ Shows table with all submitted cases
- ✅ Search box filters by case number
- ✅ District/Status/Priority dropdowns filter table
- ✅ "Clear Filters" resets all filters
- ✅ "Refresh" button reloads from API
- ✅ Shows case count at bottom

### Voice Report Tab:
- ✅ Shows recording interface with microphone icon
- ✅ "Start Recording" button requests permission
- ✅ Timer shows during recording (00:00 format)
- ✅ "Stop Recording" button saves audio
- ✅ Audio playback preview works
- ✅ "Submit Report" creates case with voice marker
- ✅ Success message with case number

### Rainbo Portal:
- ✅ Login form with center selection
- ✅ Redirects to /rainbo-dashboard after login
- ✅ Shows 4 medical KPIs
- ✅ Shows assigned cases table
- ✅ Logout returns to main dashboard

### Police FSU Portal:
- ✅ Login form with station selection
- ✅ Redirects to /police-dashboard after login
- ✅ Shows 4 investigation KPIs
- ✅ Shows investigation cases table
- ✅ Logout returns to main dashboard

---

## 💡 Pro Tips

### For Best Results:
1. **Use Chrome or Edge** - Best compatibility
2. **Allow all permissions** - Especially microphone
3. **Check internet connection** - For API calls
4. **Clear cache if issues** - Ctrl+Shift+Delete
5. **Use incognito mode** - For fresh testing

### Creating Test Data:
```bash
# Reset database and add test data
cd /home/user/webapp
npm run db:reset

# This will:
# - Delete old database
# - Run migrations
# - Insert test users and cases
```

### Checking Logs:
```bash
# View application logs
pm2 logs enhanced-gbv-dashboard --nostream

# Restart if needed
pm2 restart enhanced-gbv-dashboard

# Check service status
pm2 list
```

---

## ✅ Success Checklist

Go through this checklist to verify everything works:

- [ ] Can access main dashboard at public URL
- [ ] Overview tab shows with charts
- [ ] Charts re-initialize when returning to Overview
- [ ] Can submit report via "Report Case" form
- [ ] Can see submitted case in "View Cases" tab
- [ ] Can search/filter cases in "View Cases" tab
- [ ] Can record voice via "Voice Report" tab
- [ ] Can hear playback of voice recording
- [ ] Voice report creates case successfully
- [ ] Can login to Rainbo Portal with credentials
- [ ] Rainbo dashboard shows KPIs and cases
- [ ] Can logout from Rainbo Portal
- [ ] Can login to Police FSU Portal with credentials
- [ ] Police dashboard shows investigation data
- [ ] Can logout from Police FSU Portal
- [ ] Total case count increases in real-time
- [ ] All tabs are clickable and functional

---

## 📞 Quick Reference

**Dashboard URL:** https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai

**Rainbo Login:** `rainbo_freetown` / `password123`  
**Police Login:** `fsu_central` / `password123`  
**Admin Login:** `admin` / `password123`

**Emergency Hotline:** 116 (displayed in banner)

---

**Last Updated:** October 17, 2025  
**System Status:** ✅ ALL FEATURES OPERATIONAL  
**Tested Features:** Charts, View Cases, Voice Recording, Portals
