// Resource Forecasting Engine Dashboard
// Phase 3: Predictive Analytics & AI Intelligence
// Medical supplies, staffing, and budget predictions

function loadResourceForecast(section) {
    section.innerHTML = `
        <!-- Back Button to Analytics Dashboard -->
        <div class="mb-4">
            <button onclick="returnToAnalyticsDashboard()" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Analytics Dashboard
            </button>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-4xl font-bold mb-2">
                        <i class="fas fa-box-open mr-3"></i>Resource Forecasting Engine
                    </h1>
                    <p class="text-blue-100 text-lg">AI-Powered Supply, Staffing & Budget Predictions (30-Day Horizon)</p>
                </div>
                <div class="text-right">
                    <div class="text-5xl font-bold">30</div>
                    <div class="text-blue-100">Days Forecast Horizon</div>
                </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="grid grid-cols-4 gap-4 mt-6">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">$234K</div>
                    <div class="text-blue-100 text-sm">Next 30-Day Budget Need</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">87%</div>
                    <div class="text-blue-100 text-sm">Forecast Accuracy (Last Quarter)</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">12</div>
                    <div class="text-blue-100 text-sm">Supply Stockouts Prevented</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div class="text-3xl font-bold">94%</div>
                    <div class="text-blue-100 text-sm">Resource Utilization Rate</div>
                </div>
            </div>
        </div>

        <!-- Urgent Supply Alerts -->
        <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-md mb-6">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-xl font-bold text-red-800 mb-3">
                        🚨 Urgent: Predicted Supply Shortages (Next 14 Days)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-pills mr-2"></i>PEP (Post-Exposure Prophylaxis)
                                </div>
                                <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">CRITICAL</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div>
                                    <div class="text-gray-600">Current Stock</div>
                                    <div class="text-2xl font-bold text-gray-800">342 kits</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">30-Day Demand</div>
                                    <div class="text-2xl font-bold text-red-700">589 kits</div>
                                </div>
                            </div>
                            <div class="bg-red-50 p-2 rounded mb-2">
                                <div class="text-xs font-bold text-red-800">Stockout Risk: Day 14</div>
                                <div class="w-full bg-red-200 rounded-full h-2 mt-1">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 58%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">58% stock level (Critical threshold: 60%)</div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Action Required:</strong> Order 250+ kits immediately for Bo, Kenema, Freetown districts
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-syringe mr-2"></i>Emergency Contraceptives
                                </div>
                                <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold">HIGH</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div>
                                    <div class="text-gray-600">Current Stock</div>
                                    <div class="text-2xl font-bold text-gray-800">518 doses</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">30-Day Demand</div>
                                    <div class="text-2xl font-bold text-orange-700">712 doses</div>
                                </div>
                            </div>
                            <div class="bg-orange-50 p-2 rounded mb-2">
                                <div class="text-xs font-bold text-orange-800">Stockout Risk: Day 21</div>
                                <div class="w-full bg-orange-200 rounded-full h-2 mt-1">
                                    <div class="bg-orange-600 h-2 rounded-full" style="width: 73%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">73% stock level (Warning threshold: 75%)</div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Action Required:</strong> Order 200+ doses within 7 days to maintain stock
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-vial mr-2"></i>STI Testing Kits (HIV/Hepatitis)
                                </div>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">MODERATE</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div>
                                    <div class="text-gray-600">Current Stock</div>
                                    <div class="text-2xl font-bold text-gray-800">427 kits</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">30-Day Demand</div>
                                    <div class="text-2xl font-bold text-yellow-700">534 kits</div>
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-2 rounded mb-2">
                                <div class="text-xs font-bold text-yellow-800">Stockout Risk: Day 24</div>
                                <div class="w-full bg-yellow-200 rounded-full h-2 mt-1">
                                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">80% stock level (Monitor threshold: 80%)</div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Action Required:</strong> Order 150+ kits within 14 days (standard procurement)
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-gray-800">
                                    <i class="fas fa-briefcase-medical mr-2"></i>Counseling Session Capacity
                                </div>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">MODERATE</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div>
                                    <div class="text-gray-600">Available Hours</div>
                                    <div class="text-2xl font-bold text-gray-800">892 hrs</div>
                                </div>
                                <div>
                                    <div class="text-gray-600">30-Day Demand</div>
                                    <div class="text-2xl font-bold text-yellow-700">1,134 hrs</div>
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-2 rounded mb-2">
                                <div class="text-xs font-bold text-yellow-800">Capacity Shortfall: Day 19</div>
                                <div class="w-full bg-yellow-200 rounded-full h-2 mt-1">
                                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 79%"></div>
                                </div>
                                <div class="text-xs text-gray-600 mt-1">79% capacity utilization (Max safe: 85%)</div>
                            </div>
                            <div class="text-xs text-gray-700">
                                <strong>Action Required:</strong> Recruit 2 additional counselors or extend hours in Bo, Kenema
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Medical Supplies Forecast -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-line mr-2 text-blue-600"></i>30-Day Medical Supply Demand Forecast
            </h3>
            <canvas id="medicalSupplyChart" style="max-height: 350px;"></canvas>
            <div class="mt-4 grid grid-cols-3 gap-4">
                <div class="bg-blue-50 p-3 rounded">
                    <div class="text-xs text-gray-600 mb-1">Total Supply Budget (30 days)</div>
                    <div class="text-2xl font-bold text-blue-700">$78,400</div>
                    <div class="text-xs text-gray-500">+23% vs. last month (seasonal spike)</div>
                </div>
                <div class="bg-green-50 p-3 rounded">
                    <div class="text-xs text-gray-600 mb-1">Forecast Confidence</div>
                    <div class="text-2xl font-bold text-green-700">87%</div>
                    <div class="text-xs text-gray-500">Based on 3 years historical data</div>
                </div>
                <div class="bg-purple-50 p-3 rounded">
                    <div class="text-xs text-gray-600 mb-1">Supply Chain Lead Time</div>
                    <div class="text-2xl font-bold text-purple-700">9-12 days</div>
                    <div class="text-xs text-gray-500">International procurement average</div>
                </div>
            </div>
        </div>

        <!-- Staffing Forecast -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-users mr-2 text-indigo-600"></i>Staffing & Capacity Forecast by District (Next 30 Days)
            </h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Cases</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Staff</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Staff</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity Status</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Bo</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~187 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">12 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">16 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Understaffed (-4)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Urgently hire 2 counselors, 2 caseworkers</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Kenema</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~143 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">9 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">12 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                    Understaffed (-3)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Hire 1 counselor, 1 medical officer, 1 caseworker</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Freetown</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~298 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">22 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">24 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    At Capacity (-2)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Add 2 part-time counselors for peak demand</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Port Loko</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~112 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">8 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">10 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    At Capacity (-2)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Hire 1 counselor, extend hours for 1 caseworker</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Kailahun</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~89 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">7 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">8 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Adequate (-1)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Monitor workload, consider 1 additional staff if spike</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Makeni</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~76 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">7 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">7 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Optimal (0)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Maintain current staffing level</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Bombali</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~67 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">6 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">6 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Optimal (0)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Maintain current staffing level</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Other Districts</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">~189 cases</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">23 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">24 staff</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Adequate (-1)
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">Monitor regional variations</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4 bg-blue-50 p-4 rounded-lg">
                <div class="font-bold text-blue-800 mb-2">
                    <i class="fas fa-info-circle mr-2"></i>Staffing Calculation Methodology
                </div>
                <div class="text-sm text-gray-700">
                    <strong>Standard Ratios:</strong> 1 counselor per 15 active cases, 1 caseworker per 20 cases, 
                    1 medical officer per 40 cases. Adjusted for case complexity and follow-up requirements.
                </div>
            </div>
        </div>

        <!-- Budget Forecast -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-dollar-sign mr-2 text-green-600"></i>30-Day Budget Forecast by Category
            </h3>
            <canvas id="budgetForecastChart" style="max-height: 350px;"></canvas>
            <div class="mt-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Medical Supplies</div>
                        <div class="text-2xl font-bold text-blue-700">$78,400</div>
                        <div class="text-xs text-gray-500">33.5% of budget</div>
                        <div class="text-xs text-green-600 mt-1">+23% vs. last month</div>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Personnel Costs</div>
                        <div class="text-2xl font-bold text-indigo-700">$89,200</div>
                        <div class="text-xs text-gray-500">38.1% of budget</div>
                        <div class="text-xs text-green-600 mt-1">+12% (new hires)</div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Safe House Operations</div>
                        <div class="text-2xl font-bold text-purple-700">$42,600</div>
                        <div class="text-xs text-gray-500">18.2% of budget</div>
                        <div class="text-xs text-orange-600 mt-1">+18% (high occupancy)</div>
                    </div>
                    <div class="bg-pink-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600 mb-1">Transport & Logistics</div>
                        <div class="text-2xl font-bold text-pink-700">$23,800</div>
                        <div class="text-xs text-gray-500">10.2% of budget</div>
                        <div class="text-xs text-green-600 mt-1">+8% (fuel costs)</div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-600 mb-1">Total 30-Day Budget Requirement</div>
                        <div class="text-4xl font-bold text-gray-800">$234,000</div>
                        <div class="text-sm text-gray-600 mt-1">+17% vs. last month (seasonal increase + case spike)</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-600 mb-1">Current Available Funds</div>
                        <div class="text-3xl font-bold text-green-700">$267,500</div>
                        <div class="text-sm text-green-600 mt-1">
                            <i class="fas fa-check-circle mr-1"></i>Fully Funded (+14% buffer)
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Forecast Accuracy & Model Performance -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Historical Accuracy -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>Forecast Accuracy (Last 6 Months)
                </h3>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Supply Demand Forecast</span>
                            <span class="text-sm font-bold text-green-700">87% accurate</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 87%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Avg deviation: ±8.3% from actual consumption</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Staffing Needs Forecast</span>
                            <span class="text-sm font-bold text-green-700">82% accurate</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 82%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Avg deviation: ±11.2% from actual workload</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Budget Forecast</span>
                            <span class="text-sm font-bold text-green-700">89% accurate</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 89%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Avg deviation: ±7.1% from actual spending</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">Lead Time Predictions</span>
                            <span class="text-sm font-bold text-green-700">91% accurate</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-600 h-3 rounded-full" style="width: 91%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Avg deviation: ±1.8 days from actual delivery</div>
                    </div>
                </div>
                
                <div class="mt-6 bg-green-50 p-4 rounded-lg">
                    <div class="font-bold text-green-800 mb-2">
                        <i class="fas fa-check-circle mr-2"></i>Validation Results (Q1-Q2 2024)
                    </div>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li>• Prevented 12 supply stockouts through early warnings</li>
                        <li>• Avoided $47K in emergency procurement costs</li>
                        <li>• Maintained 94% resource utilization efficiency</li>
                        <li>• Zero critical supply shortages in 6 months</li>
                    </ul>
                </div>
            </div>

            <!-- Forecasting Methodology -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-brain mr-2 text-purple-600"></i>Forecasting Methodology
                </h3>
                
                <div class="space-y-3 mb-4">
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Model Type</div>
                        <div class="text-sm text-gray-600">ARIMA + Seasonal Decomposition with Multi-Variate Regression</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Training Data</div>
                        <div class="text-sm text-gray-600">36 months historical consumption + 4,200+ case records</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Input Variables</div>
                        <div class="text-sm text-gray-600">
                            Case volume trends, violence types, district demographics, seasonal patterns, 
                            supply chain lead times, historical consumption rates
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-semibold text-gray-800 mb-1">Update Frequency</div>
                        <div class="text-sm text-gray-600">Daily updates with weekly model retraining</div>
                    </div>
                </div>
                
                <div class="bg-purple-50 p-4 rounded-lg">
                    <div class="font-bold text-purple-800 mb-2">
                        <i class="fas fa-cogs mr-2"></i>Key Forecast Drivers
                    </div>
                    <div class="text-sm space-y-2 text-gray-700">
                        <div><strong>1. Predicted Case Volume:</strong> From spike prediction model (7-day horizon)</div>
                        <div><strong>2. Seasonal Patterns:</strong> School holidays, market days, weather patterns</div>
                        <div><strong>3. Violence Type Mix:</strong> Different cases require different supplies</div>
                        <div><strong>4. Supply Chain Lag:</strong> 9-12 day international procurement lead time</div>
                        <div><strong>5. Historical Waste:</strong> Expiration rates and unused inventory</div>
                    </div>
                </div>
                
                <div class="mt-4 text-xs text-gray-500 italic">
                    <i class="fas fa-info-circle mr-1"></i>
                    Forecasts updated daily. Human procurement officers review and approve all orders.
                </div>
            </div>
        </div>

        <!-- Success Stories -->
        <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-star mr-2 text-yellow-500"></i>Success Stories: Resource Forecasting Impact
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-green-700 mb-2">$47K</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Emergency Procurement Costs Avoided</div>
                    <div class="text-xs text-gray-600">
                        Accurate forecasting eliminated need for expensive last-minute emergency orders, 
                        saving 18% on supply costs through planned procurement.
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-blue-700 mb-2">12</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Supply Stockouts Prevented</div>
                    <div class="text-xs text-gray-600">
                        Early warning alerts triggered timely orders, preventing critical shortages of PEP kits, 
                        contraceptives, and testing supplies across all districts.
                    </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                    <div class="text-3xl font-bold text-purple-700 mb-2">94%</div>
                    <div class="text-sm font-semibold text-gray-800 mb-2">Resource Utilization Efficiency</div>
                    <div class="text-xs text-gray-600">
                        Optimized inventory management reduced waste from expired supplies while maintaining 
                        100% service availability for all survivors.
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize charts after DOM is loaded
    setTimeout(() => {
        initResourceForecastCharts();
    }, 100);
}

function initResourceForecastCharts() {
    // Medical Supply Forecast Chart
    const supplyCtx = document.getElementById('medicalSupplyChart');
    if (supplyCtx) {
        new Chart(supplyCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'PEP Kits Needed',
                        data: [142, 156, 148, 143],
                        borderColor: '#DC2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Emergency Contraceptives',
                        data: [167, 184, 178, 183],
                        borderColor: '#F97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'STI Testing Kits',
                        data: [124, 139, 133, 138],
                        borderColor: '#FBBF24',
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Medical Exam Supplies',
                        data: [198, 212, 206, 201],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.3,
                        fill: true
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
                            text: 'Quantity Needed'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Forecast Period (Next 30 Days)'
                        }
                    }
                }
            }
        });
    }

    // Budget Forecast Chart
    const budgetCtx = document.getElementById('budgetForecastChart');
    if (budgetCtx) {
        new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Medical Supplies', 'Personnel Costs', 'Safe House Operations', 'Transport & Logistics'],
                datasets: [{
                    data: [78400, 89200, 42600, 23800],
                    backgroundColor: [
                        '#3B82F6',
                        '#6366F1',
                        '#8B5CF6',
                        '#EC4899'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3
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
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}
