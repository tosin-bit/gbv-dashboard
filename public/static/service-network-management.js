// Service Network Management Module - Comprehensive Provider Coordination System
console.log('🏥 Service Network Management Module Loading...');

// Service Network Management System for Ministry GBV Dashboard
window.serviceNetworkManagement = (function() {
    
    // Sample comprehensive service provider data for Sierra Leone
    const serviceProviders = [
        {
            id: 1,
            name: "Rainbow Centre - Freetown",
            type: "Medical & Psychosocial",
            district: "Western Area Urban",
            services: ["Medical Care", "Counseling", "Legal Aid", "Safe House"],
            capacity: 150,
            currentLoad: 89,
            performance: 94,
            contact: "+232-76-123456",
            coordinator: "Dr. Sarah Johnson",
            certifications: ["WHO Certified", "UNICEF Partner"],
            specializations: ["Child Protection", "Sexual Violence", "Domestic Violence"],
            rating: 4.8,
            casesHandled: 234,
            responseTime: "2.3 hours",
            successRate: 92,
            lastUpdated: "2024-01-15"
        },
        {
            id: 2,
            name: "Safe Haven Shelter - Bo",
            type: "Accommodation & Protection",
            district: "Bo",
            services: ["Emergency Shelter", "Security", "Basic Needs", "Referral"],
            capacity: 75,
            currentLoad: 45,
            performance: 88,
            contact: "+232-78-987654",
            coordinator: "Mary Kamara",
            certifications: ["National Standards", "Ministry Approved"],
            specializations: ["Emergency Response", "Family Mediation"],
            rating: 4.6,
            casesHandled: 167,
            responseTime: "1.8 hours",
            successRate: 89,
            lastUpdated: "2024-01-14"
        },
        {
            id: 3,
            name: "Legal Aid Clinic - Kenema",
            type: "Legal Services",
            district: "Kenema",
            services: ["Legal Consultation", "Court Representation", "Documentation", "Rights Education"],
            capacity: 100,
            currentLoad: 78,
            performance: 91,
            contact: "+232-77-456789",
            coordinator: "Barrister John Sesay",
            certifications: ["Bar Association", "Human Rights Certified"],
            specializations: ["Criminal Law", "Family Law", "Human Rights"],
            rating: 4.7,
            casesHandled: 189,
            responseTime: "3.1 hours",
            successRate: 87,
            lastUpdated: "2024-01-15"
        },
        {
            id: 4,
            name: "Community Health Center - Makeni",
            type: "Healthcare",
            district: "Bombali",
            services: ["Medical Examination", "Treatment", "Mental Health", "Rehabilitation"],
            capacity: 200,
            currentLoad: 156,
            performance: 85,
            contact: "+232-79-321654",
            coordinator: "Dr. Aminata Bangura",
            certifications: ["Ministry of Health", "UNFPA Partner"],
            specializations: ["Trauma Care", "Mental Health", "Reproductive Health"],
            rating: 4.5,
            casesHandled: 312,
            responseTime: "1.5 hours",
            successRate: 94,
            lastUpdated: "2024-01-15"
        },
        {
            id: 5,
            name: "Women's Empowerment Center - Port Loko",
            type: "Empowerment & Training",
            district: "Port Loko",
            services: ["Skills Training", "Economic Empowerment", "Advocacy", "Support Groups"],
            capacity: 80,
            currentLoad: 62,
            performance: 92,
            contact: "+232-76-654321",
            coordinator: "Fatmata Koroma",
            certifications: ["UN Women Partner", "Skills Training Certified"],
            specializations: ["Economic Empowerment", "Leadership Training"],
            rating: 4.9,
            casesHandled: 145,
            responseTime: "4.2 hours",
            successRate: 96,
            lastUpdated: "2024-01-14"
        }
    ];

    // Referral network data
    const referralNetwork = [
        {
            fromProvider: "Rainbow Centre - Freetown",
            toProvider: "Safe Haven Shelter - Bo",
            referralCount: 23,
            successRate: 91,
            avgProcessingTime: "4.5 hours",
            type: "Emergency Accommodation"
        },
        {
            fromProvider: "Legal Aid Clinic - Kenema",
            toProvider: "Rainbow Centre - Freetown",
            referralCount: 18,
            successRate: 89,
            avgProcessingTime: "2.1 hours",
            type: "Medical Support"
        },
        {
            fromProvider: "Community Health Center - Makeni",
            toProvider: "Women's Empowerment Center - Port Loko",
            referralCount: 31,
            successRate: 94,
            avgProcessingTime: "6.3 hours",
            type: "Economic Empowerment"
        }
    ];

    // Performance metrics
    const networkMetrics = {
        totalProviders: 5,
        activeReferrals: 72,
        avgResponseTime: "2.8 hours",
        networkEfficiency: 91,
        totalCapacity: 605,
        currentUtilization: 430,
        satisfactionScore: 4.7,
        monthlyGrowth: 8.3
    };

    // Geographic coverage data
    const coverageData = [
        { district: "Western Area Urban", providers: 1, coverage: 95, population: 1200000 },
        { district: "Bo", providers: 1, coverage: 78, population: 654000 },
        { district: "Kenema", providers: 1, coverage: 82, population: 609000 },
        { district: "Bombali", providers: 1, coverage: 71, population: 606000 },
        { district: "Port Loko", providers: 1, coverage: 68, population: 614000 },
        { district: "Tonkolili", providers: 0, coverage: 45, population: 531000 },
        { district: "Kailahun", providers: 0, coverage: 52, population: 525000 },
        { district: "Kono", providers: 0, coverage: 48, population: 505000 }
    ];

    // Initialize service network management
    function initializeServiceNetwork() {
        console.log('🚀 Initializing Service Network Management System...');
        
        // Create the service network section
        createServiceNetworkSection();
        
        // Populate network data
        populateNetworkMetrics();
        populateProviderDirectory();
        populateReferralNetwork();
        populateCoverageAnalysis();
        populatePerformanceCharts();
        
        // Set up interactive features
        setupNetworkEventListeners();
        
        console.log('✅ Service Network Management System initialized successfully!');
    }

    // Create service network section HTML
    function createServiceNetworkSection() {
        const existingSection = document.getElementById('service-network-section');
        if (existingSection) {
            existingSection.remove();
        }

        const section = document.createElement('div');
        section.id = 'service-network-section';
        section.className = 'hidden space-y-6';
        section.innerHTML = `
            <!-- Service Network Header -->
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-network-wired mr-3"></i>
                            Service Network Management
                        </h2>
                        <p class="text-purple-100">Comprehensive Provider Coordination & Performance Monitoring</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" id="network-efficiency">91%</div>
                        <div class="text-sm text-purple-200">Network Efficiency</div>
                    </div>
                </div>
            </div>

            <!-- Network Metrics Dashboard -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Total Providers</p>
                            <p class="text-3xl font-bold text-gray-900" id="total-providers">5</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full">
                            <i class="fas fa-hospital text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Active Referrals</p>
                            <p class="text-3xl font-bold text-gray-900" id="active-referrals">72</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full">
                            <i class="fas fa-exchange-alt text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Avg Response</p>
                            <p class="text-3xl font-bold text-gray-900" id="avg-response">2.8h</p>
                        </div>
                        <div class="p-3 bg-yellow-100 rounded-full">
                            <i class="fas fa-clock text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Satisfaction</p>
                            <p class="text-3xl font-bold text-gray-900" id="satisfaction-score">4.7/5</p>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-full">
                            <i class="fas fa-star text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Provider Directory -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-building mr-2 text-purple-600"></i>
                            Service Provider Directory
                        </h3>
                        <div class="flex space-x-2">
                            <select id="provider-filter" class="border border-gray-300 rounded-md px-3 py-2">
                                <option value="">All Types</option>
                                <option value="Medical & Psychosocial">Medical & Psychosocial</option>
                                <option value="Accommodation & Protection">Accommodation & Protection</option>
                                <option value="Legal Services">Legal Services</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Empowerment & Training">Empowerment & Training</option>
                            </select>
                            <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                                <i class="fas fa-plus mr-2"></i>Add Provider
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div id="provider-directory" class="space-y-4"></div>
                </div>
            </div>

            <!-- Referral Network Analysis -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-project-diagram mr-2 text-indigo-600"></i>
                            Referral Network Flow
                        </h3>
                    </div>
                    <div class="p-6">
                        <div id="referral-network-chart"></div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-chart-line mr-2 text-green-600"></i>
                            Performance Trends
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="network-performance-chart" width="400" height="250"></canvas>
                    </div>
                </div>
            </div>

            <!-- Coverage Analysis -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-map-marked-alt mr-2 text-red-600"></i>
                        Geographic Coverage Analysis
                    </h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2">
                            <canvas id="coverage-chart" width="600" height="300"></canvas>
                        </div>
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Coverage Statistics</h4>
                            <div id="coverage-stats" class="space-y-2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Real-time Alerts -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-bell mr-2 text-orange-600"></i>
                        Real-time Network Alerts
                    </h3>
                </div>
                <div class="p-6">
                    <div id="network-alerts" class="space-y-3"></div>
                </div>
            </div>
        `;

        // Append to the dashboard container
        const dashboardContainer = document.querySelector('.min-h-screen .max-w-7xl');
        if (dashboardContainer) {
            dashboardContainer.appendChild(section);
        }
    }

    // Populate network metrics
    function populateNetworkMetrics() {
        document.getElementById('network-efficiency').textContent = `${networkMetrics.networkEfficiency}%`;
        document.getElementById('total-providers').textContent = networkMetrics.totalProviders;
        document.getElementById('active-referrals').textContent = networkMetrics.activeReferrals;
        document.getElementById('avg-response').textContent = networkMetrics.avgResponseTime;
        document.getElementById('satisfaction-score').textContent = `${networkMetrics.satisfactionScore}/5`;
    }

    // Populate provider directory
    function populateProviderDirectory() {
        const directory = document.getElementById('provider-directory');
        if (!directory) return;

        directory.innerHTML = serviceProviders.map(provider => {
            const utilizationPercentage = Math.round((provider.currentLoad / provider.capacity) * 100);
            const utilizationColor = utilizationPercentage > 80 ? 'text-red-600' : utilizationPercentage > 60 ? 'text-yellow-600' : 'text-green-600';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <h4 class="text-lg font-semibold text-gray-900">${provider.name}</h4>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    ${provider.type}
                                </span>
                                <div class="flex items-center">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm"></i>`
                                    ).join('')}
                                    <span class="ml-1 text-sm text-gray-600">(${provider.rating})</span>
                                </div>
                            </div>
                            
                            <div class="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <p class="text-sm text-gray-600">District</p>
                                    <p class="font-medium">${provider.district}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Coordinator</p>
                                    <p class="font-medium">${provider.coordinator}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Cases Handled</p>
                                    <p class="font-medium">${provider.casesHandled}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Response Time</p>
                                    <p class="font-medium">${provider.responseTime}</p>
                                </div>
                            </div>
                            
                            <div class="mt-3 flex flex-wrap gap-2">
                                ${provider.services.map(service => 
                                    `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">${service}</span>`
                                ).join('')}
                            </div>
                            
                            <div class="mt-3 flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="text-sm">
                                        <span class="text-gray-600">Capacity:</span>
                                        <span class="${utilizationColor} font-medium">${provider.currentLoad}/${provider.capacity}</span>
                                        <span class="text-gray-500">(${utilizationPercentage}%)</span>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Performance:</span>
                                        <span class="text-green-600 font-medium">${provider.performance}%</span>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Success Rate:</span>
                                        <span class="text-blue-600 font-medium">${provider.successRate}%</span>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        <i class="fas fa-eye mr-1"></i>View Details
                                    </button>
                                    <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                        <i class="fas fa-phone mr-1"></i>Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate referral network
    function populateReferralNetwork() {
        const networkChart = document.getElementById('referral-network-chart');
        if (!networkChart) return;

        networkChart.innerHTML = `
            <div class="space-y-4">
                ${referralNetwork.map(referral => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="flex-shrink-0">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-900">${referral.fromProvider}</p>
                                <p class="text-xs text-gray-500">to ${referral.toProvider}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium text-gray-900">${referral.referralCount} referrals</div>
                            <div class="text-xs text-green-600">${referral.successRate}% success</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Populate coverage analysis
    function populateCoverageAnalysis() {
        const coverageStats = document.getElementById('coverage-stats');
        if (!coverageStats) return;

        const totalCoverage = Math.round(coverageData.reduce((sum, d) => sum + d.coverage, 0) / coverageData.length);
        const coveredDistricts = coverageData.filter(d => d.providers > 0).length;
        const underservedDistricts = coverageData.filter(d => d.coverage < 60).length;

        coverageStats.innerHTML = `
            <div class="bg-blue-50 p-3 rounded-lg">
                <div class="text-lg font-bold text-blue-600">${totalCoverage}%</div>
                <div class="text-sm text-blue-800">Average Coverage</div>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
                <div class="text-lg font-bold text-green-600">${coveredDistricts}/16</div>
                <div class="text-sm text-green-800">Districts Served</div>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
                <div class="text-lg font-bold text-red-600">${underservedDistricts}</div>
                <div class="text-sm text-red-800">Underserved Areas</div>
            </div>
            <div class="bg-yellow-50 p-3 rounded-lg">
                <div class="text-lg font-bold text-yellow-600">${Math.round(networkMetrics.currentUtilization / networkMetrics.totalCapacity * 100)}%</div>
                <div class="text-sm text-yellow-800">Network Utilization</div>
            </div>
        `;
    }

    // Create performance charts
    function populatePerformanceCharts() {
        // Network performance trend chart
        setTimeout(() => {
            const ctx = document.getElementById('network-performance-chart');
            if (ctx && typeof Chart !== 'undefined') {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                label: 'Network Efficiency',
                                data: [85, 87, 89, 91, 90, 91],
                                borderColor: 'rgb(59, 130, 246)',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                tension: 0.4
                            },
                            {
                                label: 'Response Time',
                                data: [3.2, 3.0, 2.9, 2.8, 2.9, 2.8],
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

            // Coverage chart
            const coverageCtx = document.getElementById('coverage-chart');
            if (coverageCtx && typeof Chart !== 'undefined') {
                new Chart(coverageCtx, {
                    type: 'bar',
                    data: {
                        labels: coverageData.map(d => d.district),
                        datasets: [{
                            label: 'Coverage %',
                            data: coverageData.map(d => d.coverage),
                            backgroundColor: coverageData.map(d => 
                                d.coverage >= 80 ? 'rgba(34, 197, 94, 0.8)' :
                                d.coverage >= 60 ? 'rgba(234, 179, 8, 0.8)' :
                                'rgba(239, 68, 68, 0.8)'
                            )
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
                                max: 100
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
        }, 1000);
    }

    // Generate network alerts
    function generateNetworkAlerts() {
        const alerts = [
            {
                type: 'warning',
                message: 'Community Health Center - Makeni approaching capacity (78% utilization)',
                time: '2 minutes ago',
                action: 'Review capacity planning'
            },
            {
                type: 'success',
                message: 'New referral partnership established with Legal Aid Clinic - Kenema',
                time: '15 minutes ago',
                action: 'Update network mapping'
            },
            {
                type: 'info',
                message: 'Monthly performance review scheduled for all providers',
                time: '1 hour ago',
                action: 'Prepare evaluation metrics'
            },
            {
                type: 'error',
                message: 'Service gap identified in Tonkolili District - requires immediate attention',
                time: '3 hours ago',
                action: 'Develop expansion plan'
            }
        ];

        const alertsContainer = document.getElementById('network-alerts');
        if (!alertsContainer) return;

        alertsContainer.innerHTML = alerts.map(alert => {
            const iconClass = {
                warning: 'fa-exclamation-triangle text-yellow-600',
                success: 'fa-check-circle text-green-600',
                info: 'fa-info-circle text-blue-600',
                error: 'fa-times-circle text-red-600'
            }[alert.type];

            const bgClass = {
                warning: 'bg-yellow-50 border-yellow-200',
                success: 'bg-green-50 border-green-200',
                info: 'bg-blue-50 border-blue-200',
                error: 'bg-red-50 border-red-200'
            }[alert.type];

            return `
                <div class="flex items-start space-x-3 p-3 ${bgClass} border rounded-lg">
                    <i class="fas ${iconClass} mt-1"></i>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">${alert.message}</p>
                        <p class="text-xs text-gray-500 mt-1">${alert.time}</p>
                        <button class="text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium">
                            ${alert.action} →
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Set up event listeners
    function setupNetworkEventListeners() {
        // Provider filter
        const providerFilter = document.getElementById('provider-filter');
        if (providerFilter) {
            providerFilter.addEventListener('change', function() {
                filterProviders(this.value);
            });
        }
    }

    // Filter providers by type
    function filterProviders(type) {
        const directory = document.getElementById('provider-directory');
        if (!directory) return;

        const filteredProviders = type ? serviceProviders.filter(p => p.type === type) : serviceProviders;
        
        // Re-populate with filtered data
        directory.innerHTML = filteredProviders.map(provider => {
            // Same provider card template as above
            const utilizationPercentage = Math.round((provider.currentLoad / provider.capacity) * 100);
            const utilizationColor = utilizationPercentage > 80 ? 'text-red-600' : utilizationPercentage > 60 ? 'text-yellow-600' : 'text-green-600';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <h4 class="text-lg font-semibold text-gray-900">${provider.name}</h4>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    ${provider.type}
                                </span>
                                <div class="flex items-center">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm"></i>`
                                    ).join('')}
                                    <span class="ml-1 text-sm text-gray-600">(${provider.rating})</span>
                                </div>
                            </div>
                            
                            <div class="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <p class="text-sm text-gray-600">District</p>
                                    <p class="font-medium">${provider.district}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Coordinator</p>
                                    <p class="font-medium">${provider.coordinator}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Cases Handled</p>
                                    <p class="font-medium">${provider.casesHandled}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Response Time</p>
                                    <p class="font-medium">${provider.responseTime}</p>
                                </div>
                            </div>
                            
                            <div class="mt-3 flex flex-wrap gap-2">
                                ${provider.services.map(service => 
                                    `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">${service}</span>`
                                ).join('')}
                            </div>
                            
                            <div class="mt-3 flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="text-sm">
                                        <span class="text-gray-600">Capacity:</span>
                                        <span class="${utilizationColor} font-medium">${provider.currentLoad}/${provider.capacity}</span>
                                        <span class="text-gray-500">(${utilizationPercentage}%)</span>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Performance:</span>
                                        <span class="text-green-600 font-medium">${provider.performance}%</span>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Success Rate:</span>
                                        <span class="text-blue-600 font-medium">${provider.successRate}%</span>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        <i class="fas fa-eye mr-1"></i>View Details
                                    </button>
                                    <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                        <i class="fas fa-phone mr-1"></i>Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Public methods
    return {
        init: initializeServiceNetwork,
        populateData: function() {
            populateNetworkMetrics();
            populateProviderDirectory();
            populateReferralNetwork();
            populateCoverageAnalysis();
            populatePerformanceCharts();
            generateNetworkAlerts();
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.serviceNetworkManagement.init(), 500);
    });
} else {
    setTimeout(() => window.serviceNetworkManagement.init(), 500);
}

console.log('🏥 Service Network Management Module - Fully Loaded!');
console.log('🔥 Comprehensive provider coordination system ready for Ministry demonstration');