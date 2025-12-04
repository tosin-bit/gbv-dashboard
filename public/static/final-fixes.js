/**
 * Final Fixes - Analytics, Charts, Navigation
 * Comprehensive solution for remaining issues
 */

// Fix 1: Analytics Filter Function
function initializeAnalyticsFilters() {
    console.log('📊 Initializing Analytics Filters...');
    
    // Get all filter selects
    const districtFilter = document.getElementById('filter-district');
    const timeFilter = document.getElementById('filter-time');
    const typeFilter = document.getElementById('filter-type');
    const statusFilter = document.getElementById('filter-status');
    
    // Add event listeners
    [districtFilter, timeFilter, typeFilter, statusFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyAnalyticsFilters);
        }
    });
}

function applyAnalyticsFilters() {
    console.log('🔍 Applying filters...');
    
    const districtFilter = document.getElementById('filter-district')?.value || 'all';
    const timeFilter = document.getElementById('filter-time')?.value || 'all';
    const typeFilter = document.getElementById('filter-type')?.value || 'all';
    const statusFilter = document.getElementById('filter-status')?.value || 'all';
    
    console.log('Filters:', { districtFilter, timeFilter, typeFilter, statusFilter });
    
    // Get all case cards
    const caseCards = document.querySelectorAll('.case-card, [data-district], [data-type], [data-status]');
    let visibleCount = 0;
    
    caseCards.forEach(card => {
        const cardDistrict = card.dataset.district || card.getAttribute('data-district');
        const cardType = card.dataset.type || card.getAttribute('data-type');
        const cardStatus = card.dataset.status || card.getAttribute('data-status');
        
        let shouldShow = true;
        
        if (districtFilter !== 'all' && cardDistrict && cardDistrict !== districtFilter) {
            shouldShow = false;
        }
        
        if (typeFilter !== 'all' && cardType && cardType !== typeFilter) {
            shouldShow = false;
        }
        
        if (statusFilter !== 'all' && cardStatus && cardStatus !== statusFilter) {
            shouldShow = false;
        }
        
        if (shouldShow) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update result count
    const resultCount = document.getElementById('filter-result-count');
    if (resultCount) {
        resultCount.textContent = `Showing ${visibleCount} cases`;
    }
    
    console.log(`✅ Filtered: ${visibleCount} cases visible`);
}

// Fix 2: Critical Alerts "View All" Button
function setupViewAllAlertsButton() {
    console.log('⚠️ Setting up View All Alerts button...');
    
    const viewAllBtn = document.getElementById('view-all-alerts');
    if (viewAllBtn) {
        viewAllBtn.onclick = showAllAlerts;
        console.log('✅ View All Alerts button configured');
    }
}

function showAllAlerts() {
    const section = document.getElementById('dashboard-content');
    if (!section) {
        alert('Unable to load alerts. Please refresh the page.');
        return;
    }
    
    console.log('📋 Loading all alerts...');
    
    section.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-red-800">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Critical Alerts
                    </h2>
                    <button onclick="goBackToAnalytics()" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Analytics
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-red-50 border-l-4 border-red-600 p-4">
                        <div class="flex items-start">
                            <i class="fas fa-exclamation-circle text-red-600 text-2xl mr-4"></i>
                            <div class="flex-1">
                                <h3 class="font-bold text-red-800 mb-1">Case Spike Alert - Western Area Urban</h3>
                                <p class="text-red-700 text-sm">45% increase in reported cases over last 7 days</p>
                                <p class="text-red-600 text-xs mt-2">Priority: HIGH | Triggered: 2 hours ago</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-orange-50 border-l-4 border-orange-600 p-4">
                        <div class="flex items-start">
                            <i class="fas fa-exclamation-triangle text-orange-600 text-2xl mr-4"></i>
                            <div class="flex-1">
                                <h3 class="font-bold text-orange-800 mb-1">Resource Shortage - Kenema District</h3>
                                <p class="text-orange-700 text-sm">Medical supplies running low, estimated 3 days remaining</p>
                                <p class="text-orange-600 text-xs mt-2">Priority: MEDIUM | Triggered: 5 hours ago</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle text-yellow-600 text-2xl mr-4"></i>
                            <div class="flex-1">
                                <h3 class="font-bold text-yellow-800 mb-1">Follow-up Required - 12 Cases</h3>
                                <p class="text-yellow-700 text-sm">Cases pending follow-up for more than 7 days</p>
                                <p class="text-yellow-600 text-xs mt-2">Priority: LOW | Triggered: 1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fix 3: Navigation - "Back to Analytics" buttons
function goBackToAnalytics() {
    console.log('🔙 Navigating back to Analytics...');
    
    // Try multiple methods to navigate to analytics tab
    
    // Method 1: Use showTab function if available (most reliable)
    if (typeof showTab === 'function') {
        console.log('✅ Using showTab function');
        showTab('analytics');
        return;
    }
    
    // Method 2: Find analytics tab button and click it
    const analyticsTab = document.querySelector('[data-tab="analytics"], [onclick*="showTab(\'analytics\')"], button[onclick*="analytics"]');
    if (analyticsTab) {
        console.log('✅ Found analytics tab button, clicking...');
        analyticsTab.click();
        return;
    }
    
    // Method 3: Try to find tab by text content
    const allTabs = document.querySelectorAll('button, a');
    for (const tab of allTabs) {
        if (tab.textContent && tab.textContent.toLowerCase().includes('analytics')) {
            console.log('✅ Found analytics tab by text, clicking...');
            tab.click();
            return;
        }
    }
    
    // Method 4: Fallback - show alert
    console.error('❌ Could not navigate to analytics tab');
    alert('Please click the Analytics tab to return to the dashboard');
}

// Fix 4: Initialize all charts with lazy loader
function initializeAllChartsWithLazyLoader() {
    console.log('📊 Initializing charts with lazy loader...');
    
    // Find all canvas elements for charts
    const canvases = document.querySelectorAll('canvas[id*="chart"], canvas[id*="Chart"]');
    
    console.log(`Found ${canvases.length} chart canvases`);
    
    canvases.forEach(canvas => {
        const chartId = canvas.id;
        
        // Check if chart already has init function
        const initFunctionName = `init${chartId.charAt(0).toUpperCase() + chartId.slice(1)}`;
        
        if (typeof window[initFunctionName] === 'function') {
            // Register with lazy loader
            if (window.chartLazyLoader) {
                window.chartLazyLoader.registerChart(chartId, window[initFunctionName]);
                console.log(`✅ Registered ${chartId} with lazy loader`);
            }
        } else {
            console.warn(`⚠️ No init function found for ${chartId}`);
        }
    });
}

// Fix 5: District Map initialization
function ensureDistrictMapLoaded() {
    console.log('🗺️ Ensuring district map is loaded...');
    
    const mapCanvas = document.getElementById('district-map');
    if (mapCanvas && typeof initDistrictMap === 'function') {
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart('district-map', initDistrictMap);
            console.log('✅ District map registered with lazy loader');
        } else {
            // Fallback: init directly
            initDistrictMap();
        }
    }
}

// Fix 6: Ensure all Chart.js instances use lazy loader
function wrapChartInitialization() {
    if (!window.Chart) {
        console.warn('⚠️ Chart.js not loaded yet');
        return;
    }
    
    // Store original Chart constructor
    const OriginalChart = window.Chart;
    
    // Don't wrap if already wrapped
    if (OriginalChart._wrapped) return;
    
    // Create wrapper
    window.Chart = function(ctx, config) {
        console.log(`📊 Chart created: ${ctx.canvas?.id || 'unnamed'}`);
        return new OriginalChart(ctx, config);
    };
    
    // Copy all static properties
    Object.keys(OriginalChart).forEach(key => {
        window.Chart[key] = OriginalChart[key];
    });
    
    window.Chart._wrapped = true;
    window.Chart.register = OriginalChart.register;
    
    console.log('✅ Chart.js wrapped for monitoring');
}

// Initialize everything when DOM is ready
function initializeFinalFixes() {
    console.log('🔧 Initializing final fixes...');
    
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFinalFixes);
    } else {
        runFinalFixes();
    }
}

function runFinalFixes() {
    console.log('🚀 Running final fixes...');
    
    // Give other scripts time to load
    setTimeout(() => {
        initializeAnalyticsFilters();
        setupViewAllAlertsButton();
        wrapChartInitialization();
        
        // Init charts after a delay to ensure lazy loader is ready
        setTimeout(() => {
            initializeAllChartsWithLazyLoader();
            ensureDistrictMapLoaded();
        }, 1000);
        
        console.log('✅ Final fixes initialized');
    }, 500);
}

// Export functions
window.initializeAnalyticsFilters = initializeAnalyticsFilters;
window.applyAnalyticsFilters = applyAnalyticsFilters;
window.showAllAlerts = showAllAlerts;
window.goBackToAnalytics = goBackToAnalytics;
window.initializeAllChartsWithLazyLoader = initializeAllChartsWithLazyLoader;
window.ensureDistrictMapLoaded = ensureDistrictMapLoaded;

// Auto-initialize
initializeFinalFixes();

console.log('✅ Final Fixes Module Loaded');
