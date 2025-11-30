/**
 * Survivor Portal - Safe, Compassionate Support for GBV Survivors
 * Trauma-informed design with safety and privacy as top priorities
 */

function loadSurvivorPortal(section) {
    // Check if user is already logged in
    const survivorSession = sessionStorage.getItem('survivor_session');
    if (survivorSession) {
        loadSurvivorDashboard(section);
        return;
    }
    
    // Show login screen
    section.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="p-8 text-center" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #32cd32 100%);">
                    <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <i class="fas fa-heart text-5xl" style="color: #1e3a8a;"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Survivor Support Portal</h2>
                    <p class="text-white text-opacity-90">Safe, Confidential Access to Your Case</p>
                </div>

                <!-- Login Options -->
                <div class="p-8">
                    <div class="space-y-6">
                        <!-- Option 1: Access with Case Number -->
                        <div class="border-2 rounded-xl p-6" style="border-color: #1e90ff;">
                            <h3 class="text-lg font-bold mb-3" style="color: #1e3a8a;">
                                <i class="fas fa-file-medical mr-2"></i>Access My Case
                            </h3>
                            <p class="text-sm text-gray-600 mb-4">
                                If you've already reported an incident, enter your case number to track progress and access support
                            </p>
                            <form id="survivor-case-login-form" onsubmit="handleSurvivorCaseLogin(event)">
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-hashtag mr-2"></i>Case Number
                                        </label>
                                        <input type="text" name="caseNumber" required
                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                               placeholder="e.g., GBV-2025-0001">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-key mr-2"></i>Security PIN (Last 4 digits of phone)
                                        </label>
                                        <input type="password" name="pin" required maxlength="4" pattern="[0-9]{4}"
                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                               placeholder="Enter 4-digit PIN">
                                        <p class="text-xs text-gray-500 mt-1">This is the last 4 digits of the phone number you provided when reporting</p>
                                    </div>
                                    <button type="submit"
                                            class="w-full py-3 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                                            style="background-color: #1e90ff;">
                                        <i class="fas fa-sign-in-alt mr-2"></i>Access My Case
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Divider -->
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-4 bg-white text-gray-500">OR</span>
                            </div>
                        </div>

                        <!-- Option 2: Report New Incident -->
                        <div class="border-2 rounded-xl p-6" style="border-color: #32cd32;">
                            <h3 class="text-lg font-bold mb-3" style="color: #1e3a8a;">
                                <i class="fas fa-file-alt mr-2"></i>Report New Incident
                            </h3>
                            <p class="text-sm text-gray-600 mb-4">
                                First time reporting? Start here to file a confidential report and get connected to support services
                            </p>
                            <button onclick="showSurvivorCaseForm()"
                                    class="w-full py-3 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                                    style="background-color: #32cd32;">
                                <i class="fas fa-plus-circle mr-2"></i>Start New Report
                            </button>
                        </div>
                    </div>

                    <!-- Emergency Help -->
                    <div class="mt-6 pt-6 border-t">
                        <div class="text-center p-4 rounded-lg" style="background-color: rgba(239, 68, 68, 0.05);">
                            <p class="text-sm font-semibold mb-2" style="color: #dc2626;">
                                <i class="fas fa-exclamation-triangle mr-2"></i>Need Help Now?
                            </p>
                            <div class="flex items-center justify-center space-x-4 text-sm">
                                <a href="tel:116" class="font-bold" style="color: #1e90ff;">
                                    <i class="fas fa-phone mr-1"></i>Call 116
                                </a>
                                <span class="text-gray-400">|</span>
                                <button onclick="showEmergencySOS()" class="font-bold" style="color: #ef4444;">
                                    <i class="fas fa-ambulance mr-1"></i>Emergency SOS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Features Info -->
                <div class="bg-gray-50 p-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">What You Can Do:</h3>
                    <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>Track case progress</div>
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>View appointments</div>
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>Message your counselor</div>
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>Access resources</div>
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>Find help near you</div>
                        <div><i class="fas fa-check-circle mr-2" style="color: #32cd32;"></i>Know your rights</div>
                    </div>
                    <div class="mt-4 text-xs text-center text-gray-500">
                        <i class="fas fa-lock mr-1"></i>All information is confidential and secure
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load survivor dashboard after successful login
function loadSurvivorDashboard(section) {
    const sessionData = JSON.parse(sessionStorage.getItem('survivor_session') || '{}');
    
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Warm Welcome Header -->
            <div class="text-white p-8 rounded-xl shadow-lg" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #32cd32 100%);">
                <div class="max-w-4xl mx-auto">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-heart text-5xl opacity-90 mr-4"></i>
                            <div>
                                <h1 class="text-3xl font-bold mb-1">Welcome Back</h1>
                                <p class="text-blue-50">Case: ${sessionData.caseNumber || 'Not Available'}</p>
                            </div>
                        </div>
                        <button onclick="handleSurvivorLogout()" 
                                class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-lg font-semibold mb-1">24/7 Emergency Hotline (Free & Confidential)</p>
                        <a href="tel:116" class="text-2xl font-bold hover:underline">
                            <i class="fas fa-phone-alt mr-2"></i>116
                        </a>
                        <span class="mx-3">|</span>
                        <a href="tel:999" class="text-2xl font-bold hover:underline">
                            <i class="fas fa-ambulance mr-2"></i>999
                        </a>
                    </div>
                </div>
            </div>

            <!-- Your Journey Section -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                    <i class="fas fa-route mr-3"></i>Your Support Journey
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <!-- Step 1: Report -->
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(30, 144, 255, 0.1);">
                            <i class="fas fa-file-medical text-3xl" style="color: #1e90ff;"></i>
                        </div>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">1. Report Incident</h3>
                        <p class="text-sm text-gray-600">Share your story safely and confidentially</p>
                    </div>
                    
                    <!-- Step 2: Connect -->
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(50, 205, 50, 0.1);">
                            <i class="fas fa-hands-helping text-3xl" style="color: #32cd32;"></i>
                        </div>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">2. Get Connected</h3>
                        <p class="text-sm text-gray-600">We link you to local support services</p>
                    </div>
                    
                    <!-- Step 3: Support -->
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(0, 128, 0, 0.1);">
                            <i class="fas fa-heartbeat text-3xl" style="color: #008000;"></i>
                        </div>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">3. Receive Care</h3>
                        <p class="text-sm text-gray-600">Medical, counseling, and legal support</p>
                    </div>
                    
                    <!-- Step 4: Recovery -->
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(255, 215, 0, 0.1);">
                            <i class="fas fa-sun text-3xl" style="color: #ffd700;"></i>
                        </div>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">4. Move Forward</h3>
                        <p class="text-sm text-gray-600">Long-term healing and empowerment</p>
                    </div>
                </div>
            </div>

            <!-- Emergency Alert Box -->
            <div class="border-l-4 p-6 rounded-lg shadow-md" style="background-color: rgba(239, 68, 68, 0.05); border-color: #ef4444;">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-3xl" style="color: #ef4444;"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-xl font-bold mb-2" style="color: #dc2626;">
                            Are You in Immediate Danger?
                        </h3>
                        <p class="mb-4" style="color: #991b1b;">
                            If you need urgent help right now, call emergency services or use the button below.
                        </p>
                        <button onclick="showEmergencySOS()" 
                                class="px-8 py-4 text-white rounded-lg text-xl font-bold transition-all transform hover:scale-105 shadow-lg animate-pulse"
                                style="background-color: #ef4444;"
                                onmouseover="this.style.backgroundColor='#dc2626'"
                                onmouseout="this.style.backgroundColor='#ef4444'">
                            <i class="fas fa-exclamation-circle mr-3"></i>GET HELP NOW
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Actions Section -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                    <i class="fas fa-tasks mr-3"></i>What Would You Like To Do?
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Report New Incident -->
                    <div class="border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer" 
                         style="border-color: #1e90ff;"
                         onclick="showSurvivorCaseForm()">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgba(30, 144, 255, 0.1);">
                                    <i class="fas fa-file-medical text-2xl" style="color: #1e90ff;"></i>
                                </div>
                            </div>
                            <div class="ml-4 flex-1">
                                <h3 class="text-xl font-bold mb-2" style="color: #1e3a8a;">Report a New Incident</h3>
                                <p class="text-gray-600 mb-4">File a confidential report and get connected to support services</p>
                                <ul class="space-y-2 text-sm text-gray-700 mb-4">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>Confidential and secure</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>Share only what you're comfortable with</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>Get a case number to track progress</span>
                                    </li>
                                </ul>
                                <button class="w-full px-4 py-3 text-white rounded-lg font-semibold transition-colors" 
                                        style="background-color: #1e90ff;"
                                        onmouseover="this.style.backgroundColor='#1e3a8a'"
                                        onmouseout="this.style.backgroundColor='#1e90ff'">
                                    <i class="fas fa-arrow-right mr-2"></i>Start New Report
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Check Case Status -->
                    <div class="border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer" 
                         style="border-color: #32cd32;"
                         onclick="showCaseStatus()">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgba(50, 205, 50, 0.1);">
                                    <i class="fas fa-clipboard-list text-2xl" style="color: #32cd32;"></i>
                                </div>
                            </div>
                            <div class="ml-4 flex-1">
                                <h3 class="text-xl font-bold mb-2" style="color: #1e3a8a;">Check My Case Status</h3>
                                <p class="text-gray-600 mb-4">Track your case progress and view updates</p>
                                <ul class="space-y-2 text-sm text-gray-700 mb-4">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>View case timeline and updates</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>See upcoming appointments</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                        <span>Secure access with case number</span>
                                    </li>
                                </ul>
                                <button class="w-full px-4 py-3 text-white rounded-lg font-semibold transition-colors" 
                                        style="background-color: #32cd32;"
                                        onmouseover="this.style.backgroundColor='#008000'"
                                        onmouseout="this.style.backgroundColor='#32cd32'">
                                    <i class="fas fa-arrow-right mr-2"></i>Track My Case
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Support Services Grid -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                    <i class="fas fa-hands-helping mr-3"></i>Additional Support Services
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Find Help Near Me -->
                    <div class="border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                         onclick="showServiceFinder()">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: rgba(50, 205, 50, 0.1);">
                            <i class="fas fa-map-marked-alt text-2xl" style="color: #32cd32;"></i>
                        </div>
                        <h3 class="text-lg font-bold mb-2" style="color: #1e3a8a;">Find Help Near Me</h3>
                        <p class="text-sm text-gray-600 mb-4">Locate nearby Rainbo Centers, Police FSU, hospitals, and safe houses</p>
                        <button class="w-full px-4 py-2 text-white rounded-lg font-semibold transition-colors text-sm" 
                                style="background-color: #32cd32;"
                                onmouseover="this.style.backgroundColor='#008000'"
                                onmouseout="this.style.backgroundColor='#32cd32'">
                            <i class="fas fa-location-arrow mr-2"></i>Find Services
                        </button>
                    </div>

                    <!-- Know Your Rights -->
                    <div class="border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                         onclick="showKnowYourRights()">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: rgba(255, 215, 0, 0.1);">
                            <i class="fas fa-balance-scale text-2xl" style="color: #ffd700;"></i>
                        </div>
                        <h3 class="text-lg font-bold mb-2" style="color: #1e3a8a;">Know Your Rights</h3>
                        <p class="text-sm text-gray-600 mb-4">Legal information, protection orders, and court process explained</p>
                        <button class="w-full px-4 py-2 text-white rounded-lg font-semibold transition-colors text-sm" 
                                style="background-color: #ffd700; color: #1e3a8a;"
                                onmouseover="this.style.backgroundColor='#1e90ff'; this.style.color='white'"
                                onmouseout="this.style.backgroundColor='#ffd700'; this.style.color='#1e3a8a'">
                            <i class="fas fa-book mr-2"></i>Learn More
                        </button>
                    </div>

                    <!-- Safety Planning -->
                    <div class="border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                         onclick="showSafetyPlanning()">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: rgba(30, 58, 138, 0.1);">
                            <i class="fas fa-shield-alt text-2xl" style="color: #1e3a8a;"></i>
                        </div>
                        <h3 class="text-lg font-bold mb-2" style="color: #1e3a8a;">Safety Planning</h3>
                        <p class="text-sm text-gray-600 mb-4">Create emergency plans, safe contacts, and escape strategies</p>
                        <button class="w-full px-4 py-2 text-white rounded-lg font-semibold transition-colors text-sm" 
                                style="background-color: #1e3a8a;"
                                onmouseover="this.style.backgroundColor='#1e90ff'"
                                onmouseout="this.style.backgroundColor='#1e3a8a'">
                            <i class="fas fa-clipboard-list mr-2"></i>Create Plan
                        </button>
                    </div>
                </div>
            </div>

            <!-- Resources & Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Counseling Resources -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #1e90ff 0%, #32cd32 100%);">
                        <div class="flex items-center">
                            <i class="fas fa-comments text-4xl opacity-90 mr-4"></i>
                            <div>
                                <h3 class="text-xl font-bold">Counseling & Support Groups</h3>
                                <p class="text-sm text-blue-50">Professional trauma-informed counseling</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>One-on-one counseling sessions</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Support groups for survivors</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Family counseling available</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Available in multiple languages</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Legal Aid -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #ffd700 0%, #1e3a8a 100%);">
                        <div class="flex items-center">
                            <i class="fas fa-gavel text-4xl opacity-90 mr-4"></i>
                            <div>
                                <h3 class="text-xl font-bold">Legal Aid & Court Support</h3>
                                <p class="text-sm" style="color: rgba(255, 255, 255, 0.9);">Free legal assistance and advocacy</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Free legal consultation</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Court accompaniment services</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Protection order assistance</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle mr-2 mt-0.5" style="color: #32cd32;"></i>
                                <span>Child custody & divorce support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                    <i class="fas fa-phone-volume mr-3"></i>Emergency Contacts
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 rounded-lg" style="background-color: rgba(30, 144, 255, 0.05);">
                        <i class="fas fa-phone-alt text-3xl mb-3" style="color: #1e90ff;"></i>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">116 Hotline</h3>
                        <p class="text-sm text-gray-600 mb-2">24/7 GBV Emergency</p>
                        <a href="tel:116" class="text-2xl font-bold" style="color: #1e90ff;">116</a>
                    </div>
                    <div class="text-center p-4 rounded-lg" style="background-color: rgba(50, 205, 50, 0.05);">
                        <i class="fas fa-ambulance text-3xl mb-3" style="color: #32cd32;"></i>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">Medical Emergency</h3>
                        <p class="text-sm text-gray-600 mb-2">Ambulance & Hospital</p>
                        <a href="tel:999" class="text-2xl font-bold" style="color: #32cd32;">999</a>
                    </div>
                    <div class="text-center p-4 rounded-lg" style="background-color: rgba(255, 215, 0, 0.05);">
                        <i class="fas fa-shield-alt text-3xl mb-3" style="color: #ffd700;"></i>
                        <h3 class="font-bold mb-2" style="color: #1e3a8a;">Police FSU</h3>
                        <p class="text-sm text-gray-600 mb-2">Family Support Units</p>
                        <a href="tel:019" class="text-2xl font-bold" style="color: #ffd700;">019</a>
                    </div>
                </div>
            </div>
                        <button class="w-full px-4 py-3 text-white rounded-lg transition-colors font-semibold" 
                                style="background-color: #1e90ff;" 
                                onmouseover="this.style.backgroundColor='#0ea5e9'" 
                                onmouseout="this.style.backgroundColor='#1e90ff'">
                            <i class="fas fa-arrow-right mr-2"></i>Check Status
                        </button>
                    </div>
                </div>

                <!-- Healing Resources -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                     onclick="showHealingResources()">
                    <div class="p-6 text-white" style="background: linear-gradient(135deg, #32cd32, #32cd32);">
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
                                style="background-color: #32cd32;" 
                                onmouseover="this.style.backgroundColor='#32cd32'" 
                                onmouseout="this.style.backgroundColor='#32cd32'">
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

            <!-- Affirmation Message -->
            <div class="p-6 rounded-xl text-center shadow-lg" style="background: linear-gradient(135deg, #32cd32 0%, #1e90ff 100%);">
                <p class="text-2xl font-bold text-white mb-2">
                    <i class="fas fa-heart mr-2" style="color: #ffd700;"></i>
                    "You are brave. You are strong. You deserve safety and peace."
                    <i class="fas fa-heart ml-2" style="color: #ffd700;"></i>
                </p>
                <p class="text-white italic">Remember: What happened is not your fault. Help is available.</p>
            </div>
        </div>
    `;
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

function showSurvivorCaseForm() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadAnonymousReport === 'function') {
        // Use the same anonymous report form - it's designed for survivors
        loadAnonymousReport(section);
    } else {
        console.log('Survivor case form will be loaded');
    }
}

function showAnonymousReport() {
    showSurvivorCaseForm();
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

// Login handler for survivor case access
function handleSurvivorCaseLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const caseNumber = form.caseNumber.value.trim().toUpperCase();
    const pin = form.pin.value;
    
    // Validation
    if (!caseNumber || !pin) {
        alert('Please enter both case number and PIN');
        return;
    }
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        alert('PIN must be exactly 4 digits');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Verifying...';
    submitBtn.disabled = true;
    
    // Simulate authentication (in production, this would call /api/auth/survivor)
    setTimeout(() => {
        // For demo purposes, accept any case number with format GBV-YYYY-NNNN
        const casePattern = /^GBV-\d{4}-\d{4}$/;
        
        if (casePattern.test(caseNumber)) {
            // Create session
            const sessionData = {
                caseNumber: caseNumber,
                loginTime: new Date().toISOString(),
                accessLevel: 'survivor'
            };
            
            sessionStorage.setItem('survivor_session', JSON.stringify(sessionData));
            
            // Reload portal to show dashboard
            const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
            loadSurvivorPortal(section);
            
            console.log('✅ Survivor logged in:', caseNumber);
        } else {
            alert('Invalid case number format. Please use format: GBV-YYYY-NNNN\\n\\nExample: GBV-2025-0001');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

// Logout handler
function handleSurvivorLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('survivor_session');
        
        // Reload portal to show login screen
        const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
        loadSurvivorPortal(section);
        
        console.log('✅ Survivor logged out');
    }
}

// Export functions
window.loadSurvivorPortal = loadSurvivorPortal;
window.loadSurvivorDashboard = loadSurvivorDashboard;
window.handleSurvivorCaseLogin = handleSurvivorCaseLogin;
window.handleSurvivorLogout = handleSurvivorLogout;
window.showSurvivorCaseForm = showSurvivorCaseForm;
window.showEmergencySOS = showEmergencySOS;
window.showAnonymousReport = showAnonymousReport;
window.showServiceFinder = showServiceFinder;
window.showSafetyPlanning = showSafetyPlanning;
window.showKnowYourRights = showKnowYourRights;
window.showCaseStatus = showCaseStatus;
window.showHealingResources = showHealingResources;
