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
                        <!-- Notification Bell -->
                        <div class="relative">
                            <button onclick="toggleNotifications()" class="relative p-2 text-gray-600 hover:text-gray-900">
                                <i class="fas fa-bell text-xl"></i>
                                <span id="notification-badge" class="absolute top-0 right-0 hidden bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                            </button>
                            <!-- Notification Dropdown -->
                            <div id="notification-dropdown" class="hidden absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50" style="max-height: 500px; overflow-y: auto;">
                                <div class="p-4 border-b">
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
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Total Cases</div>
                    <div class="text-3xl font-bold text-gray-900 mt-2" id="total-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">All assigned cases</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Pending</div>
                    <div class="text-3xl font-bold text-orange-600 mt-2" id="pending-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">Awaiting action</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">In Progress</div>
                    <div class="text-3xl font-bold text-blue-600 mt-2" id="in-progress-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">Active investigations</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">Completed</div>
                    <div class="text-3xl font-bold text-green-600 mt-2" id="completed-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">Finished cases</div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm font-medium text-gray-500">High Priority</div>
                    <div class="text-3xl font-bold text-red-600 mt-2" id="high-priority-cases">0</div>
                    <div class="text-xs text-gray-500 mt-1">Critical cases</div>
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
        // Use the new organization-specific endpoint
        const response = await fetch('/api/organization/police_fsu/cases');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Loaded cases:', data);
        
        if (data.cases && data.cases.length > 0) {
            displayCases(data.cases);
            updateKPIs(data.summary);
        } else {
            document.getElementById('cases-container').innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3"></i>
                    <p>No cases assigned yet</p>
                    <p class="text-sm mt-2">You will receive notifications when new cases are assigned to Police FSU</p>
                </div>
            `;
            updateKPIs({ total: 0, pending: 0, in_progress: 0, completed: 0, urgent: 0 });
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
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incident Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Violence Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${cases.map(c => `
                        <tr class="hover:bg-gray-50 ${c.unread_count > 0 ? 'bg-blue-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    ${c.case_number}
                                    ${c.unread_count > 0 ? '<span class="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">NEW</span>' : ''}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAssignmentPriorityColor(c.assignment_priority)}">
                                    ${(c.assignment_priority || 'normal').toUpperCase()}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.incident_date || 'N/A'}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">${c.violence_type || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">${c.district_name || 'Unknown'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAssignmentStatusColor(c.assignment_status)}">
                                    ${formatAssignmentStatus(c.assignment_status)}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button onclick="viewCaseDetails('${c.case_number}', ${c.id})" class="text-blue-600 hover:text-blue-900">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
                                ${c.assignment_status === 'pending' ? `
                                    <button onclick="acceptCase(${c.assignment_id})" class="text-green-600 hover:text-green-900">
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

// Get assignment priority badge color
function getAssignmentPriorityColor(priority) {
    const colors = {
        'urgent': 'bg-red-100 text-red-800',
        'high': 'bg-orange-100 text-orange-800',
        'normal': 'bg-blue-100 text-blue-800',
        'low': 'bg-gray-100 text-gray-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Get assignment status badge color
function getAssignmentStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'accepted': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'declined': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Format assignment status
function formatAssignmentStatus(status) {
    return (status || 'pending').replace(/_/g, ' ').toUpperCase();
}

// Get status badge color (for case status)
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
function updateKPIs(summary) {
    document.getElementById('total-cases').textContent = summary.total || 0;
    document.getElementById('pending-cases').textContent = summary.pending || 0;
    document.getElementById('in-progress-cases').textContent = summary.in_progress || 0;
    document.getElementById('completed-cases').textContent = summary.completed || 0;
    document.getElementById('high-priority-cases').textContent = summary.urgent || 0;
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
                <i class="fas fa-check-circle text-2xl mb-2"></i>
                <p>No notifications</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = notifications.map(n => `
        <div class="p-4 hover:bg-gray-50 ${n.is_read ? 'opacity-60' : 'bg-blue-50'}" onclick="markNotificationRead(${n.id}, '${n.action_url || ''}')">
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
        'new_case': '<i class="fas fa-file-medical text-blue-600"></i>',
        'case_update': '<i class="fas fa-edit text-green-600"></i>',
        'status_change': '<i class="fas fa-exchange-alt text-orange-600"></i>',
        'urgent': '<i class="fas fa-exclamation-triangle text-red-600"></i>'
    };
    return icons[type] || '<i class="fas fa-bell text-gray-600"></i>';
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
            // Extract case number from URL like /cases/GBV-2025-001
            const match = actionUrl.match(/\/cases\/([^\/]+)/);
            if (match) {
                const caseNumber = match[1];
                // Find case ID
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
    if (!confirm('Accept this case assignment?')) return;
    
    try {
        const response = await fetch(`/api/assignments/${assignmentId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'accepted',
                user_id: sessionData.id,
                notes: 'Case accepted by Police FSU'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        alert('Case accepted successfully! You can now begin investigation.');
        loadCases(); // Reload cases
    } catch (error) {
        console.error('Error accepting case:', error);
        alert('Failed to accept case. Please try again.');
    }
}

// View case details with complete timeline
async function viewCaseDetails(caseNumber, caseId) {
    try {
        const response = await fetch(`/api/cases/${caseNumber}/details?organization=police_fsu`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create modal
        showCaseModal(data, caseId);
    } catch (error) {
        console.error('Error loading case details:', error);
        alert('Failed to load case details. Please try again.');
    }
}

// Show case details modal
function showCaseModal(data, caseId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const caseInfo = data.case;
    const timeline = data.timeline || [];
    const assignments = data.assignments || [];
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">${caseInfo.case_number}</h2>
                    <p class="text-sm text-gray-600">Assigned to Police FSU</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                <!-- Case Info -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="text-sm font-medium text-gray-500">Violence Type</label>
                        <p class="text-gray-900">${caseInfo.violence_type || 'Unknown'}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-500">Incident Date</label>
                        <p class="text-gray-900">${caseInfo.incident_date || 'N/A'}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-500">District</label>
                        <p class="text-gray-900">${caseInfo.district_name || 'Unknown'}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-500">Case Status</label>
                        <span class="px-2 py-1 text-xs rounded-full ${getStatusColor(caseInfo.case_status)}">
                            ${caseInfo.case_status}
                        </span>
                    </div>
                </div>
                
                <!-- Survivor Info -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 class="font-semibold text-gray-900 mb-3">Survivor Information</h3>
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
                    <h3 class="font-semibold text-gray-900 mb-3">Case Assignments</h3>
                    <div class="space-y-2">
                        ${assignments.map(a => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <span class="font-medium">${formatOrgType(a.organization_type)}</span>
                                    <p class="text-sm text-gray-600">${a.assignment_reason || 'No reason provided'}</p>
                                </div>
                                <span class="px-2 py-1 text-xs rounded-full ${getAssignmentStatusColor(a.status)}">
                                    ${formatAssignmentStatus(a.status)}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Timeline -->
                <div class="mb-6">
                    <h3 class="font-semibold text-gray-900 mb-3">Case Timeline</h3>
                    <div class="space-y-4">
                        ${timeline.length === 0 ? '<p class="text-gray-500 text-center py-4">No updates yet</p>' : ''}
                        ${timeline.map(t => `
                            <div class="flex">
                                <div class="flex-shrink-0 w-10 h-10 rounded-full ${t.is_milestone ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white">
                                    <i class="fas ${getTimelineIcon(t.update_category)}"></i>
                                </div>
                                <div class="ml-4 flex-1">
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
                
                <!-- Add Investigation Update Form -->
                <div class="border-t pt-6">
                    <h3 class="font-semibold text-gray-900 mb-4">
                        <i class="fas fa-search mr-2"></i>Record Investigation Update
                    </h3>
                    <form onsubmit="submitInvestigationUpdate(event, ${caseId}, '${caseInfo.case_number}')" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Investigation Status</label>
                                <select name="investigation_status" required class="w-full border rounded px-3 py-2">
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
                                <label class="block text-sm font-medium text-gray-700 mb-1">Suspect Status</label>
                                <select name="suspect_status" class="w-full border rounded px-3 py-2">
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
                                <label class="block text-sm font-medium text-gray-700 mb-1">Evidence Collected</label>
                                <input type="text" name="evidence_collected" placeholder="e.g., Forensic samples, photos" class="w-full border rounded px-3 py-2">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Witness Count</label>
                                <input type="number" name="witness_count" min="0" value="0" class="w-full border rounded px-3 py-2">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Next Action</label>
                            <input type="text" name="next_action" placeholder="e.g., Interview suspect, collect more evidence" class="w-full border rounded px-3 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Investigation Notes</label>
                            <textarea name="notes" rows="3" placeholder="Detailed notes about investigation progress" class="w-full border rounded px-3 py-2"></textarea>
                        </div>
                        
                        <div class="flex justify-end space-x-3">
                            <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-2 border rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                <i class="fas fa-save mr-2"></i>Save Investigation Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
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
async function submitInvestigationUpdate(event, caseId, caseNumber) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        user_id: sessionData.id,
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

// Old function kept for compatibility
function viewCase(caseNumber) {
    // Redirect to new function
    fetch('/api/organization/police_fsu/cases')
        .then(r => r.json())
        .then(data => {
            const caseObj = data.cases.find(c => c.case_number === caseNumber);
            if (caseObj) {
                viewCaseDetails(caseNumber, caseObj.id);
            }
        });
}

// Old function kept for compatibility
function updateCase(caseNumber) {
    viewCase(caseNumber);
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
