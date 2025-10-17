// Mobile Interface and Field Worker App Simulation
// Optimized interface for tablets and smartphones used by field workers

console.log('Loading Mobile Interface System...');

window.MobileInterface = {
    isTabletMode: false,
    isPhoneMode: false,
    currentUser: null,
    offlineData: [],
    syncStatus: 'online'
};

// Initialize Mobile Interface
function initializeMobileInterface() {
    console.log('Initializing Mobile Interface...');
    
    // Detect device type
    detectDeviceType();
    
    // Setup mobile-specific features
    setupMobileFeatures();
    
    // Setup offline capability
    setupOfflineMode();
    
    // Add mobile navigation
    addMobileNavigation();
}

// Device Detection
function detectDeviceType() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    
    window.MobileInterface.isTabletMode = width >= 768 && width <= 1024;
    window.MobileInterface.isPhoneMode = width < 768;
    
    if (window.MobileInterface.isTabletMode || window.MobileInterface.isPhoneMode) {
        document.body.classList.add('mobile-optimized');
        showMobileWelcome();
    }
}

function showMobileWelcome() {
    // Add mobile app button to interface
    setTimeout(() => {
        const mobileButton = document.createElement('div');
        mobileButton.className = 'fixed bottom-20 left-6 z-50';
        mobileButton.innerHTML = `
            <button id="mobile-app-btn" class="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transform transition-transform hover:scale-110">
                <i class="fas fa-mobile-alt text-xl"></i>
            </button>
            <div class="absolute -top-12 left-0 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 hover:opacity-100 transition-opacity">
                Field Worker App
            </div>
        `;
        document.body.appendChild(mobileButton);
        
        document.getElementById('mobile-app-btn').addEventListener('click', showMobileApp);
    }, 2000);
}

function showMobileApp() {
    const mobileModal = document.createElement('div');
    mobileModal.className = 'modal';
    mobileModal.innerHTML = `
        <div class="modal-content max-w-sm mx-auto mobile-app-container">
            <!-- Mobile App Header -->
            <div class="bg-blue-600 text-white p-4 rounded-t-lg">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-bold">GBV Field App</h3>
                        <p class="text-xs text-blue-100">Sierra Leone Ministry</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-400 rounded-full" title="Online"></div>
                        <button class="close-modal text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- User Profile -->
            <div class="bg-blue-50 p-4 border-b">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-blue-600 text-lg"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">Fatmata Bangura</div>
                        <div class="text-sm text-gray-600">Case Worker - Bo District</div>
                        <div class="text-xs text-green-600">✓ Verified • Online</div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="p-4">
                <h4 class="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div class="grid grid-cols-2 gap-3">
                    <button class="mobile-action-btn bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-lg text-center">
                        <i class="fas fa-plus-circle text-2xl mb-2"></i>
                        <div class="text-sm font-medium">New Case</div>
                    </button>
                    
                    <button class="mobile-action-btn bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg text-center">
                        <i class="fas fa-search text-2xl mb-2"></i>
                        <div class="text-sm font-medium">Find Case</div>
                    </button>
                    
                    <button class="mobile-action-btn bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg text-center">
                        <i class="fas fa-phone text-2xl mb-2"></i>
                        <div class="text-sm font-medium">Call 116</div>
                    </button>
                    
                    <button class="mobile-action-btn bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg text-center">
                        <i class="fas fa-map-marker-alt text-2xl mb-2"></i>
                        <div class="text-sm font-medium">Find Services</div>
                    </button>
                </div>
            </div>
            
            <!-- Today's Summary -->
            <div class="p-4 border-t bg-gray-50">
                <h4 class="font-medium text-gray-900 mb-3">Today's Summary</h4>
                <div class="grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                        <div class="text-lg font-bold text-red-600">3</div>
                        <div class="text-gray-600">New Cases</div>
                    </div>
                    <div>
                        <div class="text-lg font-bold text-green-600">7</div>
                        <div class="text-gray-600">Follow-ups</div>
                    </div>
                    <div>
                        <div class="text-lg font-bold text-blue-600">12</div>
                        <div class="text-gray-600">Total Active</div>
                    </div>
                </div>
            </div>
            
            <!-- Recent Cases -->
            <div class="p-4 border-t">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-medium text-gray-900">My Cases</h4>
                    <button class="text-blue-600 text-sm">View All</button>
                </div>
                
                <div class="space-y-3">
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="font-medium text-yellow-900 text-sm">GBV-SL-2024-0847</div>
                                <div class="text-yellow-700 text-xs">Follow-up due today</div>
                            </div>
                            <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="font-medium text-blue-900 text-sm">GBV-SL-2024-0846</div>
                                <div class="text-blue-700 text-xs">Referred to legal aid</div>
                            </div>
                            <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Voice Recording -->
            <div class="p-4 border-t">
                <button id="voice-record-btn" class="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                    <i class="fas fa-microphone"></i>
                    <span class="font-medium">Voice Report (Krio/English)</span>
                </button>
                <p class="text-xs text-gray-500 text-center mt-2">Hold to record • Supports local languages</p>
            </div>
            
            <!-- Bottom Navigation -->
            <div class="bg-white border-t p-2">
                <div class="grid grid-cols-4 gap-1 text-xs">
                    <button class="mobile-nav-btn active p-2 text-center">
                        <i class="fas fa-home mb-1"></i>
                        <div>Home</div>
                    </button>
                    <button class="mobile-nav-btn p-2 text-center text-gray-500">
                        <i class="fas fa-folder mb-1"></i>
                        <div>Cases</div>
                    </button>
                    <button class="mobile-nav-btn p-2 text-center text-gray-500">
                        <i class="fas fa-users mb-1"></i>
                        <div>Services</div>
                    </button>
                    <button class="mobile-nav-btn p-2 text-center text-gray-500">
                        <i class="fas fa-cog mb-1"></i>
                        <div>Settings</div>
                    </button>
                </div>
            </div>
            
            <!-- Offline Indicator -->
            <div id="offline-indicator" class="hidden bg-orange-500 text-white p-2 text-center text-sm">
                <i class="fas fa-wifi-slash mr-1"></i>
                Working offline • Data will sync when connected
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileModal);
    
    // Setup mobile app interactions
    setupMobileAppInteractions(mobileModal);
    
    // Add close handlers
    mobileModal.querySelector('.close-modal').addEventListener('click', () => mobileModal.remove());
    
    // Setup mobile navigation
    setupMobileNavigation(mobileModal);
}

function setupMobileAppInteractions(modal) {
    // Voice recording simulation
    const voiceBtn = modal.querySelector('#voice-record-btn');
    voiceBtn.addEventListener('click', function() {
        simulateVoiceRecording(this);
    });
    
    // Quick action buttons
    const actionBtns = modal.querySelectorAll('.mobile-action-btn');
    actionBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const actions = ['showMobileNewCase', 'showMobileCaseSearch', 'callHotline', 'showMobileServices'];
            window[actions[index]]();
        });
    });
}

function simulateVoiceRecording(btn) {
    const originalText = btn.innerHTML;
    
    // Show recording state
    btn.innerHTML = `
        <i class="fas fa-stop-circle animate-pulse"></i>
        <span class="font-medium">Recording... Tap to stop</span>
    `;
    btn.className = btn.className.replace('bg-red-600', 'bg-red-800');
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
        btn.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span class="font-medium">Processing voice...</span>
        `;
        
        // Show processing result
        setTimeout(() => {
            showVoiceProcessingResult();
            btn.innerHTML = originalText;
            btn.className = btn.className.replace('bg-red-800', 'bg-red-600');
        }, 2000);
    }, 3000);
}

function showVoiceProcessingResult() {
    showNotification('Voice recording processed: "Mi dɛ ripɔt wan kés frɔm Bo" → Incident reported from Bo District', 'success');
}

function setupMobileNavigation(modal) {
    const navBtns = modal.querySelectorAll('.mobile-nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            navBtns.forEach(b => {
                b.classList.remove('active', 'text-blue-600');
                b.classList.add('text-gray-500');
            });
            this.classList.add('active', 'text-blue-600');
            this.classList.remove('text-gray-500');
        });
    });
}

// Mobile-specific features
function setupMobileFeatures() {
    // Add mobile CSS
    addMobileStyles();
    
    // Setup touch gestures
    setupTouchGestures();
    
    // Setup mobile forms
    setupMobileForms();
}

function addMobileStyles() {
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-optimized .modal-content {
            margin: 1rem;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .mobile-app-container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .mobile-action-btn {
            transition: all 0.2s;
        }
        
        .mobile-nav-btn.active {
            color: #2563eb !important;
        }
        
        @media (max-width: 768px) {
            .dashboard-tab {
                padding: 0.5rem 0.25rem;
                font-size: 0.75rem;
            }
            
            .grid-cols-4 {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

function setupTouchGestures() {
    // Add swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next tab
                console.log('Swipe left detected');
            } else {
                // Swipe right - previous tab
                console.log('Swipe right detected');
            }
        }
    }
}

function setupMobileForms() {
    // Optimize forms for mobile input
    document.addEventListener('click', function(e) {
        if (e.target.matches('input[type="date"]')) {
            // Mobile date picker optimization
            e.target.style.fontSize = '16px'; // Prevents zoom on iOS
        }
    });
}

// Mobile-specific case management
function showMobileNewCase() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-sm mx-auto mobile-app-container">
            <div class="bg-red-600 text-white p-4">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold">New GBV Case</h3>
                    <button class="close-modal text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <form class="p-4 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">📅 When did this happen?</label>
                    <input type="date" class="w-full p-3 border border-gray-300 rounded-lg text-base">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">📍 Where? (District)</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg text-base">
                        <option>Select district...</option>
                        <option>Bo</option>
                        <option>Western Area Urban</option>
                        <option>Kenema</option>
                        <option>Bombali</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">⚠️ Type of violence</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg text-base">
                        <option>Select type...</option>
                        <option>Sexual violence/Rape</option>
                        <option>Domestic violence</option>
                        <option>Physical assault</option>
                        <option>Child abuse</option>
                        <option>Other</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">👤 Survivor age group</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" class="age-btn p-2 border border-gray-300 rounded text-sm">0-17</button>
                        <button type="button" class="age-btn p-2 border border-gray-300 rounded text-sm">18-24</button>
                        <button type="button" class="age-btn p-2 border border-gray-300 rounded text-sm">25-34</button>
                        <button type="button" class="age-btn p-2 border border-gray-300 rounded text-sm">35+</button>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">🗣️ Voice note (Optional)</label>
                    <button type="button" class="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600">
                        <i class="fas fa-microphone mr-2"></i>
                        Tap to record in Krio or English
                    </button>
                </div>
                
                <div class="bg-blue-50 p-3 rounded-lg">
                    <div class="flex items-start">
                        <i class="fas fa-shield-alt text-blue-600 mr-2 mt-0.5"></i>
                        <div class="text-sm text-blue-800">
                            All information is kept confidential. No names or personal details are stored in the system.
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-3 pt-4">
                    <button type="button" class="close-modal btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Case</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Age button selection
    const ageButtons = modal.querySelectorAll('.age-btn');
    ageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            ageButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
            this.classList.add('bg-blue-600', 'text-white');
        });
    });
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
}

function showMobileCaseSearch() {
    showNotification('Case search feature - Search by case number or survivor details', 'info');
}

function callHotline() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-sm mx-auto mobile-app-container">
            <div class="bg-green-600 text-white p-4 text-center">
                <i class="fas fa-phone text-3xl mb-2"></i>
                <h3 class="font-bold">GBV Hotline</h3>
                <div class="text-2xl font-bold">116</div>
                <p class="text-green-100 text-sm">Free • 24/7 • Confidential</p>
            </div>
            
            <div class="p-4 text-center">
                <p class="text-gray-700 mb-4">Get immediate help and support</p>
                
                <div class="space-y-3 mb-6">
                    <div class="bg-blue-50 p-3 rounded-lg text-left">
                        <div class="font-medium text-blue-900">🗣️ Language Support</div>
                        <div class="text-blue-800 text-sm">English • Krio • Mende • Temne</div>
                    </div>
                    
                    <div class="bg-green-50 p-3 rounded-lg text-left">
                        <div class="font-medium text-green-900">🤝 Services Available</div>
                        <div class="text-green-800 text-sm">Counseling • Referrals • Emergency Support</div>
                    </div>
                </div>
                
                <button class="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-bold text-lg mb-3">
                    <i class="fas fa-phone mr-2"></i>
                    Call 116 Now
                </button>
                
                <button class="close-modal w-full btn-secondary">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
}

function showMobileServices() {
    showNotification('Service directory - Find nearest health, legal, and support services', 'info');
}

// Offline Capability
function setupOfflineMode() {
    // Detect online/offline status
    window.addEventListener('online', function() {
        window.MobileInterface.syncStatus = 'online';
        syncOfflineData();
        updateSyncIndicator();
    });
    
    window.addEventListener('offline', function() {
        window.MobileInterface.syncStatus = 'offline';
        updateSyncIndicator();
    });
}

function updateSyncIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
        if (window.MobileInterface.syncStatus === 'offline') {
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }
}

function syncOfflineData() {
    if (window.MobileInterface.offlineData.length > 0) {
        console.log('Syncing', window.MobileInterface.offlineData.length, 'offline records...');
        // Simulate sync
        setTimeout(() => {
            window.MobileInterface.offlineData = [];
            showNotification('Offline data synced successfully', 'success');
        }, 2000);
    }
}

function addMobileNavigation() {
    // Add mobile-optimized navigation if needed
    if (window.MobileInterface.isPhoneMode) {
        // Modify existing navigation for mobile
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.add('mobile-nav');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeMobileInterface, 1500);
});

console.log('Mobile Interface System loaded successfully');