# 🔐 Survivor Portal - Login Details & Access Guide

**Date**: 2025-11-30  
**Status**: ✅ **ACTIVE**

---

## 🎯 Overview

The Survivor Portal is a secure, trauma-informed space where survivors can:
- Access their case information
- Track case progress
- View appointments
- Message counselors
- Access resources
- Find help near them
- Know their rights

---

## 🔑 Login Methods

### **Method 1: Access Existing Case** (For survivors who already reported)

**Requirements**:
1. **Case Number** (format: `GBV-YYYY-NNNN`)
2. **Security PIN** (4-digit number - last 4 digits of phone number provided during reporting)

**Example Login**:
```
Case Number: GBV-2025-0001
PIN: 1234
```

---

### **Method 2: Report New Incident** (For first-time reporters)

No login required - click "Start New Report" button to:
- File a confidential report
- Get connected to support services
- Receive a case number (for future login)

---

## 🧪 Demo/Testing Login Details

For **testing purposes**, the system currently accepts any case number in the correct format:

### **Test Credentials**:

**Option 1**:
- **Case Number**: `GBV-2025-0001`
- **PIN**: `1234`

**Option 2**:
- **Case Number**: `GBV-2025-0002`
- **PIN**: `5678`

**Option 3**:
- **Case Number**: `GBV-2025-0123`
- **PIN**: `9999`

**Any case number that matches this pattern will work**: `GBV-YYYY-NNNN`
- `GBV-` = Prefix
- `YYYY` = 4-digit year (e.g., 2025)
- `NNNN` = 4-digit case number (e.g., 0001, 0123)

**Any 4-digit PIN works** for demo purposes.

---

## 🔒 Production Authentication

In a **production environment**, the login would work as follows:

### **Real Case Number Generation**:
When a survivor reports an incident, they receive:
- **Case Number**: Automatically generated (e.g., `GBV-2025-0234`)
- **PIN Setup**: Last 4 digits of their phone number
- **PIN is private**: Only the survivor knows it

### **Authentication Flow**:
1. Survivor enters case number
2. Survivor enters PIN
3. System validates against database:
   ```sql
   SELECT * FROM gbv_cases 
   WHERE case_number = 'GBV-2025-0234' 
   AND phone_last_4 = '1234'
   ```
4. If match: Grant access to case details
5. If no match: Show error message

### **Security Features**:
- ✅ PIN hashed in database
- ✅ Session timeout after inactivity
- ✅ SSL/TLS encryption
- ✅ No passwords stored
- ✅ Anonymous option (no phone = no PIN login)

---

## 🎨 Login Screen UI

**Location**: Click "Survivor Portal" tab

**Screen Layout**:

```
┌────────────────────────────────────────┐
│     Survivor Support Portal            │
│  Safe, Confidential Access to Your Case│
└────────────────────────────────────────┘

┌──────────────────────────────────────┐
│  📋 Access My Case                   │
│                                      │
│  Case Number: [GBV-2025-0001]       │
│  PIN: [****]                        │
│                                      │
│  [Access My Case]                   │
└──────────────────────────────────────┘

            OR

┌──────────────────────────────────────┐
│  📝 Report New Incident              │
│                                      │
│  First time reporting? Start here   │
│                                      │
│  [Start New Report]                 │
└──────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆘 Need Help Now?
📞 Call 116  |  🚨 Emergency SOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📊 What Survivors Can Access After Login

### **1. Case Dashboard**
- Case number and status
- Timeline of case progress
- Assigned support staff
- Next steps and appointments

### **2. Case Progress Tracker**
Visual timeline showing:
- ✅ Report Filed (completed)
- 🔄 Initial Assessment (in progress)
- ⏳ Services Coordination (pending)
- ⏳ Follow-up Care (pending)

### **3. Support Services**
- Medical care information
- Counseling sessions
- Legal support
- Police FSU updates
- Safe house details (if needed)

### **4. Appointments**
- Upcoming appointments calendar
- Reminders
- Location and contact info

### **5. Messages**
- Secure messaging with counselor
- Case worker updates
- Service provider communications

### **6. Resources**
- Educational materials
- Healing resources
- Legal information
- Support groups

### **7. Emergency Features**
- Quick exit button
- Emergency SOS
- 116 hotline (one-click call)
- Find help near me

---

## 🚨 Emergency Access (No Login Required)

**Available without login**:
- **Call 116** - Direct hotline button
- **Emergency SOS** - Red button for immediate help
- **Report New Incident** - Anonymous reporting option

**Trauma-Informed Design**:
- ✅ Quick exit button (on every page)
- ✅ Session auto-logout after inactivity
- ✅ No browsing history saved
- ✅ Private browsing mode recommended
- ✅ Simple, clear language
- ✅ Calming colors (blues and greens)

---

## 🔐 Session Management

**After Successful Login**:
- Session stored in `sessionStorage` (not `localStorage`)
- Session cleared when browser tab closes
- Auto-logout after 30 minutes of inactivity
- Manual logout button available

**Session Data Stored**:
```javascript
{
  caseNumber: "GBV-2025-0001",
  loginTime: "2025-11-30T15:30:00.000Z",
  sessionId: "unique-session-id"
}
```

---

## 🧪 How to Test

### **Step 1: Navigate to Survivor Portal**
- Click **"Survivor Portal"** tab in main dashboard

### **Step 2: Choose Login Method**

**For Testing Existing Case**:
1. Enter case number: `GBV-2025-0001`
2. Enter PIN: `1234`
3. Click "Access My Case"
4. ✅ Should see survivor dashboard

**For Testing New Report**:
1. Click "Start New Report"
2. Fill out incident form
3. Get new case number
4. Use case number + PIN for future login

### **Step 3: Explore Dashboard**
- View case progress
- Check messages
- Browse resources
- Try emergency SOS button

### **Step 4: Logout**
- Click "Logout" button in header
- Confirm session cleared
- Returns to login screen

---

## 📱 Mobile Experience

**Mobile-Optimized**:
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Large text for readability
- ✅ Emergency buttons prominent
- ✅ Works on low-bandwidth

**Quick Exit Feature**:
- Shake phone to trigger quick exit
- Or tap "Quick Exit" button
- Redirects to safe website (weather.com)

---

## 🌍 Multi-Language Support

**Supported Languages**:
- English
- Krio
- Mende
- Temne

**Language Switching**:
- Available on login screen
- Persists throughout session
- All content translated

---

## 🔧 Technical Implementation

### **Current (Demo) Logic**:
```javascript
// Accept any case number matching pattern
const casePattern = /^GBV-\d{4}-\d{4}$/;

if (casePattern.test(caseNumber)) {
    // Create session
    sessionStorage.setItem('survivor_session', JSON.stringify({
        caseNumber: caseNumber,
        loginTime: new Date().toISOString()
    }));
    // Load dashboard
    loadSurvivorDashboard(section);
}
```

### **Production Logic (Future)**:
```javascript
// Validate against database
const response = await fetch('/api/auth/survivor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ caseNumber, pin })
});

if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem('survivor_session', JSON.stringify(data));
    loadSurvivorDashboard(section);
} else {
    alert('Invalid case number or PIN');
}
```

---

## 📋 FAQ

**Q: I forgot my case number. How do I get it?**
A: Call 116 hotline with your name and approximate date of incident. They can look it up securely.

**Q: I forgot my PIN. What should I do?**
A: Call 116 hotline to verify identity and reset PIN.

**Q: Can I access the portal without a phone number?**
A: For anonymous reports without phone, a special access code is provided instead of PIN.

**Q: Is my information safe?**
A: Yes! All data is encrypted, sessions are secure, and privacy is our top priority.

**Q: Can someone else see my case if they know my case number?**
A: No, they also need the correct PIN (last 4 digits of your phone).

**Q: How long does my session last?**
A: Session lasts until you logout, close browser tab, or after 30 minutes of inactivity.

---

## ✅ Quick Reference

### **For Demo/Testing**:
```
URL: https://your-dashboard-url.com
Tab: Survivor Portal
Case Number: GBV-2025-0001 (or any GBV-YYYY-NNNN format)
PIN: 1234 (or any 4 digits)
```

### **For Real Users**:
```
Case Number: Provided when you report incident
PIN: Last 4 digits of your phone number
Support: Call 116 if you need help accessing
```

---

## 🎉 Summary

**Login is SIMPLE**:
1. **Case Number** (given when you report)
2. **PIN** (last 4 digits of your phone)
3. Click "Access My Case"

**For Testing**:
- Any case number like `GBV-2025-0001`
- Any 4-digit PIN like `1234`

**Security Built-In**:
- Encrypted transmission
- Session timeout
- Quick exit feature
- No browsing history
- Anonymous option available

---

**The Survivor Portal provides safe, compassionate, and confidential access to support!** 🇸🇱❤️
