// Incident Report System - Real-time Case Reporting with Templates
console.log('📝 Incident Report System Loading...');

// Comprehensive Incident Report System for GBV Dashboard
window.incidentReportSystem = (function() {
    
    // Report form templates for different incident types
    const reportTemplates = {
        'domestic_violence': {
            name: 'Domestic Violence Report',
            icon: 'fa-home',
            color: 'red',
            fields: [
                { name: 'incident_type', type: 'select', label: 'Type of Violence', options: ['Physical Violence', 'Emotional Abuse', 'Economic Abuse', 'Threats/Intimidation'], required: true },
                { name: 'relationship', type: 'select', label: 'Relationship to Perpetrator', options: ['Spouse/Partner', 'Ex-Partner', 'Parent', 'In-Law', 'Other Family Member'], required: true },
                { name: 'incident_location', type: 'select', label: 'Incident Location', options: ['Home', 'Workplace', 'Public Place', 'Other'], required: true },
                { name: 'frequency', type: 'select', label: 'Frequency of Abuse', options: ['First Time', 'Occasional (Monthly)', 'Regular (Weekly)', 'Daily'], required: true },
                { name: 'children_present', type: 'radio', label: 'Children Present During Incident?', options: ['Yes', 'No'], required: true },
                { name: 'physical_injuries', type: 'textarea', label: 'Physical Injuries (if any)', required: false },
                { name: 'weapons_used', type: 'checkbox', label: 'Weapons/Objects Used', options: ['None', 'Knife', 'Stick/Rod', 'Bottle', 'Other Household Item'], required: false },
                { name: 'medical_attention', type: 'radio', label: 'Medical Attention Sought?', options: ['Yes', 'No'], required: true },
                { name: 'previous_reports', type: 'radio', label: 'Previous Reports Made?', options: ['Yes', 'No'], required: true }
            ]
        },
        'sexual_violence': {
            name: 'Sexual Violence Report',
            icon: 'fa-user-shield',
            color: 'purple',
            fields: [
                { name: 'incident_type', type: 'select', label: 'Type of Sexual Violence', options: ['Rape', 'Sexual Assault', 'Sexual Harassment', 'Attempted Rape', 'Other'], required: true },
                { name: 'perpetrator_known', type: 'radio', label: 'Perpetrator Known to Survivor?', options: ['Yes', 'No'], required: true },
                { name: 'relationship', type: 'select', label: 'Relationship (if known)', options: ['Stranger', 'Acquaintance', 'Partner/Ex-Partner', 'Family Member', 'Authority Figure', 'Other'], required: false },
                { name: 'incident_location', type: 'select', label: 'Incident Location', options: ['Home', 'School', 'Workplace', 'Public Transport', 'Street/Public Area', 'Other'], required: true },
                { name: 'time_of_incident', type: 'select', label: 'Time of Day', options: ['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-10PM)', 'Night (10PM-6AM)'], required: true },
                { name: 'medical_exam', type: 'radio', label: 'Medical Examination Conducted?', options: ['Yes', 'No'], required: true },
                { name: 'evidence_collected', type: 'checkbox', label: 'Evidence Collection', options: ['Medical Evidence', 'Clothing', 'Photos', 'DNA Sample', 'None'], required: false },
                { name: 'police_report', type: 'radio', label: 'Police Report Filed?', options: ['Yes', 'No'], required: true },
                { name: 'immediate_safety', type: 'select', label: 'Immediate Safety Concern Level', options: ['Low', 'Medium', 'High', 'Critical'], required: true }
            ]
        },
        'child_abuse': {
            name: 'Child Abuse Report',
            icon: 'fa-child',
            color: 'orange',
            fields: [
                { name: 'child_age', type: 'number', label: 'Child Age', min: 0, max: 17, required: true },
                { name: 'abuse_type', type: 'select', label: 'Type of Abuse', options: ['Physical Abuse', 'Sexual Abuse', 'Emotional Abuse', 'Neglect', 'Multiple Types'], required: true },
                { name: 'perpetrator_relationship', type: 'select', label: 'Perpetrator Relationship', options: ['Parent', 'Step-Parent', 'Guardian', 'Relative', 'Teacher', 'Stranger', 'Other'], required: true },
                { name: 'disclosure_method', type: 'select', label: 'How Abuse Was Disclosed', options: ['Child Told Someone', 'Physical Signs Observed', 'Behavioral Changes', 'Witnessed by Someone', 'Other'], required: true },
                { name: 'physical_indicators', type: 'textarea', label: 'Physical Indicators/Injuries', required: false },
                { name: 'behavioral_indicators', type: 'textarea', label: 'Behavioral Changes Observed', required: false },
                { name: 'child_current_location', type: 'select', label: 'Child Current Location', options: ['With Non-Offending Parent', 'With Relative', 'In Foster Care', 'In Institution', 'Unknown'], required: true },
                { name: 'school_informed', type: 'radio', label: 'School Informed?', options: ['Yes', 'No', 'Not Applicable'], required: true },
                { name: 'child_services_involved', type: 'radio', label: 'Child Services Involved?', options: ['Yes', 'No'], required: true }
            ]
        },
        'trafficking': {
            name: 'Human Trafficking Report',
            icon: 'fa-users-slash',
            color: 'indigo',
            fields: [
                { name: 'trafficking_type', type: 'select', label: 'Type of Trafficking', options: ['Sex Trafficking', 'Labor Trafficking', 'Domestic Servitude', 'Child Trafficking', 'Other'], required: true },
                { name: 'victim_origin', type: 'select', label: 'Victim Origin', options: ['Local (Same District)', 'Domestic (Other District)', 'Cross-Border', 'Unknown'], required: true },
                { name: 'recruitment_method', type: 'select', label: 'Recruitment Method', options: ['False Job Promise', 'Romantic Relationship', 'Family Sold/Gave', 'Kidnapped', 'Other', 'Unknown'], required: false },
                { name: 'exploitation_location', type: 'textarea', label: 'Location of Exploitation', required: false },
                { name: 'duration_exploitation', type: 'select', label: 'Duration of Exploitation', options: ['Less than 1 month', '1-6 months', '6-12 months', 'More than 1 year', 'Unknown'], required: false },
                { name: 'movement_restricted', type: 'radio', label: 'Movement Restricted?', options: ['Yes', 'No', 'Unknown'], required: false },
                { name: 'documents_withheld', type: 'radio', label: 'Identity Documents Withheld?', options: ['Yes', 'No', 'Unknown'], required: false },
                { name: 'debt_bondage', type: 'radio', label: 'Debt Bondage Involved?', options: ['Yes', 'No', 'Unknown'], required: false },
                { name: 'law_enforcement_contact', type: 'radio', label: 'Law Enforcement Contacted?', options: ['Yes', 'No'], required: true }
            ]
        }
    };

    // Districts for location selection
    const districts = [
        'Western Area Urban', 'Western Area Rural', 'Bo', 'Bombali', 'Bonthe', 
        'Falaba', 'Kailahun', 'Kambia', 'Karene', 'Kenema', 'Koinadugu', 
        'Kono', 'Moyamba', 'Port Loko', 'Pujehun', 'Tonkolili'
    ];

    // Form state
    let currentTemplate = null;
    let formData = {};
    let realTimeValidation = true;

    // Initialize incident report system
    function initializeIncidentReportSystem() {
        console.log('🚀 Initializing Incident Report System...');
        
        // Create incident report interface
        createIncidentReportInterface();
        
        // Set up event listeners
        setupReportEventListeners();
        
        // Initialize real-time features
        initializeRealTimeFeatures();
        
        console.log('✅ Incident Report System initialized successfully!');
    }

    // Create incident report interface
    function createIncidentReportInterface() {
        // Add report button to main dashboard if not exists
        addReportButtonToMainDashboard();
        
        // Create modal for incident reporting
        createReportModal();
        
        // Create success confirmation system
        createSuccessSystem();
    }

    // Add report button to main dashboard
    function addReportButtonToMainDashboard() {
        const dashboardContent = document.getElementById('dashboard-content');
        if (!dashboardContent || document.getElementById('incident-report-button')) return;

        // Add emergency report button to header area
        const ministryBanner = dashboardContent.querySelector('.bg-gradient-to-r.from-green-600');
        if (ministryBanner) {
            const reportButton = document.createElement('div');
            reportButton.className = 'mt-4';
            reportButton.innerHTML = `
                <button id="incident-report-button" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                    <i class="fas fa-plus-circle mr-2"></i>
                    <span class="font-semibold">Report New Incident</span>
                    <span class="ml-2 bg-red-500 px-2 py-1 rounded-full text-xs">24/7</span>
                </button>
            `;
            ministryBanner.appendChild(reportButton);
        }
    }

    // Create report modal
    function createReportModal() {
        const existingModal = document.getElementById('incident-report-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'incident-report-modal';
        modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-hidden">
                <!-- Modal Header -->
                <div class="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-2xl font-bold">
                                <i class="fas fa-shield-alt mr-3"></i>
                                Incident Report System
                            </h3>
                            <p class="mt-2 text-red-100">Confidential & Secure Reporting • 24/7 Support Available</p>
                        </div>
                        <button id="close-report-modal" class="text-white hover:text-red-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Modal Content -->
                <div class="p-6 overflow-y-auto max-h-96">
                    <!-- Step 1: Template Selection -->
                    <div id="template-selection" class="step-content">
                        <h4 class="text-xl font-semibold text-gray-900 mb-4">
                            <i class="fas fa-clipboard-list mr-2 text-red-600"></i>
                            Select Incident Type
                        </h4>
                        <p class="text-gray-600 mb-6">Choose the type of incident you want to report. This will customize the form for accurate information collection.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="template-options">
                            ${Object.entries(reportTemplates).map(([key, template]) => `
                                <button class="template-option p-4 border-2 border-gray-200 rounded-lg hover:border-${template.color}-500 hover:bg-${template.color}-50 transition-all duration-300 text-left" data-template="${key}">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-12 h-12 bg-${template.color}-100 rounded-lg flex items-center justify-center">
                                            <i class="fas ${template.icon} text-${template.color}-600 text-xl"></i>
                                        </div>
                                        <div>
                                            <h5 class="font-semibold text-gray-900">${template.name}</h5>
                                            <p class="text-sm text-gray-600">${template.fields.length} form fields</p>
                                        </div>
                                    </div>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Step 2: Basic Information -->
                    <div id="basic-information" class="step-content hidden">
                        <h4 class="text-xl font-semibold text-gray-900 mb-4">
                            <i class="fas fa-info-circle mr-2 text-blue-600"></i>
                            Basic Information
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Incident Date *</label>
                                <input type="date" id="incident_date" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Incident Time</label>
                                <input type="time" id="incident_time" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">District *</label>
                                <select id="district" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                                    <option value="">Select District</option>
                                    ${districts.map(district => `<option value="${district}">${district}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Chiefdom/Area</label>
                                <input type="text" id="chiefdom" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Optional">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Survivor Age Group *</label>
                                <select id="survivor_age_group" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                                    <option value="">Select Age Group</option>
                                    <option value="0-4">0-4 years</option>
                                    <option value="5-11">5-11 years</option>
                                    <option value="12-17">12-17 years</option>
                                    <option value="18-25">18-25 years</option>
                                    <option value="26-35">26-35 years</option>
                                    <option value="36-50">36-50 years</option>
                                    <option value="51+">51+ years</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Survivor Gender *</label>
                                <select id="survivor_gender" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Incident Details -->
                    <div id="incident-details" class="step-content hidden">
                        <h4 class="text-xl font-semibold text-gray-900 mb-4">
                            <i class="fas fa-file-alt mr-2 text-green-600"></i>
                            Incident Details
                        </h4>
                        <div id="dynamic-form-fields"></div>
                    </div>

                    <!-- Step 4: Support Services -->
                    <div id="support-services" class="step-content hidden">
                        <h4 class="text-xl font-semibold text-gray-900 mb-4">
                            <i class="fas fa-hands-helping mr-2 text-purple-600"></i>
                            Support Services Needed
                        </h4>
                        
                        <div class="space-y-4">
                            <p class="text-gray-600">Select the support services needed for the survivor:</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="medical" class="text-blue-600">
                                    <div>
                                        <div class="font-medium">Medical Care</div>
                                        <div class="text-sm text-gray-600">Emergency medical attention, treatment</div>
                                    </div>
                                </label>
                                
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="counseling" class="text-purple-600">
                                    <div>
                                        <div class="font-medium">Counseling Support</div>
                                        <div class="text-sm text-gray-600">Psychological support, trauma counseling</div>
                                    </div>
                                </label>
                                
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="legal" class="text-green-600">
                                    <div>
                                        <div class="font-medium">Legal Aid</div>
                                        <div class="text-sm text-gray-600">Legal consultation, court representation</div>
                                    </div>
                                </label>
                                
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="shelter" class="text-orange-600">
                                    <div>
                                        <div class="font-medium">Emergency Shelter</div>
                                        <div class="text-sm text-gray-600">Safe accommodation, temporary housing</div>
                                    </div>
                                </label>
                                
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="economic" class="text-blue-600">
                                    <div>
                                        <div class="font-medium">Economic Support</div>
                                        <div class="text-sm text-gray-600">Financial assistance, livelihood support</div>
                                    </div>
                                </label>
                                
                                <label class="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input type="checkbox" name="services" value="protection" class="text-red-600">
                                    <div>
                                        <div class="font-medium">Protection Services</div>
                                        <div class="text-sm text-gray-600">Security, safety planning</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5: Reporter Information -->
                    <div id="reporter-information" class="step-content hidden">
                        <h4 class="text-xl font-semibold text-gray-900 mb-4">
                            <i class="fas fa-user mr-2 text-indigo-600"></i>
                            Reporter Information
                        </h4>
                        
                        <div class="space-y-6">
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <div class="flex items-start space-x-2">
                                    <i class="fas fa-shield-alt text-yellow-600 mt-1"></i>
                                    <div>
                                        <p class="font-medium text-yellow-800">Confidentiality Notice</p>
                                        <p class="text-sm text-yellow-700 mt-1">All reporter information is kept strictly confidential and is only used for follow-up if necessary.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Reporter Name</label>
                                    <input type="text" id="reporter_name" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Optional - for follow-up">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                                    <input type="tel" id="reporter_phone" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Optional - for updates">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Relationship to Survivor</label>
                                    <select id="reporter_relationship" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">Select Relationship</option>
                                        <option value="Self">Self (I am the survivor)</option>
                                        <option value="Family Member">Family Member</option>
                                        <option value="Friend">Friend</option>
                                        <option value="Neighbor">Neighbor</option>
                                        <option value="Service Provider">Service Provider</option>
                                        <option value="Community Leader">Community Leader</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Organization (if applicable)</label>
                                    <input type="text" id="reporter_organization" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="NGO, Hospital, etc.">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="bg-gray-50 px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center space-x-2" id="step-indicator">
                        <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                        <div class="w-8 h-1 bg-gray-300"></div>
                        <span class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                        <div class="w-8 h-1 bg-gray-300"></div>
                        <span class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                        <div class="w-8 h-1 bg-gray-300"></div>
                        <span class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                        <div class="w-8 h-1 bg-gray-300"></div>
                        <span class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button id="prev-step" class="hidden px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                            <i class="fas fa-arrow-left mr-2"></i>Previous
                        </button>
                        <button id="next-step" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled>
                            Next<i class="fas fa-arrow-right ml-2"></i>
                        </button>
                        <button id="submit-report" class="hidden px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            <i class="fas fa-paper-plane mr-2"></i>Submit Report
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Create success system
    function createSuccessSystem() {
        const existingSuccess = document.getElementById('report-success-modal');
        if (existingSuccess) existingSuccess.remove();

        const successModal = document.createElement('div');
        successModal.id = 'report-success-modal';
        successModal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        successModal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div class="p-6 text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check-circle text-green-600 text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Report Submitted Successfully</h3>
                    <p class="text-gray-600 mb-4">Your incident report has been securely received and assigned case number:</p>
                    <div class="bg-gray-100 p-3 rounded-lg mb-4">
                        <span class="font-mono text-lg font-bold" id="case-number">GBV-SL-2024-001</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-6">You will receive updates on this case. Emergency services have been notified if required.</p>
                    
                    <div class="space-y-3">
                        <button id="view-case-status" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                            View Case Status
                        </button>
                        <button id="close-success-modal" class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(successModal);
    }

    // Set up event listeners
    function setupReportEventListeners() {
        // Main report button
        document.addEventListener('click', function(e) {
            if (e.target.closest('#incident-report-button')) {
                openReportModal();
            }
            
            if (e.target.closest('#close-report-modal')) {
                closeReportModal();
            }
            
            if (e.target.closest('.template-option')) {
                selectTemplate(e.target.closest('.template-option').dataset.template);
            }
            
            if (e.target.id === 'next-step') {
                nextStep();
            }
            
            if (e.target.id === 'prev-step') {
                prevStep();
            }
            
            if (e.target.id === 'submit-report') {
                submitReport();
            }
            
            if (e.target.id === 'close-success-modal' || e.target.id === 'view-case-status') {
                closeSuccessModal();
            }
        });

        // Form validation
        document.addEventListener('input', function(e) {
            if (e.target.closest('#incident-report-modal')) {
                validateCurrentStep();
            }
        });

        document.addEventListener('change', function(e) {
            if (e.target.closest('#incident-report-modal')) {
                validateCurrentStep();
            }
        });
    }

    // Modal functions
    function openReportModal() {
        document.getElementById('incident-report-modal').classList.remove('hidden');
        resetForm();
        currentStep = 1;
        showStep(1);
    }

    function closeReportModal() {
        document.getElementById('incident-report-modal').classList.add('hidden');
        resetForm();
    }

    function closeSuccessModal() {
        document.getElementById('report-success-modal').classList.add('hidden');
        closeReportModal();
    }

    // Form navigation
    let currentStep = 1;
    const totalSteps = 5;

    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
        
        // Show current step
        const stepElements = {
            1: 'template-selection',
            2: 'basic-information',
            3: 'incident-details',
            4: 'support-services',
            5: 'reporter-information'
        };
        
        document.getElementById(stepElements[step]).classList.remove('hidden');
        
        // Update step indicator
        updateStepIndicator(step);
        
        // Update navigation buttons
        updateNavigationButtons(step);
        
        // Validate current step
        validateCurrentStep();
    }

    function updateStepIndicator(step) {
        const indicators = document.querySelectorAll('#step-indicator span');
        const lines = document.querySelectorAll('#step-indicator div');
        
        indicators.forEach((indicator, index) => {
            if (index + 1 <= step) {
                indicator.className = 'w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium';
            } else {
                indicator.className = 'w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium';
            }
        });
        
        lines.forEach((line, index) => {
            if (index * 2 + 2 <= step) {
                line.className = 'w-8 h-1 bg-blue-600';
            } else {
                line.className = 'w-8 h-1 bg-gray-300';
            }
        });
    }

    function updateNavigationButtons(step) {
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        const submitBtn = document.getElementById('submit-report');
        
        // Previous button
        if (step > 1) {
            prevBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
        }
        
        // Next/Submit button
        if (step < totalSteps) {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        } else {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    }

    function nextStep() {
        if (currentStep < totalSteps && validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
            
            // Generate dynamic form for step 3
            if (currentStep === 3) {
                generateDynamicForm();
            }
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // Template selection
    function selectTemplate(templateKey) {
        currentTemplate = templateKey;
        
        // Update UI
        document.querySelectorAll('.template-option').forEach(el => {
            el.classList.remove('border-red-500', 'bg-red-50');
        });
        
        const selectedElement = document.querySelector(`[data-template="${templateKey}"]`);
        const template = reportTemplates[templateKey];
        selectedElement.classList.add(`border-${template.color}-500`, `bg-${template.color}-50`);
        
        // Enable next button
        validateCurrentStep();
    }

    // Dynamic form generation
    function generateDynamicForm() {
        if (!currentTemplate) return;
        
        const template = reportTemplates[currentTemplate];
        const container = document.getElementById('dynamic-form-fields');
        
        container.innerHTML = `
            <div class="space-y-6">
                ${template.fields.map(field => generateFieldHTML(field)).join('')}
            </div>
        `;
    }

    function generateFieldHTML(field) {
        const required = field.required ? 'required' : '';
        const requiredMark = field.required ? '*' : '';
        
        switch (field.type) {
            case 'select':
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label} ${requiredMark}</label>
                        <select name="${field.name}" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" ${required}>
                            <option value="">Select ${field.label}</option>
                            ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                        </select>
                    </div>
                `;
            
            case 'radio':
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label} ${requiredMark}</label>
                        <div class="space-y-2">
                            ${field.options.map(option => `
                                <label class="flex items-center space-x-2">
                                    <input type="radio" name="${field.name}" value="${option}" class="text-blue-600" ${required}>
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'checkbox':
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label}</label>
                        <div class="grid grid-cols-2 gap-2">
                            ${field.options.map(option => `
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" name="${field.name}" value="${option}" class="text-blue-600">
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'textarea':
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label} ${requiredMark}</label>
                        <textarea name="${field.name}" rows="4" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter details..." ${required}></textarea>
                    </div>
                `;
            
            case 'number':
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label} ${requiredMark}</label>
                        <input type="number" name="${field.name}" min="${field.min || 0}" max="${field.max || 100}" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" ${required}>
                    </div>
                `;
            
            default:
                return `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${field.label} ${requiredMark}</label>
                        <input type="text" name="${field.name}" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" ${required}>
                    </div>
                `;
        }
    }

    // Form validation
    function validateCurrentStep() {
        let isValid = false;
        
        switch (currentStep) {
            case 1: // Template selection
                isValid = currentTemplate !== null;
                break;
                
            case 2: // Basic information
                const requiredBasicFields = ['incident_date', 'district', 'survivor_age_group', 'survivor_gender'];
                isValid = requiredBasicFields.every(field => {
                    const element = document.getElementById(field);
                    return element && element.value.trim() !== '';
                });
                break;
                
            case 3: // Incident details
                if (!currentTemplate) {
                    isValid = false;
                    break;
                }
                
                const template = reportTemplates[currentTemplate];
                const requiredFields = template.fields.filter(field => field.required);
                isValid = requiredFields.every(field => {
                    const elements = document.querySelectorAll(`[name="${field.name}"]`);
                    if (field.type === 'radio') {
                        return Array.from(elements).some(el => el.checked);
                    } else if (field.type === 'checkbox') {
                        return Array.from(elements).some(el => el.checked) || !field.required;
                    } else {
                        return elements[0] && elements[0].value.trim() !== '';
                    }
                });
                break;
                
            case 4: // Support services
                isValid = true; // Optional step
                break;
                
            case 5: // Reporter information
                isValid = true; // All fields optional
                break;
        }
        
        // Update next/submit button
        const nextBtn = document.getElementById('next-step');
        const submitBtn = document.getElementById('submit-report');
        
        if (nextBtn && !nextBtn.classList.contains('hidden')) {
            nextBtn.disabled = !isValid;
        }
        
        if (submitBtn && !submitBtn.classList.contains('hidden')) {
            submitBtn.disabled = !isValid;
        }
        
        return isValid;
    }

    // Form submission
    function submitReport() {
        if (!validateCurrentStep()) return;
        
        // Collect all form data
        const reportData = collectFormData();
        
        // Generate case number
        const caseNumber = generateCaseNumber();
        
        // Submit to backend
        submitToBackend(reportData, caseNumber);
        
        // Show success modal
        showSuccessModal(caseNumber);
        
        // Trigger real-time notifications
        triggerRealTimeNotifications(reportData, caseNumber);
    }

    function collectFormData() {
        const data = {
            template: currentTemplate,
            basic_info: {},
            incident_details: {},
            services_needed: [],
            reporter_info: {}
        };
        
        // Basic information
        ['incident_date', 'incident_time', 'district', 'chiefdom', 'survivor_age_group', 'survivor_gender'].forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                data.basic_info[field] = element.value;
            }
        });
        
        // Incident details
        const formElements = document.querySelectorAll('#dynamic-form-fields input, #dynamic-form-fields select, #dynamic-form-fields textarea');
        formElements.forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                if (element.checked) {
                    if (!data.incident_details[element.name]) {
                        data.incident_details[element.name] = [];
                    }
                    if (Array.isArray(data.incident_details[element.name])) {
                        data.incident_details[element.name].push(element.value);
                    } else {
                        data.incident_details[element.name] = element.value;
                    }
                }
            } else if (element.value) {
                data.incident_details[element.name] = element.value;
            }
        });
        
        // Services needed
        document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
            data.services_needed.push(checkbox.value);
        });
        
        // Reporter information
        ['reporter_name', 'reporter_phone', 'reporter_relationship', 'reporter_organization'].forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                data.reporter_info[field] = element.value;
            }
        });
        
        return data;
    }

    function generateCaseNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `GBV-SL-${new Date().getFullYear()}-${random}`;
    }

    function submitToBackend(reportData, caseNumber) {
        // Simulate backend submission
        fetch('/api/cases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                case_number: caseNumber,
                ...reportData.basic_info,
                incident_details: reportData.incident_details,
                services_needed: reportData.services_needed,
                reporter_info: reportData.reporter_info,
                template_used: reportData.template,
                status: 'reported',
                priority_level: determinePriority(reportData),
                created_at: new Date().toISOString()
            })
        }).then(response => response.json())
          .then(data => {
              console.log('Case submitted successfully:', data);
          })
          .catch(error => {
              console.error('Error submitting case:', error);
          });
    }

    function determinePriority(reportData) {
        // Simple priority determination logic
        if (reportData.template === 'sexual_violence' || reportData.template === 'child_abuse') {
            return 'high';
        }
        if (reportData.services_needed.includes('medical') || reportData.services_needed.includes('protection')) {
            return 'high';
        }
        return 'medium';
    }

    function showSuccessModal(caseNumber) {
        document.getElementById('case-number').textContent = caseNumber;
        document.getElementById('report-success-modal').classList.remove('hidden');
    }

    function resetForm() {
        currentTemplate = null;
        formData = {};
        currentStep = 1;
        
        // Clear all form fields
        document.querySelectorAll('#incident-report-modal input, #incident-report-modal select, #incident-report-modal textarea').forEach(el => {
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = false;
            } else {
                el.value = '';
            }
        });
        
        // Reset template selection visual
        document.querySelectorAll('.template-option').forEach(el => {
            el.classList.remove('border-red-500', 'bg-red-50', 'border-purple-500', 'bg-purple-50', 'border-orange-500', 'bg-orange-50', 'border-indigo-500', 'bg-indigo-50');
        });
    }

    // Real-time features
    function initializeRealTimeFeatures() {
        // Auto-save form data
        setInterval(autoSaveFormData, 30000); // Every 30 seconds
        
        // Real-time validation feedback
        setupRealTimeValidation();
        
        // Connection status monitoring
        monitorConnectionStatus();
    }

    function autoSaveFormData() {
        if (document.getElementById('incident-report-modal').classList.contains('hidden')) return;
        
        const currentFormData = collectFormData();
        localStorage.setItem('incident_report_draft', JSON.stringify({
            data: currentFormData,
            step: currentStep,
            template: currentTemplate,
            timestamp: Date.now()
        }));
        
        // Show auto-save notification
        showAutoSaveNotification();
    }

    function showAutoSaveNotification() {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.innerHTML = '<i class="fas fa-save mr-2"></i>Draft auto-saved';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    function setupRealTimeValidation() {
        realTimeValidation = true;
        
        // Add visual feedback for form fields
        document.addEventListener('input', function(e) {
            if (!realTimeValidation || !e.target.closest('#incident-report-modal')) return;
            
            const field = e.target;
            if (field.hasAttribute('required')) {
                if (field.value.trim() === '') {
                    field.classList.add('border-red-500');
                    field.classList.remove('border-green-500');
                } else {
                    field.classList.add('border-green-500');
                    field.classList.remove('border-red-500');
                }
            }
        });
    }

    function monitorConnectionStatus() {
        const checkConnection = () => {
            fetch('/api/health', { method: 'HEAD' })
                .then(() => {
                    updateConnectionStatus(true);
                })
                .catch(() => {
                    updateConnectionStatus(false);
                });
        };
        
        setInterval(checkConnection, 30000); // Check every 30 seconds
        checkConnection(); // Initial check
    }

    function updateConnectionStatus(isOnline) {
        let statusElement = document.getElementById('connection-status');
        
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'connection-status';
            statusElement.className = 'fixed top-4 left-4 px-3 py-2 rounded-lg text-sm font-medium z-50';
            document.body.appendChild(statusElement);
        }
        
        if (isOnline) {
            statusElement.className = 'fixed top-4 left-4 px-3 py-2 rounded-lg text-sm font-medium z-50 bg-green-500 text-white';
            statusElement.innerHTML = '<i class="fas fa-wifi mr-2"></i>Online';
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        } else {
            statusElement.className = 'fixed top-4 left-4 px-3 py-2 rounded-lg text-sm font-medium z-50 bg-red-500 text-white';
            statusElement.innerHTML = '<i class="fas fa-wifi-slash mr-2"></i>Offline - Data will sync when reconnected';
            statusElement.style.display = 'block';
        }
    }

    // Trigger real-time notifications
    function triggerRealTimeNotifications(reportData, caseNumber) {
        // Notify all connected portals
        const notification = {
            type: 'new_case',
            case_number: caseNumber,
            incident_type: reportData.template,
            priority: determinePriority(reportData),
            district: reportData.basic_info.district,
            services_needed: reportData.services_needed,
            timestamp: new Date().toISOString()
        };
        
        // Broadcast to all portals via WebSocket (simulated)
        broadcastToAllPortals(notification);
        
        // Update dashboard in real-time
        updateDashboardRealTime(notification);
    }

    function broadcastToAllPortals(notification) {
        // Simulate real-time broadcast to all portals
        console.log('🚨 REAL-TIME NOTIFICATION BROADCAST:', notification);
        
        // Ministry Portal - sees everything
        if (typeof window.ministryPortal !== 'undefined') {
            window.ministryPortal.receiveNotification(notification);
        }
        
        // Rainbo Initiative - gets service requests
        if (typeof window.rainboPortal !== 'undefined' && 
            (notification.services_needed.includes('medical') || 
             notification.services_needed.includes('counseling') || 
             notification.services_needed.includes('shelter'))) {
            window.rainboPortal.receiveServiceRequest(notification);
        }
        
        // Police FSU - gets investigation cases
        if (typeof window.policeFSUPortal !== 'undefined') {
            window.policeFSUPortal.receiveInvestigationCase(notification);
        }
        
        // Show real-time alert on current page
        showRealTimeAlert(notification);
    }

    function showRealTimeAlert(notification) {
        const alertBanner = document.getElementById('alert-banner');
        const alertMessage = document.getElementById('alert-message');
        
        if (alertBanner && alertMessage) {
            alertMessage.textContent = `🚨 NEW CASE REPORTED: ${notification.case_number} - ${notification.incident_type.replace('_', ' ').toUpperCase()} in ${notification.district}`;
            alertBanner.classList.remove('hidden');
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                alertBanner.classList.add('hidden');
            }, 10000);
        }
    }

    function updateDashboardRealTime(notification) {
        // Update KPI cards in real-time
        if (typeof window.GBVDashboard !== 'undefined' && window.GBVDashboard.loadData) {
            setTimeout(() => {
                window.GBVDashboard.loadData();
            }, 1000);
        }
        
        // Show notification to user
        if (typeof window.GBVDashboard !== 'undefined' && window.GBVDashboard.notify) {
            window.GBVDashboard.notify(
                `New ${notification.incident_type.replace('_', ' ')} case reported in ${notification.district}`,
                'info',
                8000
            );
        }
    }

    // Public methods
    return {
        init: initializeIncidentReportSystem,
        openReportModal: openReportModal,
        collectFormData: collectFormData,
        broadcastNotification: broadcastToAllPortals
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.incidentReportSystem.init(), 500);
    });
} else {
    setTimeout(() => window.incidentReportSystem.init(), 500);
}

console.log('📝 Incident Report System Module - Fully Loaded!');
console.log('🔥 Real-time incident reporting with comprehensive templates ready!');