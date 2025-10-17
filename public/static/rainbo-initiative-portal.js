// Rainbo Initiative Portal - Partner Resource Management System
console.log('🌈 Rainbo Initiative Portal Loading...');

// Rainbo Initiative Partner Portal for GBV Support Services
window.rainboPortal = (function() {
    
    // Rainbo Initiative service offerings and resources
    const rainboServices = {
        'medical': {
            name: 'Medical & Healthcare Services',
            icon: 'fa-heartbeat',
            color: 'red',
            description: 'Emergency medical care, treatment, and health support',
            capacity: 150,
            currentLoad: 89,
            resources: [
                { name: 'Emergency Medical Kits', available: 45, total: 60, unit: 'kits' },
                { name: 'Medical Staff (On-call)', available: 8, total: 12, unit: 'staff' },
                { name: 'Ambulance Services', available: 3, total: 4, unit: 'vehicles' },
                { name: 'Hospital Bed Allocation', available: 15, total: 25, unit: 'beds' }
            ]
        },
        'counseling': {
            name: 'Psychosocial Support & Counseling',
            icon: 'fa-heart',
            color: 'purple',
            description: 'Trauma counseling, mental health support, and emotional healing',
            capacity: 200,
            currentLoad: 134,
            resources: [
                { name: 'Trained Counselors', available: 12, total: 18, unit: 'counselors' },
                { name: 'Group Therapy Sessions', available: 8, total: 10, unit: 'sessions/week' },
                { name: 'Child Psychologists', available: 4, total: 6, unit: 'specialists' },
                { name: 'Crisis Intervention Team', available: 2, total: 3, unit: 'teams' }
            ]
        },
        'shelter': {
            name: 'Safe House & Emergency Shelter',
            icon: 'fa-home',
            color: 'blue',
            description: 'Secure accommodation and temporary housing for survivors',
            capacity: 80,
            currentLoad: 67,
            resources: [
                { name: 'Safe House Beds (Adults)', available: 13, total: 50, unit: 'beds' },
                { name: 'Children Accommodation', available: 8, total: 20, unit: 'beds' },
                { name: 'Security Personnel', available: 6, total: 8, unit: 'guards' },
                { name: 'Emergency Housing Funds', available: 25000, total: 50000, unit: 'SLL' }
            ]
        },
        'nutrition': {
            name: 'Nutrition & Food Support',
            icon: 'fa-utensils',
            color: 'green',
            description: 'Meal provision, nutrition programs, and food assistance',
            capacity: 300,
            currentLoad: 198,
            resources: [
                { name: 'Daily Meal Portions', available: 102, total: 300, unit: 'meals' },
                { name: 'Food Packages (Weekly)', available: 25, total: 40, unit: 'packages' },
                { name: 'Nutrition Supplements', available: 150, total: 200, unit: 'units' },
                { name: 'Special Diet Programs', available: 8, total: 12, unit: 'programs' }
            ]
        },
        'economic': {
            name: 'Economic Empowerment',
            icon: 'fa-coins',
            color: 'yellow',
            description: 'Skills training, micro-finance, and livelihood support',
            capacity: 100,
            currentLoad: 67,
            resources: [
                { name: 'Skills Training Slots', available: 33, total: 100, unit: 'slots' },
                { name: 'Micro-loan Funds', available: 180000, total: 300000, unit: 'SLL' },
                { name: 'Business Mentors', available: 8, total: 15, unit: 'mentors' },
                { name: 'Equipment/Tools', available: 45, total: 60, unit: 'sets' }
            ]
        }
    };

    // Current active cases served by Rainbo
    const activeCases = [
        {
            id: 'GBV-SL-2024-001',
            survivor_id: 'SURV-001',
            district: 'Western Area Urban',
            case_type: 'domestic_violence',
            services_provided: ['medical', 'counseling', 'shelter'],
            entry_date: '2024-01-10',
            status: 'active',
            progress: {
                medical: 85,
                counseling: 60,
                shelter: 100
            },
            next_appointment: '2024-01-18',
            assigned_staff: ['Dr. Sarah Johnson', 'Counselor Mary Kamara'],
            notes: 'Making good progress. Physical injuries healed. Continuing trauma counseling.'
        },
        {
            id: 'GBV-SL-2024-002',
            survivor_id: 'SURV-002',
            district: 'Bo',
            case_type: 'sexual_violence',
            services_provided: ['medical', 'counseling', 'nutrition'],
            entry_date: '2024-01-12',
            status: 'active',
            progress: {
                medical: 95,
                counseling: 45,
                nutrition: 80
            },
            next_appointment: '2024-01-20',
            assigned_staff: ['Dr. Ahmed Sesay', 'Counselor Fatmata Bangura'],
            notes: 'Medical treatment completed. Focusing on psychological recovery and nutrition support.'
        },
        {
            id: 'GBV-SL-2024-003',
            survivor_id: 'SURV-003',
            district: 'Kenema',
            case_type: 'child_abuse',
            services_provided: ['medical', 'counseling', 'shelter', 'nutrition'],
            entry_date: '2024-01-08',
            status: 'active',
            progress: {
                medical: 70,
                counseling: 35,
                shelter: 100,
                nutrition: 90
            },
            next_appointment: '2024-01-19',
            assigned_staff: ['Dr. Aminata Koroma', 'Child Counselor Ibrahim Conteh'],
            notes: 'Child showing signs of recovery. Specialized counseling needed. Safe in shelter.'
        }
    ];

    // Service delivery statistics
    const deliveryStats = {
        totalBeneficiaries: 1247,
        activeCases: 89,
        completedCases: 1158,
        satisfactionRate: 96.8,
        avgServiceDuration: '45 days',
        monthlyGrowth: 12.3,
        staffUtilization: 87.4,
        resourceUtilization: 78.9
    };

    // Staff information
    const rainboStaff = [
        {
            id: 'STAFF-001',
            name: 'Dr. Sarah Johnson',
            role: 'Medical Director',
            specialization: 'Emergency Medicine',
            availability: 'Available',
            currentCases: 12,
            maxCapacity: 15,
            contact: '+232-76-123456',
            languages: ['English', 'Krio'],
            experience: '8 years'
        },
        {
            id: 'STAFF-002',
            name: 'Mary Kamara',
            role: 'Senior Counselor',
            specialization: 'Trauma Therapy',
            availability: 'In Session',
            currentCases: 18,
            maxCapacity: 20,
            contact: '+232-78-987654',
            languages: ['Krio', 'Mende'],
            experience: '6 years'
        },
        {
            id: 'STAFF-003',
            name: 'Fatmata Bangura',
            role: 'Shelter Coordinator',
            specialization: 'Safe Housing Management',
            availability: 'Available',
            currentCases: 25,
            maxCapacity: 30,
            contact: '+232-77-456789',
            languages: ['English', 'Temne'],
            experience: '4 years'
        },
        {
            id: 'STAFF-004',
            name: 'Ibrahim Conteh',
            role: 'Child Protection Officer',
            specialization: 'Child Psychology',
            availability: 'On Call',
            currentCases: 8,
            maxCapacity: 12,
            contact: '+232-79-321654',
            languages: ['English', 'Krio', 'Mende'],
            experience: '5 years'
        }
    ];

    // Initialize Rainbo Initiative portal
    function initializeRainboPortal() {
        console.log('🚀 Initializing Rainbo Initiative Portal...');
        
        // Create Rainbo portal interface
        createRainboPortalInterface();
        
        // Populate portal data
        populatePortalData();
        
        // Set up event listeners
        setupRainboEventListeners();
        
        // Initialize real-time features
        initializeRainboRealTime();
        
        console.log('✅ Rainbo Initiative Portal initialized successfully!');
    }

    // Create Rainbo portal interface
    function createRainboPortalInterface() {
        // Add Rainbo access button to main navigation
        addRainboAccessButton();
        
        // Create Rainbo portal modal
        createRainboPortalModal();
    }

    // Add Rainbo access button
    function addRainboAccessButton() {
        const navTabs = document.querySelector('.flex.space-x-4.overflow-x-auto');
        if (!navTabs || document.getElementById('rainbo-portal-tab')) return;

        const rainboTab = document.createElement('button');
        rainboTab.id = 'rainbo-portal-tab';
        rainboTab.className = 'dashboard-tab border-b-2 border-transparent py-4 px-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg';
        rainboTab.innerHTML = `
            <i class="fas fa-rainbow mr-2"></i>
            <span class="font-semibold">Rainbo Initiative</span>
            <span class="ml-2 bg-pink-600 px-2 py-1 rounded-full text-xs">Partner</span>
        `;
        
        // Insert after Voice/IVR tab
        const voiceTab = [...navTabs.children].find(tab => tab.textContent.includes('Voice/IVR'));
        if (voiceTab) {
            navTabs.insertBefore(rainboTab, voiceTab.nextSibling);
        } else {
            navTabs.appendChild(rainboTab);
        }
    }

    // Create Rainbo portal modal
    function createRainboPortalModal() {
        const existingModal = document.getElementById('rainbo-portal-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'rainbo-portal-modal';
        modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto';
        modal.innerHTML = `
            <div class="min-h-screen px-4 py-8">
                <div class="bg-white rounded-lg shadow-xl max-w-7xl mx-auto">
                    <!-- Rainbo Header -->
                    <div class="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white p-6 rounded-t-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <i class="fas fa-rainbow text-pink-600 text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-3xl font-bold">Rainbo Initiative</h2>
                                    <p class="mt-1 text-pink-100">Partner Portal - Comprehensive GBV Support Services</p>
                                    <div class="flex items-center mt-2">
                                        <i class="fas fa-heart mr-2"></i>
                                        <span class="text-sm">Healing • Support • Empowerment</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold" id="rainbo-active-cases">89</div>
                                <div class="text-sm text-pink-200">Active Cases</div>
                                <button id="close-rainbo-portal" class="mt-2 text-white hover:text-pink-200">
                                    <i class="fas fa-times text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Rainbo Content -->
                    <div class="p-6">
                        <!-- Service Dashboard Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div class="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Total Beneficiaries</p>
                                        <p class="text-3xl font-bold" id="total-beneficiaries">1,247</p>
                                    </div>
                                    <i class="fas fa-users text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Satisfaction Rate</p>
                                        <p class="text-3xl font-bold" id="satisfaction-rate">96.8%</p>
                                    </div>
                                    <i class="fas fa-star text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Staff Utilization</p>
                                        <p class="text-3xl font-bold" id="staff-utilization">87.4%</p>
                                    </div>
                                    <i class="fas fa-chart-line text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Monthly Growth</p>
                                        <p class="text-3xl font-bold" id="monthly-growth">12.3%</p>
                                    </div>
                                    <i class="fas fa-arrow-up text-2xl opacity-80"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Service Categories -->
                        <div class="mb-8">
                            <h3 class="text-2xl font-bold text-gray-900 mb-6">
                                <i class="fas fa-hands-helping mr-3 text-pink-600"></i>
                                Service Categories & Resource Availability
                            </h3>
                            <div id="rainbo-services" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"></div>
                        </div>

                        <!-- Active Cases Management -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <!-- Current Cases -->
                            <div class="bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-xl font-semibold text-gray-900">
                                            <i class="fas fa-folder-open mr-2 text-blue-600"></i>
                                            Active Cases
                                        </h4>
                                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            ${activeCases.length} cases
                                        </span>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <div id="rainbo-active-cases-list" class="space-y-4 max-h-80 overflow-y-auto"></div>
                                </div>
                            </div>

                            <!-- Staff Management -->
                            <div class="bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <h4 class="text-xl font-semibold text-gray-900">
                                        <i class="fas fa-user-md mr-2 text-green-600"></i>
                                        Staff Status & Availability
                                    </h4>
                                </div>
                                <div class="p-6">
                                    <div id="rainbo-staff-list" class="space-y-4"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Real-time Notifications -->
                        <div class="bg-white border rounded-lg shadow-lg mb-8">
                            <div class="p-6 border-b border-gray-200">
                                <h4 class="text-xl font-semibold text-gray-900">
                                    <i class="fas fa-bell mr-2 text-orange-600"></i>
                                    Real-time Service Requests & Alerts
                                </h4>
                            </div>
                            <div class="p-6">
                                <div id="rainbo-notifications" class="space-y-3"></div>
                            </div>
                        </div>

                        <!-- Resource Management -->
                        <div class="bg-white border rounded-lg shadow-lg">
                            <div class="p-6 border-b border-gray-200">
                                <h4 class="text-xl font-semibold text-gray-900">
                                    <i class="fas fa-boxes mr-2 text-purple-600"></i>
                                    Resource Management & Inventory
                                </h4>
                            </div>
                            <div class="p-6">
                                <div id="rainbo-resources" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Populate portal data
    function populatePortalData() {
        populateServiceCategories();
        populateActiveCases();
        populateStaffStatus();
        populateResourceManagement();
        generateRainboNotifications();
    }

    // Populate service categories
    function populateServiceCategories() {
        const servicesContainer = document.getElementById('rainbo-services');
        if (!servicesContainer) return;

        servicesContainer.innerHTML = Object.entries(rainboServices).map(([key, service]) => {
            const utilizationPercentage = Math.round((service.currentLoad / service.capacity) * 100);
            const utilizationColor = utilizationPercentage > 85 ? 'red' : utilizationPercentage > 70 ? 'yellow' : 'green';
            
            return `
                <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center">
                            <i class="fas ${service.icon} text-${service.color}-600 text-xl"></i>
                        </div>
                        <div>
                            <h5 class="font-semibold text-gray-900">${service.name}</h5>
                            <p class="text-sm text-gray-600">${service.description}</p>
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Capacity Utilization</span>
                            <span class="font-medium text-${utilizationColor}-600">${utilizationPercentage}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-${utilizationColor}-500 h-2 rounded-full" style="width: ${utilizationPercentage}%"></div>
                        </div>
                        <div class="text-xs text-gray-500">${service.currentLoad} / ${service.capacity} capacity</div>
                    </div>
                    
                    <div class="text-sm">
                        <div class="font-medium text-gray-800 mb-2">Available Resources:</div>
                        ${service.resources.slice(0, 2).map(resource => `
                            <div class="flex justify-between">
                                <span class="text-gray-600">${resource.name}</span>
                                <span class="font-medium">${resource.available}/${resource.total}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="mt-4 w-full bg-${service.color}-600 text-white py-2 px-4 rounded-md hover:bg-${service.color}-700 text-sm">
                        <i class="fas fa-eye mr-2"></i>View Details
                    </button>
                </div>
            `;
        }).join('');
    }

    // Populate active cases
    function populateActiveCases() {
        const casesContainer = document.getElementById('rainbo-active-cases-list');
        if (!casesContainer) return;

        casesContainer.innerHTML = activeCases.map(caseItem => {
            const overallProgress = Math.round(
                Object.values(caseItem.progress).reduce((sum, progress) => sum + progress, 0) / 
                Object.keys(caseItem.progress).length
            );
            
            const progressColor = overallProgress >= 80 ? 'green' : overallProgress >= 50 ? 'yellow' : 'red';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <span class="font-medium text-gray-900">${caseItem.id}</span>
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                    ${caseItem.case_type.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            
                            <div class="mt-2 text-sm text-gray-600">
                                <div><strong>District:</strong> ${caseItem.district}</div>
                                <div><strong>Entry Date:</strong> ${caseItem.entry_date}</div>
                                <div><strong>Next Appointment:</strong> ${caseItem.next_appointment}</div>
                            </div>
                            
                            <div class="mt-3">
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Overall Progress</span>
                                    <span class="font-medium text-${progressColor}-600">${overallProgress}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-${progressColor}-500 h-2 rounded-full" style="width: ${overallProgress}%"></div>
                                </div>
                            </div>
                            
                            <div class="mt-2 flex flex-wrap gap-1">
                                ${caseItem.services_provided.map(service => `
                                    <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                                        ${service}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4">
                            <i class="fas fa-edit mr-1"></i>Update
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate staff status
    function populateStaffStatus() {
        const staffContainer = document.getElementById('rainbo-staff-list');
        if (!staffContainer) return;

        staffContainer.innerHTML = rainboStaff.map(staff => {
            const utilizationPercentage = Math.round((staff.currentCases / staff.maxCapacity) * 100);
            const statusColor = {
                'Available': 'green',
                'In Session': 'blue',
                'On Call': 'yellow',
                'Unavailable': 'red'
            }[staff.availability] || 'gray';
            
            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-md text-gray-600"></i>
                        </div>
                        <div>
                            <h6 class="font-medium text-gray-900">${staff.name}</h6>
                            <p class="text-sm text-gray-600">${staff.role}</p>
                            <div class="text-xs text-gray-500">
                                ${staff.currentCases}/${staff.maxCapacity} cases (${utilizationPercentage}%)
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-right">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800">
                            ${staff.availability}
                        </span>
                        <div class="text-xs text-gray-500 mt-1">${staff.languages.join(', ')}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate resource management
    function populateResourceManagement() {
        const resourcesContainer = document.getElementById('rainbo-resources');
        if (!resourcesContainer) return;

        // Flatten all resources from all services
        const allResources = Object.values(rainboServices).flatMap(service => 
            service.resources.map(resource => ({
                ...resource,
                serviceCategory: service.name,
                color: service.color
            }))
        );

        resourcesContainer.innerHTML = allResources.map(resource => {
            const availabilityPercentage = Math.round((resource.available / resource.total) * 100);
            const statusColor = availabilityPercentage > 50 ? 'green' : availabilityPercentage > 20 ? 'yellow' : 'red';
            
            return `
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <h6 class="font-medium text-gray-900 text-sm">${resource.name}</h6>
                        <span class="text-xs bg-${resource.color}-100 text-${resource.color}-700 px-2 py-1 rounded">
                            ${resource.unit}
                        </span>
                    </div>
                    
                    <div class="text-2xl font-bold text-gray-900 mb-1">${resource.available}</div>
                    <div class="text-sm text-gray-600 mb-3">of ${resource.total} available</div>
                    
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="bg-${statusColor}-500 h-2 rounded-full" style="width: ${availabilityPercentage}%"></div>
                    </div>
                    
                    <div class="text-xs text-gray-500">${availabilityPercentage}% available</div>
                </div>
            `;
        }).join('');
    }

    // Generate Rainbo notifications
    function generateRainboNotifications() {
        const notificationsContainer = document.getElementById('rainbo-notifications');
        if (!notificationsContainer) return;

        const sampleNotifications = [
            {
                type: 'service_request',
                message: 'New medical assistance request from Case GBV-SL-2024-004',
                time: '2 minutes ago',
                priority: 'high',
                action: 'Assign medical team'
            },
            {
                type: 'resource_alert',
                message: 'Emergency shelter capacity reaching limit (67/80 beds)',
                time: '15 minutes ago',
                priority: 'medium',
                action: 'Review capacity'
            },
            {
                type: 'staff_update',
                message: 'Dr. Sarah Johnson completed Case GBV-SL-2024-001 medical treatment',
                time: '1 hour ago',
                priority: 'low',
                action: 'Update case status'
            },
            {
                type: 'success_story',
                message: 'Survivor from Case GBV-SL-2023-987 successfully completed economic empowerment program',
                time: '3 hours ago',
                priority: 'low',
                action: 'Document success'
            }
        ];

        notificationsContainer.innerHTML = sampleNotifications.map(notification => {
            const priorityColors = {
                'high': 'red',
                'medium': 'yellow',
                'low': 'green'
            };
            
            const iconMap = {
                'service_request': 'fa-hand-paper',
                'resource_alert': 'fa-exclamation-triangle',
                'staff_update': 'fa-user-check',
                'success_story': 'fa-trophy'
            };
            
            return `
                <div class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div class="flex-shrink-0">
                        <i class="fas ${iconMap[notification.type]} text-${priorityColors[notification.priority]}-600 text-lg"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">${notification.message}</p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-xs text-gray-500">${notification.time}</span>
                            <button class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                ${notification.action}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Set up event listeners
    function setupRainboEventListeners() {
        // Rainbo portal access
        document.addEventListener('click', function(e) {
            if (e.target.closest('#rainbo-portal-tab')) {
                openRainboPortal();
            }
            
            if (e.target.closest('#close-rainbo-portal')) {
                closeRainboPortal();
            }
        });

        // Close modal on backdrop click
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('rainbo-portal-modal');
            if (e.target === modal) {
                closeRainboPortal();
            }
        });
    }

    // Portal functions
    function openRainboPortal() {
        const modal = document.getElementById('rainbo-portal-modal');
        if (modal) {
            modal.classList.remove('hidden');
            populatePortalData(); // Refresh data when opening
        }
    }

    function closeRainboPortal() {
        const modal = document.getElementById('rainbo-portal-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Initialize real-time features
    function initializeRainboRealTime() {
        // Auto-refresh data every 30 seconds
        setInterval(refreshPortalData, 30000);
        
        // Set up real-time notification system
        setupRealTimeNotifications();
    }

    function refreshPortalData() {
        if (!document.getElementById('rainbo-portal-modal').classList.contains('hidden')) {
            populatePortalData();
        }
    }

    function setupRealTimeNotifications() {
        // Listen for new service requests
        document.addEventListener('rainbo_service_request', function(e) {
            handleServiceRequest(e.detail);
        });
    }

    // Handle service requests from main system
    function receiveServiceRequest(notification) {
        console.log('🌈 Rainbo Initiative received service request:', notification);
        
        // Check if Rainbo provides needed services
        const rainboServicesNeeded = notification.services_needed.filter(service => 
            ['medical', 'counseling', 'shelter', 'nutrition', 'economic'].includes(service)
        );
        
        if (rainboServicesNeeded.length > 0) {
            // Create new case entry
            const newCase = {
                id: notification.case_number,
                survivor_id: `SURV-${Date.now()}`,
                district: notification.district,
                case_type: notification.incident_type,
                services_provided: rainboServicesNeeded,
                entry_date: new Date().toISOString().split('T')[0],
                status: 'new',
                progress: {},
                next_appointment: getNextAvailableAppointment(),
                assigned_staff: [],
                notes: 'New case received from main system. Initial assessment required.'
            };
            
            // Initialize progress for each service
            rainboServicesNeeded.forEach(service => {
                newCase.progress[service] = 0;
            });
            
            // Add to active cases
            activeCases.unshift(newCase);
            
            // Update portal if open
            if (!document.getElementById('rainbo-portal-modal').classList.contains('hidden')) {
                populateActiveCases();
            }
            
            // Show real-time notification
            showRainboNotification(notification, rainboServicesNeeded);
            
            // Auto-assign staff based on services needed
            autoAssignStaff(newCase, rainboServicesNeeded);
        }
    }

    function getNextAvailableAppointment() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    function showRainboNotification(notification, servicesNeeded) {
        // Show in main dashboard
        if (typeof window.GBVDashboard !== 'undefined' && window.GBVDashboard.notify) {
            window.GBVDashboard.notify(
                `🌈 Rainbo Initiative: New case ${notification.case_number} assigned for ${servicesNeeded.join(', ')} services`,
                'success',
                8000
            );
        }
        
        // Add to Rainbo portal notifications
        const notificationsContainer = document.getElementById('rainbo-notifications');
        if (notificationsContainer) {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'flex items-start space-x-3 p-4 border border-green-200 bg-green-50 rounded-lg';
            notificationElement.innerHTML = `
                <div class="flex-shrink-0">
                    <i class="fas fa-hand-paper text-green-600 text-lg"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                        🆕 New service request: Case ${notification.case_number} - ${servicesNeeded.join(', ')}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-xs text-gray-500">Just now</span>
                        <button class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                            Assign team
                        </button>
                    </div>
                </div>
            `;
            
            notificationsContainer.insertBefore(notificationElement, notificationsContainer.firstChild);
        }
    }

    function autoAssignStaff(newCase, servicesNeeded) {
        const assignments = [];
        
        servicesNeeded.forEach(service => {
            const availableStaff = rainboStaff.filter(staff => {
                // Simple assignment logic based on specialization
                if (service === 'medical' && staff.role.includes('Medical')) return true;
                if (service === 'counseling' && staff.role.includes('Counselor')) return true;
                if (service === 'shelter' && staff.role.includes('Shelter')) return true;
                if (service === 'nutrition' && staff.role === 'Nutrition Coordinator') return true;
                if (service === 'economic' && staff.role === 'Economic Empowerment Officer') return true;
                return staff.role.includes('Protection'); // Default assignment
            });
            
            const assignedStaff = availableStaff.find(staff => staff.availability === 'Available');
            if (assignedStaff) {
                assignments.push(assignedStaff.name);
                assignedStaff.currentCases++;
                if (assignedStaff.currentCases >= assignedStaff.maxCapacity) {
                    assignedStaff.availability = 'In Session';
                }
            }
        });
        
        newCase.assigned_staff = assignments;
        
        console.log(`🌈 Auto-assigned staff for case ${newCase.id}:`, assignments);
    }

    // Public methods
    return {
        init: initializeRainboPortal,
        receiveServiceRequest: receiveServiceRequest,
        openPortal: openRainboPortal,
        closePortal: closeRainboPortal,
        refreshData: refreshPortalData
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.rainboPortal.init(), 500);
    });
} else {
    setTimeout(() => window.rainboPortal.init(), 500);
}

console.log('🌈 Rainbo Initiative Portal Module - Fully Loaded!');
console.log('🔥 Partner resource management and real-time service coordination ready!');