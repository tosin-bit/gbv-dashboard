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
            
            // Get tab text, removing badges like "New", "Phase 1", "Safe"
            const fullText = this.textContent.trim();
            // Remove common badge texts
            const tabText = fullText
                .replace(/New$/i, '')
                .replace(/Phase \d+$/i, '')
                .replace(/Safe$/i, '')
                .replace(/Live$/i, '')
                .trim();
            
            console.log(`🖱️ Tab clicked: "${tabText}" (original: "${fullText}")`);
            
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
    console.log(`🔄 Handling navigation for: ${tabName}`);
    
    // Get main content area
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error('❌ Dashboard content area not found');
        return;
    }
    
    // Route based on tab name - call the appropriate loader directly
    switch(tabName) {
        case 'Overview':
            loadOverview(dashboardContent);
            break;
            
        case 'Report Case':
            if (window.showReportCase && typeof window.showReportCase === 'function') {
                window.showReportCase();
            } else {
                loadReportCase(dashboardContent);
            }
            break;
            
        case 'View Cases':
            if (window.showViewCases && typeof window.showViewCases === 'function') {
                window.showViewCases();
            } else {
                loadViewCases(dashboardContent);
            }
            break;
            
        case 'District Map':
            if (window.showDistrictMap && typeof window.showDistrictMap === 'function') {
                window.showDistrictMap();
            } else {
                loadDistrictMap(dashboardContent);
            }
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
            if (window.showResources && typeof window.showResources === 'function') {
                window.showResources();
            } else {
                loadResources(dashboardContent);
            }
            break;
            
        case 'Voice Report':
            if (window.showVoiceReport && typeof window.showVoiceReport === 'function') {
                window.showVoiceReport();
            } else {
                loadVoiceReport(dashboardContent);
            }
            break;
            
        case 'Admin':
            if (window.showAdmin && typeof window.showAdmin === 'function') {
                window.showAdmin();
            } else {
                loadAdmin(dashboardContent);
            }
            break;
            
        default:
            console.warn(`⚠️ No handler for tab: ${tabName}`);
            dashboardContent.style.display = 'block';
            dashboardContent.classList.remove('hidden');
            dashboardContent.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
                    <p class="text-lg text-gray-600">This feature is being updated.</p>
                    <p class="text-sm text-gray-500 mt-2">Tab: ${tabName}</p>
                </div>
            `;
    }
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
    window.location.reload(); // Reload to show overview dashboard
}

function loadReportCase(container) {
    console.log('📝 Loading Report Case...');
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                <i class="fas fa-file-alt mr-3"></i>Report New GBV Case
            </h2>
            
            <form id="report-case-form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Incident Date *
                        </label>
                        <input type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            District *
                        </label>
                        <select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="">Select District</option>
                            <option value="1">Western Area Urban</option>
                            <option value="2">Western Area Rural</option>
                            <option value="3">Bo</option>
                            <option value="4">Kenema</option>
                            <option value="5">Kailahun</option>
                            <option value="6">Kono</option>
                            <option value="7">Bombali</option>
                            <option value="8">Port Loko</option>
                            <option value="9">Tonkolili</option>
                            <option value="10">Kambia</option>
                            <option value="11">Moyamba</option>
                            <option value="12">Pujehun</option>
                            <option value="13">Bonthe</option>
                            <option value="14">Karene</option>
                            <option value="15">Falaba</option>
                            <option value="16">Koinadugu</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Type of Violence *
                        </label>
                        <select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Type</option>
                            <option value="rape">Rape</option>
                            <option value="sexual_assault">Sexual Assault</option>
                            <option value="domestic_violence">Domestic Violence</option>
                            <option value="child_abuse">Child Abuse</option>
                            <option value="fgm">FGM/C</option>
                            <option value="early_marriage">Early/Forced Marriage</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Survivor Age
                        </label>
                        <input type="number" min="0" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Case Description *
                    </label>
                    <textarea required rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Provide details about the incident..."></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Priority Level *
                        </label>
                        <select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Reported By
                        </label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Your name or organization">
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <button type="submit" class="px-6 py-3 rounded-lg text-white font-semibold" style="background-color: #32cd32;">
                        <i class="fas fa-save mr-2"></i>Submit Case Report
                    </button>
                    <button type="button" onclick="handleTabNavigation('Overview')" class="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
}

function loadViewCases(container) {
    console.log('📋 Loading View Cases...');
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                    <i class="fas fa-list-alt mr-3"></i>View All Cases
                </h2>
                <button onclick="handleTabNavigation('Report Case')" class="px-4 py-2 rounded-lg text-white font-semibold" style="background-color: #32cd32;">
                    <i class="fas fa-plus mr-2"></i>Report New Case
                </button>
            </div>
            
            <div class="mb-6 flex gap-4">
                <input type="text" placeholder="Search cases..." class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                <select class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">All Districts</option>
                    <option value="1">Western Area Urban</option>
                    <option value="2">Western Area Rural</option>
                    <option value="3">Bo</option>
                    <option value="4">Kenema</option>
                </select>
                <select class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">All Status</option>
                    <option value="reported">Reported</option>
                    <option value="investigating">Investigating</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case #</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" id="cases-table-body">
                        <tr>
                            <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
                                <div>Loading cases...</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Load cases from API
    setTimeout(() => {
        if (window.loadCases && typeof window.loadCases === 'function') {
            window.loadCases();
        }
    }, 100);
}

function loadDistrictMap(container) {
    console.log('🗺️ Loading District Map...');
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                <i class="fas fa-map mr-3"></i>Sierra Leone Districts - GBV Case Distribution
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" id="district-map-grid">
                <div class="p-4 bg-gray-100 rounded-lg text-center">
                    <i class="fas fa-spinner fa-spin text-2xl text-blue-600 mb-2"></i>
                    <div class="text-sm text-gray-600">Loading districts...</div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-12 text-center border-2 border-dashed border-green-400">
                <i class="fas fa-map text-6xl mb-4" style="color: #32cd32;"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Interactive Sierra Leone Map</h3>
                <p class="text-gray-600">Click on any district card above to view detailed statistics</p>
            </div>
        </div>
    `;
    
    // Load district data
    setTimeout(() => {
        if (window.loadDistrictData && typeof window.loadDistrictData === 'function') {
            window.loadDistrictData();
        }
    }, 100);
}

function loadAnalytics(container) {
    console.log('📈 Loading Analytics...');
    
    // Load enhanced analytics directly into container
    if (window.loadEnhancedAnalyticsDashboard && typeof window.loadEnhancedAnalyticsDashboard === 'function') {
        window.loadEnhancedAnalyticsDashboard(container);
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
    
    // Load survivor portal directly into container
    if (window.loadSurvivorPortal && typeof window.loadSurvivorPortal === 'function') {
        window.loadSurvivorPortal(container);
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
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                <i class="fas fa-book mr-3"></i>GBV Resources & Legal Framework
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-gavel text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Legal Framework</h3>
                    <p class="text-sm text-gray-600 mb-4">Sierra Leone laws and policies on GBV</p>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-file-pdf text-red-600 mr-2"></i>Sexual Offences Act 2012</li>
                        <li><i class="fas fa-file-pdf text-red-600 mr-2"></i>Domestic Violence Act 2007</li>
                        <li><i class="fas fa-file-pdf text-red-600 mr-2"></i>Child Rights Act 2007</li>
                    </ul>
                </div>
                
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                    <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-hands-helping text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Support Services</h3>
                    <p class="text-sm text-gray-600 mb-4">Available services for survivors</p>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-phone text-green-600 mr-2"></i>116 - Free Hotline</li>
                        <li><i class="fas fa-hospital text-green-600 mr-2"></i>Rainbo Centers (9 locations)</li>
                        <li><i class="fas fa-shield-alt text-green-600 mr-2"></i>Police FSU (All districts)</li>
                    </ul>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: #32cd32;">
                        <i class="fas fa-graduation-cap text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Training Materials</h3>
                    <p class="text-sm text-gray-600 mb-4">Educational resources and guides</p>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-file-alt text-blue-600 mr-2"></i>GBV Response Protocols</li>
                        <li><i class="fas fa-file-alt text-blue-600 mr-2"></i>Case Management Guide</li>
                        <li><i class="fas fa-file-alt text-blue-600 mr-2"></i>Survivor Care Standards</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function loadVoiceReport(container) {
    console.log('🎤 Loading Voice Report...');
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                <i class="fas fa-microphone mr-3"></i>Voice Recording - Report by Audio
            </h2>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <div class="flex items-start">
                    <i class="fas fa-info-circle text-blue-600 text-2xl mr-4 mt-1"></i>
                    <div>
                        <h3 class="text-lg font-semibold text-blue-900 mb-2">How Voice Reporting Works</h3>
                        <ul class="text-sm text-blue-800 space-y-2">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Click the microphone button to start recording</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Describe the incident in your preferred language (Krio, English, Mende, or Temne)</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Your recording will be transcribed and saved securely</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>A case number will be generated for follow-up</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-12 text-center border-2 border-dashed" style="border-color: #32cd32;">
                <div id="voice-recording-status" class="mb-6">
                    <i class="fas fa-microphone text-6xl mb-4" style="color: #32cd32;"></i>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Ready to Record</h3>
                    <p class="text-gray-600">Press the button below to start recording your report</p>
                </div>
                
                <button id="start-recording-btn" class="px-8 py-4 rounded-lg text-white text-lg font-semibold hover:opacity-90 transition-opacity" style="background-color: #32cd32;">
                    <i class="fas fa-microphone mr-2"></i>Start Recording
                </button>
                
                <div class="mt-6 text-sm text-gray-500">
                    <i class="fas fa-lock mr-1"></i>All recordings are encrypted and confidential
                </div>
            </div>
        </div>
    `;
    
    // Load voice recording functionality
    setTimeout(() => {
        if (window.initVoiceRecording && typeof window.initVoiceRecording === 'function') {
            window.initVoiceRecording();
        }
    }, 100);
}

function loadAdmin(container) {
    console.log('⚙️ Loading Admin...');
    container.style.display = 'block';
    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                <i class="fas fa-user-cog mr-3"></i>System Administration
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200 text-center">
                    <i class="fas fa-users text-4xl text-blue-600 mb-3"></i>
                    <div class="text-3xl font-bold text-gray-800">152</div>
                    <div class="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200 text-center">
                    <i class="fas fa-check-circle text-4xl text-green-600 mb-3"></i>
                    <div class="text-3xl font-bold text-gray-800">98.7%</div>
                    <div class="text-sm text-gray-600 mt-1">System Uptime</div>
                </div>
                
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200 text-center">
                    <i class="fas fa-database text-4xl text-purple-600 mb-3"></i>
                    <div class="text-3xl font-bold text-gray-800">2,547</div>
                    <div class="text-sm text-gray-600 mt-1">Total Cases</div>
                </div>
                
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-200 text-center">
                    <i class="fas fa-shield-alt text-4xl text-yellow-600 mb-3"></i>
                    <div class="text-3xl font-bold text-gray-800">45</div>
                    <div class="text-sm text-gray-600 mt-1">Permission Groups</div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <i class="fas fa-user-plus text-3xl mb-4" style="color: #32cd32;"></i>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">User Management</h3>
                    <p class="text-sm text-gray-600">Add, edit, or remove user accounts and permissions</p>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <i class="fas fa-cog text-3xl mb-4 text-blue-600"></i>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">System Settings</h3>
                    <p class="text-sm text-gray-600">Configure system parameters and preferences</p>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <i class="fas fa-download text-3xl mb-4 text-purple-600"></i>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Data Export</h3>
                    <p class="text-sm text-gray-600">Export reports and data for analysis</p>
                </div>
            </div>
        </div>
    `;
}

// Export functions for global access
window.setupUnifiedTabNavigation = setupUnifiedTabNavigation;
window.handleTabNavigation = handleTabNavigation;

console.log('✅ Tab navigation system loaded');
