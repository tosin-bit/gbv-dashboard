/**
 * Analytics Dashboard
 * Predictive analysis, risk correlations, and district profiles
 */

function loadAnalyticsDashboard(section) {
    // Use enhanced analytics dashboard if available
    if (typeof loadEnhancedAnalyticsDashboard === 'function') {
        loadEnhancedAnalyticsDashboard(section);
        return;
    }
    
    // Fallback to original
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="text-white p-8 rounded-xl shadow-lg" style="background: linear-gradient(to right, #1e3a8a, #1e90ff, #32cd32);">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold mb-2">
                            <i class="fas fa-brain mr-3"></i>AI-Powered Predictive Analytics
                        </h1>
                        <p class="text-blue-100 text-lg">Advanced forecasting, risk assessment, and trend intelligence</p>
                    </div>
                    <div class="text-right">
                        <div class="text-5xl font-bold">85%</div>
                        <div class="text-blue-100">Prediction Accuracy</div>
                    </div>
                </div>
                
                <!-- Key Metrics -->
                <div class="grid grid-cols-4 gap-4 mt-6">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-3xl font-bold">16</div>
                        <div class="text-blue-100 text-sm">Districts Forecasted</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-3xl font-bold">7-Day</div>
                        <div class="text-blue-100 text-sm">Advance Warning</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-3xl font-bold">1,847</div>
                        <div class="text-blue-100 text-sm">Survivors Assessed</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-3xl font-bold">34</div>
                        <div class="text-blue-100 text-sm">Crises Prevented</div>
                    </div>
                </div>
            </div>

            <!-- AI-Powered Analytics Navigation Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Case Spike Prediction Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showAnalyticsSection('spike-prediction')">
                    <div class="p-6 text-white" style="background: linear-gradient(to right, #1e3a8a, #1e90ff);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-chart-line text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">AI</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Spike Prediction</h3>
                        <p class="text-blue-100 text-sm">7-day case forecasting</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>85% prediction accuracy</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>District-level forecasts</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>7-day advance warning</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Recommended actions</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" style="background-color: #1e3a8a;" onmouseover="this.style.backgroundColor='#1e90ff'" onmouseout="this.style.backgroundColor='#1e3a8a'">
                            <i class="fas fa-arrow-right mr-2"></i>View Predictions
                        </button>
                    </div>
                </div>

                <!-- Risk Scoring Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showAnalyticsSection('risk-scoring')">
                    <div class="p-6 text-white" style="background: linear-gradient(to right, #1e90ff, #32cd32);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-user-shield text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">AI</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Risk Scoring</h3>
                        <p class="text-blue-100 text-sm">Survivor risk assessment</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>1,847 survivors scored</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Risk factor analysis</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Intervention planning</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>82% accuracy rate</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" style="background-color: #1e90ff;" onmouseover="this.style.backgroundColor='#32cd32'" onmouseout="this.style.backgroundColor='#1e90ff'">
                            <i class="fas fa-arrow-right mr-2"></i>Calculate Risk
                        </button>
                    </div>
                </div>

                <!-- Resource Forecast Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showAnalyticsSection('resource-forecast')">
                    <div class="p-6 text-white" style="background: linear-gradient(to right, #32cd32, #ffd700);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-box-open text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">AI</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Resource Forecast</h3>
                        <p class="text-green-100 text-sm">Supply & budget predictions</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>30-day forecast horizon</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Medical supply tracking</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Staffing requirements</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>87% forecast accuracy</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" style="background-color: #32cd32;" onmouseover="this.style.backgroundColor='#ffd700'" onmouseout="this.style.backgroundColor='#32cd32'">
                            <i class="fas fa-arrow-right mr-2"></i>View Forecast
                        </button>
                    </div>
                </div>

                <!-- Trend Intelligence Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showAnalyticsSection('trend-intelligence')">
                    <div class="p-6 text-white" style="background: linear-gradient(to right, #ffd700, #1e3a8a);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-brain text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">AI</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Trend Intelligence</h3>
                        <p class="text-yellow-100 text-sm">Pattern & policy impact</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>12 active patterns detected</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Seasonal analysis</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Perpetrator profiling</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Policy effectiveness</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" style="background-color: #ffd700; color: #1e3a8a;" onmouseover="this.style.backgroundColor='#1e3a8a'; this.style.color='#ffffff'" onmouseout="this.style.backgroundColor='#ffd700'; this.style.color='#1e3a8a'">
                            <i class="fas fa-arrow-right mr-2"></i>Analyze Trends
                        </button>
                    </div>
                </div>
            </div>

            <!-- Predictive Analysis Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Trend Prediction -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-chart-area mr-2"></i>Trend Prediction
                    </h3>
                    <div class="space-y-4">
                        <div class="border-l-4 pl-3" style="border-left-color: #ef4444;">
                            <div class="text-sm text-gray-600">Next Month Forecast</div>
                            <div class="text-2xl font-bold text-gray-900">312 cases</div>
                            <div class="text-xs text-red-600 mt-1">
                                <i class="fas fa-arrow-up mr-1"></i>+8% increase predicted
                            </div>
                        </div>
                        
                        <div class="border-l-4 pl-3" style="border-left-color: #ffd700;">
                            <div class="text-sm text-gray-600">Q1 2026 Projection</div>
                            <div class="text-2xl font-bold text-gray-900">890 cases</div>
                            <div class="text-xs" style="color: #ffd700;">
                                <i class="fas fa-chart-line mr-1"></i>Seasonal trend expected
                            </div>
                        </div>
                        
                        <div class="border-l-4 pl-3" style="border-left-color: #32cd32;">
                            <div class="text-sm text-gray-600">Prediction Confidence</div>
                            <div class="text-2xl font-bold text-gray-900">87%</div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div class="h-2 rounded-full" style="width: 87%; background-color: #32cd32;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Risk Hotspots -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-fire mr-2"></i>Emerging Risk Hotspots
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-red-50 rounded">
                            <div>
                                <div class="font-semibold text-gray-900">Port Loko</div>
                                <div class="text-xs text-red-600">+45% in last 30 days</div>
                            </div>
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
                                ALERT
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-yellow-50 rounded">
                            <div>
                                <div class="font-semibold text-gray-900">Kono</div>
                                <div class="text-xs text-yellow-600">+28% trend detected</div>
                            </div>
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-600 text-white">
                                WATCH
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-orange-50 rounded">
                            <div>
                                <div class="font-semibold text-gray-900">Moyamba</div>
                                <div class="text-xs text-orange-600">+19% increase</div>
                            </div>
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-orange-600 text-white">
                                MONITOR
                            </span>
                        </div>
                    </div>
                </div>

                <!-- AI Insights -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-brain mr-2"></i>AI-Generated Insights
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="p-3 bg-blue-50 rounded-lg border-l-4" style="border-left-color: #1e3a8a;">
                            <div class="font-semibold text-gray-900 mb-1">Pattern Detected</div>
                            <p class="text-gray-700">60% of cases in Western Area occur near transportation hubs</p>
                        </div>
                        
                        <div class="p-3 bg-green-50 rounded-lg border-l-4" style="border-left-color: #32cd32;">
                            <div class="font-semibold text-gray-900 mb-1">Positive Trend</div>
                            <p class="text-gray-700">Response times in Rainbo centers improved by 35%</p>
                        </div>
                        
                        <div class="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                            <div class="font-semibold text-gray-900 mb-1">Recommendation</div>
                            <p class="text-gray-700">Deploy additional FSU resources to Port Loko district</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Risk Factor Correlations -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-project-diagram mr-2"></i>Risk Factor Correlations
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Correlation Chart 1 -->
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Age vs. Violence Type</h4>
                        <canvas id="age-violence-chart" height="200"></canvas>
                    </div>
                    
                    <!-- Correlation Chart 2 -->
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Time of Day Distribution</h4>
                        <canvas id="time-distribution-chart" height="200"></canvas>
                    </div>
                    
                    <!-- Correlation Matrix -->
                    <div class="md:col-span-2">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Risk Factor Correlation Matrix</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-sm">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th class="px-4 py-2 text-left">Factor</th>
                                        <th class="px-4 py-2 text-center">Economic Stress</th>
                                        <th class="px-4 py-2 text-center">Population Density</th>
                                        <th class="px-4 py-2 text-center">Education Level</th>
                                        <th class="px-4 py-2 text-center">Service Access</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t">
                                        <td class="px-4 py-2 font-semibold">Economic Stress</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-green-600 text-white">1.00</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-white">0.67</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white">-0.82</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-orange-500 text-white">-0.54</span>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="px-4 py-2 font-semibold">Population Density</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-white">0.67</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-green-600 text-white">1.00</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-gray-400 text-white">0.23</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-green-500 text-white">0.78</span>
                                        </td>
                                    </tr>
                                    <tr class="border-t">
                                        <td class="px-4 py-2 font-semibold">Education Level</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white">-0.82</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-gray-400 text-white">0.23</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-green-600 text-white">1.00</span>
                                        </td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-white">0.61</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-2 text-xs text-gray-500">
                            <p><strong>Correlation Legend:</strong> 
                                <span class="text-green-600">●</span> Strong Positive (>0.7) | 
                                <span class="text-yellow-600">●</span> Moderate (0.4-0.7) | 
                                <span class="text-gray-600">●</span> Weak (<0.4) | 
                                <span class="text-red-600">●</span> Strong Negative (<-0.7)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- District Risk Profiles -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-shield-alt mr-2"></i>District Risk Profiles
                </h3>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <!-- District Profile Cards -->
                    ${generateDistrictProfiles()}
                </div>
                
                <div class="mt-4 text-center">
                    <button onclick="viewAllProfiles()" 
                            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        <i class="fas fa-list mr-2"></i>View All 16 District Profiles
                    </button>
                </div>
            </div>

            <!-- Seasonal Analysis -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-calendar-alt mr-2"></i>Seasonal Patterns
                    </h3>
                    <canvas id="seasonal-chart" height="200"></canvas>
                    <div class="mt-4 text-sm text-gray-600">
                        <p><strong>Key Findings:</strong></p>
                        <ul class="list-disc list-inside space-y-1 mt-2">
                            <li>Peak cases occur during rainy season (July-September)</li>
                            <li>School holiday periods show 23% increase in child cases</li>
                            <li>Festive seasons correlate with domestic violence spikes</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-users mr-2"></i>Demographic Analysis
                    </h3>
                    <canvas id="demographic-chart" height="200"></canvas>
                    <div class="mt-4 text-sm text-gray-600">
                        <p><strong>Demographics:</strong></p>
                        <ul class="list-disc list-inside space-y-1 mt-2">
                            <li>68% of survivors are aged 11-17 years</li>
                            <li>94% of cases involve female survivors</li>
                            <li>52% of perpetrators are family members</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize charts
    setTimeout(() => {
        initializeAnalyticsCharts();
    }, 500);
}

function generateDistrictProfiles() {
    const profiles = [
        { name: 'Western Area Urban', risk: 'High', score: 8.7, trend: 'up', cases: 695 },
        { name: 'Bo', risk: 'High', score: 7.9, trend: 'stable', cases: 412 },
        { name: 'Kenema', risk: 'High', score: 7.2, trend: 'down', cases: 324 },
        { name: 'Bombali', risk: 'Medium', score: 5.8, trend: 'up', cases: 298 },
        { name: 'Kailahun', risk: 'Medium', score: 5.4, trend: 'stable', cases: 287 },
        { name: 'Port Loko', risk: 'Low', score: 3.2, trend: 'up', cases: 189 }
    ];
    
    return profiles.map(p => `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-900">${p.name}</h4>
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                    p.risk === 'High' ? 'bg-red-100 text-red-800' :
                    p.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }">${p.risk} Risk</span>
            </div>
            
            <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Risk Score</span>
                    <span class="font-semibold" style="color: #1e3a8a;">${p.score}/10</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full" style="width: ${p.score * 10}%; background-color: ${
                        p.risk === 'High' ? '#ef4444' :
                        p.risk === 'Medium' ? '#ffd700' : '#32cd32'
                    };"></div>
                </div>
                
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Total Cases</span>
                    <span class="font-semibold">${p.cases}</span>
                </div>
                
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Trend</span>
                    <span class="font-semibold ${
                        p.trend === 'up' ? 'text-red-600' :
                        p.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                    }">
                        <i class="fas fa-arrow-${p.trend === 'up' ? 'up' : p.trend === 'down' ? 'down' : 'right'} mr-1"></i>
                        ${p.trend === 'up' ? 'Rising' : p.trend === 'down' ? 'Falling' : 'Stable'}
                    </span>
                </div>
            </div>
            
            <button onclick="viewDetailedProfile('${p.name}')" 
                    class="mt-3 w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <i class="fas fa-search mr-2"></i>View Detailed Profile
            </button>
        </div>
    `).join('');
}

function initializeAnalyticsCharts() {
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet');
        return;
    }
    
    // Age vs Violence Type Chart
    const ageViolenceCtx = document.getElementById('age-violence-chart');
    if (ageViolenceCtx) {
        new Chart(ageViolenceCtx, {
            type: 'bar',
            data: {
                labels: ['0-10', '11-15', '16-17', '18-25', '26-35', '36+'],
                datasets: [
                    {
                        label: 'Sexual Assault',
                        data: [12, 38, 25, 10, 8, 7],
                        backgroundColor: 'rgba(239, 68, 68, 0.7)'
                    },
                    {
                        label: 'Physical Assault',
                        data: [5, 8, 12, 15, 18, 12],
                        backgroundColor: 'rgba(255, 215, 0, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    // Time Distribution Chart
    const timeDistCtx = document.getElementById('time-distribution-chart');
    if (timeDistCtx) {
        new Chart(timeDistCtx, {
            type: 'doughnut',
            data: {
                labels: ['Night (6PM-12AM)', 'Late Night (12AM-6AM)', 'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)'],
                datasets: [{
                    data: [35, 28, 12, 25],
                    backgroundColor: [
                        'rgba(30, 58, 138, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(255, 215, 0, 0.7)',
                        'rgba(50, 205, 50, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    // Seasonal Chart
    const seasonalCtx = document.getElementById('seasonal-chart');
    if (seasonalCtx) {
        new Chart(seasonalCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Cases per Month',
                    data: [230, 215, 245, 268, 276, 289, 310, 305, 298, 263, 248, 235],
                    borderColor: 'rgb(30, 58, 138)',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }
    
    // Demographic Chart
    const demographicCtx = document.getElementById('demographic-chart');
    if (demographicCtx) {
        new Chart(demographicCtx, {
            type: 'bar',
            data: {
                labels: ['Perpetrator Relationship'],
                datasets: [
                    { label: 'Family Member', data: [52], backgroundColor: 'rgba(239, 68, 68, 0.7)' },
                    { label: 'Known Person', data: [28], backgroundColor: 'rgba(255, 215, 0, 0.7)' },
                    { label: 'Stranger', data: [12], backgroundColor: 'rgba(30, 58, 138, 0.7)' },
                    { label: 'Unknown', data: [8], backgroundColor: 'rgba(156, 163, 175, 0.7)' }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

function updateAnalytics(period) {
    console.log(`Updating analytics for period: ${period} days`);
    alert(`Analytics updated for last ${period === 'all' ? 'all time' : period + ' days'}`);
}

function exportAnalytics() {
    alert('📊 Exporting analytics report...\n\nFormats available:\n- PDF Report\n- Excel Spreadsheet\n- CSV Data\n- PowerPoint Presentation');
}

function viewAllProfiles() {
    alert('📋 Loading all 16 district risk profiles...\n\nThis would open a comprehensive view with detailed risk assessments for every district in Sierra Leone.');
}

async function viewDetailedProfile(districtName) {
    // Show loading modal
    showDistrictProfileModal(districtName, null, true);
    
    try {
        // Find district ID from the profiles
        const profiles = {
            'Western Area Urban': { id: 1, risk: 'High', score: 7.9, cases: 412, trend: 'Stable' },
            'Bo': { id: 3, risk: 'High', score: 7.2, cases: 324, trend: 'Falling' },
            'Kenema': { id: 7, risk: 'High', score: 7.2, cases: 324, trend: 'Falling' },
            'Bombali': { id: 10, risk: 'Medium', score: 5.8, cases: 298, trend: 'Rising' },
            'Kailahun': { id: 8, risk: 'Medium', score: 5.4, cases: 287, trend: 'Stable' },
            'Port Loko': { id: 13, risk: 'Low', score: 3.2, cases: 189, trend: 'Rising' }
        };
        
        const profile = profiles[districtName];
        
        if (!profile) {
            throw new Error('District profile not found');
        }
        
        // Fetch additional data from API
        const response = await fetch(`/api/districts/${profile.id}/report`);
        const data = await response.json();
        
        // Combine profile data with API data
        const fullProfile = {
            ...profile,
            name: districtName,
            ...data
        };
        
        // Show detailed profile modal
        showDistrictProfileModal(districtName, fullProfile, false);
        
    } catch (error) {
        console.error('Error loading district profile:', error);
        showDistrictProfileModal(districtName, null, false, error.message);
    }
}

function showDistrictProfileModal(districtName, data, loading = false, error = null) {
    // Remove existing modal
    const existingModal = document.getElementById('district-profile-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div id="district-profile-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                ${loading ? `
                    <div class="p-8 text-center">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p class="text-gray-600">Loading detailed profile for ${districtName}...</p>
                    </div>
                ` : error ? `
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                                Error Loading Profile
                            </h2>
                            <button onclick="closeDistrictProfileModal()" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div class="text-center text-red-600">
                            <p>${error}</p>
                        </div>
                    </div>
                ` : `
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-2xl font-bold mb-1">
                                    <i class="fas fa-shield-alt mr-2"></i>
                                    District Risk Profile: ${districtName}
                                </h2>
                                <p class="text-sm text-blue-100">Comprehensive risk analysis and intervention recommendations</p>
                            </div>
                            <button onclick="closeDistrictProfileModal()" class="text-white hover:text-gray-200 transition-colors">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 space-y-6">
                        <!-- Analysis Includes Banner -->
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <h3 class="font-semibold text-blue-900 mb-2">
                                <i class="fas fa-info-circle mr-2"></i>Detailed Analysis Includes:
                            </h3>
                            <div class="grid grid-cols-2 gap-2 text-sm text-blue-800">
                                <div><i class="fas fa-check mr-2"></i>Historical trends</div>
                                <div><i class="fas fa-check mr-2"></i>Risk factors breakdown</div>
                                <div><i class="fas fa-check mr-2"></i>Service gaps</div>
                                <div><i class="fas fa-check mr-2"></i>Recommended interventions</div>
                            </div>
                        </div>
                        
                        <!-- Key Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="bg-${getRiskColorClass(data?.risk)}-50 rounded-lg p-4 border-l-4 border-${getRiskColorClass(data?.risk)}-500">
                                <div class="text-sm text-gray-600">Risk Score</div>
                                <div class="text-3xl font-bold text-${getRiskColorClass(data?.risk)}-600">${data?.score || 0}/10</div>
                                <div class="text-xs text-gray-500 mt-1">${data?.risk || 'N/A'} Risk</div>
                            </div>
                            <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <div class="text-sm text-gray-600">Total Cases</div>
                                <div class="text-3xl font-bold text-blue-600">${data?.cases || data?.summary?.total_cases || 0}</div>
                                <div class="text-xs text-gray-500 mt-1">All-time total</div>
                            </div>
                            <div class="bg-${getTrendColorClass(data?.trend)}-50 rounded-lg p-4 border-l-4 border-${getTrendColorClass(data?.trend)}-500">
                                <div class="text-sm text-gray-600">Trend</div>
                                <div class="text-2xl font-bold text-${getTrendColorClass(data?.trend)}-600">
                                    <i class="fas fa-arrow-${getTrendIcon(data?.trend)} mr-1"></i>${data?.trend || 'N/A'}
                                </div>
                                <div class="text-xs text-gray-500 mt-1">30-day trend</div>
                            </div>
                            <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                <div class="text-sm text-gray-600">This Month</div>
                                <div class="text-3xl font-bold text-purple-600">${getThisMonthCases(data?.monthly_trends)}</div>
                                <div class="text-xs text-gray-500 mt-1">Current month</div>
                            </div>
                        </div>
                        
                        <!-- Historical Trends -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                                Historical Trends (Last 6 Months)
                            </h3>
                            ${data?.monthly_trends && data.monthly_trends.length > 0 ? `
                                <canvas id="profile-trends-chart" height="80"></canvas>
                            ` : `
                                <p class="text-gray-600 text-sm">No trend data available</p>
                            `}
                        </div>
                        
                        <!-- Risk Factors Breakdown -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-exclamation-triangle text-orange-600 mr-2"></i>
                                Risk Factors Breakdown
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm text-gray-700">Population Density</span>
                                        <span class="text-sm font-semibold">High - 8.5/10</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="h-2 rounded-full bg-red-500" style="width: 85%;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm text-gray-700">Poverty Rate</span>
                                        <span class="text-sm font-semibold">Medium - 6.2/10</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="h-2 rounded-full bg-yellow-500" style="width: 62%;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm text-gray-700">Education Access</span>
                                        <span class="text-sm font-semibold">Low - 4.8/10</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="h-2 rounded-full bg-green-500" style="width: 48%;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm text-gray-700">Unemployment Rate</span>
                                        <span class="text-sm font-semibold">High - 7.9/10</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="h-2 rounded-full bg-orange-500" style="width: 79%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Service Gaps -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-hospital text-red-600 mr-2"></i>
                                Service Gaps
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-start space-x-3 bg-red-50 p-3 rounded">
                                    <i class="fas fa-exclamation-circle text-red-600 mt-1"></i>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Medical Services</div>
                                        <div class="text-sm text-gray-700">Only 1 Rainbo center serving population of 500K+. Average response time: 4.2 hours.</div>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3 bg-yellow-50 p-3 rounded">
                                    <i class="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Police FSU Coverage</div>
                                        <div class="text-sm text-gray-700">Limited FSU presence in rural chiefdoms. 18% of cases delayed by location barriers.</div>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3 bg-orange-50 p-3 rounded">
                                    <i class="fas fa-info-circle text-orange-600 mt-1"></i>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Psychosocial Support</div>
                                        <div class="text-sm text-gray-700">Counselors understaffed. 45% of survivors report unmet mental health needs.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Recommended Interventions -->
                        <div class="border rounded-lg p-6 bg-green-50">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-lightbulb text-green-600 mr-2"></i>
                                Recommended Interventions
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-start space-x-3">
                                    <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Expand Medical Infrastructure</div>
                                        <div class="text-sm text-gray-700">Establish 2 additional Rainbo satellite centers in high-density areas. Estimated impact: 60% reduction in response time.</div>
                                        <div class="mt-1 text-xs text-green-700"><strong>Priority:</strong> High | <strong>Cost:</strong> $450K | <strong>Timeline:</strong> 12 months</div>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Community Awareness Campaign</div>
                                        <div class="text-sm text-gray-700">Radio programs in local languages. Mobile education units for rural chiefdoms.</div>
                                        <div class="mt-1 text-xs text-green-700"><strong>Priority:</strong> High | <strong>Cost:</strong> $85K | <strong>Timeline:</strong> 6 months</div>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">Strengthen Police FSU Capacity</div>
                                        <div class="text-sm text-gray-700">Train 20 additional FSU officers. Provide motorcycles for rural patrols.</div>
                                        <div class="mt-1 text-xs text-green-700"><strong>Priority:</strong> Medium | <strong>Cost:</strong> $120K | <strong>Timeline:</strong> 9 months</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="bg-gray-50 px-6 py-4 flex justify-between">
                        <button onclick="window.print()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-print mr-2"></i>Print Profile
                        </button>
                        <button onclick="closeDistrictProfileModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Render chart if data available
    if (!loading && !error && data?.monthly_trends && data.monthly_trends.length > 0) {
        setTimeout(() => renderProfileTrendsChart(data.monthly_trends), 100);
    }
}

function renderProfileTrendsChart(trends) {
    const ctx = document.getElementById('profile-trends-chart');
    if (!ctx) return;
    
    const labels = trends.map(t => t.month);
    const counts = trends.map(t => t.case_count);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cases',
                data: counts,
                borderColor: '#1e90ff',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getRiskColorClass(risk) {
    const colors = {
        'High': 'red',
        'Medium': 'yellow',
        'Low': 'green'
    };
    return colors[risk] || 'gray';
}

function getTrendColorClass(trend) {
    const colors = {
        'Rising': 'red',
        'Falling': 'green',
        'Stable': 'gray'
    };
    return colors[trend] || 'gray';
}

function getTrendIcon(trend) {
    const icons = {
        'Rising': 'up',
        'Falling': 'down',
        'Stable': 'right'
    };
    return icons[trend] || 'right';
}

function getThisMonthCases(trends) {
    if (!trends || trends.length === 0) return 0;
    return trends[trends.length - 1]?.case_count || 0;
}

function closeDistrictProfileModal() {
    const modal = document.getElementById('district-profile-modal');
    if (modal) {
        modal.remove();
    }
}

function showAnalyticsSection(sectionType) {
    console.log(`🎯 Analytics navigating to: ${sectionType}`);
    
    // Get the analytics section element
    const targetSection = document.querySelector('[data-translate="analytics"]')?.nextElementSibling?.querySelector('.space-y-6')?.parentElement;
    
    if (!targetSection) {
        console.error('Analytics section not found');
        // Fallback: try to get the main content area
        const mainContent = document.getElementById('dashboard-content');
        if (mainContent) {
            const analyticsContent = mainContent.querySelector('.space-y-6');
            if (analyticsContent) {
                loadAnalyticsSubSection(analyticsContent, sectionType);
                return;
            }
        }
        return;
    }
    
    // Load the appropriate dashboard
    loadAnalyticsSubSection(targetSection, sectionType);
}

function loadAnalyticsSubSection(targetSection, sectionType) {
    switch(sectionType) {
        case 'spike-prediction':
            if (typeof loadSpikePrediction === 'function') {
                loadSpikePrediction(targetSection);
            }
            break;
        case 'risk-scoring':
            if (typeof loadRiskScoring === 'function') {
                loadRiskScoring(targetSection);
            }
            break;
        case 'resource-forecast':
            if (typeof loadResourceForecast === 'function') {
                loadResourceForecast(targetSection);
            }
            break;
        case 'trend-intelligence':
            if (typeof loadTrendIntelligence === 'function') {
                loadTrendIntelligence(targetSection);
            }
            break;
    }
}

// Export functions
window.closeDistrictProfileModal = closeDistrictProfileModal;
window.showAnalyticsSection = showAnalyticsSection;
