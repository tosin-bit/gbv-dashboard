# 🌐 Language Switch Feature - Sierra Leone GBV Dashboard

## Overview
A simple, elegant language switcher that allows users to view the dashboard in their preferred local language.

---

## 🎯 Languages Supported

| Language | Flag | Native Name | Speakers |
|----------|------|-------------|----------|
| English  | 🇬🇧  | English     | ~20%     |
| Krio     | 🇸🇱  | Krio        | ~95%     |
| Mende    | 🇸🇱  | Mende       | ~35%     |
| Temne    | 🇸🇱  | Temne       | ~35%     |

**Total Coverage:** ~99% of Sierra Leone population

---

## 📍 Where is the Language Button?

Look at the **top right corner** of the dashboard, in the header area:

```
┌─────────────────────────────────────────┐
│ GBV Dashboard         🇬🇧 English ▼    │ ← Language button here
│ Last Updated: 10/17/2025                │
└─────────────────────────────────────────┘
```

---

## 🔧 How to Use

### **Step 1: Find the Language Button**
- Located in the top-right corner of the header
- Shows current language (e.g., "🇬🇧 English")
- Has a dropdown arrow (▼)

### **Step 2: Click the Button**
- A menu will appear with 4 language options:
  - 🇬🇧 English
  - 🇸🇱 Krio
  - 🇸🇱 Mende
  - 🇸🇱 Temne

### **Step 3: Select Your Language**
- Click on your preferred language
- The page will instantly translate
- A checkmark (✓) shows your current selection

### **Step 4: Language is Saved**
- Your choice is automatically saved
- Next time you visit, the page loads in your language
- No need to select again

---

## 📝 What Gets Translated?

### **Navigation Tabs:**
- Overview → Ɔvavyu (Krio)
- Report Case → Ripɔt Kes (Krio)
- View Cases → Si Kes dɛm (Krio)
- District Map → Distrik Map
- Analytics → Analytics
- Resources → Rɛsɔs dɛm (Krio)
- Voice Report → Vɔys Ripɔt (Krio)
- Admin → Admin

### **Statistics Cards:**
- Total Cases → Ɔl Di Kes dɛm (Krio)
- This Month → Dis Mɔnt (Krio)
- Sexual Assault Cases → Sɛks Atak Kes dɛm (Krio)
- Service Coverage → Savis Kɔvarej (Krio)

### **Emergency Banner:**
- "EMERGENCY: Call 116..." → "EMƐJENSI: Kɔl 116..." (Krio)
- "Available 24/7..." → "Ɛvride 24/7..." (Krio)

### **Buttons:**
- Refresh Data → Rifrɛsh Data (Krio)
- Submit → Sɛn (Krio)
- Cancel → Kansul (Krio)
- Save → Sev (Krio)

---

## 🎨 Visual Design

### **Language Button Appearance:**
```
┌─────────────────────────┐
│  🌐  🇬🇧 English ▼     │  ← Blue button
└─────────────────────────┘
```

### **Dropdown Menu:**
```
┌─────────────────────────┐
│  🇬🇧 English         ✓ │  ← Selected (blue background)
│  🇸🇱 Krio              │
│  🇸🇱 Mende             │
│  🇸🇱 Temne             │
└─────────────────────────┘
```

### **Color Scheme:**
- Button Background: Navy Blue (#1e3a8a)
- Hover Effect: Slightly lighter blue
- Selected Item: Light blue background with green checkmark
- Text: White on button, dark on dropdown

---

## 💡 Key Features

### ✅ **Automatic Save**
- Language choice saved to browser
- Persists across sessions
- No login required

### ✅ **Instant Translation**
- Changes happen immediately
- No page reload needed
- Smooth user experience

### ✅ **Clean Design**
- Minimal, non-intrusive
- Matches dashboard style
- Easy to find and use

### ✅ **Mobile Friendly**
- Works on phones and tablets
- Touch-optimized
- Responsive design

---

## 🔄 How It Works (Technical)

### **Translation System:**
1. Each translatable element has a `data-translate` attribute
2. When language changes, JavaScript finds all these elements
3. Text is replaced with translation from language file
4. Icons and structure remain unchanged

### **Storage:**
- Uses browser's `localStorage`
- Key: `gbv_language`
- Values: `en`, `krio`, `mende`, `temne`

### **Files:**
- `/static/language-switch.js` - Main translation system
- Embedded translations for all 4 languages
- No external API calls needed

---

## 📋 Translation Examples

### **English → Krio:**
```
Overview          → Ɔvavyu
Report Case       → Ripɔt Kes
Total Cases       → Ɔl Di Kes dɛm
This Month        → Dis Mɔnt
Submit            → Sɛn
Refresh Data      → Rifrɛsh Data
```

### **English → Mende:**
```
Overview          → Gɔmɛni
Report Case       → Hɔtɛɛ lɔ
Total Cases       → Hɔtɛɛ kpɔɔ
This Month        → Ɓuɛi gɔ
Submit            → Tɔmɛ
```

### **English → Temne:**
```
Overview          → Ro-lɔk
Report Case       → Ka-bamp Poth
Total Cases       → Ka-bamp Yɛrɛ
This Month        → Kə-ker Konii
Submit            → Yir
```

---

## 🎓 For Ministry Staff

### **Teaching Users:**
1. **Point to the top-right corner**: "See where it says 'English'?"
2. **Click to show options**: "Click here to see other languages"
3. **Select their language**: "Choose Krio, Mende, or Temne"
4. **Show the change**: "Now everything is in your language!"

### **Common Questions:**

**Q: "Do I need to change it every time?"**
A: No, it remembers your choice.

**Q: "Can I switch back to English?"**
A: Yes, just click the button and select English.

**Q: "Will my reports be in that language?"**
A: The interface changes, but reports are stored as entered.

**Q: "Does it work on my phone?"**
A: Yes, works on all devices.

---

## 🌟 Benefits

### **For Users:**
- ✅ Use dashboard in comfortable language
- ✅ Better understanding of features
- ✅ Reduced errors from misunderstanding
- ✅ Increased confidence in system

### **For Ministry:**
- ✅ Higher adoption rates
- ✅ More accurate data entry
- ✅ Better community engagement
- ✅ Inclusive service delivery

### **For Sierra Leone:**
- ✅ Respects linguistic diversity
- ✅ Empowers local communities
- ✅ Improves GBV response
- ✅ Digital inclusion

---

## 🔧 Future Enhancements (Optional)

- Add more languages (Limba, Fula, Susu)
- Translate form labels and placeholders
- Add language-specific help text
- Create video tutorials per language
- Translate PDF reports

---

## 📞 Support

**For Technical Issues:**
- Check browser compatibility
- Clear browser cache
- Refresh page
- Contact Insyt Solutions

**For Translation Improvements:**
- Suggestions welcome
- Community feedback valued
- Continuous improvement

---

## ✨ Summary

The language switch feature makes the GBV Dashboard accessible to **99% of Sierra Leone's population** by supporting English, Krio, Mende, and Temne.

**Simple. Clean. Effective.** 🇸🇱

---

*Built with care by Insyt FamilyCare for the Ministry of Gender and Children's Affairs*

**Version:** 2.1 - Language Switch  
**Date:** November 15, 2025  
**Status:** ✅ Active
