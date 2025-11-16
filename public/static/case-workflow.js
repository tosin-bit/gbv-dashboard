/**
 * Case Management Workflow System
 * Phase 2 - Spotlight Initiative Enhancement
 * 
 * Digital referral and coordination system between Ministry, Rainbo, Police FSU
 * Real-time case status tracking across all stakeholders
 * Automated notifications and workflow management
 */

// Load Case Management Workflow Dashboard
function loadCaseWorkflow(section) {
    section.innerHTML = `
        <!-- Back Button -->
        <div class="mb-4">
            <button onclick="loadSpotlightInitiative(document.getElementById('spotlight-initiative-section'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Spotlight Initiative Hub
            </button>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-xl p-8 mb-6 text-white">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-project-diagram text-4xl mr-4"></i>
                        <div>
                            <h1 class="text-3xl font-bold">Case Management Workflow</h1>
                            <p class="text-indigo-100 mt-1">Multi-Agency Coordination & Digital Referral System</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-4 text-sm">
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-indigo-100">Active Cases</div>
                            <div class="text-2xl font-bold">2,403</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-indigo-100">Pending Referrals</div>
                            <div class="text-2xl font-bold">147</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-indigo-100">Avg Response Time</div>
                            <div class="text-2xl font-bold">6.2h</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-indigo-100">Coordination Rate</div>
                            <div class="text-2xl font-bold">94%</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur rounded-lg p-4 ml-6">
                    <div class="text-sm text-indigo-100 mb-2">Phase 2 Feature</div>
                    <div class="flex items-center space-x-2">
                        <span class="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                        <span class="font-semibold">Live Workflow</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Workflow Stages Overview -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-sitemap mr-2 text-indigo-600"></i>
                Case Workflow Stages
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <!-- Stage 1: Initial Report -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">1. Initial Report</div>
                        <i class="fas fa-flag text-blue-500 text-xl"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-1">2,871</div>
                    <div class="text-xs text-gray-600 mb-2">All reported cases (2025 YTD)</div>
                    <div class="text-xs">
                        <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded font-semibold">100%</span>
                    </div>
                </div>

                <!-- Stage 2: Assessment -->
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">2. Assessment</div>
                        <i class="fas fa-clipboard-check text-purple-500 text-xl"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-1">2,789</div>
                    <div class="text-xs text-gray-600 mb-2">Risk assessed & prioritized</div>
                    <div class="text-xs">
                        <span class="bg-purple-200 text-purple-800 px-2 py-1 rounded font-semibold">97%</span>
                    </div>
                </div>

                <!-- Stage 3: Service Referral -->
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">3. Referral</div>
                        <i class="fas fa-share-nodes text-green-500 text-xl"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-1">2,643</div>
                    <div class="text-xs text-gray-600 mb-2">Referred to service providers</div>
                    <div class="text-xs">
                        <span class="bg-green-200 text-green-800 px-2 py-1 rounded font-semibold">92%</span>
                    </div>
                </div>

                <!-- Stage 4: Service Delivery -->
                <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border-l-4 border-teal-500">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">4. Services</div>
                        <i class="fas fa-hands-helping text-teal-500 text-xl"></i>
                    </div>
                    <div class="text-2xl font-bold text-teal-600 mb-1">2,403</div>
                    <div class="text-xs text-gray-600 mb-2">Received support services</div>
                    <div class="text-xs">
                        <span class="bg-teal-200 text-teal-800 px-2 py-1 rounded font-semibold">84%</span>
                    </div>
                </div>

                <!-- Stage 5: Follow-up -->
                <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border-l-4 border-indigo-500">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">5. Follow-up</div>
                        <i class="fas fa-check-double text-indigo-500 text-xl"></i>
                    </div>
                    <div class="text-2xl font-bold text-indigo-600 mb-1">1,847</div>
                    <div class="text-xs text-gray-600 mb-2">Ongoing outcome tracking</div>
                    <div class="text-xs">
                        <span class="bg-indigo-200 text-indigo-800 px-2 py-1 rounded font-semibold">64%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Referral Network Dashboard -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Referral Flow Visualization -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-network-wired mr-2 text-purple-600"></i>
                    Referral Network Flow (Last 30 Days)
                </h3>
                <div class="space-y-4">
                    <!-- Ministry → Rainbo -->
                    <div class="bg-purple-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white mr-3">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Ministry → Rainbo Initiative</div>
                                    <div class="text-xs text-gray-600">Medical & psychosocial support</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-purple-600">487</div>
                                <div class="text-xs text-gray-600">referrals</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Avg response: <strong>4.2 hours</strong></span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">98% accepted</span>
                        </div>
                    </div>

                    <!-- Ministry → Police FSU -->
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Ministry → Police FSU</div>
                                    <div class="text-xs text-gray-600">Investigation & legal action</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-blue-600">654</div>
                                <div class="text-xs text-gray-600">referrals</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Avg response: <strong>8.7 hours</strong></span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">95% accepted</span>
                        </div>
                    </div>

                    <!-- Rainbo → Police FSU -->
                    <div class="bg-teal-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white mr-3">
                                    <i class="fas fa-hospital"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Rainbo → Police FSU</div>
                                    <div class="text-xs text-gray-600">Forensic evidence & witness</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-teal-600">312</div>
                                <div class="text-xs text-gray-600">referrals</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Avg response: <strong>6.1 hours</strong></span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">97% accepted</span>
                        </div>
                    </div>

                    <!-- Police FSU → Judiciary -->
                    <div class="bg-indigo-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-3">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Police FSU → Judiciary</div>
                                    <div class="text-xs text-gray-600">Court prosecution</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-indigo-600">289</div>
                                <div class="text-xs text-gray-600">cases filed</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Avg time: <strong>18.4 days</strong></span>
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">89% admitted</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Response Time Analysis -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-stopwatch mr-2 text-green-600"></i>
                    Response Time Performance
                </h3>
                <canvas id="responseTimeChart" height="320"></canvas>
                <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div class="bg-green-50 rounded p-2">
                        <div class="text-gray-600">Target: <24 hours</div>
                        <div class="font-bold text-green-600 text-lg">6.2 hours</div>
                        <div class="text-gray-500">Current average</div>
                    </div>
                    <div class="bg-blue-50 rounded p-2">
                        <div class="text-gray-600">Improvement</div>
                        <div class="font-bold text-blue-600 text-lg">-42%</div>
                        <div class="text-gray-500">vs last year (10.8h)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Active Referrals Requiring Action -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-bell mr-2 text-orange-600"></i>
                    Pending Referrals Requiring Action
                </h3>
                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">147 pending</span>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b-2 border-gray-200">
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Case #</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">From</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">To</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Service Needed</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time Elapsed</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-blue-600">GBV-2025-2847</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Ministry</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Rainbo (Freetown)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Emergency PEP + Counseling</td>
                            <td class="px-4 py-3 text-sm"><span class="bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">Urgent</span></td>
                            <td class="px-4 py-3 text-sm text-gray-700">2.3 hours</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">En Route</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-blue-600">GBV-2025-2831</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Rainbo (Bo)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Police FSU (Bo)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Forensic evidence handover</td>
                            <td class="px-4 py-3 text-sm"><span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">High</span></td>
                            <td class="px-4 py-3 text-sm text-gray-700">5.7 hours</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">Contacted</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-blue-600">GBV-2025-2819</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Ministry</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Police FSU (Kenema)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Investigation initiation</td>
                            <td class="px-4 py-3 text-sm"><span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">High</span></td>
                            <td class="px-4 py-3 text-sm text-gray-700">9.2 hours</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">Pending</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-blue-600">GBV-2025-2806</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Ministry</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Rainbo (Makeni)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Medical exam + STI screening</td>
                            <td class="px-4 py-3 text-sm"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">Medium</span></td>
                            <td class="px-4 py-3 text-sm text-gray-700">11.4 hours</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">Accepted</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-blue-600">GBV-2025-2794</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Police FSU (Freetown)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">Judiciary (High Court)</td>
                            <td class="px-4 py-3 text-sm text-gray-700">File charges - child rape</td>
                            <td class="px-4 py-3 text-sm"><span class="bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">Urgent</span></td>
                            <td class="px-4 py-3 text-sm text-gray-700">14.1 hours</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">In Review</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Multi-Agency Coordination Metrics -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Coordination Score -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-handshake mr-2 text-purple-600"></i>
                    Coordination Score
                </h3>
                <div class="flex items-center justify-center mb-4">
                    <div class="relative w-40 h-40">
                        <svg class="transform -rotate-90 w-40 h-40">
                            <circle cx="80" cy="80" r="70" stroke="#e5e7eb" stroke-width="12" fill="none" />
                            <circle cx="80" cy="80" r="70" stroke="#8b5cf6" stroke-width="12" fill="none"
                                stroke-dasharray="440" stroke-dashoffset="26.4" stroke-linecap="round" />
                        </svg>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <div class="text-3xl font-bold text-purple-600">94%</div>
                            <div class="text-xs text-gray-600">Excellent</div>
                        </div>
                    </div>
                </div>
                <div class="text-xs text-gray-600 text-center">
                    Based on: Response time, acceptance rate, outcome tracking
                </div>
            </div>

            <!-- Agency Performance -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-users mr-2 text-blue-600"></i>
                    Agency Performance
                </h3>
                <div class="space-y-3">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Rainbo Initiative</span>
                            <span class="font-bold text-green-600">98%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 98%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Police FSU</span>
                            <span class="font-bold text-blue-600">95%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: 95%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Judiciary</span>
                            <span class="font-bold text-yellow-600">89%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-yellow-500 h-2 rounded-full" style="width: 89%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>NGO Partners</span>
                            <span class="font-bold text-purple-600">92%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: 92%"></div>
                        </div>
                    </div>
                </div>
                <div class="text-xs text-gray-600 mt-3">
                    <i class="fas fa-info-circle mr-1"></i>
                    Based on referral acceptance & response time
                </div>
            </div>

            <!-- Monthly Trends -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-chart-line mr-2 text-teal-600"></i>
                    Referral Trends (6 Months)
                </h3>
                <canvas id="referralTrendsChart" height="160"></canvas>
            </div>
        </div>

        <!-- Case Tracking Example -->
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-route mr-2 text-purple-600"></i>
                Sample Case Journey: GBV-2025-2765
            </h3>
            <div class="relative">
                <!-- Timeline -->
                <div class="flex items-start space-x-4">
                    <!-- Day 1: Report -->
                    <div class="flex-1">
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                                    <i class="fas fa-flag text-xs"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Day 1</div>
                                    <div class="text-xs text-gray-600">Oct 15, 08:23</div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-700">
                                <strong>Initial Report</strong><br/>
                                Ministry hotline receives call from survivor (age 16)
                            </div>
                        </div>
                    </div>

                    <!-- Arrow -->
                    <div class="pt-6"><i class="fas fa-arrow-right text-gray-400"></i></div>

                    <!-- Day 1: Rainbo Referral -->
                    <div class="flex-1">
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white mr-2">
                                    <i class="fas fa-hospital text-xs"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Day 1</div>
                                    <div class="text-xs text-gray-600">Oct 15, 12:45</div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-700">
                                <strong>Rainbo Center</strong><br/>
                                PEP administered, forensic exam, counseling
                            </div>
                        </div>
                    </div>

                    <!-- Arrow -->
                    <div class="pt-6"><i class="fas fa-arrow-right text-gray-400"></i></div>

                    <!-- Day 2: Police -->
                    <div class="flex-1">
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-2">
                                    <i class="fas fa-shield-alt text-xs"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Day 2</div>
                                    <div class="text-xs text-gray-600">Oct 16, 09:15</div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-700">
                                <strong>Police FSU</strong><br/>
                                Statement recorded, evidence collected, suspect identified
                            </div>
                        </div>
                    </div>

                    <!-- Arrow -->
                    <div class="pt-6"><i class="fas fa-arrow-right text-gray-400"></i></div>

                    <!-- Day 5: Court -->
                    <div class="flex-1">
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white mr-2">
                                    <i class="fas fa-gavel text-xs"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">Day 5</div>
                                    <div class="text-xs text-gray-600">Oct 19, 14:30</div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-700">
                                <strong>Judiciary</strong><br/>
                                Case filed, suspect arrested, bail denied
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 bg-green-50 rounded-lg p-3 text-center">
                    <span class="text-sm font-semibold text-green-800">
                        <i class="fas fa-check-circle mr-1"></i>
                        Total time from report to court filing: 4 days (Target: <7 days)
                    </span>
                </div>
            </div>
        </div>

        <!-- Key Findings & Recommendations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Key Findings -->
            <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-lightbulb mr-2 text-blue-600"></i>
                    Key Findings
                </h3>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>Fast response times:</strong> 6.2 hour average, 42% improvement vs 2024</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>High coordination:</strong> 94% overall coordination score across agencies</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>Strong acceptance:</strong> 98% Rainbo, 95% Police FSU referral acceptance</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-2 mt-1"></i>
                        <span><strong>Court delays:</strong> 18.4 day average for case filing (Target: <14 days)</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>Digital workflow:</strong> 87% of referrals now use digital system</span>
                    </li>
                </ul>
            </div>

            <!-- Recommendations -->
            <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-tasks mr-2 text-green-600"></i>
                    Priority Recommendations
                </h3>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Expedite court filing:</strong> Work with Judiciary to reduce filing time to <14 days</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Expand digital system:</strong> Train remaining 13% agencies on digital referral system</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Automated alerts:</strong> Implement real-time alerts for delayed referrals >12 hours</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Mobile coordination:</strong> Deploy mobile app for case workers in the field</span>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Mark section as loaded
    section.setAttribute('data-loaded', 'true');

    // Initialize charts
    setTimeout(() => {
        initializeCaseWorkflowCharts();
    }, 100);
}

// Initialize charts for Case Workflow
function initializeCaseWorkflowCharts() {
    // Response Time Chart
    const responseTimeCtx = document.getElementById('responseTimeChart');
    if (responseTimeCtx) {
        new Chart(responseTimeCtx, {
            type: 'bar',
            data: {
                labels: ['Rainbo', 'Police FSU', 'Judiciary', 'NGO Partners', 'Overall Avg'],
                datasets: [{
                    label: 'Response Time (hours)',
                    data: [4.2, 8.7, 18.4, 5.8, 6.2],
                    backgroundColor: [
                        'rgba(20, 184, 166, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(34, 197, 94, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        }
                    }
                }
            }
        });
    }

    // Referral Trends Chart
    const referralTrendsCtx = document.getElementById('referralTrendsChart');
    if (referralTrendsCtx) {
        new Chart(referralTrendsCtx, {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Monthly Referrals',
                    data: [387, 412, 456, 478, 501, 487],
                    borderColor: 'rgb(168, 85, 247)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
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
}

// Export for use in tab-system.js
if (typeof window !== 'undefined') {
    window.loadCaseWorkflow = loadCaseWorkflow;
}
