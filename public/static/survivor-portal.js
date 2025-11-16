/**
 * Survivor Portal - Safe, Compassionate Support for GBV Survivors
 * Trauma-informed design with safety and privacy as top priorities
 */

function loadSurvivorPortal(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Quick Exit Button (Always Visible) -->
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" 
                        class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
                        title="Quick Exit - Escape to Safe Page">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>

            <!-- Warm Welcome Header -->
            <div class="text-white p-8 rounded-xl shadow-lg" style="background: linear-gradient(135deg, #4ade80, #22d3ee, #3b82f6);">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="mb-4">
                        <i class="fas fa-heart text-6xl opacity-90"></i>
                    </div>
                    <h1 class="text-4xl font-bold mb-3">You Are Not Alone</h1>
                    <p class="text-xl text-blue-50 mb-4">
                        This is a safe space. We believe you. We support you. Help is available 24/7.
                    </p>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
                        <p class="text-lg font-semibold mb-1">Emergency Hotline (Free & Confidential)</p>
                        <a href="tel:116" class="text-3xl font-bold hover:underline">
                            <i class="fas fa-phone-alt mr-2"></i>116
                        </a>
                        <p class="text-sm text-blue-50 mt-1">Available 24/7 in Krio, English, Mende & Temne</p>
                    </div>
                </div>
            </div>

            <!-- Emergency Alert Box -->
            <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-md">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-xl font-bold text-red-800 mb-2">
                            Are You in Immediate Danger?
                        </h3>
                        <p class="text-red-700 mb-4">
                            If you are in immediate danger or need urgent help right now, please use the emergency button below.
                        </p>
                        <button onclick="showEmergencySOS()" 
                                class="px-8 py-4 bg-red-600 text-white rounded-lg text-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg animate-pulse">
                            <i class="fas fa-exclamation-circle mr-3"></i>GET HELP NOW
                        </button>
                    </div>
                </div>
            </div>

            <!-- Service Cards - Primary Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Anonymous Reporting -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showAnonymousReport()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #3b82f6, #06b6d4);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-file-alt text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Safe</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Report Incident</h3>
                        <p class="text-blue-50 text-sm">Anonymous & confidential reporting</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>No login required</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Stay anonymous if you choose</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Get a case number to track</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Voice recording option</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #3b82f6;" 
                                onmouseover="this.style.backgroundColor='#06b6d4'" 
                                onmouseout="this.style.backgroundColor='#3b82f6'">
                            <i class="fas fa-arrow-right mr-2"></i>Start Report
                        </button>
                    </div>
                </div>

                <!-- Find Help Near Me -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showServiceFinder()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #10b981, #14b8a6);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-map-marked-alt text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">GPS</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Find Help Near Me</h3>
                        <p class="text-green-50 text-sm">Locate nearby support services</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Rainbo Centers & One-Stop Centers</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Police Family Support Units</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Safe houses & counseling</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Walking directions provided</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #10b981;" 
                                onmouseover="this.style.backgroundColor='#14b8a6'" 
                                onmouseout="this.style.backgroundColor='#10b981'">
                            <i class="fas fa-arrow-right mr-2"></i>Find Services
                        </button>
                    </div>
                </div>

                <!-- Safety Planning -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showSafetyPlanning()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #8b5cf6, #a855f7);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-shield-alt text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Private</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Safety Planning</h3>
                        <p class="text-purple-50 text-sm">Create your personal safety plan</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Emergency escape plan</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Safe contacts & code words</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Emergency bag checklist</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Stored privately on your device</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #8b5cf6;" 
                                onmouseover="this.style.backgroundColor='#a855f7'" 
                                onmouseout="this.style.backgroundColor='#8b5cf6'">
                            <i class="fas fa-arrow-right mr-2"></i>Create Plan
                        </button>
                    </div>
                </div>

                <!-- Know Your Rights -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showKnowYourRights()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #f59e0b, #f97316);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-balance-scale text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Legal</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Know Your Rights</h3>
                        <p class="text-orange-50 text-sm">Legal information & support</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Your legal rights explained</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>How to get protection orders</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Court process explained</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Available in multiple languages</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #f59e0b;" 
                                onmouseover="this.style.backgroundColor='#f97316'" 
                                onmouseout="this.style.backgroundColor='#f59e0b'">
                            <i class="fas fa-arrow-right mr-2"></i>Learn More
                        </button>
                    </div>
                </div>

                <!-- My Case Status -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showCaseStatus()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #06b6d4, #0ea5e9);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-clipboard-check text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Secure</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">My Case Status</h3>
                        <p class="text-cyan-50 text-sm">Track your case progress</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>View case updates</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Upcoming appointments</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Access your documents</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>PIN protected access</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #06b6d4;" 
                                onmouseover="this.style.backgroundColor='#0ea5e9'" 
                                onmouseout="this.style.backgroundColor='#06b6d4'">
                            <i class="fas fa-arrow-right mr-2"></i>Check Status
                        </button>
                    </div>
                </div>

                <!-- Healing Resources -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showHealingResources()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #ec4899, #f472b6);">
                        <div class="flex items-center justify-between mb-3">
                            <i class="fas fa-spa text-5xl opacity-90"></i>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Wellness</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Healing Resources</h3>
                        <p class="text-pink-50 text-sm">Self-care & coping tools</p>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-2 text-sm text-gray-700 mb-4">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Breathing exercises</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Self-care tips</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Positive affirmations</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Hope & success stories</span>
                            </li>
                        </ul>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #ec4899;" 
                                onmouseover="this.style.backgroundColor='#f472b6'" 
                                onmouseout="this.style.backgroundColor='#ec4899'">
                            <i class="fas fa-arrow-right mr-2"></i>Explore Resources
                        </button>
                    </div>
                </div>
            </div>

            <!-- Important Information -->
            <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-blue-600 text-3xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-bold text-blue-800 mb-2">Your Safety & Privacy</h3>
                        <ul class="space-y-2 text-sm text-blue-700">
                            <li><i class="fas fa-lock mr-2"></i><strong>Private & Secure:</strong> Your information is protected and confidential</li>
                            <li><i class="fas fa-user-secret mr-2"></i><strong>Anonymous Options:</strong> You can get help without revealing your identity</li>
                            <li><i class="fas fa-clock mr-2"></i><strong>24/7 Support:</strong> Help is available any time, day or night</li>
                            <li><i class="fas fa-heart mr-2"></i><strong>No Judgment:</strong> You will be treated with respect and compassion</li>
                            <li><i class="fas fa-language mr-2"></i><strong>Your Language:</strong> Services available in Krio, English, Mende & Temne</li>
                        </ul>
                        <div class="mt-4 p-4 bg-white rounded-lg">
                            <p class="text-sm font-semibold text-gray-800 mb-2">
                                <i class="fas fa-times-circle text-red-600 mr-2"></i>
                                Use the "Quick Exit" button at the top right if you need to leave this page quickly
                            </p>
                            <p class="text-xs text-gray-600">
                                It will immediately take you to a safe website (weather page)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Affirmation of the Day -->
            <div class="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl text-center">
                <p class="text-2xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-star text-yellow-500 mr-2"></i>
                    "You are brave. You are strong. You deserve safety and peace."
                    <i class="fas fa-star text-yellow-500 ml-2"></i>
                </p>
                <p class="text-sm text-gray-600 italic">Remember: What happened is not your fault</p>
            </div>
        </div>
    `;
}

// Quick Exit function - immediately leaves to safe page
function quickExit() {
    // Clear any form data
    sessionStorage.clear();
    
    // Redirect to weather website (appears innocent)
    window.location.replace('https://weather.com');
}

// Navigation functions for each feature
function showEmergencySOS() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadEmergencySOS === 'function') {
        loadEmergencySOS(section);
    } else {
        alert('Emergency feature loading... For immediate help, call 116');
        window.location.href = 'tel:116';
    }
}

function showAnonymousReport() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadAnonymousReport === 'function') {
        loadAnonymousReport(section);
    } else {
        console.log('Anonymous report feature will be loaded');
    }
}

function showServiceFinder() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadServiceFinder === 'function') {
        loadServiceFinder(section);
    } else {
        console.log('Service finder feature will be loaded');
    }
}

function showSafetyPlanning() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadSafetyPlanning === 'function') {
        loadSafetyPlanning(section);
    } else {
        console.log('Safety planning feature will be loaded');
    }
}

function showKnowYourRights() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadKnowYourRights === 'function') {
        loadKnowYourRights(section);
    } else {
        console.log('Know your rights feature will be loaded');
    }
}

function showCaseStatus() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadCaseStatus === 'function') {
        loadCaseStatus(section);
    } else {
        console.log('Case status feature will be loaded');
    }
}

function showHealingResources() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadHealingResources === 'function') {
        loadHealingResources(section);
    } else {
        console.log('Healing resources feature will be loaded');
    }
}

// Export functions
window.loadSurvivorPortal = loadSurvivorPortal;
window.quickExit = quickExit;
window.showEmergencySOS = showEmergencySOS;
window.showAnonymousReport = showAnonymousReport;
window.showServiceFinder = showServiceFinder;
window.showSafetyPlanning = showSafetyPlanning;
window.showKnowYourRights = showKnowYourRights;
window.showCaseStatus = showCaseStatus;
window.showHealingResources = showHealingResources;
