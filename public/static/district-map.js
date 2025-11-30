/**
 * District Map for Sierra Leone
 * Interactive map showing GBV case distribution across all 16 districts
 */

// Global variable to store districts data
let SIERRA_LEONE_DISTRICTS = [];

// District region mapping
const DISTRICT_REGIONS = {
    'Western Area Urban': 'Western',
    'Western Area Rural': 'Western',
    'Bo': 'Southern',
    'Bonthe': 'Southern',
    'Moyamba': 'Southern',
    'Pujehun': 'Southern',
    'Kenema': 'Eastern',
    'Kailahun': 'Eastern',
    'Kono': 'Eastern',
    'Bombali': 'Northern',
    'Kambia': 'Northern',
    'Koinadugu': 'Northern',
    'Port Loko': 'Northern',
    'Tonkolili': 'Northern',
    'Karene': 'North West',
    'Falaba': 'Northern'
};

// Load districts data from API
async function loadDistrictsData() {
    try {
        console.log('Loading districts data from API...');
        const response = await fetch('/api/districts');
        const data = await response.json();
        
        // Transform API data to include region and risk
        SIERRA_LEONE_DISTRICTS = data.districts.map(district => {
            const caseCount = district.case_count || 0;
            
            // Determine risk level based on case count
            let risk = 'Low';
            if (caseCount >= 100) {
                risk = 'High';
            } else if (caseCount >= 50) {
                risk = 'Medium';
            }
            
            return {
                id: district.id,
                name: district.name,
                cases: caseCount,
                population: district.population || 0,
                risk: risk,
                region: DISTRICT_REGIONS[district.name] || 'Unknown',
                latitude: district.latitude,
                longitude: district.longitude,
                code: district.code
            };
        });
        
        console.log('✅ Districts data loaded:', SIERRA_LEONE_DISTRICTS.length, 'districts');
        return SIERRA_LEONE_DISTRICTS;
    } catch (error) {
        console.error('Error loading districts data:', error);
        return [];
    }
}

async function loadDistrictMap(section) {
    // Load districts data first
    await loadDistrictsData();
    
    // Calculate totals for display
    const totalCases = SIERRA_LEONE_DISTRICTS.reduce((sum, d) => sum + d.cases, 0);
    
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between border-b pb-4" style="border-bottom-color: #1e3a8a;">
                    <div>
                        <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-map-marked-alt mr-2"></i>Sierra Leone District Map
                        </h2>
                        <p class="text-sm text-gray-600 mt-1">GBV Case Distribution Across All 16 Districts</p>
                    </div>
                    <div class="flex flex-col items-end space-y-2">
                        <button 
                            onclick="refreshDistrictMap()"
                            class="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center space-x-1"
                            style="background-color: #32cd32;"
                            title="Refresh district data"
                        >
                            <i class="fas fa-sync text-sm"></i>
                            <span>Refresh</span>
                        </button>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Cases</div>
                            <div class="text-3xl font-bold" style="color: #1e3a8a;" id="total-map-cases">${totalCases.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Region Filter -->
                <div class="mt-4 flex items-center space-x-4">
                    <label class="text-sm font-medium text-gray-700">Filter by Region:</label>
                    <select id="region-filter" onchange="filterByRegion(this.value)"
                            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                        <option value="All">All Regions</option>
                        <option value="Western">Western Area</option>
                        <option value="Southern">Southern Province</option>
                        <option value="Eastern">Eastern Province</option>
                        <option value="Northern">Northern Province</option>
                        <option value="North West">North West Province</option>
                    </select>
                    
                    <label class="text-sm font-medium text-gray-700 ml-4">Risk Level:</label>
                    <select id="risk-filter" onchange="filterByRisk(this.value)"
                            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                        <option value="All">All Levels</option>
                        <option value="High">🔴 High Risk</option>
                        <option value="Medium">🟡 Medium Risk</option>
                        <option value="Low">🟢 Low Risk</option>
                    </select>
                </div>
            </div>

            <!-- Map Visualization Area -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Interactive Map Placeholder -->
                <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-globe-africa mr-2"></i>Interactive Map
                    </h3>
                    
                    <!-- Map Container -->
                    <div class="border rounded-lg p-8 text-center" style="background-color: rgba(50, 205, 50, 0.05); border-color: #32cd32; min-height: 500px;">
                        <div class="space-y-6">
                            <i class="fas fa-map-marked text-6xl" style="color: #32cd32;"></i>
                            <div>
                                <div class="text-xl font-semibold text-gray-700 mb-2">Sierra Leone Map View</div>
                                <div class="text-sm text-gray-500 mb-4">Click districts in the table to highlight on map</div>
                                
                                <!-- Simple ASCII/SVG-style Map Representation -->
                                <div class="bg-white rounded-lg p-6 mx-auto" style="max-width: 400px;">
                                    <svg viewBox="0 0 400 400" class="w-full">
                                        <!-- Northern Region -->
                                        <g id="northern-region">
                                            <path d="M 50 50 L 200 30 L 350 80 L 320 150 L 180 140 L 80 100 Z" 
                                                  fill="rgba(30, 58, 138, 0.2)" stroke="#1e3a8a" stroke-width="2"/>
                                            <text x="180" y="90" font-size="12" fill="#1e3a8a" text-anchor="middle">NORTHERN</text>
                                        </g>
                                        
                                        <!-- Eastern Region -->
                                        <g id="eastern-region">
                                            <path d="M 320 150 L 380 180 L 370 280 L 280 290 L 220 240 L 180 140 Z" 
                                                  fill="rgba(255, 215, 0, 0.2)" stroke="#ffd700" stroke-width="2"/>
                                            <text x="290" y="220" font-size="12" fill="#1e3a8a" text-anchor="middle">EASTERN</text>
                                        </g>
                                        
                                        <!-- Southern Region -->
                                        <g id="southern-region">
                                            <path d="M 180 240 L 280 290 L 260 370 L 100 360 L 60 300 Z" 
                                                  fill="rgba(50, 205, 50, 0.2)" stroke="#32cd32" stroke-width="2"/>
                                            <text x="170" y="320" font-size="12" fill="#1e3a8a" text-anchor="middle">SOUTHERN</text>
                                        </g>
                                        
                                        <!-- Western Area -->
                                        <g id="western-region">
                                            <path d="M 30 220 L 80 180 L 120 220 L 100 270 Z" 
                                                  fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" stroke-width="2"/>
                                            <text x="80" y="230" font-size="10" fill="#ef4444" font-weight="bold" text-anchor="middle">WEST</text>
                                        </g>
                                        
                                        <!-- Capital Marker -->
                                        <circle cx="70" cy="240" r="8" fill="#ef4444"/>
                                        <text x="70" y="258" font-size="10" fill="#1e3a8a" font-weight="bold" text-anchor="middle">Freetown</text>
                                    </svg>
                                </div>
                                
                                <div class="mt-4 text-xs text-gray-500">
                                    <p>🔴 Red: High Case Density</p>
                                    <p>🟡 Yellow: Medium Case Density</p>
                                    <p>🟢 Green: Lower Case Density</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Statistics Panel -->
                <div class="space-y-4">
                    <!-- Region Statistics -->
                    <div class="bg-white rounded-lg shadow-lg p-4" id="region-stats">
                        <h4 class="text-sm font-semibold mb-3" style="color: #1e3a8a;">Cases by Region</h4>
                        <div class="space-y-3" id="region-stats-content">
                            <!-- Will be populated by JavaScript -->
                        </div>
                    </div>

                    <!-- Risk Distribution -->
                    <div class="bg-white rounded-lg shadow-lg p-4" id="risk-stats">
                        <h4 class="text-sm font-semibold mb-3" style="color: #1e3a8a;">Risk Distribution</h4>
                        <div class="space-y-2" id="risk-stats-content">
                            <!-- Will be populated by JavaScript -->
                        </div>
                    </div>

                    <!-- Service Coverage -->
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <h4 class="text-sm font-semibold mb-3" style="color: #1e3a8a;">Service Coverage</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700">Rainbo Centers</span>
                                <span class="font-semibold" style="color: #32cd32;">9 districts</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700">One-Stop Centers</span>
                                <span class="font-semibold" style="color: #32cd32;">7 districts</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700">Police FSU</span>
                                <span class="font-semibold" style="color: #32cd32;">16 districts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- District Details Table -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-table mr-2"></i>District Details
                </h3>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200" id="districts-table">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    District
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Region
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Population
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Cases
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cases per 10k
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Risk Level
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="districts-tbody">
                            <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Populate the districts table and statistics
    populateDistrictsTable();
    populateRegionalStats();
    populateRiskStats();
}

// Populate regional statistics
function populateRegionalStats() {
    const container = document.getElementById('region-stats-content');
    if (!container) return;
    
    // Calculate cases by region
    const regionCases = {};
    SIERRA_LEONE_DISTRICTS.forEach(district => {
        if (!regionCases[district.region]) {
            regionCases[district.region] = 0;
        }
        regionCases[district.region] += district.cases;
    });
    
    const totalCases = Object.values(regionCases).reduce((sum, count) => sum + count, 0);
    
    // Sort regions by case count
    const regions = Object.entries(regionCases).sort((a, b) => b[1] - a[1]);
    
    const colors = {
        'Western': '#ef4444',
        'Southern': '#32cd32',
        'Eastern': '#ffd700',
        'Northern': '#1e3a8a',
        'North West': '#1e3a8a'
    };
    
    container.innerHTML = regions.map(([region, cases]) => {
        const percentage = totalCases > 0 ? Math.round((cases / totalCases) * 100) : 0;
        const color = colors[region] || '#6b7280';
        
        return `
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">${region}</span>
                <span class="text-sm font-bold" style="color: ${color};">${cases}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: ${percentage}%; background-color: ${color};"></div>
            </div>
        `;
    }).join('');
}

// Populate risk statistics
function populateRiskStats() {
    const container = document.getElementById('risk-stats-content');
    if (!container) return;
    
    // Count districts by risk level
    const riskCounts = {
        'High': 0,
        'Medium': 0,
        'Low': 0
    };
    
    SIERRA_LEONE_DISTRICTS.forEach(district => {
        riskCounts[district.risk] = (riskCounts[district.risk] || 0) + 1;
    });
    
    container.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span class="text-sm">High Risk</span>
            </div>
            <span class="text-sm font-bold">${riskCounts.High} districts</span>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span class="text-sm">Medium Risk</span>
            </div>
            <span class="text-sm font-bold">${riskCounts.Medium} districts</span>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span class="text-sm">Low Risk</span>
            </div>
            <span class="text-sm font-bold">${riskCounts.Low} districts</span>
        </div>
    `;
}

// Populate districts table
function populateDistrictsTable(filterRegion = 'All', filterRisk = 'All') {
    const tbody = document.getElementById('districts-tbody');
    if (!tbody) return;
    
    // Filter districts
    let filteredDistricts = SIERRA_LEONE_DISTRICTS;
    
    if (filterRegion !== 'All') {
        filteredDistricts = filteredDistricts.filter(d => d.region === filterRegion);
    }
    
    if (filterRisk !== 'All') {
        filteredDistricts = filteredDistricts.filter(d => d.risk === filterRisk);
    }
    
    // Sort by cases (descending)
    filteredDistricts.sort((a, b) => b.cases - a.cases);
    
    tbody.innerHTML = filteredDistricts.map(district => {
        const casesPerTenK = ((district.cases / district.population) * 10000).toFixed(1);
        
        let riskBadge = '';
        if (district.risk === 'High') {
            riskBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"><i class="fas fa-exclamation-triangle mr-1"></i>High Risk</span>';
        } else if (district.risk === 'Medium') {
            riskBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"><i class="fas fa-exclamation-circle mr-1"></i>Medium Risk</span>';
        } else {
            riskBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><i class="fas fa-check-circle mr-1"></i>Low Risk</span>';
        }
        
        return `
            <tr class="hover:bg-gray-50 cursor-pointer" onclick="showDistrictDetails(${district.id})">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${district.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${district.region}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${district.population.toLocaleString()}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold" style="color: #1e3a8a;">${district.cases}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${casesPerTenK}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${riskBadge}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button onclick="event.stopPropagation(); viewDistrictReport(${district.id})" 
                            class="text-blue-600 hover:text-blue-900 mr-3">
                        <i class="fas fa-file-alt mr-1"></i>Report
                    </button>
                    <button onclick="event.stopPropagation(); highlightDistrict(${district.id})" 
                            class="text-green-600 hover:text-green-900">
                        <i class="fas fa-map-marker-alt mr-1"></i>Map
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter functions
function filterByRegion(region) {
    const riskFilter = document.getElementById('risk-filter')?.value || 'All';
    populateDistrictsTable(region, riskFilter);
}

function filterByRisk(risk) {
    const regionFilter = document.getElementById('region-filter')?.value || 'All';
    populateDistrictsTable(regionFilter, risk);
}

// Add refresh function for district map
window.refreshDistrictMap = async function() {
    console.log('🔄 Refreshing district map...');
    await loadDistrictsData();
    
    const regionFilter = document.getElementById('region-filter')?.value || 'All';
    const riskFilter = document.getElementById('risk-filter')?.value || 'All';
    
    populateDistrictsTable(regionFilter, riskFilter);
    populateRegionalStats();
    populateRiskStats();
    
    // Update total
    const totalCases = SIERRA_LEONE_DISTRICTS.reduce((sum, d) => sum + d.cases, 0);
    const totalElement = document.getElementById('total-map-cases');
    if (totalElement) {
        totalElement.textContent = totalCases.toLocaleString();
    }
    
    console.log('✅ District map refreshed');
};

// District interaction functions
function showDistrictDetails(districtId) {
    const district = SIERRA_LEONE_DISTRICTS.find(d => d.id === districtId);
    if (!district) return;
    
    alert(`📊 ${district.name} District Details\n\n` +
          `Region: ${district.region}\n` +
          `Population: ${district.population.toLocaleString()}\n` +
          `Total Cases: ${district.cases}\n` +
          `Risk Level: ${district.risk}\n\n` +
          `Click "Report" for detailed analytics or "Map" to highlight on map.`);
}

async function viewDistrictReport(districtId) {
    const district = SIERRA_LEONE_DISTRICTS.find(d => d.id === districtId);
    if (!district) return;
    
    // Show loading modal
    showDistrictReportModal(district, null, true);
    
    try {
        // Fetch district report data
        const response = await fetch(`/api/districts/${districtId}/report`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch district report');
        }
        
        const data = await response.json();
        
        // Show report modal
        showDistrictReportModal(district, data, false);
        
    } catch (error) {
        console.error('Error fetching district report:', error);
        showDistrictReportModal(district, null, false, error.message);
    }
}

function showDistrictReportModal(district, data, loading = false, error = null) {
    // Remove existing modal
    const existingModal = document.getElementById('district-report-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div id="district-report-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                ${loading ? `
                    <div class="p-8 text-center">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p class="text-gray-600">Generating detailed report for ${district.name}...</p>
                    </div>
                ` : error ? `
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                                Error Generating Report
                            </h2>
                            <button onclick="closeDistrictReportModal()" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div class="text-center text-red-600">
                            <p>${error}</p>
                        </div>
                    </div>
                ` : `
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-2xl font-bold mb-1">
                                    <i class="fas fa-file-alt mr-2"></i>
                                    District Report: ${district.name}
                                </h2>
                                <p class="text-sm text-green-100">Comprehensive GBV Analytics</p>
                            </div>
                            <button onclick="closeDistrictReportModal()" class="text-white hover:text-gray-200 transition-colors">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 space-y-6">
                        <!-- Info Banner -->
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <h3 class="font-semibold text-blue-900 mb-2">
                                <i class="fas fa-info-circle mr-2"></i>Comprehensive PDF Report
                            </h3>
                            <div class="grid grid-cols-2 gap-2 text-sm text-blue-800">
                                <div><i class="fas fa-check mr-2"></i>Monthly trends</div>
                                <div><i class="fas fa-check mr-2"></i>Service provider coverage</div>
                                <div><i class="fas fa-check mr-2"></i>Response times</div>
                                <div><i class="fas fa-check mr-2"></i>Case outcomes</div>
                            </div>
                        </div>
                        
                        <!-- District Overview -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-blue-50 rounded-lg p-6">
                                <div class="text-sm text-gray-600">Total Cases</div>
                                <div class="text-3xl font-bold text-blue-600">${data?.summary?.total_cases || district.cases}</div>
                                <div class="text-xs text-gray-500 mt-1">${district.region} Region</div>
                            </div>
                            <div class="bg-green-50 rounded-lg p-6">
                                <div class="text-sm text-gray-600">Population</div>
                                <div class="text-3xl font-bold text-green-600">${(district.population || 0).toLocaleString()}</div>
                                <div class="text-xs text-gray-500 mt-1">District population</div>
                            </div>
                            <div class="bg-${getRiskColor(district.risk)}-50 rounded-lg p-6">
                                <div class="text-sm text-gray-600">Risk Level</div>
                                <div class="text-3xl font-bold text-${getRiskColor(district.risk)}-600">${district.risk}</div>
                                <div class="text-xs text-gray-500 mt-1">Based on case density</div>
                            </div>
                        </div>
                        
                        <!-- Monthly Trends -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                                Monthly Trends (Last 6 Months)
                            </h3>
                            ${data?.monthly_trends && data.monthly_trends.length > 0 ? `
                                <canvas id="district-trends-chart" height="80"></canvas>
                            ` : `
                                <p class="text-gray-600 text-sm">No trend data available</p>
                            `}
                        </div>
                        
                        <!-- Service Provider Coverage -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-hospital text-green-600 mr-2"></i>
                                Service Provider Coverage
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${data?.service_providers ? 
                                    data.service_providers.map(sp => `
                                        <div class="bg-gray-50 p-4 rounded">
                                            <div class="flex items-center justify-between mb-2">
                                                <span class="font-medium">${sp.name}</span>
                                                <span class="text-xs px-2 py-1 rounded-full ${sp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                                    ${sp.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                <div>Cases Handled: ${sp.cases_handled || 0}</div>
                                                <div>Avg Response: ${sp.avg_response_time || 'N/A'}</div>
                                            </div>
                                        </div>
                                    `).join('') :
                                    '<p class="text-gray-600 text-sm">Service provider data not available</p>'
                                }
                            </div>
                        </div>
                        
                        <!-- Case Outcomes -->
                        <div class="border rounded-lg p-6">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-chart-pie text-purple-600 mr-2"></i>
                                Case Outcomes
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <div class="text-2xl font-bold text-blue-600">${data?.outcomes?.reported || 0}</div>
                                    <div class="text-sm text-gray-600">Reported</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-yellow-600">${data?.outcomes?.investigating || 0}</div>
                                    <div class="text-sm text-gray-600">Investigating</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-green-600">${data?.outcomes?.resolved || 0}</div>
                                    <div class="text-sm text-gray-600">Resolved</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-gray-600">${data?.outcomes?.pending || 0}</div>
                                    <div class="text-sm text-gray-600">Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="bg-gray-50 px-6 py-4 flex justify-between">
                        <button onclick="window.print()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            <i class="fas fa-print mr-2"></i>Print Report
                        </button>
                        <button onclick="closeDistrictReportModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
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
        setTimeout(() => renderDistrictTrendsChart(data.monthly_trends), 100);
    }
}

function renderDistrictTrendsChart(trends) {
    const ctx = document.getElementById('district-trends-chart');
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
                fill: true
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

function getRiskColor(risk) {
    const colors = {
        'High': 'red',
        'Medium': 'yellow',
        'Low': 'green'
    };
    return colors[risk] || 'gray';
}

function closeDistrictReportModal() {
    const modal = document.getElementById('district-report-modal');
    if (modal) {
        modal.remove();
    }
}

function highlightDistrict(districtId) {
    const district = SIERRA_LEONE_DISTRICTS.find(d => d.id === districtId);
    if (!district) return;
    
    // Show highlighting modal
    showMapHighlightModal(district);
}

function showMapHighlightModal(district) {
    // Remove existing modal
    const existingModal = document.getElementById('map-highlight-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div id="map-highlight-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-3xl w-full">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold mb-1">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                ${district.name} Highlighted
                            </h2>
                            <p class="text-sm text-blue-100">${district.region} Region</p>
                        </div>
                        <button onclick="closeMapHighlightModal()" class="text-white hover:text-gray-200 transition-colors">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-6 space-y-6">
                    <!-- Info Banner -->
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h3 class="font-semibold text-green-900 mb-2">
                            <i class="fas fa-map mr-2"></i>${district.name} Highlighted on Map!
                        </h3>
                        <p class="text-sm text-green-800">
                            In a full implementation, this would:
                        </p>
                        <div class="grid grid-cols-2 gap-2 text-sm text-green-800 mt-2">
                            <div><i class="fas fa-check mr-2"></i>Zoom to district location</div>
                            <div><i class="fas fa-check mr-2"></i>Show detailed case heatmap</div>
                            <div><i class="fas fa-check mr-2"></i>Display service provider locations</div>
                            <div><i class="fas fa-check mr-2"></i>Show chiefdom-level breakdown</div>
                        </div>
                    </div>
                    
                    <!-- District Info -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-50 rounded-lg p-4">
                            <div class="text-sm text-gray-600">Cases</div>
                            <div class="text-2xl font-bold text-blue-600">${district.cases}</div>
                        </div>
                        <div class="bg-green-50 rounded-lg p-4">
                            <div class="text-sm text-gray-600">Population</div>
                            <div class="text-2xl font-bold text-green-600">${(district.population || 0).toLocaleString()}</div>
                        </div>
                        <div class="bg-${getRiskColor(district.risk)}-50 rounded-lg p-4">
                            <div class="text-sm text-gray-600">Risk Level</div>
                            <div class="text-2xl font-bold text-${getRiskColor(district.risk)}-600">${district.risk}</div>
                        </div>
                    </div>
                    
                    <!-- Map Placeholder -->
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                        <i class="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
                        <p class="text-sm text-gray-600">
                            Full implementation would show:<br/>
                            • Detailed ${district.name} district map<br/>
                            • Case concentration heatmap<br/>
                            • Service provider locations<br/>
                            • Chiefdom boundaries
                        </p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 px-6 py-4 flex justify-end">
                    <button onclick="closeMapHighlightModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeMapHighlightModal() {
    const modal = document.getElementById('map-highlight-modal');
    if (modal) {
        modal.remove();
    }
}

// Export new functions
window.closeDistrictReportModal = closeDistrictReportModal;
window.closeMapHighlightModal = closeMapHighlightModal;
