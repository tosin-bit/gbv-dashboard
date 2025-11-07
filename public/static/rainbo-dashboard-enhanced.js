// Enhanced Rainbo Centre Dashboard - Comprehensive Medical Services Tracking
console.log('Enhanced Rainbo Dashboard loading...');

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
        <header class="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 shadow-lg">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <i class="fas fa-hospital text-purple-600 text-3xl"></i>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">
                                Rainbo Initiative
                            </h1>
                            <p class="text-sm text-purple-100">${sessionData.organization || 'One-Stop Center for GBV Survivors'}</p>
                            <p class="text-xs text-purple-200">Free Medical • Psychosocial • Legal Referral Services</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Notification Bell -->
                        <div class="relative">
                            <button onclick="toggleNotifications()" class="relative p-2 text-white hover:bg-purple-500 rounded-full transition-colors">
                                <i class="fas fa-bell text-2xl"></i>
                                <span id="notification-badge" class="absolute top-0 right-0 hidden bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">0</span>
                            </button>
                            <!-- Notification Dropdown -->
                            <div id="notification-dropdown" class="hidden absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border-2 border-purple-200 z-50" style="max-height: 500px; overflow-y: auto;">
                                <div class="p-4 border-b bg-purple-50">
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
                            <div class="text-xs text-purple-200">${sessionData.role}</div>
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
            <!-- Quick Stats Dashboard -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">Total Cases</div>
                            <div class="text-3xl font-bold mt-1" id="total-cases">0</div>
                        </div>
                        <i class="fas fa-users text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">Pending</div>
                            <div class="text-3xl font-bold mt-1" id="pending-cases">0</div>
                        </div>
                        <i class="fas fa-clock text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">Active</div>
                            <div class="text-3xl font-bold mt-1" id="in-progress-cases">0</div>
                        </div>
                        <i class="fas fa-heartbeat text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">Completed</div>
                            <div class="text-3xl font-bold mt-1" id="completed-cases">0</div>
                        </div>
                        <i class="fas fa-check-circle text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">Urgent</div>
                            <div class="text-3xl font-bold mt-1" id="urgent-cases">0</div>
                        </div>
                        <i class="fas fa-exclamation-triangle text-4xl opacity-50"></i>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm opacity-90">PEP Given</div>
                            <div class="text-3xl font-bold mt-1" id="pep-count">0</div>
                        </div>
                        <i class="fas fa-syringe text-4xl opacity-50"></i>
                    </div>
                </div>
            </div>
            
            <!-- Services Overview -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-hand-holding-medical text-purple-600 mr-3"></i>
                    Rainbo Initiative Services
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <h3 class="font-semibold text-purple-900 mb-2">Medical Services</h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Post-Exposure Prophylaxis (PEP)</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>STI Testing & Treatment</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Forensic Medical Examination</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Emergency Contraception</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Wound Care & Treatment</li>
                            <li><i class="fas fa-check text-purple-600 mr-2"></i>Pregnancy Testing</li>
                        </ul>
                    </div>
                    
                    <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <h3 class="font-semibold text-blue-900 mb-2">Psychosocial Support</h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Crisis Counseling</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Trauma Therapy</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Family Counseling</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Support Groups</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Follow-up Care</li>
                            <li><i class="fas fa-check text-blue-600 mr-2"></i>Mental Health Assessment</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <h3 class="font-semibold text-green-900 mb-2">Additional Services</h3>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Dignity Kits Distribution</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Legal Referrals</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Police Coordination</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Safe House Referrals</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>Economic Empowerment</li>
                            <li><i class="fas fa-check text-green-600 mr-2"></i>24/7 Helpline</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Navigation Tabs -->
            <div class="bg-white rounded-xl shadow-lg mb-6">
                <div class="border-b border-gray-200">
                    <nav class="flex space-x-4 px-6" role="tablist">
                        <button onclick="switchTab('cases')" id="tab-cases" class="py-4 px-4 border-b-2 border-purple-600 text-purple-600 font-semibold">
                            <i class="fas fa-folder-open mr-2"></i>Cases
                        </button>
                        <button onclick="switchTab('statistics')" id="tab-statistics" class="py-4 px-4 border-b-2 border-transparent text-gray-500 hover:text-purple-600 font-semibold">
                            <i class="fas fa-chart-bar mr-2"></i>Statistics & Reports
                        </button>
                        <button onclick="switchTab('followups')" id="tab-followups" class="py-4 px-4 border-b-2 border-transparent text-gray-500 hover:text-purple-600 font-semibold">
                            <i class="fas fa-calendar-check mr-2"></i>Follow-up Appointments
                        </button>
                    </nav>
                </div>
            </div>
            
            <!-- Tab Content: Cases -->
            <div id="content-cases" class="tab-content">
                <div class="bg-white rounded-xl shadow-lg">
                    <div class="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-semibold text-gray-900">
                                <i class="fas fa-folder-open text-purple-600 mr-2"></i>
                                Assigned Cases
                            </h2>
                            <div class="flex items-center space-x-3">
                                <!-- Filter by Status -->
                                <select onchange="filterCases(this.value)" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                    <option value="all">All Cases</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onclick="loadCases()" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
                        <!-- Services Breakdown Chart -->
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                <i class="fas fa-chart-pie text-purple-600 mr-2"></i>
                                Services Provided Breakdown
                            </h3>
                            <div style="height: 300px; position: relative;">
                                <canvas id="services-chart"></canvas>
                            </div>
                        </div>
                        
                        <!-- Monthly Trends Chart -->
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">
                                <i class="fas fa-chart-line text-purple-600 mr-2"></i>
                                Monthly Service Trends (Last 6 Months)
                            </h3>
                            <div style="height: 300px; position: relative;">
                                <canvas id="trends-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Detailed Statistics Table -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-table text-purple-600 mr-2"></i>
                            Detailed Service Statistics
                        </h3>
                        <div id="detailed-stats" class="overflow-x-auto">
                            <div class="text-center py-8">
                                <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                <p class="text-gray-500 mt-2">Loading statistics...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Export Options -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-download text-purple-600 mr-2"></i>
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
            
            <!-- Tab Content: Follow-up Appointments -->
            <div id="content-followups" class="tab-content hidden">
                <div class="bg-white rounded-xl shadow-lg">
                    <div class="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                        <h2 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-calendar-check text-purple-600 mr-2"></i>
                            Upcoming Follow-up Appointments
                        </h2>
                    </div>
                    <div id="followups-container" class="p-6">
                        <div class="text-center py-8">
                            <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                            <p class="text-gray-500 mt-2">Loading follow-ups...</p>
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
        const response = await fetch('/api/organization/rainbo/cases');
        
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
                    <i class="fas fa-inbox text-4xl mb-3"></i>
                    <p class="text-lg font-medium">No cases assigned yet</p>
                    <p class="text-sm mt-2">You will receive notifications when new cases are assigned to Rainbo</p>
                </div>
            `;
            updateKPIs({ total: 0, pending: 0, in_progress: 0, completed: 0, urgent: 0, pep_count: 0 });
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

// Display cases in table
function displayCases(cases) {
    const container = document.getElementById('cases-container');
    
    if (cases.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-3"></i>
                <p>No active cases</p>
            </div>
        `;
        return;
    }
    
    const tableHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-purple-50 to-blue-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Case Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Incident Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Survivor Info</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${cases.map(c => `
                        <tr class="hover:bg-purple-50 transition-colors ${c.unread_count > 0 ? 'bg-blue-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    ${c.case_number}
                                    ${c.unread_count > 0 ? '<span class="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full animate-pulse">NEW</span>' : ''}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAssignmentPriorityColor(c.assignment_priority)}">
                                    ${(c.assignment_priority || 'normal').toUpperCase()}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.incident_date || 'N/A'}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${c.violence_type || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${c.survivor_age_group || 'Unknown'}</div>
                                <div class="text-xs text-gray-500">${c.survivor_gender || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAssignmentStatusColor(c.assignment_status)}">
                                    ${formatAssignmentStatus(c.assignment_status)}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button onclick="viewCaseDetails('${c.case_number}', ${c.id})" class="text-purple-600 hover:text-purple-900 font-medium">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
                                ${c.assignment_status === 'pending' ? `
                                    <button onclick="acceptCase(${c.assignment_id})" class="text-green-600 hover:text-green-900 font-medium">
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
    document.getElementById('urgent-cases').textContent = summary.urgent || 0;
    document.getElementById('pep-count').textContent = summary.pep_count || 0;
}

// Get assignment priority badge color
function getAssignmentPriorityColor(priority) {
    const colors = {
        'urgent': 'bg-red-100 text-red-800 border border-red-300',
        'high': 'bg-orange-100 text-orange-800 border border-orange-300',
        'normal': 'bg-blue-100 text-blue-800 border border-blue-300',
        'low': 'bg-gray-100 text-gray-800 border border-gray-300'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Get assignment status badge color
function getAssignmentStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        'accepted': 'bg-blue-100 text-blue-800 border border-blue-300',
        'in_progress': 'bg-purple-100 text-purple-800 border border-purple-300',
        'completed': 'bg-green-100 text-green-800 border border-green-300',
        'declined': 'bg-red-100 text-red-800 border border-red-300'
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
        const response = await fetch('/api/organization/rainbo/notifications?unread_only=false');
        
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
        <div class="p-4 hover:bg-purple-50 cursor-pointer transition-colors ${n.is_read ? 'opacity-60' : 'bg-blue-50'}" onclick="markNotificationRead(${n.id}, '${n.action_url || ''}')">
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
                ${!n.is_read ? '<div class="ml-2"><span class="inline-block w-2 h-2 bg-purple-600 rounded-full"></span></div>' : ''}
            </div>
        </div>
    `).join('');
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        'new_case': '<i class="fas fa-file-medical text-purple-600 text-xl"></i>',
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
        
        // Reload notifications
        await loadNotifications();
        
        // Navigate if action URL provided
        if (actionUrl) {
            const match = actionUrl.match(/\/cases\/([^\/]+)/);
            if (match) {
                const caseNumber = match[1];
                const response = await fetch('/api/organization/rainbo/cases');
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
    if (!confirm('Accept this case assignment?')) return;
    
    try {
        const response = await fetch(`/api/assignments/${assignmentId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'accepted',
                user_id: sessionData.id,
                notes: 'Case accepted by Rainbo Initiative'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        alert('Case accepted successfully! You can now provide medical services.');
        loadCases();
    } catch (error) {
        console.error('Error accepting case:', error);
        alert('Failed to accept case. Please try again.');
    }
}

// View case details with comprehensive timeline and medical service form
async function viewCaseDetails(caseNumber, caseId) {
    try {
        const response = await fetch(`/api/cases/${caseNumber}/details?organization=rainbo`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create modal with enhanced Rainbo-specific features
        showCaseModal(data, caseId);
    } catch (error) {
        console.error('Error loading case details:', error);
        alert('Failed to load case details. Please try again.');
    }
}

// Show case details modal with comprehensive Rainbo services
function showCaseModal(data, caseId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const caseInfo = data.case;
    const timeline = data.timeline || [];
    const assignments = data.assignments || [];
    
    // Find Rainbo's assignment_id
    const rainboAssignment = assignments.find(a => a.organization_type === 'rainbo');
    const assignmentId = rainboAssignment ? rainboAssignment.id : null;
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <!-- Header -->
            <div class="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
                <div>
                    <h2 class="text-2xl font-bold">${caseInfo.case_number}</h2>
                    <p class="text-sm text-purple-100">Assigned to Rainbo Initiative</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200 transition-colors">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                <!-- Case Info Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <label class="text-xs font-medium text-purple-700 uppercase">Violence Type</label>
                        <p class="text-gray-900 font-semibold mt-1">${caseInfo.violence_type || 'Unknown'}</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <label class="text-xs font-medium text-blue-700 uppercase">Incident Date</label>
                        <p class="text-gray-900 font-semibold mt-1">${caseInfo.incident_date || 'N/A'}</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <label class="text-xs font-medium text-green-700 uppercase">District</label>
                        <p class="text-gray-900 font-semibold mt-1">${caseInfo.district_name || 'Unknown'}</p>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <label class="text-xs font-medium text-orange-700 uppercase">Case Status</label>
                        <span class="inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(caseInfo.case_status)}">
                            ${caseInfo.case_status}
                        </span>
                    </div>
                </div>
                
                <!-- Survivor Info -->
                <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6 border border-purple-200">
                    <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                        <i class="fas fa-user text-purple-600 mr-2"></i>Survivor Information
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Age Group</label>
                            <p class="text-gray-900">${caseInfo.survivor_age_group || 'Unknown'}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Gender</label>
                            <p class="text-gray-900">${caseInfo.survivor_gender || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
                
                <!-- All Assignments -->
                <div class="mb-6">
                    <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                        <i class="fas fa-network-wired text-purple-600 mr-2"></i>Case Assignments
                    </h3>
                    <div class="space-y-2">
                        ${assignments.map(a => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                    <span class="font-medium text-gray-900">${formatOrgType(a.organization_type)}</span>
                                    <p class="text-sm text-gray-600">${a.assignment_reason || 'No reason provided'}</p>
                                </div>
                                <span class="px-3 py-1 text-xs rounded-full ${getAssignmentStatusColor(a.status)}">
                                    ${formatAssignmentStatus(a.status)}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Timeline -->
                <div class="mb-6">
                    <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                        <i class="fas fa-history text-purple-600 mr-2"></i>Case Timeline
                    </h3>
                    <div class="space-y-4">
                        ${timeline.length === 0 ? '<p class="text-gray-500 text-center py-4">No updates yet</p>' : ''}
                        ${timeline.map(t => `
                            <div class="flex">
                                <div class="flex-shrink-0 w-10 h-10 rounded-full ${t.is_milestone ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gray-300'} flex items-center justify-center text-white">
                                    <i class="fas ${getTimelineIcon(t.update_category)}"></i>
                                </div>
                                <div class="ml-4 flex-1 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-medium text-gray-900">${t.title}</h4>
                                        <span class="text-xs text-gray-500">${formatTimestamp(t.created_at)}</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mt-1">${t.description || ''}</p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-user mr-1"></i>${formatOrgType(t.created_by_organization)}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Comprehensive Medical Services Form -->
                <div class="border-t-2 border-purple-200 pt-6">
                    <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                        <i class="fas fa-notes-medical text-purple-600 mr-2"></i>Record Medical Services Provided
                    </h3>
                    
                    <!-- Tabs for Different Service Categories -->
                    <div class="border-b border-gray-200 mb-4">
                        <nav class="-mb-px flex space-x-4">
                            <button onclick="switchServiceTab('medical')" id="tab-medical" class="service-tab active border-b-2 border-purple-600 text-purple-600 py-2 px-4 font-medium text-sm">
                                <i class="fas fa-syringe mr-2"></i>Medical Services
                            </button>
                            <button onclick="switchServiceTab('psychosocial')" id="tab-psychosocial" class="service-tab border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-4 font-medium text-sm">
                                <i class="fas fa-heart mr-2"></i>Psychosocial Support
                            </button>
                            <button onclick="switchServiceTab('additional')" id="tab-additional" class="service-tab border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-4 font-medium text-sm">
                                <i class="fas fa-hands-helping mr-2"></i>Additional Services
                            </button>
                        </nav>
                    </div>
                    
                    <form onsubmit="submitMedicalService(event, ${caseId}, '${caseInfo.case_number}', ${assignmentId})" class="space-y-4">
                        <!-- Medical Services Tab -->
                        <div id="service-panel-medical" class="service-panel">
                            <div class="grid grid-cols-2 gap-4">
                                <!-- PEP Administration -->
                                <div class="bg-pink-50 rounded-lg p-4 border border-pink-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="pep_given" name="pep_given" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="pep_given" class="ml-2 font-medium text-gray-900">Post-Exposure Prophylaxis (PEP)</label>
                                    </div>
                                    <div id="pep-details" class="hidden space-y-2">
                                        <input type="date" name="pep_start_date" class="w-full border rounded px-3 py-2 text-sm" placeholder="Start Date">
                                        <input type="text" name="pep_medication" class="w-full border rounded px-3 py-2 text-sm" placeholder="Medication details">
                                        <input type="number" name="pep_dosage_days" class="w-full border rounded px-3 py-2 text-sm" placeholder="Dosage days (e.g., 28)">
                                    </div>
                                </div>
                                
                                <!-- STI Testing -->
                                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="sti_test" name="sti_test" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="sti_test" class="ml-2 font-medium text-gray-900">STI Testing & Treatment</label>
                                    </div>
                                    <div id="sti-details" class="hidden space-y-2">
                                        <select name="sti_results" class="w-full border rounded px-3 py-2 text-sm">
                                            <option value="">Test Results...</option>
                                            <option value="negative">Negative</option>
                                            <option value="positive">Positive - Treatment Provided</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                        <textarea name="sti_notes" rows="2" class="w-full border rounded px-3 py-2 text-sm" placeholder="STI test notes"></textarea>
                                    </div>
                                </div>
                                
                                <!-- Forensic Exam -->
                                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="forensic_exam" name="forensic_exam" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="forensic_exam" class="ml-2 font-medium text-gray-900">Forensic Medical Examination</label>
                                    </div>
                                    <div id="forensic-details" class="hidden space-y-2">
                                        <textarea name="forensic_findings" rows="2" class="w-full border rounded px-3 py-2 text-sm" placeholder="Examination findings"></textarea>
                                        <input type="text" name="evidence_collected" class="w-full border rounded px-3 py-2 text-sm" placeholder="Evidence collected">
                                    </div>
                                </div>
                                
                                <!-- Emergency Contraception -->
                                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="emergency_contraception" name="emergency_contraception" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="emergency_contraception" class="ml-2 font-medium text-gray-900">Emergency Contraception</label>
                                    </div>
                                    <div id="contraception-details" class="hidden space-y-2">
                                        <input type="text" name="contraception_type" class="w-full border rounded px-3 py-2 text-sm" placeholder="Type (e.g., Plan B, IUD)">
                                        <input type="datetime-local" name="contraception_given_at" class="w-full border rounded px-3 py-2 text-sm">
                                    </div>
                                </div>
                                
                                <!-- Wound Care -->
                                <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="wound_care" name="wound_care" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="wound_care" class="ml-2 font-medium text-gray-900">Wound Care & Treatment</label>
                                    </div>
                                    <div id="wound-details" class="hidden space-y-2">
                                        <textarea name="wound_description" rows="2" class="w-full border rounded px-3 py-2 text-sm" placeholder="Describe injuries/wounds"></textarea>
                                        <input type="text" name="wound_treatment" class="w-full border rounded px-3 py-2 text-sm" placeholder="Treatment provided">
                                    </div>
                                </div>
                                
                                <!-- Pregnancy Testing -->
                                <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="pregnancy_test" name="pregnancy_test" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="pregnancy_test" class="ml-2 font-medium text-gray-900">Pregnancy Testing</label>
                                    </div>
                                    <div id="pregnancy-details" class="hidden space-y-2">
                                        <select name="pregnancy_result" class="w-full border rounded px-3 py-2 text-sm">
                                            <option value="">Test Result...</option>
                                            <option value="negative">Negative</option>
                                            <option value="positive">Positive - Counseling Provided</option>
                                        </select>
                                        <textarea name="pregnancy_notes" rows="2" class="w-full border rounded px-3 py-2 text-sm" placeholder="Notes and follow-up plan"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Psychosocial Support Tab -->
                        <div id="service-panel-psychosocial" class="service-panel hidden">
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Crisis Counseling -->
                                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="crisis_counseling" name="crisis_counseling" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="crisis_counseling" class="ml-2 font-medium text-gray-900">Crisis Counseling</label>
                                    </div>
                                    <div id="crisis-details" class="hidden space-y-2">
                                        <input type="number" name="counseling_sessions" class="w-full border rounded px-3 py-2 text-sm" placeholder="Number of sessions" min="1">
                                        <input type="text" name="counselor_name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Counselor name">
                                    </div>
                                </div>
                                
                                <!-- Trauma Therapy -->
                                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="trauma_therapy" name="trauma_therapy" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="trauma_therapy" class="ml-2 font-medium text-gray-900">Trauma Therapy</label>
                                    </div>
                                    <div id="trauma-details" class="hidden space-y-2">
                                        <select name="therapy_type" class="w-full border rounded px-3 py-2 text-sm">
                                            <option value="">Therapy Type...</option>
                                            <option value="cbt">Cognitive Behavioral Therapy</option>
                                            <option value="emdr">EMDR</option>
                                            <option value="group">Group Therapy</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- Family Counseling -->
                                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="family_counseling" name="family_counseling" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="family_counseling" class="ml-2 font-medium text-gray-900">Family Counseling</label>
                                    </div>
                                    <div id="family-details" class="hidden space-y-2">
                                        <input type="number" name="family_members_count" class="w-full border rounded px-3 py-2 text-sm" placeholder="Family members involved" min="1">
                                    </div>
                                </div>
                                
                                <!-- Support Group -->
                                <div class="bg-pink-50 rounded-lg p-4 border border-pink-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="support_group" name="support_group" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="support_group" class="ml-2 font-medium text-gray-900">Support Group Referral</label>
                                    </div>
                                    <div id="support-details" class="hidden space-y-2">
                                        <input type="text" name="support_group_name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Support group name">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Additional Services Tab -->
                        <div id="service-panel-additional" class="service-panel hidden">
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Dignity Kit -->
                                <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="dignity_kit" name="dignity_kit" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="dignity_kit" class="ml-2 font-medium text-gray-900">Dignity Kit Distribution</label>
                                    </div>
                                    <div id="dignity-details" class="hidden space-y-2">
                                        <textarea name="dignity_kit_contents" rows="2" class="w-full border rounded px-3 py-2 text-sm" placeholder="Kit contents (hygiene items, clothing, etc.)"></textarea>
                                    </div>
                                </div>
                                
                                <!-- Legal Referral -->
                                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="legal_referral" name="legal_referral" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="legal_referral" class="ml-2 font-medium text-gray-900">Legal Referral</label>
                                    </div>
                                    <div id="legal-details" class="hidden space-y-2">
                                        <input type="text" name="legal_organization" class="w-full border rounded px-3 py-2 text-sm" placeholder="Legal aid organization">
                                        <input type="text" name="lawyer_name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Lawyer/advocate name">
                                    </div>
                                </div>
                                
                                <!-- Safe House Referral -->
                                <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="safe_house" name="safe_house" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="safe_house" class="ml-2 font-medium text-gray-900">Safe House Referral</label>
                                    </div>
                                    <div id="safehouse-details" class="hidden space-y-2">
                                        <input type="text" name="safe_house_name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Safe house name">
                                        <input type="date" name="safe_house_referral_date" class="w-full border rounded px-3 py-2 text-sm">
                                    </div>
                                </div>
                                
                                <!-- Economic Empowerment -->
                                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <div class="flex items-center mb-3">
                                        <input type="checkbox" id="economic_support" name="economic_support" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
                                        <label for="economic_support" class="ml-2 font-medium text-gray-900">Economic Empowerment</label>
                                    </div>
                                    <div id="economic-details" class="hidden space-y-2">
                                        <select name="economic_support_type" class="w-full border rounded px-3 py-2 text-sm">
                                            <option value="">Support Type...</option>
                                            <option value="skills_training">Skills Training</option>
                                            <option value="microloan">Microloan Referral</option>
                                            <option value="business_grant">Business Grant</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Common Fields -->
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Service Provider Name</label>
                                <input type="text" name="provider_name" required class="w-full border rounded px-3 py-2" placeholder="Doctor/Counselor name">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                                <input type="date" name="follow_up_date" class="w-full border rounded px-3 py-2">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Service Notes</label>
                            <textarea name="service_notes" rows="3" class="w-full border rounded px-3 py-2" placeholder="Additional notes about services provided..."></textarea>
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="this.closest('.fixed').remove()" class="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg">
                                <i class="fas fa-save mr-2"></i>Save Services Record
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for checkbox toggles
    setupCheckboxToggles();
}

// Setup checkbox toggles for service details
function setupCheckboxToggles() {
    const checkboxes = [
        { id: 'pep_given', details: 'pep-details' },
        { id: 'sti_test', details: 'sti-details' },
        { id: 'forensic_exam', details: 'forensic-details' },
        { id: 'emergency_contraception', details: 'contraception-details' },
        { id: 'wound_care', details: 'wound-details' },
        { id: 'pregnancy_test', details: 'pregnancy-details' },
        { id: 'crisis_counseling', details: 'crisis-details' },
        { id: 'trauma_therapy', details: 'trauma-details' },
        { id: 'family_counseling', details: 'family-details' },
        { id: 'support_group', details: 'support-details' },
        { id: 'dignity_kit', details: 'dignity-details' },
        { id: 'legal_referral', details: 'legal-details' },
        { id: 'safe_house', details: 'safehouse-details' },
        { id: 'economic_support', details: 'economic-details' }
    ];
    
    checkboxes.forEach(({ id, details }) => {
        const checkbox = document.getElementById(id);
        const detailsDiv = document.getElementById(details);
        
        if (checkbox && detailsDiv) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    detailsDiv.classList.remove('hidden');
                } else {
                    detailsDiv.classList.add('hidden');
                }
            });
        }
    });
}

// Switch service tabs
function switchServiceTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.service-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active', 'border-purple-600', 'text-purple-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected panel
    document.getElementById(`service-panel-${tabName}`).classList.remove('hidden');
    
    // Activate selected tab
    const activeTab = document.getElementById(`tab-${tabName}`);
    activeTab.classList.add('active', 'border-purple-600', 'text-purple-600');
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

// Submit medical service record
async function submitMedicalService(event, caseId, caseNumber, assignmentId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Collect all service data
    const data = {
        user_id: sessionData.id,
        assignment_id: assignmentId,
        // Medical services
        pep_given: formData.get('pep_given') === 'on',
        pep_start_date: formData.get('pep_start_date') || null,
        pep_medication: formData.get('pep_medication') || null,
        pep_dosage_days: formData.get('pep_dosage_days') ? parseInt(formData.get('pep_dosage_days')) : null,
        sti_test: formData.get('sti_test') === 'on',
        sti_results: formData.get('sti_results') || null,
        sti_notes: formData.get('sti_notes') || null,
        forensic_exam: formData.get('forensic_exam') === 'on',
        forensic_findings: formData.get('forensic_findings') || null,
        evidence_collected: formData.get('evidence_collected') || null,
        emergency_contraception: formData.get('emergency_contraception') === 'on',
        contraception_type: formData.get('contraception_type') || null,
        wound_care: formData.get('wound_care') === 'on',
        wound_description: formData.get('wound_description') || null,
        wound_treatment: formData.get('wound_treatment') || null,
        pregnancy_test: formData.get('pregnancy_test') === 'on',
        pregnancy_result: formData.get('pregnancy_result') || null,
        pregnancy_notes: formData.get('pregnancy_notes') || null,
        // Psychosocial services
        crisis_counseling: formData.get('crisis_counseling') === 'on',
        counseling_sessions: formData.get('counseling_sessions') ? parseInt(formData.get('counseling_sessions')) : null,
        counselor_name: formData.get('counselor_name') || null,
        trauma_therapy: formData.get('trauma_therapy') === 'on',
        therapy_type: formData.get('therapy_type') || null,
        family_counseling: formData.get('family_counseling') === 'on',
        family_members_count: formData.get('family_members_count') ? parseInt(formData.get('family_members_count')) : null,
        support_group: formData.get('support_group') === 'on',
        support_group_name: formData.get('support_group_name') || null,
        // Additional services
        dignity_kit: formData.get('dignity_kit') === 'on',
        dignity_kit_contents: formData.get('dignity_kit_contents') || null,
        legal_referral: formData.get('legal_referral') === 'on',
        legal_organization: formData.get('legal_organization') || null,
        lawyer_name: formData.get('lawyer_name') || null,
        safe_house: formData.get('safe_house') === 'on',
        safe_house_name: formData.get('safe_house_name') || null,
        economic_support: formData.get('economic_support') === 'on',
        economic_support_type: formData.get('economic_support_type') || null,
        // Common fields
        provider_name: formData.get('provider_name'),
        follow_up_date: formData.get('follow_up_date') || null,
        service_notes: formData.get('service_notes') || null
    };
    
    try {
        const response = await fetch(`/api/cases/${caseId}/medical`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        alert('Medical services recorded successfully!');
        
        // Close modal and reload cases
        document.querySelector('.fixed').remove();
        loadCases();
    } catch (error) {
        console.error('Error recording medical service:', error);
        alert('Failed to record medical services. Please try again.');
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
    const tabs = ['cases', 'statistics', 'followups'];
    tabs.forEach(tab => {
        const button = document.getElementById(`tab-${tab}`);
        const content = document.getElementById(`content-${tab}`);
        
        if (tab === tabName) {
            button.classList.add('border-purple-600', 'text-purple-600');
            button.classList.remove('border-transparent', 'text-gray-500');
            content.classList.remove('hidden');
        } else {
            button.classList.remove('border-purple-600', 'text-purple-600');
            button.classList.add('border-transparent', 'text-gray-500');
            content.classList.add('hidden');
        }
    });
    
    // Load content for the selected tab
    if (tabName === 'statistics') {
        loadStatistics();
    } else if (tabName === 'followups') {
        loadFollowups();
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
        const response = await fetch('/api/organization/rainbo/statistics');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Statistics data:', data);
        
        // Render services breakdown chart
        renderServicesChart(data.services);
        
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

// Render services breakdown pie chart
function renderServicesChart(services) {
    const ctx = document.getElementById('services-chart');
    
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.servicesChart) {
        window.servicesChart.destroy();
    }
    
    const data = {
        labels: [
            'PEP Administered',
            'STI Testing',
            'Pregnancy Tests',
            'Forensic Exams',
            'Follow-ups Required'
        ],
        datasets: [{
            data: [
                services?.pep_count || 0,
                services?.sti_count || 0,
                services?.pregnancy_test_count || 0,
                services?.forensic_exam_count || 0,
                services?.follow_up_required_count || 0
            ],
            backgroundColor: [
                '#9333ea', // purple
                '#3b82f6', // blue
                '#ec4899', // pink
                '#8b5cf6', // violet
                '#06b6d4'  // cyan
            ]
        }]
    };
    
    window.servicesChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 11
                        }
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
    const counts = trends.map(t => t.service_count);
    
    window.trendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Services Provided',
                data: counts,
                borderColor: '#9333ea',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
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
            <thead class="bg-purple-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Metric</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Count</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Percentage</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 font-semibold text-gray-900">Total Cases Assigned</td>
                    <td class="px-6 py-4 text-2xl font-bold text-purple-600">${data.summary?.total_cases || 0}</td>
                    <td class="px-6 py-4">100%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Pending Cases</td>
                    <td class="px-6 py-4 text-xl font-semibold text-orange-600">${data.summary?.pending || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.pending, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Active Cases</td>
                    <td class="px-6 py-4 text-xl font-semibold text-blue-600">${data.summary?.in_progress || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.in_progress, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Completed Cases</td>
                    <td class="px-6 py-4 text-xl font-semibold text-green-600">${data.summary?.completed || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.completed, data.summary?.total_cases)}%</td>
                </tr>
                <tr class="bg-purple-50">
                    <td class="px-6 py-4 font-semibold text-gray-900">PEP Administered</td>
                    <td class="px-6 py-4 text-xl font-semibold text-purple-600">${data.summary?.pep_administered || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.pep_administered, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">STI Testing Done</td>
                    <td class="px-6 py-4 font-semibold">${data.services?.sti_count || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.services?.sti_count, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Pregnancy Tests Done</td>
                    <td class="px-6 py-4 font-semibold">${data.services?.pregnancy_test_count || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.services?.pregnancy_test_count, data.summary?.total_cases)}%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-gray-700">Forensic Exams Conducted</td>
                    <td class="px-6 py-4 font-semibold">${data.services?.forensic_exam_count || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.services?.forensic_exam_count, data.summary?.total_cases)}%</td>
                </tr>
                <tr class="bg-blue-50">
                    <td class="px-6 py-4 font-semibold text-gray-900">Follow-ups Required</td>
                    <td class="px-6 py-4 text-xl font-semibold text-blue-600">${data.summary?.follow_ups_needed || 0}</td>
                    <td class="px-6 py-4">${calculatePercentage(data.summary?.follow_ups_needed, data.summary?.total_cases)}%</td>
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

// Load follow-up appointments
async function loadFollowups() {
    try {
        const response = await fetch('/api/organization/rainbo/followups');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Follow-ups data:', data);
        
        displayFollowups(data.followups);
        
    } catch (error) {
        console.error('Error loading follow-ups:', error);
        document.getElementById('followups-container').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
                <p>Failed to load follow-ups. Please try again.</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

// Display follow-up appointments
function displayFollowups(followups) {
    const container = document.getElementById('followups-container');
    
    if (!followups || followups.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-check text-4xl mb-3"></i>
                <p class="text-lg font-medium">No upcoming follow-up appointments</p>
                <p class="text-sm mt-2">All survivors are up to date with their care plan</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-purple-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Case Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">District</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Initial Service Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Follow-up Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Notes</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Days Until</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${followups.map(f => {
                        const daysUntil = Math.ceil((new Date(f.follow_up_date) - new Date()) / (1000 * 60 * 60 * 24));
                        const urgency = daysUntil <= 3 ? 'bg-red-50' : daysUntil <= 7 ? 'bg-yellow-50' : '';
                        
                        return `
                            <tr class="hover:bg-purple-50 transition-colors ${urgency}">
                                <td class="px-6 py-4 whitespace-nowrap font-semibold text-purple-600">
                                    ${f.case_number}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                        ${f.violence_type || 'N/A'}
                                    </span>
                                </td>
                                <td class="px-6 py-4">${f.district_name || 'N/A'}</td>
                                <td class="px-6 py-4">${formatDate(f.service_date)}</td>
                                <td class="px-6 py-4 font-semibold">
                                    ${formatDate(f.follow_up_date)}
                                </td>
                                <td class="px-6 py-4 max-w-xs truncate">${f.notes || 'No notes'}</td>
                                <td class="px-6 py-4">
                                    <span class="px-3 py-1 rounded-full font-semibold ${
                                        daysUntil <= 0 ? 'bg-red-100 text-red-800' :
                                        daysUntil <= 3 ? 'bg-orange-100 text-orange-800' :
                                        daysUntil <= 7 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }">
                                        ${daysUntil <= 0 ? 'OVERDUE' : `${daysUntil} days`}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// Export report functionality
function exportReport(format) {
    if (format === 'pdf') {
        alert('PDF export will be implemented with a PDF generation library. For now, please use Print to PDF from your browser.');
        window.print();
    } else if (format === 'csv') {
        // Export statistics as CSV
        alert('CSV export functionality will be implemented. This will download detailed statistics in CSV format.');
    }
}

console.log('Enhanced Rainbo Dashboard ready');
