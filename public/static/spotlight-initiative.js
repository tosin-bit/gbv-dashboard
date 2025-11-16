/**
 * Spotlight Initiative Hub
 * Consolidates SDG Dashboard, Donor Reports, and Public Dashboard
 * UN-EU Partnership for Eliminating Violence Against Women & Girls
 */

function loadSpotlightInitiative(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Main Header -->
            <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-lg shadow-xl p-8">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="flex items-center mb-3">
                            <i class="fas fa-sun text-5xl mr-4 opacity-90"></i>
                            <div>
                                <h1 class="text-4xl font-bold mb-1">UN Spotlight Initiative</h1>
                                <p class="text-xl text-purple-100">Sierra Leone - Eliminating Violence Against Women & Girls</p>
                            </div>
                        </div>
                        <p class="text-purple-100 max-w-3xl mt-4">
                            A multi-year partnership between the European Union and United Nations to eliminate all forms 
                            of violence against women and girls. This hub provides tools for SDG tracking, donor reporting, 
                            and public transparency.
                        </p>
                        <div class="flex items-center space-x-4 mt-4">
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                <i class="fas fa-flag-checkered mr-2"></i>EU-UN Partnership
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                <i class="fas fa-bullseye mr-2"></i>SDG 5 & 16 Aligned
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                <i class="fas fa-globe mr-2"></i>International Standards
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phase 1 Label -->
            <div class="flex items-center mb-2">
                <h2 class="text-2xl font-bold text-gray-800 mr-3">Phase 1: Data & Transparency</h2>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    <i class="fas fa-check-circle mr-1"></i>Completed
                </span>
            </div>

            <!-- Phase 1 Navigation Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- SDG Alignment Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('sdg-dashboard')">
                    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-bullseye text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Dashboard</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">SDG Alignment</h3>
                        <p class="text-blue-100 text-sm">Track UN Sustainable Development Goals 5 & 16</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>SDG 5.2.1, 5.2.2 & 16.2.3 indicators</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Progress timeline 2020-2030</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>District-level performance</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>CEDAW & Spotlight compliance</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold group-hover:bg-blue-700">
                            <i class="fas fa-arrow-right mr-2"></i>Open SDG Dashboard
                        </button>
                    </div>
                </div>

                <!-- Donor Reports Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('donor-reports')">
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-file-invoice text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Generator</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Donor Reports</h3>
                        <p class="text-indigo-100 text-sm">Auto-generate professional quarterly reports</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>EU, UN, World Bank templates</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Executive summary & metrics</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Budget utilization tracking</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>One-click PDF export</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold group-hover:bg-indigo-700">
                            <i class="fas fa-arrow-right mr-2"></i>Generate Reports
                        </button>
                    </div>
                </div>

                <!-- Public Dashboard Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('public-dashboard')">
                    <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-eye text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Public</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Public Dashboard</h3>
                        <p class="text-green-100 text-sm">Anonymized transparency for accountability</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Real-time statistics (privacy protected)</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>National trends & district heatmap</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Service provider coverage</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Shareable public link</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold group-hover:bg-green-700">
                            <i class="fas fa-arrow-right mr-2"></i>View Public Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <!-- Phase 2 Label -->
            <div class="flex items-center mb-2 mt-8">
                <h2 class="text-2xl font-bold text-gray-800 mr-3">Phase 2: Operational Excellence</h2>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold animate-pulse">
                    <i class="fas fa-star mr-1"></i>New
                </span>
            </div>

            <!-- Phase 2 Navigation Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Survivor Outcomes Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('survivor-outcomes')">
                    <div class="bg-gradient-to-r from-teal-500 to-green-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-heartbeat text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Phase 2</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Survivor Outcomes</h3>
                        <p class="text-teal-100 text-sm">Track real wellbeing beyond case numbers</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>30/90/180-day follow-up tracking</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Safety, health, justice outcomes</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>International benchmarking</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Impact stories (anonymized)</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold group-hover:bg-teal-700">
                            <i class="fas fa-arrow-right mr-2"></i>View Outcomes
                        </button>
                    </div>
                </div>

                <!-- Case Workflow Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('case-workflow')">
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-project-diagram text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Phase 2</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Case Workflow</h3>
                        <p class="text-indigo-100 text-sm">Multi-agency digital coordination</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Ministry → Rainbo → Police workflow</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Real-time referral tracking</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>6.2 hour avg response time</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>94% coordination score</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold group-hover:bg-indigo-700">
                            <i class="fas fa-arrow-right mr-2"></i>Manage Workflow
                        </button>
                    </div>
                </div>

                <!-- Alert System Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" 
                     onclick="showSpotlightSection('alert-system')">
                    <div class="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-exclamation-triangle text-5xl opacity-80"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Phase 2</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Alert System</h3>
                        <p class="text-red-100 text-sm">Proactive monitoring & early warning</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Real-time critical alerts</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>District spike detection</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Service gap warnings</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Automated notifications</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold group-hover:bg-red-700">
                            <i class="fas fa-arrow-right mr-2"></i>View Alerts
                        </button>
                    </div>
                </div>
            </div>

            <!-- About Spotlight Initiative -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-info-circle mr-3"></i>About the UN Spotlight Initiative
                </h3>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-3">Programme Overview</h4>
                        <p class="text-gray-700 text-sm mb-4">
                            The Spotlight Initiative is a global, multi-year partnership between the European Union and 
                            the United Nations to eliminate all forms of violence against women and girls (VAWG). In Sierra Leone, 
                            the initiative focuses on sexual and gender-based violence, harmful practices, and strengthening 
                            national response systems.
                        </p>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-calendar text-purple-600 mr-2"></i>
                                <span class="text-gray-700"><strong>Launch:</strong> 2019</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-money-bill-wave text-purple-600 mr-2"></i>
                                <span class="text-gray-700"><strong>Budget:</strong> $4.1 Million (Sierra Leone)</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-users text-purple-600 mr-2"></i>
                                <span class="text-gray-700"><strong>Partners:</strong> EU, UN Women, UNFPA, UNDP, UNICEF</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-3">Six Pillars of Action</h4>
                        <div class="space-y-2">
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                                <span class="text-sm text-gray-700"><strong>Legislative Frameworks:</strong> Strengthening laws and policies</span>
                            </div>
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                                <span class="text-sm text-gray-700"><strong>Institutions:</strong> Building capacity of service providers</span>
                            </div>
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                                <span class="text-sm text-gray-700"><strong>Prevention:</strong> Community awareness and education</span>
                            </div>
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                                <span class="text-sm text-gray-700"><strong>Essential Services:</strong> Access to quality support</span>
                            </div>
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">5</span>
                                <span class="text-sm text-gray-700"><strong>Data & Monitoring:</strong> Evidence-based decision making</span>
                            </div>
                            <div class="flex items-start p-2 bg-purple-50 rounded">
                                <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">6</span>
                                <span class="text-sm text-gray-700"><strong>Women's Movement:</strong> Supporting civil society organizations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
                    <div class="text-4xl font-bold mb-2">2,871</div>
                    <div class="text-sm text-blue-100">Cases Tracked (2025)</div>
                </div>
                <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
                    <div class="text-4xl font-bold mb-2">83.7%</div>
                    <div class="text-sm text-green-100">Service Coverage</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
                    <div class="text-4xl font-bold mb-2">16</div>
                    <div class="text-sm text-purple-100">Districts Covered</div>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 text-center">
                    <div class="text-4xl font-bold mb-2"><18h</div>
                    <div class="text-sm text-orange-100">Avg Response Time</div>
                </div>
            </div>
        </div>
    `;
}

function showSpotlightSection(sectionType) {
    console.log(`🎯 Navigating to: ${sectionType}`);
    
    // Get the target section element
    const targetSection = document.getElementById('spotlight-initiative-section');
    if (!targetSection) {
        console.error('Spotlight Initiative section not found');
        return;
    }
    
    // Load the appropriate dashboard
    switch(sectionType) {
        // Phase 1 Features
        case 'sdg-dashboard':
            if (typeof loadSDGDashboard === 'function') {
                loadSDGDashboard(targetSection);
            }
            break;
        case 'donor-reports':
            if (typeof loadDonorReports === 'function') {
                loadDonorReports(targetSection);
            }
            break;
        case 'public-dashboard':
            if (typeof loadPublicDashboard === 'function') {
                loadPublicDashboard(targetSection);
            }
            break;
        // Phase 2 Features
        case 'survivor-outcomes':
            if (typeof loadSurvivorOutcomes === 'function') {
                loadSurvivorOutcomes(targetSection);
            }
            break;
        case 'case-workflow':
            if (typeof loadCaseWorkflow === 'function') {
                loadCaseWorkflow(targetSection);
            }
            break;
        case 'alert-system':
            if (typeof loadAlertSystem === 'function') {
                loadAlertSystem(targetSection);
            }
            break;
    }
    
    // Add back button
    setTimeout(() => {
        const backButton = document.createElement('div');
        backButton.className = 'mb-4';
        backButton.innerHTML = `
            <button onclick="loadSpotlightInitiative(document.getElementById('spotlight-initiative-section'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Spotlight Initiative Hub
            </button>
        `;
        targetSection.insertBefore(backButton, targetSection.firstChild);
    }, 100);
}

// Export functions
window.loadSpotlightInitiative = loadSpotlightInitiative;
window.showSpotlightSection = showSpotlightSection;
