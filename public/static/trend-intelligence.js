// Trend Intelligence Center Dashboard
// Phase 3: Predictive Analytics & AI Intelligence
// Pattern detection, seasonal analysis, and policy impact measurement

function loadTrendIntelligence(section) {
    section.innerHTML = `
        <!-- Back Button to Predictive Analytics Hub -->
        <div class="mb-4">
            <button onclick="loadPredictiveAnalytics(document.getElementById('spotlight-initiative-section'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Predictive Analytics
            </button>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-lg mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-bold mb-2">
                        <i class="fas fa-brain mr-3"></i>Trend Intelligence Center
                    </h1>
                    <p class="text-indigo-100 text-lg">AI-Powered Pattern Detection, Seasonal Analysis & Policy Impact Measurement</p>
                </div>
                <div class="text-right">
                    <div class="text-5xl font-bold">12</div>
                    <div class="text-indigo-100">Active Patterns Identified</div>
                </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="grid grid-cols-4 gap-4 mt-6">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">4.2 yrs</div>
                    <div class="text-indigo-100 text-sm">Historical Data Analyzed</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">7,834</div>
                    <div class="text-indigo-100 text-sm">Cases in Analysis Dataset</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">93%</div>
                    <div class="text-indigo-100 text-sm">Pattern Confidence Score</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">23</div>
                    <div class="text-indigo-100 text-sm">Policy Interventions Tracked</div>
                </div>
            </div>
        </div>

        <!-- Critical Pattern Alerts -->
        <div class="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg shadow-md mb-6">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-triangle text-orange-600 text-3xl"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-xl font-bold text-orange-800 mb-3">
                        ⚠️ Critical Emerging Patterns Requiring Immediate Attention
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-trending-up mr-2"></i>School Holiday Case Spike Pattern
                                </div>
                                <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">URGENT</span>
                            </div>
                            <div class="text-sm space-y-2 mb-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Pattern Strength:</span>
                                    <span class="font-bold text-red-700">97% correlation</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Affected Districts:</span>
                                    <span class="font-bold text-gray-800">11 of 16</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Avg. Case Increase:</span>
                                    <span class="font-bold text-red-700">+47%</span>
                                </div>
                            </div>
                            <div class="bg-red-50 p-3 rounded mb-2">
                                <div class="font-bold text-red-800 text-xs mb-1">PATTERN DETAILS:</div>
                                <div class="text-xs text-gray-700">
                                    Child sexual abuse cases surge 47% during school breaks (Dec, Apr, Aug). 
                                    Peak occurs 3-5 days into holiday period. Primary victims: Ages 11-15.
                                </div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Next Occurrence:</strong> December 20-31, 2024 (7 days away)
                                <br/><strong>Recommended Action:</strong> Pre-position resources, activate community watch programs, 
                                launch awareness campaigns by Dec 18th
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-store mr-2"></i>Market Day Violence Clustering
                                </div>
                                <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold">HIGH</span>
                            </div>
                            <div class="text-sm space-y-2 mb-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Pattern Strength:</span>
                                    <span class="font-bold text-orange-700">89% correlation</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Affected Districts:</span>
                                    <span class="font-bold text-gray-800">Bo, Makeni, Kenema</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Avg. Case Increase:</span>
                                    <span class="font-bold text-orange-700">+32%</span>
                                </div>
                            </div>
                            <div class="bg-orange-50 p-3 rounded mb-2">
                                <div class="font-bold text-orange-800 text-xs mb-1">PATTERN DETAILS:</div>
                                <div class="text-xs text-gray-700">
                                    Intimate partner violence and sexual assault cases spike on major market days. 
                                    Peak reporting: Day after market day. Linked to alcohol consumption.
                                </div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Next Market Days:</strong> Dec 14, 21, 28 (weekly cycle)
                                <br/><strong>Recommended Action:</strong> Mobile response units near markets, 
                                sobriety checkpoints, late-night patrol increases
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-rain mr-2"></i>Rainy Season IPV Increase
                                </div>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">MODERATE</span>
                            </div>
                            <div class="text-sm space-y-2 mb-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Pattern Strength:</span>
                                    <span class="font-bold text-yellow-700">82% correlation</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Affected Districts:</span>
                                    <span class="font-bold text-gray-800">Rural districts</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Avg. Case Increase:</span>
                                    <span class="font-bold text-yellow-700">+24%</span>
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-3 rounded mb-2">
                                <div class="font-bold text-yellow-800 text-xs mb-1">PATTERN DETAILS:</div>
                                <div class="text-xs text-gray-700">
                                    Intimate partner violence increases 24% during heavy rainy season (Jun-Sep). 
                                    Correlated with economic stress from agricultural disruption.
                                </div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Next Season:</strong> June-September 2025
                                <br/><strong>Recommended Action:</strong> Pre-rainy season economic support programs, 
                                stress management counseling, early intervention training
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-users mr-2"></i>Perpetrator Age Shift Pattern
                                </div>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">MONITOR</span>
                            </div>
                            <div class="text-sm space-y-2 mb-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Pattern Strength:</span>
                                    <span class="font-bold text-yellow-700">76% trend</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Time Period:</span>
                                    <span class="font-bold text-gray-800">2022-2024</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-600">Change Detected:</span>
                                    <span class="font-bold text-yellow-700">+18% young perps</span>
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-3 rounded mb-2">
                                <div class="font-bold text-yellow-800 text-xs mb-1">PATTERN DETAILS:</div>
                                <div class="text-xs text-gray-700">
                                    Perpetrator age distribution shifting younger. Ages 18-25 now represent 34% 
                                    (up from 28% in 2022). Linked to social media influence and peer pressure.
                                </div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Implication:</strong> Prevention programs need youth focus
                                <br/><strong>Recommended Action:</strong> School-based prevention, social media campaigns, 
                                male youth mentorship programs
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Seasonal Analysis -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-calendar-alt mr-2 text-indigo-600"></i>Seasonal Pattern Analysis (12-Month Cycle)
            </h3>
            <canvas id="seasonalTrendChart" style="max-height: 350px;"></canvas>
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-red-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Highest Risk Months</div>
                    <div class="text-xl font-bold text-red-700">Dec, Apr, Aug</div>
                    <div class="text-xs text-gray-500">School holiday periods</div>
                    <div class="text-xs text-red-600 mt-1">+42% above baseline</div>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Moderate Risk Months</div>
                    <div class="text-xl font-bold text-orange-700">Jun-Sep</div>
                    <div class="text-xs text-gray-500">Rainy season stress</div>
                    <div class="text-xs text-orange-600 mt-1">+23% above baseline</div>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Stable Months</div>
                    <div class="text-xl font-bold text-yellow-700">Feb, May, Oct</div>
                    <div class="text-xs text-gray-500">Regular school term</div>
                    <div class="text-xs text-gray-600 mt-1">Near baseline</div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Lower Risk Months</div>
                    <div class="text-xl font-bold text-green-700">Jan, Mar, Nov</div>
                    <div class="text-xs text-gray-500">Post-holiday stability</div>
                    <div class="text-xs text-green-600 mt-1">-12% below baseline</div>
                </div>
            </div>
        </div>

        <!-- Perpetrator Profiling (Anonymized) -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-user-secret mr-2 text-purple-600"></i>Perpetrator Pattern Analysis (Anonymized Data)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Perpetrator Age Distribution -->
                <div>
                    <div class="font-semibold text-gray-700 mb-3">Age Distribution (2024 Cases)</div>
                    <canvas id="perpetratorAgeChart" style="max-height: 250px;"></canvas>
                    <div class="mt-3 text-sm text-gray-600">
                        <strong>Trend Alert:</strong> 18-25 age group increasing from 28% (2022) to 34% (2024). 
                        Requires youth-focused prevention programs.
                    </div>
                </div>

                <!-- Relationship to Survivor -->
                <div>
                    <div class="font-semibold text-gray-700 mb-3">Relationship to Survivor</div>
                    <canvas id="perpetratorRelationChart" style="max-height: 250px;"></canvas>
                    <div class="mt-3 text-sm text-gray-600">
                        <strong>Key Finding:</strong> 62% of perpetrators known to survivor (family/intimate partner/acquaintance). 
                        Stranger violence represents only 23%.
                    </div>
                </div>
            </div>

            <!-- Risk Factor Combinations -->
            <div class="mt-6 bg-purple-50 p-4 rounded-lg">
                <div class="font-bold text-purple-800 mb-3">
                    <i class="fas fa-project-diagram mr-2"></i>High-Risk Perpetrator Patterns
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div class="bg-white p-3 rounded">
                        <div class="font-bold text-gray-800 mb-1">Pattern A: "Repeat Offender"</div>
                        <div class="text-xs text-gray-600 space-y-1">
                            <div>• Multiple prior incidents (avg 3.2)</div>
                            <div>• Age 35-50 (72% of pattern)</div>
                            <div>• Family member relationship (84%)</div>
                            <div>• Economic power dynamic</div>
                            <div><span class="text-red-700 font-bold">Prevalence: 18% of cases</span></div>
                        </div>
                    </div>
                    <div class="bg-white p-3 rounded">
                        <div class="font-bold text-gray-800 mb-1">Pattern B: "Young Opportunist"</div>
                        <div class="text-xs text-gray-600 space-y-1">
                            <div>• Age 18-25 (94% of pattern)</div>
                            <div>• Peer-influenced behavior</div>
                            <div>• Alcohol/substance involved (76%)</div>
                            <div>• Social event context</div>
                            <div><span class="text-orange-700 font-bold">Prevalence: 23% of cases</span></div>
                        </div>
                    </div>
                    <div class="bg-white p-3 rounded">
                        <div class="font-bold text-gray-800 mb-1">Pattern C: "Authority Abuser"</div>
                        <div class="text-xs text-gray-600 space-y-1">
                            <div>• Age 30-55 (81% of pattern)</div>
                            <div>• Position of trust/authority</div>
                            <div>• Teacher, employer, religious leader</div>
                            <div>• Grooming behavior documented</div>
                            <div><span class="text-yellow-700 font-bold">Prevalence: 12% of cases</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Policy Impact Measurement -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-balance-scale mr-2 text-green-600"></i>Policy Intervention Impact Analysis
            </h3>
            <div class="space-y-4">
                <!-- Policy 1 -->
                <div class="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">
                            <i class="fas fa-school mr-2"></i>Mandatory Reporting Law for Schools (Implemented: Jan 2023)
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">
                            <i class="fas fa-check-circle mr-1"></i>HIGHLY EFFECTIVE
                        </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                            <div class="text-xs text-gray-600">Pre-Policy (2022)</div>
                            <div class="text-xl font-bold text-gray-700">142 reports</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Post-Policy (2024)</div>
                            <div class="text-xl font-bold text-green-700">487 reports</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Impact</div>
                            <div class="text-xl font-bold text-green-700">+243%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Confidence</div>
                            <div class="text-xl font-bold text-gray-800">96%</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        <strong>Analysis:</strong> School-based reporting increased by 243%, with 89% of new reports leading 
                        to confirmed interventions. Early detection rate improved from 23% to 67%. 
                        <span class="text-green-700 font-bold">Recommendation: Expand to daycare centers and sports programs.</span>
                    </div>
                </div>

                <!-- Policy 2 -->
                <div class="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">
                            <i class="fas fa-gavel mr-2"></i>Fast-Track Court System for GBV Cases (Implemented: Mar 2023)
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">
                            <i class="fas fa-check-circle mr-1"></i>HIGHLY EFFECTIVE
                        </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                            <div class="text-xs text-gray-600">Avg Resolution Time (2022)</div>
                            <div class="text-xl font-bold text-gray-700">18.3 months</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Avg Resolution Time (2024)</div>
                            <div class="text-xl font-bold text-green-700">4.7 months</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Impact</div>
                            <div class="text-xl font-bold text-green-700">-74%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Conviction Rate</div>
                            <div class="text-xl font-bold text-green-700">+42%</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        <strong>Analysis:</strong> Case resolution time reduced by 74% (18.3 to 4.7 months). Conviction rate 
                        improved from 47% to 67%. Survivor satisfaction with justice process: 89% (up from 34%). 
                        <span class="text-green-700 font-bold">Recommendation: Expand to all 16 districts (currently 8).</span>
                    </div>
                </div>

                <!-- Policy 3 -->
                <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">
                            <i class="fas fa-home mr-2"></i>Safe House Expansion Program (Implemented: Jun 2023)
                        </div>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">
                            <i class="fas fa-chart-line mr-1"></i>MODERATELY EFFECTIVE
                        </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                            <div class="text-xs text-gray-600">Safe Houses (2022)</div>
                            <div class="text-xl font-bold text-gray-700">4 facilities</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Safe Houses (2024)</div>
                            <div class="text-xl font-bold text-blue-700">9 facilities</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Capacity Increase</div>
                            <div class="text-xl font-bold text-blue-700">+125%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Utilization</div>
                            <div class="text-xl font-bold text-blue-700">87%</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        <strong>Analysis:</strong> Capacity increased 125% but demand grew 142%. Utilization rate at 87% 
                        (near capacity). Re-victimization rate for survivors in safe houses: 3% (vs 18% without safe housing). 
                        <span class="text-blue-700 font-bold">Recommendation: Add 3 more facilities in Bo, Kenema, Port Loko.</span>
                    </div>
                </div>

                <!-- Policy 4 -->
                <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">
                            <i class="fas fa-tv mr-2"></i>National Awareness Campaign (Implemented: Sep 2023)
                        </div>
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">
                            <i class="fas fa-exclamation-triangle mr-1"></i>MIXED RESULTS
                        </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                            <div class="text-xs text-gray-600">Media Reach</div>
                            <div class="text-xl font-bold text-gray-700">2.4M people</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Reporting Increase</div>
                            <div class="text-xl font-bold text-yellow-700">+31%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Behavioral Change</div>
                            <div class="text-xl font-bold text-yellow-700">+12%</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Cost Efficiency</div>
                            <div class="text-xl font-bold text-gray-700">$18/case</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        <strong>Analysis:</strong> Campaign increased reporting by 31% but documented behavioral change 
                        only 12%. Urban areas showed 3x stronger response than rural. Cost per case reported: $18. 
                        <span class="text-yellow-700 font-bold">Recommendation: Redesign with rural focus, community leaders, local languages.</span>
                    </div>
                </div>

                <!-- Policy 5 -->
                <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-gray-800">
                            <i class="fas fa-mobile-alt mr-2"></i>SMS Reporting Hotline (Implemented: Nov 2023)
                        </div>
                        <span class="px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">
                            <i class="fas fa-times-circle mr-1"></i>UNDERPERFORMING
                        </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                            <div class="text-xs text-gray-600">Expected Reports</div>
                            <div class="text-xl font-bold text-gray-700">500/month</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Actual Reports</div>
                            <div class="text-xl font-bold text-red-700">87/month</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Performance</div>
                            <div class="text-xl font-bold text-red-700">17% target</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600">Valid Reports</div>
                            <div class="text-xl font-bold text-yellow-700">42%</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        <strong>Analysis:</strong> Significant underperformance (87 vs 500 expected monthly reports). 
                        Valid report rate only 42% (58% spam/test messages). User feedback: concerns about privacy and follow-up. 
                        <span class="text-red-700 font-bold">Recommendation: Pause program, conduct user research, redesign with focus groups.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Emerging Trends Detection -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-radar mr-2 text-pink-600"></i>Emerging Trends Requiring Monitoring (Last 90 Days)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-pink-50 border-l-4 border-pink-500 p-4 rounded">
                    <div class="font-bold text-gray-800 mb-2">
                        <i class="fas fa-wifi mr-2"></i>Online/Social Media Facilitated Violence
                    </div>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>• Cases involving social media: +67% (Q3 vs Q2 2024)</div>
                        <div>• Primary platforms: WhatsApp (42%), Facebook (31%), TikTok (18%)</div>
                        <div>• Age group most affected: 14-19 years (73% of online cases)</div>
                        <div>• Pattern: Catfishing, sextortion, non-consensual image sharing</div>
                        <div class="text-pink-700 font-bold mt-2">Status: Early stage trend, requires dedicated response unit</div>
                    </div>
                </div>

                <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                    <div class="font-bold text-gray-800 mb-2">
                        <i class="fas fa-money-bill-wave mr-2"></i>Economic Coercion in Workplace
                    </div>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>• Workplace harassment cases: +43% (2024 vs 2023)</div>
                        <div>• Most common: Threats to fire/demote for refusing advances</div>
                        <div>• Sectors most affected: Hospitality (38%), Retail (27%), Education (19%)</div>
                        <div>• Survivor age: 22-35 years (81% of workplace cases)</div>
                        <div class="text-purple-700 font-bold mt-2">Status: Growing trend, need employer training and workplace policies</div>
                    </div>
                </div>

                <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                    <div class="font-bold text-gray-800 mb-2">
                        <i class="fas fa-ring mr-2"></i>Early/Forced Marriage Shift
                    </div>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>• Child marriage cases: +29% in rural districts (2024)</div>
                        <div>• Average age declining: 14.7 years (2024) vs 15.9 years (2022)</div>
                        <div>• Economic drivers: 72% cite poverty, dowry expectations</div>
                        <div>• Post-marriage violence: 84% experience IPV within first year</div>
                        <div class="text-orange-700 font-bold mt-2">Status: Concerning trend, need economic support programs for families</div>
                    </div>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div class="font-bold text-gray-800 mb-2">
                        <i class="fas fa-user-friends mr-2"></i>Peer-to-Peer Violence Among Youth
                    </div>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>• Youth-on-youth violence: +38% (ages 15-20)</div>
                        <div>• Common scenarios: School, parties, peer pressure contexts</div>
                        <div>• Gender dynamics: 67% male perpetrators, 33% female perpetrators</div>
                        <div>• Linked to: Social media challenges, gang culture, substance use</div>
                        <div class="text-blue-700 font-bold mt-2">Status: Emerging pattern, need youth intervention programs</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Model Performance -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Accuracy Metrics -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>Trend Detection Model Performance
                </h3>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Pattern Identification Accuracy</span>
                            <span class="text-sm font-bold text-green-700">93%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 93%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Seasonal Forecast Precision</span>
                            <span class="text-sm font-bold text-green-700">89%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 89%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Policy Impact Attribution</span>
                            <span class="text-sm font-bold text-green-700">84%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 84%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Emerging Trend Early Detection</span>
                            <span class="text-sm font-bold text-green-700">78%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 78%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 bg-green-50 p-4 rounded-lg">
                    <div class="font-bold text-green-800 mb-2">
                        <i class="fas fa-check-circle mr-2"></i>Validation Results
                    </div>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li>• Successfully predicted 11 of 12 seasonal spikes in 2024</li>
                        <li>• Identified 4 emerging trends 2-3 months before mainstream recognition</li>
                        <li>• Policy impact measurements validated by external evaluation</li>
                        <li>• Model retrained monthly with new case data</li>
                    </ul>
                </div>
            </div>

            <!-- Methodology -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-brain mr-2 text-indigo-600"></i>Trend Analysis Methodology
                </h3>
                
                <div class="space-y-3">
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Techniques Used</div>
                        <div class="text-sm text-gray-600">
                            Time series analysis (ARIMA), clustering algorithms, correlation analysis, 
                            regression discontinuity design (for policy impact), anomaly detection
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Data Sources</div>
                        <div class="text-sm text-gray-600">
                            7,834 case records (2020-2024), weather data, school calendars, economic indicators, 
                            policy implementation dates, external validation studies
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Pattern Detection Criteria</div>
                        <div class="text-sm text-gray-600">
                            Minimum 75% correlation strength, statistical significance p<0.05, 
                            validated across at least 3 time periods or 3+ districts
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Update Frequency</div>
                        <div class="text-sm text-gray-600">
                            Weekly pattern monitoring, monthly trend analysis, quarterly policy impact reviews
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 bg-indigo-50 p-4 rounded-lg">
                    <div class="font-bold text-indigo-800 mb-2">
                        <i class="fas fa-lightbulb mr-2"></i>How This Informs Strategy
                    </div>
                    <div class="text-sm text-gray-700">
                        Trend intelligence guides resource allocation, prevention campaign timing, 
                        policy adjustments, and donor reporting. Patterns identified here feed directly 
                        into spike prediction and resource forecasting models.
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Stories -->
        <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-star mr-2 text-yellow-500"></i>Success Stories: Trend Intelligence Impact
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-green-700 mb-2">34</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Policy Adjustments Recommended & Implemented</div>
                    <div class="text-xs text-gray-600">
                        Data-driven insights led to 34 policy adjustments since 2023, including mandatory 
                        reporting expansion, fast-track courts, and safe house additions.
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-blue-700 mb-2">$234K</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Budget Saved Through Pattern Prevention</div>
                    <div class="text-xs text-gray-600">
                        Seasonal pattern awareness enabled proactive prevention campaigns, reducing reactive 
                        crisis response costs by $234K annually (2024 vs 2022 baseline).
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-purple-700 mb-2">89%</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Stakeholder Satisfaction with Data-Driven Approach</div>
                    <div class="text-xs text-gray-600">
                        EU, UN, World Bank, and Ministry of Gender stakeholders rate trend intelligence 
                        as "highly valuable" for strategic planning and funding decisions.
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize charts after DOM is loaded
    setTimeout(() => {
        initTrendIntelligenceCharts();
    }, 100);
}

function initTrendIntelligenceCharts() {
    // Seasonal Trend Chart
    const seasonalCtx = document.getElementById('seasonalTrendChart');
    if (seasonalCtx) {
        new Chart(seasonalCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: '2024 Actual Cases',
                        data: [187, 201, 194, 267, 198, 234, 241, 289, 238, 206, 189, 298],
                        borderColor: '#DC2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: '2023 Cases',
                        data: [176, 189, 182, 253, 186, 221, 228, 267, 224, 193, 177, 274],
                        borderColor: '#F97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.05)',
                        tension: 0.4,
                        fill: false,
                        borderWidth: 2,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Baseline Average',
                        data: [195, 195, 195, 195, 195, 195, 195, 195, 195, 195, 195, 195],
                        borderColor: '#6B7280',
                        backgroundColor: 'transparent',
                        tension: 0,
                        fill: false,
                        borderWidth: 2,
                        borderDash: [10, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Cases'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
    }

    // Perpetrator Age Distribution Chart
    const ageCtx = document.getElementById('perpetratorAgeChart');
    if (ageCtx) {
        new Chart(ageCtx, {
            type: 'doughnut',
            data: {
                labels: ['18-25', '26-35', '36-50', '51+', 'Unknown'],
                datasets: [{
                    data: [34, 28, 24, 11, 3],
                    backgroundColor: [
                        '#EF4444',
                        '#F97316',
                        '#FBBF24',
                        '#10B981',
                        '#6B7280'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Perpetrator Relationship Chart
    const relationCtx = document.getElementById('perpetratorRelationChart');
    if (relationCtx) {
        new Chart(relationCtx, {
            type: 'bar',
            data: {
                labels: ['Family Member', 'Intimate Partner', 'Acquaintance', 'Stranger', 'Authority Figure', 'Other'],
                datasets: [{
                    label: 'Percentage of Cases',
                    data: [29, 21, 12, 23, 9, 6],
                    backgroundColor: [
                        '#DC2626',
                        '#F97316',
                        '#FBBF24',
                        '#3B82F6',
                        '#8B5CF6',
                        '#6B7280'
                    ],
                    borderColor: [
                        '#B91C1C',
                        '#EA580C',
                        '#F59E0B',
                        '#2563EB',
                        '#7C3AED',
                        '#4B5563'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.x}% of cases`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 35,
                        title: {
                            display: true,
                            text: 'Percentage of Cases'
                        }
                    }
                }
            }
        });
    }
}
