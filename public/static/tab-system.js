/**
 * Tab System for Sierra Leone GBV Dashboard
 * Handles navigation between different dashboard sections
 */

// Tab configuration
const TAB_SECTIONS = {
    'overview': 'dashboard-content',
    'report-case': 'report-case-section',
    'view-cases': 'view-cases-section',
    'district-map': 'district-map-section',
    'analytics': 'analytics-section',
    'rainbo-portal': 'rainbo-portal-section',
    'police-fsu': 'police-fsu-section',
    'resources': 'resources-section',
    'voice-report': 'voice-report-section',
    'admin': 'admin-section'
};

// Initialize tab system
function initializeTabSystem() {
    console.log('🎯 Initializing tab system...');
    
    // Create all tab sections
    createTabSections();
    
    // Setup tab click handlers
    setupTabClickHandlers();
    
    // Show overview by default
    showTab('overview');
}

// Create all tab section containers
function createTabSections() {
    const mainContent = document.querySelector('main');
    if (!mainContent) {
        console.error('Main content area not found');
        return;
    }
    
    // Create container for all sections if it doesn't exist
    let sectionsContainer = document.getElementById('tab-sections-container');
    if (!sectionsContainer) {
        sectionsContainer = document.createElement('div');
        sectionsContainer.id = 'tab-sections-container';
        sectionsContainer.className = 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8';
        mainContent.appendChild(sectionsContainer);
    }
    
    // Create each section
    Object.entries(TAB_SECTIONS).forEach(([tabKey, sectionId]) => {
        if (!document.getElementById(sectionId)) {
            const section = document.createElement('div');
            section.id = sectionId;
            section.className = 'hidden';
            sectionsContainer.appendChild(section);
        }
    });
}

// Setup click handlers for all tabs
function setupTabClickHandlers() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            const tabText = this.textContent.trim().toLowerCase();
            let tabKey = 'overview';
            
            // Map tab text to tab key
            if (tabText.includes('overview')) tabKey = 'overview';
            else if (tabText.includes('report case')) tabKey = 'report-case';
            else if (tabText.includes('view cases')) tabKey = 'view-cases';
            else if (tabText.includes('district map')) tabKey = 'district-map';
            else if (tabText.includes('analytics')) tabKey = 'analytics';
            else if (tabText.includes('rainbo')) tabKey = 'rainbo-portal';
            else if (tabText.includes('police')) tabKey = 'police-fsu';
            else if (tabText.includes('resources')) tabKey = 'resources';
            else if (tabText.includes('voice')) tabKey = 'voice-report';
            else if (tabText.includes('admin')) tabKey = 'admin';
            
            showTab(tabKey);
        });
    });
}

// Show specific tab and hide others
function showTab(tabKey) {
    console.log(`🔄 Switching to tab: ${tabKey}`);
    
    // Hide all sections
    Object.values(TAB_SECTIONS).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('hidden');
        }
    });
    
    // Show requested section
    const targetSectionId = TAB_SECTIONS[tabKey];
    const targetSection = document.getElementById(targetSectionId);
    
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Load content for the tab if needed
        loadTabContent(tabKey, targetSection);
        
        // Update tab button states
        updateTabButtonStates(tabKey);
        
        // Re-initialize charts when returning to overview
        if (tabKey === 'overview' && typeof updateCharts === 'function') {
            console.log('🔄 Re-initializing charts for Overview tab');
            setTimeout(() => {
                updateCharts();
            }, 300); // Small delay to ensure canvas is visible
        }
    } else {
        console.error(`Section not found: ${targetSectionId}`);
    }
}

// Update tab button visual states
function updateTabButtonStates(activeTabKey) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const tabMap = {
        'overview': 0,
        'report-case': 1,
        'view-cases': 2,
        'district-map': 3,
        'analytics': 4,
        'rainbo-portal': 5,
        'police-fsu': 6,
        'resources': 7,
        'voice-report': 8,
        'admin': 9
    };
    
    tabs.forEach((tab, index) => {
        if (index === tabMap[activeTabKey]) {
            // Active state
            tab.classList.add('bg-white');
            tab.classList.remove('text-white');
            tab.style.color = '#1e3a8a';
            tab.style.backgroundColor = 'white';
        } else {
            // Inactive state
            tab.classList.remove('bg-white');
            tab.classList.add('text-white');
            tab.style.color = 'white';
            tab.style.backgroundColor = 'transparent';
        }
    });
}

// Load content for specific tab
function loadTabContent(tabKey, section) {
    // Check if content already loaded (except view-cases which needs refresh)
    if (section.hasAttribute('data-loaded') && tabKey !== 'view-cases') {
        return;
    }
    
    console.log(`📦 Loading content for: ${tabKey}`);
    
    switch(tabKey) {
        case 'report-case':
            loadReportCaseForm(section);
            break;
        case 'view-cases':
            loadViewCases(section);
            break;
        case 'district-map':
            loadDistrictMap(section);
            break;
        case 'analytics':
            loadAnalyticsDashboard(section);
            break;
        case 'rainbo-portal':
            loadRainboPortal(section);
            break;
        case 'police-fsu':
            loadPoliceFSU(section);
            break;
        case 'resources':
            loadResources(section);
            break;
        case 'voice-report':
            loadVoiceReport(section);
            break;
        case 'admin':
            loadAdminPanel(section);
            break;
    }
    
    // Mark as loaded
    section.setAttribute('data-loaded', 'true');
}

// Load View Cases section
function loadViewCases(section) {
    console.log('Loading View Cases section...');
    
    section.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                        <i class="fas fa-list mr-2"></i>All Reported Cases
                    </h2>
                    <p class="text-sm text-gray-600 mt-1">View all submitted GBV cases</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <input type="text" id="case-search" placeholder="Search by case number..."
                               class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button onclick="loadAllCases()" class="px-4 py-2 rounded-lg text-white font-semibold" 
                            style="background-color: #32cd32;">
                        <i class="fas fa-sync mr-2"></i>Refresh
                    </button>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <select id="filter-district" onchange="filterCases()" 
                        class="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Districts</option>
                </select>
                <select id="filter-status" onchange="filterCases()" 
                        class="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Statuses</option>
                    <option value="reported">Reported</option>
                    <option value="under_investigation">Under Investigation</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                </select>
                <select id="filter-priority" onchange="filterCases()" 
                        class="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onclick="clearFilters()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i class="fas fa-times mr-2"></i>Clear Filters
                </button>
            </div>
            
            <!-- Cases Table -->
            <div id="view-cases-container">
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                    <p class="text-gray-500 mt-2">Loading cases...</p>
                </div>
            </div>
        </div>
    `;
    
    // Load all cases
    loadAllCases();
}

// Load all cases from API
async function loadAllCases() {
    const container = document.getElementById('view-cases-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center py-8">
            <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
            <p class="text-gray-500 mt-2">Loading cases...</p>
        </div>
    `;
    
    try {
        const response = await fetch('/api/cases?limit=100');
        const data = await response.json();
        
        if (data.cases && data.cases.length > 0) {
            displayAllCases(data.cases);
            
            // Populate district filter
            populateDistrictFilter();
        } else {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3"></i>
                    <p>No cases found</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading cases:', error);
        container.innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load cases. Please try again.</p>
            </div>
        `;
    }
}

// Display all cases in table
function displayAllCases(cases) {
    const container = document.getElementById('view-cases-container');
    if (!container) return;
    
    // Store cases for filtering
    window.allCasesData = cases;
    
    const tableHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incident Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" id="cases-tbody">
                    ${cases.map(c => createCaseRow(c)).join('')}
                </tbody>
            </table>
        </div>
        <div class="mt-4 text-sm text-gray-600">
            Showing ${cases.length} case(s)
        </div>
    `;
    
    container.innerHTML = tableHTML;
}

// Create a case row
function createCaseRow(c) {
    return `
        <tr class="hover:bg-gray-50" data-case-id="${c.id}">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium" style="color: #1e3a8a;">${c.case_number}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${c.incident_date}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${parseViolenceTypesDisplay(c.violence_types)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${c.district_name || 'Unknown'}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColorClass(c.priority_level)}">
                    ${c.priority_level || 'Medium'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(c.case_status)}">
                    ${c.case_status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(c.reported_date)}
            </td>
        </tr>
    `;
}

// Parse violence types for display
function parseViolenceTypesDisplay(types) {
    // If it's already a string (from JOIN with gbv_types table), return as-is
    if (typeof types === 'string' && !types.startsWith('[')) {
        return types;
    }
    
    // Otherwise try to parse as JSON array
    try {
        const parsed = JSON.parse(types);
        if (Array.isArray(parsed)) {
            return parsed.join(', ');
        }
        return types;
    } catch (e) {
        return types || 'Unknown';
    }
}

// Get priority color class
function getPriorityColorClass(priority) {
    const colors = {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Get status color class
function getStatusColorClass(status) {
    const colors = {
        'reported': 'bg-blue-100 text-blue-800',
        'under_investigation': 'bg-yellow-100 text-yellow-800',
        'resolved': 'bg-green-100 text-green-800',
        'pending': 'bg-orange-100 text-orange-800',
        'critical': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Populate district filter
async function populateDistrictFilter() {
    try {
        const response = await fetch('/api/districts');
        const data = await response.json();
        
        const filterDistrict = document.getElementById('filter-district');
        if (filterDistrict && data.districts) {
            data.districts.forEach(d => {
                const option = document.createElement('option');
                option.value = d.id;
                option.textContent = d.name;
                filterDistrict.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading districts:', error);
    }
}

// Filter cases
function filterCases() {
    const districtFilter = document.getElementById('filter-district').value;
    const statusFilter = document.getElementById('filter-status').value;
    const priorityFilter = document.getElementById('filter-priority').value;
    const searchInput = document.getElementById('case-search').value.toLowerCase();
    
    if (!window.allCasesData) return;
    
    let filteredCases = window.allCasesData.filter(c => {
        // District filter
        if (districtFilter !== 'all' && c.district_id != districtFilter) {
            return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && c.case_status !== statusFilter) {
            return false;
        }
        
        // Priority filter
        if (priorityFilter !== 'all' && c.priority_level !== priorityFilter) {
            return false;
        }
        
        // Search filter
        if (searchInput && !c.case_number.toLowerCase().includes(searchInput)) {
            return false;
        }
        
        return true;
    });
    
    // Update table
    const tbody = document.getElementById('cases-tbody');
    if (tbody) {
        tbody.innerHTML = filteredCases.map(c => createCaseRow(c)).join('');
    }
    
    // Update count
    const container = document.getElementById('view-cases-container');
    const countDiv = container.querySelector('.mt-4');
    if (countDiv) {
        countDiv.textContent = `Showing ${filteredCases.length} case(s)`;
    }
}

// Clear filters
function clearFilters() {
    document.getElementById('filter-district').value = 'all';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('filter-priority').value = 'all';
    document.getElementById('case-search').value = '';
    filterCases();
}

// Add search listener
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('case-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterCases);
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabSystem);
} else {
    initializeTabSystem();
}
