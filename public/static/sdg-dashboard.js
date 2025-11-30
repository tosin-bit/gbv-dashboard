/**
 * SDG Alignment Dashboard
 * Track progress against UN Sustainable Development Goals 5 & 16
 * Specifically designed for international donor reporting (EU, UN, World Bank)
 */

function loadSDGDashboard(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Back Button -->
            <div class="mb-4">
                <button onclick="loadSpotlightInitiative(document.getElementById('spotlight-initiative-section'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Spotlight Initiative Hub
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-bullseye mr-3"></i>SDG Alignment Dashboard
                        </h2>
                        <p class="text-blue-100 text-lg">
                            Sustainable Development Goals 5 & 16 - Gender Equality & Peace, Justice, Strong Institutions
                        </p>
                        <div class="flex items-center space-x-4 mt-3">
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-globe mr-2"></i>UN 2030 Agenda
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-chart-line mr-2"></i>Real-time Tracking
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-file-export mr-2"></i>Donor-Ready Reports
                            </span>
                        </div>
                    </div>
                    <button onclick="exportSDGReport()" 
                            class="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                        <i class="fas fa-download mr-2"></i>Export SDG Report
                    </button>
                </div>
            </div>

            <!-- SDG Progress Overview -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- SDG 5: Gender Equality -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-2xl font-bold mb-1">SDG 5: Gender Equality</h3>
                                <p class="text-pink-100 text-sm">Achieve gender equality and empower all women and girls</p>
                            </div>
                            <div class="text-6xl opacity-20">
                                <i class="fas fa-venus"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6 space-y-4">
                        <!-- SDG 5.2.1 -->
                        <div class="border-l-4 border-pink-500 pl-4">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-semibold text-gray-900">Indicator 5.2.1</h4>
                                    <p class="text-sm text-gray-600">Proportion of women subjected to violence by intimate partner</p>
                                </div>
                                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                    <i class="fas fa-exclamation-triangle mr-1"></i>Off Track
                                </span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-gray-600">Current Rate</span>
                                    <span class="font-semibold text-pink-600">37.2%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full bg-pink-500" style="width: 37.2%;"></div>
                                </div>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span>Target: <20% by 2030</span>
                                    <span>Progress: 12.8% improvement since 2020</span>
                                </div>
                            </div>
                        </div>

                        <!-- SDG 5.2.2 -->
                        <div class="border-l-4 border-purple-500 pl-4">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-semibold text-gray-900">Indicator 5.2.2</h4>
                                    <p class="text-sm text-gray-600">Proportion of women subjected to sexual violence by non-partner</p>
                                </div>
                                <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                    <i class="fas fa-times-circle mr-1"></i>Critical
                                </span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-gray-600">Current Rate</span>
                                    <span class="font-semibold text-purple-600">18.7%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full bg-purple-500" style="width: 18.7%;"></div>
                                </div>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span>Target: <10% by 2030</span>
                                    <span>Trend: +2.3% increase last year</span>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Metrics -->
                        <div class="bg-pink-50 rounded-lg p-4 mt-4">
                            <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                                <i class="fas fa-chart-bar text-pink-600 mr-2"></i>
                                Supporting Metrics
                            </h5>
                            <div class="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div class="text-gray-600">Cases Reported</div>
                                    <div class="text-xl font-bold text-pink-600">2,871</div>
                                    <div class="text-xs text-gray-500">2025 YTD</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Survivors Served</div>
                                    <div class="text-xl font-bold text-pink-600">2,403</div>
                                    <div class="text-xs text-gray-500">83.7% coverage</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Prevention Programs</div>
                                    <div class="text-xl font-bold text-pink-600">124</div>
                                    <div class="text-xs text-gray-500">Active initiatives</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Prosecutions</div>
                                    <div class="text-xl font-bold text-pink-600">187</div>
                                    <div class="text-xs text-gray-500">6.5% conviction rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SDG 16: Peace, Justice & Strong Institutions -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-2xl font-bold mb-1">SDG 16: Peace & Justice</h3>
                                <p class="text-blue-100 text-sm">Promote peaceful and inclusive societies for sustainable development</p>
                            </div>
                            <div class="text-6xl opacity-20">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6 space-y-4">
                        <!-- SDG 16.2.3 -->
                        <div class="border-l-4 border-blue-500 pl-4">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-semibold text-gray-900">Indicator 16.2.3</h4>
                                    <p class="text-sm text-gray-600">Proportion of young women subjected to sexual violence (18-29 years)</p>
                                </div>
                                <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                                    <i class="fas fa-clock mr-1"></i>Moderate
                                </span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-gray-600">Current Rate</span>
                                    <span class="font-semibold text-blue-600">24.3%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full bg-blue-500" style="width: 24.3%;"></div>
                                </div>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span>Target: <15% by 2030</span>
                                    <span>Progress: 5.7% reduction since 2020</span>
                                </div>
                            </div>
                        </div>

                        <!-- Access to Justice Metrics -->
                        <div class="border-l-4 border-indigo-500 pl-4">
                            <div class="mb-2">
                                <h4 class="font-semibold text-gray-900">Access to Justice</h4>
                                <p class="text-sm text-gray-600">Survivors accessing legal services and seeing cases resolved</p>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-gray-600">Legal Aid Access</span>
                                    <span class="font-semibold text-indigo-600">41.2%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full bg-indigo-500" style="width: 41.2%;"></div>
                                </div>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span>Target: >75% by 2030</span>
                                    <span>Trend: +8.4% increase</span>
                                </div>
                            </div>
                        </div>

                        <!-- Supporting Metrics -->
                        <div class="bg-blue-50 rounded-lg p-4 mt-4">
                            <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                                <i class="fas fa-gavel text-blue-600 mr-2"></i>
                                Justice System Performance
                            </h5>
                            <div class="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div class="text-gray-600">Cases in Court</div>
                                    <div class="text-xl font-bold text-blue-600">312</div>
                                    <div class="text-xs text-gray-500">Active litigation</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Avg. Case Duration</div>
                                    <div class="text-xl font-bold text-blue-600">18.3m</div>
                                    <div class="text-xs text-gray-500">Months to resolution</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Police FSU Response</div>
                                    <div class="text-xl font-bold text-blue-600">< 24h</div>
                                    <div class="text-xs text-gray-500">Average response time</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">Successful Convictions</div>
                                    <div class="text-xl font-bold text-blue-600">187</div>
                                    <div class="text-xs text-gray-500">2025 YTD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Timeline -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-chart-line mr-3"></i>SDG Progress Timeline (2020-2030)
                </h3>
                <div class="h-80">
                    <canvas id="sdg-timeline-chart"></canvas>
                </div>
                <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <div class="flex items-center text-green-700 mb-2">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span class="font-semibold">On Track</span>
                        </div>
                        <p class="text-gray-700">Response time improvements, service coverage expansion</p>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <div class="flex items-center text-yellow-700 mb-2">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <span class="font-semibold">Needs Acceleration</span>
                        </div>
                        <p class="text-gray-700">Prevention programs, education campaigns</p>
                    </div>
                    <div class="bg-red-50 p-4 rounded-lg">
                        <div class="flex items-center text-red-700 mb-2">
                            <i class="fas fa-times-circle mr-2"></i>
                            <span class="font-semibold">Critical Gaps</span>
                        </div>
                        <p class="text-gray-700">Prosecution rates, rural service access</p>
                    </div>
                </div>
            </div>

            <!-- District-Level SDG Performance -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-map-marked-alt mr-3"></i>District-Level SDG Performance
                </h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead>
                            <tr class="bg-gray-50 border-b">
                                <th class="px-4 py-3 text-left font-semibold">District</th>
                                <th class="px-4 py-3 text-center font-semibold">SDG 5.2.1</th>
                                <th class="px-4 py-3 text-center font-semibold">SDG 5.2.2</th>
                                <th class="px-4 py-3 text-center font-semibold">SDG 16.2.3</th>
                                <th class="px-4 py-3 text-center font-semibold">Overall Score</th>
                                <th class="px-4 py-3 text-center font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody id="district-sdg-table">
                            <!-- Populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- International Commitments -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-handshake mr-3"></i>International Commitments & Compliance
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- CEDAW Compliance -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-book-open text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">CEDAW Convention</h4>
                                <p class="text-xs text-gray-500">Convention on Elimination of Discrimination Against Women</p>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Reporting Compliance</span>
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Current</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Last Report</span>
                                <span class="font-semibold">March 2024</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Next Report Due</span>
                                <span class="font-semibold">March 2028</span>
                            </div>
                        </div>
                    </div>

                    <!-- Spotlight Initiative -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-sun text-yellow-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">UN Spotlight Initiative</h4>
                                <p class="text-xs text-gray-500">EU-UN Partnership to Eliminate VAWG</p>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Program Status</span>
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">Active</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Pillar Achievement</span>
                                <span class="font-semibold">4 of 6 Complete</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Budget Utilization</span>
                                <span class="font-semibold">$2.3M / $4.1M</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recommendations for SDG Achievement -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <h3 class="text-xl font-semibold mb-4 flex items-center text-green-900">
                    <i class="fas fa-lightbulb mr-3"></i>Priority Actions for SDG Achievement
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <span class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                            <h4 class="font-semibold text-gray-900">Increase Prosecution Rate</h4>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">Strengthen Fast Track Courts and FSU capacity</p>
                        <div class="text-xs text-green-700">
                            <strong>Impact:</strong> Move SDG 16.2.3 from Moderate to On Track
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <span class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                            <h4 class="font-semibold text-gray-900">Expand Prevention Programs</h4>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">Scale community education and awareness campaigns</p>
                        <div class="text-xs text-green-700">
                            <strong>Impact:</strong> Reduce SDG 5.2.1 rate by estimated 8-12%
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <span class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                            <h4 class="font-semibold text-gray-900">Rural Service Access</h4>
                        </div>
                        <p class="text-sm text-gray-700 mb-2">Deploy mobile Rainbo units to underserved districts</p>
                        <div class="text-xs text-green-700">
                            <strong>Impact:</strong> Increase service coverage from 83.7% to >95%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize charts and table
    setTimeout(() => {
        initializeSDGCharts();
        populateDistrictSDGTable();
    }, 500);
}

function initializeSDGCharts() {
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet');
        return;
    }
    
    // SDG Timeline Chart
    const ctx = document.getElementById('sdg-timeline-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    {
                        label: 'SDG 5.2.1 (Target: 20%)',
                        data: [50, 47, 44, 41, 39, 37.2, 34, 31, 28, 24, 20],
                        borderColor: '#32cd32',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'SDG 5.2.2 (Target: 10%)',
                        data: [25, 24, 22, 20, 19, 18.7, 17, 15, 13, 11, 10],
                        borderColor: '#1e3a8a',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'SDG 16.2.3 (Target: 15%)',
                        data: [30, 29, 27, 26, 25, 24.3, 22, 20, 18, 16, 15],
                        borderColor: '#1e90ff',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 60,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Prevalence Rate (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        });
    }
}

async function populateDistrictSDGTable() {
    let districts = [
        { name: 'Western Area Urban', sdg521: 42, sdg522: 22, sdg1623: 28, overall: 69, status: 'red', cases: 0 },
        { name: 'Bo', sdg521: 35, sdg522: 18, sdg1623: 24, overall: 74, status: 'yellow', cases: 0 },
        { name: 'Kenema', sdg521: 38, sdg522: 19, sdg1623: 25, overall: 72, status: 'yellow', cases: 0 },
        { name: 'Bombali', sdg521: 33, sdg522: 16, sdg1623: 22, overall: 76, status: 'green', cases: 0 },
        { name: 'Port Loko', sdg521: 31, sdg522: 15, sdg1623: 20, overall: 78, status: 'green', cases: 0 },
        { name: 'Kailahun', sdg521: 36, sdg522: 17, sdg1623: 23, overall: 74, status: 'yellow', cases: 0 },
        { name: 'Kono', sdg521: 34, sdg522: 17, sdg1623: 21, overall: 75, status: 'green', cases: 0 },
        { name: 'Moyamba', sdg521: 32, sdg522: 16, sdg1623: 20, overall: 77, status: 'green', cases: 0 },
        { name: 'Tonkolili', sdg521: 35, sdg522: 18, sdg1623: 23, overall: 74, status: 'yellow', cases: 0 },
        { name: 'Pujehun', sdg521: 30, sdg522: 15, sdg1623: 19, overall: 79, status: 'green', cases: 0 },
        { name: 'Bonthe', sdg521: 29, sdg522: 14, sdg1623: 18, overall: 80, status: 'green', cases: 0 },
        { name: 'Kambia', sdg521: 33, sdg522: 16, sdg1623: 21, overall: 76, status: 'green', cases: 0 },
        { name: 'Koinadugu', sdg521: 31, sdg522: 15, sdg1623: 20, overall: 78, status: 'green', cases: 0 },
        { name: 'Falaba', sdg521: 30, sdg522: 14, sdg1623: 19, overall: 79, status: 'green', cases: 0 },
        { name: 'Karene', sdg521: 32, sdg522: 16, sdg1623: 21, overall: 77, status: 'green', cases: 0 },
        { name: 'Western Area Rural', sdg521: 37, sdg522: 19, sdg1623: 24, overall: 73, status: 'yellow', cases: 0 }
    ];
    
    // Fetch real case data from API
    try {
        const response = await fetch('/api/districts');
        const data = await response.json();
        
        if (data.districts) {
            // Update districts with real case counts
            districts = districts.map(d => {
                const realDistrict = data.districts.find(rd => rd.name === d.name);
                return {
                    ...d,
                    cases: realDistrict ? realDistrict.case_count : 0
                };
            });
        }
    } catch (error) {
        console.log('Could not fetch district data, using default values');
    }
    
    const tbody = document.getElementById('district-sdg-table');
    if (!tbody) return;
    
    tbody.innerHTML = districts.map(d => `
        <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-3">
                <div class="font-medium text-gray-900">${d.name}</div>
                <div class="text-xs text-gray-500 mt-1">
                    <i class="fas fa-folder mr-1" style="color: #1e3a8a;"></i>${d.cases} active case${d.cases !== 1 ? 's' : ''}
                </div>
            </td>
            <td class="px-4 py-3 text-center">
                <span class="inline-flex items-center px-2 py-1 rounded text-sm ${
                    d.sdg521 < 30 ? 'bg-green-100 text-green-800' :
                    d.sdg521 < 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }">
                    ${d.sdg521}%
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <span class="inline-flex items-center px-2 py-1 rounded text-sm ${
                    d.sdg522 < 15 ? 'bg-green-100 text-green-800' :
                    d.sdg522 < 20 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }">
                    ${d.sdg522}%
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <span class="inline-flex items-center px-2 py-1 rounded text-sm ${
                    d.sdg1623 < 20 ? 'bg-green-100 text-green-800' :
                    d.sdg1623 < 25 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }">
                    ${d.sdg1623}%
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div class="h-2 rounded-full ${
                            d.overall >= 75 ? 'bg-green-500' :
                            d.overall >= 65 ? 'bg-yellow-500' :
                            'bg-red-500'
                        }" style="width: ${d.overall}%"></div>
                    </div>
                    <span class="text-sm font-semibold">${d.overall}%</span>
                </div>
            </td>
            <td class="px-4 py-3 text-center">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                    d.status === 'green' ? 'bg-green-100 text-green-800' :
                    d.status === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }">
                    ${d.status === 'green' ? 'On Track' : d.status === 'yellow' ? 'Moderate' : 'Off Track'}
                </span>
            </td>
        </tr>
    `).join('');
}

function exportSDGReport() {
    alert('📊 Exporting SDG Alignment Report...\n\nThis report includes:\n\n✓ SDG 5.2.1, 5.2.2, 16.2.3 indicators\n✓ Progress timeline (2020-2030)\n✓ District-level performance\n✓ Gap analysis\n✓ Recommended interventions\n\nFormat: PDF (Donor-Ready)\nLanguages: English\nCompliance: UN Statistical Commission standards');
}

// Export function
window.loadSDGDashboard = loadSDGDashboard;
window.exportSDGReport = exportSDGReport;
