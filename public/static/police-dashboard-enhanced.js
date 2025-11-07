// Enhanced Police FSU Dashboard - Comprehensive Investigation & Evidence Management
// Features: Evidence Chain of Custody, Audit Logging, Witness Statements, Court Case Tracking
console.log('Enhanced Police FSU Dashboard loading...');

let sessionData = null;
let currentCase = null;

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

// Load dashboard content with professional Police FSU design
function loadDashboard() {
    const root = document.getElementById('police-dashboard-root');
    
    root.innerHTML = `
        <!-- Professional Police Header -->
        <header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-4 border-yellow-500">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i class="fas fa-shield-alt text-blue-900 text-3xl"></i>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white flex items-center">
                                Sierra Leone Police - Family Support Unit
                            </h1>
                            <p class="text-sm text-blue-200">${sessionData.organization || 'FSU Investigation & Evidence Management System'}</p>
                            <p class="text-xs text-yellow-300"><i class="fas fa-fingerprint mr-1"></i>Secure Evidence Chain of Custody System</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Notification Bell -->
                        <div class="relative">
                            <button onclick="toggleNotifications()" class="relative p-2 text-white hover:bg-blue-700 rounded-full transition-colors">
                                <i class="fas fa-bell text-2xl"></i>
                                <span id="notification-badge" class="absolute top-0 right-0 hidden bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">0</span>
                            </button>
                            <!-- Notification Dropdown -->
                            <div id="notification-dropdown" class="hidden absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-200 z-50" style="max-height: 500px; overflow-y: auto;">
                                <div class="p-4 border-b bg-blue-50">
                                    <h3 class="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div id="notification-list" class="divide-y">
                                    <div class="p-4 text-center text-gray-500">
                                        <i class="fas fa-spinner fa-spin"></i> Loading...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium text-white">${sessionData.full_name || sessionData.username}</div>
                            <div class="text-xs text-blue-200">${sessionData.role}</div>
                        </div>
                        <button onclick="logout()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 px-4">
            <!-- Professional KPI Dashboard -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">Total Cases</div>
                            <div class="text-3xl font-bold mt-1" id="total-cases">0</div>
                        </div>
                        <i class="fas fa-folder-open text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">Pending</div>
                            <div class="text-3xl font-bold mt-1" id="pending-cases">0</div>
                        </div>
                        <i class="fas fa-clock text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">Investigating</div>
                            <div class="text-3xl font-bold mt-1" id="in-progress-cases">0</div>
                        </div>
                        <i class="fas fa-search text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">Completed</div>
                            <div class="text-3xl font-bold mt-1" id="completed-cases">0</div>
                        </div>
                        <i class="fas fa-check-circle text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">Critical</div>
                            <div class="text-3xl font-bold mt-1" id="high-priority-cases">0</div>
                        </div>
                        <i class="fas fa-exclamation-triangle text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90 font-semibold">In Court</div>
                            <div class="text-3xl font-bold mt-1" id="court-cases">0</div>
                        </div>
                        <i class="fas fa-gavel text-4xl opacity-50"></i>
                    </div>
                </div>
            </div>
            
            <!-- Investigation Capabilities Overview -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-blue-600">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-tools text-blue-600 mr-3"></i>
                    FSU Investigation & Evidence Management Capabilities
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 class="font-semibold text-blue-900 mb-2 flex items-center">
                            <i class="fas fa-fingerprint text-blue-600 mr-2"></i>Evidence Management
                        </h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Physical Evidence Tracking</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Digital Evidence Storage</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Chain of Custody Logs</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Evidence Transfer Records</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Forensic Lab Coordination</li>
                        </ul>
                    </div>
                    
                    <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h3 class="font-semibold text-purple-900 mb-2 flex items-center">
                            <i class="fas fa-user-secret text-purple-600 mr-2"></i>Investigation Tools
                        </h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Suspect Identification</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Witness Statement Recording</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Investigation Timeline</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Case File Management</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Collaboration Tools</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h3 class="font-semibold text-green-900 mb-2 flex items-center">
                            <i class="fas fa-gavel text-green-600 mr-2"></i>Court Case Tracking
                        </h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Case Filing & Tracking</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Hearing Schedules</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Evidence Presentation Logs</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Verdict Documentation</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Appeal Tracking</li>
                        </ul>
                    </div>
                    
                    <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <h3 class="font-semibold text-orange-900 mb-2 flex items-center">
                            <i class="fas fa-history text-orange-600 mr-2"></i>Audit & Compliance
                        </h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-orange-600 mr-2"></i>Complete Audit Logs</li>
                            <li><i class="fas fa-check text-orange-600 mr-2"></i>Timestamp All Actions</li>
                            <li><i class="fas fa-check text-orange-600 mr-2"></i>User Activity Tracking</li>
                            <li><i class="fas fa-check text-orange-600 mr-2"></i>Compliance Reporting</li>
                            <li><i class="fas fa-check text-orange-600 mr-2"></i>International Standards</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Navigation Tabs -->
            <div class="bg-white rounded-xl shadow-lg mb-6">
                <div class="border-b border-gray-200">
                    <nav class="flex space-x-4 px-6" role="tablist">
                        <button onclick="switchTab('cases')" id="tab-cases" class="py-4 px-4 border-b-2 border-blue-600 text-blue-600 font-semibold">
                            <i class="fas fa-folder-open mr-2"></i>Cases
                        </button>
                        <button onclick="switchTab('statistics')" id="tab-statistics" class="py-4 px-4 border-b-2 border-transparent text-gray-500 hover:text-blue-600 font-semibold">
                            <i class="fas fa-chart-bar mr-2"></i>Investigation Reports & Statistics
                        </button>
                    </nav>
                </div>
            </div>
            
            <!-- Tab Content: Cases -->
            <div id="content-cases" class="tab-content">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-semibold text-white flex items-center">
                                <i class="fas fa-folder-open mr-2"></i>
                                Active Investigation Cases
                            </h2>
                            <div class="flex items-center space-x-3">
                                <!-- Filter by Investigation Status -->
                                <select onchange="filterCases(this.value)" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900">
                                    <option value="all">All Cases</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Investigating</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onclick="loadCases()" class="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow">
                                    <i class="fas fa-sync mr-2"></i>Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="cases-container" class="p-6">
                        <div class="text-center py-8">
                            <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                            <p class="text-gray-500 mt-2">Loading cases...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Tab Content: Statistics & Reports -->
            <div id="content-statistics" class="tab-content hidden">
                <div class="space-y-6">
                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Investigation Status Breakdown -->\n                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                <i class="fas fa-chart-pie text-blue-600 mr-2"></i>
                                Investigation Status Distribution
                            </h3>
                            <canvas id="investigation-chart" height="200"></canvas>
                        </div>
                        
                        <!-- Monthly Case Trends -->
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                                Monthly Investigation Trends (Last 6 Months)
                            </h3>
                            <canvas id="trends-chart" height="200"></canvas>
                        </div>
                    </div>
                    
                    <!-- Suspect Status Breakdown -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-user-secret text-blue-600 mr-2"></i>
                            Suspect Status Overview
                        </h3>
                        <canvas id="suspect-chart" height="100"></canvas>
                    </div>
                    
                    <!-- Detailed Statistics Table -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-table text-blue-600 mr-2"></i>
                            Detailed Investigation Statistics
                        </h3>
                        <div id="detailed-stats" class="overflow-x-auto">
                            <div class="text-center py-8">
                                <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                <p class="text-gray-500 mt-2">Loading statistics...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Investigation Summary Report -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-file-alt text-blue-600 mr-2"></i>
                            Investigation Summary Report
                        </h3>
                        <div id="investigation-report" class="overflow-x-auto">
                            <div class="text-center py-8">
                                <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                <p class="text-gray-500 mt-2">Loading report...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Export Options -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-download text-blue-600 mr-2"></i>
                            Export Reports
                        </h3>
                        <div class="flex space-x-4">
                            <button onclick="exportReport('pdf')" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                <i class="fas fa-file-pdf mr-2"></i>Export as PDF
                            </button>
                            <button onclick="exportReport('csv')" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-file-csv mr-2"></i>Export as CSV
                            </button>
                            <button onclick="window.print()" class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
    
    // Load cases and notifications
    loadCases();
    loadNotifications();
    
    // Auto-refresh every 30 seconds
    setInterval(() => {
        loadNotifications();
    }, 30000);
}

// Load cases from API
async function loadCases() {
    try {
        const response = await fetch('/api/organization/police_fsu/cases');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Loaded cases:', data);
        
        if (data.cases && data.cases.length > 0) {
            allCases = data.cases; // Store for filtering
            displayCases(data.cases);
            updateKPIs(data.summary);
        } else {
            allCases = []; // Reset stored cases
            document.getElementById('cases-container').innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3 text-blue-300"></i>
                    <p class="text-lg font-medium">No cases assigned yet</p>
                    <p class="text-sm mt-2">You will receive notifications when new GBV cases are assigned to Police FSU</p>
                </div>
            `;
            updateKPIs({ total: 0, pending: 0, in_progress: 0, completed: 0, urgent: 0, court: 0 });
        }
    } catch (error) {
        console.error('Error loading cases:', error);
        document.getElementById('cases-container').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load cases. Please try again.</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

// Display cases in professional table
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
                <thead class="bg-gradient-to-r from-blue-50 to-blue-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Case #</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Incident Date</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Location</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${cases.map(c => `
                        <tr class="hover:bg-blue-50 transition-colors ${c.unread_count > 0 ? 'bg-yellow-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-bold text-blue-900">
                                        ${c.case_number}
                                    </div>
                                    ${c.unread_count > 0 ? '<span class="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse font-bold">NEW</span>' : ''}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getAssignmentPriorityColor(c.assignment_priority)}">
                                    <i class="fas fa-exclamation-circle mr-1"></i>${(c.assignment_priority || 'normal').toUpperCase()}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 font-medium">
                                    <i class="far fa-calendar mr-1 text-blue-600"></i>${c.incident_date || 'N/A'}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 font-medium">${c.violence_type || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    <i class="fas fa-map-marker-alt mr-1 text-blue-600"></i>${c.district_name || 'Unknown'}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getAssignmentStatusColor(c.assignment_status)}">
                                    ${formatAssignmentStatus(c.assignment_status)}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button onclick="viewCaseDetails('${c.case_number}', ${c.id})" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
                                ${c.assignment_status === 'pending' ? `
                                    <button onclick="acceptCase(${c.assignment_id})" class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow">
                                        <i class="fas fa-check mr-1"></i>Accept
                                    </button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = tableHTML;
}

// Update KPI cards
function updateKPIs(summary) {
    document.getElementById('total-cases').textContent = summary.total || 0;
    document.getElementById('pending-cases').textContent = summary.pending || 0;
    document.getElementById('in-progress-cases').textContent = summary.in_progress || 0;
    document.getElementById('completed-cases').textContent = summary.completed || 0;
    document.getElementById('high-priority-cases').textContent = summary.urgent || 0;
    document.getElementById('court-cases').textContent = summary.court || 0;
}

// Get assignment priority badge color
function getAssignmentPriorityColor(priority) {
    const colors = {
        'urgent': 'bg-red-100 text-red-800 border-2 border-red-600',
        'high': 'bg-orange-100 text-orange-800 border-2 border-orange-600',
        'normal': 'bg-blue-100 text-blue-800 border-2 border-blue-600',
        'low': 'bg-gray-100 text-gray-800 border-2 border-gray-600'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Get assignment status badge color
function getAssignmentStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800 border-2 border-yellow-600',
        'accepted': 'bg-blue-100 text-blue-800 border-2 border-blue-600',
        'in_progress': 'bg-purple-100 text-purple-800 border-2 border-purple-600',
        'completed': 'bg-green-100 text-green-800 border-2 border-green-600',
        'declined': 'bg-red-100 text-red-800 border-2 border-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Format assignment status
function formatAssignmentStatus(status) {
    return (status || 'pending').replace(/_/g, ' ').toUpperCase();
}

// Load notifications
async function loadNotifications() {
    try {
        const response = await fetch('/api/organization/police_fsu/notifications?unread_only=false');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Loaded notifications:', data);
        
        // Update badge
        const badge = document.getElementById('notification-badge');
        if (data.unread_count > 0) {
            badge.textContent = data.unread_count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
        
        // Update dropdown list
        displayNotifications(data.notifications || []);
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

// Display notifications in dropdown
function displayNotifications(notifications) {
    const list = document.getElementById('notification-list');
    
    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="p-4 text-center text-gray-500">
                <i class="fas fa-check-circle text-2xl mb-2 text-green-500"></i>
                <p>No notifications</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = notifications.map(n => `
        <div class="p-4 hover:bg-blue-50 cursor-pointer transition-colors ${n.is_read ? 'opacity-60' : 'bg-blue-50'}" onclick="markNotificationRead(${n.id}, '${n.action_url || ''}')">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${getNotificationIcon(n.notification_type)}
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900">${n.title}</p>
                    <p class="text-sm text-gray-600 mt-1">${n.message}</p>
                    <p class="text-xs text-gray-500 mt-1">
                        <i class="far fa-clock mr-1"></i>${formatTimestamp(n.created_at)}
                    </p>
                </div>
                ${!n.is_read ? '<div class="ml-2"><span class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span></div>' : ''}
            </div>
        </div>
    `).join('');
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        'new_case': '<i class="fas fa-file-medical text-blue-600 text-xl"></i>',
        'case_update': '<i class="fas fa-edit text-green-600 text-xl"></i>',
        'status_change': '<i class="fas fa-exchange-alt text-orange-600 text-xl"></i>',
        'urgent': '<i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>'
    };
    return icons[type] || '<i class="fas fa-bell text-gray-600 text-xl"></i>';
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}

// Toggle notification dropdown
function toggleNotifications() {
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.classList.toggle('hidden');
}

// Close notifications when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notification-dropdown');
    const bell = e.target.closest('[onclick="toggleNotifications()"]');
    
    if (dropdown && !dropdown.contains(e.target) && !bell) {
        dropdown.classList.add('hidden');
    }
});

// Mark notification as read
async function markNotificationRead(notificationId, actionUrl) {
    try {
        await fetch(`/api/notifications/${notificationId}/read`, {
            method: 'POST'
        });
        
        await loadNotifications();
        
        if (actionUrl) {
            const match = actionUrl.match(/\/cases\/([^\/]+)/);
            if (match) {
                const caseNumber = match[1];
                const response = await fetch('/api/organization/police_fsu/cases');
                const data = await response.json();
                const caseObj = data.cases.find(c => c.case_number === caseNumber);
                if (caseObj) {
                    viewCaseDetails(caseNumber, caseObj.id);
                }
            }
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

// Accept case assignment
async function acceptCase(assignmentId) {
    if (!confirm('Accept this case assignment and begin investigation?')) return;
    
    try {
        const response = await fetch(`/api/assignments/${assignmentId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'accepted',
                user_id: sessionData.id,
                notes: 'Case accepted by Police FSU - Investigation initiated'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        alert('Case accepted successfully! You can now begin investigation and evidence collection.');
        loadCases();
    } catch (error) {
        console.error('Error accepting case:', error);
        alert('Failed to accept case. Please try again.');
    }
}

// View comprehensive case details with all FSU features
async function viewCaseDetails(caseNumber, caseId) {
    try {
        const response = await fetch(`/api/cases/${caseNumber}/details?organization=police_fsu`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        currentCase = { ...data.case, id: caseId };
        
        // Show comprehensive modal with tabs for different sections
        showCaseModal(data, caseId);
    } catch (error) {
        console.error('Error loading case details:', error);
        alert('Failed to load case details. Please try again.');
    }
}

// Show comprehensive case modal with tabbed interface
function showCaseModal(data, caseId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const caseInfo = data.case;
    const timeline = data.timeline || [];
    const assignments = data.assignments || [];
    
    // Find Police FSU's assignment_id
    const policeAssignment = assignments.find(a => a.organization_type === 'police_fsu');
    const assignmentId = policeAssignment ? policeAssignment.id : null;
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <!-- Header -->
            <div class="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex items-center justify-between rounded-t-xl shadow-lg z-10">
                <div>
                    <h2 class="text-2xl font-bold flex items-center">
                        <i class="fas fa-shield-alt mr-2"></i>${caseInfo.case_number}
                    </h2>
                    <p class="text-sm text-blue-200">Sierra Leone Police FSU - Official Investigation File</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200 transition-colors">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <!-- Tabbed Navigation -->
            <div class="border-b border-gray-200 bg-gray-50">
                <nav class="flex space-x-2 px-6">
                    <button onclick="switchCaseTab('overview')" id="tab-overview" class="case-tab active px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                        <i class="fas fa-info-circle mr-2"></i>Case Overview
                    </button>
                    <button onclick="switchCaseTab('investigation')" id="tab-investigation" class="case-tab px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-search mr-2"></i>Investigation
                    </button>
                    <button onclick="switchCaseTab('evidence')" id="tab-evidence" class="case-tab px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-fingerprint mr-2"></i>Evidence
                    </button>
                    <button onclick="switchCaseTab('witnesses')" id="tab-witnesses" class="case-tab px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-users mr-2"></i>Witnesses
                    </button>
                    <button onclick="switchCaseTab('court')" id="tab-court" class="case-tab px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-gavel mr-2"></i>Court
                    </button>
                    <button onclick="switchCaseTab('timeline')" id="tab-timeline" class="case-tab px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-history mr-2"></i>Timeline
                    </button>
                </nav>
            </div>
            
            <!-- Content Area -->
            <div class="p-6">
                <!-- Overview Tab -->
                <div id="case-panel-overview" class="case-panel">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                            <label class="text-xs font-bold text-blue-700 uppercase">Violence Type</label>
                            <p class="text-gray-900 font-semibold mt-1">${caseInfo.violence_type || 'Unknown'}</p>
                        </div>
                        <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                            <label class="text-xs font-bold text-purple-700 uppercase">Incident Date</label>
                            <p class="text-gray-900 font-semibold mt-1">${caseInfo.incident_date || 'N/A'}</p>
                        </div>
                        <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                            <label class="text-xs font-bold text-green-700 uppercase">District</label>
                            <p class="text-gray-900 font-semibold mt-1">${caseInfo.district_name || 'Unknown'}</p>
                        </div>
                        <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                            <label class="text-xs font-bold text-orange-700 uppercase">Case Status</label>
                            <span class="inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(caseInfo.case_status)}">
                                ${caseInfo.case_status}
                            </span>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
                        <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                            <i class="fas fa-user text-blue-600 mr-2"></i>Survivor Information (Confidential)
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-medium text-gray-500">Age Group</label>
                                <p class="text-gray-900 font-semibold">${caseInfo.survivor_age_group || 'Unknown'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-500">Gender</label>
                                <p class="text-gray-900 font-semibold">${caseInfo.survivor_gender || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                            <i class="fas fa-network-wired text-blue-600 mr-2"></i>Multi-Agency Coordination
                        </h3>
                        <div class="space-y-2">
                            ${assignments.map(a => `
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <div>
                                        <span class="font-semibold text-gray-900">${formatOrgType(a.organization_type)}</span>
                                        <p class="text-sm text-gray-600">${a.assignment_reason || 'No reason provided'}</p>
                                    </div>
                                    <span class="px-3 py-1 text-xs rounded-full font-bold ${getAssignmentStatusColor(a.status)}">
                                        ${formatAssignmentStatus(a.status)}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Investigation Tab -->
                <div id="case-panel-investigation" class="case-panel hidden">
                    <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6 border border-purple-200">
                        <h3 class="font-bold text-gray-900 mb-4 flex items-center text-lg">
                            <i class="fas fa-clipboard-check text-purple-600 mr-2"></i>Record Investigation Update
                        </h3>
                        <form onsubmit="submitInvestigationUpdate(event, ${caseId}, '${caseInfo.case_number}', ${assignmentId})" class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">Investigation Status <span class="text-red-500">*</span></label>
                                    <select name="investigation_status" required class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600">
                                        <option value="">Select...</option>
                                        <option value="initiated">Investigation Initiated</option>
                                        <option value="evidence_collection">Evidence Collection</option>
                                        <option value="witness_statements">Witness Statements</option>
                                        <option value="suspect_identified">Suspect Identified</option>
                                        <option value="arrest_made">Arrest Made</option>
                                        <option value="referred_to_court">Referred to Court</option>
                                        <option value="closed">Investigation Closed</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">Suspect Status</label>
                                    <select name="suspect_status" class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600">
                                        <option value="">Select...</option>
                                        <option value="unknown">Unknown</option>
                                        <option value="identified">Identified</option>
                                        <option value="at_large">At Large</option>
                                        <option value="in_custody">In Custody</option>
                                        <option value="released_on_bail">Released on Bail</option>
                                        <option value="charged">Charged</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">Evidence Collected</label>
                                    <input type="text" name="evidence_collected" placeholder="e.g., Forensic samples, photos, clothing" class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">Witness Count</label>
                                    <input type="number" name="witness_count" min="0" value="0" class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600">
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Next Action</label>
                                <input type="text" name="next_action" placeholder="e.g., Interview suspect, collect more evidence, court filing" class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Investigation Notes <span class="text-red-500">*</span></label>
                                <textarea name="notes" rows="4" required placeholder="Detailed notes about investigation progress, findings, and actions taken..." class="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-600"></textarea>
                            </div>
                            
                            <div class="flex justify-end space-x-3 pt-4 border-t">
                                <button type="button" onclick="this.closest('.fixed').remove()" class="px-6 py-2 border-2 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                                    Cancel
                                </button>
                                <button type="submit" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg font-semibold">
                                    <i class="fas fa-save mr-2"></i>Save Investigation Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <!-- Evidence Tab -->
                <div id="case-panel-evidence" class="case-panel hidden">
                    <div class="bg-yellow-50 rounded-lg p-4 mb-4 border-l-4 border-yellow-500">
                        <div class="flex items-center">
                            <i class="fas fa-info-circle text-yellow-600 text-xl mr-3"></i>
                            <div>
                                <p class="font-semibold text-yellow-900">Evidence Chain of Custody</p>
                                <p class="text-sm text-yellow-800">All evidence handling is logged with timestamps and user signatures for court admissibility</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center py-12">
                        <i class="fas fa-fingerprint text-6xl text-gray-300 mb-4"></i>
                        <p class="text-lg font-semibold text-gray-600">Evidence Management System</p>
                        <p class="text-sm text-gray-500 mt-2">Coming Soon - API integration in progress</p>
                        <button class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-plus mr-2"></i>Add Evidence
                        </button>
                    </div>
                </div>
                
                <!-- Witnesses Tab -->
                <div id="case-panel-witnesses" class="case-panel hidden">
                    <div class="text-center py-12">
                        <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                        <p class="text-lg font-semibold text-gray-600">Witness Statement Management</p>
                        <p class="text-sm text-gray-500 mt-2">Coming Soon - API integration in progress</p>
                        <button class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-plus mr-2"></i>Record Witness Statement
                        </button>
                    </div>
                </div>
                
                <!-- Court Tab -->
                <div id="case-panel-court" class="case-panel hidden">
                    <div class="text-center py-12">
                        <i class="fas fa-gavel text-6xl text-gray-300 mb-4"></i>
                        <p class="text-lg font-semibold text-gray-600">Court Case Tracking</p>
                        <p class="text-sm text-gray-500 mt-2">Coming Soon - API integration in progress</p>
                        <button class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-plus mr-2"></i>File Court Case
                        </button>
                    </div>
                </div>
                
                <!-- Timeline Tab -->
                <div id="case-panel-timeline" class="case-panel hidden">
                    <div class="space-y-4">
                        ${timeline.length === 0 ? '<p class="text-gray-500 text-center py-8">No timeline updates yet</p>' : ''}
                        ${timeline.map(t => `
                            <div class="flex">
                                <div class="flex-shrink-0 w-12 h-12 rounded-full ${t.is_milestone ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gray-300'} flex items-center justify-center text-white shadow-lg">
                                    <i class="fas ${getTimelineIcon(t.update_category)}"></i>
                                </div>
                                <div class="ml-4 flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-bold text-gray-900">${t.title}</h4>
                                        <span class="text-xs text-gray-500 font-medium">${formatTimestamp(t.created_at)}</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mt-2">${t.description || ''}</p>
                                    <p class="text-xs text-gray-500 mt-2 flex items-center">
                                        <i class="fas fa-user mr-1"></i>${formatOrgType(t.created_by_organization)}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Switch case tab
function switchCaseTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.case-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.case-tab').forEach(tab => {
        tab.classList.remove('active', 'border-blue-600', 'text-blue-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected panel
    document.getElementById(`case-panel-${tabName}`).classList.remove('hidden');
    
    // Activate selected tab
    const activeTab = document.getElementById(`tab-${tabName}`);
    activeTab.classList.add('active', 'border-blue-600', 'text-blue-600');
    activeTab.classList.remove('border-transparent', 'text-gray-500');
}

// Get timeline icon
function getTimelineIcon(category) {
    const icons = {
        'general': 'fa-info-circle',
        'medical': 'fa-notes-medical',
        'investigation': 'fa-search',
        'legal': 'fa-gavel',
        'psychosocial': 'fa-heart'
    };
    return icons[category] || 'fa-info-circle';
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

// Format organization type
function formatOrgType(orgType) {
    const names = {
        'ministry': 'Ministry of Social Welfare',
        'rainbo': 'Rainbo Initiative',
        'police_fsu': 'Police FSU'
    };
    return names[orgType] || orgType;
}

// Submit investigation update
async function submitInvestigationUpdate(event, caseId, caseNumber, assignmentId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        user_id: sessionData.id,
        assignment_id: assignmentId,
        investigation_status: formData.get('investigation_status'),
        suspect_status: formData.get('suspect_status') || null,
        evidence_collected: formData.get('evidence_collected') || null,
        witness_count: parseInt(formData.get('witness_count')) || 0,
        next_action: formData.get('next_action') || null,
        notes: formData.get('notes') || null
    };
    
    try {
        const response = await fetch(`/api/cases/${caseId}/investigation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        alert('Investigation update recorded successfully!');
        
        // Close modal and reload cases
        document.querySelector('.fixed').remove();
        loadCases();
    } catch (error) {
        console.error('Error recording investigation update:', error);
        alert('Failed to record investigation update. Please try again.');
    }
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

// Tab switching functionality
function switchTab(tabName) {
    // Update tab buttons
    const tabs = ['cases', 'statistics'];
    tabs.forEach(tab => {
        const button = document.getElementById(`tab-${tab}`);
        const content = document.getElementById(`content-${tab}`);
        
        if (tab === tabName) {
            button.classList.add('border-blue-600', 'text-blue-600');
            button.classList.remove('border-transparent', 'text-gray-500');
            content.classList.remove('hidden');
        } else {
            button.classList.remove('border-blue-600', 'text-blue-600');
            button.classList.add('border-transparent', 'text-gray-500');
            content.classList.add('hidden');
        }
    });
    
    // Load content for the selected tab
    if (tabName === 'statistics') {
        loadStatistics();
        loadInvestigationReport();
    }
}

// Store all cases for filtering
let allCases = [];

// Filter cases by status
function filterCases(status) {
    if (status === 'all') {
        displayCases(allCases);
    } else {
        const filtered = allCases.filter(c => c.assignment_status === status);
        displayCases(filtered);
    }
}

// Load statistics and render charts
async function loadStatistics() {
    try {
        const response = await fetch('/api/organization/police_fsu/statistics');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Statistics data:', data);
        
        // Render investigation status chart
        renderInvestigationChart(data.investigation_status);
        
        // Render suspect status chart
        renderSuspectChart(data.suspect_status);
        
        // Render monthly trends chart
        renderMonthlyTrendsChart(data.monthly_trends);
        
        // Display detailed statistics table
        displayDetailedStats(data);
        
    } catch (error) {
        console.error('Error loading statistics:', error);
        document.getElementById('detailed-stats').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load statistics. Please try again.</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

// Render investigation status pie chart
function renderInvestigationChart(statusData) {
    const ctx = document.getElementById('investigation-chart');
    
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.investigationChart) {
        window.investigationChart.destroy();
    }
    
    const labels = statusData.map(s => s.investigation_status || 'Unknown');
    const counts = statusData.map(s => s.count);
    
    window.investigationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: [
                    '#1e40af', // dark blue
                    '#3b82f6', // blue
                    '#60a5fa', // light blue
                    '#93c5fd', // lighter blue
                    '#dbeafe'  // very light blue
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Render suspect status bar chart
function renderSuspectChart(statusData) {
    const ctx = document.getElementById('suspect-chart');
    
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.suspectChart) {
        window.suspectChart.destroy();
    }
    
    const labels = statusData.map(s => s.suspect_status || 'Unknown');
    const counts = statusData.map(s => s.count);
    
    window.suspectChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Cases',
                data: counts,
                backgroundColor: '#1e40af'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

// Render monthly trends line chart
function renderMonthlyTrendsChart(trends) {
    const ctx = document.getElementById('trends-chart');
    
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.trendsChart) {
        window.trendsChart.destroy();
    }
    
    const labels = trends.map(t => t.month);
    const counts = trends.map(t => t.case_count);
    
    window.trendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cases Assigned',
                data: counts,
                borderColor: '#1e40af',
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

// Display detailed statistics table
function displayDetailedStats(data) {
    const container = document.getElementById('detailed-stats');
    
    const html = `
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Metric</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Count</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Percentage</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 font-semibold text-gray-900">Total Cases Assigned</td>
                    <td class="px-6 py-4 text-2xl font-bold text-blue-600">${data.summary?.total_cases || 0}</td>
                    <td class="px-6 py-4">100%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Pending Investigation</td>
                    <td class="px-6 py-4 text-xl font-semibold text-orange-600">${data.summary?.pending || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.pending, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Under Investigation</td>
                    <td class="px-6 py-4 text-xl font-semibold text-blue-600">${data.summary?.investigating || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.investigating, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Completed Investigations</td>
                    <td class="px-6 py-4 text-xl font-semibold text-green-600">${data.summary?.completed || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.completed, data.summary?.total_cases)}%</td>
                </tr>
                <tr class="bg-blue-50">
                    <td class="px-6 py-4 font-semibold text-gray-900">Cases with Evidence Collected</td>
                    <td class="px-6 py-4 text-xl font-semibold text-blue-600">${data.summary?.cases_with_evidence || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.cases_with_evidence, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Total Witness Statements</td>
                    <td class="px-6 py-4 font-semibold">${data.summary?.total_witnesses || 0}</td>
                    <td class="px-6 py-4">N/A</td>
                </tr>
                <tr class="bg-red-50">
                    <td class="px-6 py-4 font-semibold text-gray-900">Urgent Cases</td>
                    <td class="px-6 py-4 text-xl font-semibold text-red-600">${data.summary?.urgent_cases || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.urgent_cases, data.summary?.total_cases)}%</td>
                </tr>
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Calculate percentage
function calculatePercentage(value, total) {
    if (!total || total === 0) return '0.0';
    return ((value / total) * 100).toFixed(1);
}

// Load investigation summary report
async function loadInvestigationReport() {
    try {
        const response = await fetch('/api/organization/police_fsu/reports?type=investigation_summary');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Investigation report data:', data);
        
        displayInvestigationReport(data.report);
        
    } catch (error) {
        console.error('Error loading investigation report:', error);
        document.getElementById('investigation-report').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load investigation report. Please try again.</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

// Display investigation summary report
function displayInvestigationReport(report) {
    const container = document.getElementById('investigation-report');
    
    if (!report || report.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-file-alt text-4xl mb-3"></i>
                <p class="text-lg font-medium">No investigation data available</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Case Number</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Incident Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Violence Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">District</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Investigation Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Suspect Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Witnesses</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Priority</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Last Update</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                ${report.map(r => `
                    <tr class="hover:bg-blue-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">
                            ${r.case_number}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">${formatDate(r.incident_date)}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                ${r.violence_type || 'N/A'}
                            </span>
                        </td>
                        <td class="px-6 py-4">${r.district || 'N/A'}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full ${getInvestigationStatusColor(r.investigation_status)}">
                                ${r.investigation_status || 'Not Started'}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full ${getSuspectStatusColor(r.suspect_status)}">
                                ${r.suspect_status || 'Unknown'}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-center">${r.witness_count || 0}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full ${getPriorityColor(r.priority)}">
                                ${r.priority || 'normal'}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">${r.last_update ? formatDate(r.last_update) : 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Get color classes for investigation status
function getInvestigationStatusColor(status) {
    const colors = {
        'initial_report': 'bg-yellow-100 text-yellow-800',
        'under_investigation': 'bg-blue-100 text-blue-800',
        'evidence_collected': 'bg-purple-100 text-purple-800',
        'suspect_identified': 'bg-indigo-100 text-indigo-800',
        'arrest_made': 'bg-orange-100 text-orange-800',
        'referred_to_prosecutor': 'bg-green-100 text-green-800',
        'case_closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Get color classes for suspect status
function getSuspectStatusColor(status) {
    const colors = {
        'unknown': 'bg-gray-100 text-gray-800',
        'identified': 'bg-blue-100 text-blue-800',
        'at_large': 'bg-orange-100 text-orange-800',
        'arrested': 'bg-green-100 text-green-800',
        'in_custody': 'bg-purple-100 text-purple-800',
        'released_on_bail': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Export report functionality
function exportReport(format) {
    if (format === 'pdf') {
        alert('PDF export will be implemented with a PDF generation library. For now, please use Print to PDF from your browser.');
        window.print();
    } else if (format === 'csv') {
        alert('CSV export functionality will be implemented. This will download detailed investigation data in CSV format.');
    }
}

console.log('Enhanced Police FSU Dashboard ready');
