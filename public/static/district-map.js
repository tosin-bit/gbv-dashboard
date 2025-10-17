/**
 * District Map for Sierra Leone
 * Interactive map showing GBV case distribution across all 16 districts
 */

// Sierra Leone Districts Data
const SIERRA_LEONE_DISTRICTS = [
    { id: 1, name: 'Western Area Urban', cases: 695, population: 1050301, risk: 'High', region: 'Western' },
    { id: 2, name: 'Western Area Rural', cases: 234, population: 442951, risk: 'Medium', region: 'Western' },
    { id: 3, name: 'Bo', cases: 412, population: 654142, risk: 'High', region: 'Southern' },
    { id: 4, name: 'Bonthe', cases: 87, population: 200730, risk: 'Low', region: 'Southern' },
    { id: 5, name: 'Moyamba', cases: 156, population: 318588, risk: 'Medium', region: 'Southern' },
    { id: 6, name: 'Pujehun', cases: 98, population: 346461, risk: 'Low', region: 'Southern' },
    { id: 7, name: 'Kenema', cases: 324, population: 653013, risk: 'High', region: 'Eastern' },
    { id: 8, name: 'Kailahun', cases: 287, population: 525372, risk: 'Medium', region: 'Eastern' },
    { id: 9, name: 'Kono', cases: 198, population: 506100, risk: 'Medium', region: 'Eastern' },
    { id: 10, name: 'Bombali', cases: 298, population: 606544, risk: 'Medium', region: 'Northern' },
    { id: 11, name: 'Kambia', cases: 134, population: 341690, risk: 'Low', region: 'Northern' },
    { id: 12, name: 'Koinadugu', cases: 143, population: 408097, risk: 'Low', region: 'Northern' },
    { id: 13, name: 'Port Loko', cases: 189, population: 614063, risk: 'Low', region: 'Northern' },
    { id: 14, name: 'Tonkolili', cases: 167, population: 531435, risk: 'Low', region: 'Northern' },
    { id: 15, name: 'Karene', cases: 176, population: 281285, risk: 'Medium', region: 'North West' },
    { id: 16, name: 'Falaba', cases: 112, population: 204719, risk: 'Low', region: 'Northern' }
];

function loadDistrictMap(section) {
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
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Total Cases</div>
                        <div class="text-3xl font-bold" style="color: #1e3a8a;" id="total-map-cases">3,910</div>
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
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <h4 class="text-sm font-semibold mb-3" style="color: #1e3a8a;">Cases by Region</h4>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">Western Area</span>
                                <span class="text-sm font-bold" style="color: #ef4444;">929</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full" style="width: 48%; background-color: #ef4444;"></div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">Southern Province</span>
                                <span class="text-sm font-bold" style="color: #32cd32;">753</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full" style="width: 39%; background-color: #32cd32;"></div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">Eastern Province</span>
                                <span class="text-sm font-bold" style="color: #ffd700;">809</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full" style="width: 42%; background-color: #ffd700;"></div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">Northern Province</span>
                                <span class="text-sm font-bold" style="color: #1e3a8a;">931</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full" style="width: 48%; background-color: #1e3a8a;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Risk Distribution -->
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <h4 class="text-sm font-semibold mb-3" style="color: #1e3a8a;">Risk Distribution</h4>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <span class="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                    <span class="text-sm">High Risk</span>
                                </div>
                                <span class="text-sm font-bold">3 districts</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <span class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                                    <span class="text-sm">Medium Risk</span>
                                </div>
                                <span class="text-sm font-bold">5 districts</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                    <span class="text-sm">Low Risk</span>
                                </div>
                                <span class="text-sm font-bold">8 districts</span>
                            </div>
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
    
    // Populate the districts table
    populateDistrictsTable();
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
    const riskFilter = document.getElementById('risk-filter').value;
    populateDistrictsTable(region, riskFilter);
}

function filterByRisk(risk) {
    const regionFilter = document.getElementById('region-filter').value;
    populateDistrictsTable(regionFilter, risk);
}

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

function viewDistrictReport(districtId) {
    const district = SIERRA_LEONE_DISTRICTS.find(d => d.id === districtId);
    if (!district) return;
    
    console.log(`Generating detailed report for ${district.name}...`);
    alert(`📄 Generating detailed report for ${district.name} district...\n\nThis would open a comprehensive PDF report with:\n- Monthly trends\n- Service provider coverage\n- Response times\n- Case outcomes`);
}

function highlightDistrict(districtId) {
    const district = SIERRA_LEONE_DISTRICTS.find(d => d.id === districtId);
    if (!district) return;
    
    console.log(`Highlighting ${district.name} on map...`);
    alert(`🗺️ ${district.name} highlighted on map!\n\nIn a full implementation, this would:\n- Zoom to district location\n- Show detailed case heatmap\n- Display service provider locations\n- Show chiefdom-level breakdown`);
}
