/**
 * Tab System for Sierra Leone GBV Dashboard
 * Handles navigation between different dashboard sections
 */

// Tab configuration
const TAB_SECTIONS = {
    'overview': 'dashboard-content',
    'report-case': 'report-case-section',
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
        'district-map': 2,
        'analytics': 3,
        'rainbo-portal': 4,
        'police-fsu': 5,
        'resources': 6,
        'voice-report': 7,
        'admin': 8
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
    // Check if content already loaded
    if (section.hasAttribute('data-loaded')) {
        return;
    }
    
    console.log(`📦 Loading content for: ${tabKey}`);
    
    switch(tabKey) {
        case 'report-case':
            loadReportCaseForm(section);
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabSystem);
} else {
    initializeTabSystem();
}
