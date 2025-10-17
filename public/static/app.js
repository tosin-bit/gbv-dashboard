// Enhanced GBV Dashboard - Frontend JavaScript
console.log('Enhanced GBV Dashboard initializing...');

// Global state
window.GBVDashboard = {
    data: {
        stats: {},
        cases: [],
        districts: [],
        serviceProviders: [],
        loading: true
    },
    charts: {},
    modules: {
        predictiveAnalytics: null,
        survivorJourney: null,
        roleManagement: null,
        budgetOptimization: null,
        advancedFeatures: null,
        reportingSystem: null,
        mobileInterface: null
    },
    activeTab: 'dashboard'
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Enhanced GBV Dashboard...');
    console.log('DOM loaded, starting dashboard initialization...');
    
    // Start basic initialization immediately
    setTimeout(() => {
        console.log('Starting immediate dashboard initialization...');
        loadDashboardData();
        setupEventListeners();
    }, 1000);
    
    // Wait for modules with timeout, then enhance
    waitForModules().then(() => {
        console.log('Modules loaded, enhancing dashboard...');
        initializeAdvancedModules();
    }).catch(() => {
        console.log('Module loading timed out, continuing with basic functionality');
    });
    
    // Always ensure sections are created after a delay
    setTimeout(() => {
        console.log('🔧 Force creating all missing sections...');
        try {
            ensureAllSectionsExist();
        } catch (error) {
            console.error('❌ Error creating sections:', error);
        }
    }, 4000);
    
    // Also create on window load as backup
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🔧 Backup: Force creating sections on window load...');
            try {
                ensureAllSectionsExist();
            } catch (error) {
                console.error('❌ Error in backup creation:', error);
            }
        }, 2000);
    });
});

// Wait for all advanced modules to be loaded (with timeout)
function waitForModules() {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 second timeout
        
        const checkModules = () => {
            attempts++;
            
            // Check if core modules are available
            const coreModulesReady = (
                typeof window.predictiveAnalytics !== 'undefined' ||
                typeof window.survivorJourney !== 'undefined' ||
                typeof window.roleManagement !== 'undefined' ||
                typeof window.budgetOptimization !== 'undefined' ||
                typeof window.geographicIntelligence !== 'undefined' ||
                typeof window.enhancedCaseManagement !== 'undefined'
            );
            
            if (coreModulesReady || attempts >= maxAttempts) {
                console.log(`Modules ready after ${attempts} attempts`);
                resolve();
            } else {
                setTimeout(checkModules, 100);
            }
        };
        checkModules();
    });
}

// Initialize all advanced modules
function initializeAdvancedModules() {
    console.log('🚀 Initializing available advanced modules...');
    
    // Store references to available modules
    window.GBVDashboard.modules = {
        predictiveAnalytics: window.predictiveAnalytics || null,
        survivorJourney: window.survivorJourney || null,
        roleManagement: window.roleManagement || null,
        budgetOptimization: window.budgetOptimization || null,
        geographicIntelligence: window.geographicIntelligence || null,
        enhancedCaseManagement: window.enhancedCaseManagement || null,
        advancedFeatures: window.advancedFeatures || null,
        reportingSystem: window.reportingSystem || null,
        mobileInterface: window.mobileInterface || null
    };
    
    // Count loaded modules
    const loadedCount = Object.values(window.GBVDashboard.modules).filter(m => m !== null).length;
    console.log(`✅ ${loadedCount} advanced modules initialized successfully!`);
    
    // Initialize predictive analytics chart if available
    if (window.GBVDashboard.modules.predictiveAnalytics) {
        setTimeout(() => {
            try {
                window.GBVDashboard.modules.predictiveAnalytics.renderPredictiveChart();
            } catch (e) {
                console.log('Predictive chart will render after data loads');
            }
        }, 2000);
    }
}

// Load all dashboard data
async function loadDashboardData() {
    try {
        console.log('Loading dashboard data...');
        
        // Load statistics
        const statsResponse = await fetch('/api/stats');
        const statsData = await statsResponse.json();
        
        // Load districts
        const districtsResponse = await fetch('/api/districts');
        const districtsData = await districtsResponse.json();
        
        // Load recent cases
        const casesResponse = await fetch('/api/cases?limit=10');
        const casesData = await casesResponse.json();
        
        // Load service providers
        const providersResponse = await fetch('/api/service-providers');
        const providersData = await providersResponse.json();
        
        // Update global state
        window.GBVDashboard.data = {
            stats: statsData.stats || {},
            cases: casesData.cases || [],
            districts: districtsData.districts || [],
            serviceProviders: providersData.serviceProviders || [],
            loading: false
        };
        
        console.log('Data loaded successfully:', window.GBVDashboard.data);
        
        // Update UI
        updateDashboard();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update dashboard UI with loaded data
function updateDashboard() {
    console.log('Updating dashboard UI...');
    
    // Hide loading state and show dashboard
    const loadingState = document.getElementById('loading-state');
    const dashboardContent = document.getElementById('dashboard-content');
    
    console.log('Loading state element:', loadingState);
    console.log('Dashboard content element:', dashboardContent);
    
    if (loadingState) {
        loadingState.classList.add('hidden');
        console.log('Loading state hidden');
    }
    if (dashboardContent) {
        dashboardContent.classList.remove('hidden');
        console.log('Dashboard content shown');
    }
    
    // Update KPI cards
    updateKPICards();
    
    // Update charts
    updateCharts();
    
    // Update recent cases table
    updateRecentCasesTable();
    
    console.log('Dashboard updated successfully');
}

// Update KPI cards with statistics
function updateKPICards() {
    const { stats } = window.GBVDashboard.data;
    
    // Total cases
    const totalCasesElement = document.getElementById('total-cases');
    if (totalCasesElement && stats.totalCases !== undefined) {
        totalCasesElement.textContent = stats.totalCases.toLocaleString();
    }
    
    // Cases by status
    if (stats.casesByStatus && stats.casesByStatus.length > 0) {
        const pendingCases = stats.casesByStatus.find(s => s.case_status === 'reported')?.count || 0;
        const resolvedCases = stats.casesByStatus.find(s => s.case_status === 'closed')?.count || 0;
        
        const pendingElement = document.getElementById('pending-cases');
        const resolvedElement = document.getElementById('resolved-cases');
        
        if (pendingElement) pendingElement.textContent = pendingCases.toLocaleString();
        if (resolvedElement) resolvedElement.textContent = resolvedCases.toLocaleString();
    }
    
    // Service providers count
    const serviceProvidersElement = document.getElementById('service-providers-count');
    if (serviceProvidersElement && stats.serviceProviders) {
        const totalProviders = stats.serviceProviders.reduce((sum, sp) => sum + sp.count, 0);
        serviceProvidersElement.textContent = totalProviders.toLocaleString();
    }
    
    // Survivors supported (simulate data for demo)
    const survivorsElement = document.getElementById('survivors-supported');
    if (survivorsElement) {
        const simulatedSurvivors = 1247; // Demo value
        survivorsElement.textContent = simulatedSurvivors.toLocaleString();
    }
}

// Update charts using Chart.js
function updateCharts() {
    // Load Chart.js if not already loaded
    if (typeof Chart === 'undefined') {
        console.log('Loading Chart.js...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('Chart.js loaded, creating charts...');
            createCharts();
        };
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

// Create charts
function createCharts() {
    const { stats } = window.GBVDashboard.data;
    
    // Cases by District Chart
    if (stats.casesByDistrict && stats.casesByDistrict.length > 0) {
        const districtCtx = document.getElementById('districtChart');
        if (districtCtx) {
            // Destroy existing chart if it exists
            if (window.GBVDashboard.charts.districtChart) {
                window.GBVDashboard.charts.districtChart.destroy();
            }
            
            const districtLabels = stats.casesByDistrict.map(d => d.district_name);
            const districtData = stats.casesByDistrict.map(d => d.case_count);
            
            window.GBVDashboard.charts.districtChart = new Chart(districtCtx, {
                type: 'bar',
                data: {
                    labels: districtLabels,
                    datasets: [{
                        label: 'Cases',
                        data: districtData,
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 45
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Cases by Type Chart
    if (stats.casesByType && stats.casesByType.length > 0) {
        const typeCtx = document.getElementById('typeChart');
        if (typeCtx) {
            // Destroy existing chart if it exists
            if (window.GBVDashboard.charts.typeChart) {
                window.GBVDashboard.charts.typeChart.destroy();
            }
            
            const typeLabels = stats.casesByType.map(t => t.gbv_type);
            const typeData = stats.casesByType.map(t => t.case_count);
            
            // Generate colors for different types
            const colors = [
                '#EF4444', '#F97316', '#EAB308', '#22C55E', 
                '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899',
                '#64748B', '#DC2626', '#EA580C', '#CA8A04'
            ];
            
            window.GBVDashboard.charts.typeChart = new Chart(typeCtx, {
                type: 'doughnut',
                data: {
                    labels: typeLabels,
                    datasets: [{
                        data: typeData,
                        backgroundColor: colors.slice(0, typeData.length),
                        borderWidth: 2,
                        borderColor: '#FFFFFF'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }
}

// Update recent cases table
function updateRecentCasesTable() {
    const { cases } = window.GBVDashboard.data;
    const tableBody = document.getElementById('recent-cases-table');
    
    if (!tableBody || !cases || cases.length === 0) {
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                        No recent cases available
                    </td>
                </tr>
            `;
        }
        return;
    }
    
    tableBody.innerHTML = cases.map(caseItem => {
        const statusColor = getStatusColor(caseItem.case_status);
        const priorityColor = getPriorityColor(caseItem.priority_level);
        
        return `
            <tr class="hover:bg-gray-50 cursor-pointer" data-case-id="${caseItem.id}">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${caseItem.case_number}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${formatDate(caseItem.incident_date)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${caseItem.gbv_type}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${caseItem.district_name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}">
                        ${caseItem.case_status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColor}">
                        ${caseItem.priority_level}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Tab navigation
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active', 'border-blue-600', 'text-blue-600');
                t.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'border-blue-600', 'text-blue-600');
            this.classList.remove('border-transparent', 'text-gray-500');
            
            // Handle tab switching logic
            const tabText = this.textContent.trim();
            console.log('Switching to tab:', tabText);
            
            // Switch to appropriate tab content
            switchToTab(tabText);
            
            // Debug: Log section visibility after switching
            setTimeout(() => debugSectionVisibility(tabText), 100);
        });
    });
    
    // Case row clicks
    document.addEventListener('click', function(e) {
        const caseRow = e.target.closest('[data-case-id]');
        if (caseRow) {
            const caseId = caseRow.getAttribute('data-case-id');
            console.log('Case clicked:', caseId);
            // Handle case details view here
        }
    });
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function getStatusColor(status) {
    const colors = {
        'reported': 'bg-yellow-100 text-yellow-800',
        'under_investigation': 'bg-blue-100 text-blue-800',
        'services_provided': 'bg-green-100 text-green-800',
        'closed': 'bg-gray-100 text-gray-800',
        'referred': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getPriorityColor(priority) {
    const colors = {
        'low': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'high': 'bg-red-100 text-red-800',
        'critical': 'bg-red-200 text-red-900'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

function showError(message) {
    console.error(message);
    
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Advanced tab switching functionality
function switchToTab(tabText) {
    // Hide all sections first
    hideAllSections();
    
    // Determine which section to show based on tab text
    if (tabText.includes('Executive Dashboard') || tabText.includes('Dashboard')) {
        showDashboardSection();
        window.GBVDashboard.activeTab = 'dashboard';
    } else if (tabText.includes('Geographic Intelligence') || tabText.includes('Geographic')) {
        showGeographicSection();
        window.GBVDashboard.activeTab = 'geographic';
    } else if (tabText.includes('Case Management')) {
        showCaseManagementSection();
        window.GBVDashboard.activeTab = 'cases';
    } else if (tabText.includes('Survivor Journey')) {
        showSurvivorJourneySection();
        window.GBVDashboard.activeTab = 'journey';
    } else if (tabText.includes('Service Network')) {
        showSection('service-network-section');
        window.GBVDashboard.activeTab = 'services';
    } else if (tabText.includes('Analytics & Reports')) {
        showSection('analytics-reports-section');
        window.GBVDashboard.activeTab = 'analytics';
    } else if (tabText.includes('Mobile Interface')) {
        showSection('mobile-interface-section');
        window.GBVDashboard.activeTab = 'mobile';
    } else if (tabText.includes('Voice/IVR')) {
        showSection('voice-ivr-section');
        window.GBVDashboard.activeTab = 'voice';
    } else if (tabText.includes('Role Management')) {
        showRoleManagementSection();
        window.GBVDashboard.activeTab = 'roles';
    } else if (tabText.includes('Budget & Resources')) {
        showBudgetResourcesSection();
        window.GBVDashboard.activeTab = 'budget';
    }
    
    console.log(`Switched to ${window.GBVDashboard.activeTab} tab`);
}

// Hide all tab sections
function hideAllSections() {
    const sections = [
        'dashboard-content',
        'geographic-section', 
        'case-management-section',
        'survivor-journey-section',
        'service-network-section',
        'analytics-reports-section',
        'mobile-interface-section',
        'voice-ivr-section',
        'role-management-section',
        'budget-section'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('hidden');
        }
    });
}

// Show specific sections
function showDashboardSection() {
    const section = document.getElementById('dashboard-content');
    if (section) {
        section.classList.remove('hidden');
        // Refresh predictive analytics chart
        if (window.GBVDashboard.modules.predictiveAnalytics) {
            window.GBVDashboard.modules.predictiveAnalytics.renderPredictiveChart();
        }
    }
}

function showGeographicSection() {
    console.log('🗺️ Attempting to show Geographic Intelligence section...');
    
    // First try to find existing section
    let section = document.getElementById('geographic-section');
    
    // If it doesn't exist, create it immediately
    if (!section) {
        console.log('⚠️ Geographic section not found, creating now...');
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent) {
            createGeographicSection(dashboardContent);
            section = document.getElementById('geographic-section');
        } else {
            console.error('❌ Dashboard content container not found!');
            return;
        }
    }
    
    // Show the section
    if (section) {
        section.classList.remove('hidden');
        console.log('✅ Geographic Intelligence section shown with', section.innerHTML.length, 'characters of content');
    } else {
        console.error('❌ Geographic section still not found after creation attempt');
    }
}

function showCaseManagementSection() {
    console.log('📋 Attempting to show Case Management section...');
    
    // First try to find existing section
    let section = document.getElementById('case-management-section');
    
    // If it doesn't exist, create it immediately
    if (!section) {
        console.log('⚠️ Case Management section not found, creating now...');
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent) {
            createCaseManagementSection(dashboardContent);
            section = document.getElementById('case-management-section');
        } else {
            console.error('❌ Dashboard content container not found!');
            return;
        }
    }
    
    // Show the section
    if (section) {
        section.classList.remove('hidden');
        console.log('✅ Case Management section shown with', section.innerHTML.length, 'characters of content');
    } else {
        console.error('❌ Case Management section still not found after creation attempt');
    }
}

function showSurvivorJourneySection() {
    console.log('🛤️ Attempting to show Survivor Journey section...');
    
    // First try to find existing section
    let section = document.getElementById('survivor-journey-section');
    
    // If it doesn't exist, create it immediately
    if (!section) {
        console.log('⚠️ Survivor Journey section not found, creating now...');
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent) {
            createSurvivorJourneySection(dashboardContent);
            section = document.getElementById('survivor-journey-section');
        } else {
            console.error('❌ Dashboard content container not found!');
            return;
        }
    }
    
    // Show the section
    if (section) {
        section.classList.remove('hidden');
        console.log('✅ Survivor Journey section shown with', section.innerHTML.length, 'characters of content');
    } else {
        console.error('❌ Survivor Journey section still not found after creation attempt');
    }
}

function showRoleManagementSection() {
    console.log('👥 Attempting to show Role Management section...');
    
    // First try to find existing section
    let section = document.getElementById('role-management-section');
    
    // If it doesn't exist, create it immediately
    if (!section) {
        console.log('⚠️ Role Management section not found, creating now...');
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent) {
            createRoleManagementSection(dashboardContent);
            section = document.getElementById('role-management-section');
        } else {
            console.error('❌ Dashboard content container not found!');
            return;
        }
    }
    
    // Show the section
    if (section) {
        section.classList.remove('hidden');
        console.log('✅ Role Management section shown with', section.innerHTML.length, 'characters of content');
    } else {
        console.error('❌ Role Management section still not found after creation attempt');
    }
}

function showBudgetResourcesSection() {
    const section = document.getElementById('budget-section');
    if (section) {
        section.classList.remove('hidden');
        // Refresh budget data
        if (window.GBVDashboard.modules.budgetOptimization) {
            window.GBVDashboard.modules.budgetOptimization.populateBudgetData();
        }
    }
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        console.log(`✅ Showed section: ${sectionId}`, section.innerHTML.length > 0 ? 'with content' : 'EMPTY!');
    } else {
        console.error(`❌ Section not found: ${sectionId}`);
    }
}

// Debug function to check section visibility
function debugSectionVisibility(tabText) {
    console.log(`🔍 Debug: Checking visibility for tab "${tabText}"`);
    
    const allSections = [
        'dashboard-content',
        'geographic-section',
        'case-management-section', 
        'survivor-journey-section',
        'role-management-section'
    ];
    
    allSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const isVisible = !section.classList.contains('hidden');
            const hasContent = section.innerHTML.length > 100;
            console.log(`📋 ${sectionId}: ${isVisible ? '👁️ VISIBLE' : '🙈 HIDDEN'} | ${hasContent ? '📄 HAS CONTENT' : '❌ EMPTY'}`);
        } else {
            console.log(`📋 ${sectionId}: ❌ NOT FOUND`);
        }
    });
}

// Force create all required sections with content
function ensureAllSectionsExist() {
    console.log('🔧 Force creating all required sections...');
    
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error('❌ Dashboard content container not found!');
        // Try again after a short delay
        setTimeout(() => {
            console.log('🔄 Retrying section creation...');
            const retry = document.getElementById('dashboard-content');
            if (retry) {
                console.log('✅ Dashboard content found on retry');
                createAllSections(retry);
            } else {
                console.error('❌ Dashboard content still not found after retry');
            }
        }, 1000);
        return;
    }
    
    createAllSections(dashboardContent);
}

function createAllSections(container) {
    console.log('📝 Creating sections in container...');
    
    try {
        // Create Geographic Intelligence section
        createGeographicSection(container);
        console.log('✅ Geographic section created/verified');
    } catch (e) {
        console.error('❌ Error creating geographic section:', e);
    }
    
    try {
        // Create Case Management section  
        createCaseManagementSection(container);
        console.log('✅ Case Management section created/verified');
    } catch (e) {
        console.error('❌ Error creating case management section:', e);
    }
    
    try {
        // Create Survivor Journey section
        createSurvivorJourneySection(container);
        console.log('✅ Survivor Journey section created/verified');
    } catch (e) {
        console.error('❌ Error creating survivor journey section:', e);
    }
    
    try {
        // Create Role Management section
        createRoleManagementSection(container);
        console.log('✅ Role Management section created/verified');
    } catch (e) {
        console.error('❌ Error creating role management section:', e);
    }
    
    console.log('✅ All sections force-created successfully!');
}

// Create individual sections with full content
function createGeographicSection(container) {
    let section = document.getElementById('geographic-section');
    if (!section) {
        section = document.createElement('div');
        section.id = 'geographic-section';
        section.className = 'hidden';
        container.appendChild(section);
    }
    
    if (section.innerHTML.length < 100) {
        console.log('🗺️ Creating Geographic Intelligence content...');
        section.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Geographic Intelligence & Hotspot Analysis</h2>
                    <p>Real-time mapping and spatial analysis of GBV incidents across Sierra Leone</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-map-marked-alt mr-2"></i>
                            <span class="text-sm">16 Districts Monitored</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <span class="text-sm">4 Critical Risk Areas</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-satellite mr-2"></i>
                            <span class="text-sm">Real-time GPS Tracking</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-chart-area mr-2"></i>
                            <span class="text-sm">Predictive Hotspot Modeling</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Interactive Map -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                <div class="xl:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Interactive District Risk Map</h3>
                    <div class="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                            <div class="text-center">
                                <i class="fas fa-map text-6xl text-blue-500 mb-4"></i>
                                <h4 class="text-xl font-bold text-gray-800 mb-2">Sierra Leone Risk Heat Map</h4>
                                <p class="text-gray-600 mb-6">Interactive geographic visualization of GBV incidents and risk levels</p>
                                
                                <div class="grid grid-cols-4 gap-2 max-w-md mx-auto">
                                    <div class="bg-red-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Bonthe</div>
                                        <div class="text-xs">78 cases</div>
                                    </div>
                                    <div class="bg-red-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Falaba</div>
                                        <div class="text-xs">45 cases</div>
                                    </div>
                                    <div class="bg-orange-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Western</div>
                                        <div class="text-xs">156 cases</div>
                                    </div>
                                    <div class="bg-orange-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Bo</div>
                                        <div class="text-xs">134 cases</div>
                                    </div>
                                    <div class="bg-orange-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Kenema</div>
                                        <div class="text-xs">145 cases</div>
                                    </div>
                                    <div class="bg-orange-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Kailahun</div>
                                        <div class="text-xs">112 cases</div>
                                    </div>
                                    <div class="bg-yellow-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Bombali</div>
                                        <div class="text-xs">98 cases</div>
                                    </div>
                                    <div class="bg-yellow-500 text-white p-2 rounded cursor-pointer hover:scale-105 transform transition-transform">
                                        <div class="text-xs font-medium">Portloko</div>
                                        <div class="text-xs">102 cases</div>
                                    </div>
                                </div>
                                
                                <div class="mt-4 flex justify-center space-x-4 text-sm">
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                                        <span>Critical Risk</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                                        <span>High Risk</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                                        <span>Medium Risk</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                        <span>Low Risk</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Risk Analysis Summary</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-red-50 rounded-lg">
                            <h4 class="font-medium text-red-900">Critical Risk Districts (2)</h4>
                            <p class="text-sm text-red-700 mt-1">Bonthe, Falaba - Immediate intervention required</p>
                        </div>
                        <div class="p-4 bg-orange-50 rounded-lg">
                            <h4 class="font-medium text-orange-900">High Risk Districts (6)</h4>
                            <p class="text-sm text-orange-700 mt-1">Enhanced monitoring and resources needed</p>
                        </div>
                        <div class="p-4 bg-yellow-50 rounded-lg">
                            <h4 class="font-medium text-yellow-900">Medium Risk Districts (8)</h4>
                            <p class="text-sm text-yellow-700 mt-1">Standard monitoring protocols</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log('✅ Geographic Intelligence content created');
    }
}

function createCaseManagementSection(container) {
    let section = document.getElementById('case-management-section');
    if (!section) {
        section = document.createElement('div');
        section.id = 'case-management-section';
        section.className = 'hidden';
        container.appendChild(section);
    }
    
    if (section.innerHTML.length < 100) {
        console.log('📋 Creating Case Management content...');
        section.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Comprehensive Case Management System</h2>
                    <p>Complete case lifecycle management with privacy-first design and multi-channel support</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="text-sm">Privacy Protected</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-route mr-2"></i>
                            <span class="text-sm">Full Journey Tracking</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-users mr-2"></i>
                            <span class="text-sm">Multi-Agency Coordination</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            <span class="text-sm">Real-time Updates</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Case Statistics Overview -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-folder-open text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">247</h3>
                            <p class="text-sm text-gray-600">Total Cases</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-clock text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">89</h3>
                            <p class="text-sm text-gray-600">Active Cases</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">145</h3>
                            <p class="text-sm text-gray-600">Resolved</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">13</h3>
                            <p class="text-sm text-gray-600">Critical</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-users text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">34</h3>
                            <p class="text-sm text-gray-600">Case Workers</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Case Management Interface -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">Active Cases</h3>
                        <div class="flex space-x-2">
                            <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">Add New Case</button>
                            <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Export</button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case #</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Update</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GBV-SL-2024-001</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Domestic Violence</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Western Area Urban</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Under Investigation</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GBV-SL-2024-002</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sexual Violence</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bo</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Services Provided</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Kanu</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 hours ago</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GBV-SL-2024-003</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Child Abuse</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kenema</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Critical</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fatima Sesay</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 hour ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        console.log('✅ Case Management content created');
    }
}

function createSurvivorJourneySection(container) {
    let section = document.getElementById('survivor-journey-section');
    if (!section) {
        section = document.createElement('div');
        section.id = 'survivor-journey-section';
        section.className = 'hidden';
        container.appendChild(section);
    }
    
    if (section.innerHTML.length < 100) {
        console.log('🛤️ Creating Survivor Journey content...');
        section.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Survivor Journey Tracking System</h2>
                    <p>Comprehensive 9-stage journey mapping from initial contact to empowerment</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-route mr-2"></i>
                            <span class="text-sm">9 Journey Stages</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-heart mr-2"></i>
                            <span class="text-sm">Trauma-Informed Care</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-users mr-2"></i>
                            <span class="text-sm">Multi-Agency Support</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-chart-line mr-2"></i>
                            <span class="text-sm">Outcome Measurement</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Journey Stages Overview -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-6">9-Stage Survivor Journey</h3>
                    <div class="space-y-4">
                        <div class="flex items-center p-4 bg-blue-50 rounded-lg">
                            <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-blue-900">Initial Contact & Safety Assessment</h4>
                                <p class="text-sm text-blue-700 mt-1">First point of contact, immediate safety evaluation</p>
                            </div>
                            <span class="text-sm text-blue-600 font-medium">24-48 hours</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-purple-50 rounded-lg">
                            <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-purple-900">Crisis Intervention & Stabilization</h4>
                                <p class="text-sm text-purple-700 mt-1">Immediate medical care, safe housing, emotional support</p>
                            </div>
                            <span class="text-sm text-purple-600 font-medium">1-3 days</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-green-50 rounded-lg">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-green-900">Comprehensive Assessment</h4>
                                <p class="text-sm text-green-700 mt-1">Full needs assessment, risk evaluation, service planning</p>
                            </div>
                            <span class="text-sm text-green-600 font-medium">3-5 days</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-yellow-50 rounded-lg">
                            <div class="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-yellow-900">Service Coordination & Referrals</h4>
                                <p class="text-sm text-yellow-700 mt-1">Multi-agency coordination, specialized services</p>
                            </div>
                            <span class="text-sm text-yellow-600 font-medium">1-2 weeks</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-red-50 rounded-lg">
                            <div class="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-red-900">Legal & Justice Support</h4>
                                <p class="text-sm text-red-700 mt-1">Legal aid, court support, justice proceedings</p>
                            </div>
                            <span class="text-sm text-red-600 font-medium">2-8 weeks</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Journey Statistics</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="text-2xl font-bold text-gray-900">156</div>
                            <div class="text-sm text-gray-600">Active Journeys</div>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <div class="text-2xl font-bold text-green-900">89</div>
                            <div class="text-sm text-green-600">Completed Successfully</div>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <div class="text-2xl font-bold text-blue-900">87.3%</div>
                            <div class="text-sm text-blue-600">Success Rate</div>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <div class="text-2xl font-bold text-purple-900">23</div>
                            <div class="text-sm text-purple-600">Days Average</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log('✅ Survivor Journey content created');
    }
}

function createRoleManagementSection(container) {
    let section = document.getElementById('role-management-section');
    if (!section) {
        section = document.createElement('div');
        section.id = 'role-management-section';
        section.className = 'hidden';
        container.appendChild(section);
    }
    
    if (section.innerHTML.length < 100) {
        console.log('👥 Creating Role Management content...');
        section.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Advanced Role Management System</h2>
                    <p>7-tier hierarchical role system with granular permissions and security audit</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-users-cog mr-2"></i>
                            <span class="text-sm">7 Role Levels</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="text-sm">Security Audit</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-key mr-2"></i>
                            <span class="text-sm">Granular Permissions</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-chart-line mr-2"></i>
                            <span class="text-sm">Performance Tracking</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Role Hierarchy Overview -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                <div class="xl:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-6">Role Hierarchy Structure</h3>
                    <div class="space-y-3">
                        <div class="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-red-900">System Administrator</h4>
                                <p class="text-sm text-red-700">Full system access, user management, security settings</p>
                            </div>
                            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">2 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div class="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-orange-900">Ministry Director</h4>
                                <p class="text-sm text-orange-700">Strategic oversight, policy decisions, resource allocation</p>
                            </div>
                            <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">3 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div class="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-yellow-900">Regional Coordinator</h4>
                                <p class="text-sm text-yellow-700">Regional oversight, district coordination, resource management</p>
                            </div>
                            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">8 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-green-900">Case Supervisor</h4>
                                <p class="text-sm text-green-700">Case oversight, quality assurance, staff supervision</p>
                            </div>
                            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">15 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-blue-900">Senior Case Worker</h4>
                                <p class="text-sm text-blue-700">Direct case management, client services, mentoring</p>
                            </div>
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">34 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-purple-900">Case Worker</h4>
                                <p class="text-sm text-purple-700">Case management, service delivery, documentation</p>
                            </div>
                            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">67 users</span>
                        </div>
                        
                        <div class="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div class="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</div>
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900">Support Staff</h4>
                                <p class="text-sm text-gray-700">Administrative support, data entry, basic assistance</p>
                            </div>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">23 users</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Role Statistics</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="text-2xl font-bold text-gray-900">152</div>
                            <div class="text-sm text-gray-600">Total Active Users</div>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <div class="text-2xl font-bold text-green-900">98.7%</div>
                            <div class="text-sm text-green-600">System Compliance</div>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <div class="text-2xl font-bold text-blue-900">45</div>
                            <div class="text-sm text-blue-600">Permission Groups</div>
                        </div>
                        <div class="p-4 bg-yellow-50 rounded-lg">
                            <div class="text-2xl font-bold text-yellow-900">24h</div>
                            <div class="text-sm text-yellow-600">Avg Login Time</div>
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t">
                        <h4 class="font-medium text-gray-900 mb-3">Recent Activity</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">New user registrations</span>
                                <span class="font-medium text-gray-900">12</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Role modifications</span>
                                <span class="font-medium text-gray-900">8</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Security events</span>
                                <span class="font-medium text-gray-900">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log('✅ Role Management content created');
    }
}

// Enhanced notification system for ministry demo
function showMinistryNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    const bgColor = {
        'success': 'bg-green-500',
        'warning': 'bg-yellow-500', 
        'error': 'bg-red-500',
        'info': 'bg-blue-500'
    }[type] || 'bg-blue-500';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm`;
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'} text-xl"></i>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
                <p class="text-xs opacity-90 mt-1">Ministry GBV Dashboard System</p>
            </div>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
}

// Make functions globally available for debugging and ministry demonstration
window.GBVDashboard.loadData = loadDashboardData;
window.GBVDashboard.updateUI = updateDashboard;
window.GBVDashboard.switchTab = switchToTab;
window.GBVDashboard.notify = showMinistryNotification;

console.log('🎯 Enhanced GBV Dashboard - Ministry Demo Version - Fully Loaded!');
console.log('🔥 All advanced features initialized for comprehensive demonstration');

// Show welcome notification for Ministry demonstration
setTimeout(() => {
    showMinistryNotification(
        'Welcome to the Enhanced GBV Dashboard - Complete Ministry Demonstration System',
        'success',
        8000
    );
}, 2000);