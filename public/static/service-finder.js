/**
 * GPS Service Finder
 * Locate nearby GBV support services with GPS integration
 */

// Service database for Sierra Leone
const serviceDatabase = [
    // Freetown Services
    {
        id: 1,
        name: 'Rainbo Initiative Freetown',
        type: 'Rainbo Centre',
        district: 'Western Area Urban',
        address: 'Princess Christian Maternity Hospital, Freetown',
        phone: '+232 76 777 777',
        services: ['Medical Care', 'Counseling', 'Police Liaison', 'Legal Support', '24/7 Emergency'],
        hours: '24/7',
        latitude: 8.4657,
        longitude: -13.2317,
        description: 'Comprehensive one-stop center for GBV survivors with medical, psychosocial, and legal support.'
    },
    {
        id: 2,
        name: 'Police Family Support Unit - Central',
        type: 'Police FSU',
        district: 'Western Area Urban',
        address: 'Central Police Station, Freetown',
        phone: '+232 76 111 111',
        services: ['Police Reports', 'Investigation', 'Protection Orders', 'Court Support'],
        hours: '24/7',
        latitude: 8.4840,
        longitude: -13.2299,
        description: 'Specialized police unit for family and gender-based violence cases.'
    },
    {
        id: 3,
        name: 'Women in Crisis Safe House',
        type: 'Safe House',
        district: 'Western Area Urban',
        address: 'Confidential Location (Call for address)',
        phone: '+232 76 444 444',
        services: ['Emergency Shelter', 'Food & Clothing', 'Counseling', 'Child Care'],
        hours: '24/7 Admission',
        latitude: 8.4500,
        longitude: -13.2500,
        description: 'Secure temporary shelter for women and children escaping violence.'
    },
    {
        id: 4,
        name: 'Court User Committee - Freetown',
        type: 'Legal Support',
        district: 'Western Area Urban',
        address: 'High Court Complex, Freetown',
        phone: '+232 76 200 200',
        services: ['Legal Aid', 'Court Accompaniment', 'Legal Information', 'Paralegal Support'],
        hours: 'Mon-Fri 8:30am-4:30pm',
        latitude: 8.4700,
        longitude: -13.2340,
        description: 'Free legal assistance and court support for GBV survivors.'
    },
    {
        id: 5,
        name: 'Lifeline Nehemiah Projects',
        type: 'Counseling Center',
        district: 'Western Area Urban',
        address: 'Congo Cross, Freetown',
        phone: '+232 76 300 300',
        services: ['Trauma Counseling', 'Support Groups', 'Skills Training', 'Reintegration Support'],
        hours: 'Mon-Sat 9am-5pm',
        latitude: 8.4600,
        longitude: -13.2280,
        description: 'Psychosocial support and rehabilitation services for survivors.'
    },
    
    // Bo District
    {
        id: 6,
        name: 'Rainbo Initiative Bo',
        type: 'Rainbo Centre',
        district: 'Bo',
        address: 'Bo Government Hospital',
        phone: '+232 76 888 888',
        services: ['Medical Care', 'Counseling', 'Police Liaison', 'Legal Support', '24/7 Emergency'],
        hours: '24/7',
        latitude: 7.9644,
        longitude: -11.7380,
        description: 'Comprehensive GBV support center in Bo District.'
    },
    {
        id: 7,
        name: 'Police FSU Bo',
        type: 'Police FSU',
        district: 'Bo',
        address: 'Bo Central Police Station',
        phone: '+232 76 222 222',
        services: ['Police Reports', 'Investigation', 'Protection Orders'],
        hours: '24/7',
        latitude: 7.9620,
        longitude: -11.7400,
        description: 'Family Support Unit for Bo District.'
    },
    {
        id: 8,
        name: 'Bo Safe House',
        type: 'Safe House',
        district: 'Bo',
        address: 'Confidential Location (Call for address)',
        phone: '+232 76 555 555',
        services: ['Emergency Shelter', 'Food & Clothing', 'Counseling'],
        hours: '24/7 Admission',
        latitude: 7.9650,
        longitude: -11.7350,
        description: 'Secure shelter for women and children in Bo District.'
    },
    
    // Kenema District
    {
        id: 9,
        name: 'Rainbo Initiative Kenema',
        type: 'Rainbo Centre',
        district: 'Kenema',
        address: 'Kenema Government Hospital',
        phone: '+232 76 999 999',
        services: ['Medical Care', 'Counseling', 'Police Liaison', 'Legal Support', '24/7 Emergency'],
        hours: '24/7',
        latitude: 7.8767,
        longitude: -11.1900,
        description: 'Comprehensive GBV support center in Kenema District.'
    },
    {
        id: 10,
        name: 'Police FSU Kenema',
        type: 'Police FSU',
        district: 'Kenema',
        address: 'Kenema Police Station',
        phone: '+232 76 333 333',
        services: ['Police Reports', 'Investigation', 'Protection Orders'],
        hours: '24/7',
        latitude: 7.8750,
        longitude: -11.1920,
        description: 'Family Support Unit for Kenema District.'
    },
    
    // Makeni (Bombali)
    {
        id: 11,
        name: 'One-Stop Centre Makeni',
        type: 'One-Stop Centre',
        district: 'Bombali',
        address: 'Makeni Government Hospital',
        phone: '+232 76 666 666',
        services: ['Medical Care', 'Counseling', 'Police Liaison', 'Legal Support'],
        hours: 'Mon-Fri 8am-5pm',
        latitude: 8.8852,
        longitude: -12.0436,
        description: 'Integrated GBV support services in Makeni.'
    },
    {
        id: 12,
        name: 'Police FSU Makeni',
        type: 'Police FSU',
        district: 'Bombali',
        address: 'Makeni Police Station',
        phone: '+232 76 444 444',
        services: ['Police Reports', 'Investigation', 'Protection Orders'],
        hours: '24/7',
        latitude: 8.8900,
        longitude: -12.0450,
        description: 'Family Support Unit for Bombali District.'
    }
];

let userLatitude = null;
let userLongitude = null;
let gpsEnabled = false;

function loadServiceFinder(section) {
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
                <button onclick="loadSurvivorPortal(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Survivor Portal
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-map-marked-alt text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">Find Help Near You</h1>
                        <p class="text-xl text-green-50">Locate support services in your area</p>
                    </div>
                </div>
            </div>

            <!-- GPS Location -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex items-start mb-4">
                    <i class="fas fa-location-arrow text-green-600 text-3xl mr-4"></i>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-gray-800 mb-2">Use My Location</h3>
                        <p class="text-sm text-gray-600 mb-4">
                            Enable GPS to find the closest services. Your location is only used for this search and is not stored.
                        </p>
                        <button onclick="enableGPS()" id="gps-button"
                                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold">
                            <i class="fas fa-location-arrow mr-2"></i>Enable GPS
                        </button>
                        <div id="gps-status" class="mt-3 hidden"></div>
                    </div>
                </div>
            </div>

            <!-- Search by District -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">
                    <i class="fas fa-search mr-2"></i>Search by District
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Select District</label>
                        <select id="district-select" onchange="filterByDistrict(this.value)"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            <option value="">All Districts</option>
                            <option value="Western Area Urban">Western Area Urban (Freetown)</option>
                            <option value="Western Area Rural">Western Area Rural</option>
                            <option value="Bo">Bo</option>
                            <option value="Bombali">Bombali (Makeni)</option>
                            <option value="Kenema">Kenema</option>
                            <option value="Kailahun">Kailahun</option>
                            <option value="Kambia">Kambia</option>
                            <option value="Koinadugu">Koinadugu</option>
                            <option value="Kono">Kono</option>
                            <option value="Moyamba">Moyamba</option>
                            <option value="Port Loko">Port Loko</option>
                            <option value="Pujehun">Pujehun</option>
                            <option value="Tonkolili">Tonkolili</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                        <select id="service-type-select" onchange="filterServices()"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            <option value="">All Services</option>
                            <option value="Rainbo Centre">Rainbo Centres (24/7 Medical)</option>
                            <option value="Police FSU">Police Family Support Units</option>
                            <option value="Safe House">Safe Houses (Shelter)</option>
                            <option value="Legal Support">Legal Aid</option>
                            <option value="Counseling Center">Counseling Services</option>
                            <option value="One-Stop Centre">One-Stop Centres</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Emergency Contact Box -->
            <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-red-800 mb-1">
                            <i class="fas fa-phone-volume mr-2"></i>National Emergency Hotline
                        </h3>
                        <p class="text-red-700">Free, confidential support 24/7</p>
                    </div>
                    <a href="tel:116" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold text-xl">
                        <i class="fas fa-phone-alt mr-2"></i>116
                    </a>
                </div>
            </div>

            <!-- Services List -->
            <div id="services-container" class="space-y-4">
                <!-- Services will be populated here -->
            </div>
        </div>
    `;

    // Initial load - show all services
    displayServices(serviceDatabase);
}

// Enable GPS
async function enableGPS() {
    const button = document.getElementById('gps-button');
    const status = document.getElementById('gps-status');
    
    if (!button || !status) return;
    
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Getting location...';
    
    if (!navigator.geolocation) {
        status.innerHTML = `
            <div class="bg-red-100 border border-red-300 rounded-lg p-3 text-red-800">
                <i class="fas fa-exclamation-circle mr-2"></i>GPS not supported by your browser
            </div>
        `;
        status.classList.remove('hidden');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-location-arrow mr-2"></i>Enable GPS';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            gpsEnabled = true;

            status.innerHTML = `
                <div class="bg-green-100 border border-green-300 rounded-lg p-3 text-green-800">
                    <i class="fas fa-check-circle mr-2"></i>Location found! Showing nearest services first.
                </div>
            `;
            status.classList.remove('hidden');
            
            button.innerHTML = '<i class="fas fa-check mr-2"></i>GPS Enabled';
            button.classList.remove('bg-green-600', 'hover:bg-green-700');
            button.classList.add('bg-gray-400');

            // Sort and display services by distance
            const sortedServices = sortServicesByDistance(serviceDatabase);
            displayServices(sortedServices);
        },
        (error) => {
            let errorMessage = 'Could not get your location.';
            if (error.code === 1) {
                errorMessage = 'Location access denied. Please check browser settings.';
            } else if (error.code === 2) {
                errorMessage = 'Location unavailable. Please try again.';
            }

            status.innerHTML = `
                <div class="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-yellow-800">
                    <i class="fas fa-exclamation-triangle mr-2"></i>${errorMessage}
                </div>
            `;
            status.classList.remove('hidden');
            
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-location-arrow mr-2"></i>Try Again';
            
            // Show services without distance sorting
            displayServices(serviceDatabase);
        }
    );
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Sort services by distance from user
function sortServicesByDistance(services) {
    if (!gpsEnabled || !userLatitude || !userLongitude) {
        return services;
    }

    return services.map(service => ({
        ...service,
        distance: calculateDistance(userLatitude, userLongitude, service.latitude, service.longitude)
    })).sort((a, b) => a.distance - b.distance);
}

// Filter services by district
function filterByDistrict(district) {
    filterServices();
}

// Filter services
function filterServices() {
    const district = document.getElementById('district-select')?.value || '';
    const serviceType = document.getElementById('service-type-select')?.value || '';

    let filtered = serviceDatabase;

    if (district) {
        filtered = filtered.filter(s => s.district === district);
    }

    if (serviceType) {
        filtered = filtered.filter(s => s.type === serviceType);
    }

    if (gpsEnabled) {
        filtered = sortServicesByDistance(filtered);
    }

    displayServices(filtered);
}

// Display services
function displayServices(services) {
    const container = document.getElementById('services-container');
    if (!container) return;

    if (services.length === 0) {
        container.innerHTML = `
            <div class="bg-gray-50 rounded-xl p-8 text-center">
                <i class="fas fa-search text-gray-400 text-5xl mb-4"></i>
                <p class="text-gray-600 text-lg">No services found matching your criteria.</p>
                <p class="text-gray-500 text-sm mt-2">Try selecting a different district or service type.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = services.map((service, index) => {
        const serviceTypeColors = {
            'Rainbo Centre': 'green',
            'Police FSU': 'blue',
            'Safe House': 'purple',
            'Legal Support': 'orange',
            'Counseling Center': 'pink',
            'One-Stop Centre': 'teal'
        };
        
        const color = serviceTypeColors[service.type] || 'gray';
        const distanceText = service.distance 
            ? `<div class="text-${color}-600 font-semibold text-sm">
                   <i class="fas fa-map-marker-alt mr-1"></i>${service.distance.toFixed(1)} km away
               </div>`
            : '';

        return `
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border-l-4 border-${color}-600">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <h3 class="text-xl font-bold text-gray-800">${service.name}</h3>
                                ${index === 0 && gpsEnabled ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">NEAREST</span>' : ''}
                            </div>
                            <div class="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                <span class="px-3 py-1 bg-${color}-100 text-${color}-800 rounded-full font-semibold">
                                    ${service.type}
                                </span>
                                <span><i class="fas fa-map-pin mr-1"></i>${service.district}</span>
                            </div>
                            ${distanceText}
                        </div>
                    </div>

                    <p class="text-gray-600 text-sm mb-4">${service.description}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div class="text-xs font-semibold text-gray-500 uppercase mb-1">Address</div>
                            <div class="text-sm text-gray-700">
                                <i class="fas fa-location-dot mr-1 text-${color}-600"></i>${service.address}
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-gray-500 uppercase mb-1">Hours</div>
                            <div class="text-sm text-gray-700">
                                <i class="fas fa-clock mr-1 text-${color}-600"></i>${service.hours}
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="text-xs font-semibold text-gray-500 uppercase mb-2">Services Offered</div>
                        <div class="flex flex-wrap gap-2">
                            ${service.services.map(s => `
                                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    <i class="fas fa-check text-green-600 mr-1"></i>${s}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <a href="tel:${service.phone}" 
                           class="flex-1 px-4 py-3 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-all text-center font-semibold">
                            <i class="fas fa-phone-alt mr-2"></i>Call Now
                        </a>
                        <a href="https://www.google.com/maps/search/?api=1&query=${service.latitude},${service.longitude}" 
                           target="_blank"
                           class="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-center font-semibold">
                            <i class="fas fa-directions mr-2"></i>Get Directions
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Export functions
window.loadServiceFinder = loadServiceFinder;
window.enableGPS = enableGPS;
window.filterByDistrict = filterByDistrict;
window.filterServices = filterServices;
