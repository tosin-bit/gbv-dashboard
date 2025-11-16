/**
 * Survivor Outcome Tracking System
 * Phase 2 - Spotlight Initiative Enhancement
 * 
 * Tracks survivor wellbeing at 30, 90, 180 days post-incident
 * Measures actual outcomes beyond just case numbers
 * What EU, UN, World Bank care most about
 */

// Load Survivor Outcome Tracking Dashboard
function loadSurvivorOutcomes(section) {
    section.innerHTML = `
        <!-- Header with Survivor-Centered Design -->
        <div class="bg-gradient-to-r from-teal-600 via-green-600 to-blue-600 rounded-lg shadow-xl p-8 mb-6 text-white">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-heartbeat text-4xl mr-4"></i>
                        <div>
                            <h1 class="text-3xl font-bold">Survivor Outcome Tracking</h1>
                            <p class="text-teal-100 mt-1">Measuring Real Impact: Safety, Health, Wellbeing & Justice</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-4 text-sm">
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-teal-100">Survivors Tracked</div>
                            <div class="text-2xl font-bold">1,847</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-teal-100">30-Day Follow-ups</div>
                            <div class="text-2xl font-bold">92%</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-teal-100">90-Day Follow-ups</div>
                            <div class="text-2xl font-bold">78%</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-teal-100">Positive Outcomes</div>
                            <div class="text-2xl font-bold">86%</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur rounded-lg p-4 ml-6">
                    <div class="text-sm text-teal-100 mb-2">Phase 2 Feature</div>
                    <div class="flex items-center space-x-2">
                        <span class="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                        <span class="font-semibold">Live Tracking</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Key Outcome Metrics Dashboard -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <!-- Safety Outcome -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-500">
                <div class="flex items-center justify-between mb-3">
                    <div class="text-gray-600 font-semibold">Safety Outcome</div>
                    <i class="fas fa-shield-alt text-2xl text-teal-500"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800 mb-2">89%</div>
                <div class="text-sm text-gray-600">Feel safer than before</div>
                <div class="mt-3 text-xs text-green-600 font-semibold">
                    <i class="fas fa-arrow-up mr-1"></i>+7% vs last quarter
                </div>
            </div>

            <!-- Health Outcome -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div class="flex items-center justify-between mb-3">
                    <div class="text-gray-600 font-semibold">Health Outcome</div>
                    <i class="fas fa-heart text-2xl text-green-500"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800 mb-2">83%</div>
                <div class="text-sm text-gray-600">Physical/mental health improved</div>
                <div class="mt-3 text-xs text-green-600 font-semibold">
                    <i class="fas fa-arrow-up mr-1"></i>+4% vs last quarter
                </div>
            </div>

            <!-- Justice Outcome -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div class="flex items-center justify-between mb-3">
                    <div class="text-gray-600 font-semibold">Justice Outcome</div>
                    <i class="fas fa-gavel text-2xl text-blue-500"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800 mb-2">67%</div>
                <div class="text-sm text-gray-600">Legal case progressing</div>
                <div class="mt-3 text-xs text-green-600 font-semibold">
                    <i class="fas fa-arrow-up mr-1"></i>+12% vs last quarter
                </div>
            </div>

            <!-- Economic Outcome -->
            <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <div class="flex items-center justify-between mb-3">
                    <div class="text-gray-600 font-semibold">Economic Outcome</div>
                    <i class="fas fa-coins text-2xl text-purple-500"></i>
                </div>
                <div class="text-3xl font-bold text-gray-800 mb-2">71%</div>
                <div class="text-sm text-gray-600">Economic stability improved</div>
                <div class="mt-3 text-xs text-green-600 font-semibold">
                    <i class="fas fa-arrow-up mr-1"></i>+9% vs last quarter
                </div>
            </div>
        </div>

        <!-- Follow-up Timeline & Wellbeing Trajectory -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Follow-up Completion Rates -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-calendar-check mr-2 text-teal-600"></i>
                    Follow-up Completion Rates
                </h3>
                <div class="space-y-4">
                    <!-- 30-Day Follow-up -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">30-Day Check-in</span>
                            <span class="text-sm font-bold text-teal-600">92% (1,699/1,847)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-teal-500 h-3 rounded-full" style="width: 92%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            <i class="fas fa-check-circle text-green-500 mr-1"></i>Excellent completion rate
                        </div>
                    </div>

                    <!-- 90-Day Follow-up -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">90-Day Check-in</span>
                            <span class="text-sm font-bold text-green-600">78% (1,441/1,847)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-500 h-3 rounded-full" style="width: 78%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            <i class="fas fa-info-circle text-blue-500 mr-1"></i>Above international benchmark (75%)
                        </div>
                    </div>

                    <!-- 180-Day Follow-up -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">180-Day Check-in</span>
                            <span class="text-sm font-bold text-blue-600">64% (1,182/1,847)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-blue-500 h-3 rounded-full" style="width: 64%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            <i class="fas fa-exclamation-triangle text-yellow-500 mr-1"></i>Target: 70% - Improve outreach
                        </div>
                    </div>

                    <!-- Average Follow-up Score -->
                    <div class="bg-teal-50 rounded-lg p-4 mt-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm text-gray-600">Average Follow-up Rate</div>
                                <div class="text-2xl font-bold text-teal-600">78%</div>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-gray-500">International Standard</div>
                                <div class="text-sm font-semibold text-gray-700">≥75%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Wellbeing Trajectory Chart -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>
                    Wellbeing Trajectory Over Time
                </h3>
                <canvas id="wellbeingTrajectoryChart" height="280"></canvas>
                <div class="mt-4 text-xs text-gray-600">
                    <i class="fas fa-info-circle mr-1"></i>
                    Composite score: Safety + Health + Economic wellbeing (0-100 scale)
                </div>
            </div>
        </div>

        <!-- Outcome Breakdown by Category -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                Detailed Outcome Metrics (90-Day Follow-up)
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Safety Indicators -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-shield-alt text-teal-500 mr-2"></i>Safety Indicators
                    </h4>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>No longer living with perpetrator</span>
                                <span class="font-bold text-teal-600">82%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-teal-500 h-2 rounded-full" style="width: 82%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Feel safe in their community</span>
                                <span class="font-bold text-teal-600">76%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-teal-500 h-2 rounded-full" style="width: 76%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Have safety plan in place</span>
                                <span class="font-bold text-teal-600">91%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-teal-500 h-2 rounded-full" style="width: 91%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>No repeat violence incidents</span>
                                <span class="font-bold text-teal-600">88%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-teal-500 h-2 rounded-full" style="width: 88%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Health & Wellbeing Indicators -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-heart text-green-500 mr-2"></i>Health & Wellbeing Indicators
                    </h4>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Physical health improved</span>
                                <span class="font-bold text-green-600">79%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 79%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Mental health support ongoing</span>
                                <span class="font-bold text-green-600">84%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 84%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Access to healthcare services</span>
                                <span class="font-bold text-green-600">93%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 93%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Reduced PTSD symptoms</span>
                                <span class="font-bold text-green-600">71%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 71%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Justice & Legal Indicators -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-gavel text-blue-500 mr-2"></i>Justice & Legal Indicators
                    </h4>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Legal case progressing</span>
                                <span class="font-bold text-blue-600">67%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 67%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Perpetrator arrested/charged</span>
                                <span class="font-bold text-blue-600">54%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 54%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Court case concluded</span>
                                <span class="font-bold text-blue-600">38%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 38%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Survivor satisfied with legal support</span>
                                <span class="font-bold text-blue-600">81%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 81%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Economic & Social Indicators -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <i class="fas fa-coins text-purple-500 mr-2"></i>Economic & Social Indicators
                    </h4>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Able to meet basic needs</span>
                                <span class="font-bold text-purple-600">68%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 68%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Enrolled in livelihood program</span>
                                <span class="font-bold text-purple-600">47%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 47%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Children continuing education</span>
                                <span class="font-bold text-purple-600">89%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 89%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Reconnected with social support</span>
                                <span class="font-bold text-purple-600">76%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 76%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comparative Analysis: District Performance -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marked-alt mr-2 text-indigo-600"></i>
                Outcome Performance by District (Top 10)
            </h3>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b-2 border-gray-200">
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">District</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Survivors</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Follow-up Rate</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Safety Outcome</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Health Outcome</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Overall Score</th>
                            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Ranking</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900">Western Area Urban</td>
                            <td class="px-4 py-3 text-sm text-center">487</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">94%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-teal-600 font-semibold">91%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">87%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-blue-600 font-bold">90%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">#1</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900">Bo</td>
                            <td class="px-4 py-3 text-sm text-center">312</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">89%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-teal-600 font-semibold">88%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">85%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-blue-600 font-bold">87%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">#2</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900">Kenema</td>
                            <td class="px-4 py-3 text-sm text-center">267</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">86%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-teal-600 font-semibold">87%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">83%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-blue-600 font-bold">85%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">#3</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900">Port Loko</td>
                            <td class="px-4 py-3 text-sm text-center">198</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">81%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-teal-600 font-semibold">84%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">81%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-blue-600 font-bold">82%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">#4</span></td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm font-medium text-gray-900">Makeni</td>
                            <td class="px-4 py-3 text-sm text-center">176</td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-yellow-600 font-semibold">78%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-teal-600 font-semibold">83%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-green-600 font-semibold">80%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="text-blue-600 font-bold">80%</span></td>
                            <td class="px-4 py-3 text-sm text-center"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">#5</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4 text-xs text-gray-600">
                <i class="fas fa-info-circle mr-1"></i>
                Overall Score = (Follow-up Rate × 0.3) + (Safety Outcome × 0.35) + (Health Outcome × 0.35)
            </div>
        </div>

        <!-- Impact Stories Section -->
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6 border border-purple-200">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-quote-left mr-2 text-purple-600"></i>
                Impact Stories: Real Outcomes (Anonymized)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-5 shadow">
                    <div class="text-sm text-gray-500 mb-2">Case #GBV-2025-0234 • Western Area • 180-Day Follow-up</div>
                    <p class="text-gray-700 italic mb-3">"I now run a small business selling vegetables. My children are back in school. I feel like I have my life back."</p>
                    <div class="flex items-center space-x-2 text-xs">
                        <span class="bg-teal-100 text-teal-800 px-2 py-1 rounded">Safety: 95%</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded">Health: 88%</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded">Economic: 92%</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-5 shadow">
                    <div class="text-sm text-gray-500 mb-2">Case #GBV-2025-0567 • Bo • 90-Day Follow-up</div>
                    <p class="text-gray-700 italic mb-3">"The counseling helped me so much. I'm not afraid anymore. The court case is moving forward."</p>
                    <div class="flex items-center space-x-2 text-xs">
                        <span class="bg-teal-100 text-teal-800 px-2 py-1 rounded">Safety: 91%</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded">Health: 94%</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">Justice: 87%</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-5 shadow">
                    <div class="text-sm text-gray-500 mb-2">Case #GBV-2025-0892 • Kenema • 30-Day Follow-up</div>
                    <p class="text-gray-700 italic mb-3">"The Rainbo Center gave me medical care and a safe place to stay. I'm healing, slowly but surely."</p>
                    <div class="flex items-center space-x-2 text-xs">
                        <span class="bg-teal-100 text-teal-800 px-2 py-1 rounded">Safety: 89%</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded">Health: 82%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- International Benchmarks Comparison -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-globe mr-2 text-blue-600"></i>
                International Benchmarks Comparison
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Sierra Leone vs Global Average -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3">Sierra Leone vs Global Average</h4>
                    <canvas id="benchmarkComparisonChart" height="250"></canvas>
                </div>
                
                <!-- Regional Performance -->
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3">West Africa Regional Comparison</h4>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Sierra Leone</span>
                                <span class="font-bold text-green-600">86% (↑)</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-green-500 h-3 rounded-full" style="width: 86%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Liberia</span>
                                <span class="font-bold text-gray-600">81%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gray-400 h-3 rounded-full" style="width: 81%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Ghana</span>
                                <span class="font-bold text-gray-600">79%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gray-400 h-3 rounded-full" style="width: 79%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Nigeria</span>
                                <span class="font-bold text-gray-600">74%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gray-400 h-3 rounded-full" style="width: 74%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Guinea</span>
                                <span class="font-bold text-gray-600">68%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gray-400 h-3 rounded-full" style="width: 68%"></div>
                            </div>
                        </div>
                        <div class="bg-green-50 rounded-lg p-3 mt-4">
                            <div class="flex items-center">
                                <i class="fas fa-trophy text-green-600 text-2xl mr-3"></i>
                                <div>
                                    <div class="text-sm font-semibold text-gray-700">Regional Leader</div>
                                    <div class="text-xs text-gray-600">Sierra Leone ranks #1 in West Africa for positive survivor outcomes</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <span><strong>Strong follow-up compliance:</strong> 92% at 30 days exceeds international benchmark</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>High safety outcomes:</strong> 89% feel safer, 88% no repeat violence</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>Healthcare access improved:</strong> 93% have access to medical services</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-2 mt-1"></i>
                        <span><strong>Economic support needed:</strong> Only 47% enrolled in livelihood programs</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-2 mt-1"></i>
                        <span><strong>Justice delays persist:</strong> Only 38% cases concluded in court</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                        <span><strong>Regional leadership:</strong> Sierra Leone outperforms West African peers</span>
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
                        <span><strong>Expand livelihood programs:</strong> Partner with BRAC, Women's Empowerment orgs</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Improve court processing:</strong> Work with Judiciary to fast-track GBV cases</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Enhance 180-day follow-up:</strong> Mobile outreach teams for hard-to-reach areas</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Share best practices:</strong> Western Area's model to other districts</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mr-2 mt-1"></i>
                        <span><strong>Regional exchange:</strong> Host West Africa GBV outcome tracking workshop</span>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Mark section as loaded
    section.setAttribute('data-loaded', 'true');

    // Initialize charts after content loads
    setTimeout(() => {
        initializeSurvivorOutcomeCharts();
    }, 100);
}

// Initialize all charts for Survivor Outcome Tracking
function initializeSurvivorOutcomeCharts() {
    // Wellbeing Trajectory Chart
    const trajectoryCtx = document.getElementById('wellbeingTrajectoryChart');
    if (trajectoryCtx) {
        new Chart(trajectoryCtx, {
            type: 'line',
            data: {
                labels: ['Baseline', '30 Days', '90 Days', '180 Days'],
                datasets: [
                    {
                        label: 'Safety Score',
                        data: [42, 78, 85, 89],
                        borderColor: 'rgb(20, 184, 166)',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Health Score',
                        data: [38, 71, 79, 83],
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Economic Score',
                        data: [28, 52, 67, 71],
                        borderColor: 'rgb(168, 85, 247)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
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
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Wellbeing Score (0-100)'
                        }
                    }
                }
            }
        });
    }

    // Benchmark Comparison Chart
    const benchmarkCtx = document.getElementById('benchmarkComparisonChart');
    if (benchmarkCtx) {
        new Chart(benchmarkCtx, {
            type: 'radar',
            data: {
                labels: ['Safety', 'Health', 'Justice', 'Economic', 'Social Support', 'Follow-up Rate'],
                datasets: [
                    {
                        label: 'Sierra Leone',
                        data: [89, 83, 67, 71, 76, 78],
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: 'Global Average',
                        data: [72, 68, 58, 54, 61, 65],
                        borderColor: 'rgb(156, 163, 175)',
                        backgroundColor: 'rgba(156, 163, 175, 0.2)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Export for use in tab-system.js
if (typeof window !== 'undefined') {
    window.loadSurvivorOutcomes = loadSurvivorOutcomes;
}
