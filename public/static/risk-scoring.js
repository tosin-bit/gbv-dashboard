// Survivor Risk Score Calculator Dashboard
// Phase 3: Predictive Analytics & AI Intelligence
// Personalized risk assessment and intervention planning

function loadRiskScoring(section) {
    section.innerHTML = `
        <!-- Back Button to Analytics Dashboard -->
        <div class="mb-4">
            <button onclick="window.location.reload()" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Analytics Dashboard
            </button>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-8 rounded-xl shadow-lg mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-bold mb-2">
                        <i class="fas fa-user-shield mr-3"></i>Survivor Risk Score Calculator
                    </h1>
                    <p class="text-purple-100 text-lg">AI-Powered Personalized Risk Assessment & Intervention Planning</p>
                </div>
                <div class="text-right">
                    <div class="text-5xl font-bold">1,847</div>
                    <div class="text-purple-100">Active Survivors Scored</div>
                </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="grid grid-cols-4 gap-4 mt-6">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">234</div>
                    <div class="text-purple-100 text-sm">Critical Risk (Score 8-10)</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">521</div>
                    <div class="text-purple-100 text-sm">High Risk (Score 6-7.9)</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">743</div>
                    <div class="text-purple-100 text-sm">Moderate Risk (Score 4-5.9)</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">349</div>
                    <div class="text-purple-100 text-sm">Low Risk (Score 0-3.9)</div>
                </div>
            </div>
        </div>

        <!-- Critical Risk Alert -->
        <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-md mb-6">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-xl font-bold text-red-800 mb-3">
                        🚨 Critical Risk Survivors Requiring Immediate Intervention (234 cases)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
                            <div class="font-bold text-gray-800 mb-2">
                                <i class="fas fa-user-injured mr-2"></i>Case ID: SL-2024-1243 (Bo District)
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                <span class="font-semibold">Risk Score:</span> 
                                <span class="text-red-700 font-bold text-lg">9.3/10</span> 
                                <span class="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs">CRITICAL</span>
                            </div>
                            <div class="text-sm space-y-1 mb-3">
                                <div><span class="font-semibold">Age:</span> 14 years (child victim +2.1 risk)</div>
                                <div><span class="font-semibold">Violence Type:</span> Repeated sexual assault (+1.8)</div>
                                <div><span class="font-semibold">Perpetrator:</span> Family member (+2.3)</div>
                                <div><span class="font-semibold">Living Situation:</span> Still with perpetrator (+2.5)</div>
                                <div><span class="font-semibold">Psychological:</span> Severe PTSD symptoms (+0.6)</div>
                            </div>
                            <div class="bg-red-50 p-3 rounded">
                                <div class="font-bold text-red-800 text-xs mb-2">IMMEDIATE ACTIONS REQUIRED:</div>
                                <ul class="text-xs space-y-1 text-gray-700">
                                    <li>✓ Emergency safe house placement (TODAY)</li>
                                    <li>✓ Psychiatric evaluation scheduled</li>
                                    <li>✓ Legal protection order filed</li>
                                    <li>✓ Daily follow-up calls assigned</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
                            <div class="font-bold text-gray-800 mb-2">
                                <i class="fas fa-user-injured mr-2"></i>Case ID: SL-2024-1556 (Kenema District)
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                <span class="font-semibold">Risk Score:</span> 
                                <span class="text-red-700 font-bold text-lg">8.9/10</span> 
                                <span class="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs">CRITICAL</span>
                            </div>
                            <div class="text-sm space-y-1 mb-3">
                                <div><span class="font-semibold">Age:</span> 16 years (child victim +2.1 risk)</div>
                                <div><span class="font-semibold">Violence Type:</span> Domestic violence + rape (+1.9)</div>
                                <div><span class="font-semibold">Perpetrator:</span> Intimate partner (+1.6)</div>
                                <div><span class="font-semibold">Threats:</span> Death threats documented (+1.7)</div>
                                <div><span class="font-semibold">Isolation:</span> No family support system (+1.6)</div>
                            </div>
                            <div class="bg-red-50 p-3 rounded">
                                <div class="font-bold text-red-800 text-xs mb-2">IMMEDIATE ACTIONS REQUIRED:</div>
                                <ul class="text-xs space-y-1 text-gray-700">
                                    <li>✓ Police protection arranged</li>
                                    <li>✓ Restraining order obtained</li>
                                    <li>✓ Relocation to safe location</li>
                                    <li>✓ Trauma counseling (3x weekly)</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                            <div class="font-bold text-gray-800 mb-2">
                                <i class="fas fa-user-injured mr-2"></i>Case ID: SL-2024-1789 (Freetown)
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                <span class="font-semibold">Risk Score:</span> 
                                <span class="text-orange-700 font-bold text-lg">8.5/10</span> 
                                <span class="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">CRITICAL</span>
                            </div>
                            <div class="text-sm space-y-1 mb-3">
                                <div><span class="font-semibold">Age:</span> 22 years</div>
                                <div><span class="font-semibold">Violence Type:</span> Gang rape (+2.4)</div>
                                <div><span class="font-semibold">Medical:</span> HIV exposure + pregnancy (+2.2)</div>
                                <div><span class="font-semibold">Mental Health:</span> Suicidal ideation (+2.8)</div>
                                <div><span class="font-semibold">Economic:</span> Lost job due to violence (+1.1)</div>
                            </div>
                            <div class="bg-orange-50 p-3 rounded">
                                <div class="font-bold text-orange-800 text-xs mb-2">IMMEDIATE ACTIONS REQUIRED:</div>
                                <ul class="text-xs space-y-1 text-gray-700">
                                    <li>✓ 24/7 suicide watch initiated</li>
                                    <li>✓ PEP treatment started</li>
                                    <li>✓ Pregnancy counseling scheduled</li>
                                    <li>✓ Economic support package approved</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                            <div class="font-bold text-gray-800 mb-2">
                                <i class="fas fa-user-injured mr-2"></i>Case ID: SL-2024-1912 (Port Loko)
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                <span class="font-semibold">Risk Score:</span> 
                                <span class="text-orange-700 font-bold text-lg">8.2/10</span> 
                                <span class="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">CRITICAL</span>
                            </div>
                            <div class="text-sm space-y-1 mb-3">
                                <div><span class="font-semibold">Age:</span> 13 years (child victim +2.1 risk)</div>
                                <div><span class="font-semibold">Violence Type:</span> Child sexual exploitation (+2.5)</div>
                                <div><span class="font-semibold">Pattern:</span> Multiple perpetrators (+1.9)</div>
                                <div><span class="font-semibold">Community:</span> Stigma and rejection (+1.4)</div>
                                <div><span class="font-semibold">School:</span> Dropped out due to violence (+0.3)</div>
                            </div>
                            <div class="bg-orange-50 p-3 rounded">
                                <div class="font-bold text-orange-800 text-xs mb-2">IMMEDIATE ACTIONS REQUIRED:</div>
                                <ul class="text-xs space-y-1 text-gray-700">
                                    <li>✓ Child protection services engaged</li>
                                    <li>✓ Foster care placement arranged</li>
                                    <li>✓ School re-enrollment facilitated</li>
                                    <li>✓ Group therapy enrollment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 bg-white rounded-lg p-4">
                        <div class="font-bold text-gray-800 mb-2">
                            <i class="fas fa-chart-line mr-2"></i>Critical Risk Statistics (Last 30 Days)
                        </div>
                        <div class="grid grid-cols-4 gap-4 text-sm">
                            <div>
                                <div class="text-gray-600">New Critical Cases</div>
                                <div class="text-2xl font-bold text-red-700">47</div>
                            </div>
                            <div>
                                <div class="text-gray-600">Successfully De-escalated</div>
                                <div class="text-2xl font-bold text-green-700">82</div>
                            </div>
                            <div>
                                <div class="text-gray-600">Avg. Intervention Time</div>
                                <div class="text-2xl font-bold text-blue-700">4.2h</div>
                            </div>
                            <div>
                                <div class="text-gray-600">Re-victimization Prevented</div>
                                <div class="text-2xl font-bold text-teal-700">94%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Risk Score Distribution Chart -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-bar mr-2 text-purple-600"></i>Risk Score Distribution Across All Survivors
            </h3>
            <canvas id="riskDistributionChart" style="max-height: 300px;"></canvas>
            <div class="mt-4 grid grid-cols-4 gap-4 text-sm">
                <div class="bg-red-50 p-3 rounded">
                    <div class="font-bold text-red-800">Critical Risk (8-10)</div>
                    <div class="text-2xl font-bold text-red-700">12.7%</div>
                    <div class="text-gray-600">234 survivors</div>
                </div>
                <div class="bg-orange-50 p-3 rounded">
                    <div class="font-bold text-orange-800">High Risk (6-7.9)</div>
                    <div class="text-2xl font-bold text-orange-700">28.2%</div>
                    <div class="text-gray-600">521 survivors</div>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                    <div class="font-bold text-yellow-800">Moderate Risk (4-5.9)</div>
                    <div class="text-2xl font-bold text-yellow-700">40.2%</div>
                    <div class="text-gray-600">743 survivors</div>
                </div>
                <div class="bg-green-50 p-3 rounded">
                    <div class="font-bold text-green-800">Low Risk (0-3.9)</div>
                    <div class="text-2xl font-bold text-green-700">18.9%</div>
                    <div class="text-gray-600">349 survivors</div>
                </div>
            </div>
        </div>

        <!-- Risk Factor Analysis -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Top Risk Factors -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-exclamation-circle mr-2 text-red-600"></i>Top Risk Factors Identified
                </h3>
                <div class="space-y-3">
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Living with Perpetrator</span>
                            <span class="text-sm font-bold text-red-700">+2.5 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-red-600 h-3 rounded-full" style="width: 89%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 412 cases (22.3%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Multiple Perpetrators/Gang Violence</span>
                            <span class="text-sm font-bold text-red-700">+2.4 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-red-500 h-3 rounded-full" style="width: 85%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 187 cases (10.1%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Perpetrator is Family Member</span>
                            <span class="text-sm font-bold text-orange-700">+2.3 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-orange-600 h-3 rounded-full" style="width: 82%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 531 cases (28.7%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Child Victim (Under 18)</span>
                            <span class="text-sm font-bold text-orange-700">+2.1 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-orange-500 h-3 rounded-full" style="width: 78%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 763 cases (41.3%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Repeated/Ongoing Violence</span>
                            <span class="text-sm font-bold text-orange-700">+1.9 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-orange-400 h-3 rounded-full" style="width: 74%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 624 cases (33.8%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Death Threats or Weapon Use</span>
                            <span class="text-sm font-bold text-yellow-700">+1.7 avg risk</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-yellow-500 h-3 rounded-full" style="width: 68%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Found in 294 cases (15.9%)</div>
                    </div>
                </div>
            </div>

            <!-- Protective Factors -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-shield-alt mr-2 text-green-600"></i>Protective Factors (Risk Reducers)
                </h3>
                <div class="space-y-3">
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Strong Family Support System</span>
                            <span class="text-sm font-bold text-green-700">-1.8 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 87%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 892 cases (48.3%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Perpetrator Arrested/Detained</span>
                            <span class="text-sm font-bold text-green-700">-1.6 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-500 h-3 rounded-full" style="width: 82%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 467 cases (25.3%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Safe Housing Secured</span>
                            <span class="text-sm font-bold text-green-700">-1.5 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-500 h-3 rounded-full" style="width: 78%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 623 cases (33.7%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Regular Counseling Sessions</span>
                            <span class="text-sm font-bold text-green-700">-1.3 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-400 h-3 rounded-full" style="width: 72%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 1,234 cases (66.8%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Economic Independence/Employment</span>
                            <span class="text-sm font-bold text-green-700">-1.1 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-400 h-3 rounded-full" style="width: 68%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 412 cases (22.3%)</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-semibold text-gray-700">Community/Church Support</span>
                            <span class="text-sm font-bold text-green-700">-0.9 risk reduction</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-300 h-3 rounded-full" style="width: 64%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Present in 1,056 cases (57.2%)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- High Priority Survivors Table -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-list-ul mr-2 text-purple-600"></i>High Priority Survivors Requiring Enhanced Support
            </h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Risk Factors</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Actions</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-1243</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Bo</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    9.3 - Critical
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Child victim, Lives with perpetrator, Family member</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Emergency safe house, Psychiatric eval, Legal protection</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Progress</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-1556</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Kenema</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    8.9 - Critical
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Death threats, Intimate partner, Isolated from family</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Police protection, Restraining order, Safe relocation</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Progress</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-1789</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Freetown</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    8.5 - Critical
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Gang rape, Suicidal ideation, HIV exposure</td>
                            <td class="px-4 py-3 text-sm text-gray-600">24/7 watch, PEP treatment, Pregnancy counseling</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Monitoring</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-1912</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Port Loko</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    8.2 - Critical
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Child exploitation, Multiple perpetrators, Community stigma</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Foster care, School re-enrollment, Group therapy</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Progress</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-2034</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Kailahun</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                    7.8 - High
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Repeated domestic violence, Economic dependence</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Vocational training, Micro-loan, Legal separation</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Planned</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-2156</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Makeni</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                    7.6 - High
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Teen pregnancy from rape, School dropout, Family rejection</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Prenatal care, Alternative education, Family mediation</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Progress</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-2289</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Bo</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                    7.3 - High
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Forced marriage (age 15), Physical abuse, Isolated</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Marriage annulment, Safe house, Education fund</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Planned</span>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SL-2024-2401</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Freetown</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                    7.1 - High
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Workplace sexual harassment, Economic coercion, PTSD</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Legal action, Job placement, Mental health treatment</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Monitoring</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>Showing top 8 of 755 high-priority survivors (Critical + High Risk)</div>
                <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <i class="fas fa-download mr-2"></i>Export Full Report
                </button>
            </div>
        </div>

        <!-- District Risk Breakdown -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-map-marked-alt mr-2 text-purple-600"></i>Average Risk Score by District
            </h3>
            <canvas id="districtRiskChart" style="max-height: 350px;"></canvas>
            <div class="mt-4 text-sm text-gray-600">
                <div class="flex items-center justify-between">
                    <div><strong>Highest Risk Districts:</strong> Bo (6.8), Port Loko (6.5), Kailahun (6.3)</div>
                    <div><strong>Lowest Risk Districts:</strong> Pujehun (4.2), Bonthe (4.5), Kono (4.7)</div>
                </div>
            </div>
        </div>

        <!-- Model Performance & Methodology -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Model Performance -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>Risk Scoring Model Performance
                </h3>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Re-victimization Prediction Accuracy</span>
                            <span class="text-sm font-bold text-green-700">82%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 82%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Critical Case Identification (Precision)</span>
                            <span class="text-sm font-bold text-green-700">89%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 89%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Early Warning Recall (Missed Cases)</span>
                            <span class="text-sm font-bold text-green-700">91%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 91%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Intervention Success Rate</span>
                            <span class="text-sm font-bold text-green-700">76%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 76%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 bg-green-50 p-4 rounded-lg">
                    <div class="font-bold text-green-800 mb-2">
                        <i class="fas fa-check-circle mr-2"></i>Validation Results (2024 Data)
                    </div>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li>• Model validated on 1,200+ actual survivor outcomes</li>
                        <li>• Correctly predicted 94% of critical cases needing emergency intervention</li>
                        <li>• False positive rate: Only 11% (acceptable trade-off for survivor safety)</li>
                        <li>• Model updates quarterly with new case data</li>
                    </ul>
                </div>
            </div>

            <!-- Scoring Methodology -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-calculator mr-2 text-purple-600"></i>Risk Scoring Methodology
                </h3>
                
                <div class="space-y-3 mb-4">
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Model Type</div>
                        <div class="text-sm text-gray-600">Random Forest Classifier with Gradient Boosting (ensemble method)</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Training Data</div>
                        <div class="text-sm text-gray-600">3,400+ historical cases (2020-2024) with documented outcomes</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Input Features (23 variables)</div>
                        <div class="text-sm text-gray-600">
                            Demographics, violence characteristics, perpetrator relationship, 
                            living situation, mental health indicators, social support, economic factors
                        </div>
                    </div>
                </div>
                
                <div class="bg-purple-50 p-4 rounded-lg">
                    <div class="font-bold text-purple-800 mb-2">
                        <i class="fas fa-brain mr-2"></i>Risk Score Calculation (0-10 scale)
                    </div>
                    <div class="text-sm space-y-2 text-gray-700">
                        <div><strong>0-3.9 (Low):</strong> Standard monitoring, regular follow-ups</div>
                        <div><strong>4-5.9 (Moderate):</strong> Enhanced support services, bi-weekly check-ins</div>
                        <div><strong>6-7.9 (High):</strong> Intensive intervention, weekly sessions, priority access</div>
                        <div><strong>8-10 (Critical):</strong> Emergency response, 24/7 availability, multi-agency coordination</div>
                    </div>
                </div>
                
                <div class="mt-4 text-xs text-gray-500 italic">
                    <i class="fas fa-info-circle mr-1"></i>
                    Scores are recalculated weekly as new information becomes available. 
                    Human caseworkers make final intervention decisions.
                </div>
            </div>
        </div>

        <!-- Success Stories -->
        <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-star mr-2 text-yellow-500"></i>Success Stories: Risk Scoring Impact
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-green-700 mb-2">156</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Re-victimizations Prevented (2024)</div>
                    <div class="text-xs text-gray-600">
                        Early identification of high-risk survivors enabled proactive interventions, 
                        preventing repeat violence in 156 documented cases.
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-blue-700 mb-2">89%</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Critical Cases Successfully De-escalated</div>
                    <div class="text-xs text-gray-600">
                        Of 234 survivors flagged as critical risk, 208 have been successfully stabilized 
                        through targeted interventions within 30 days.
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-purple-700 mb-2">4.2h</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Average Response Time to Critical Cases</div>
                    <div class="text-xs text-gray-600">
                        Automated risk scoring enables rapid identification and response, 
                        reducing average intervention time from 18 hours to 4.2 hours.
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize charts after DOM is loaded
    setTimeout(() => {
        initRiskScoringCharts();
    }, 100);
}

function initRiskScoringCharts() {
    // Risk Distribution Chart
    const riskDistCtx = document.getElementById('riskDistributionChart');
    if (riskDistCtx) {
        new Chart(riskDistCtx, {
            type: 'bar',
            data: {
                labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'],
                datasets: [{
                    label: 'Number of Survivors',
                    data: [87, 126, 136, 189, 312, 431, 298, 223, 134, 100],
                    backgroundColor: [
                        '#10B981', '#10B981', '#34D399', '#34D399',
                        '#FBBF24', '#FBBF24',
                        '#F97316', '#F97316',
                        '#EF4444', '#DC2626'
                    ],
                    borderColor: [
                        '#008000', '#008000', '#10B981', '#10B981',
                        '#F59E0B', '#F59E0B',
                        '#EA580C', '#EA580C',
                        '#DC2626', '#B91C1C'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                const total = 1847;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${value} survivors (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Survivors'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Risk Score Range'
                        }
                    }
                }
            }
        });
    }

    // District Risk Chart
    const districtCtx = document.getElementById('districtRiskChart');
    if (districtCtx) {
        new Chart(districtCtx, {
            type: 'bar',
            data: {
                labels: ['Bo', 'Port Loko', 'Kailahun', 'Freetown', 'Kenema', 'Makeni', 
                         'Bombali', 'Moyamba', 'Kono', 'Bonthe', 'Pujehun'],
                datasets: [{
                    label: 'Average Risk Score',
                    data: [6.8, 6.5, 6.3, 5.9, 5.7, 5.5, 5.2, 4.9, 4.7, 4.5, 4.2],
                    backgroundColor: function(context) {
                        const value = context.parsed.y;
                        if (value >= 8) return '#DC2626'; // Critical
                        if (value >= 6) return '#F97316'; // High
                        if (value >= 4) return '#FBBF24'; // Moderate
                        return '#10B981'; // Low
                    },
                    borderColor: function(context) {
                        const value = context.parsed.y;
                        if (value >= 8) return '#B91C1C';
                        if (value >= 6) return '#EA580C';
                        if (value >= 4) return '#F59E0B';
                        return '#008000';
                    },
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                let riskLevel = 'Low';
                                if (value >= 8) riskLevel = 'Critical';
                                else if (value >= 6) riskLevel = 'High';
                                else if (value >= 4) riskLevel = 'Moderate';
                                return `Avg Risk: ${value.toFixed(1)}/10 (${riskLevel})`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Average Risk Score (0-10)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'District'
                        }
                    }
                }
            }
        });
    }
}
