/**
 * Unified Tab Navigation System
 * Handles all dashboard tabs with proper content loading
 */

// Wait for DOM and all other scripts to load
window.addEventListener('load', function() {
    console.log('🎯 Initializing unified tab navigation system...');
    
    setTimeout(() => {
        setupUnifiedTabNavigation();
    }, 500);
});

function setupUnifiedTabNavigation() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    console.log(`📊 Found ${tabs.length} dashboard tabs`);
    
    tabs.forEach((tab, index) => {
        // Remove any existing click listeners
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        // Add new click listener
        newTab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tabText = this.textContent.trim().split('\n')[0].trim();
            console.log(`🖱️ Tab clicked: "${tabText}"`);
            
            // Update active tab styling
            tabs.forEach(t => {
                t.classList.remove('bg-white');
                t.style.color = 'white';
            });
            this.classList.add('bg-white');
            this.style.color = '#1e3a8a';
            
            // Route to appropriate content
            handleTabNavigation(tabText);
        });
    });
    
    console.log('✅ Unified tab navigation initialized');
}

function handleTabNavigation(tabName) {
    // Hide all sections first
    hideAllDashboardSections();
    
    // Get main content area
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error('❌ Dashboard content area not found');
        return;
    }
    
    // Show loading state
    dashboardContent.style.display = 'block';
    dashboardContent.innerHTML = `
        <div class="text-center py-12">
            <div class="inline-flex items-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span class="text-lg text-gray-600">Loading ${tabName}...</span>
            </div>
        </div>
    `;
    
    // Route based on tab name
    setTimeout(() => {
        switch(tabName) {
            case 'Overview':
                loadOverview(dashboardContent);
                break;
                
            case 'Report Case':
                loadReportCase(dashboardContent);
                break;
                
            case 'View Cases':
                loadViewCases(dashboardContent);
                break;
                
            case 'District Map':
                loadDistrictMap(dashboardContent);
                break;
                
            case 'Analytics':
                loadAnalytics(dashboardContent);
                break;
                
            case 'Spotlight Initiative':
                loadSpotlightInitiative(dashboardContent);
                break;
                
            case 'Survivor Portal':
                loadSurvivorPortal(dashboardContent);
                break;
                
            case 'Rainbo Portal':
                loadRainboPortal(dashboardContent);
                break;
                
            case 'Police FSU':
                loadPoliceFSU(dashboardContent);
                break;
                
            case 'Resources':
                loadResources(dashboardContent);
                break;
                
            case 'Voice Report':
                loadVoiceReport(dashboardContent);
                break;
                
            case 'Admin':
                loadAdmin(dashboardContent);
                break;
                
            default:
                console.warn(`⚠️ No handler for tab: ${tabName}`);
                dashboardContent.innerHTML = `
                    <div class="text-center py-12">
                        <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
                        <p class="text-lg text-gray-600">This feature is being updated.</p>
                        <p class="text-sm text-gray-500 mt-2">Please check back soon or contact support.</p>
                    </div>
                `;
        }
    }, 100);
}

function hideAllDashboardSections() {
    const sections = [
        'dashboard-content',
        'report-case-section',
        'view-cases-section',
        'district-map-section',
        'analytics-section',
        'spotlight-initiative-section',
        'survivor-portal-section',
        'rainbo-portal-section',
        'police-fsu-section',
        'resources-section',
        'voice-report-section',
        'admin-section',
        'analytics-new-section'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
}

// Tab content loaders
function loadOverview(container) {
    console.log('📊 Loading Overview...');
    container.style.display = 'block';
    
    // Check if there's existing overview content
    if (window.loadDashboardStats && typeof window.loadDashboardStats === 'function') {
        window.loadDashboardStats();
    } else {
        // Reload page to get fresh overview data
        window.location.reload();
    }
}

function loadReportCase(container) {
    console.log('📝 Loading Report Case...');
    const section = document.getElementById('report-case-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-file-alt mr-2"></i>Report New Case
                </h2>
                <p class="text-gray-600">Loading case report form...</p>
            </div>
        `;
    }
}

function loadViewCases(container) {
    console.log('📋 Loading View Cases...');
    const section = document.getElementById('view-cases-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        if (window.loadCases && typeof window.loadCases === 'function') {
            window.loadCases();
        }
    }
}

function loadDistrictMap(container) {
    console.log('🗺️ Loading District Map...');
    const section = document.getElementById('district-map-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
    }
}

function loadAnalytics(container) {
    console.log('📈 Loading Analytics...');
    const section = document.getElementById('analytics-new-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        
        // Load enhanced analytics if available
        if (window.loadEnhancedAnalyticsDashboard && typeof window.loadEnhancedAnalyticsDashboard === 'function') {
            window.loadEnhancedAnalyticsDashboard(section);
        }
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-chart-bar mr-2"></i>Analytics Dashboard
                </h2>
                <p class="text-gray-600">Loading analytics...</p>
            </div>
        `;
    }
}

function loadSpotlightInitiative(container) {
    console.log('🌍 Loading Spotlight Initiative...');
    const section = document.getElementById('spotlight-initiative-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        
        // Load spotlight initiative if available
        if (window.loadSpotlightInitiative && typeof window.loadSpotlightInitiative === 'function') {
            window.loadSpotlightInitiative(section);
        }
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-sun mr-2"></i>Spotlight Initiative
                </h2>
                <p class="text-gray-600">Loading Spotlight Initiative hub...</p>
            </div>
        `;
    }
}

function loadSurvivorPortal(container) {
    console.log('❤️ Loading Survivor Portal...');
    const section = document.getElementById('survivor-portal-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        
        // Load survivor portal if available
        if (window.loadSurvivorPortal && typeof window.loadSurvivorPortal === 'function') {
            window.loadSurvivorPortal(section);
        }
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-heart mr-2"></i>Survivor Portal
                </h2>
                <p class="text-gray-600">Loading survivor portal...</p>
            </div>
        `;
    }
}

function loadRainboPortal(container) {
    console.log('🏥 Loading Rainbo Portal...');
    const section = document.getElementById('rainbo-portal-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        
        // Load Rainbo portal if available
        if (window.loadRainboPortal && typeof window.loadRainboPortal === 'function') {
            window.loadRainboPortal(section);
        }
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-hospital mr-2"></i>Rainbo Portal
                </h2>
                <p class="text-gray-600">Loading Rainbo Initiative portal...</p>
            </div>
        `;
    }
}

function loadPoliceFSU(container) {
    console.log('🛡️ Loading Police FSU...');
    const section = document.getElementById('police-fsu-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
        
        // Load Police FSU portal if available
        if (window.loadPoliceFSU && typeof window.loadPoliceFSU === 'function') {
            window.loadPoliceFSU(section);
        }
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-shield-alt mr-2"></i>Police FSU Portal
                </h2>
                <p class="text-gray-600">Loading Police Family Support Unit portal...</p>
            </div>
        `;
    }
}

function loadResources(container) {
    console.log('📚 Loading Resources...');
    const section = document.getElementById('resources-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
    }
}

function loadVoiceReport(container) {
    console.log('🎤 Loading Voice Report...');
    const section = document.getElementById('voice-report-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
    }
}

function loadAdmin(container) {
    console.log('⚙️ Loading Admin...');
    const section = document.getElementById('admin-section');
    if (section) {
        section.style.display = 'block';
        container.style.display = 'none';
    }
}

// Export functions for global access
window.setupUnifiedTabNavigation = setupUnifiedTabNavigation;
window.handleTabNavigation = handleTabNavigation;

console.log('✅ Tab navigation system loaded');
