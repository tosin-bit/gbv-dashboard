/**
 * QUICK FIXES FOR CRITICAL ISSUES
 * Date: December 4, 2025
 * 
 * Fixes:
 * 1. Date picker not selectable
 * 2. View case details (green eye) not working
 * 3. Performance optimization
 */

console.log('🔧 Loading Quick Fixes...');

// ========================================
// FIX 1: Date Picker - Make Dates Selectable
// ========================================

function fixDatePicker() {
    console.log('📅 Fixing date picker...');
    
    // Wait for DOM to be ready
    setTimeout(() => {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        
        dateInputs.forEach(input => {
            // Remove any readonly or disabled attributes
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            
            // Ensure it's clickable
            input.style.pointerEvents = 'auto';
            input.style.cursor = 'pointer';
            
            // Add change listener to log
            input.addEventListener('change', (e) => {
                console.log(`✅ Date selected: ${e.target.value}`);
            });
            
            console.log(`✅ Fixed date input: ${input.id || input.name}`);
        });
        
        // Also fix any calendar overlays that might be blocking
        const overlays = document.querySelectorAll('.calendar-overlay, [class*="calendar"]');
        overlays.forEach(overlay => {
            if (overlay.style.zIndex && parseInt(overlay.style.zIndex) > 1000) {
                // Don't block date inputs
                overlay.style.pointerEvents = 'none';
            }
        });
        
    }, 1000); // Wait 1 second for DOM
    
    // Also fix on tab change
    if (typeof window.addEventListener !== 'undefined') {
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('tab-button')) {
                setTimeout(fixDatePicker, 500);
            }
        });
    }
}

// Run fix on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixDatePicker);
} else {
    fixDatePicker();
}

// ========================================
// FIX 2: View Case Details (Green Eye Icon)
// ========================================

// Fallback for viewCaseDetails if API fails
window.viewCaseDetailsFallback = function(caseNumber) {
    console.log(`👁️ Opening case details: ${caseNumber}`);
    
    // Try the normal function first
    if (typeof viewCaseDetails === 'function') {
        try {
            viewCaseDetails(caseNumber);
            return;
        } catch (error) {
            console.error('viewCaseDetails failed:', error);
        }
    }
    
    // Fallback: Show a simple modal with case info
    showSimpleCaseModal(caseNumber);
};

function showSimpleCaseModal(caseNumber) {
    // Fetch case details
    fetch(`/api/cases?search=${caseNumber}`)
        .then(response => response.json())
        .then(data => {
            const caseData = data.cases?.find(c => c.case_number === caseNumber);
            
            if (!caseData) {
                alert(`Case ${caseNumber} not found`);
                return;
            }
            
            // Create modal
            const modalHTML = `
                <div id="simple-case-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="this.remove()">
                    <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
                        <!-- Header -->
                        <div class="bg-blue-600 text-white p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold">${caseNumber}</h2>
                                    <p class="text-sm text-blue-100">${caseData.gbv_type || 'GBV Case'}</p>
                                </div>
                                <button onclick="document.getElementById('simple-case-modal').remove()" class="text-white hover:text-gray-200">
                                    <i class="fas fa-times text-2xl"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-6 space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <div class="text-sm text-gray-600">Incident Date</div>
                                    <div class="font-semibold">${formatSimpleDate(caseData.incident_date)}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-600">Reported Date</div>
                                    <div class="font-semibold">${formatSimpleDate(caseData.reported_date)}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-600">District</div>
                                    <div class="font-semibold">${caseData.district || 'Unknown'}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-600">Status</div>
                                    <div class="font-semibold">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                            ${caseData.case_status || 'Reported'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-600">Survivor Age Group</div>
                                    <div class="font-semibold">${caseData.survivor_age_group || 'N/A'}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-600">Priority</div>
                                    <div class="font-semibold">
                                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                            ${caseData.priority_level || 'Medium'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="border-t pt-4 mt-4">
                                <button onclick="window.open('/static/case-notes.js', '_blank')" class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    <i class="fas fa-sticky-note mr-2"></i>
                                    View Case Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        })
        .catch(error => {
            console.error('Error fetching case:', error);
            alert('Error loading case details. Please try again.');
        });
}

function formatSimpleDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch {
        return dateString;
    }
}

// Override viewCaseDetails globally if it doesn't exist
if (typeof window.viewCaseDetails === 'undefined') {
    window.viewCaseDetails = window.viewCaseDetailsFallback;
    console.log('✅ viewCaseDetails fallback installed');
}

// ========================================
// FIX 3: Performance - Lazy Load Analytics
// ========================================

let analyticsLoaded = false;

function lazyLoadAnalytics() {
    if (analyticsLoaded) return;
    
    console.log('📊 Lazy loading analytics scripts...');
    
    const analyticsScripts = [
        '/static/analytics-enhanced.js',
        '/static/district-map.js',
        '/static/spotlight-initiative.js'
    ];
    
    analyticsScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    });
    
    analyticsLoaded = true;
    console.log('✅ Analytics scripts loaded');
}

// Load analytics when Analytics tab is clicked
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && (
        target.textContent?.includes('Analytics') ||
        target.getAttribute('onclick')?.includes('analytics')
    )) {
        setTimeout(lazyLoadAnalytics, 100);
    }
});

// ========================================
// FIX 4: Debug Logger
// ========================================

window.debugGBV = function() {
    console.log('=== GBV Dashboard Debug Info ===');
    console.log('Date inputs:', document.querySelectorAll('input[type="date"]').length);
    console.log('viewCaseDetails function exists:', typeof viewCaseDetails !== 'undefined');
    console.log('Analytics loaded:', analyticsLoaded);
    console.log('Current tab:', document.querySelector('.tab-button.active')?.textContent);
    console.log('================================');
};

// Export functions
window.fixDatePicker = fixDatePicker;
window.lazyLoadAnalytics = lazyLoadAnalytics;

console.log('✅ Quick Fixes Loaded! Run debugGBV() in console for debug info');
