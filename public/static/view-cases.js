// View All Cases System
console.log('View Cases system loading...');

let currentPage = 1;
let currentFilters = {
    district: 'all',
    status: 'all',
    search: ''
};

// Load View Cases section
function loadViewCases(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-list-alt mr-2"></i>View All Cases
                        </h2>
                        <p class="text-sm text-gray-600 mt-1">Browse and search GBV case records</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button onclick="refreshCases()" class="px-4 py-2 rounded" style="background-color: #32cd32; color: white;">
                            <i class="fas fa-sync-alt mr-2"></i>Refresh
                        </button>
                    </div>
                </div>
                
                <!-- Filters -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <!-- Search -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-search mr-2"></i>Search by Case Number
                        </label>
                        <input type="text" id="search-input" 
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                               placeholder="Enter case number (e.g., GBV-2025-0001)"
                               onkeyup="handleSearch(event)">
                    </div>
                    
                    <!-- District Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-map-marker-alt mr-2"></i>District
                        </label>
                        <select id="district-filter" onchange="handleFilterChange()"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Districts</option>
                            <option value="1">Western Area Urban</option>
                            <option value="2">Western Area Rural</option>
                            <option value="3">Bo</option>
                            <option value="4">Bonthe</option>
                            <option value="5">Moyamba</option>
                            <option value="6">Pujehun</option>
                            <option value="7">Kenema</option>
                            <option value="8">Kailahun</option>
                            <option value="9">Kono</option>
                            <option value="10">Bombali</option>
                            <option value="11">Kambia</option>
                            <option value="12">Koinadugu</option>
                            <option value="13">Port Loko</option>
                            <option value="14">Tonkolili</option>
                            <option value="15">Karene</option>
                            <option value="16">Falaba</option>
                        </select>
                    </div>
                    
                    <!-- Status Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-filter mr-2"></i>Status
                        </label>
                        <select id="status-filter" onchange="handleFilterChange()"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Status</option>
                            <option value="reported">Reported</option>
                            <option value="under_investigation">Under Investigation</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>
                
                <!-- Stats Summary -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Total Cases</div>
                        <div class="text-2xl font-bold" style="color: #1e3a8a;" id="summary-total">0</div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Reported</div>
                        <div class="text-2xl font-bold text-blue-600" id="summary-reported">0</div>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Investigating</div>
                        <div class="text-2xl font-bold text-yellow-600" id="summary-investigating">0</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Resolved</div>
                        <div class="text-2xl font-bold text-green-600" id="summary-resolved">0</div>
                    </div>
                </div>
            </div>
            
            <!-- Cases Table -->
            <div class="bg-white rounded-lg shadow-lg">
                <div id="cases-container" class="p-6">
                    <div class="text-center py-12">
                        <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-500">Loading cases...</p>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div id="pagination-container" class="px-6 py-4 border-t bg-gray-50"></div>
            </div>
        </div>
    `;
    
    // Load initial data
    loadCases();
}

// Load cases from API
async function loadCases(page = 1) {
    const container = document.getElementById('cases-container');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-500">Loading cases...</p>
        </div>
    `;
    
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            district: currentFilters.district,
            status: currentFilters.status
        });
        
        const response = await fetch(`/api/cases?${params}`);
        const data = await response.json();
        
        if (data.cases && data.cases.length > 0) {
            displayCases(data.cases);
            displayPagination(data.pagination);
            updateSummaryStats(data.cases);
        } else {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-lg text-gray-600 font-medium">No Cases Found</p>
                    <p class="text-sm text-gray-500 mt-2">Try adjusting your filters or submit a new case</p>
                </div>
            `;
            document.getElementById('pagination-container').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading cases:', error);
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-6xl text-red-300 mb-4"></i>
                <p class="text-lg text-red-600 font-medium">Failed to Load Cases</p>
                <p class="text-sm text-gray-500 mt-2">Please try again or contact support</p>
                <button onclick="loadCases()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Retry
                </button>
            </div>
        `;
    }
}

// Display cases in table
function displayCases(cases) {
    const container = document.getElementById('cases-container');
    
    const tableHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Case Number
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Incident Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Violence Type
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            District
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${cases.map(c => `
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${c.case_number}</div>
                                <div class="text-xs text-gray-500">${c.chiefdom || 'N/A'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${formatDate(c.incident_date)}</div>
                                <div class="text-xs text-gray-500">Reported: ${formatDate(c.reported_date)}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${parseViolenceTypes(c.violence_types)}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.district_name || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                ${getStatusBadge(c.case_status)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                ${getPriorityBadge(c.priority_level)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center gap-3">
                                    <button onclick="viewCaseDetails('${c.case_number}')" 
                                            class="text-blue-600 hover:text-blue-900">
                                        <i class="fas fa-eye mr-1"></i>View
                                    </button>
                                    <button onclick="showCaseNotesModal(${c.id}, '${c.case_number}')" 
                                            class="text-green-600 hover:text-green-900"
                                            title="Add/View Case Notes">
                                        <i class="fas fa-clipboard-list mr-1"></i>Notes
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = tableHTML;
}

// Display pagination
function displayPagination(pagination) {
    const container = document.getElementById('pagination-container');
    
    if (!pagination || pagination.totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    const { page, totalPages, total } = pagination;
    
    let paginationHTML = `
        <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
                Showing page <span class="font-medium">${page}</span> of <span class="font-medium">${totalPages}</span>
                <span class="mx-2">•</span>
                Total: <span class="font-medium">${total}</span> cases
            </div>
            <div class="flex space-x-2">
    `;
    
    // Previous button
    if (page > 1) {
        paginationHTML += `
            <button onclick="changePage(${page - 1})" 
                    class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
        `;
    }
    
    // Page numbers
    const pageNumbers = getPageNumbers(page, totalPages);
    pageNumbers.forEach(pageNum => {
        if (pageNum === '...') {
            paginationHTML += `<span class="px-3 py-1">...</span>`;
        } else {
            const isActive = pageNum === page;
            paginationHTML += `
                <button onclick="changePage(${pageNum})" 
                        class="px-3 py-1 border rounded ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}">
                    ${pageNum}
                </button>
            `;
        }
    });
    
    // Next button
    if (page < totalPages) {
        paginationHTML += `
            <button onclick="changePage(${page + 1})" 
                    class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
    
    paginationHTML += `
            </div>
        </div>
    `;
    
    container.innerHTML = paginationHTML;
}

// Get page numbers for pagination
function getPageNumbers(current, total) {
    const pages = [];
    
    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, 4, '...', total);
        } else if (current >= total - 2) {
            pages.push(1, '...', total - 3, total - 2, total - 1, total);
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', total);
        }
    }
    
    return pages;
}

// Update summary stats
function updateSummaryStats(cases) {
    document.getElementById('summary-total').textContent = cases.length;
    
    const reported = cases.filter(c => c.case_status === 'reported').length;
    const investigating = cases.filter(c => c.case_status === 'under_investigation').length;
    const resolved = cases.filter(c => c.case_status === 'resolved').length;
    
    document.getElementById('summary-reported').textContent = reported;
    document.getElementById('summary-investigating').textContent = investigating;
    document.getElementById('summary-resolved').textContent = resolved;
}

// Handle filter change
function handleFilterChange() {
    currentFilters.district = document.getElementById('district-filter').value;
    currentFilters.status = document.getElementById('status-filter').value;
    currentPage = 1;
    loadCases(currentPage);
}

// Handle search
function handleSearch(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.trim();
        if (searchTerm) {
            searchCaseByNumber(searchTerm);
        } else {
            loadCases(currentPage);
        }
    }
}

// Search case by number
async function searchCaseByNumber(caseNumber) {
    const container = document.getElementById('cases-container');
    
    container.innerHTML = `
        <div class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-500">Searching for ${caseNumber}...</p>
        </div>
    `;
    
    try {
        // Search through all cases (this is simplified - in production, use a search API)
        const response = await fetch('/api/cases?limit=1000');
        const data = await response.json();
        
        const found = data.cases.filter(c => 
            c.case_number.toLowerCase().includes(caseNumber.toLowerCase())
        );
        
        if (found.length > 0) {
            displayCases(found);
            document.getElementById('pagination-container').innerHTML = `
                <div class="text-sm text-gray-700">
                    Found ${found.length} case(s) matching "${caseNumber}"
                    <button onclick="clearSearch()" class="ml-4 text-blue-600 hover:text-blue-800">
                        <i class="fas fa-times mr-1"></i>Clear Search
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                    <p class="text-lg text-gray-600 font-medium">No Cases Found</p>
                    <p class="text-sm text-gray-500 mt-2">No cases match "${caseNumber}"</p>
                    <button onclick="clearSearch()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <i class="fas fa-redo mr-2"></i>Clear Search
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Clear search
function clearSearch() {
    document.getElementById('search-input').value = '';
    loadCases(currentPage);
}

// Change page
function changePage(page) {
    currentPage = page;
    loadCases(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Refresh cases
function refreshCases() {
    loadCases(currentPage);
}

// View case details
async function viewCaseDetails(caseNumber) {
    // Show loading modal
    showCaseModal(caseNumber, null, true);
    
    try {
        // Fetch case details from API
        const response = await fetch(`/api/cases/${caseNumber}/full-details`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch case details');
        }
        
        const data = await response.json();
        
        // Show case details modal
        showCaseModal(caseNumber, data, false);
        
    } catch (error) {
        console.error('Error fetching case details:', error);
        showCaseModal(caseNumber, null, false, error.message);
    }
}

function showCaseModal(caseNumber, data, loading = false, error = null) {
    // Create modal backdrop
    const existingModal = document.getElementById('case-details-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div id="case-details-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                ${loading ? `
                    <div class="p-8 text-center">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p class="text-gray-600">Loading case details...</p>
                    </div>
                ` : error ? `
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">
                                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                                Error Loading Case
                            </h2>
                            <button onclick="closeCaseModal()" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div class="text-center text-red-600">
                            <p>${error}</p>
                        </div>
                    </div>
                ` : `
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-2xl font-bold mb-1">
                                    <i class="fas fa-folder-open mr-2"></i>
                                    Case Details: ${caseNumber}
                                </h2>
                                <p class="text-sm text-blue-100">Complete case information</p>
                            </div>
                            <button onclick="closeCaseModal()" class="text-white hover:text-gray-200 transition-colors">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 space-y-6">
                        <!-- Info Checklist -->
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <h3 class="font-semibold text-green-900 mb-2">
                                <i class="fas fa-check-circle mr-2"></i>Complete Case Information
                            </h3>
                            <div class="grid grid-cols-2 gap-2 text-sm text-green-800">
                                <div><i class="fas fa-check mr-2"></i>Incident details</div>
                                <div><i class="fas fa-check mr-2"></i>Survivor information (protected)</div>
                                <div><i class="fas fa-check mr-2"></i>Perpetrator details</div>
                                <div><i class="fas fa-check mr-2"></i>Services provided</div>
                                <div><i class="fas fa-check mr-2"></i>Investigation status</div>
                                <div><i class="fas fa-check mr-2"></i>Timeline of events</div>
                                <div><i class="fas fa-check mr-2"></i>Referral history</div>
                            </div>
                        </div>
                        
                        <!-- Case Information Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Incident Details -->
                            <div class="border rounded-lg p-4 bg-gray-50">
                                <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                    <i class="fas fa-exclamation-circle text-blue-600 mr-2"></i>
                                    Incident Details
                                </h3>
                                <dl class="space-y-2 text-sm">
                                    <div>
                                        <dt class="text-gray-600">Incident Date:</dt>
                                        <dd class="font-medium">${formatDate(data?.case?.incident_date)}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Reported Date:</dt>
                                        <dd class="font-medium">${formatDate(data?.case?.reported_date)}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Violence Type:</dt>
                                        <dd class="font-medium">${data?.case?.violence_type || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">District:</dt>
                                        <dd class="font-medium">${data?.case?.district_name || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Status:</dt>
                                        <dd class="mt-1">${getStatusBadge(data?.case?.status)}</dd>
                                    </div>
                                </dl>
                            </div>
                            
                            <!-- Survivor Information -->
                            <div class="border rounded-lg p-4 bg-purple-50">
                                <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                    <i class="fas fa-user-shield text-purple-600 mr-2"></i>
                                    Survivor Information (Protected)
                                </h3>
                                <dl class="space-y-2 text-sm">
                                    <div>
                                        <dt class="text-gray-600">Age Group:</dt>
                                        <dd class="font-medium">${data?.case?.survivor_age_group || 'Protected'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Gender:</dt>
                                        <dd class="font-medium">${data?.case?.survivor_gender || 'Protected'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Identity:</dt>
                                        <dd class="font-medium text-purple-600">
                                            <i class="fas fa-lock mr-1"></i>Protected for Privacy
                                        </dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Contact:</dt>
                                        <dd class="font-medium text-purple-600">
                                            <i class="fas fa-lock mr-1"></i>Confidential
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            
                            <!-- Perpetrator Details -->
                            <div class="border rounded-lg p-4 bg-orange-50">
                                <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                    <i class="fas fa-user-secret text-orange-600 mr-2"></i>
                                    Perpetrator Details
                                </h3>
                                <dl class="space-y-2 text-sm">
                                    <div>
                                        <dt class="text-gray-600">Relationship:</dt>
                                        <dd class="font-medium">${data?.case?.perpetrator_relationship || 'Under Investigation'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Age Group:</dt>
                                        <dd class="font-medium">${data?.case?.perpetrator_age_group || 'Unknown'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Status:</dt>
                                        <dd class="font-medium">${data?.investigation?.suspect_status || 'Under Investigation'}</dd>
                                    </div>
                                </dl>
                            </div>
                            
                            <!-- Services Provided -->
                            <div class="border rounded-lg p-4 bg-green-50">
                                <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                    <i class="fas fa-hand-holding-medical text-green-600 mr-2"></i>
                                    Services Provided
                                </h3>
                                <div class="space-y-2 text-sm">
                                    ${data?.services && data.services.length > 0 ? 
                                        data.services.map(s => `
                                            <div class="flex items-center">
                                                <i class="fas fa-check text-green-600 mr-2"></i>
                                                <span>${s.service_type || 'Service provided'}</span>
                                            </div>
                                        `).join('') :
                                        '<p class="text-gray-600">No services recorded yet</p>'
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <!-- Investigation Status -->
                        ${data?.investigation ? `
                            <div class="border rounded-lg p-4 bg-blue-50">
                                <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                    <i class="fas fa-search text-blue-600 mr-2"></i>
                                    Investigation Status
                                </h3>
                                <dl class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt class="text-gray-600">Status:</dt>
                                        <dd class="font-medium">${data.investigation.investigation_status || 'Pending'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Suspect Status:</dt>
                                        <dd class="font-medium">${data.investigation.suspect_status || 'Unknown'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Evidence Collected:</dt>
                                        <dd class="font-medium">${data.investigation.evidence_collected ? 'Yes' : 'No'}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-gray-600">Witnesses:</dt>
                                        <dd class="font-medium">${data.investigation.witness_count || 0}</dd>
                                    </div>
                                </dl>
                            </div>
                        ` : ''}
                        
                        <!-- Timeline -->
                        <div class="border rounded-lg p-4">
                            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                <i class="fas fa-history text-gray-600 mr-2"></i>
                                Timeline of Events
                            </h3>
                            <div class="space-y-3">
                                ${data?.timeline && data.timeline.length > 0 ?
                                    data.timeline.map(event => `
                                        <div class="flex items-start space-x-3 text-sm">
                                            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                            <div class="flex-1">
                                                <div class="flex items-center justify-between">
                                                    <span class="font-medium">${event.update_type || 'Update'}</span>
                                                    <span class="text-gray-500 text-xs">${formatDate(event.created_at)}</span>
                                                </div>
                                                <p class="text-gray-600 mt-1">${event.notes || 'No details'}</p>
                                                <p class="text-gray-500 text-xs mt-1">By: ${event.created_by_name || 'System'}</p>
                                            </div>
                                        </div>
                                    `).join('') :
                                    '<p class="text-gray-600 text-sm">No timeline events recorded yet</p>'
                                }
                            </div>
                        </div>
                        
                        <!-- Referral History -->
                        <div class="border rounded-lg p-4">
                            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                                <i class="fas fa-share-alt text-gray-600 mr-2"></i>
                                Referral History
                            </h3>
                            <div class="space-y-2">
                                ${data?.assignments && data.assignments.length > 0 ?
                                    data.assignments.map(a => `
                                        <div class="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                                            <div>
                                                <span class="font-medium">${getOrganizationName(a.organization_type)}</span>
                                                <span class="text-gray-500 ml-2">${getStatusBadge(a.status)}</span>
                                            </div>
                                            <span class="text-gray-500 text-xs">${formatDate(a.assigned_at)}</span>
                                        </div>
                                    `).join('') :
                                    '<p class="text-gray-600 text-sm">No referrals made yet</p>'
                                }
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <button onclick="showCaseNotesModal(${data.case.id}, '${caseNumber}')" 
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <i class="fas fa-clipboard-list"></i>
                            Add/View Notes
                        </button>
                        <button onclick="closeCaseModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeCaseModal() {
    const modal = document.getElementById('case-details-modal');
    if (modal) {
        modal.remove();
    }
}

function getOrganizationName(orgType) {
    const names = {
        'rainbo': 'Rainbo Initiative',
        'police_fsu': 'Police FSU',
        'ministry': 'Ministry of Gender',
        'one_stop': 'One-Stop Center'
    };
    return names[orgType] || orgType;
}

// Helper functions
function parseViolenceTypes(types) {
    try {
        const parsed = JSON.parse(types);
        if (Array.isArray(parsed)) {
            return parsed.slice(0, 2).join(', ') + (parsed.length > 2 ? '...' : '');
        }
        return types;
    } catch (e) {
        return types || 'Unknown';
    }
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusBadge(status) {
    const badges = {
        'reported': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Reported</span>',
        'under_investigation': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Investigating</span>',
        'pending': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Pending</span>',
        'resolved': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>',
        'critical': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Critical</span>'
    };
    return badges[status] || '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>';
}

function getPriorityBadge(priority) {
    const badges = {
        'High': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">High</span>',
        'Medium': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>',
        'Low': '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Low</span>'
    };
    return badges[priority] || '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Medium</span>';
}

// Export functions
window.loadViewCases = loadViewCases;
window.changePage = changePage;
window.handleFilterChange = handleFilterChange;
window.handleSearch = handleSearch;
window.refreshCases = refreshCases;
window.viewCaseDetails = viewCaseDetails;
window.clearSearch = clearSearch;
window.closeCaseModal = closeCaseModal;

console.log('View Cases system ready');
