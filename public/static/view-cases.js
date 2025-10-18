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
                                <button onclick="viewCaseDetails('${c.case_number}')" 
                                        class="text-blue-600 hover:text-blue-900">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
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
function viewCaseDetails(caseNumber) {
    alert(`📋 Case Details: ${caseNumber}\n\nIn full implementation, this would show:\n\n✓ Complete case information\n✓ Incident details\n✓ Survivor information (protected)\n✓ Perpetrator details\n✓ Services provided\n✓ Investigation status\n✓ Timeline of events\n✓ Referral history\n\nFor privacy and security, detailed case information requires authenticated access through Rainbo or Police portals.`);
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

console.log('View Cases system ready');
