// Police FSU Portal - Investigation & Case Tracking System
console.log('👮‍♀️ Police FSU Portal Loading...');

// Police Family Support Unit Portal for GBV Investigation & Case Tracking
window.policeFSUPortal = (function() {
    
    // Investigation stages and processes
    const investigationStages = {
        'initial_report': {
            name: 'Initial Report',
            icon: 'fa-file-alt',
            color: 'blue',
            description: 'Case received and preliminary assessment conducted',
            duration: '1-2 days',
            activities: ['Case registration', 'Initial documentation', 'Victim statement', 'Preliminary evidence collection']
        },
        'evidence_collection': {
            name: 'Evidence Collection',
            icon: 'fa-search',
            color: 'yellow',
            description: 'Comprehensive evidence gathering and documentation',
            duration: '3-7 days',
            activities: ['Scene investigation', 'Witness interviews', 'Medical evidence', 'Digital evidence']
        },
        'suspect_identification': {
            name: 'Suspect Identification',
            icon: 'fa-user-secret',
            color: 'orange',
            description: 'Identifying and locating the perpetrator',
            duration: '2-14 days',
            activities: ['Suspect identification', 'Background checks', 'Location tracking', 'Risk assessment']
        },
        'arrest_detention': {
            name: 'Arrest & Detention',
            icon: 'fa-handcuffs',
            color: 'red',
            description: 'Apprehension and custody of suspect',
            duration: '1 day',
            activities: ['Arrest warrant', 'Suspect apprehension', 'Custody procedures', 'Rights notification']
        },
        'investigation_completion': {
            name: 'Investigation Completion',
            icon: 'fa-clipboard-check',
            color: 'purple',
            description: 'Finalizing investigation and preparing case file',
            duration: '5-10 days',
            activities: ['Evidence compilation', 'Case file preparation', 'Prosecution recommendations', 'Victim protection measures']
        },
        'court_proceedings': {
            name: 'Court Proceedings',
            icon: 'fa-gavel',
            color: 'indigo',
            description: 'Legal proceedings and court hearings',
            duration: '30-180 days',
            activities: ['Preliminary hearing', 'Trial preparation', 'Court testimony', 'Verdict and sentencing']
        },
        'case_closure': {
            name: 'Case Closure',
            icon: 'fa-check-circle',
            color: 'green',
            description: 'Case concluded and closed',
            duration: '1-2 days',
            activities: ['Final documentation', 'Victim notification', 'Case archival', 'Follow-up arrangements']
        }
    };

    // Active FSU cases
    const fsuCases = [
        {
            id: 'GBV-SL-2024-001',
            police_ref: 'FSU/WA/001/2024',
            case_type: 'domestic_violence',
            district: 'Western Area Urban',
            current_stage: 'evidence_collection',
            priority: 'high',
            assigned_officer: 'Inspector Aminata Sesay',
            victim_id: 'VICTIM-001',
            suspect_status: 'identified',
            suspect_name: 'John Doe',
            suspect_location: 'Known address',
            arrest_warrant: 'pending',
            court_date: null,
            opened_date: '2024-01-10',
            last_updated: '2024-01-15T14:30:00',
            evidence_collected: ['Victim statement', 'Medical report', 'Witness testimony', 'Photos of injuries'],
            next_action: 'Complete scene investigation',
            notes: 'Victim cooperative. Strong medical evidence. Suspect identified and located.'
        },
        {
            id: 'GBV-SL-2024-002',
            police_ref: 'FSU/BO/002/2024',
            case_type: 'sexual_violence',
            district: 'Bo',
            current_stage: 'arrest_detention',
            priority: 'critical',
            assigned_officer: 'Sergeant Mohamed Kamara',
            victim_id: 'VICTIM-002',
            suspect_status: 'arrested',
            suspect_name: 'Richard Smith',
            suspect_location: 'In custody - Bo Police Station',
            arrest_warrant: 'executed',
            court_date: '2024-01-22',
            opened_date: '2024-01-08',
            last_updated: '2024-01-15T16:45:00',
            evidence_collected: ['Victim statement', 'Medical examination', 'DNA evidence', 'CCTV footage'],
            next_action: 'Prepare prosecution file',
            notes: 'Suspect arrested. DNA evidence collected. Court date scheduled.'
        },
        {
            id: 'GBV-SL-2024-003',
            police_ref: 'FSU/KEN/003/2024',
            case_type: 'child_abuse',
            district: 'Kenema',
            current_stage: 'court_proceedings',
            priority: 'high',
            assigned_officer: 'Inspector Fatmata Bangura',
            victim_id: 'VICTIM-003',
            suspect_status: 'on_trial',
            suspect_name: 'Michael Johnson',
            suspect_location: 'Released on bail',
            arrest_warrant: 'executed',
            court_date: '2024-01-20',
            opened_date: '2023-12-15',
            last_updated: '2024-01-14T10:20:00',
            evidence_collected: ['Child testimony', 'Medical evidence', 'Expert testimony', 'School records'],
            next_action: 'Attend court hearing',
            notes: 'Case in court. Child victim testimony completed with support services.'
        },
        {
            id: 'GBV-SL-2024-004',
            police_ref: 'FSU/BOM/004/2024',
            case_type: 'trafficking',
            district: 'Bombali',
            current_stage: 'suspect_identification',
            priority: 'critical',
            assigned_officer: 'Chief Inspector Ibrahim Koroma',
            victim_id: 'VICTIM-004',
            suspect_status: 'under_investigation',
            suspect_name: 'Unknown trafficking ring',
            suspect_location: 'Investigation ongoing',
            arrest_warrant: 'not_issued',
            court_date: null,
            opened_date: '2024-01-12',
            last_updated: '2024-01-15T18:15:00',
            evidence_collected: ['Victim statement', 'Travel documents', 'Financial records', 'Phone records'],
            next_action: 'Track suspect network',
            notes: 'Complex trafficking case. Victim rescued. Investigation into network ongoing.'
        }
    ];

    // FSU officers and units
    const fsuOfficers = [
        {
            id: 'FSU-001',
            name: 'Inspector Aminata Sesay',
            rank: 'Inspector',
            unit: 'Western Area FSU',
            specialization: ['Domestic Violence', 'Sexual Assault'],
            active_cases: 8,
            closed_cases: 45,
            success_rate: 92,
            availability: 'On Duty',
            contact: '+232-76-100001',
            experience: '12 years',
            languages: ['English', 'Krio', 'Temne'],
            certifications: ['GBV Investigation', 'Child Protection', 'Evidence Collection']
        },
        {
            id: 'FSU-002',
            name: 'Sergeant Mohamed Kamara',
            rank: 'Sergeant',
            unit: 'Bo District FSU',
            specialization: ['Sexual Violence', 'Evidence Collection'],
            active_cases: 6,
            closed_cases: 32,
            success_rate: 89,
            availability: 'In Court',
            contact: '+232-78-100002',
            experience: '8 years',
            languages: ['English', 'Krio', 'Mende'],
            certifications: ['Forensic Investigation', 'Victim Support', 'Digital Evidence']
        },
        {
            id: 'FSU-003',
            name: 'Inspector Fatmata Bangura',
            unit: 'Kenema District FSU',
            rank: 'Inspector',
            specialization: ['Child Abuse', 'Trafficking'],
            active_cases: 10,
            closed_cases: 38,
            success_rate: 95,
            availability: 'Available',
            contact: '+232-77-100003',
            experience: '15 years',
            languages: ['English', 'Mende', 'Krio'],
            certifications: ['Child Interview Techniques', 'Trafficking Investigation', 'Court Testimony']
        },
        {
            id: 'FSU-004',
            name: 'Chief Inspector Ibrahim Koroma',
            rank: 'Chief Inspector',
            unit: 'Bombali District FSU',
            specialization: ['Complex Investigations', 'Multi-jurisdictional Cases'],
            active_cases: 5,
            closed_cases: 67,
            success_rate: 94,
            availability: 'On Duty',
            contact: '+232-79-100004',
            experience: '20 years',
            languages: ['English', 'Temne', 'Krio'],
            certifications: ['Advanced Investigation', 'Leadership', 'Inter-agency Coordination']
        }
    ];

    // FSU performance statistics
    const fsuStats = {
        totalCases: 156,
        activeCases: 29,
        closedCases: 127,
        convictionRate: 87.3,
        averageInvestigationTime: '32 days',
        courtSuccessRate: 91.2,
        victimSatisfaction: 88.7,
        caseBacklog: 12
    };

    // Evidence types and requirements
    const evidenceTypes = {
        'victim_statement': { name: 'Victim Statement', required: true, collected: true },
        'witness_testimony': { name: 'Witness Testimony', required: false, collected: true },
        'medical_evidence': { name: 'Medical Evidence', required: true, collected: true },
        'physical_evidence': { name: 'Physical Evidence', required: false, collected: false },
        'digital_evidence': { name: 'Digital Evidence', required: false, collected: false },
        'forensic_evidence': { name: 'Forensic Evidence', required: true, collected: true },
        'documentary_evidence': { name: 'Documentary Evidence', required: false, collected: true }
    };

    // Initialize Police FSU portal
    function initializePoliceFSUPortal() {
        console.log('🚀 Initializing Police FSU Portal...');
        
        // Create FSU portal interface
        createFSUPortalInterface();
        
        // Populate portal data
        populateFSUPortalData();
        
        // Set up event listeners
        setupFSUEventListeners();
        
        // Initialize real-time features
        initializeFSURealTime();
        
        console.log('✅ Police FSU Portal initialized successfully!');
    }

    // Create FSU portal interface
    function createFSUPortalInterface() {
        // Add FSU access button to main navigation
        addFSUAccessButton();
        
        // Create FSU portal modal
        createFSUPortalModal();
    }

    // Add FSU access button
    function addFSUAccessButton() {
        const navTabs = document.querySelector('.flex.space-x-4.overflow-x-auto');
        if (!navTabs || document.getElementById('police-fsu-tab')) return;

        const fsuTab = document.createElement('button');
        fsuTab.id = 'police-fsu-tab';
        fsuTab.className = 'dashboard-tab border-b-2 border-transparent py-4 px-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg';
        fsuTab.innerHTML = `
            <i class="fas fa-shield-alt mr-2"></i>
            <span class="font-semibold">Police FSU</span>
            <span class="ml-2 bg-blue-700 px-2 py-1 rounded-full text-xs">Investigation</span>
        `;
        
        // Insert after Rainbo Initiative tab
        const rainboTab = document.getElementById('rainbo-portal-tab');
        if (rainboTab) {
            navTabs.insertBefore(fsuTab, rainboTab.nextSibling);
        } else {
            navTabs.appendChild(fsuTab);
        }
    }

    // Create FSU portal modal
    function createFSUPortalModal() {
        const existingModal = document.getElementById('police-fsu-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'police-fsu-modal';
        modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto';
        modal.innerHTML = `
            <div class="min-h-screen px-4 py-8">
                <div class="bg-white rounded-lg shadow-xl max-w-7xl mx-auto">
                    <!-- FSU Header -->
                    <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-3xl font-bold">Police Family Support Unit (FSU)</h2>
                                    <p class="mt-1 text-blue-100">Investigation Portal - GBV Case Tracking & Management</p>
                                    <div class="flex items-center mt-2">
                                        <i class="fas fa-balance-scale mr-2"></i>
                                        <span class="text-sm">Justice • Protection • Accountability</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold" id="fsu-active-cases">29</div>
                                <div class="text-sm text-blue-200">Active Cases</div>
                                <button id="close-fsu-portal" class="mt-2 text-white hover:text-blue-200">
                                    <i class="fas fa-times text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- FSU Content -->
                    <div class="p-6">
                        <!-- Investigation Performance Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Conviction Rate</p>
                                        <p class="text-3xl font-bold" id="conviction-rate">87.3%</p>
                                    </div>
                                    <i class="fas fa-gavel text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Court Success Rate</p>
                                        <p class="text-3xl font-bold" id="court-success-rate">91.2%</p>
                                    </div>
                                    <i class="fas fa-trophy text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Avg Investigation Time</p>
                                        <p class="text-3xl font-bold" id="avg-investigation-time">32d</p>
                                    </div>
                                    <i class="fas fa-stopwatch text-2xl opacity-80"></i>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm opacity-90">Victim Satisfaction</p>
                                        <p class="text-3xl font-bold" id="victim-satisfaction">88.7%</p>
                                    </div>
                                    <i class="fas fa-heart text-2xl opacity-80"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Investigation Stages Overview -->
                        <div class="mb-8">
                            <h3 class="text-2xl font-bold text-gray-900 mb-6">
                                <i class="fas fa-route mr-3 text-blue-600"></i>
                                Investigation Process & Stages
                            </h3>
                            <div id="investigation-stages" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
                        </div>

                        <!-- Case Management Dashboard -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <!-- Active Cases -->
                            <div class="bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-xl font-semibold text-gray-900">
                                            <i class="fas fa-folder-open mr-2 text-blue-600"></i>
                                            Active Investigation Cases
                                        </h4>
                                        <div class="flex items-center space-x-2">
                                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                ${fsuCases.length} active
                                            </span>
                                            <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                                <i class="fas fa-plus mr-1"></i>New Case
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <div id="fsu-active-cases-list" class="space-y-4 max-h-96 overflow-y-auto"></div>
                                </div>
                            </div>

                            <!-- Officer Management -->
                            <div class="bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <h4 class="text-xl font-semibold text-gray-900">
                                        <i class="fas fa-users-cog mr-2 text-green-600"></i>
                                        FSU Officers & Units
                                    </h4>
                                </div>
                                <div class="p-6">
                                    <div id="fsu-officers-list" class="space-y-4"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Evidence Management -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            <div class="lg:col-span-2 bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <h4 class="text-xl font-semibold text-gray-900">
                                        <i class="fas fa-search mr-2 text-purple-600"></i>
                                        Evidence Collection & Management
                                    </h4>
                                </div>
                                <div class="p-6">
                                    <div id="evidence-management" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                                </div>
                            </div>

                            <div class="bg-white border rounded-lg shadow-lg">
                                <div class="p-6 border-b border-gray-200">
                                    <h4 class="text-xl font-semibold text-gray-900">
                                        <i class="fas fa-chart-pie mr-2 text-orange-600"></i>
                                        Case Status Distribution
                                    </h4>
                                </div>
                                <div class="p-6">
                                    <canvas id="case-status-chart" width="300" height="200"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Court Schedule & Legal Proceedings -->
                        <div class="bg-white border rounded-lg shadow-lg mb-8">
                            <div class="p-6 border-b border-gray-200">
                                <h4 class="text-xl font-semibold text-gray-900">
                                    <i class="fas fa-calendar-alt mr-2 text-indigo-600"></i>
                                    Court Schedule & Legal Proceedings
                                </h4>
                            </div>
                            <div class="p-6">
                                <div id="court-schedule" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                            </div>
                        </div>

                        <!-- Real-time Alerts & Updates -->
                        <div class="bg-white border rounded-lg shadow-lg">
                            <div class="p-6 border-b border-gray-200">
                                <h4 class="text-xl font-semibold text-gray-900">
                                    <i class="fas fa-bell mr-2 text-red-600"></i>
                                    Real-time Investigation Alerts
                                </h4>
                            </div>
                            <div class="p-6">
                                <div id="fsu-alerts" class="space-y-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Populate FSU portal data
    function populateFSUPortalData() {
        populatePerformanceMetrics();
        populateInvestigationStages();
        populateActiveCases();
        populateFSUOfficers();
        populateEvidenceManagement();
        populateCourtSchedule();
        generateFSUAlerts();
        createCaseStatusChart();
    }

    // Populate performance metrics
    function populatePerformanceMetrics() {
        document.getElementById('fsu-active-cases').textContent = fsuStats.activeCases;
        document.getElementById('conviction-rate').textContent = `${fsuStats.convictionRate}%`;
        document.getElementById('court-success-rate').textContent = `${fsuStats.courtSuccessRate}%`;
        document.getElementById('avg-investigation-time').textContent = fsuStats.averageInvestigationTime;
        document.getElementById('victim-satisfaction').textContent = `${fsuStats.victimSatisfaction}%`;
    }

    // Populate investigation stages
    function populateInvestigationStages() {
        const stagesContainer = document.getElementById('investigation-stages');
        if (!stagesContainer) return;

        stagesContainer.innerHTML = Object.entries(investigationStages).map(([key, stage]) => `
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-${stage.color}-100 rounded-lg flex items-center justify-center">
                        <i class="fas ${stage.icon} text-${stage.color}-600"></i>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-900 text-sm">${stage.name}</h5>
                        <p class="text-xs text-gray-600">${stage.duration}</p>
                    </div>
                </div>
                <p class="text-sm text-gray-700 mb-3">${stage.description}</p>
                <div class="text-xs text-gray-600">
                    <div class="font-medium mb-1">Key Activities:</div>
                    ${stage.activities.slice(0, 2).map(activity => `
                        <div>• ${activity}</div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Populate active cases
    function populateActiveCases() {
        const casesContainer = document.getElementById('fsu-active-cases-list');
        if (!casesContainer) return;

        casesContainer.innerHTML = fsuCases.map(caseItem => {
            const stageInfo = investigationStages[caseItem.current_stage];
            const priorityColor = {
                'critical': 'red',
                'high': 'orange',
                'medium': 'yellow',
                'low': 'green'
            }[caseItem.priority];

            const suspectStatusColor = {
                'identified': 'blue',
                'arrested': 'green',
                'on_trial': 'purple',
                'under_investigation': 'yellow'
            }[caseItem.suspect_status];

            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" data-case-id="${caseItem.id}">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="font-medium text-gray-900">${caseItem.id}</span>
                                <span class="text-sm text-gray-600">(${caseItem.police_ref})</span>
                                <span class="bg-${priorityColor}-100 text-${priorityColor}-800 px-2 py-1 rounded text-xs font-medium">
                                    ${caseItem.priority}
                                </span>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div><strong>Type:</strong> ${caseItem.case_type.replace('_', ' ').toUpperCase()}</div>
                                <div><strong>District:</strong> ${caseItem.district}</div>
                                <div><strong>Officer:</strong> ${caseItem.assigned_officer}</div>
                                <div><strong>Opened:</strong> ${caseItem.opened_date}</div>
                            </div>
                            
                            <div class="flex items-center space-x-4 mb-3">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-${stageInfo.color}-500 rounded-full"></div>
                                    <span class="text-sm text-gray-700">${stageInfo.name}</span>
                                </div>
                                <span class="bg-${suspectStatusColor}-100 text-${suspectStatusColor}-700 px-2 py-1 rounded text-xs">
                                    ${caseItem.suspect_status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>Suspect:</strong> ${caseItem.suspect_name} - ${caseItem.suspect_location}
                            </div>
                            
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>Next Action:</strong> ${caseItem.next_action}
                            </div>
                            
                            ${caseItem.court_date ? `
                                <div class="text-sm text-blue-600 font-medium">
                                    <i class="fas fa-calendar mr-1"></i>Court Date: ${caseItem.court_date}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex flex-col space-y-2 ml-4">
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <i class="fas fa-edit mr-1"></i>Update
                            </button>
                            <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                <i class="fas fa-eye mr-1"></i>View
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate FSU officers
    function populateFSUOfficers() {
        const officersContainer = document.getElementById('fsu-officers-list');
        if (!officersContainer) return;

        officersContainer.innerHTML = fsuOfficers.map(officer => {
            const workloadPercentage = Math.round((officer.active_cases / 15) * 100); // Assuming max 15 cases per officer
            const availabilityColor = {
                'On Duty': 'green',
                'Available': 'green',
                'In Court': 'blue',
                'Off Duty': 'gray',
                'Unavailable': 'red'
            }[officer.availability];

            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-shield text-white text-sm"></i>
                        </div>
                        <div>
                            <h6 class="font-medium text-gray-900">${officer.rank} ${officer.name}</h6>
                            <p class="text-sm text-gray-600">${officer.unit}</p>
                            <div class="text-xs text-gray-500">
                                ${officer.specialization.join(', ')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-right">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${availabilityColor}-100 text-${availabilityColor}-800">
                            ${officer.availability}
                        </span>
                        <div class="text-xs text-gray-600 mt-1">
                            ${officer.active_cases} active cases
                        </div>
                        <div class="text-xs text-gray-500">
                            ${officer.success_rate}% success rate
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate evidence management
    function populateEvidenceManagement() {
        const evidenceContainer = document.getElementById('evidence-management');
        if (!evidenceContainer) return;

        evidenceContainer.innerHTML = Object.entries(evidenceTypes).map(([key, evidence]) => {
            const statusColor = evidence.collected ? 'green' : 'red';
            const statusIcon = evidence.collected ? 'fa-check-circle' : 'fa-times-circle';
            
            return `
                <div class="bg-gray-50 border rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <h6 class="font-medium text-gray-900">${evidence.name}</h6>
                        <i class="fas ${statusIcon} text-${statusColor}-600"></i>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs ${evidence.required ? 'text-red-600 font-medium' : 'text-gray-500'}">
                            ${evidence.required ? 'Required' : 'Optional'}
                        </span>
                        <span class="text-xs bg-${statusColor}-100 text-${statusColor}-700 px-2 py-1 rounded">
                            ${evidence.collected ? 'Collected' : 'Pending'}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate court schedule
    function populateCourtSchedule() {
        const courtContainer = document.getElementById('court-schedule');
        if (!courtContainer) return;

        const courtCases = fsuCases.filter(c => c.court_date);
        
        if (courtCases.length === 0) {
            courtContainer.innerHTML = `
                <div class="col-span-3 text-center py-8 text-gray-500">
                    <i class="fas fa-calendar-times text-3xl mb-2"></i>
                    <p>No upcoming court dates scheduled</p>
                </div>
            `;
            return;
        }

        courtContainer.innerHTML = courtCases.map(caseItem => `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-2">
                    <i class="fas fa-gavel text-blue-600"></i>
                    <span class="font-medium text-blue-900">${caseItem.id}</span>
                </div>
                <div class="text-sm text-blue-700 mb-2">
                    <strong>Date:</strong> ${caseItem.court_date}
                </div>
                <div class="text-sm text-blue-700 mb-2">
                    <strong>Officer:</strong> ${caseItem.assigned_officer}
                </div>
                <div class="text-sm text-blue-600">
                    <strong>Status:</strong> ${caseItem.current_stage.replace('_', ' ').toUpperCase()}
                </div>
                <button class="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700">
                    <i class="fas fa-calendar-check mr-1"></i>View Details
                </button>
            </div>
        `).join('');
    }

    // Generate FSU alerts
    function generateFSUAlerts() {
        const alertsContainer = document.getElementById('fsu-alerts');
        if (!alertsContainer) return;

        const sampleAlerts = [
            {
                type: 'urgent_case',
                message: 'High priority case GBV-SL-2024-002 requires immediate court preparation',
                time: '5 minutes ago',
                priority: 'critical',
                action: 'Prepare case file'
            },
            {
                type: 'evidence_due',
                message: 'DNA evidence results for Case GBV-SL-2024-001 available for collection',
                time: '20 minutes ago',
                priority: 'high',
                action: 'Collect evidence'
            },
            {
                type: 'court_reminder',
                message: 'Court hearing for Case GBV-SL-2024-003 scheduled for tomorrow at 10:00 AM',
                time: '1 hour ago',
                priority: 'medium',
                action: 'Prepare testimony'
            },
            {
                type: 'arrest_warrant',
                message: 'Arrest warrant approved for Case GBV-SL-2024-004 suspect',
                time: '2 hours ago',
                priority: 'high',
                action: 'Execute arrest'
            },
            {
                type: 'victim_support',
                message: 'Victim in Case GBV-SL-2024-001 requested additional police protection',
                time: '3 hours ago',
                priority: 'medium',
                action: 'Arrange protection'
            }
        ];

        alertsContainer.innerHTML = sampleAlerts.map(alert => {
            const priorityColors = {
                'critical': 'red',
                'high': 'orange',
                'medium': 'yellow',
                'low': 'green'
            };

            const iconMap = {
                'urgent_case': 'fa-exclamation-triangle',
                'evidence_due': 'fa-vial',
                'court_reminder': 'fa-gavel',
                'arrest_warrant': 'fa-handcuffs',
                'victim_support': 'fa-shield-alt'
            };

            return `
                <div class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div class="flex-shrink-0">
                        <i class="fas ${iconMap[alert.type]} text-${priorityColors[alert.priority]}-600 text-lg"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">${alert.message}</p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-xs text-gray-500">${alert.time}</span>
                            <button class="text-xs bg-${priorityColors[alert.priority]}-600 text-white px-3 py-1 rounded hover:bg-${priorityColors[alert.priority]}-700">
                                ${alert.action}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Create case status chart
    function createCaseStatusChart() {
        setTimeout(() => {
            const ctx = document.getElementById('case-status-chart');
            if (ctx && typeof Chart !== 'undefined') {
                const stageCount = {};
                Object.keys(investigationStages).forEach(stage => {
                    stageCount[stage] = fsuCases.filter(c => c.current_stage === stage).length;
                });

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(investigationStages).map(key => 
                            investigationStages[key].name
                        ),
                        datasets: [{
                            data: Object.values(stageCount),
                            backgroundColor: [
                                '#3B82F6', '#EAB308', '#F97316', '#EF4444', 
                                '#8B5CF6', '#6366F1', '#10B981'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: { size: 10 }
                                }
                            }
                        }
                    }
                });
            }
        }, 1000);
    }

    // Set up event listeners
    function setupFSUEventListeners() {
        // FSU portal access
        document.addEventListener('click', function(e) {
            if (e.target.closest('#police-fsu-tab')) {
                openFSUPortal();
            }
            
            if (e.target.closest('#close-fsu-portal')) {
                closeFSUPortal();
            }
        });

        // Close modal on backdrop click
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('police-fsu-modal');
            if (e.target === modal) {
                closeFSUPortal();
            }
        });
    }

    // Portal functions
    function openFSUPortal() {
        const modal = document.getElementById('police-fsu-modal');
        if (modal) {
            modal.classList.remove('hidden');
            populateFSUPortalData(); // Refresh data when opening
        }
    }

    function closeFSUPortal() {
        const modal = document.getElementById('police-fsu-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Initialize real-time features
    function initializeFSURealTime() {
        // Auto-refresh data every 30 seconds
        setInterval(refreshFSUData, 30000);
        
        // Set up real-time notification system
        setupFSURealTimeNotifications();
    }

    function refreshFSUData() {
        if (!document.getElementById('police-fsu-modal').classList.contains('hidden')) {
            populateFSUPortalData();
        }
    }

    function setupFSURealTimeNotifications() {
        // Listen for new investigation cases
        document.addEventListener('fsu_investigation_case', function(e) {
            handleInvestigationCase(e.detail);
        });
    }

    // Handle new investigation cases from main system
    function receiveInvestigationCase(notification) {
        console.log('👮‍♀️ Police FSU received investigation case:', notification);
        
        // Create new FSU case entry
        const newFSUCase = {
            id: notification.case_number,
            police_ref: generatePoliceReference(notification.district),
            case_type: notification.incident_type,
            district: notification.district,
            current_stage: 'initial_report',
            priority: notification.priority,
            assigned_officer: assignOfficerByDistrict(notification.district),
            victim_id: `VICTIM-${Date.now()}`,
            suspect_status: 'under_investigation',
            suspect_name: 'Under Investigation',
            suspect_location: 'Unknown',
            arrest_warrant: 'not_issued',
            court_date: null,
            opened_date: new Date().toISOString().split('T')[0],
            last_updated: new Date().toISOString(),
            evidence_collected: [],
            next_action: 'Conduct initial investigation',
            notes: 'Case received from main system. Beginning preliminary investigation.'
        };
        
        // Add to active cases
        fsuCases.unshift(newFSUCase);
        
        // Update portal if open
        if (!document.getElementById('police-fsu-modal').classList.contains('hidden')) {
            populateActiveCases();
        }
        
        // Show real-time notification
        showFSUNotification(notification);
        
        // Auto-assign investigation tasks
        autoAssignInvestigationTasks(newFSUCase);
    }

    function generatePoliceReference(district) {
        const districtCodes = {
            'Western Area Urban': 'WA',
            'Western Area Rural': 'WAR',
            'Bo': 'BO',
            'Kenema': 'KEN',
            'Bombali': 'BOM'
        };
        const code = districtCodes[district] || 'GEN';
        const caseNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `FSU/${code}/${caseNum}/2024`;
    }

    function assignOfficerByDistrict(district) {
        const officerAssignments = {
            'Western Area Urban': 'Inspector Aminata Sesay',
            'Bo': 'Sergeant Mohamed Kamara',
            'Kenema': 'Inspector Fatmata Bangura',
            'Bombali': 'Chief Inspector Ibrahim Koroma'
        };
        return officerAssignments[district] || 'Inspector Aminata Sesay';
    }

    function showFSUNotification(notification) {
        // Show in main dashboard
        if (typeof window.GBVDashboard !== 'undefined' && window.GBVDashboard.notify) {
            window.GBVDashboard.notify(
                `👮‍♀️ Police FSU: Investigation opened for case ${notification.case_number}`,
                'info',
                8000
            );
        }
        
        // Add to FSU portal alerts
        const alertsContainer = document.getElementById('fsu-alerts');
        if (alertsContainer) {
            const alertElement = document.createElement('div');
            alertElement.className = 'flex items-start space-x-3 p-4 border border-blue-200 bg-blue-50 rounded-lg';
            alertElement.innerHTML = `
                <div class="flex-shrink-0">
                    <i class="fas fa-plus-circle text-blue-600 text-lg"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                        🆕 New investigation case: ${notification.case_number} - ${notification.incident_type.replace('_', ' ').toUpperCase()}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-xs text-gray-500">Just now</span>
                        <button class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            Begin investigation
                        </button>
                    </div>
                </div>
            `;
            
            alertsContainer.insertBefore(alertElement, alertsContainer.firstChild);
        }
    }

    function autoAssignInvestigationTasks(newCase) {
        // Simulate automatic task assignment based on case type
        const tasks = {
            'domestic_violence': [
                'Interview victim in safe environment',
                'Document physical evidence and injuries',
                'Collect witness statements',
                'Assess ongoing safety risks'
            ],
            'sexual_violence': [
                'Coordinate with medical examiner',
                'Secure DNA evidence collection',
                'Interview victim with specialist support',
                'Review CCTV and digital evidence'
            ],
            'child_abuse': [
                'Arrange specialist child interview',
                'Coordinate with child protection services',
                'Secure medical examination',
                'Interview caregivers and teachers'
            ]
        };
        
        const caseTasks = tasks[newCase.case_type] || [
            'Conduct initial victim interview',
            'Collect available evidence',
            'Identify potential witnesses',
            'Assess case priority and resources needed'
        ];
        
        console.log(`👮‍♀️ Auto-assigned investigation tasks for ${newCase.id}:`, caseTasks);
    }

    // Public methods
    return {
        init: initializePoliceFSUPortal,
        receiveInvestigationCase: receiveInvestigationCase,
        openPortal: openFSUPortal,
        closePortal: closeFSUPortal,
        refreshData: refreshFSUData
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.policeFSUPortal.init(), 500);
    });
} else {
    setTimeout(() => window.policeFSUPortal.init(), 500);
}

console.log('👮‍♀️ Police FSU Portal Module - Fully Loaded!');
console.log('🔥 Investigation tracking and case management system ready!');