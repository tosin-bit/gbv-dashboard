/**
 * GBV Dashboard - Geographic Intelligence Module
 * Interactive geographic mapping and hotspot analysis for Sierra Leone
 * Built by Insyt Solutions
 */

class GeographicIntelligence {
    constructor() {
        this.initialized = false;
        this.mapData = null;
        this.districts = [
            { name: 'Western Area Urban', lat: 8.4657, lng: -13.2317, population: 1055964, riskLevel: 'high', cases: 156 },
            { name: 'Western Area Rural', lat: 8.3000, lng: -13.1000, population: 442951, riskLevel: 'medium', cases: 89 },
            { name: 'Bo', lat: 7.9644, lng: -11.7383, population: 654142, riskLevel: 'high', cases: 134 },
            { name: 'Bonthe', lat: 7.5264, lng: -12.5050, population: 168729, riskLevel: 'critical', cases: 78 },
            { name: 'Moyamba', lat: 8.1569, lng: -12.4315, population: 278119, riskLevel: 'medium', cases: 67 },
            { name: 'Pujehun', lat: 7.3578, lng: -11.7208, population: 335574, riskLevel: 'high', cases: 92 },
            { name: 'Bombali', lat: 9.0833, lng: -12.2167, population: 606183, riskLevel: 'medium', cases: 98 },
            { name: 'Falaba', lat: 9.7833, lng: -11.4167, population: 204417, riskLevel: 'critical', cases: 45 },
            { name: 'Koinadugu', lat: 9.5000, lng: -11.3333, population: 408097, riskLevel: 'high', cases: 87 },
            { name: 'Tonkolili', lat: 8.9167, lng: -11.7500, population: 531435, riskLevel: 'medium', cases: 76 },
            { name: 'Karene', lat: 9.3333, lng: -12.3833, population: 318064, riskLevel: 'medium', cases: 54 },
            { name: 'Kailahun', lat: 8.2783, lng: -10.5733, population: 525562, riskLevel: 'high', cases: 112 },
            { name: 'Kenema', lat: 7.8769, lng: -11.1900, population: 609873, riskLevel: 'high', cases: 145 },
            { name: 'Kono', lat: 8.6406, lng: -10.9706, population: 506847, riskLevel: 'medium', cases: 89 },
            { name: 'Portloko', lat: 8.7667, lng: -12.7833, population: 653376, riskLevel: 'medium', cases: 102 },
            { name: 'Kambia', lat: 9.1250, lng: -12.9208, population: 335838, riskLevel: 'high', cases: 73 }
        ];
        this.init();
    }

    init() {
        console.log('🗺️ Initializing Geographic Intelligence System...');
        this.setupGeographicInterface();
        this.initialized = true;
    }

    setupGeographicInterface() {
        console.log('🚀 setupGeographicInterface() called!');
        // Wait for dashboard content to be available
        const waitForDashboard = () => {
            const dashboardContent = document.getElementById('dashboard-content');
            if (!dashboardContent) {
                console.log('⏳ Waiting for dashboard content...');
                setTimeout(waitForDashboard, 500);
                return;
            }

            let geoSection = document.getElementById('geographic-section');
            if (!geoSection) {
                console.log('📝 Creating geographic-section element...');
                geoSection = document.createElement('div');
                geoSection.id = 'geographic-section';
                geoSection.className = 'hidden';
                dashboardContent.appendChild(geoSection);
                console.log('✅ Geographic section element created');
            } else {
                console.log('✅ Geographic section element already exists');
            }
            
            this.populateGeographicContent(geoSection);
        };
        
        waitForDashboard();
    }
    
    populateGeographicContent(geoSection) {
        if (geoSection.innerHTML.length > 100) {
            console.log('⏭️ Geographic section already has content, skipping');
            return;
        }
        
        console.log('📝 Populating geographic section content...');

        geoSection.innerHTML = `
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
                    <div id="sierra-leone-map" class="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
                        <!-- Simulated interactive map -->
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                            <div class="text-center">
                                <i class="fas fa-map text-6xl text-blue-500 mb-4"></i>
                                <h4 class="text-xl font-bold text-gray-800 mb-2">Sierra Leone Risk Heat Map</h4>
                                <p class="text-gray-600 mb-6">Interactive geographic visualization of GBV incidents and risk levels</p>
                                
                                <!-- Map districts as clickable areas -->
                                <div class="grid grid-cols-4 gap-2 max-w-md mx-auto">
                                    ${this.districts.map(district => `
                                        <div class="district-marker ${this.getRiskColorClass(district.riskLevel)} p-2 rounded cursor-pointer hover:scale-105 transform transition-transform"
                                             onclick="geographicIntelligence.showDistrictDetails('${district.name}')">
                                            <div class="text-xs font-medium">${district.name.split(' ')[0]}</div>
                                            <div class="text-xs">${district.cases} cases</div>
                                        </div>
                                    `).join('')}
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

                    <div class="mt-6 pt-4 border-t">
                        <h4 class="font-medium text-gray-900 mb-3">Population at Risk</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span>High Risk Areas</span>
                                <span class="font-medium">2.1M people</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Children (0-17)</span>
                                <span class="font-medium">856K children</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Women (18-49)</span>
                                <span class="font-medium">721K women</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hotspot Analysis -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Incident Hotspot Patterns</h3>
                    <canvas id="hotspot-pattern-chart" width="400" height="300"></canvas>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Resource Allocation Map</h3>
                    <canvas id="resource-allocation-chart" width="400" height="300"></canvas>
                </div>
            </div>

            <!-- District Details Table -->
            <div class="bg-white rounded-lg shadow mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900">District-Level Intelligence</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cases (YTD)</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="district-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Table content will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Real-time Alerts -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Real-time Geographic Alerts</h3>
                <div id="geographic-alerts" class="space-y-3">
                    <!-- Alerts will be populated by JavaScript -->
                </div>
            </div>
        `;
        
        console.log('✅ Geographic section content populated successfully!');
        this.populateGeographicData();
    }

    getRiskColorClass(riskLevel) {
        const colorMap = {
            'critical': 'bg-red-500 text-white',
            'high': 'bg-orange-500 text-white',
            'medium': 'bg-yellow-500 text-white',
            'low': 'bg-green-500 text-white'
        };
        return colorMap[riskLevel] || 'bg-gray-500 text-white';
    }

    populateGeographicData() {
        this.populateDistrictTable();
        this.renderHotspotChart();
        this.renderResourceAllocationChart();
        this.populateRealTimeAlerts();
    }

    populateDistrictTable() {
        const tbody = document.getElementById('district-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.districts.map(district => {
            const riskBadgeClass = this.getRiskBadgeClass(district.riskLevel);
            const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
            const trendIcon = trend === 'increasing' ? 'fa-arrow-up text-red-500' : 'fa-arrow-down text-green-500';
            const services = Math.floor(Math.random() * 8) + 3; // 3-10 services

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${district.name}</div>
                        <div class="text-sm text-gray-500">Lat: ${district.lat.toFixed(3)}, Lng: ${district.lng.toFixed(3)}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${district.population.toLocaleString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${district.cases}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskBadgeClass}">
                            ${district.riskLevel}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <i class="fas ${trendIcon} mr-1"></i>
                        ${trend}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${services} active
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="geographicIntelligence.viewDistrictMap('${district.name}')">
                            <i class="fas fa-map"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-900" onclick="geographicIntelligence.showDistrictAnalysis('${district.name}')">
                            <i class="fas fa-chart-bar"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getRiskBadgeClass(riskLevel) {
        const badgeMap = {
            'critical': 'bg-red-100 text-red-800',
            'high': 'bg-orange-100 text-orange-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'low': 'bg-green-100 text-green-800'
        };
        return badgeMap[riskLevel] || 'bg-gray-100 text-gray-800';
    }

    renderHotspotChart() {
        const ctx = document.getElementById('hotspot-pattern-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        const timeLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM', '3AM'];
        const hotspotData = [12, 19, 23, 35, 45, 38, 22, 8];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Incident Reports by Time',
                    data: hotspotData,
                    borderColor: 'rgba(239, 68, 68, 1)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '24-Hour Incident Pattern Analysis'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Incidents'
                        }
                    }
                }
            }
        });
    }

    renderResourceAllocationChart() {
        const ctx = document.getElementById('resource-allocation-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        const districtNames = this.districts.slice(0, 8).map(d => d.name.split(' ')[0]);
        const resourceData = this.districts.slice(0, 8).map(d => Math.floor(d.population / 10000));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: districtNames,
                datasets: [{
                    label: 'Resource Units Allocated',
                    data: resourceData,
                    backgroundColor: [
                        '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
                        '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Resource Allocation by District'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Resource Units'
                        }
                    }
                }
            }
        });
    }

    populateRealTimeAlerts() {
        const container = document.getElementById('geographic-alerts');
        if (!container) return;

        const alerts = [
            {
                type: 'critical',
                message: 'Spike in incidents detected in Bonthe District - 3 new cases in last 24 hours',
                time: '15 minutes ago',
                location: 'Bonthe'
            },
            {
                type: 'warning',
                message: 'Resource shortage alert: Kailahun District needs additional counselors',
                time: '1 hour ago',
                location: 'Kailahun'
            },
            {
                type: 'info',
                message: 'New service provider registered in Bo District - Expanded coverage available',
                time: '2 hours ago',
                location: 'Bo'
            },
            {
                type: 'success',
                message: 'Successful case resolution reported in Western Area Urban',
                time: '4 hours ago',
                location: 'Western Area Urban'
            }
        ];

        container.innerHTML = alerts.map(alert => {
            const alertColor = {
                'critical': 'border-red-200 bg-red-50 text-red-800',
                'warning': 'border-yellow-200 bg-yellow-50 text-yellow-800',
                'info': 'border-blue-200 bg-blue-50 text-blue-800',
                'success': 'border-green-200 bg-green-50 text-green-800'
            }[alert.type];

            const alertIcon = {
                'critical': 'fa-exclamation-triangle text-red-500',
                'warning': 'fa-exclamation-circle text-yellow-500',
                'info': 'fa-info-circle text-blue-500',
                'success': 'fa-check-circle text-green-500'
            }[alert.type];

            return `
                <div class="border rounded-lg p-4 ${alertColor}">
                    <div class="flex items-start">
                        <i class="fas ${alertIcon} mr-3 mt-0.5"></i>
                        <div class="flex-1">
                            <p class="text-sm font-medium">${alert.message}</p>
                            <div class="flex items-center mt-2 text-xs opacity-75">
                                <i class="fas fa-clock mr-1"></i>
                                <span class="mr-4">${alert.time}</span>
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                <span>${alert.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Public methods for interactions
    showDistrictDetails(districtName) {
        const district = this.districts.find(d => d.name === districtName);
        if (district) {
            alert(`${district.name} District Details:\\n\\nPopulation: ${district.population.toLocaleString()}\\nRisk Level: ${district.riskLevel}\\nCases YTD: ${district.cases}\\nCoordinates: ${district.lat}, ${district.lng}`);
        }
    }

    viewDistrictMap(districtName) {
        console.log(`Opening detailed map view for ${districtName}`);
        // In production, would open detailed district map
    }

    showDistrictAnalysis(districtName) {
        console.log(`Opening analysis dashboard for ${districtName}`);
        // In production, would open district-specific analytics
    }

    // Public API
    isInitialized() {
        return this.initialized;
    }
}

// Initialize geographic intelligence system
window.geographicIntelligence = new GeographicIntelligence();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeographicIntelligence;
}