// Interactive Demo Flow
console.log('Demo Flow loading...');

let demoCase = null;
let demoEmail = null;

// Initialize demo
document.addEventListener('DOMContentLoaded', () => {
    loadDemoPage();
});

// Load demo landing page
function loadDemoPage() {
    const root = document.getElementById('demo-flow-root');
    
    root.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <!-- Demo Header -->
            <header class="bg-white shadow-sm border-b-4" style="border-bottom-color: #1e3a8a;">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold" style="color: #1e3a8a;">
                                <i class="fas fa-play-circle mr-2"></i>GBV Response System - Interactive Demo
                            </h1>
                            <p class="text-sm text-gray-600">Experience the complete case reporting and response pipeline</p>
                        </div>
                        <button onclick="window.location.href='/'" class="px-4 py-2 border rounded hover:bg-gray-50">
                            <i class="fas fa-arrow-left mr-2"></i>Back to Dashboard
                        </button>
                    </div>
                </div>
            </header>
            
            <!-- Main Demo Content -->
            <main class="max-w-7xl mx-auto py-12 px-4">
                <!-- Welcome Section -->
                <div id="welcome-section" class="text-center mb-12">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-4xl mb-6">
                        <i class="fas fa-rocket"></i>
                    </div>
                    
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">
                        See GBV Response in Action
                    </h2>
                    
                    <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Watch how a single GBV report automatically triggers a coordinated response across multiple organizations - 
                        in real-time, right before your eyes.
                    </p>
                    
                    <!-- Demo Features -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <h3 class="font-semibold text-lg text-gray-900 mb-2">Instant Reporting</h3>
                            <p class="text-sm text-gray-600">Submit a case and watch it get processed in milliseconds</p>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mx-auto mb-4">
                                <i class="fas fa-route"></i>
                            </div>
                            <h3 class="font-semibold text-lg text-gray-900 mb-2">Smart Routing</h3>
                            <p class="text-sm text-gray-600">See automatic assignment to Police FSU, Rainbo, and more</p>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">
                                <i class="fas fa-bell"></i>
                            </div>
                            <h3 class="font-semibold text-lg text-gray-900 mb-2">Live Updates</h3>
                            <p class="text-sm text-gray-600">Track real-time notifications and organization responses</p>
                        </div>
                    </div>
                    
                    <!-- Email Input Section -->
                    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
                        <div class="mb-6">
                            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl mb-4">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Start Your Demo Journey</h3>
                            <p class="text-gray-600">Enter your email to receive demo notifications and track the case in real-time</p>
                        </div>
                        
                        <form onsubmit="startDemo(event)" class="space-y-4">
                            <div>
                                <label class="block text-left text-sm font-medium text-gray-700 mb-2">
                                    Email Address (for demo notifications)
                                </label>
                                <input 
                                    type="email" 
                                    id="demo-email" 
                                    required 
                                    placeholder="your.email@example.com"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                />
                                <p class="text-xs text-gray-500 mt-2 text-left">
                                    <i class="fas fa-info-circle mr-1"></i>
                                    This is a demo only - no actual emails will be sent. Notifications will appear on-screen.
                                </p>
                            </div>
                            
                            <div class="text-left bg-gray-50 rounded-lg p-4">
                                <p class="text-sm font-medium text-gray-700 mb-2">Demo Scenario:</p>
                                <p class="text-sm text-gray-600">
                                    We'll simulate a <strong>Sexual Assault case</strong> being reported. 
                                    Watch as it automatically gets assigned to:
                                </p>
                                <ul class="text-sm text-gray-600 mt-2 space-y-1">
                                    <li><i class="fas fa-shield-alt text-blue-600 mr-2"></i>Police FSU (for investigation)</li>
                                    <li><i class="fas fa-hospital text-purple-600 mr-2"></i>Rainbo Initiative (for medical care & PEP)</li>
                                </ul>
                            </div>
                            
                            <button 
                                type="submit" 
                                class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg"
                            >
                                <i class="fas fa-play mr-2"></i>Start Interactive Demo
                            </button>
                        </form>
                    </div>
                </div>
                
                <!-- Demo Visualization Area (hidden initially) -->
                <div id="demo-visualization" class="hidden">
                    <!-- Will be populated during demo -->
                </div>
            </main>
        </div>
    `;
}

// Start the demo
async function startDemo(event) {
    event.preventDefault();
    
    demoEmail = document.getElementById('demo-email').value;
    
    // Hide welcome section
    document.getElementById('welcome-section').classList.add('hidden');
    
    // Show loading
    const vizArea = document.getElementById('demo-visualization');
    vizArea.classList.remove('hidden');
    vizArea.innerHTML = `
        <div class="text-center py-12">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-3xl mb-6 animate-pulse">
                <i class="fas fa-cog fa-spin"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Creating Demo Case...</h3>
            <p class="text-gray-600">Setting up your interactive experience</p>
        </div>
    `;
    
    // Wait a moment for effect
    await sleep(1500);
    
    // Create demo case
    await createDemoCase();
}

// Create demo case
async function createDemoCase() {
    try {
        // Prepare demo case data
        const caseData = {
            // Incident details
            incident_date: new Date().toISOString().split('T')[0],
            incident_time: new Date().toTimeString().split(' ')[0].substring(0, 5),
            
            // Location
            country_id: 1, // Sierra Leone
            district_id: 1, // Western Area Urban
            sub_district_id: null,
            location_description: 'Demo Case - Interactive Demonstration',
            
            // Violence type (Sexual Assault - Rape)
            violence_types: ['Rape'],
            gbv_type_id: 1, // Assuming Rape is ID 1
            
            // Survivor info
            survivor_age_group: '26-35',
            survivor_gender: 'female',
            
            // Perpetrator
            perpetrator_relationship: 'stranger',
            perpetrator_gender: 'male',
            
            // Case details
            case_description: `DEMO CASE - Interactive Demonstration for ${demoEmail}\n\nThis is a simulated case to demonstrate the GBV response system's automatic routing and coordination capabilities.`,
            
            // Services
            immediate_needs: 'Medical care, Police assistance, Counseling',
            medical_received: 'no',
            police_notified: 'yes',
            
            // Priority
            priority_level: 'urgent',
            
            // Reporter info
            reported_by_name: 'Demo User',
            reported_by_contact: demoEmail,
            reported_by_organization: 'Interactive Demo',
            
            // Status
            case_status: 'reported'
        };
        
        console.log('Creating demo case:', caseData);
        
        // Submit case
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(caseData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();
        demoCase = result;
        
        console.log('Demo case created:', result);
        
        // Show success and start visualization
        await showCaseCreationSuccess();
        
    } catch (error) {
        console.error('Error creating demo case:', error);
        
        const vizArea = document.getElementById('demo-visualization');
        vizArea.innerHTML = `
            <div class="text-center py-12">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 text-3xl mb-6">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Error Creating Demo Case</h3>
                <p class="text-red-600 mb-4">${error.message}</p>
                <button onclick="location.reload()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Show case creation success and routing visualization
async function showCaseCreationSuccess() {
    const vizArea = document.getElementById('demo-visualization');
    
    // Step 1: Case Created
    vizArea.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <!-- Success Message -->
            <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8 text-center">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 text-4xl mb-6 animate-bounce">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-rocket mr-2"></i>Case Created Successfully!
                </h3>
                <div class="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full text-blue-900 font-semibold text-xl mb-4">
                    <i class="fas fa-hashtag mr-2"></i>
                    ${demoCase.case_number}
                </div>
                <p class="text-gray-600 text-lg mb-6">
                    Your demo case has been created. Watch as the system automatically routes it to the appropriate organizations...
                </p>
                
                <!-- Email Notification Simulation -->
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-200 animate-pulse">
                    <div class="flex items-center justify-center mb-3">
                        <i class="fas fa-envelope text-3xl text-blue-600 mr-3"></i>
                        <span class="text-lg font-semibold text-gray-900">Email Notification Sent</span>
                    </div>
                    <div class="bg-white rounded-lg p-4 text-left">
                        <div class="text-sm text-gray-500 mb-2">To: ${demoEmail}</div>
                        <div class="font-semibold text-gray-900 mb-2">Subject: Case ${demoCase.case_number} - Report Received</div>
                        <div class="text-sm text-gray-700">
                            Your GBV case has been successfully reported and is being processed. 
                            Multiple organizations have been notified and will respond shortly.
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Progress Timeline -->
            <div id="progress-timeline" class="bg-white rounded-2xl shadow-2xl p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                    <i class="fas fa-route mr-2"></i>Real-Time Case Routing
                </h3>
                <div id="timeline-steps" class="space-y-6">
                    <!-- Steps will be added dynamically -->
                </div>
            </div>
        </div>
    `;
    
    await sleep(2000);
    
    // Start showing routing steps
    await showRoutingSteps();
}

// Show routing steps with animation
async function showRoutingSteps() {
    const timelineSteps = document.getElementById('timeline-steps');
    
    // Step 1: System analyzing case
    await addTimelineStep(timelineSteps, {
        icon: 'fa-brain',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
        title: 'AI System Analyzing Case',
        description: 'Identifying case type: Sexual Assault (Rape)',
        status: 'processing'
    });
    
    await sleep(1500);
    
    // Step 2: Querying referral rules
    await addTimelineStep(timelineSteps, {
        icon: 'fa-database',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        title: 'Checking Referral Rules',
        description: 'Found 2 matching rules for sexual violence cases',
        status: 'processing'
    });
    
    await sleep(1500);
    
    // Step 3: Assigning to Police FSU
    await addTimelineStep(timelineSteps, {
        icon: 'fa-shield-alt',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        title: 'Assigned to Police FSU',
        description: 'Priority: HIGH - Criminal investigation required',
        status: 'success',
        details: {
            organization: 'Police Family Support Unit',
            reason: 'Sexual violence requires criminal investigation',
            priority: 'HIGH',
            notification: 'Instant alert sent to FSU dashboard'
        }
    });
    
    await sleep(1500);
    
    // Step 4: Assigning to Rainbo
    await addTimelineStep(timelineSteps, {
        icon: 'fa-hospital',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
        title: 'Assigned to Rainbo Initiative',
        description: 'Priority: URGENT - PEP required within 72 hours',
        status: 'success',
        details: {
            organization: 'Rainbo Initiative',
            reason: 'Sexual violence requires immediate medical attention (PEP within 72 hours)',
            priority: 'URGENT',
            notification: 'Immediate medical response required'
        }
    });
    
    await sleep(1500);
    
    // Step 5: Timeline entry created
    await addTimelineStep(timelineSteps, {
        icon: 'fa-clipboard-list',
        iconColor: 'text-green-600',
        iconBg: 'bg-green-100',
        title: 'Case Timeline Initialized',
        description: 'All updates will be visible to all organizations',
        status: 'success'
    });
    
    await sleep(2000);
    
    // Show final dashboard view
    await showLiveDashboards();
}

// Add timeline step with animation
async function addTimelineStep(container, step) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'flex items-start opacity-0 transform translate-x-4 transition-all duration-500';
    
    const statusIcon = step.status === 'processing' 
        ? '<i class="fas fa-spinner fa-spin text-yellow-600"></i>'
        : step.status === 'success'
        ? '<i class="fas fa-check-circle text-green-600"></i>'
        : '';
    
    stepDiv.innerHTML = `
        <div class="flex-shrink-0 w-16 h-16 rounded-full ${step.iconBg} flex items-center justify-center ${step.iconColor} text-2xl">
            <i class="fas ${step.icon}"></i>
        </div>
        <div class="ml-6 flex-1">
            <div class="flex items-center justify-between mb-2">
                <h4 class="text-lg font-semibold text-gray-900">${step.title}</h4>
                ${statusIcon}
            </div>
            <p class="text-gray-600 mb-2">${step.description}</p>
            ${step.details ? `
                <div class="bg-gray-50 rounded-lg p-4 mt-3">
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span class="font-medium text-gray-700">Organization:</span>
                            <span class="text-gray-900 ml-2">${step.details.organization}</span>
                        </div>
                        <div>
                            <span class="font-medium text-gray-700">Priority:</span>
                            <span class="px-2 py-1 rounded-full text-xs font-semibold ${step.details.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'} ml-2">
                                ${step.details.priority}
                            </span>
                        </div>
                        <div class="col-span-2">
                            <span class="font-medium text-gray-700">Reason:</span>
                            <p class="text-gray-900 mt-1">${step.details.reason}</p>
                        </div>
                        <div class="col-span-2 text-green-600">
                            <i class="fas fa-bell mr-2"></i>${step.details.notification}
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    container.appendChild(stepDiv);
    
    // Trigger animation
    await sleep(50);
    stepDiv.classList.remove('opacity-0', 'translate-x-4');
}

// Show live dashboards with notifications
async function showLiveDashboards() {
    const vizArea = document.getElementById('demo-visualization');
    
    vizArea.innerHTML = `
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-tv mr-2"></i>Live Organization Dashboards
                </h2>
                <p class="text-xl text-gray-600 mb-6">
                    Watch as both organizations receive and respond to the case in real-time
                </p>
                
                <!-- Case Info Badge -->
                <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg">
                    <i class="fas fa-hashtag mr-2"></i>
                    ${demoCase.case_number}
                    <span class="mx-3">•</span>
                    <i class="fas fa-clock mr-2"></i>
                    Just now
                </div>
            </div>
            
            <!-- Split Dashboard View -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Police FSU Dashboard -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fas fa-shield-alt text-2xl mr-3"></i>
                                <div>
                                    <h3 class="font-bold text-lg">Police FSU</h3>
                                    <p class="text-xs opacity-90">Family Support Unit</p>
                                </div>
                            </div>
                            <div class="relative">
                                <i class="fas fa-bell text-2xl"></i>
                                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                                    1
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <!-- Notification -->
                        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4 animate-pulse">
                            <div class="flex items-start">
                                <i class="fas fa-exclamation-circle text-blue-600 text-xl mr-3 mt-1"></i>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 mb-1">🚨 New Case Assignment</h4>
                                    <p class="text-sm text-gray-700 mb-2">
                                        Case ${demoCase.case_number} has been assigned to your unit
                                    </p>
                                    <div class="text-xs text-gray-600">
                                        <span class="font-medium">Priority:</span>
                                        <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full ml-1">HIGH</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Case Card -->
                        <div class="border rounded-lg p-4 bg-gradient-to-br from-white to-blue-50">
                            <div class="flex items-center justify-between mb-3">
                                <span class="font-mono font-bold text-blue-600">${demoCase.case_number}</span>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                    PENDING
                                </span>
                            </div>
                            <div class="text-sm text-gray-700 space-y-1">
                                <div><span class="font-medium">Type:</span> Sexual Assault (Rape)</div>
                                <div><span class="font-medium">District:</span> Western Area Urban</div>
                                <div><span class="font-medium">Status:</span> Awaiting Investigation</div>
                            </div>
                            <button class="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                                <i class="fas fa-check mr-2"></i>Accept Case
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Rainbo Dashboard -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fas fa-hospital text-2xl mr-3"></i>
                                <div>
                                    <h3 class="font-bold text-lg">Rainbo Initiative</h3>
                                    <p class="text-xs opacity-90">Medical Response Center</p>
                                </div>
                            </div>
                            <div class="relative">
                                <i class="fas fa-bell text-2xl"></i>
                                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                                    1
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <!-- Notification -->
                        <div class="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4 animate-pulse">
                            <div class="flex items-start">
                                <i class="fas fa-exclamation-triangle text-purple-600 text-xl mr-3 mt-1"></i>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 mb-1">⚡ URGENT Medical Response</h4>
                                    <p class="text-sm text-gray-700 mb-2">
                                        Case ${demoCase.case_number} requires immediate medical attention
                                    </p>
                                    <div class="text-xs text-gray-600">
                                        <span class="font-medium">Priority:</span>
                                        <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full ml-1">URGENT</span>
                                        <span class="ml-2">• PEP within 72 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Case Card -->
                        <div class="border rounded-lg p-4 bg-gradient-to-br from-white to-purple-50">
                            <div class="flex items-center justify-between mb-3">
                                <span class="font-mono font-bold text-purple-600">${demoCase.case_number}</span>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                    PENDING
                                </span>
                            </div>
                            <div class="text-sm text-gray-700 space-y-1">
                                <div><span class="font-medium">Type:</span> Sexual Assault (Rape)</div>
                                <div><span class="font-medium">District:</span> Western Area Urban</div>
                                <div><span class="font-medium">Services Needed:</span> Medical exam, PEP, Counseling</div>
                            </div>
                            <button class="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                                <i class="fas fa-check mr-2"></i>Accept Case
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="text-center space-y-4">
                <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-check-circle text-green-600 text-3xl mr-3"></i>
                        <h3 class="text-xl font-bold text-gray-900">Demo Complete!</h3>
                    </div>
                    <p class="text-gray-700 mb-4">
                        You've just witnessed how a single GBV report triggers an instant, coordinated response across multiple organizations.
                        Both Police FSU and Rainbo Initiative were automatically notified and can now take action.
                    </p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <button onclick="viewDemoCase()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                            <i class="fas fa-eye mr-2"></i>View Full Case Details
                        </button>
                        <button onclick="loginToOrg('rainbo')" class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                            <i class="fas fa-hospital mr-2"></i>Login as Rainbo Staff
                        </button>
                        <button onclick="loginToOrg('police')" class="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium">
                            <i class="fas fa-shield-alt mr-2"></i>Login as Police FSU
                        </button>
                        <button onclick="location.reload()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                            <i class="fas fa-redo mr-2"></i>Start New Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// View demo case in a new window/modal
function viewDemoCase() {
    if (!demoCase) return;
    
    window.open(`/?tab=overview&highlight=${demoCase.case_number}`, '_blank');
}

// Login to organization portal
function loginToOrg(orgType) {
    const credentials = {
        'rainbo': { username: 'rainbo.freetown', password: 'rainbo2024' },
        'police': { username: 'fsu.freetown', password: 'fsu2024' }
    };
    
    const cred = credentials[orgType];
    
    // Store credentials for auto-login
    localStorage.setItem('demo_auto_login', JSON.stringify(cred));
    localStorage.setItem('demo_case_number', demoCase.case_number);
    
    // Redirect to login page
    window.location.href = `/?tab=${orgType}`;
}

// Utility function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Demo Flow ready');
