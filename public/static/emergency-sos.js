/**
 * Emergency SOS - Immediate Help for Survivors in Danger
 * Mobile-focused with countdown confirmation and auto-call feature
 */

let sosCountdownTimer = null;
let sosCountdown = 3;

function loadEmergencySOS(section) {
    section.innerHTML = `
        <div id="emergency-sos-screen" class="min-h-screen flex items-center justify-center p-4" style="background-color: #dc2626;">
            <!-- Emergency SOS Container -->
            <div class="w-full max-w-md">
                <!-- Back Button (Small, top) -->
                <div class="mb-4 text-center">
                    <button onclick="cancelEmergencySOS()" 
                            class="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm">
                        <i class="fas fa-arrow-left mr-2"></i>Cancel
                    </button>
                </div>

                <!-- Main Emergency Card -->
                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <!-- Flashing Red Header -->
                    <div id="sos-header" class="p-8 text-center text-white sos-flash" style="background-color: #dc2626;">
                        <i class="fas fa-exclamation-triangle text-7xl mb-4 animate-bounce"></i>
                        <h1 class="text-4xl font-bold mb-2">EMERGENCY SOS</h1>
                        <p class="text-xl text-red-100">Help is on the way</p>
                    </div>

                    <!-- Countdown Section -->
                    <div id="countdown-section" class="p-8 text-center">
                        <div class="mb-6">
                            <div class="text-6xl font-bold mb-4" style="color: #dc2626;" id="countdown-number">3</div>
                            <p class="text-xl text-gray-700 font-semibold">Calling emergency help in...</p>
                            <p class="text-sm text-gray-500 mt-2">Hold STOP to cancel</p>
                        </div>

                        <!-- Stop Button -->
                        <button onclick="cancelEmergencySOS()" 
                                class="w-full py-6 rounded-2xl text-white text-2xl font-bold shadow-lg transition-all mb-4"
                                style="background-color: #6b7280;">
                            <i class="fas fa-hand-paper mr-3"></i>STOP
                        </button>

                        <!-- Auto-call Info -->
                        <div class="bg-red-50 rounded-xl p-4">
                            <p class="text-sm text-gray-700 mb-2">
                                <i class="fas fa-phone-alt mr-2" style="color: #dc2626;"></i>
                                <strong>Auto-calling:</strong> 116 GBV Hotline
                            </p>
                            <p class="text-xs text-gray-500">Free, confidential, 24/7 support</p>
                        </div>
                    </div>

                    <!-- Emergency Actions (Shown after countdown) -->
                    <div id="emergency-actions" class="p-8 hidden">
                        <h3 class="text-2xl font-bold text-center mb-6" style="color: #dc2626;">
                            Choose Emergency Service
                        </h3>

                        <!-- Call 116 (Primary) -->
                        <a href="tel:116" 
                           class="block w-full py-6 rounded-2xl text-white text-2xl font-bold shadow-lg transition-all transform hover:scale-105 mb-4"
                           style="background-color: #dc2626;">
                            <i class="fas fa-phone-volume mr-3"></i>CALL 116 NOW
                        </a>

                        <!-- Call 999 (Police) -->
                        <a href="tel:999" 
                           class="block w-full py-6 rounded-2xl text-white text-xl font-bold shadow-lg transition-all transform hover:scale-105 mb-4"
                           style="background-color: #1e3a8a;">
                            <i class="fas fa-shield-alt mr-3"></i>CALL 999 POLICE
                        </a>

                        <!-- Send Location SMS (Future Feature) -->
                        <button onclick="shareEmergencyLocation()" 
                                class="w-full py-4 rounded-xl border-2 text-lg font-semibold transition-all mb-4"
                                style="border-color: #32cd32; color: #008000;">
                            <i class="fas fa-map-marker-alt mr-2"></i>Share My Location
                        </button>

                        <!-- Alternative Options -->
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="showNearbyHelp()" 
                                    class="py-3 rounded-xl border text-sm font-semibold"
                                    style="border-color: #1e90ff; color: #1e90ff;">
                                <i class="fas fa-hospital mr-1"></i>Find Near Me
                            </button>
                            <button onclick="showSilentAlert()" 
                                    class="py-3 rounded-xl border text-sm font-semibold"
                                    style="border-color: #ffd700; color: #1e3a8a;">
                                <i class="fas fa-volume-mute mr-1"></i>Silent Mode
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Safety Message -->
                <div class="mt-6 text-center text-white">
                    <p class="text-lg font-semibold mb-2">
                        <i class="fas fa-heart mr-2"></i>You are not alone
                    </p>
                    <p class="text-sm text-red-100">Help is available 24/7. You deserve to be safe.</p>
                </div>
            </div>
        </div>

        <style>
            /* Flashing red animation */
            @keyframes sos-flash {
                0%, 100% { background-color: #dc2626; }
                50% { background-color: #ef4444; }
            }
            
            .sos-flash {
                animation: sos-flash 1s ease-in-out infinite;
            }

            /* Mobile optimizations */
            @media (max-width: 640px) {
                #emergency-sos-screen {
                    padding: 1rem;
                }
                
                .text-4xl { font-size: 2rem; }
                .text-2xl { font-size: 1.5rem; }
            }

            /* Ensure full screen on mobile */
            #emergency-sos-screen {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
            }
        </style>
    `;
    
    // Start countdown immediately
    startSOSCountdown();
}

function startSOSCountdown() {
    sosCountdown = 3;
    const countdownEl = document.getElementById('countdown-number');
    const countdownSection = document.getElementById('countdown-section');
    const actionsSection = document.getElementById('emergency-actions');
    
    // Clear any existing timer
    if (sosCountdownTimer) {
        clearInterval(sosCountdownTimer);
    }
    
    // Update countdown every second
    sosCountdownTimer = setInterval(() => {
        sosCountdown--;
        
        if (countdownEl) {
            countdownEl.textContent = sosCountdown;
        }
        
        if (sosCountdown <= 0) {
            clearInterval(sosCountdownTimer);
            
            // Hide countdown, show actions
            if (countdownSection) countdownSection.classList.add('hidden');
            if (actionsSection) actionsSection.classList.remove('hidden');
            
            // Auto-dial 116 (on mobile devices)
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                setTimeout(() => {
                    window.location.href = 'tel:116';
                }, 500);
            }
        }
    }, 1000);
}

function cancelEmergencySOS() {
    if (sosCountdownTimer) {
        clearInterval(sosCountdownTimer);
    }
    
    // Return to survivor portal
    const section = document.querySelector('#emergency-sos-screen')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadSurvivorPortal === 'function') {
        loadSurvivorPortal(section);
    } else {
        window.location.reload();
    }
}

function shareEmergencyLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const locationUrl = `https://maps.google.com/?q=${lat},${lng}`;
                
                // Create SMS with location
                const message = `EMERGENCY: I need help. My location: ${locationUrl}`;
                const smsUrl = `sms:116?body=${encodeURIComponent(message)}`;
                
                window.location.href = smsUrl;
            },
            (error) => {
                alert('Could not get your location. Please call 116 directly.');
            }
        );
    } else {
        alert('Location sharing not available. Please call 116 for help.');
    }
}

function showNearbyHelp() {
    alert('Finding nearest Rainbo Center, Police FSU, or Safe House...\n\nThis feature will show you the closest emergency services with directions.');
}

function showSilentAlert() {
    alert('Silent Alert Mode:\n\n• Call will appear as normal phone call\n• No sound until you speak\n• Can pretend it\'s a friend calling\n\nProceed to call 116?');
    window.location.href = 'tel:116';
}

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

// Export all functions
window.loadEmergencySOS = loadEmergencySOS;
window.startSOSCountdown = startSOSCountdown;
window.cancelEmergencySOS = cancelEmergencySOS;
window.shareEmergencyLocation = shareEmergencyLocation;
window.showNearbyHelp = showNearbyHelp;
window.showSilentAlert = showSilentAlert;
