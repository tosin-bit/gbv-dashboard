/**
 * Safety Planning - Create Personalized Safety Plans for Survivors
 * Helps survivors prepare for emergencies and plan their safety
 */

function loadSafetyPlanning(section) {
    section.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h1 class="text-3xl font-bold mb-2" style="color: #1e3a8a;">
                            <i class="fas fa-shield-alt mr-3"></i>Personal Safety Plan
                        </h1>
                        <p class="text-gray-600">Create a plan to keep yourself safe in emergencies</p>
                    </div>
                    <button onclick="returnToSurvivorDashboard()" 
                            class="px-4 py-2 rounded-lg text-white font-semibold transition-colors"
                            style="background-color: #1e90ff;">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
            </div>

            <!-- Safety Plan Sections -->
            <div class="space-y-6">
                <!-- 1. Warning Signs -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-exclamation-triangle mr-3"></i>1. Recognize Warning Signs
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Know the signs that indicate danger might be escalating:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                            <h3 class="font-bold mb-2 text-red-800">
                                <i class="fas fa-exclamation-circle mr-2"></i>Physical Warning Signs
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2" style="color: #ef4444;"></i>Raised voice or shouting</li>
                                <li><i class="fas fa-check mr-2" style="color: #ef4444;"></i>Aggressive body language</li>
                                <li><i class="fas fa-check mr-2" style="color: #ef4444;"></i>Breaking or throwing objects</li>
                                <li><i class="fas fa-check mr-2" style="color: #ef4444;"></i>Blocking doorways</li>
                                <li><i class="fas fa-check mr-2" style="color: #ef4444;"></i>Clenched fists or jaw</li>
                            </ul>
                        </div>
                        <div class="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h3 class="font-bold mb-2 text-yellow-800">
                                <i class="fas fa-exclamation-triangle mr-2"></i>Behavioral Warning Signs
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2" style="color: #fbbf24;"></i>Heavy alcohol or drug use</li>
                                <li><i class="fas fa-check mr-2" style="color: #fbbf24;"></i>Extreme jealousy or accusations</li>
                                <li><i class="fas fa-check mr-2" style="color: #fbbf24;"></i>Isolating you from friends/family</li>
                                <li><i class="fas fa-check mr-2" style="color: #fbbf24;"></i>Controlling behavior increasing</li>
                                <li><i class="fas fa-check mr-2" style="color: #fbbf24;"></i>Past history of violence</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 2. Safe Places -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-map-marker-alt mr-3"></i>2. Identify Safe Places
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Plan where you can go quickly in an emergency:
                    </p>
                    <div class="space-y-4">
                        <div class="bg-green-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3" style="color: #008000;">
                                <i class="fas fa-home mr-2"></i>In Your Home
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <strong class="text-gray-800">Safest Rooms:</strong>
                                    <ul class="mt-2 space-y-1 text-gray-700">
                                        <li>• Room with a door you can lock</li>
                                        <li>• Room with a phone or window</li>
                                        <li>• Avoid kitchen (knives) and bathroom (hard surfaces)</li>
                                        <li>• Room with an exit route</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong class="text-gray-800">Emergency Items to Keep:</strong>
                                    <ul class="mt-2 space-y-1 text-gray-700">
                                        <li>• Charged mobile phone</li>
                                        <li>• Important documents</li>
                                        <li>• Some money</li>
                                        <li>• Keys (house & car)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3" style="color: #1e3a8a;">
                                <i class="fas fa-users mr-2"></i>Outside Your Home
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <strong class="text-gray-800">Trusted People:</strong>
                                    <ul class="mt-2 space-y-1 text-gray-700">
                                        <li>• Neighbor you trust (write name/address)</li>
                                        <li>• Family member's house</li>
                                        <li>• Friend's house</li>
                                        <li>• Co-worker's place</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong class="text-gray-800">Public Places:</strong>
                                    <ul class="mt-2 space-y-1 text-gray-700">
                                        <li>• Police station (call 999 or 019)</li>
                                        <li>• Hospital or clinic</li>
                                        <li>• Church, mosque, or community center</li>
                                        <li>• Safe house (call 116 for location)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. Emergency Bag -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-suitcase-rolling mr-3"></i>3. Prepare an Emergency Bag
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Keep a bag ready with essentials in case you need to leave quickly:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-purple-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3" style="color: #7c3aed;">
                                <i class="fas fa-id-card mr-2"></i>Important Documents
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>National ID card</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Birth certificates (you & children)</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Marriage certificate</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Passport (if you have one)</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Medical records</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Bank documents</li>
                                <li><i class="fas fa-check mr-2" style="color: #7c3aed;"></i>Court orders or legal papers</li>
                            </ul>
                        </div>
                        
                        <div class="bg-pink-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3" style="color: #ec4899;">
                                <i class="fas fa-shopping-bag mr-2"></i>Daily Essentials
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Change of clothes (you & children)</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Toiletries & hygiene items</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Medications you need</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Money (cash if possible)</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Phone charger</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Keys (house, car, work)</li>
                                <li><i class="fas fa-check mr-2" style="color: #ec4899;"></i>Children's favorite toy or comfort item</li>
                            </ul>
                        </div>
                        
                        <div class="bg-cyan-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3" style="color: #0891b2;">
                                <i class="fas fa-address-book mr-2"></i>Contact Information
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2" style="color: #0891b2;"></i>Emergency contacts list</li>
                                <li><i class="fas fa-check mr-2" style="color: #0891b2;"></i>Photos of family members</li>
                                <li><i class="fas fa-check mr-2" style="color: #0891b2;"></i>GBV case number (if you have one)</li>
                                <li><i class="fas fa-check mr-2" style="color: #0891b2;"></i>Lawyer's contact info</li>
                                <li><i class="fas fa-check mr-2" style="color: #0891b2;"></i>Children's school info</li>
                            </ul>
                            <div class="mt-4 p-3 bg-white rounded-lg border-2 border-cyan-200">
                                <strong class="text-cyan-800">Important Numbers:</strong>
                                <div class="mt-2 space-y-1 text-xs">
                                    <div>🚨 Emergency: <strong>116</strong></div>
                                    <div>👮 Police: <strong>999 / 019</strong></div>
                                    <div>🏥 Rainbo: <strong>076-777-777</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-700">
                            <i class="fas fa-lightbulb mr-2 text-yellow-600"></i>
                            <strong>Tip:</strong> Keep this bag at a trusted friend's house, or hide it somewhere safe where it can't be found. You can also keep copies of documents in digital format (photos on your phone or cloud storage).
                        </p>
                    </div>
                </div>

                <!-- 4. Code Words -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-key mr-3"></i>4. Set Up Code Words
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Establish secret signals with trusted people to let them know you need help:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-indigo-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3 text-indigo-800">
                                <i class="fas fa-comments mr-2"></i>Verbal Code Words
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2 text-indigo-600"></i>Pick an unusual phrase (e.g., "The weather is strange today")</li>
                                <li><i class="fas fa-check mr-2 text-indigo-600"></i>Use a specific word in casual conversation</li>
                                <li><i class="fas fa-check mr-2 text-indigo-600"></i>Ask about a made-up person (e.g., "How is Aunty Mary?")</li>
                                <li><i class="fas fa-check mr-2 text-indigo-600"></i>Tell trusted people your code word means "Call police"</li>
                            </ul>
                        </div>
                        
                        <div class="bg-teal-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3 text-teal-800">
                                <i class="fas fa-mobile-alt mr-2"></i>Digital Code Signals
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2 text-teal-600"></i>Missed call from specific number = need help</li>
                                <li><i class="fas fa-check mr-2 text-teal-600"></i>Specific emoji in text (e.g., 🔴 = emergency)</li>
                                <li><i class="fas fa-check mr-2 text-teal-600"></i>Post specific phrase on social media</li>
                                <li><i class="fas fa-check mr-2 text-teal-600"></i>Send a specific photo or meme</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 5. Children Safety -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-child mr-3"></i>5. Protect Your Children
                    </h2>
                    <p class="text-gray-700 mb-4">
                        If you have children, include them in your safety plan:
                    </p>
                    <div class="space-y-4">
                        <div class="bg-orange-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3 text-orange-800">
                                <i class="fas fa-clipboard-list mr-2"></i>Teach Your Children
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                <ul class="space-y-2">
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>How to dial 116, 999, or a trusted adult</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>Their full name, address, and your phone number</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>To leave the room when violence starts</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>Not to intervene (it's not their job to protect you)</li>
                                </ul>
                                <ul class="space-y-2">
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>A safe place to go in the house (e.g., their room)</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>Which neighbor they can run to for help</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>Practice a code word that means "get help"</li>
                                    <li><i class="fas fa-check mr-2 text-orange-600"></i>That violence is never their fault</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. After Leaving -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-lock mr-3"></i>6. Stay Safe After Leaving
                    </h2>
                    <p class="text-gray-700 mb-4">
                        If you leave, take these steps to protect yourself:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3 text-gray-800">
                                <i class="fas fa-user-shield mr-2"></i>Legal Protection
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2 text-blue-600"></i>Get a restraining/protection order</li>
                                <li><i class="fas fa-check mr-2 text-blue-600"></i>Change locks on doors/windows</li>
                                <li><i class="fas fa-check mr-2 text-blue-600"></i>Inform children's school</li>
                                <li><i class="fas fa-check mr-2 text-blue-600"></i>Alert workplace security</li>
                                <li><i class="fas fa-check mr-2 text-blue-600"></i>Vary your daily routine</li>
                            </ul>
                        </div>
                        
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-bold mb-3 text-gray-800">
                                <i class="fas fa-mobile-alt mr-2"></i>Digital Safety
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li><i class="fas fa-check mr-2 text-purple-600"></i>Change phone number</li>
                                <li><i class="fas fa-check mr-2 text-purple-600"></i>Change passwords & PINs</li>
                                <li><i class="fas fa-check mr-2 text-purple-600"></i>Turn off location sharing</li>
                                <li><i class="fas fa-check mr-2 text-purple-600"></i>Check for tracking apps</li>
                                <li><i class="fas fa-check mr-2 text-purple-600"></i>Be careful on social media</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Emergency Contacts Quick Reference -->
                <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                    <h2 class="text-2xl font-bold mb-4">
                        <i class="fas fa-phone-volume mr-3"></i>Emergency Contacts - Save These Numbers
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="tel:116" class="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                            <div class="text-4xl font-bold mb-2">116</div>
                            <div class="text-sm">GBV Hotline (Free, 24/7)</div>
                        </a>
                        <a href="tel:999" class="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                            <div class="text-4xl font-bold mb-2">999</div>
                            <div class="text-sm">Police Emergency</div>
                        </a>
                        <a href="tel:019" class="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                            <div class="text-4xl font-bold mb-2">019</div>
                            <div class="text-sm">Police FSU Direct</div>
                        </a>
                    </div>
                    <div class="mt-4 text-center">
                        <p class="text-lg font-semibold">
                            <i class="fas fa-heart mr-2"></i>You deserve to be safe. Help is always available.
                        </p>
                    </div>
                </div>

                <!-- Download/Print Options -->
                <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h2 class="text-xl font-bold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-download mr-2"></i>Save or Print Your Safety Plan
                    </h2>
                    <p class="text-gray-600 mb-4">
                        Keep a copy of this plan where you can access it quickly but safely
                    </p>
                    <div class="flex justify-center gap-4">
                        <button onclick="window.print()" 
                                class="px-6 py-3 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
                                style="background-color: #1e90ff;">
                            <i class="fas fa-print mr-2"></i>Print This Plan
                        </button>
                        <button onclick="shareSafetyPlan()" 
                                class="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 border-2"
                                style="border-color: #32cd32; color: #32cd32;">
                            <i class="fas fa-share-alt mr-2"></i>Share via SMS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function shareSafetyPlan() {
    const message = `MY SAFETY PLAN - Important Contacts:
    
🚨 GBV Hotline: 116 (Free, 24/7)
👮 Police Emergency: 999
👮 Police FSU: 019
🏥 Rainbo Freetown: 076-777-777

This is my safety contact. If I send you a code word or signal, please call 116 or 999 for me.

Thank you for helping keep me safe.`;

    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
}

// Export functions
window.loadSafetyPlanning = loadSafetyPlanning;
window.shareSafetyPlan = shareSafetyPlan;
