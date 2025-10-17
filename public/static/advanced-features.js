// Advanced Features Module for Ministry Demo
// This demonstrates the full potential of the Enhanced GBV Dashboard System

console.log('Loading Advanced Features Module for Ministry Demo...');

// Advanced Dashboard State Management
window.AdvancedGBV = {
    mapInstance: null,
    chartInstances: {},
    currentUser: {
        role: 'National Coordinator',
        name: 'Dr. Aminata Koroma',
        permissions: ['view_all', 'edit_cases', 'generate_reports', 'manage_referrals'],
        district: null
    },
    languages: {
        current: 'en',
        available: {
            'en': 'English',
            'kri': 'Krio',
            'men': 'Mende', 
            'tem': 'Temne'
        }
    },
    realTimeAlerts: [],
    serviceProviders: [],
    referralTracking: [],
    predictiveData: {},
    voiceReports: []
};

// Initialize Advanced Features
function initializeAdvancedFeatures() {
    console.log('Initializing Advanced GBV Dashboard Features...');
    
    // Load all advanced modules
    setupGeographicMap();
    initializeAdvancedAnalytics();
    setupMultiLanguageSupport();
    initializeVoiceIntegration();
    setupRealTimeAlerts();
    initializeServiceProviderNetwork();
    setupAdvancedReporting();
    initializeRoleBasedAccess();
    setupMobileInterface();
    
    console.log('Advanced features initialized successfully');
}

// 1. INTERACTIVE GEOGRAPHIC MAP WITH HOTSPOT ANALYSIS
function setupGeographicMap() {
    console.log('Setting up interactive geographic map...');
    
    // Add geographic view tab functionality
    document.addEventListener('click', function(e) {
        const geoTab = e.target.closest('.dashboard-tab');
        if (geoTab && geoTab.textContent.includes('Geographic View')) {
            showGeographicView();
        }
    });
}

function showGeographicView() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    dashboardContent.innerHTML = `
        <div class="geographic-dashboard">
            <!-- Header with Controls -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Geographic Analysis - Sierra Leone GBV Hotspots</h2>
                    <p class="text-gray-600">Real-time geographic distribution of GBV incidents and service coverage</p>
                </div>
                <div class="flex space-x-3">
                    <button id="toggle-heatmap" class="btn-primary">
                        <i class="fas fa-fire mr-2"></i>Heatmap View
                    </button>
                    <button id="toggle-clusters" class="btn-secondary">
                        <i class="fas fa-layer-group mr-2"></i>Cluster View
                    </button>
                    <button id="export-map" class="btn-secondary">
                        <i class="fas fa-download mr-2"></i>Export Map
                    </button>
                </div>
            </div>
            
            <!-- Map Controls Panel -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="lg:col-span-3">
                    <!-- Main Interactive Map -->
                    <div class="bg-white shadow rounded-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-medium text-gray-900">Interactive Map - All 16 Districts</h3>
                            <div class="flex space-x-2">
                                <select id="map-layer-select" class="form-input text-sm">
                                    <option value="incidents">GBV Incidents</option>
                                    <option value="services">Service Providers</option>
                                    <option value="population">Population Density</option>
                                    <option value="hotspots">Risk Hotspots</option>
                                </select>
                                <select id="time-filter" class="form-input text-sm">
                                    <option value="last-30">Last 30 Days</option>
                                    <option value="last-90">Last 3 Months</option>
                                    <option value="last-year">Last Year</option>
                                    <option value="all-time">All Time</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Map Container -->
                        <div id="sierra-leone-map" class="w-full h-96 bg-gray-100 rounded-lg relative border">
                            <!-- Simulated Interactive Map -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="text-center">
                                    <div class="mb-4">
                                        <i class="fas fa-map-marked-alt text-6xl text-blue-500 mb-4"></i>
                                        <h4 class="text-lg font-semibold text-gray-700">Interactive Sierra Leone Map</h4>
                                        <p class="text-gray-500">Click districts to drill down • Hover for statistics</p>
                                    </div>
                                    
                                    <!-- District Quick Stats -->
                                    <div class="grid grid-cols-4 gap-2 mt-6 text-xs">
                                        <div class="bg-red-100 p-2 rounded cursor-pointer hover:bg-red-200" data-district="Western Area Urban">
                                            <div class="font-semibold text-red-800">Western Urban</div>
                                            <div class="text-red-600">52 cases</div>
                                        </div>
                                        <div class="bg-orange-100 p-2 rounded cursor-pointer hover:bg-orange-200" data-district="Bo">
                                            <div class="font-semibold text-orange-800">Bo</div>
                                            <div class="text-orange-600">38 cases</div>
                                        </div>
                                        <div class="bg-yellow-100 p-2 rounded cursor-pointer hover:bg-yellow-200" data-district="Kenema">
                                            <div class="font-semibold text-yellow-800">Kenema</div>
                                            <div class="text-yellow-600">29 cases</div>
                                        </div>
                                        <div class="bg-green-100 p-2 rounded cursor-pointer hover:bg-green-200" data-district="Bombali">
                                            <div class="font-semibold text-green-800">Bombali</div>
                                            <div class="text-green-600">18 cases</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Map Legend -->
                            <div class="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg">
                                <h5 class="font-semibold text-sm mb-2">Case Density</h5>
                                <div class="space-y-1 text-xs">
                                    <div class="flex items-center">
                                        <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                        <span>High (30+ cases)</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                                        <span>Medium (15-29 cases)</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                                        <span>Low (5-14 cases)</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
                                        <span>Very Low (<5 cases)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Map Actions -->
                        <div class="mt-4 flex space-x-4">
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <i class="fas fa-search-plus mr-1"></i>Zoom to High-Risk Areas
                            </button>
                            <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                <i class="fas fa-hospital mr-1"></i>Show Service Coverage
                            </button>
                            <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">
                                <i class="fas fa-route mr-1"></i>Optimize Referral Routes
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Geographic Analytics Panel -->
                <div class="space-y-6">
                    <!-- District Rankings -->
                    <div class="bg-white shadow rounded-lg p-6">
                        <h4 class="text-lg font-medium text-gray-900 mb-4">District Risk Ranking</h4>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center p-2 bg-red-50 rounded">
                                <span class="font-medium text-red-800">1. Western Urban</span>
                                <span class="text-red-600 text-sm">Critical</span>
                            </div>
                            <div class="flex justify-between items-center p-2 bg-orange-50 rounded">
                                <span class="font-medium text-orange-800">2. Bo</span>
                                <span class="text-orange-600 text-sm">High</span>
                            </div>
                            <div class="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                <span class="font-medium text-yellow-800">3. Kenema</span>
                                <span class="text-yellow-600 text-sm">Medium</span>
                            </div>
                            <div class="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span class="font-medium text-green-800">4. Port Loko</span>
                                <span class="text-green-600 text-sm">Low</span>
                            </div>
                        </div>
                        
                        <button class="mt-4 w-full btn-secondary text-sm">
                            <i class="fas fa-list mr-2"></i>View Full Rankings
                        </button>
                    </div>
                    
                    <!-- Service Coverage Analysis -->
                    <div class="bg-white shadow rounded-lg p-6">
                        <h4 class="text-lg font-medium text-gray-900 mb-4">Service Coverage</h4>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Health Services</span>
                                <span class="font-semibold text-green-600">94%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 94%"></div>
                            </div>
                            
                            <div class="flex justify-between">
                                <span class="text-gray-600">Legal Aid</span>
                                <span class="font-semibold text-yellow-600">67%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-yellow-500 h-2 rounded-full" style="width: 67%"></div>
                            </div>
                            
                            <div class="flex justify-between">
                                <span class="text-gray-600">Psychosocial Support</span>
                                <span class="font-semibold text-red-600">43%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-red-500 h-2 rounded-full" style="width: 43%"></div>
                            </div>
                        </div>
                        
                        <button class="mt-4 w-full btn-primary text-sm">
                            <i class="fas fa-plus mr-2"></i>Recommend New Services
                        </button>
                    </div>
                    
                    <!-- Early Warning Alerts -->
                    <div class="bg-white shadow rounded-lg p-6">
                        <h4 class="text-lg font-medium text-gray-900 mb-4">⚠️ Risk Alerts</h4>
                        <div class="space-y-3">
                            <div class="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                <div class="text-red-800 font-medium text-sm">Spike Detected</div>
                                <div class="text-red-600 text-xs">Western Urban: 40% increase in domestic violence cases this week</div>
                            </div>
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                                <div class="text-yellow-800 font-medium text-sm">Service Gap</div>
                                <div class="text-yellow-600 text-xs">Koinadugu: No psychosocial services for 2 weeks</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Geographic Insights -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white shadow rounded-lg p-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Travel Time Analysis</h4>
                    <canvas id="travel-time-chart" width="300" height="200"></canvas>
                    <p class="text-sm text-gray-600 mt-2">Average time for survivors to reach nearest service provider</p>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Population vs. Services</h4>
                    <canvas id="population-services-chart" width="300" height="200"></canvas>
                    <p class="text-sm text-gray-600 mt-2">Service coverage relative to district population</p>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Seasonal Patterns</h4>
                    <canvas id="seasonal-patterns-chart" width="300" height="200"></canvas>
                    <p class="text-sm text-gray-600 mt-2">GBV incidents by month and weather patterns</p>
                </div>
            </div>
        </div>
    `;
    
    // Add map interaction handlers
    setupMapInteractions();
}

// 2. ADVANCED ANALYTICS & PREDICTIVE MODELING
function initializeAdvancedAnalytics() {
    console.log('Setting up advanced analytics...');
    
    // Add analytics tab functionality
    document.addEventListener('click', function(e) {
        const analyticsTab = e.target.closest('.dashboard-tab');
        if (analyticsTab && analyticsTab.textContent.includes('Reports')) {
            showAdvancedAnalytics();
        }
    });
}

function showAdvancedAnalytics() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    dashboardContent.innerHTML = `
        <div class="analytics-dashboard">
            <!-- Advanced Analytics Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Advanced Analytics & Predictive Insights</h2>
                    <p class="text-gray-600">AI-powered analysis for evidence-based policy decisions</p>
                </div>
                <div class="flex space-x-3">
                    <button id="generate-report" class="btn-primary">
                        <i class="fas fa-file-alt mr-2"></i>Generate Report
                    </button>
                    <button id="export-data" class="btn-secondary">
                        <i class="fas fa-download mr-2"></i>Export Data
                    </button>
                    <button id="schedule-report" class="btn-secondary">
                        <i class="fas fa-clock mr-2"></i>Schedule
                    </button>
                </div>
            </div>
            
            <!-- Key Metrics Overview -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold">Prediction Accuracy</h3>
                            <p class="text-3xl font-bold">94.2%</p>
                            <p class="text-blue-100 text-sm">ML Model Performance</p>
                        </div>
                        <i class="fas fa-brain text-3xl opacity-75"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold">Response Time</h3>
                            <p class="text-3xl font-bold">2.4 hrs</p>
                            <p class="text-green-100 text-sm">Average to First Service</p>
                        </div>
                        <i class="fas fa-stopwatch text-3xl opacity-75"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold">Case Resolution</h3>
                            <p class="text-3xl font-bold">78%</p>
                            <p class="text-purple-100 text-sm">Successfully Closed</p>
                        </div>
                        <i class="fas fa-check-circle text-3xl opacity-75"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold">Risk Score</h3>
                            <p class="text-3xl font-bold">High</p>
                            <p class="text-red-100 text-sm">Next 30 Days Forecast</p>
                        </div>
                        <i class="fas fa-exclamation-triangle text-3xl opacity-75"></i>
                    </div>
                </div>
            </div>
            
            <!-- Advanced Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Predictive Analytics Chart -->
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-medium text-gray-900">Predictive Trend Analysis</h3>
                        <select class="form-input text-sm">
                            <option>Next 30 Days</option>
                            <option>Next 3 Months</option>
                            <option>Next 6 Months</option>
                        </select>
                    </div>
                    <canvas id="predictive-chart" width="400" height="250"></canvas>
                    <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">↗️ 15%</div>
                            <div class="text-gray-600">Expected Increase</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-600">🎯 85%</div>
                            <div class="text-gray-600">Confidence Level</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-purple-600">📊 ML</div>
                            <div class="text-gray-600">AI-Powered</div>
                        </div>
                    </div>
                </div>
                
                <!-- Risk Factors Analysis -->
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Top Risk Factors</h3>
                    <canvas id="risk-factors-chart" width="400" height="250"></canvas>
                    <div class="mt-4 space-y-2 text-sm">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Economic Stress</span>
                            <span class="font-semibold text-red-600">High Impact</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">School Holidays</span>
                            <span class="font-semibold text-orange-600">Medium Impact</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Election Periods</span>
                            <span class="font-semibold text-yellow-600">Variable Impact</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Detailed Analytics Tabs -->
            <div class="bg-white shadow rounded-lg">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8 px-6">
                        <button class="analytics-subtab active py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600">
                            Survivor Demographics
                        </button>
                        <button class="analytics-subtab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                            Service Efficiency
                        </button>
                        <button class="analytics-subtab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                            Justice Outcomes
                        </button>
                        <button class="analytics-subtab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                            Prevention Impact
                        </button>
                    </nav>
                </div>
                
                <div class="p-6">
                    <div id="analytics-content">
                        <!-- Survivor Demographics Content -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">Age Distribution</h4>
                                <canvas id="age-distribution-chart" width="250" height="200"></canvas>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">Violence Type by Age</h4>
                                <canvas id="violence-age-chart" width="250" height="200"></canvas>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">Perpetrator Relationship</h4>
                                <canvas id="perpetrator-chart" width="250" height="200"></canvas>
                            </div>
                        </div>
                        
                        <!-- Key Insights -->
                        <div class="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <h5 class="font-semibold text-blue-900">Key Insights from Demographics Analysis:</h5>
                            <ul class="mt-2 text-blue-800 text-sm space-y-1">
                                <li>• 67% of survivors are between ages 11-25, indicating need for youth-focused interventions</li>
                                <li>• Intimate partner violence peaks in 25-34 age group (42% of cases)</li>
                                <li>• Child sexual abuse cases show 78% are by known perpetrators (family/acquaintances)</li>
                                <li>• Rural areas show 23% higher rates of unreported cases based on population models</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize advanced charts
    createAdvancedCharts();
}

// 3. MULTI-LANGUAGE SUPPORT
function setupMultiLanguageSupport() {
    console.log('Setting up multi-language support...');
    
    // Add language translations
    window.AdvancedGBV.translations = {
        'en': {
            'dashboard': 'Dashboard',
            'new_case': 'New Case',
            'total_cases': 'Total Cases',
            'pending_cases': 'Pending Cases',
            'resolved_cases': 'Resolved Cases',
            'service_providers': 'Service Providers',
            'report_gbv': 'Report GBV',
            'get_help': 'Get Help',
            'call_hotline': 'Call 116 Hotline',
            'incident_date': 'Incident Date',
            'gbv_type': 'Type of Violence',
            'district': 'District',
            'survivor_age': 'Survivor Age Group',
            'survivor_gender': 'Survivor Gender',
            'perpetrator_relationship': 'Perpetrator Relationship',
            'reported_by': 'Reported By',
            'reporting_channel': 'Reporting Channel'
        },
        'kri': {
            'dashboard': 'Dashboard',
            'new_case': 'Nyu Kés',
            'total_cases': 'Ól Kés Dɛm',
            'pending_cases': 'Kés Dɛm We Dɛ Wet',
            'resolved_cases': 'Kés Dɛm We Dɔn Sɔlv',
            'service_providers': 'Sɔvis Prɔvayda Dɛm',
            'report_gbv': 'Ripɔt GBV',
            'get_help': 'Gɛt Ɛp',
            'call_hotline': 'Kɔl 116 Hotlayn',
            'incident_date': 'Insidɛnt Dét',
            'gbv_type': 'Kayn Bayɔlɛns',
            'district': 'Distrikt',
            'survivor_age': 'Sɔvayva Ej Grup',
            'survivor_gender': 'Sɔvayva Jɛnda',
            'perpetrator_relationship': 'Pɔpetréta Rileshɔnship',
            'reported_by': 'Ripɔt Bay',
            'reporting_channel': 'Ripɔtin Chanɛl'
        },
        'men': {
            'dashboard': 'Dashboard',
            'new_case': 'Foloo Kɔɔ',
            'total_cases': 'Kɔɔlu Bee',
            'pending_cases': 'Kɔɔlu Makɔnɔlu',
            'resolved_cases': 'Kɔɔlu Lɔnggaalu',
            'service_providers': 'Baatuluu Kɛɛlu',
            'report_gbv': 'GBV Fɔlɔ',
            'get_help': 'Ndɛmɛɛ Sɔtɔ',
            'call_hotline': '116 Foni',
            'incident_date': 'Kɔɔ Tii',
            'gbv_type': 'Halakɛɛ Kɔɔ',
            'district': 'Distriki',
            'survivor_age': 'Ndɔtɔɔ Saawu Kuu',
            'survivor_gender': 'Ndɔtɔɔ Nuu-ɲaha',
            'perpetrator_relationship': 'Halakɛla Ɲɔgbɔjɛɛ',
            'reported_by': 'Fɔlɔla',
            'reporting_channel': 'Fɔlɔ Silaa'
        },
        'tem': {
            'dashboard': 'Dashboard',
            'new_case': 'Fɔlɔnth Kɔth',
            'total_cases': 'Kɔth Gbɛla',
            'pending_cases': 'Kɔth Yɛgbɛla',
            'resolved_cases': 'Kɔth Lɔŋgahala',
            'service_providers': 'Wɔk Kɛtɛla',
            'report_gbv': 'GBV Fɔlɔn',
            'get_help': 'Rɔnko Sɔtɔ',
            'call_hotline': '116 Tɛlifɔn',
            'incident_date': 'Kɔth Gbankɛ',
            'gbv_type': 'Kas Kɔth',
            'district': 'Distriki',
            'survivor_age': 'Ndɔŋgɔ Kura Kɛth',
            'survivor_gender': 'Ndɔŋgɔ Nɛki-Mɛki',
            'perpetrator_relationship': 'Kasla Ɲɔgɔnth',
            'reported_by': 'Fɔlɔnthɛla',
            'reporting_channel': 'Fɔlɔnth Gbɛnka'
        }
    };
    
    // Create language switcher
    addLanguageSwitcher();
}

function addLanguageSwitcher() {
    const header = document.querySelector('header .flex.items-center.space-x-4');
    if (header) {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'relative';
        languageSwitcher.innerHTML = `
            <select id="language-select" class="form-input text-sm">
                <option value="en">🇸🇱 English</option>
                <option value="kri">🗣️ Krio</option>
                <option value="men">👥 Mende</option>
                <option value="tem">🏘️ Temne</option>
            </select>
        `;
        header.insertBefore(languageSwitcher, header.firstChild);
        
        // Add language switch handler
        document.getElementById('language-select').addEventListener('change', function(e) {
            switchLanguage(e.target.value);
        });
    }
}

function switchLanguage(lang) {
    console.log('Switching to language:', lang);
    window.AdvancedGBV.languages.current = lang;
    
    // Update UI elements with translations
    updateTranslations(lang);
    
    // Show language switch notification
    showNotification(`Language switched to ${window.AdvancedGBV.languages.available[lang]}`, 'success');
}

function updateTranslations(lang) {
    const translations = window.AdvancedGBV.translations[lang];
    if (!translations) return;
    
    // Update key UI elements
    Object.keys(translations).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(el => {
            el.textContent = translations[key];
        });
    });
}

// 4. VOICE/IVR INTEGRATION DEMO
function initializeVoiceIntegration() {
    console.log('Setting up voice integration demo...');
    
    // Add voice reporting simulation
    setupVoiceReportingDemo();
}

function setupVoiceReportingDemo() {
    // Add voice reporting button to main interface
    const mainContent = document.querySelector('main');
    if (mainContent) {
        const voiceButton = document.createElement('div');
        voiceButton.className = 'fixed bottom-6 right-6 z-50';
        voiceButton.innerHTML = `
            <button id="voice-report-btn" class="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-110">
                <i class="fas fa-microphone text-xl"></i>
            </button>
            <div class="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 hover:opacity-100 transition-opacity">
                Voice Report (116)
            </div>
        `;
        mainContent.appendChild(voiceButton);
        
        // Add click handler for voice demo
        document.getElementById('voice-report-btn').addEventListener('click', showVoiceReportDemo);
    }
}

function showVoiceReportDemo() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-2xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900">🎤 Voice Reporting System - 116 Hotline</h3>
                <button class="close-modal text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-6">
                <!-- IVR Flow Simulation -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 class="font-semibold text-blue-900 mb-4">Interactive Voice Response (IVR) Demo</h4>
                    
                    <div class="space-y-4">
                        <div class="bg-white border-l-4 border-blue-500 p-4 rounded">
                            <div class="font-medium text-gray-900">📞 Caller dials 116 (toll-free)</div>
                            <div class="text-gray-600 text-sm mt-1">Automatic connection to GBV hotline</div>
                        </div>
                        
                        <div class="bg-white border-l-4 border-green-500 p-4 rounded">
                            <div class="font-medium text-gray-900">🗣️ Language Selection</div>
                            <div class="text-gray-600 text-sm mt-1">
                                "Welcome to Sierra Leone GBV Hotline. Press 1 for English, 2 for Krio, 3 for Mende, 4 for Temne"
                            </div>
                        </div>
                        
                        <div class="bg-white border-l-4 border-purple-500 p-4 rounded">
                            <div class="font-medium text-gray-900">📝 Report Type Selection</div>
                            <div class="text-gray-600 text-sm mt-1">
                                "Press 1 to report new incident, 2 for information about services, 3 to speak with counselor"
                            </div>
                        </div>
                        
                        <div class="bg-white border-l-4 border-orange-500 p-4 rounded">
                            <div class="font-medium text-gray-900">🎯 Incident Details (Voice Recording)</div>
                            <div class="text-gray-600 text-sm mt-1">
                                "Please record your report after the beep. Include location and type of violence. Your identity is protected."
                            </div>
                        </div>
                    </div>
                    
                    <button id="simulate-call" class="mt-4 btn-primary">
                        <i class="fas fa-play mr-2"></i>Simulate Voice Call
                    </button>
                </div>
                
                <!-- Voice Processing Demo -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 class="font-semibold text-green-900 mb-4">🤖 AI Voice Processing</h4>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                <span>Krio speech recognition</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                <span>Automatic transcription</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                <span>Keyword extraction</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                <span>Severity assessment</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                <span>Auto-categorization</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 class="font-semibold text-yellow-900 mb-4">📊 Voice Analytics</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Calls Today:</span>
                                <span class="font-semibold">47</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Krio Calls:</span>
                                <span class="font-semibold">78%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Emergency Alerts:</span>
                                <span class="font-semibold text-red-600">3</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Avg Call Duration:</span>
                                <span class="font-semibold">4:32</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Response Time:</span>
                                <span class="font-semibold text-green-600">< 30 sec</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sample Voice Report -->
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 class="font-semibold text-gray-900 mb-4">📝 Sample Voice Report Processing</h4>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h5 class="font-medium text-gray-800 mb-2">🎤 Original Voice (Krio)</h5>
                            <div class="bg-white p-3 rounded border text-sm italic">
                                "Mi dɛ kɔl frɔm Bo. Wan man dɔn dis mi sistah yɛstɛdeh nayht. Wi nid ɛp."
                            </div>
                            
                            <h5 class="font-medium text-gray-800 mb-2 mt-4">🔄 Auto-Translation</h5>
                            <div class="bg-white p-3 rounded border text-sm">
                                "I am calling from Bo. A man hurt my sister yesterday night. We need help."
                            </div>
                        </div>
                        
                        <div>
                            <h5 class="font-medium text-gray-800 mb-2">🤖 AI Analysis Results</h5>
                            <div class="space-y-2 text-sm">
                                <div class="bg-white p-2 rounded border">
                                    <span class="font-medium">Location:</span> Bo District
                                </div>
                                <div class="bg-white p-2 rounded border">
                                    <span class="font-medium">Violence Type:</span> Physical Assault
                                </div>
                                <div class="bg-white p-2 rounded border">
                                    <span class="font-medium">Urgency:</span> 
                                    <span class="text-red-600 font-semibold">High</span>
                                </div>
                                <div class="bg-white p-2 rounded border">
                                    <span class="font-medium">Next Action:</span> Immediate counselor callback
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6 border-t mt-6">
                <button class="close-modal btn-secondary">Close Demo</button>
                <button class="btn-primary">
                    <i class="fas fa-phone mr-2"></i>Test Live Call
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// 5. REAL-TIME ALERTS & EARLY WARNING SYSTEM
function setupRealTimeAlerts() {
    console.log('Setting up real-time alerts system...');
    
    // Simulate real-time alerts
    simulateRealTimeAlerts();
    
    // Add alerts notification area
    addAlertsNotificationArea();
}

function addAlertsNotificationArea() {
    const header = document.querySelector('header');
    if (header) {
        const alertsArea = document.createElement('div');
        alertsArea.id = 'alerts-notification-area';
        alertsArea.className = 'fixed top-16 right-4 z-50 space-y-2 max-w-sm';
        document.body.appendChild(alertsArea);
    }
}

function simulateRealTimeAlerts() {
    // Simulate incoming alerts every 30 seconds for demo
    const alertTypes = [
        {
            type: 'spike',
            title: 'Case Spike Detected',
            message: 'Western Urban: 40% increase in reports in last 24h',
            severity: 'high',
            icon: 'fas fa-exclamation-triangle',
            color: 'red'
        },
        {
            type: 'service_gap',
            title: 'Service Gap Alert',
            message: 'Koinadugu: No psychosocial services available',
            severity: 'medium',
            icon: 'fas fa-hospital',
            color: 'yellow'
        },
        {
            type: 'successful_referral',
            title: 'Successful Intervention',
            message: 'Bo: Rapid response team deployed, survivor safe',
            severity: 'low',
            icon: 'fas fa-check-circle',
            color: 'green'
        },
        {
            type: 'data_quality',
            title: 'Data Quality Issue',
            message: 'Moyamba: Missing reports for 3 days',
            severity: 'medium',
            icon: 'fas fa-database',
            color: 'blue'
        }
    ];
    
    let alertIndex = 0;
    
    // Show first alert immediately for demo
    setTimeout(() => {
        showRealTimeAlert(alertTypes[alertIndex]);
        alertIndex = (alertIndex + 1) % alertTypes.length;
    }, 3000);
    
    // Continue showing alerts every 45 seconds
    setInterval(() => {
        showRealTimeAlert(alertTypes[alertIndex]);
        alertIndex = (alertIndex + 1) % alertTypes.length;
    }, 45000);
}

function showRealTimeAlert(alert) {
    const alertsArea = document.getElementById('alerts-notification-area');
    if (!alertsArea) return;
    
    const alertElement = document.createElement('div');
    alertElement.className = `bg-${alert.color}-100 border border-${alert.color}-200 rounded-lg p-4 shadow-lg transform translate-x-full transition-transform duration-300`;
    alertElement.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="${alert.icon} text-${alert.color}-600"></i>
            </div>
            <div class="ml-3 flex-1">
                <h4 class="text-sm font-medium text-${alert.color}-800">${alert.title}</h4>
                <p class="text-sm text-${alert.color}-700 mt-1">${alert.message}</p>
                <div class="mt-2 flex space-x-2">
                    <button class="text-xs text-${alert.color}-800 font-medium hover:underline">View Details</button>
                    <button class="text-xs text-${alert.color}-600 hover:underline" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">Dismiss</button>
                </div>
            </div>
        </div>
    `;
    
    alertsArea.appendChild(alertElement);
    
    // Animate in
    setTimeout(() => {
        alertElement.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
        if (alertElement.parentElement) {
            alertElement.classList.add('translate-x-full');
            setTimeout(() => {
                if (alertElement.parentElement) {
                    alertElement.remove();
                }
            }, 300);
        }
    }, 15000);
}

// 6. SERVICE PROVIDER NETWORK & REFERRAL TRACKING
function initializeServiceProviderNetwork() {
    console.log('Setting up service provider network...');
    
    // Add service providers tab functionality
    document.addEventListener('click', function(e) {
        const serviceTab = e.target.closest('.dashboard-tab');
        if (serviceTab && serviceTab.textContent.includes('Service Providers')) {
            showServiceProviderNetwork();
        }
    });
}

function showServiceProviderNetwork() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    dashboardContent.innerHTML = `
        <div class="service-provider-dashboard">
            <!-- Service Provider Network Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Service Provider Network & Referral Tracking</h2>
                    <p class="text-gray-600">Comprehensive network of GBV support services across Sierra Leone</p>
                </div>
                <div class="flex space-x-3">
                    <button id="add-provider" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Add Provider
                    </button>
                    <button id="optimize-network" class="btn-secondary">
                        <i class="fas fa-route mr-2"></i>Optimize Network
                    </button>
                    <button id="export-directory" class="btn-secondary">
                        <i class="fas fa-download mr-2"></i>Export Directory
                    </button>
                </div>
            </div>
            
            <!-- Network Overview -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white shadow rounded-lg p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600">47</div>
                    <div class="text-gray-600">Total Providers</div>
                    <div class="text-sm text-green-600 mt-1">↗️ +3 this month</div>
                </div>
                <div class="bg-white shadow rounded-lg p-6 text-center">
                    <div class="text-3xl font-bold text-green-600">94%</div>
                    <div class="text-gray-600">Coverage Rate</div>
                    <div class="text-sm text-blue-600 mt-1">All 16 districts</div>
                </div>
                <div class="bg-white shadow rounded-lg p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600">1,247</div>
                    <div class="text-gray-600">Referrals Made</div>
                    <div class="text-sm text-purple-600 mt-1">Last 30 days</div>
                </div>
                <div class="bg-white shadow rounded-lg p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600">87%</div>
                    <div class="text-gray-600">Success Rate</div>
                    <div class="text-sm text-green-600 mt-1">Completed referrals</div>
                </div>
            </div>
            
            <!-- Service Provider Types -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-medium text-gray-900">🏥 Health Services</h3>
                        <span class="text-2xl font-bold text-red-600">18</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>One-Stop Centers</span>
                            <span class="font-semibold">12</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Rainbo Centers</span>
                            <span class="font-semibold">6</span>
                        </div>
                        <div class="flex justify-between">
                            <span>District Coverage</span>
                            <span class="text-green-600 font-semibold">100%</span>
                        </div>
                    </div>
                    <button class="mt-4 w-full btn-secondary text-sm">View All Health</button>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-medium text-gray-900">⚖️ Legal Services</h3>
                        <span class="text-2xl font-bold text-blue-600">14</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Police FSU</span>
                            <span class="font-semibold">16</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Legal Aid Board</span>
                            <span class="font-semibold">8</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Coverage Gap</span>
                            <span class="text-yellow-600 font-semibold">Rural Areas</span>
                        </div>
                    </div>
                    <button class="mt-4 w-full btn-secondary text-sm">View All Legal</button>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-medium text-gray-900">🧠 Psychosocial</h3>
                        <span class="text-2xl font-bold text-green-600">11</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>NGO Centers</span>
                            <span class="font-semibold">9</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Community Workers</span>
                            <span class="font-semibold">45</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Need Expansion</span>
                            <span class="text-red-600 font-semibold">43% Coverage</span>
                        </div>
                    </div>
                    <button class="mt-4 w-full btn-secondary text-sm">View All Psychosocial</button>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-medium text-gray-900">🏠 Shelter Services</h3>
                        <span class="text-2xl font-bold text-purple-600">4</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Safe Houses</span>
                            <span class="font-semibold">3</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Transit Centers</span>
                            <span class="font-semibold">1</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Capacity</span>
                            <span class="text-orange-600 font-semibold">Limited</span>
                        </div>
                    </div>
                    <button class="mt-4 w-full btn-secondary text-sm">View All Shelter</button>
                </div>
            </div>
            
            <!-- Referral Tracking System -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">🔄 Live Referral Tracking</h3>
                    
                    <div class="space-y-4">
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-blue-900">Case #GBV-SL-2024-0847</div>
                                    <div class="text-blue-700 text-sm">Rainbo Center Freetown → Police FSU</div>
                                    <div class="text-blue-600 text-xs">Referred 2 hours ago</div>
                                </div>
                                <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">In Transit</span>
                            </div>
                        </div>
                        
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-green-900">Case #GBV-SL-2024-0846</div>
                                    <div class="text-green-700 text-sm">One-Stop Center Bo → Legal Aid Board</div>
                                    <div class="text-green-600 text-xs">Completed 1 hour ago</div>
                                </div>
                                <span class="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</span>
                            </div>
                        </div>
                        
                        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-yellow-900">Case #GBV-SL-2024-0845</div>
                                    <div class="text-yellow-700 text-sm">116 Hotline → Rainbo Center Kenema</div>
                                    <div class="text-yellow-600 text-xs">Pending - Overdue 6 hours</div>
                                </div>
                                <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">⚠️ Delayed</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="mt-4 w-full btn-primary text-sm">
                        <i class="fas fa-eye mr-2"></i>View All Referrals
                    </button>
                </div>
                
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">📊 Referral Performance</h3>
                    <canvas id="referral-performance-chart" width="350" height="200"></canvas>
                    
                    <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div class="text-center">
                            <div class="text-lg font-bold text-blue-600">2.4 hrs</div>
                            <div class="text-gray-600">Avg Response Time</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold text-green-600">87%</div>
                            <div class="text-gray-600">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Service Provider Directory -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium text-gray-900">Service Provider Directory</h3>
                        <div class="flex space-x-2">
                            <select class="form-input text-sm">
                                <option>All Districts</option>
                                <option>Western Area Urban</option>
                                <option>Bo</option>
                                <option>Kenema</option>
                            </select>
                            <select class="form-input text-sm">
                                <option>All Services</option>
                                <option>Health</option>
                                <option>Legal</option>
                                <option>Psychosocial</option>
                                <option>Shelter</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">Rainbo Centre Freetown</div>
                                    <div class="text-sm text-gray-500">Premier GBV support center</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        Health + Psychosocial
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Western Urban</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+232-22-567890</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        🟢 Active
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div class="flex items-center">
                                        <div class="text-green-600 font-semibold">95%</div>
                                        <div class="ml-1 text-gray-400">satisfaction</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button class="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                    <button class="text-green-600 hover:text-green-800">Refer</button>
                                </td>
                            </tr>
                            <!-- More rows would go here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Initialize service provider charts
    createServiceProviderCharts();
}

// Helper functions for advanced features
function setupMapInteractions() {
    // Add click handlers for map districts
    document.querySelectorAll('[data-district]').forEach(district => {
        district.addEventListener('click', function() {
            const districtName = this.getAttribute('data-district');
            showDistrictDetails(districtName);
        });
    });
}

function showDistrictDetails(districtName) {
    showNotification(`Showing detailed view for ${districtName}`, 'info');
    // In a real implementation, this would show detailed district analytics
}

function createAdvancedCharts() {
    // This would create the advanced analytics charts
    console.log('Creating advanced analytics charts...');
}

function createServiceProviderCharts() {
    // This would create service provider performance charts
    console.log('Creating service provider charts...');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colorClass = {
        'info': 'blue',
        'success': 'green',
        'warning': 'yellow',
        'error': 'red'
    }[type] || 'blue';
    
    notification.className = `fixed top-20 right-4 z-50 bg-${colorClass}-100 border border-${colorClass}-200 text-${colorClass}-800 px-4 py-3 rounded shadow-lg`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-${colorClass}-600 hover:text-${colorClass}-800" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize all advanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAdvancedFeatures, 2000);
});

console.log('Advanced Features Module loaded successfully');