/**
 * Analytics Dashboard
 * Predictive analysis, risk correlations, and district profiles
 */

function loadAnalyticsDashboard(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="border-b pb-4" style="border-bottom-color: #1e3a8a;">
                    <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                        <i class="fas fa-chart-line mr-2"></i>Predictive Analytics Dashboard
                    </h2>
                    <p class="text-sm text-gray-600 mt-1">Advanced analysis, risk predictions, and district profiles</p>
                </div>
                
                <!-- Time Period Selector -->
                <div class="mt-4 flex items-center space-x-4">
                    <label class="text-sm font-medium text-gray-700">Analysis Period:</label>
                    <select id="period-selector" onchange="updateAnalytics(this.value)"
                            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                        <option value="30">Last 30 Days</option>
                        <option value="90" selected>Last 90 Days</option>
                        <option value="180">Last 6 Months</option>
                        <option value="365">Last 12 Months</option>
                        <option value="all">All Time</option>
                    </select>
                    
                    <button onclick="exportAnalytics()" 
                            class="ml-auto px-4 py-2 rounded-md text-white" style="background-color: #32cd32;">
                        <i class="fas fa-download mr-2"></i>Export Report
                    </button>
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

function viewDetailedProfile(districtName) {
    alert(`🔍 Loading detailed profile for ${districtName}...\n\nDetailed analysis includes:\n- Historical trends\n- Risk factors breakdown\n- Service gaps\n- Recommended interventions`);
}
