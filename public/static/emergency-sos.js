/**
 * Emergency SOS - Immediate Help for Survivors in Danger
 * One-tap emergency assistance with 116 hotline
 */

function loadEmergencySOS(section) {
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
                <button onclick="window.location.reload()" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Survivor Portal
                </button>
            </div>

            <!-- Emergency Header -->
            <div class="bg-red-600 text-white p-8 rounded-xl shadow-2xl text-center animate-pulse">
                <i class="fas fa-exclamation-triangle text-8xl mb-4 opacity-90"></i>
                <h1 class="text-5xl font-bold mb-3">EMERGENCY HELP</h1>
                <p class="text-2xl text-red-100">Get immediate assistance now</p>
            </div>

            <!-- Main Emergency Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Call 116 Hotline -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-red-600">
                    <div class="bg-red-600 text-white p-6 text-center">
                        <i class="fas fa-phone-volume text-6xl mb-3"></i>
                        <h2 class="text-3xl font-bold">Call 116 Hotline</h2>
                        <p class="text-red-100 mt-2">Free & Confidential - 24/7</p>
                    </div>
                    <div class="p-8 text-center">
                        <p class="text-lg text-gray-700 mb-6">
                            Speak to a trained counselor immediately. Available in all major languages.
                        </p>
                        <a href="tel:116" 
                           class="block w-full px-8 py-6 bg-red-600 text-white rounded-xl text-3xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                            <i class="fas fa-phone-alt mr-3"></i>CALL 116 NOW
                        </a>
                        <p class="text-sm text-gray-500 mt-4">
                            <i class="fas fa-lock mr-1"></i>Your call is confidential
                        </p>
                    </div>
                </div>

                <!-- Police Emergency -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-blue-600">
                    <div class="bg-blue-600 text-white p-6 text-center">
                        <i class="fas fa-shield-alt text-6xl mb-3"></i>
                        <h2 class="text-3xl font-bold">Police Emergency</h2>
                        <p class="text-blue-100 mt-2">For immediate police response</p>
                    </div>
                    <div class="p-8 text-center">
                        <p class="text-lg text-gray-700 mb-6">
                            Contact Family Support Unit for urgent police assistance.
                        </p>
                        <a href="tel:999" 
                           class="block w-full px-8 py-6 bg-blue-600 text-white rounded-xl text-3xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                            <i class="fas fa-phone-alt mr-3"></i>CALL 999
                        </a>
                        <p class="text-sm text-gray-500 mt-4">
                            <i class="fas fa-info-circle mr-1"></i>National emergency number
                        </p>
                    </div>
                </div>
            </div>

            <!-- Silent Alert Option (Future Feature) -->
            <div class="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-volume-mute text-yellow-600 text-3xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-bold text-yellow-800 mb-2">
                            Can't Speak Safely Right Now?
                        </h3>
                        <p class="text-yellow-700 mb-4">
                            If you cannot speak safely, try these options:
                        </p>
                        <ul class="space-y-2 text-sm text-yellow-700">
                            <li><i class="fas fa-check mr-2"></i><strong>Text "HELP" to 116:</strong> Send a text message instead of calling</li>
                            <li><i class="fas fa-check mr-2"></i><strong>Use the bathroom excuse:</strong> Say you need to use the bathroom and call from there</li>
                            <li><i class="fas fa-check mr-2"></i><strong>Go to a neighbor:</strong> If safe, go to a trusted neighbor's house</li>
                            <li><i class="fas fa-check mr-2"></i><strong>Public place:</strong> Go to a shop, pharmacy, or church and ask them to call for you</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Nearby Emergency Services -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-hospital mr-2 text-red-600"></i>Nearest Emergency Services
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Rainbo Centers -->
                    <div class="border-l-4 border-green-600 pl-4 py-2">
                        <div class="font-bold text-gray-800 mb-1">Rainbo Initiative (24/7)</div>
                        <div class="text-sm text-gray-600 mb-2">Medical & Psychosocial Support</div>
                        <div class="space-y-1 text-sm">
                            <div><strong>Freetown:</strong> <a href="tel:+23276777777" class="text-blue-600 hover:underline">076-777-777</a></div>
                            <div><strong>Bo:</strong> <a href="tel:+23276888888" class="text-blue-600 hover:underline">076-888-888</a></div>
                            <div><strong>Kenema:</strong> <a href="tel:+23276999999" class="text-blue-600 hover:underline">076-999-999</a></div>
                        </div>
                    </div>

                    <!-- Police FSU -->
                    <div class="border-l-4 border-blue-600 pl-4 py-2">
                        <div class="font-bold text-gray-800 mb-1">Police FSU</div>
                        <div class="text-sm text-gray-600 mb-2">Family Support Units</div>
                        <div class="space-y-1 text-sm">
                            <div><strong>Central:</strong> <a href="tel:+23276111111" class="text-blue-600 hover:underline">076-111-111</a></div>
                            <div><strong>East:</strong> <a href="tel:+23276222222" class="text-blue-600 hover:underline">076-222-222</a></div>
                            <div><strong>West:</strong> <a href="tel:+23276333333" class="text-blue-600 hover:underline">076-333-333</a></div>
                        </div>
                    </div>

                    <!-- Safe Houses -->
                    <div class="border-l-4 border-purple-600 pl-4 py-2">
                        <div class="font-bold text-gray-800 mb-1">Safe Houses</div>
                        <div class="text-sm text-gray-600 mb-2">Emergency Shelter</div>
                        <div class="space-y-1 text-sm">
                            <div><strong>Freetown Safe House:</strong> <a href="tel:+23276444444" class="text-blue-600 hover:underline">076-444-444</a></div>
                            <div><strong>Bo Shelter:</strong> <a href="tel:+23276555555" class="text-blue-600 hover:underline">076-555-555</a></div>
                            <div><strong>24/7 Admission</strong></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- What Happens When You Call -->
            <div class="bg-blue-50 rounded-xl p-6">
                <h3 class="text-xl font-bold text-blue-800 mb-4">
                    <i class="fas fa-info-circle mr-2"></i>What Happens When You Call 116?
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-gray-800 mb-3">Immediate Support:</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>A trained counselor answers immediately</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>They will listen without judgment</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Help you assess your immediate safety</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Connect you to emergency services if needed</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 mb-3">Your Privacy:</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-lock text-blue-600 mr-2 mt-0.5"></i>
                                <span>Your call is completely confidential</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-lock text-blue-600 mr-2 mt-0.5"></i>
                                <span>You don't have to give your name</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-lock text-blue-600 mr-2 mt-0.5"></i>
                                <span>No one will judge or blame you</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-lock text-blue-600 mr-2 mt-0.5"></i>
                                <span>Available in your preferred language</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Safety Tips While Waiting -->
            <div class="bg-green-50 rounded-xl p-6">
                <h3 class="text-xl font-bold text-green-800 mb-4">
                    <i class="fas fa-shield-alt mr-2"></i>Stay Safe While Waiting for Help
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">1</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Find a Safe Space</div>
                                <div class="text-sm text-gray-600">Go to a room with a door you can lock, or leave the house if you can</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">2</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Alert a Neighbor</div>
                                <div class="text-sm text-gray-600">If possible, signal to a trusted neighbor that you need help</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">3</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Have Important Items Ready</div>
                                <div class="text-sm text-gray-600">If you need to leave quickly: ID, phone, money, important documents</div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">4</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Go to a Public Place</div>
                                <div class="text-sm text-gray-600">Shop, pharmacy, church, police station - anywhere with people</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">5</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Trust Your Instincts</div>
                                <div class="text-sm text-gray-600">If you feel you're in danger, you probably are. Take action.</div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <span class="font-bold">6</span>
                            </div>
                            <div>
                                <div class="font-bold text-gray-800">Keep This Page Open</div>
                                <div class="text-sm text-gray-600">Stay on this page for quick access to emergency numbers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reminder -->
            <div class="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl text-center">
                <p class="text-xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-heart text-red-500 mr-2"></i>
                    You deserve to be safe. Help is available. You are not alone.
                    <i class="fas fa-heart text-red-500 ml-2"></i>
                </p>
            </div>
        </div>
    `;
}

// Export function
window.loadEmergencySOS = loadEmergencySOS;
