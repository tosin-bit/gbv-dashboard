/**
 * Survivor Portal - REBUILT FROM SCRATCH
 * Simple, working login and dashboard
 */

function loadSurvivorPortal(section) {
    console.log('🔵 Loading Survivor Portal - Direct Access (No Login)...');
    
    // DIRECTLY SHOW DASHBOARD - No login required
    showSurvivorDashboard(section);
}

function loadSurvivorPortalOLD_WITH_LOGIN(section) {
    console.log('🔵 Loading Survivor Portal...');
    
    // Check if already logged in
    const survivorSession = sessionStorage.getItem('survivor_session');
    if (survivorSession) {
        showSurvivorDashboard(section);
        return;
    }
    
    // Show login form
    section.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-6">
            <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="p-8 text-center" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #32cd32 100%);">
                    <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <i class="fas fa-heart text-5xl" style="color: #1e3a8a;"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Survivor Support Portal</h2>
                    <p class="text-white text-opacity-90">Safe, Confidential Access to Your Case</p>
                </div>

                <!-- Login Form -->
                <div class="p-8">
                    <div class="border-2 rounded-xl p-6" style="border-color: #1e90ff;">
                        <h3 class="text-lg font-bold mb-4" style="color: #1e3a8a;">
                            <i class="fas fa-file-medical mr-2"></i>Access My Case
                        </h3>
                        <form id="survivor-login-form" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Case Number (e.g., GBV-2025-0001)
                                </label>
                                <input type="text" id="case-number" required
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="GBV-YYYY-NNNN">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    PIN Code
                                </label>
                                <input type="password" id="pin-code" required
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your 4-digit PIN">
                            </div>
                            <button type="submit" 
                                class="w-full py-3 text-white font-bold rounded-lg transition"
                                style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 100%);">
                                <i class="fas fa-sign-in-alt mr-2"></i>Access My Case
                            </button>
                        </form>
                        <div id="login-status" class="mt-4 text-center"></div>
                    </div>
                    
                    <!-- Report New Incident -->
                    <div class="mt-6 border-2 rounded-xl p-6" style="border-color: #32cd32;">
                        <h3 class="text-lg font-bold mb-3" style="color: #1e3a8a;">
                            <i class="fas fa-plus-circle mr-2"></i>Report New Incident
                        </h3>
                        <p class="text-sm text-gray-600 mb-4">
                            If this is your first time, start a new confidential report
                        </p>
                        <button onclick="showNewIncidentForm()" 
                            class="w-full py-3 text-white font-bold rounded-lg transition"
                            style="background: linear-gradient(135deg, #32cd32 0%, #228b22 100%);">
                            <i class="fas fa-file-medical-alt mr-2"></i>Start New Report
                        </button>
                    </div>

                    <!-- Emergency Hotlines -->
                    <div class="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <h3 class="text-lg font-bold mb-3 text-red-800">
                            <i class="fas fa-phone-volume mr-2"></i>24/7 Emergency Hotlines
                        </h3>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-red-800">National Helpline:</span>
                                <a href="tel:116" class="text-xl font-bold text-red-600">116</a>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-red-800">Police Emergency:</span>
                                <a href="tel:019" class="text-xl font-bold text-red-600">019</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Attach form handler
    const form = document.getElementById('survivor-login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSurvivorLogin(section);
    });
}

function handleSurvivorLogin(section) {
    const caseNumber = document.getElementById('case-number').value.trim();
    const pinCode = document.getElementById('pin-code').value.trim();
    const statusDiv = document.getElementById('login-status');
    
    console.log('🔐 Login attempt:', caseNumber);
    
    statusDiv.innerHTML = '<p class="text-blue-600"><i class="fas fa-spinner fa-spin mr-2"></i>Verifying...</p>';
    
    // Simulate validation (in production, this would be an API call)
    setTimeout(() => {
        if (caseNumber === 'GBV-2025-0001' && pinCode === '1234') {
            // Save session
            sessionStorage.setItem('survivor_session', JSON.stringify({
                caseNumber: caseNumber,
                loginTime: new Date().toISOString()
            }));
            
            console.log('✅ Login successful!');
            showSurvivorDashboard(section);
        } else {
            statusDiv.innerHTML = '<p class="text-red-600"><i class="fas fa-exclamation-circle mr-2"></i>Invalid case number or PIN</p>';
        }
    }, 1000);
}

function showSurvivorDashboard(section) {
    console.log('📊 Loading dashboard...');
    
    // No login required - direct access
    const caseNumber = 'Welcome';
    
    section.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #32cd32 100%);">
                <div class="text-center">
                    <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <i class="fas fa-heart text-5xl" style="color: #1e3a8a;"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Survivor Support Portal</h2>
                    <p class="text-white text-opacity-90">Safe, Confidential Access to Support & Resources</p>
                </div>
            </div>

            <!-- Emergency Hotlines -->
            <div class="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <h3 class="text-lg font-bold mb-3 text-red-800">
                    <i class="fas fa-phone-volume mr-2"></i>24/7 Emergency Support
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="tel:116" class="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700">
                        <i class="fas fa-phone text-2xl mb-2"></i>
                        <div class="font-bold text-xl">116</div>
                        <div class="text-sm">National Helpline</div>
                    </a>
                    <a href="tel:999" class="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700">
                        <i class="fas fa-ambulance text-2xl mb-2"></i>
                        <div class="font-bold text-xl">999</div>
                        <div class="text-sm">Medical Emergency</div>
                    </a>
                    <a href="tel:019" class="bg-red-600 text-white p-4 rounded-lg text-center hover:bg-red-700">
                        <i class="fas fa-shield-alt text-2xl mb-2"></i>
                        <div class="font-bold text-xl">019</div>
                        <div class="text-sm">Police FSU</div>
                    </a>
                </div>
            </div>

            <!-- Your Support Journey -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-road mr-2"></i>Your Support Journey
                </h3>
                <div class="space-y-3">
                    <div class="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <i class="fas fa-check-circle text-green-600 text-2xl mr-4"></i>
                        <div>
                            <div class="font-bold">Incident Reported</div>
                            <div class="text-sm text-gray-600">Your case has been documented safely</div>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <i class="fas fa-user-md text-blue-600 text-2xl mr-4"></i>
                        <div>
                            <div class="font-bold">Support Team Assigned</div>
                            <div class="text-sm text-gray-600">Counselor and case worker are ready</div>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                        <i class="fas fa-clock text-gray-400 text-2xl mr-4"></i>
                        <div>
                            <div class="font-bold">Medical Referral</div>
                            <div class="text-sm text-gray-600">Pending coordination</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Report New Incident -->
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer" 
                    onclick="showSurvivorReportForm()">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                            style="background: linear-gradient(135deg, #32cd32 0%, #228b22 100%);">
                            <i class="fas fa-plus text-white text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold">Report New Incident</h4>
                    </div>
                    <p class="text-sm text-gray-600">
                        Confidential reporting - your information is safe
                    </p>
                </div>

                <!-- Track My Cases -->
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                    onclick="showSurvivorCases()">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                            style="background: linear-gradient(135deg, #1e90ff 0%, #1e3a8a 100%);">
                            <i class="fas fa-folder-open text-white text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold">Track My Cases</h4>
                    </div>
                    <p class="text-sm text-gray-600">
                        View all your reported cases and their status
                    </p>
                </div>

                <!-- Find Support Services -->
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                    onclick="alert('Support Services:\\n\\n🏥 Rainbo Initiative - Medical Care\\n⚖️ Legal Aid Board - Legal Support\\n🏛️ Police FSU - Investigation\\n❤️ Counseling Services')">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                            style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);">
                            <i class="fas fa-hands-helping text-white text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold">Find Support Services</h4>
                    </div>
                    <p class="text-sm text-gray-600">
                        Locate medical, legal, and counseling help
                    </p>
                </div>

                <!-- Safety Planning -->
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                    onclick="alert('Safety Planning:\\n\\n✓ Keep emergency contacts handy\\n✓ Pack essential documents\\n✓ Know safe locations nearby\\n✓ Trust your instincts\\n\\nCall 116 for immediate help')">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                            style="background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);">
                            <i class="fas fa-shield-alt text-white text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold">Safety Planning</h4>
                    </div>
                    <p class="text-sm text-gray-600">
                        Create a personal safety plan
                    </p>
                </div>
            </div>
        </div>
    `;
}

function showSurvivorReportForm() {
    console.log('🔵 showSurvivorReportForm called');
    
    const section = document.getElementById('dashboard-content');
    console.log('   Section found:', !!section);
    
    if (!section) {
        console.error('❌ Cannot find dashboard-content section');
        alert('Error: Cannot find content section. Please refresh the page.');
        return;
    }
    
    console.log('   Checking for loadReportCaseForm...');
    console.log('   Available:', typeof window.loadReportCaseForm);
    
    // Check if loadReportCaseForm is available
    if (typeof window.loadReportCaseForm === 'function') {
        console.log('✅ Loading report form for survivor...');
        window.loadReportCaseForm(section, 'survivor');
        console.log('✅ Report form loaded successfully');
    } else {
        console.error('❌ loadReportCaseForm not available');
        console.log('   Available window functions:', Object.keys(window).filter(k => k.includes('load')));
        alert('Report form is not loaded yet. Please refresh the page and try again.');
    }
}

function showSurvivorCases() {
    const section = document.getElementById('dashboard-content');
    if (!section) return;
    
    console.log('📂 Loading survivor cases...');
    
    section.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-folder-open mr-2"></i>My Reported Cases
                        </h2>
                        <p class="text-gray-600 mt-1">Track the status of your cases</p>
                    </div>
                    <button onclick="loadSurvivorPortal(document.getElementById('dashboard-content'))" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Portal
                    </button>
                </div>
            </div>

            <!-- Cases List -->
            <div id="survivor-cases-list">
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                    <p class="mt-4 text-gray-600">Loading your cases...</p>
                </div>
            </div>
        </div>
    `;
    
    // Load cases from API
    setTimeout(() => {
        loadSurvivorCasesData();
    }, 500);
}

async function loadSurvivorCasesData() {
    const casesList = document.getElementById('survivor-cases-list');
    if (!casesList) return;
    
    try {
        // Fetch cases from API
        const response = await fetch('/api/cases');
        const cases = await response.json();
        
        if (!cases || cases.length === 0) {
            casesList.innerHTML = `
                <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                    <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-bold text-gray-700 mb-2">No Cases Yet</h3>
                    <p class="text-gray-600 mb-6">You haven't reported any cases yet</p>
                    <button onclick="showSurvivorReportForm()" 
                        class="px-6 py-3 text-white font-bold rounded-lg"
                        style="background: linear-gradient(135deg, #32cd32 0%, #228b22 100%);">
                        <i class="fas fa-plus mr-2"></i>Report Your First Case
                    </button>
                </div>
            `;
            return;
        }
        
        // Display cases
        let casesHTML = '<div class="space-y-4">';
        cases.forEach(caseItem => {
            const statusColor = getStatusColor(caseItem.status);
            const priorityBadge = getPriorityBadge(caseItem.priority);
            
            casesHTML += `
                <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-lg font-bold text-gray-800">
                                    ${caseItem.case_number}
                                </h3>
                                <span class="px-3 py-1 rounded-full text-sm font-bold" 
                                    style="background: ${statusColor.bg}; color: ${statusColor.text};">
                                    ${caseItem.status}
                                </span>
                                ${priorityBadge}
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p class="text-sm text-gray-500">Incident Date</p>
                                    <p class="font-semibold">${formatDate(caseItem.incident_date)}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Type of Violence</p>
                                    <p class="font-semibold">${caseItem.gbv_type || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">District</p>
                                    <p class="font-semibold">${caseItem.district || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Reported On</p>
                                    <p class="font-semibold">${formatDate(caseItem.created_at)}</p>
                                </div>
                            </div>
                        </div>
                        <button onclick="viewCaseDetails('${caseItem.case_number}')" 
                            class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                            <i class="fas fa-eye mr-2"></i>View Details
                        </button>
                    </div>
                </div>
            `;
        });
        casesHTML += '</div>';
        
        casesList.innerHTML = casesHTML;
        
    } catch (error) {
        console.error('Error loading cases:', error);
        casesList.innerHTML = `
            <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
                <h3 class="text-xl font-bold text-red-800 mb-2">Error Loading Cases</h3>
                <p class="text-red-700 mb-4">Unable to load your cases. Please try again.</p>
                <button onclick="loadSurvivorCasesData()" 
                    class="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">
                    <i class="fas fa-sync mr-2"></i>Retry
                </button>
            </div>
        `;
    }
}

function getStatusColor(status) {
    const colors = {
        'Pending': { bg: '#fef3c7', text: '#92400e' },
        'Active': { bg: '#dbeafe', text: '#1e3a8a' },
        'Under Investigation': { bg: '#e0e7ff', text: '#3730a3' },
        'Resolved': { bg: '#d1fae5', text: '#065f46' },
        'Closed': { bg: '#f3f4f6', text: '#1f2937' }
    };
    return colors[status] || { bg: '#f3f4f6', text: '#1f2937' };
}

function getPriorityBadge(priority) {
    const badges = {
        'High': '<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">🔴 HIGH</span>',
        'Medium': '<span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">🟡 MEDIUM</span>',
        'Low': '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">🟢 LOW</span>'
    };
    return badges[priority] || '';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function viewCaseDetails(caseNumber) {
    alert(`Case Details: ${caseNumber}\\n\\nFull case details view coming soon...\\n\\nYou can contact support for updates on this case.`);
}

function showNewIncidentForm() {
    showSurvivorReportForm();
}

function showNewIncidentFormDashboard() {
    showSurvivorReportForm();
}

function logoutSurvivor() {
    sessionStorage.removeItem('survivor_session');
    const section = document.getElementById('dashboard-content');
    if (section) {
        loadSurvivorPortal(section);
    } else {
        location.reload();
    }
}

// Export functions
window.loadSurvivorPortal = loadSurvivorPortal;
window.showSurvivorDashboard = showSurvivorDashboard;
window.showSurvivorReportForm = showSurvivorReportForm;
window.showSurvivorCases = showSurvivorCases;
window.loadSurvivorCasesData = loadSurvivorCasesData;
window.viewCaseDetails = viewCaseDetails;
window.showNewIncidentForm = showNewIncidentForm;
window.showNewIncidentFormDashboard = showNewIncidentFormDashboard;
window.logoutSurvivor = logoutSurvivor;

console.log('✅ Survivor Portal with Report & Track Cases - Ready!');
