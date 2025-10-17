// Enhanced Case Management Features
// This file adds advanced case management capabilities to the GBV Dashboard

// Case Management Module
window.CaseManagement = {
    currentCase: null,
    districts: [],
    gbvTypes: [],
    serviceProviders: []
};

// Initialize Case Management
function initializeCaseManagement() {
    console.log('Initializing case management system...');
    
    // Load reference data
    loadReferenceData();
    
    // Set up case management event listeners
    setupCaseManagementEvents();
}

// Load reference data for case forms
async function loadReferenceData() {
    try {
        // Load districts
        const districtsResponse = await fetch('/api/districts');
        const districtsData = await districtsResponse.json();
        window.CaseManagement.districts = districtsData.districts || [];
        
        // Load service providers
        const providersResponse = await fetch('/api/service-providers');
        const providersData = await providersResponse.json();
        window.CaseManagement.serviceProviders = providersData.serviceProviders || [];
        
        console.log('Reference data loaded:', {
            districts: window.CaseManagement.districts.length,
            serviceProviders: window.CaseManagement.serviceProviders.length
        });
        
    } catch (error) {
        console.error('Error loading reference data:', error);
    }
}

// Setup case management event listeners
function setupCaseManagementEvents() {
    // Add case button click
    document.addEventListener('click', function(e) {
        if (e.target.matches('#add-new-case-btn') || e.target.closest('#add-new-case-btn')) {
            showNewCaseModal();
        }
        
        if (e.target.matches('.close-modal') || e.target.closest('.close-modal')) {
            closeModal();
        }
        
        if (e.target.matches('#save-case-btn') || e.target.closest('#save-case-btn')) {
            saveNewCase();
        }
    });
    
    // Case management tab click
    document.addEventListener('click', function(e) {
        const caseTab = e.target.closest('.dashboard-tab');
        if (caseTab && caseTab.textContent.includes('Case Management')) {
            showCaseManagementView();
        }
    });
}

// Show case management view
function showCaseManagementView() {
    console.log('Showing case management view');
    
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    dashboardContent.innerHTML = `
        <div class="case-management-container">
            <!-- Header with Add Case Button -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Case Management</h2>
                    <p class="text-gray-600">Manage GBV cases, referrals, and follow-ups</p>
                </div>
                <button id="add-new-case-btn" class="btn-primary flex items-center">
                    <i class="fas fa-plus mr-2"></i>
                    New Case
                </button>
            </div>
            
            <!-- Filters and Search -->
            <div class="bg-white shadow rounded-lg p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label class="form-label">Search Cases</label>
                        <input type="text" id="case-search" class="form-input" placeholder="Case number or keywords...">
                    </div>
                    <div>
                        <label class="form-label">District Filter</label>
                        <select id="district-filter" class="form-input">
                            <option value="all">All Districts</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Status Filter</label>
                        <select id="status-filter" class="form-input">
                            <option value="all">All Statuses</option>
                            <option value="reported">Reported</option>
                            <option value="under_investigation">Under Investigation</option>
                            <option value="services_provided">Services Provided</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button id="apply-filters-btn" class="btn-primary w-full">
                            <i class="fas fa-search mr-2"></i>Apply Filters
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Cases Table -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-medium text-gray-900">Active Cases</h3>
                    <div class="flex space-x-2">
                        <button class="btn-secondary text-sm">
                            <i class="fas fa-download mr-1"></i>Export
                        </button>
                        <button class="btn-secondary text-sm">
                            <i class="fas fa-print mr-1"></i>Print
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case #</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="cases-management-table" class="bg-white divide-y divide-gray-200">
                            <!-- Cases will be loaded here -->
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <div class="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div class="text-sm text-gray-700">
                        Showing <span id="cases-start">0</span> to <span id="cases-end">0</span> of <span id="cases-total">0</span> cases
                    </div>
                    <div class="flex space-x-2">
                        <button id="prev-page-btn" class="btn-secondary text-sm" disabled>Previous</button>
                        <button id="next-page-btn" class="btn-secondary text-sm" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Populate district filter
    populateDistrictFilter();
    
    // Load cases
    loadCasesForManagement();
}

// Populate district filter dropdown
function populateDistrictFilter() {
    const districtFilter = document.getElementById('district-filter');
    if (!districtFilter || !window.CaseManagement.districts) return;
    
    window.CaseManagement.districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district.id;
        option.textContent = district.name;
        districtFilter.appendChild(option);
    });
}

// Load cases for management view
async function loadCasesForManagement(page = 1, filters = {}) {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: '20',
            ...filters
        });
        
        const response = await fetch(`/api/cases?${queryParams}`);
        const data = await response.json();
        
        displayCasesInManagementTable(data.cases || []);
        updatePagination(data.pagination);
        
    } catch (error) {
        console.error('Error loading cases:', error);
        showError('Failed to load cases');
    }
}

// Display cases in management table
function displayCasesInManagementTable(cases) {
    const tableBody = document.getElementById('cases-management-table');
    if (!tableBody) return;
    
    if (cases.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-folder-open text-4xl mb-4 text-gray-300"></i>
                    <div>No cases found</div>
                    <button class="btn-primary mt-4" onclick="showNewCaseModal()">
                        <i class="fas fa-plus mr-2"></i>Add First Case
                    </button>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = cases.map(caseItem => `
        <tr class="hover:bg-gray-50 cursor-pointer" data-case-id="${caseItem.id}">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                ${caseItem.case_number}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(caseItem.incident_date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${caseItem.gbv_type || 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${caseItem.district_name || 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(caseItem.case_status)}">
                    ${caseItem.case_status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(caseItem.priority_level)}">
                    ${caseItem.priority_level}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${caseItem.assigned_to || 'Unassigned'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-800" onclick="viewCase(${caseItem.id})" title="View Case">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="text-green-600 hover:text-green-800" onclick="editCase(${caseItem.id})" title="Edit Case">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-purple-600 hover:text-purple-800" onclick="addNote(${caseItem.id})" title="Add Note">
                        <i class="fas fa-sticky-note"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Show new case modal
function showNewCaseModal() {
    console.log('Showing new case modal');
    
    const modalHTML = `
        <div class="modal" id="new-case-modal">
            <div class="modal-content max-w-4xl">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-medium text-gray-900">New GBV Case Report</h3>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <form id="new-case-form" class="space-y-6">
                    <!-- Incident Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">Incident Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">Incident Date *</label>
                                <input type="date" id="incident-date" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">GBV Type *</label>
                                <select id="gbv-type" class="form-input" required>
                                    <option value="">Select Type</option>
                                    <option value="1">Rape</option>
                                    <option value="2">Sexual Assault</option>
                                    <option value="3">Sexual Harassment</option>
                                    <option value="4">Intimate Partner Violence</option>
                                    <option value="5">Domestic Violence</option>
                                    <option value="6">Physical Assault</option>
                                    <option value="7">Emotional Abuse</option>
                                    <option value="8">Threats and Intimidation</option>
                                    <option value="9">Economic Abuse</option>
                                    <option value="10">Forced Marriage</option>
                                    <option value="11">Female Genital Mutilation</option>
                                    <option value="12">Child Sexual Abuse</option>
                                    <option value="13">Human Trafficking</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Location Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">Location Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">District *</label>
                                <select id="case-district" class="form-input" required>
                                    <option value="">Select District</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Location Details</label>
                                <input type="text" id="location-details" class="form-input" placeholder="Specific area or landmark">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Survivor Information (Anonymized) -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">Survivor Information (Anonymized)</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="form-group">
                                <label class="form-label">Age Group *</label>
                                <select id="survivor-age-group" class="form-input" required>
                                    <option value="">Select Age Group</option>
                                    <option value="0-17">0-17 years</option>
                                    <option value="18-24">18-24 years</option>
                                    <option value="25-34">25-34 years</option>
                                    <option value="35-49">35-49 years</option>
                                    <option value="50+">50+ years</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Gender *</label>
                                <select id="survivor-gender" class="form-input" required>
                                    <option value="">Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Marital Status</label>
                                <select id="marital-status" class="form-input">
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Perpetrator Information (Anonymized) -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">Perpetrator Information (Anonymized)</h4>
                        <div class="form-group">
                            <label class="form-label">Relationship to Survivor *</label>
                            <select id="perpetrator-relationship" class="form-input" required>
                                <option value="">Select Relationship</option>
                                <option value="intimate_partner">Current/Former Intimate Partner</option>
                                <option value="family_member">Family Member</option>
                                <option value="acquaintance">Acquaintance</option>
                                <option value="stranger">Stranger</option>
                                <option value="authority_figure">Authority Figure</option>
                                <option value="community_member">Community Member</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Reporting Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">Reporting Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">Reported By *</label>
                                <select id="reported-by" class="form-input" required>
                                    <option value="">Select Reporter</option>
                                    <option value="survivor">Survivor</option>
                                    <option value="family">Family Member</option>
                                    <option value="witness">Witness</option>
                                    <option value="service_provider">Service Provider</option>
                                    <option value="community_worker">Community Worker</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Reporting Channel *</label>
                                <select id="reporting-channel" class="form-input" required>
                                    <option value="">Select Channel</option>
                                    <option value="hotline">Hotline (116)</option>
                                    <option value="police">Police Station</option>
                                    <option value="health_facility">Health Facility</option>
                                    <option value="ngo">NGO/Service Provider</option>
                                    <option value="community_worker">Community Worker</option>
                                    <option value="walk_in">Walk-in Report</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Form Actions -->
                    <div class="flex justify-end space-x-4 pt-6 border-t">
                        <button type="button" class="close-modal btn-secondary">Cancel</button>
                        <button type="submit" id="save-case-btn" class="btn-primary">
                            <i class="fas fa-save mr-2"></i>Save Case
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Populate district dropdown in modal
    populateModalDistrictDropdown();
    
    // Set default date to today
    document.getElementById('incident-date').valueAsDate = new Date();
}

// Populate district dropdown in modal
function populateModalDistrictDropdown() {
    const districtSelect = document.getElementById('case-district');
    if (!districtSelect || !window.CaseManagement.districts) return;
    
    window.CaseManagement.districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district.id;
        option.textContent = district.name;
        districtSelect.appendChild(option);
    });
}

// Save new case
async function saveNewCase() {
    const form = document.getElementById('new-case-form');
    if (!form) return;
    
    // Collect form data
    const formData = new FormData(form);
    const caseData = {
        incident_date: document.getElementById('incident-date').value,
        gbv_type_id: parseInt(document.getElementById('gbv-type').value),
        district_id: parseInt(document.getElementById('case-district').value),
        location_details: document.getElementById('location-details').value,
        survivor_age_group: document.getElementById('survivor-age-group').value,
        survivor_gender: document.getElementById('survivor-gender').value,
        survivor_marital_status: document.getElementById('marital-status').value,
        perpetrator_relationship: document.getElementById('perpetrator-relationship').value,
        reported_by: document.getElementById('reported-by').value,
        reporting_channel: document.getElementById('reporting-channel').value
    };
    
    // Validate required fields
    if (!caseData.incident_date || !caseData.gbv_type_id || !caseData.district_id || 
        !caseData.survivor_age_group || !caseData.survivor_gender || 
        !caseData.perpetrator_relationship || !caseData.reported_by || !caseData.reporting_channel) {
        showError('Please fill in all required fields');
        return;
    }
    
    try {
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(caseData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess(`Case ${result.case_number} created successfully`);
            closeModal();
            // Refresh the cases list
            loadCasesForManagement();
        } else {
            showError(result.error || 'Failed to create case');
        }
        
    } catch (error) {
        console.error('Error saving case:', error);
        showError('Failed to save case. Please try again.');
    }
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Utility functions for case management
function viewCase(caseId) {
    console.log('Viewing case:', caseId);
    // TODO: Implement case detail view
}

function editCase(caseId) {
    console.log('Editing case:', caseId);
    // TODO: Implement case editing
}

function addNote(caseId) {
    console.log('Adding note to case:', caseId);
    // TODO: Implement case notes
}

function updatePagination(pagination) {
    // Update pagination info
    const startElement = document.getElementById('cases-start');
    const endElement = document.getElementById('cases-end');
    const totalElement = document.getElementById('cases-total');
    
    if (startElement && endElement && totalElement && pagination) {
        const start = ((pagination.page - 1) * pagination.limit) + 1;
        const end = Math.min(pagination.page * pagination.limit, pagination.total);
        
        startElement.textContent = start;
        endElement.textContent = end;
        totalElement.textContent = pagination.total;
    }
}

function showSuccess(message) {
    console.log('Success:', message);
    
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}

// Initialize case management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure main dashboard is loaded first
    setTimeout(initializeCaseManagement, 1000);
});

console.log('Case Management module loaded');