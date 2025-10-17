// Mobile Interface System - Field Worker Mobile Application Module
console.log('📱 Mobile Interface System Loading...');

// Mobile Interface System for Field Workers - Ministry GBV Dashboard
window.mobileInterfaceSystem = (function() {
    
    // Sample field worker data
    const fieldWorkers = [
        {
            id: 'FW001',
            name: 'Aminata Sesay',
            district: 'Western Area Urban',
            role: 'Community Liaison Officer',
            phone: '+232-76-123456',
            status: 'Active',
            lastSync: '2024-01-15 14:30:00',
            casesAssigned: 12,
            reportsSubmitted: 45,
            location: {lat: 8.4657, lng: -13.2317}, // Freetown
            batteryLevel: 78,
            offlineCapable: true,
            gpsEnabled: true
        },
        {
            id: 'FW002',
            name: 'Mohamed Kamara',
            district: 'Bo',
            role: 'Field Investigator',
            phone: '+232-78-987654',
            status: 'Active',
            lastSync: '2024-01-15 14:25:00',
            casesAssigned: 8,
            reportsSubmitted: 32,
            location: {lat: 7.9644, lng: -11.7383}, // Bo
            batteryLevel: 92,
            offlineCapable: true,
            gpsEnabled: true
        },
        {
            id: 'FW003',
            name: 'Fatmata Bangura',
            district: 'Kenema',
            role: 'Survivor Support Specialist',
            phone: '+232-77-456789',
            status: 'Offline',
            lastSync: '2024-01-15 13:45:00',
            casesAssigned: 15,
            reportsSubmitted: 67,
            location: {lat: 7.8767, lng: -11.1900}, // Kenema
            batteryLevel: 23,
            offlineCapable: true,
            gpsEnabled: false
        },
        {
            id: 'FW004',
            name: 'Ibrahim Koroma',
            district: 'Bombali',
            role: 'Community Mobilizer',
            phone: '+232-79-321654',
            status: 'Active',
            lastSync: '2024-01-15 14:32:00',
            casesAssigned: 6,
            reportsSubmitted: 28,
            location: {lat: 9.0515, lng: -12.0464}, // Makeni
            batteryLevel: 67,
            offlineCapable: true,
            gpsEnabled: true
        }
    ];

    // Mobile app features
    const mobileFeatures = [
        {
            name: 'Case Reporting',
            description: 'Quick case intake and incident reporting with photo/audio capability',
            icon: 'fa-clipboard-list',
            color: 'blue',
            usage: 89,
            lastUsed: '2 minutes ago'
        },
        {
            name: 'GPS Tracking',
            description: 'Real-time location tracking for field worker safety and case mapping',
            icon: 'fa-map-marker-alt',
            color: 'green',
            usage: 76,
            lastUsed: 'Active now'
        },
        {
            name: 'Offline Sync',
            description: 'Work without internet connection, sync when connectivity restored',
            icon: 'fa-wifi',
            color: 'orange',
            usage: 92,
            lastUsed: '1 hour ago'
        },
        {
            name: 'Voice Notes',
            description: 'Record voice notes for cases when typing is not convenient',
            icon: 'fa-microphone',
            color: 'purple',
            usage: 64,
            lastUsed: '5 minutes ago'
        },
        {
            name: 'Photo Documentation',
            description: 'Secure photo capture with automatic privacy protection',
            icon: 'fa-camera',
            color: 'red',
            usage: 58,
            lastUsed: '15 minutes ago'
        },
        {
            name: 'Quick Referrals',
            description: 'Fast referral system with provider contact information',
            icon: 'fa-paper-plane',
            color: 'teal',
            usage: 71,
            lastUsed: '30 minutes ago'
        }
    ];

    // Mobile app statistics
    const mobileStats = {
        totalDownloads: 245,
        activeUsers: 89,
        dailyReports: 67,
        offlineSessions: 34,
        dataSync: '2.3MB/day',
        averageSessionTime: '23 minutes',
        crashRate: '0.2%',
        userSatisfaction: 4.6
    };

    // Device information
    const deviceInfo = [
        {
            worker: 'Aminata Sesay',
            deviceModel: 'Samsung Galaxy A32',
            osVersion: 'Android 11',
            appVersion: '2.1.4',
            storage: '64GB (32% used)',
            battery: '78%',
            connection: 'WiFi + 4G',
            lastUpdate: '2024-01-10'
        },
        {
            worker: 'Mohamed Kamara',
            deviceModel: 'iPhone 12',
            osVersion: 'iOS 16.2',
            appVersion: '2.1.4',
            storage: '128GB (45% used)',
            battery: '92%',
            connection: '4G',
            lastUpdate: '2024-01-12'
        },
        {
            worker: 'Fatmata Bangura',
            deviceModel: 'Tecno Camon 18',
            osVersion: 'Android 10',
            appVersion: '2.1.3',
            storage: '64GB (78% used)',
            battery: '23%',
            connection: 'Offline',
            lastUpdate: '2024-01-08'
        }
    ];

    // Initialize mobile interface system
    function initializeMobileSystem() {
        console.log('🚀 Initializing Mobile Interface System...');
        
        // Create the mobile interface section
        createMobileSection();
        
        // Populate mobile data
        populateMobileMetrics();
        populateFieldWorkerMap();
        populateMobileFeatures();
        populateDeviceInfo();
        populateAppUsageStats();
        
        // Set up interactive features
        setupMobileEventListeners();
        
        console.log('✅ Mobile Interface System initialized successfully!');
    }

    // Create mobile interface section HTML
    function createMobileSection() {
        const existingSection = document.getElementById('mobile-interface-section');
        if (existingSection) {
            existingSection.remove();
        }

        const section = document.createElement('div');
        section.id = 'mobile-interface-section';
        section.className = 'hidden space-y-6';
        section.innerHTML = `
            <!-- Mobile Interface Header -->
            <div class="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-mobile-alt mr-3"></i>
                            Mobile Interface System
                        </h2>
                        <p class="text-teal-100">Field Worker Mobile Application & Device Management</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" id="active-mobile-users">89</div>
                        <div class="text-sm text-teal-200">Active Mobile Users</div>
                    </div>
                </div>
            </div>

            <!-- Mobile App Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Total Downloads</p>
                            <p class="text-3xl font-bold text-gray-900" id="total-downloads">245</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full">
                            <i class="fas fa-download text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Daily Reports</p>
                            <p class="text-3xl font-bold text-gray-900" id="daily-reports">67</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full">
                            <i class="fas fa-file-alt text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Offline Sessions</p>
                            <p class="text-3xl font-bold text-gray-900" id="offline-sessions">34</p>
                        </div>
                        <div class="p-3 bg-orange-100 rounded-full">
                            <i class="fas fa-wifi-slash text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">User Satisfaction</p>
                            <p class="text-3xl font-bold text-gray-900" id="user-satisfaction-mobile">4.6/5</p>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-full">
                            <i class="fas fa-star text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Field Worker Map & Status -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Field Worker Map -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-map-marked-alt mr-2 text-teal-600"></i>
                            Field Worker Locations
                        </h3>
                    </div>
                    <div class="p-6">
                        <div id="field-worker-map" class="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-map text-gray-400 text-4xl mb-4"></i>
                                <p class="text-gray-600">Interactive map showing real-time field worker locations</p>
                                <p class="text-sm text-gray-500 mt-2">4 active workers currently in the field</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Worker Status List -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-gray-900">
                                <i class="fas fa-users mr-2 text-green-600"></i>
                                Field Worker Status
                            </h3>
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <i class="fas fa-sync-alt mr-1"></i>Refresh Status
                            </button>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="field-worker-status" class="space-y-4 max-h-80 overflow-y-auto"></div>
                    </div>
                </div>
            </div>

            <!-- Mobile App Features -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-mobile-alt mr-2 text-blue-600"></i>
                        Mobile App Features & Usage
                    </h3>
                </div>
                <div class="p-6">
                    <div id="mobile-features" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </div>
            </div>

            <!-- App Usage Analytics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-chart-line mr-2 text-purple-600"></i>
                            App Usage Trends
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="app-usage-chart" width="400" height="250"></canvas>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-signal mr-2 text-orange-600"></i>
                            Connection Status
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="connection-status-chart" width="400" height="250"></canvas>
                    </div>
                </div>
            </div>

            <!-- Device Information -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-tablet-alt mr-2 text-indigo-600"></i>
                            Device Information & Management
                        </h3>
                        <div class="flex space-x-2">
                            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">
                                <i class="fas fa-sync mr-2"></i>Push Update
                            </button>
                            <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                                <i class="fas fa-download mr-2"></i>Backup Data
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div id="device-info" class="space-y-4"></div>
                </div>
            </div>

            <!-- Mobile App Interface Preview -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-eye mr-2 text-pink-600"></i>
                        Mobile App Interface Preview
                    </h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Case Reporting Screen -->
                        <div class="bg-gray-100 rounded-lg p-4">
                            <div class="bg-white rounded-lg shadow-sm p-4 h-96">
                                <div class="flex items-center justify-between mb-4">
                                    <h4 class="font-semibold text-gray-800">New Case Report</h4>
                                    <i class="fas fa-times text-gray-400"></i>
                                </div>
                                <div class="space-y-3">
                                    <div class="bg-gray-50 p-2 rounded text-sm">Incident Type: Domestic Violence</div>
                                    <div class="bg-gray-50 p-2 rounded text-sm">Location: Freetown, Western Area</div>
                                    <div class="bg-gray-50 p-2 rounded text-sm">Date: Today, 2:30 PM</div>
                                    <div class="bg-gray-50 p-2 rounded text-sm">Priority: High</div>
                                    <div class="flex space-x-2 mt-4">
                                        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-1">
                                            <i class="fas fa-camera mr-1"></i>Photo
                                        </button>
                                        <button class="bg-green-500 text-white px-3 py-1 rounded text-sm flex-1">
                                            <i class="fas fa-microphone mr-1"></i>Voice
                                        </button>
                                    </div>
                                    <button class="bg-red-500 text-white px-4 py-2 rounded w-full mt-4">
                                        Submit Report
                                    </button>
                                </div>
                            </div>
                            <p class="text-center text-sm text-gray-600 mt-2">Case Reporting Interface</p>
                        </div>

                        <!-- Dashboard Screen -->
                        <div class="bg-gray-100 rounded-lg p-4">
                            <div class="bg-white rounded-lg shadow-sm p-4 h-96">
                                <div class="flex items-center justify-between mb-4">
                                    <h4 class="font-semibold text-gray-800">Dashboard</h4>
                                    <i class="fas fa-bell text-gray-400"></i>
                                </div>
                                <div class="space-y-3">
                                    <div class="bg-blue-50 p-3 rounded">
                                        <div class="text-sm font-medium text-blue-800">Cases Assigned</div>
                                        <div class="text-lg font-bold text-blue-600">12</div>
                                    </div>
                                    <div class="bg-green-50 p-3 rounded">
                                        <div class="text-sm font-medium text-green-800">Reports Submitted</div>
                                        <div class="text-lg font-bold text-green-600">45</div>
                                    </div>
                                    <div class="bg-yellow-50 p-3 rounded">
                                        <div class="text-sm font-medium text-yellow-800">Pending Actions</div>
                                        <div class="text-lg font-bold text-yellow-600">3</div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-center text-sm text-gray-600 mt-2">Worker Dashboard</p>
                        </div>

                        <!-- Offline Mode Screen -->
                        <div class="bg-gray-100 rounded-lg p-4">
                            <div class="bg-white rounded-lg shadow-sm p-4 h-96">
                                <div class="flex items-center justify-between mb-4">
                                    <h4 class="font-semibold text-gray-800">Offline Mode</h4>
                                    <i class="fas fa-wifi-slash text-red-400"></i>
                                </div>
                                <div class="text-center py-8">
                                    <i class="fas fa-cloud-download-alt text-gray-400 text-4xl mb-4"></i>
                                    <p class="text-sm text-gray-600 mb-4">Working offline</p>
                                    <div class="bg-yellow-50 p-3 rounded">
                                        <div class="text-sm font-medium text-yellow-800">Pending Sync</div>
                                        <div class="text-lg font-bold text-yellow-600">7 items</div>
                                    </div>
                                    <button class="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 text-sm">
                                        <i class="fas fa-sync mr-1"></i>Try Sync Now
                                    </button>
                                </div>
                            </div>
                            <p class="text-center text-sm text-gray-600 mt-2">Offline Mode Interface</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append to the dashboard container
        const dashboardContainer = document.querySelector('.min-h-screen .max-w-7xl');
        if (dashboardContainer) {
            dashboardContainer.appendChild(section);
        }
    }

    // Populate mobile metrics
    function populateMobileMetrics() {
        document.getElementById('active-mobile-users').textContent = mobileStats.activeUsers;
        document.getElementById('total-downloads').textContent = mobileStats.totalDownloads;
        document.getElementById('daily-reports').textContent = mobileStats.dailyReports;
        document.getElementById('offline-sessions').textContent = mobileStats.offlineSessions;
        document.getElementById('user-satisfaction-mobile').textContent = `${mobileStats.userSatisfaction}/5`;
    }

    // Populate field worker map (simulation)
    function populateFieldWorkerMap() {
        const mapContainer = document.getElementById('field-worker-map');
        if (!mapContainer) return;

        // Create a simple visual representation
        mapContainer.innerHTML = `
            <div class="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                <div class="absolute inset-0">
                    <!-- Sierra Leone outline simulation -->
                    <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-200 rounded-xl opacity-50"></div>
                    
                    <!-- Field worker locations -->
                    ${fieldWorkers.map((worker, index) => {
                        const positions = [
                            { top: '25%', left: '30%' }, // Freetown
                            { top: '60%', left: '35%' }, // Bo
                            { top: '65%', left: '55%' }, // Kenema
                            { top: '15%', left: '45%' }  // Makeni
                        ];
                        const pos = positions[index] || { top: '50%', left: '50%' };
                        const statusColor = worker.status === 'Active' ? 'bg-green-500' : 'bg-red-500';
                        
                        return `
                            <div class="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group" 
                                 style="top: ${pos.top}; left: ${pos.left};">
                                <div class="${statusColor} w-3 h-3 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                    ${worker.name} - ${worker.district}
                                </div>
                            </div>
                        `;
                    }).join('')}
                    
                    <!-- Map legend -->
                    <div class="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                        <div class="text-xs font-semibold text-gray-800 mb-2">Field Workers</div>
                        <div class="flex items-center space-x-2 text-xs">
                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Active (${fieldWorkers.filter(w => w.status === 'Active').length})</span>
                        </div>
                        <div class="flex items-center space-x-2 text-xs mt-1">
                            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Offline (${fieldWorkers.filter(w => w.status === 'Offline').length})</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate field worker status
    function populateFieldWorkerStatus() {
        const statusContainer = document.getElementById('field-worker-status');
        if (!statusContainer) return;

        statusContainer.innerHTML = fieldWorkers.map(worker => {
            const statusColor = worker.status === 'Active' ? 'text-green-600' : 'text-red-600';
            const statusBg = worker.status === 'Active' ? 'bg-green-50' : 'bg-red-50';
            const batteryColor = worker.batteryLevel > 50 ? 'text-green-600' : worker.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                        <i class="fas fa-user text-gray-600"></i>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">${worker.name}</h4>
                                    <p class="text-sm text-gray-600">${worker.role} - ${worker.district}</p>
                                </div>
                            </div>
                            
                            <div class="mt-3 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Status:</span>
                                    <span class="${statusColor} font-medium ml-1">${worker.status}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">Cases:</span>
                                    <span class="font-medium ml-1">${worker.casesAssigned}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">Battery:</span>
                                    <span class="${batteryColor} font-medium ml-1">${worker.batteryLevel}%</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">GPS:</span>
                                    <span class="font-medium ml-1">${worker.gpsEnabled ? '✓ Enabled' : '✗ Disabled'}</span>
                                </div>
                            </div>
                            
                            <div class="mt-2 text-xs text-gray-500">
                                Last sync: ${new Date(worker.lastSync).toLocaleString()}
                            </div>
                        </div>
                        
                        <div class="flex flex-col space-y-2 ml-4">
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <i class="fas fa-phone mr-1"></i>Call
                            </button>
                            <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                <i class="fas fa-comments mr-1"></i>Message
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate mobile features
    function populateMobileFeatures() {
        const features = document.getElementById('mobile-features');
        if (!features) return;

        features.innerHTML = mobileFeatures.map(feature => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-${feature.color}-100 rounded-lg flex items-center justify-center">
                            <i class="fas ${feature.icon} text-${feature.color}-600"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${feature.name}</h4>
                        <p class="text-sm text-gray-600 mt-1">${feature.description}</p>
                        <div class="mt-2 flex items-center justify-between">
                            <div class="text-xs text-gray-500">Usage: ${feature.usage}%</div>
                            <div class="text-xs text-gray-500">${feature.lastUsed}</div>
                        </div>
                        <div class="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div class="bg-${feature.color}-500 h-1.5 rounded-full" style="width: ${feature.usage}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Populate field worker status
        populateFieldWorkerStatus();
    }

    // Populate device information
    function populateDeviceInfo() {
        const deviceContainer = document.getElementById('device-info');
        if (!deviceContainer) return;

        deviceContainer.innerHTML = deviceInfo.map(device => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Worker</p>
                        <p class="font-semibold text-gray-900">${device.worker}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600">Device</p>
                        <p class="font-semibold text-gray-900">${device.deviceModel}</p>
                        <p class="text-xs text-gray-500">${device.osVersion}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600">App Version</p>
                        <p class="font-semibold text-gray-900">${device.appVersion}</p>
                        <p class="text-xs text-gray-500">Updated: ${device.lastUpdate}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600">Storage</p>
                        <p class="font-semibold text-gray-900">${device.storage}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600">Connection</p>
                        <p class="font-semibold text-gray-900">${device.connection}</p>
                        <p class="text-xs text-gray-500">Battery: ${device.battery}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            <i class="fas fa-sync mr-1"></i>Update
                        </button>
                        <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                            <i class="fas fa-tools mr-1"></i>Manage
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Create usage analytics charts
    function populateAppUsageStats() {
        setTimeout(() => {
            // App Usage Trends Chart
            const usageCtx = document.getElementById('app-usage-chart');
            if (usageCtx && typeof Chart !== 'undefined') {
                new Chart(usageCtx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [
                            {
                                label: 'Daily Reports',
                                data: [45, 52, 48, 67, 58, 34, 29],
                                borderColor: 'rgb(59, 130, 246)',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                tension: 0.4
                            },
                            {
                                label: 'Active Users',
                                data: [78, 85, 82, 89, 91, 67, 54],
                                borderColor: 'rgb(16, 185, 129)',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                tension: 0.4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Connection Status Chart
            const connectionCtx = document.getElementById('connection-status-chart');
            if (connectionCtx && typeof Chart !== 'undefined') {
                new Chart(connectionCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['WiFi', '4G/3G', 'Offline Mode'],
                        datasets: [{
                            data: [45, 42, 13],
                            backgroundColor: [
                                'rgb(34, 197, 94)',
                                'rgb(59, 130, 246)',
                                'rgb(239, 68, 68)'
                            ]
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
        }, 1000);
    }

    // Set up event listeners
    function setupMobileEventListeners() {
        // Auto-refresh worker status every 30 seconds
        setInterval(updateWorkerStatus, 30000);
    }

    // Update worker status simulation
    function updateWorkerStatus() {
        fieldWorkers.forEach(worker => {
            // Simulate battery drain
            if (worker.batteryLevel > 0) {
                worker.batteryLevel = Math.max(0, worker.batteryLevel - Math.floor(Math.random() * 3));
            }
            
            // Update last sync time for active workers
            if (worker.status === 'Active' && Math.random() > 0.7) {
                worker.lastSync = new Date().toISOString();
            }
        });
        
        // Refresh the status display
        populateFieldWorkerStatus();
    }

    // Public methods
    return {
        init: initializeMobileSystem,
        populateData: function() {
            populateMobileMetrics();
            populateFieldWorkerMap();
            populateMobileFeatures();
            populateDeviceInfo();
            populateAppUsageStats();
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.mobileInterfaceSystem.init(), 500);
    });
} else {
    setTimeout(() => window.mobileInterfaceSystem.init(), 500);
}

console.log('📱 Mobile Interface System Module - Fully Loaded!');
console.log('🔥 Comprehensive field worker mobile application system ready for Ministry demonstration');