# Critical Fixes Needed - GBV Dashboard

## Priority Level: URGENT

### 1. ✅ REPORT CASE FORM ISSUES

**Problem**: Date picker doesn't work, fields not validating properly
**Fix Needed**:
- Add default value to incident_date (today's date)
- Ensure all required fields have proper validation
- Add better visual feedback for field states
- Test all dropdowns and inputs

**File**: `public/static/report-case-form.js`

### 2. ✅ VIEW CASE DATA MISMATCH

**Problem**: Submitted Pujehun, recorded as Moyamba
**Root Cause**: District IDs mismatch between form and display
**Fix Needed**:
- Create district ID to name mapping
- Ensure consistency across all API calls
- Add data validation on submission
- Fix display logic to show correct district name

**Files**: 
- `public/static/report-case-form.js`
- `src/index.tsx` (API endpoint)

### 3. ✅ DISTRICT MAP NOT SHOWING

**Problem**: Map doesn't load, slow performance
**Fix Needed**:
- Check if Chart.js is properly loaded
- Verify map data structure
- Optimize loading (lazy load if needed)
- Add loading indicators

**File**: Ministry dashboard map section

### 4. ✅ ANALYTICS ISSUES

**Problems**:
- Filters don't filter
- "View All Alerts" button doesn't work
- "Back to Analytics" goes to wrong page
- Multiple graphs not showing

**Fix Needed**:
- Fix filter logic
- Add View All Alerts modal/page
- Fix navigation buttons
- Initialize all Chart.js graphs properly
- Ensure data is available for all charts

### 5. ✅ SPOTLIGHT INITIATIVE GRAPHS

**Problem**: 15+ graphs not displaying
**Fix Needed**:
- Check Chart.js initialization
- Verify data structure for each graph
- Add error handling
- Show "No data" message if data missing

### 6. ✅ SURVIVOR PORTAL BUTTONS

**Problem**: Report New Incident and other buttons don't work
**Fix Needed**:
- Already partially fixed - verify on production
- Add comprehensive error handling
- Add loading states

### 7. ✅ SURVIVOR PORTAL ENHANCEMENTS

**New Features Needed**:
1. **Emergency SOS Button**
   - Big red button
   - Calls police (tel:019)
   - Sends SMS with location
   - Shows nearest help centers

2. **Voice Reporting with AI**
   - Record voice
   - AI asks follow-up questions
   - Auto-fills form fields
   - Submit as case

3. **Self-Report & Track**
   - Already implemented - ensure working
   
### 8. ✅ PERFORMANCE ISSUES

**Problem**: "Page unresponsive" warnings
**Root Causes**:
- Too much JavaScript executing at once
- Chart.js rendering all graphs simultaneously
- Large DOM manipulations
- No lazy loading

**Fixes Needed**:
- Lazy load charts (only render when visible)
- Debounce expensive operations
- Use requestAnimationFrame for animations
- Split large data processing into chunks
- Add proper loading states

---

## IMMEDIATE ACTION PLAN

### Phase 1: Critical Bugs (Do First)
1. Fix date picker - add default value
2. Fix district data mismatch - create proper ID mapping
3. Fix Survivor Portal buttons - ensure all working
4. Fix performance - lazy load charts

### Phase 2: Missing Features
1. District map display
2. Analytics filters
3. All missing graphs

### Phase 3: Enhancements
1. Emergency SOS button
2. Voice reporting with AI
3. Better loading states

---

## TECHNICAL DEBT

### Chart.js Issues
- Not all charts being initialized
- Missing data for some charts
- Need better error handling
- Consider using Chart.js lazy loading plugin

### Data Consistency
- District IDs vs Names mismatch
- Need centralized data constants file
- API responses not validated

### Performance
- Too many synchronous operations
- DOM updates blocking UI
- Need better state management
- Consider breaking into smaller modules

---

## ESTIMATED TIME

- Phase 1: 2-3 hours
- Phase 2: 3-4 hours  
- Phase 3: 4-5 hours

**Total**: 9-12 hours of focused development

---

## RECOMMENDATION

Given the scope, I recommend:
1. **Fix critical bugs first** (Phase 1) - Deploy immediately
2. **Deploy incremental updates** - Don't wait for everything
3. **Test each fix** before moving to next
4. **Use feature flags** for experimental features

---

*This document serves as a roadmap for addressing all reported issues systematically.*
