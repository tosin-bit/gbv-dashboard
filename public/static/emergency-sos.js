/**
 * Emergency SOS System for Survivor Portal
 * Immediate help button that calls police and sends location
 */

class EmergencySOS {
    constructor() {
        this.isActive = false;
        this.location = null;
        console.log('🆘 Emergency SOS System initialized');
    }
    
    /**
     * Activate Emergency SOS
     */
    async activate() {
        if (this.isActive) {
            console.log('⚠️ SOS already active');
            return;
        }
        
        this.isActive = true;
        console.log('🆘 EMERGENCY SOS ACTIVATED');
        
        // Show immediate confirmation
        this.showSOSActivated();
        
        // Get location
        await this.getLocation();
        
        // Call police (primary action)
        this.callPolice();
        
        // Send SMS with location (if available)
        if (this.location) {
            this.sendLocationSMS();
        }
        
        // Show nearby help centers
        this.showNearbyHelp();
    }
    
    /**
     * Show SOS activated screen
     */
    showSOSActivated() {
        const section = document.getElementById('dashboard-content');
        if (!section) return;
        
        section.innerHTML = `
            <div class="fixed inset-0 bg-red-600 z-50 flex items-center justify-center p-4 animate-pulse">
                <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
                    <div class="w-24 h-24 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center animate-bounce">
                        <i class="fas fa-exclamation-triangle text-white text-5xl"></i>
                    </div>
                    
                    <h2 class="text-3xl font-bold text-red-600 mb-4">EMERGENCY SOS ACTIVATED</h2>
                    
                    <div class="space-y-4 mb-6">
                        <div class="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                            <i class="fas fa-phone text-red-600 text-2xl mb-2"></i>
                            <p class="font-bold text-red-800">Calling Police FSU...</p>
                            <p class="text-red-700 text-sm mt-1">019</p>
                        </div>
                        
                        <div id="sos-location-status" class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <i class="fas fa-spinner fa-spin text-blue-600 text-xl mb-2"></i>
                            <p class="text-blue-800 text-sm">Getting your location...</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <a href="tel:019" 
                            class="block w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                            <i class="fas fa-phone mr-2"></i>Call Police (019)
                        </a>
                        <a href="tel:116" 
                            class="block w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700">
                            <i class="fas fa-phone-volume mr-2"></i>Call Helpline (116)
                        </a>
                        <a href="tel:999" 
                            class="block w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600">
                            <i class="fas fa-ambulance mr-2"></i>Medical Emergency (999)
                        </a>
                    </div>
                    
                    <div id="nearby-help" class="mt-6 text-left"></div>
                    
                    <button onclick="emergencySOS.deactivate()" 
                        class="mt-6 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Get user's location
     */
    async getLocation() {
        const statusDiv = document.getElementById('sos-location-status');
        
        if (!navigator.geolocation) {
            if (statusDiv) {
                statusDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle text-yellow-600 text-xl mb-2"></i>
                    <p class="text-yellow-800 text-sm">Location not available</p>
                `;
            }
            return;
        }
        
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });
            
            this.location = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            
            console.log('📍 Location obtained:', this.location);
            
            if (statusDiv) {
                statusDiv.innerHTML = `
                    <i class="fas fa-map-marker-alt text-green-600 text-xl mb-2"></i>
                    <p class="text-green-800 font-bold">Location Shared</p>
                    <p class="text-green-700 text-xs mt-1">Help is on the way</p>
                `;
            }
            
        } catch (error) {
            console.error('❌ Location error:', error);
            if (statusDiv) {
                statusDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle text-yellow-600 text-xl mb-2"></i>
                    <p class="text-yellow-800 text-sm">Location access denied</p>
                    <p class="text-yellow-700 text-xs mt-1">Please enable location services</p>
                `;
            }
        }
    }
    
    /**
     * Call police
     */
    callPolice() {
        // Automatically trigger tel: link
        window.location.href = 'tel:019';
    }
    
    /**
     * Send SMS with location
     */
    sendLocationSMS() {
        if (!this.location) return;
        
        const message = `EMERGENCY! GBV incident reported. Location: ${this.location.lat},${this.location.lon}. Please send help immediately!`;
        const smsLink = `sms:019?body=${encodeURIComponent(message)}`;
        
        // Create hidden link and click it
        const a = document.createElement('a');
        a.href = smsLink;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        console.log('📱 SMS sent with location');
    }
    
    /**
     * Show nearby help centers
     */
    showNearbyHelp() {
        const helpDiv = document.getElementById('nearby-help');
        if (!helpDiv) return;
        
        const helpCenters = [
            { name: 'Rainbo Initiative', phone: '+232-76-XXX-XXX', type: 'Medical' },
            { name: 'Police FSU', phone: '019', type: 'Investigation' },
            { name: 'Legal Aid Board', phone: '+232-76-XXX-XXX', type: 'Legal Support' }
        ];
        
        helpDiv.innerHTML = `
            <div class="bg-gray-50 rounded-lg p-4 mt-4">
                <h3 class="font-bold text-gray-800 mb-3">
                    <i class="fas fa-hospital mr-2"></i>Nearby Help Centers
                </h3>
                <div class="space-y-2">
                    ${helpCenters.map(center => `
                        <div class="bg-white rounded p-3 flex items-center justify-between">
                            <div>
                                <p class="font-semibold text-sm">${center.name}</p>
                                <p class="text-xs text-gray-600">${center.type}</p>
                            </div>
                            <a href="tel:${center.phone}" 
                                class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                Call
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * Deactivate SOS
     */
    deactivate() {
        this.isActive = false;
        console.log('✅ SOS deactivated');
        
        // Return to survivor portal
        const section = document.getElementById('dashboard-content');
        if (section && typeof window.loadSurvivorPortal === 'function') {
            window.loadSurvivorPortal(section);
        } else {
            location.reload();
        }
    }
}

// Create global instance
window.emergencySOS = new EmergencySOS();

// Export function
window.activateEmergencySOS = () => {
    window.emergencySOS.activate();
};

console.log('✅ Emergency SOS System Ready');
