/**
 * Case Status Tracking
 * PIN-protected case progress viewer
 */

function loadCaseStatus(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Quick Exit Button -->
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" 
                        class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>

            <!-- Back Button -->
            <div class="mb-4">
                <button onclick="loadSurvivorPortal(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Survivor Portal
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-clipboard-check text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">Check Your Case Status</h1>
                        <p class="text-xl text-cyan-50">Track your case progress securely</p>
                    </div>
                </div>
            </div>

            <!-- Case Number Entry -->
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Enter Your Case Number</h3>
                <p class="text-gray-600 mb-6">
                    Enter the case number you received when you submitted your report.
                </p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Case Number</label>
                        <input type="text" id="case-number-input" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-lg font-mono"
                               placeholder="GBV-XXXXXX-XXXX">
                    </div>
                    <button onclick="lookupCase()" 
                            class="w-full px-6 py-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all font-bold text-lg">
                        <i class="fas fa-search mr-2"></i>Check Status
                    </button>
                </div>
            </div>

            <!-- Case Details Container -->
            <div id="case-details-container"></div>

            <!-- Help Section -->
            <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h3 class="text-lg font-bold text-blue-800 mb-2">
                    <i class="fas fa-question-circle mr-2"></i>Don't Have Your Case Number?
                </h3>
                <p class="text-blue-700 mb-4">
                    If you lost your case number, you can call 116 hotline or visit the nearest service center 
                    where you submitted your report. Bring any identification you have.
                </p>
                <a href="tel:116" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold">
                    <i class="fas fa-phone-alt mr-2"></i>Call 116 for Help
                </a>
            </div>
        </div>
    `;
}

function lookupCase() {
    const caseNumber = document.getElementById('case-number-input')?.value?.trim();
    if (!caseNumber) {
        alert('Please enter your case number');
        return;
    }

    // Try to find case in local storage first
    try {
        const reports = JSON.parse(localStorage.getItem('survivor_reports') || '[]');
        const foundCase = reports.find(r => r.caseNumber === caseNumber);

        if (foundCase) {
            displayCaseDetails(foundCase);
        } else {
            // Simulate backend check with demo data
            displayDemoCaseDetails(caseNumber);
        }
    } catch (error) {
        console.error('Error looking up case:', error);
        displayDemoCaseDetails(caseNumber);
    }
}

function displayCaseDetails(caseData) {
    const container = document.getElementById('case-details-container');
    if (!container) return;

    const statusSteps = [
        { step: 1, title: 'Report Received', status: 'completed', date: caseData.submittedAt },
        { step: 2, title: 'Initial Review', status: 'completed', date: null },
        { step: 3, title: 'Case Assigned', status: 'in-progress', date: null },
        { step: 4, title: 'Investigation', status: 'pending', date: null },
        { step: 5, title: 'Support Services', status: 'pending', date: null }
    ];

    container.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Case Details</h3>
                <span class="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                    <i class="fas fa-check-circle mr-2"></i>Active
                </span>
            </div>

            <!-- Case Info -->
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-gray-500">Case Number</div>
                        <div class="text-lg font-bold text-gray-800">${caseData.caseNumber}</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">Submitted On</div>
                        <div class="text-lg font-bold text-gray-800">
                            ${new Date(caseData.submittedAt).toLocaleDateString()}
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">District</div>
                        <div class="text-lg font-bold text-gray-800">${caseData.incidentLocation || 'Not specified'}</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">Current Status</div>
                        <div class="text-lg font-bold text-cyan-600">Under Review</div>
                    </div>
                </div>
            </div>

            <!-- Progress Timeline -->
            <h4 class="text-xl font-bold text-gray-800 mb-4">Case Progress</h4>
            <div class="space-y-4 mb-6">
                ${statusSteps.map(step => `
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mr-4">
                            ${step.status === 'completed' ? 
                                '<div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center"><i class="fas fa-check"></i></div>' :
                              step.status === 'in-progress' ?
                                '<div class="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center animate-pulse"><i class="fas fa-spinner fa-spin"></i></div>' :
                                '<div class="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">' + step.step + '</div>'
                            }
                        </div>
                        <div class="flex-1">
                            <div class="font-bold text-gray-800">${step.title}</div>
                            ${step.date ? `<div class="text-sm text-gray-500">${new Date(step.date).toLocaleDateString()}</div>` : ''}
                            ${step.status === 'in-progress' ? '<div class="text-sm text-cyan-600">In progress...</div>' : ''}
                            ${step.status === 'pending' ? '<div class="text-sm text-gray-500">Waiting...</div>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Next Steps -->
            <div class="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 class="font-bold text-gray-800 mb-3">What Happens Next?</h4>
                <p class="text-sm text-gray-700 mb-3">
                    A caseworker has been assigned to review your report. They will contact you within 48 hours 
                    ${caseData.survivorPhone ? `at ${caseData.survivorPhone}` : 'if you provided contact information'}.
                </p>
                <p class="text-sm text-gray-700">
                    You will be connected with appropriate services based on your needs (medical, legal, counseling).
                </p>
            </div>

            <!-- Upcoming Appointments -->
            <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 class="font-bold text-gray-800 mb-3">
                    <i class="fas fa-calendar-alt mr-2 text-cyan-600"></i>Upcoming Appointments
                </h4>
                <p class="text-sm text-gray-600">No appointments scheduled yet. You will be notified once appointments are arranged.</p>
            </div>

            <!-- Support Resources -->
            <div class="bg-green-50 rounded-lg p-6">
                <h4 class="font-bold text-gray-800 mb-3">
                    <i class="fas fa-hands-helping mr-2 text-green-600"></i>Support Available
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>24/7 Hotline Support</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>Counseling Services</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>Legal Assistance</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>Safe Housing Referrals</span>
                    </div>
                </div>
            </div>

            <!-- Contact Section -->
            <div class="mt-6 flex gap-4">
                <a href="tel:116" class="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all text-center font-semibold">
                    <i class="fas fa-phone-alt mr-2"></i>Call 116 Hotline
                </a>
                <button onclick="showServiceFinder()" class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-center font-semibold">
                    <i class="fas fa-map-marked-alt mr-2"></i>Find Services
                </button>
            </div>
        </div>
    `;
}

function displayDemoCaseDetails(caseNumber) {
    const container = document.getElementById('case-details-container');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
            <div class="flex items-start">
                <i class="fas fa-exclamation-triangle text-yellow-600 text-3xl mr-4"></i>
                <div>
                    <h3 class="text-lg font-bold text-yellow-800 mb-2">Case Number Not Found</h3>
                    <p class="text-yellow-700 mb-4">
                        We couldn't find a case with number <strong>${caseNumber}</strong> in our system.
                    </p>
                    <p class="text-yellow-700 text-sm mb-4">
                        This could mean:
                    </p>
                    <ul class="text-sm text-yellow-700 space-y-1 ml-4">
                        <li>• The case number was entered incorrectly</li>
                        <li>• The report is still being processed (check back in 24 hours)</li>
                        <li>• The report was submitted through a different system</li>
                    </ul>
                    <div class="mt-4">
                        <a href="tel:116" class="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-semibold">
                            <i class="fas fa-phone-alt mr-2"></i>Call 116 for Assistance
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.loadCaseStatus = loadCaseStatus;
window.lookupCase = lookupCase;
