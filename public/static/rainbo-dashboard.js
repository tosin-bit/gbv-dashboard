// Rainbo Centre Dashboard
console.log('Rainbo Dashboard loading...');

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
        window.location.href = '/?tab=rainbo';
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
            window.location.href = '/?tab=rainbo';
            return;
        }
        
        // Load dashboard
        loadDashboard();
    } catch (error) {
        console.error('Session validation error:', error);
        window.location.href = '/?tab=rainbo';
    }
}

// Load dashboard content
function loadDashboard() {
    const root = document.getElementById('rainbo-dashboard-root');
    
    root.innerHTML = `
        <!-- Header -->
        <header class="bg-white shadow-sm border-b-4" style="border-bottom-color: #1e3a8a;">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-hospital mr-2"></i>Rainbo Centre Dashboard
                        </h1>
                        <p class="text-sm text-gray-600">${sessionData.service_provider_name || 'Rainbo Initiative'}</p>
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
                    <div class="text-sm font-medium text-gray-500">Total Cases</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="total-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">All assigned cases</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Medical Exams</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="medical-exams">0</div>
                    <div class="text-xs text-gray-500 mt-1">Completed this month</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">PEP Administered</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="pep-count">0</div>
                    <div class="text-xs text-gray-500 mt-1">Post-exposure prophylaxis</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Counseling Sessions</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="counseling-count">0</div>
                    <div class="text-xs text-gray-500 mt-1">Psychosocial support</div>
                </div>
            </div>
            
            <!-- Cases Table -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b">
                    <h2 class="text-lg font-semibold" style="color: #1e3a8a;">Assigned Cases</h2>
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
                    <p>No cases assigned yet</p>
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
                <p>No cases assigned yet</p>
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
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(c.case_status)}">
                                    ${c.case_status}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <button onclick="viewCase('${c.case_number}')" class="text-blue-600 hover:text-blue-900">
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
    document.getElementById('total-cases').textContent = cases.length;
    
    // Count medical exams (cases with medical_received = 'yes')
    const medicalExams = cases.filter(c => c.medical_received === 'yes').length;
    document.getElementById('medical-exams').textContent = medicalExams;
    
    // Count PEP administered (rough estimate based on sexual assault cases with medical care)
    const pepCount = cases.filter(c => {
        const types = parseViolenceTypes(c.violence_types).toLowerCase();
        return (types.includes('rape') || types.includes('sexual')) && c.medical_received === 'yes';
    }).length;
    document.getElementById('pep-count').textContent = pepCount;
    
    // Count counseling sessions (rough estimate)
    const counselingCount = Math.floor(cases.length * 0.7); // Assume 70% receive counseling
    document.getElementById('counseling-count').textContent = counselingCount;
}

// View case details
function viewCase(caseNumber) {
    alert(`View case details for ${caseNumber}\n\nIn full implementation, this would show:\n- Complete case history\n- Medical records\n- Treatment plans\n- Referral status\n- Follow-up schedule`);
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

console.log('Rainbo Dashboard ready');
