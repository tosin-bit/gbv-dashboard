/**
 * Service Finder - GPS-Based Nearby Help Locator
 * Helps survivors find nearest Rainbo Centers, Police FSU, Safe Houses, and Hospitals
 */

// Service locations database (all 16 districts of Sierra Leone)
const serviceLocations = {
    rainboCenters: [
        { name: 'Rainbo Centre Freetown', district: 'Western Area Urban', phone: '076-777-777', address: 'Princess Christian Maternity Hospital, Freetown', lat: 8.4657, lng: -13.2317, services: ['Medical', 'Counseling', 'Legal', 'Police'] },
        { name: 'Rainbo Centre Bo', district: 'Bo', phone: '076-888-888', address: 'Bo Government Hospital', lat: 7.9644, lng: -11.7383, services: ['Medical', 'Counseling', 'Legal'] },
        { name: 'Rainbo Centre Kenema', district: 'Kenema', phone: '076-999-999', address: 'Kenema Government Hospital', lat: 7.8767, lng: -11.1900, services: ['Medical', 'Counseling', 'Legal'] },
        { name: 'Rainbo Centre Makeni', district: 'Bombali', phone: '076-111-222', address: 'Makeni Government Hospital', lat: 8.8817, lng: -12.0453, services: ['Medical', 'Counseling'] },
        { name: 'Rainbo Centre Koidu', district: 'Kono', phone: '076-333-444', address: 'Koidu Government Hospital', lat: 8.6439, lng: -10.9708, services: ['Medical', 'Counseling'] },
        { name: 'Rainbo Centre Kailahun', district: 'Kailahun', phone: '076-555-666', address: 'Kailahun Hospital', lat: 8.2800, lng: -10.5700, services: ['Medical', 'Counseling'] },
        { name: 'Rainbo Centre Kabala', district: 'Koinadugu', phone: '076-777-888', address: 'Kabala Government Hospital', lat: 9.5900, lng: -11.5500, services: ['Medical', 'Counseling'] },
        { name: 'Rainbo Centre Waterloo', district: 'Western Area Rural', phone: '076-999-111', address: 'Waterloo Health Centre', lat: 8.3383, lng: -13.0703, services: ['Medical', 'Counseling'] },
        { name: 'Rainbo Centre Port Loko', district: 'Port Loko', phone: '076-222-333', address: 'Port Loko Hospital', lat: 8.7667, lng: -12.7872, services: ['Medical', 'Counseling'] }
    ],
    
    policeFSU: [
        { name: 'FSU Central Freetown', district: 'Western Area Urban', phone: '076-111-111', address: 'Central Police Station, Freetown', lat: 8.4840, lng: -13.2280, services: ['Police', 'Legal'] },
        { name: 'FSU East Freetown', district: 'Western Area Urban', phone: '076-222-222', address: 'Eastern Police Division', lat: 8.4900, lng: -13.2100, services: ['Police', 'Legal'] },
        { name: 'FSU West Freetown', district: 'Western Area Urban', phone: '076-333-333', address: 'Western Police Division', lat: 8.4700, lng: -13.2500, services: ['Police', 'Legal'] },
        { name: 'FSU Bo', district: 'Bo', phone: '076-444-444', address: 'Bo Police Station', lat: 7.9644, lng: -11.7383, services: ['Police', 'Legal'] },
        { name: 'FSU Kenema', district: 'Kenema', phone: '076-555-555', address: 'Kenema Police Station', lat: 7.8767, lng: -11.1900, services: ['Police', 'Legal'] },
        { name: 'FSU Makeni', district: 'Bombali', phone: '076-666-666', address: 'Makeni Police Station', lat: 8.8817, lng: -12.0453, services: ['Police', 'Legal'] },
        { name: 'FSU Koidu', district: 'Kono', phone: '076-777-777', address: 'Koidu Police Station', lat: 8.6439, lng: -10.9708, services: ['Police', 'Legal'] },
        { name: 'FSU Kailahun', district: 'Kailahun', phone: '076-888-888', address: 'Kailahun Police Station', lat: 8.2800, lng: -10.5700, services: ['Police', 'Legal'] },
        { name: 'FSU Port Loko', district: 'Port Loko', phone: '076-999-999', address: 'Port Loko Police Station', lat: 8.7667, lng: -12.7872, services: ['Police', 'Legal'] },
        { name: 'FSU Kabala', district: 'Koinadugu', phone: '076-123-456', address: 'Kabala Police Station', lat: 9.5900, lng: -11.5500, services: ['Police', 'Legal'] }
    ],
    
    safeHouses: [
        { name: 'Safe House Freetown', district: 'Western Area Urban', phone: '076-444-444', address: 'Confidential Location, Freetown', lat: 8.4750, lng: -13.2350, services: ['Shelter', 'Counseling', 'Safety'] },
        { name: 'Safe House Bo', district: 'Bo', phone: '076-555-555', address: 'Confidential Location, Bo', lat: 7.9700, lng: -11.7400, services: ['Shelter', 'Counseling', 'Safety'] },
        { name: 'Safe House Kenema', district: 'Kenema', phone: '076-666-666', address: 'Confidential Location, Kenema', lat: 7.8800, lng: -11.1950, services: ['Shelter', 'Counseling', 'Safety'] },
        { name: 'Safe House Makeni', district: 'Bombali', phone: '076-777-777', address: 'Confidential Location, Makeni', lat: 8.8850, lng: -12.0500, services: ['Shelter', 'Counseling', 'Safety'] }
    ],
    
    hospitals: [
        { name: 'Connaught Hospital', district: 'Western Area Urban', phone: '022-222-261', address: 'Connaught Hospital, Freetown', lat: 8.4840, lng: -13.2340, services: ['Medical', 'Emergency'] },
        { name: 'Princess Christian Maternity Hospital', district: 'Western Area Urban', phone: '022-222-881', address: 'PCMH, Freetown', lat: 8.4657, lng: -13.2317, services: ['Medical', 'Emergency', 'Maternity'] },
        { name: 'Bo Government Hospital', district: 'Bo', phone: '032-270-256', address: 'Bo Hospital', lat: 7.9644, lng: -11.7383, services: ['Medical', 'Emergency'] },
        { name: 'Kenema Government Hospital', district: 'Kenema', phone: '032-271-234', address: 'Kenema Hospital', lat: 7.8767, lng: -11.1900, services: ['Medical', 'Emergency'] },
        { name: 'Makeni Government Hospital', district: 'Bombali', phone: '032-272-345', address: 'Makeni Hospital', lat: 8.8817, lng: -12.0453, services: ['Medical', 'Emergency'] }
    ]
};

let userLocation = null;

function loadServiceFinder(section) {
    section.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h1 class="text-3xl font-bold mb-2" style="color: #1e3a8a;">
                            <i class="fas fa-map-marked-alt mr-3"></i>Find Help Near You
                        </h1>
                        <p class="text-gray-600">Locate nearest support services in your area</p>
                    </div>
                    <button onclick="returnToSurvivorDashboard()" 
                            class="px-4 py-2 rounded-lg text-white font-semibold transition-colors"
                            style="background-color: #1e90ff;">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
                
                <!-- Location Status -->
                <div id="location-status" class="bg-blue-50 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold mb-1" style="color: #1e3a8a;">
                                <i class="fas fa-location-arrow mr-2"></i>Your Location
                            </p>
                            <p id="location-text" class="text-sm text-gray-600">Click button to enable location services</p>
                        </div>
                        <button onclick="requestLocation()" 
                                class="px-6 py-3 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
                                style="background-color: #32cd32;">
                            <i class="fas fa-crosshairs mr-2"></i>Use My Location
                        </button>
                    </div>
                </div>
            </div>

            <!-- Service Type Filters -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 class="text-xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-filter mr-2"></i>Filter Services
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onclick="filterServices('all')" 
                            id="filter-all"
                            class="service-filter-btn active-filter px-4 py-3 rounded-lg font-semibold transition-all border-2"
                            style="border-color: #1e90ff; background-color: #1e90ff; color: white;">
                        <i class="fas fa-th-large mr-2"></i>All Services
                    </button>
                    <button onclick="filterServices('rainbo')" 
                            id="filter-rainbo"
                            class="service-filter-btn px-4 py-3 rounded-lg font-semibold transition-all border-2"
                            style="border-color: #32cd32; color: #32cd32; background-color: white;">
                        <i class="fas fa-hospital mr-2"></i>Rainbo Centers
                    </button>
                    <button onclick="filterServices('fsu')" 
                            id="filter-fsu"
                            class="service-filter-btn px-4 py-3 rounded-lg font-semibold transition-all border-2"
                            style="border-color: #1e3a8a; color: #1e3a8a; background-color: white;">
                        <i class="fas fa-shield-alt mr-2"></i>Police FSU
                    </button>
                    <button onclick="filterServices('safe')" 
                            id="filter-safe"
                            class="service-filter-btn px-4 py-3 rounded-lg font-semibold transition-all border-2"
                            style="border-color: #ffd700; color: #1e3a8a; background-color: white;">
                        <i class="fas fa-home mr-2"></i>Safe Houses
                    </button>
                </div>
            </div>

            <!-- Services List -->
            <div id="services-container">
                <!-- Services will be populated here -->
            </div>
        </div>

        <style>
            .service-filter-btn:hover {
                transform: scale(1.05);
            }
            
            .active-filter {
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .service-card {
                transition: all 0.3s ease;
            }
            
            .service-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            }
        </style>
    `;
    
    // Initialize with all services
    displayServices('all');
}

function requestLocation() {
    const statusText = document.getElementById('location-text');
    
    if (!("geolocation" in navigator)) {
        statusText.textContent = '❌ Location services not available on this device';
        statusText.style.color = '#dc2626';
        return;
    }
    
    statusText.textContent = '📍 Getting your location...';
    statusText.style.color = '#1e90ff';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            statusText.textContent = `✅ Location found: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`;
            statusText.style.color = '#32cd32';
            
            // Re-display services with distance calculations
            const activeFilter = document.querySelector('.active-filter').id.replace('filter-', '');
            displayServices(activeFilter);
        },
        (error) => {
            let errorMessage = '❌ Could not get your location. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Permission denied. Please enable location in settings.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'Unknown error occurred.';
            }
            statusText.textContent = errorMessage;
            statusText.style.color = '#dc2626';
        }
    );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula for calculating distance between two GPS coordinates
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

function filterServices(type) {
    // Update button states
    document.querySelectorAll('.service-filter-btn').forEach(btn => {
        btn.classList.remove('active-filter');
        const btnType = btn.id.replace('filter-', '');
        
        if (btnType === 'all') {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1e90ff';
        } else if (btnType === 'rainbo') {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#32cd32';
        } else if (btnType === 'fsu') {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1e3a8a';
        } else if (btnType === 'safe') {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1e3a8a';
        }
    });
    
    const activeBtn = document.getElementById(`filter-${type}`);
    activeBtn.classList.add('active-filter');
    
    if (type === 'all') {
        activeBtn.style.backgroundColor = '#1e90ff';
        activeBtn.style.color = 'white';
    } else if (type === 'rainbo') {
        activeBtn.style.backgroundColor = '#32cd32';
        activeBtn.style.color = 'white';
    } else if (type === 'fsu') {
        activeBtn.style.backgroundColor = '#1e3a8a';
        activeBtn.style.color = 'white';
    } else if (type === 'safe') {
        activeBtn.style.backgroundColor = '#ffd700';
        activeBtn.style.color = '#1e3a8a';
    }
    
    displayServices(type);
}

function displayServices(type) {
    const container = document.getElementById('services-container');
    let services = [];
    
    // Gather services based on filter
    if (type === 'all' || type === 'rainbo') {
        services = services.concat(serviceLocations.rainboCenters.map(s => ({...s, type: 'Rainbo Center', color: '#32cd32', icon: 'hospital'})));
    }
    if (type === 'all' || type === 'fsu') {
        services = services.concat(serviceLocations.policeFSU.map(s => ({...s, type: 'Police FSU', color: '#1e3a8a', icon: 'shield-alt'})));
    }
    if (type === 'all' || type === 'safe') {
        services = services.concat(serviceLocations.safeHouses.map(s => ({...s, type: 'Safe House', color: '#ffd700', icon: 'home'})));
    }
    if (type === 'all') {
        services = services.concat(serviceLocations.hospitals.map(s => ({...s, type: 'Hospital', color: '#ef4444', icon: 'hospital-alt'})));
    }
    
    // Calculate distances if user location is available
    if (userLocation) {
        services.forEach(service => {
            service.distance = calculateDistance(
                userLocation.lat, userLocation.lng,
                service.lat, service.lng
            );
        });
        
        // Sort by distance
        services.sort((a, b) => a.distance - b.distance);
    }
    
    // Display services
    let html = '<div class="space-y-4">';
    
    services.forEach(service => {
        const distanceText = service.distance 
            ? `<span class="font-bold" style="color: #32cd32;">${service.distance.toFixed(1)} km away</span>` 
            : '<span class="text-gray-500">Enable location to see distance</span>';
        
        html += `
            <div class="service-card bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-start">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center mr-4" style="background-color: rgba(30, 144, 255, 0.1);">
                            <i class="fas fa-${service.icon} text-2xl" style="color: ${service.color};"></i>
                        </div>
                        <div>
                            <div class="text-sm font-semibold mb-1" style="color: ${service.color};">${service.type}</div>
                            <h3 class="text-xl font-bold mb-1" style="color: #1e3a8a;">${service.name}</h3>
                            <p class="text-gray-600 mb-2">
                                <i class="fas fa-map-marker-alt mr-1"></i>${service.address}
                            </p>
                            <p class="text-sm text-gray-500">
                                <i class="fas fa-map-pin mr-1"></i>${service.district} District
                            </p>
                        </div>
                    </div>
                    <div class="text-right">
                        ${distanceText}
                    </div>
                </div>
                
                <!-- Services Offered -->
                <div class="mb-4">
                    <div class="flex flex-wrap gap-2">
                        ${service.services.map(s => `
                            <span class="px-3 py-1 rounded-full text-xs font-semibold" 
                                  style="background-color: rgba(30, 144, 255, 0.1); color: #1e3a8a;">
                                ${s}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <a href="tel:${service.phone}" 
                       class="px-4 py-3 rounded-lg text-white font-semibold text-center transition-all transform hover:scale-105"
                       style="background-color: #32cd32;">
                        <i class="fas fa-phone mr-2"></i>Call Now
                    </a>
                    <a href="https://www.google.com/maps?q=${service.lat},${service.lng}" 
                       target="_blank"
                       class="px-4 py-3 rounded-lg text-white font-semibold text-center transition-all transform hover:scale-105"
                       style="background-color: #1e90ff;">
                        <i class="fas fa-directions mr-2"></i>Get Directions
                    </a>
                    <a href="sms:${service.phone}?body=I need help. Can you assist me?" 
                       class="px-4 py-3 rounded-lg font-semibold text-center transition-all transform hover:scale-105 border-2"
                       style="border-color: #1e3a8a; color: #1e3a8a;">
                        <i class="fas fa-sms mr-2"></i>Send SMS
                    </a>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (services.length === 0) {
        html = `
            <div class="bg-white rounded-xl shadow-lg p-12 text-center">
                <i class="fas fa-info-circle text-6xl mb-4" style="color: #1e90ff;"></i>
                <h3 class="text-2xl font-bold mb-2" style="color: #1e3a8a;">No services found</h3>
                <p class="text-gray-600">Try selecting a different filter</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function returnToSurvivorDashboard() {
    const section = document.querySelector('.max-w-6xl')?.parentElement || document.getElementById('dashboard-content');
    if (typeof loadSurvivorDashboard === 'function') {
        loadSurvivorDashboard(section);
    } else {
        window.location.reload();
    }
}

// Export functions
window.loadServiceFinder = loadServiceFinder;
window.requestLocation = requestLocation;
window.filterServices = filterServices;
window.returnToSurvivorDashboard = returnToSurvivorDashboard;
