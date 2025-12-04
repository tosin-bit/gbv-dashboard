/**
 * FORM FIXES - Date Picker and Dropdowns
 * Targeted fixes for form inputs without breaking functionality
 */

console.log('📝 FORM FIXES Loading...');

// Wait for DOM to be ready
function initFormFixes() {
    console.log('📝 Initializing Form Fixes...');
    
    // ========================================
    // FIX 1: DATE INPUTS - Make them clickable and functional
    // ========================================
    function fixDateInputs() {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        console.log(`📅 Found ${dateInputs.length} date inputs to fix`);
        
        dateInputs.forEach((input, index) => {
            // Ensure the input is not blocked
            input.style.pointerEvents = 'auto';
            input.style.cursor = 'pointer';
            input.removeAttribute('disabled');
            input.removeAttribute('readonly');
            
            // Set max date to today
            const today = new Date().toISOString().split('T')[0];
            input.setAttribute('max', today);
            
            // Force the date picker to open on click
            input.addEventListener('click', function(e) {
                console.log('📅 Date input clicked:', this.name || this.id);
                try {
                    this.showPicker();
                } catch (err) {
                    console.log('showPicker not supported, using default behavior');
                }
            });
            
            // Prevent parent click events from interfering
            input.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
            
            // Add change listener for debugging
            input.addEventListener('change', function() {
                console.log(`✅ Date selected for ${this.name || this.id}:`, this.value);
            });
            
            console.log(`✅ Fixed date input ${index + 1}: ${input.name || input.id}`);
        });
    }
    
    // ========================================
    // FIX 2: SELECT DROPDOWNS - Make them work properly
    // ========================================
    function fixSelectDropdowns() {
        const selects = document.querySelectorAll('select');
        console.log(`📋 Found ${selects.length} select dropdowns to fix`);
        
        selects.forEach((select, index) => {
            // Ensure dropdown is interactive
            select.style.pointerEvents = 'auto';
            select.style.cursor = 'pointer';
            select.removeAttribute('disabled');
            select.removeAttribute('readonly');
            
            // Prevent parent click events from interfering
            select.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
            
            // Add change listener for debugging
            select.addEventListener('change', function() {
                console.log(`✅ Option selected in ${this.name || this.id}:`, this.value);
            });
            
            console.log(`✅ Fixed select ${index + 1}: ${select.name || select.id}`);
        });
    }
    
    // ========================================
    // FIX 3: REMOVE BLOCKING OVERLAYS
    // ========================================
    function removeBlockingOverlays() {
        const overlays = document.querySelectorAll('.date-picker-overlay, .custom-date-picker, [class*="overlay"]');
        overlays.forEach(overlay => {
            const style = window.getComputedStyle(overlay);
            if (style.position === 'absolute' || style.position === 'fixed') {
                if (style.zIndex > 0) {
                    console.log('🗑️ Removing blocking overlay:', overlay.className);
                    overlay.remove();
                }
            }
        });
    }
    
    // ========================================
    // INITIALIZE ALL FIXES
    // ========================================
    function applyAllFixes() {
        removeBlockingOverlays();
        fixDateInputs();
        fixSelectDropdowns();
    }
    
    // Apply fixes immediately
    applyAllFixes();
    
    // Re-apply when new content is added to the page
    // Use a less aggressive observer
    const observer = new MutationObserver((mutations) => {
        let shouldReapply = false;
        
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node contains forms or inputs
                    if (node.tagName === 'FORM' || 
                        node.tagName === 'INPUT' || 
                        node.tagName === 'SELECT' ||
                        node.querySelector('form, input, select')) {
                        shouldReapply = true;
                    }
                }
            });
        });
        
        if (shouldReapply) {
            console.log('📝 New form elements detected, re-applying fixes...');
            setTimeout(applyAllFixes, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('✅ Form Fixes Applied Successfully');
    console.log('📅 Date inputs: Clickable and functional');
    console.log('📋 Select dropdowns: Interactive and working');
    console.log('🔍 Monitoring for new form elements...');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormFixes);
} else {
    initFormFixes();
}

// Also run after a short delay to catch dynamically loaded forms
setTimeout(initFormFixes, 1000);
setTimeout(initFormFixes, 3000);

console.log('✅ FORM FIXES Loaded');
