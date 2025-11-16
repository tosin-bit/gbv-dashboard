/**
 * Real-Time Alert System
 * Phase 2 - Spotlight Initiative Enhancement
 * 
 * Automated alerts for urgent cases, district spikes, service gaps
 * Proactive monitoring and early warning system
 */

// Load Real-Time Alert Dashboard
function loadAlertSystem(section) {
    section.innerHTML = `
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-lg shadow-xl p-8 mb-6 text-white">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-exclamation-triangle text-4xl mr-4"></i>
                        <div>
                            <h1 class="text-3xl font-bold">Real-Time Alert System</h1>
                            <p class="text-red-100 mt-1">Proactive Monitoring & Early Warning Dashboard</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-4 text-sm">
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-red-100">Active Alerts</div>
                            <div class="text-2xl font-bold">23</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-red-100">Critical (24h)</div>
                            <div class="text-2xl font-bold">7</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-red-100">Districts Flagged</div>
                            <div class="text-2xl font-bold">4</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-red-100">Resolved Today</div>
                            <div class="text-2xl font-bold">31</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur rounded-lg p-4 ml-6">
                    <div class="text-sm text-red-100 mb-2">Phase 2 Feature</div>
                    <div class="flex items-center space-x-2">
                        <span class="w-3 h-3 rounded-full bg-red-400 animate-pulse"></span>
                        <span class="font-semibold">Live Alerts</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Critical Alerts Requiring Immediate Action -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-red-600">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-siren-on mr-2 text-red-600"></i>
                    Critical Alerts (Require Immediate Action)
                </h3>
                <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold animate-pulse">7 critical</span>
            </div>
            <div class="space-y-3">
                <!-- Alert 1: Delayed Medical Care -->
                <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-clock text-red-600 mr-2"></i>
                                <span class="font-bold text-red-800">URGENT: Delayed Medical Care</span>
                                <span class="ml-2 bg-red-200 text-red-800 px-2 py-0.5 rounded text-xs font-semibold">18 hours overdue</span>
                            </div>
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>Case GBV-2025-2847:</strong> Survivor needs PEP within 72-hour window. Rainbo Center Freetown referral pending - no response for 18 hours.
                            </div>
                            <div class="flex items-center space-x-4 text-xs text-gray-600">
                                <span><i class="fas fa-map-marker-alt mr-1"></i>Western Area Urban</span>
                                <span><i class="fas fa-user mr-1"></i>Age 16</span>
                                <span><i class="fas fa-calendar mr-1"></i>Incident: Oct 15, 2025</span>
                            </div>
                        </div>
                        <button class="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 whitespace-nowrap">
                            <i class="fas fa-phone mr-1"></i>Call Rainbo Now
                        </button>
                    </div>
                </div>

                <!-- Alert 2: Case Spike -->
                <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-chart-line text-orange-600 mr-2"></i>
                                <span class="font-bold text-orange-800">HIGH ALERT: District Case Spike</span>
                                <span class="ml-2 bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-xs font-semibold">+147% this week</span>
                            </div>
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>Bo District:</strong> 34 new cases reported in last 7 days (usual average: 14/week). Pattern suggests systemic issue or community-level event.
                            </div>
                            <div class="flex items-center space-x-4 text-xs text-gray-600">
                                <span><i class="fas fa-exclamation-circle mr-1"></i>3 cases involve same perpetrator</span>
                                <span><i class="fas fa-building mr-1"></i>Same chiefdom</span>
                            </div>
                        </div>
                        <button class="ml-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 whitespace-nowrap">
                            <i class="fas fa-users mr-1"></i>Deploy Response Team
                        </button>
                    </div>
                </div>

                <!-- Alert 3: Service Gap -->
                <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-first-aid text-yellow-600 mr-2"></i>
                                <span class="font-bold text-yellow-800">WARNING: Service Capacity Issue</span>
                                <span class="ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs font-semibold">Critical shortage</span>
                            </div>
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>Kailahun Rainbo Center:</strong> PEP medication stock critically low (3-day supply remaining). 12 pending cases require immediate access.
                            </div>
                            <div class="flex items-center space-x-4 text-xs text-gray-600">
                                <span><i class="fas fa-pills mr-1"></i>PEP: 3 days left</span>
                                <span><i class="fas fa-box mr-1"></i>Resupply: 5 days ETA</span>
                            </div>
                        </div>
                        <button class="ml-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 whitespace-nowrap">
                            <i class="fas fa-truck mr-1"></i>Emergency Resupply
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert Categories Dashboard -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <!-- Urgent Cases -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-gray-800">Urgent Cases</h4>
                    <i class="fas fa-exclamation-circle text-2xl text-red-600"></i>
                </div>
                <div class="text-3xl font-bold text-red-600 mb-2">7</div>
                <div class="text-sm text-gray-600 mb-3">Require action <24h</div>
                <ul class="text-xs space-y-1 text-gray-700">
                    <li>• 3 delayed medical care</li>
                    <li>• 2 missing follow-ups</li>
                    <li>• 2 perpetrator at large</li>
                </ul>
            </div>

            <!-- District Spikes -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-600">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-gray-800">District Spikes</h4>
                    <i class="fas fa-chart-line text-2xl text-orange-600"></i>
                </div>
                <div class="text-3xl font-bold text-orange-600 mb-2">4</div>
                <div class="text-sm text-gray-600 mb-3">Unusual case increases</div>
                <ul class="text-xs space-y-1 text-gray-700">
                    <li>• Bo: +147% (34 cases)</li>
                    <li>• Kailahun: +89% (18 cases)</li>
                    <li>• Port Loko: +67% (21 cases)</li>
                    <li>• Makeni: +43% (14 cases)</li>
                </ul>
            </div>

            <!-- Service Gaps -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-600">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-gray-800">Service Gaps</h4>
                    <i class="fas fa-tools text-2xl text-yellow-600"></i>
                </div>
                <div class="text-3xl font-bold text-yellow-600 mb-2">5</div>
                <div class="text-sm text-gray-600 mb-3">Capacity/supply issues</div>
                <ul class="text-xs space-y-1 text-gray-700">
                    <li>• 2 medical supply shortages</li>
                    <li>• 2 staff unavailable</li>
                    <li>• 1 facility closed (maintenance)</li>
                </ul>
            </div>

            <!-- System Issues -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-bold text-gray-800">System Issues</h4>
                    <i class="fas fa-cog text-2xl text-blue-600"></i>
                </div>
                <div class="text-3xl font-bold text-blue-600 mb-2">7</div>
                <div class="text-sm text-gray-600 mb-3">Process/coordination</div>
                <ul class="text-xs space-y-1 text-gray-700">
                    <li>• 4 delayed court filings</li>
                    <li>• 2 referral acceptance delays</li>
                    <li>• 1 data sync issue</li>
                </ul>
            </div>
        </div>

        <!-- Alert Timeline (Last 7 Days) -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-history mr-2 text-gray-600"></i>
                Alert Activity (Last 7 Days)
            </h3>
            <canvas id="alertTimelineChart" height="250"></canvas>
        </div>

        <!-- District Alert Heatmap -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map text-red-600 mr-2"></i>
                District Alert Heatmap (Current Week)
            </h3>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- High Alert Districts -->
                <div class="bg-red-50 border-2 border-red-400 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Bo</span>
                        <span class="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">CRITICAL</span>
                    </div>
                    <div class="text-2xl font-bold text-red-600 mb-1">11 alerts</div>
                    <div class="text-xs text-gray-600">+147% case spike, 3 urgent cases</div>
                </div>

                <div class="bg-orange-50 border-2 border-orange-400 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Kailahun</span>
                        <span class="bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">HIGH</span>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-1">7 alerts</div>
                    <div class="text-xs text-gray-600">Supply shortage, +89% spike</div>
                </div>

                <div class="bg-orange-50 border-2 border-orange-400 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Port Loko</span>
                        <span class="bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">HIGH</span>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-1">5 alerts</div>
                    <div class="text-xs text-gray-600">+67% case increase</div>
                </div>

                <div class="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Makeni</span>
                        <span class="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">MEDIUM</span>
                    </div>
                    <div class="text-2xl font-bold text-yellow-600 mb-1">3 alerts</div>
                    <div class="text-xs text-gray-600">Staff shortage, +43% spike</div>
                </div>

                <!-- Low/Normal Districts -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Western Area</span>
                        <span class="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">NORMAL</span>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-1">1 alert</div>
                    <div class="text-xs text-gray-600">Operating normally</div>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Kenema</span>
                        <span class="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">NORMAL</span>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-1">0 alerts</div>
                    <div class="text-xs text-gray-600">No issues detected</div>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Bonthe</span>
                        <span class="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">NORMAL</span>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-1">0 alerts</div>
                    <div class="text-xs text-gray-600">Operating smoothly</div>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800">Pujehun</span>
                        <span class="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">NORMAL</span>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-1">0 alerts</div>
                    <div class="text-xs text-gray-600">All systems functional</div>
                </div>
            </div>
        </div>

        <!-- Automated Alert Rules -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-robot mr-2 text-blue-600"></i>
                Automated Alert Rules
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Case-Level Alerts -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-bell text-orange-500 mr-2"></i>Case-Level Triggers
                    </h4>
                    <div class="space-y-2 text-sm">
                        <div class="bg-white rounded p-3">
                            <strong>PEP Window Alert:</strong> If survivor needs PEP and >48 hours since report
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Follow-up Overdue:</strong> If 30/90/180-day follow-up missed by >7 days
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Referral Delay:</strong> If referral pending >12 hours with no response
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Perpetrator Risk:</strong> If perpetrator at large >72 hours post-report
                        </div>
                    </div>
                </div>

                <!-- System-Level Alerts -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-chart-area text-red-500 mr-2"></i>System-Level Triggers
                    </h4>
                    <div class="space-y-2 text-sm">
                        <div class="bg-white rounded p-3">
                            <strong>Case Spike Alert:</strong> If district cases >50% above 4-week average
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Supply Shortage:</strong> If critical medical supplies <7 days remaining
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Service Capacity:</strong> If service provider at >90% capacity
                        </div>
                        <div class="bg-white rounded p-3">
                            <strong>Coordination Gap:</strong> If multi-agency case has >3 days no updates
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Key Findings & Recommendations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Impact Metrics -->
            <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-chart-pie mr-2 text-green-600"></i>
                    Alert System Impact
                </h3>
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Response time improvement</span>
                        <span class="text-lg font-bold text-green-600">-67%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Prevented service gaps</span>
                        <span class="text-lg font-bold text-green-600">94</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Early spike detection (days)</span>
                        <span class="text-lg font-bold text-green-600">2.3</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Critical cases saved</span>
                        <span class="text-lg font-bold text-green-600">47</span>
                    </div>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-lightbulb mr-2 text-blue-600"></i>
                    Priority Actions
                </h3>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Bo District:</strong> Deploy mobile response team to investigate case spike</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Kailahun:</strong> Emergency medical supply delivery by helicopter</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-blue-600 mr-2 mt-1"></i>
                        <span><strong>SMS Alerts:</strong> Implement SMS notifications for critical alerts</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Predictive Analytics:</strong> Train ML model to predict case spikes 7 days early</span>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Mark section as loaded
    section.setAttribute('data-loaded', 'true');

    // Initialize charts
    setTimeout(() => {
        initializeAlertSystemCharts();
    }, 100);
}

// Initialize charts for Alert System
function initializeAlertSystemCharts() {
    // Alert Timeline Chart
    const alertTimelineCtx = document.getElementById('alertTimelineChart');
    if (alertTimelineCtx) {
        new Chart(alertTimelineCtx, {
            type: 'line',
            data: {
                labels: ['Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16'],
                datasets: [
                    {
                        label: 'Critical Alerts',
                        data: [3, 5, 4, 8, 6, 9, 7],
                        borderColor: 'rgb(220, 38, 38)',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'High Priority',
                        data: [7, 9, 11, 14, 12, 16, 12],
                        borderColor: 'rgb(249, 115, 22)',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Medium Priority',
                        data: [12, 15, 13, 18, 14, 11, 9],
                        borderColor: 'rgb(234, 179, 8)',
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Resolved',
                        data: [18, 24, 21, 35, 27, 29, 31],
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Alerts'
                        }
                    }
                }
            }
        });
    }
}

// Export for use in tab-system.js
if (typeof window !== 'undefined') {
    window.loadAlertSystem = loadAlertSystem;
}
