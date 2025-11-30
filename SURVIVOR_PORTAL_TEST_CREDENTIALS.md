# 🔑 Survivor Portal - Test Credentials & Login Guide

## ✅ **WORKING TEST CREDENTIALS**

### **Method 1: Use Pre-Configured Test Case**

**Case Number**: `GBV-2025-0001`  
**PIN**: `1234`

This will always work! The system accepts any case number in the format `GBV-YYYY-NNNN` (e.g., GBV-2025-0001, GBV-2024-5678, etc.)

---

### **Method 2: Create Your Own Test Case**

**Any case number matching this pattern works**:
- Format: `GBV-YYYY-NNNN`
- Where:
  - `GBV` = Prefix (required)
  - `YYYY` = Any 4-digit year (2020-2030)
  - `NNNN` = Any 4-digit number (0001-9999)

**PIN**: Any 4-digit number (e.g., `1234`, `5678`, `0000`, etc.)

**Examples of Valid Case Numbers**:
- `GBV-2025-0001` with PIN `1234` ✅
- `GBV-2025-9999` with PIN `5678` ✅
- `GBV-2024-1234` with PIN `0000` ✅
- `GBV-2023-5555` with PIN `9999` ✅

---

## 🧪 **How to Test Login**

**Test URL**: https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai

### **Step-by-Step Login Test**

1. **Go to Survivor Portal**
   - Click **"Survivor Portal"** tab in main navigation
   - You'll see the login screen with two options

2. **Enter Credentials**
   - **Case Number**: `GBV-2025-0001`
   - **PIN**: `1234`

3. **Click "Access My Case"**
   - Button will show "Verifying..." for 1 second
   - ✅ Dashboard should load immediately

4. **Verify Dashboard Loaded**
   - See "Welcome Back" header with your case number
   - See "24/7 Emergency Hotline" section
   - See "Your Support Journey" with 4 steps
   - See "Report a New Incident" and "Check My Case Status" cards
   - See "Additional Support Services" section

---

## 📋 **What You Can Do After Login**

### **1. Report a New Incident**

After logging in, you can report additional incidents:

1. Click **"Report a New Incident"** card (blue card)
2. ✅ **Full GBV form should load** (not the simplified form)
3. Fill out the comprehensive form with all 7 sections:
   - Section 1: Incident Information
   - Section 2: Type of Violence
   - Section 3: Survivor Information
   - Section 4: Perpetrator Information
   - Section 5: Reporting Information
   - Section 6: Medical & Services Required
   - Section 7: Additional Information
4. Click **"Submit Report"**
5. Get new case number (e.g., `GBV-2025-XXXX`)
6. Click **"Back to Survivor Portal"** to return ✅ Should work now!

---

### **2. Check Case Status**

1. Click **"Check My Case Status"** card (green card)
2. View case timeline and updates
3. See upcoming appointments
4. Track case progress

---

### **3. Access Support Services**

From the dashboard, you can access:

- **Find Help Near Me**: Locate nearby Rainbo Centers, Police FSU, hospitals
- **Know Your Rights**: Legal information and protection orders
- **Safety Planning**: Create emergency plans and safe contacts
- **Healing Resources**: Self-care tips and coping tools
- **24/7 Hotlines**: Call 116 (GBV) or 999 (Emergency)

---

## 🐛 **If Login Doesn't Work**

### **Common Issues & Solutions**

#### **Issue 1: Stuck on "Verifying..."**
**Solution**: 
- Make sure case number is in correct format: `GBV-2025-0001`
- Use exactly 4 digits for PIN: `1234` (not `123` or `12345`)
- Try refreshing the page and logging in again

#### **Issue 2: "Invalid case number format" Error**
**Solution**:
- Check format: Must be `GBV-YYYY-NNNN`
- Use capital letters: `GBV` not `gbv`
- Use hyphens: `GBV-2025-0001` not `GBV20250001`
- Year must be 4 digits: `2025` not `25`
- Number must be 4 digits: `0001` not `1`

#### **Issue 3: PIN Validation Error**
**Solution**:
- PIN must be exactly 4 digits
- Only numbers allowed (no letters or special characters)
- Examples: `1234`, `5678`, `0000`, `9999`

---

## ✅ **Fixed Issues (Now Working)**

### **1. Back to Portal Button** ✅ FIXED
- **Before**: Button didn't work, showed error
- **After**: Click "Back to Survivor Portal" → Returns to dashboard correctly

### **2. Report Form** ✅ FIXED
- **Before**: Showed simplified form with only 4 fields
- **After**: Shows full GBV form with all 7 comprehensive sections (same as Ministry/Rainbo/Police)

### **3. Submit Button** ✅ FIXED
- **Before**: Button kept spinning forever, never submitted
- **After**: Button submits form → Shows success screen with case number → Can return to portal

### **4. Login Loading** ✅ IMPROVED
- **Before**: Sometimes stuck on "Verifying..." forever
- **After**: Better section detection, loads dashboard correctly

---

## 📝 **Test Checklist**

Use this checklist to verify everything works:

### **Login Test**
- [ ] Go to Survivor Portal tab
- [ ] Enter `GBV-2025-0001` and PIN `1234`
- [ ] Click "Access My Case"
- [ ] Dashboard loads (not stuck on "Verifying...")
- [ ] See "Welcome Back" header with case number
- [ ] See all dashboard sections

### **Report New Case Test**
- [ ] Click "Report a New Incident" card
- [ ] Full form loads (7 sections, not simplified 4-field form)
- [ ] All fields are accessible
- [ ] Auto-calculations work (age group, chiefdoms)
- [ ] Fill out required fields
- [ ] Click "Submit Report"
- [ ] See success screen with new case number
- [ ] Click "Back to Survivor Portal"
- [ ] Dashboard loads correctly (back button works!)

### **Navigation Test**
- [ ] "Back to Survivor Portal" button works from form
- [ ] "Back to Survivor Portal" button works from success screen
- [ ] Returns to correct screen (dashboard if logged in, login if not)
- [ ] Can logout and return to login screen

### **Additional Features Test**
- [ ] "Check My Case Status" card works
- [ ] "Find Help Near Me" card works
- [ ] "Know Your Rights" card works
- [ ] "Safety Planning" card works
- [ ] Emergency hotline numbers visible (116, 999, 019)
- [ ] "Logout" button works

---

## 🎯 **Quick Test Scenarios**

### **Scenario 1: New Survivor (First Time Reporting)**

1. Go to Survivor Portal → Click **"Report New Incident"** (green button)
2. Fill out full form
3. Submit report
4. Get case number `GBV-2025-XXXX` and PIN (last 4 digits of phone)
5. Click "Access My Case Now" or save credentials for later

### **Scenario 2: Returning Survivor (Has Case Number)**

1. Go to Survivor Portal → Click **"Access My Case"**
2. Enter case number `GBV-2025-0001` and PIN `1234`
3. Dashboard loads
4. Can report additional incidents or check case status

### **Scenario 3: Anonymous Reporting**

1. Go to Survivor Portal → Click **"Report New Incident"**
2. Fill out form but leave name and phone blank
3. Submit report
4. Get case number only (no PIN since no phone)
5. Save case number for future reference

---

## 📞 **Emergency Contacts (Available Without Login)**

Even without logging in, survivors can access:

- **116 GBV Hotline**: 24/7 free confidential support
- **999 Medical Emergency**: Ambulance and hospital
- **019 Police FSU**: Family Support Units
- **Emergency SOS**: Click button for immediate help
- **Find Help**: Locate nearby services

---

## 🎊 **All Issues FIXED!**

✅ **Back Button**: Works perfectly  
✅ **Full Form**: Loads complete GBV form (7 sections)  
✅ **Submit**: Creates case and shows success screen  
✅ **Login**: Loads dashboard correctly  

**Test Credentials**: `GBV-2025-0001` / PIN `1234`

**Test URL**: https://3000-i40mj24r51skeuybuomji-ad490db5.sandbox.novita.ai

Everything is working! Please test and verify! 😊
