// Police FSU Dashboard
console.log('Police FSU Dashboard loading...');

let sessionData = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});

// Check if user is authenticated
async function checkSession() {
    const sessionId = localStorage.getItem('gbv_session_id');
    const userData = localStorage.getItem('gbv_user_data');
    
    if (!sessionId || !userData) {
        window.location.href = '/?tab=police';
        return;
    }
    
    try {
        sessionData = JSON.parse(userData);
        
        // Verify session is still valid
        const response = await fetch(`/api/auth/session/${sessionId}`);
        const data = await response.json();
        
        if (!data.valid) {
            localStorage.removeItem('gbv_session_id');
            localStorage.removeItem('gbv_user_data');
            window.location.href = '/?tab=police';
            return;
        }
        
        // Load dashboard
        loadDashboard();
    } catch (error) {
        console.error('Session validation error:', error);
        window.location.href = '/?tab=police';
    }
}

// Load dashboard content
function loadDashboard() {
    const root = document.getElementById('police-dashboard-root');
    
    root.innerHTML = `
        <!-- Header -->
        <header class="bg-white shadow-sm border-b-4" style="border-bottom-color: #1e3a8a;">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-shield-alt mr-2"></i>Police FSU Dashboard
                        </h1>
                        <p class="text-sm text-gray-600">${sessionData.service_provider_name || 'Family Support Unit'}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="text-right">
                            <div class="text-sm font-medium" style="color: #1e3a8a;">${sessionData.full_name || sessionData.username}</div>
                            <div class="text-xs text-gray-500">${sessionData.role}</div>
                        </div>
                        <button onclick="logout()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 px-4">
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Active Investigations</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="active-investigations">0</div>
                    <div class="text-xs text-gray-500 mt-1">Cases under investigation</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Statements Taken</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="statements-count">0</div>
                    <div class="text-xs text-gray-500 mt-1">Witness/survivor statements</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Arrests Made</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="arrests-count">0</div>
                    <div class="text-xs text-gray-500 mt-1">Perpetrators arrested</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Court Cases</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="court-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">Referred to judiciary</div>
                </div>
            </div>
            
            <!-- Cases Table -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b">
                    <h2 class="text-lg font-semibold" style="color: #1e3a8a;">Investigation Cases</h2>
                </div>
                <div id="cases-container" class="p-6">
                    <div class="text-center py-8">
                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                        <p class="text-gray-500 mt-2">Loading cases...</p>
                    </div>
                </div>
            </div>
        </main>
    `;
    
    // Load cases
    loadCases();
}

// Load cases from API
async function loadCases() {
    const sessionId = localStorage.getItem('gbv_session_id');
    
    try {
        const response = await fetch('/api/my-cases', {
            headers: {
                'X-Session-ID': sessionId
            }
        });
        
        const data = await response.json();
        
        if (data.cases) {
            displayCases(data.cases);
            updateKPIs(data.cases);
        } else {
            document.getElementById('cases-container').innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3"></i>
                    <p>No active investigations</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading cases:', error);
        document.getElementById('cases-container').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load cases. Please try again.</p>
            </div>
        `;
    }
}

// Display cases in table
function displayCases(cases) {
    const container = document.getElementById('cases-container');
    
    if (cases.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-3"></i>
                <p>No active investigations</p>
            </div>
        `;
        return;
    }
    
    const tableHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incident Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${cases.map(c => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${c.case_number}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.incident_date}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${parseViolenceTypes(c.violence_types)}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.district_name || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(c.priority_level)}">
                                    ${c.priority_level || 'Medium'}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(c.case_status)}">
                                    ${c.case_status}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <button onclick="viewCase('${c.case_number}')" class="text-blue-600 hover:text-blue-900 mr-3">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
                                <button onclick="updateCase('${c.case_number}')" class="text-green-600 hover:text-green-900">
                                    <i class="fas fa-edit mr-1"></i>Update
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

// Parse violence types JSON
function parseViolenceTypes(types) {
    // If it's already a string (from JOIN with gbv_types table), return as-is
    if (typeof types === 'string' && !types.startsWith('[')) {
        return types;
    }
    
    // Otherwise try to parse as JSON array
    try {
        const parsed = JSON.parse(types);
        return Array.isArray(parsed) ? parsed.join(', ') : types;
    } catch (e) {
        return types || 'Unknown';
    }
}

// Get priority badge color
function getPriorityColor(priority) {
    const colors = {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Get status badge color
function getStatusColor(status) {
    const colors = {
        'reported': 'bg-blue-100 text-blue-800',
        'under_investigation': 'bg-yellow-100 text-yellow-800',
        'resolved': 'bg-green-100 text-green-800',
        'pending': 'bg-orange-100 text-orange-800',
        'critical': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Update KPI cards
function updateKPIs(cases) {
    // Active investigations (reported or under_investigation status)
    const activeInvestigations = cases.filter(c => 
        c.case_status === 'reported' || c.case_status === 'under_investigation'
    ).length;
    document.getElementById('active-investigations').textContent = activeInvestigations;
    
    // Statements taken (estimate - cases with witnesses)
    const statementsCount = cases.filter(c => 
        c.witnesses && c.witnesses !== 'unknown' && c.witnesses !== 'no'
    ).length;
    document.getElementById('statements-count').textContent = statementsCount;
    
    // Arrests made (estimate - cases with evidence)
    const arrestsCount = cases.filter(c => 
        c.evidence && c.evidence !== 'no' && c.evidence !== 'unknown'
    ).length;
    document.getElementById('arrests-count').textContent = arrestsCount;
    
    // Court cases (resolved cases)
    const courtCases = cases.filter(c => c.case_status === 'resolved').length;
    document.getElementById('court-cases').textContent = courtCases;
}

// View case details
function viewCase(caseNumber) {
    alert(`View investigation details for ${caseNumber}\n\nIn full implementation, this would show:\n- Complete investigation timeline\n- Witness statements\n- Evidence collection\n- Suspect information\n- Court proceedings`);
}

// Update case
function updateCase(caseNumber) {
    alert(`Update investigation for ${caseNumber}\n\nIn full implementation, this would allow:\n- Add investigation notes\n- Update case status\n- Record arrests\n- Upload evidence\n- Schedule court dates`);
}

// Logout
async function logout() {
    const sessionId = localStorage.getItem('gbv_session_id');
    
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId })
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    localStorage.removeItem('gbv_session_id');
    localStorage.removeItem('gbv_user_data');
    window.location.href = '/';
}

console.log('Police FSU Dashboard ready');
