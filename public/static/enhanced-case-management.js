/**
 * Enhanced GBV Dashboard - Comprehensive Case Management System
 * Complete case lifecycle management with privacy-first design
 * Built by Insyt FamilyCare Healthcare Technology
 */

class EnhancedCaseManagement {
    constructor() {
        this.initialized = false;
        this.cases = [];
        this.caseStatuses = ['reported', 'under_investigation', 'services_provided', 'court_proceedings', 'closed', 'referred'];
        this.priorityLevels = ['low', 'medium', 'high', 'critical'];
        this.gbvTypes = [
            'Physical Violence', 'Sexual Violence', 'Emotional/Psychological Violence',
            'Economic Violence', 'Domestic Violence', 'Intimate Partner Violence',
            'Child Sexual Abuse', 'Human Trafficking', 'Forced Marriage', 'FGM/C'
        ];
        this.districts = [
            'Western Area Urban', 'Western Area Rural', 'Bo', 'Bombali', 'Bonthe', 
            'Moyamba', 'Tonkolili', 'Portloko', 'Kambia', 'Kenema', 'Kono', 
            'Kailahun', 'Pujehun', 'Koinadugu', 'Falaba', 'Karene'
        ];
        this.serviceProviders = [
            'Rainbo Initiative', 'AdvocAid', 'Defense for Children International',
            'Forum for African Women Educationalists', 'Action Against Hunger',
            'World Vision Sierra Leone', 'UNICEF Sierra Leone'
        ];
        this.init();
    }

    init() {
        console.log('📋 Initializing Enhanced Case Management System...');
        this.generateSampleCases();
        this.setupCaseManagementInterface();
        this.initialized = true;
    }

    generateSampleCases() {
        // Generate realistic sample cases for demonstration
        for (let i = 1; i <= 50; i++) {
            const caseData = {
                id: `CASE-${String(i).padStart(4, '0')}`,
                caseNumber: `GBV-SL-${Date.now() + i}`,
                incidentDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
                reportedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                gbvType: this.gbvTypes[Math.floor(Math.random() * this.gbvTypes.length)],
                district: this.districts[Math.floor(Math.random() * this.districts.length)],
                survivorAgeGroup: this.getRandomAgeGroup(),
                survivorGender: Math.random() > 0.1 ? 'Female' : 'Male',
                caseStatus: this.caseStatuses[Math.floor(Math.random() * this.caseStatuses.length)],
                priorityLevel: this.priorityLevels[Math.floor(Math.random() * this.priorityLevels.length)],
                assignedTo: `Case Worker ${Math.floor(Math.random() * 15) + 1}`,
                servicesProvided: this.getRandomServices(),
                lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                riskAssessment: this.generateRiskAssessment(),
                progressNotes: this.generateProgressNotes(),
                referrals: this.generateReferrals()
            };
            this.cases.push(caseData);
        }
    }

    getRandomAgeGroup() {
        const ageGroups = ['0-5', '6-11', '12-17', '18-24', '25-34', '35-49', '50+'];
        return ageGroups[Math.floor(Math.random() * ageGroups.length)];
    }

    getRandomServices() {
        const allServices = [
            'Medical Care', 'Psychological Counseling', 'Legal Aid', 'Safe House',
            'Economic Support', 'Family Mediation', 'Court Support', 'Transportation',
            'Child Care', 'Skills Training', 'Documentation Assistance'
        ];
        const numServices = Math.floor(Math.random() * 4) + 1;
        return allServices.sort(() => 0.5 - Math.random()).slice(0, numServices);
    }

    generateRiskAssessment() {
        return {
            overallRisk: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
            safetyScore: Math.floor(Math.random() * 10) + 1,
            threatLevel: ['Minimal', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
            supportSystem: Math.random() > 0.3 ? 'Available' : 'Limited'
        };
    }

    generateProgressNotes() {
        const notes = [
            'Initial intake completed. Survivor expressed willingness to pursue legal action.',
            'Medical examination conducted. Referred to counseling services.',
            'Family mediation session scheduled for next week.',
            'Court hearing attended. Survivor provided testimony.',
            'Follow-up counseling session completed. Progress noted.',
            'Economic empowerment program enrollment completed.'
        ];
        return notes.slice(0, Math.floor(Math.random() * 3) + 1);
    }

    generateReferrals() {
        return this.serviceProviders.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    }

    setupCaseManagementInterface() {
        console.log('🚀 setupCaseManagementInterface() called!');
        // Wait for dashboard content to be available
        const waitForDashboard = () => {
            const dashboardContent = document.getElementById('dashboard-content');
            if (!dashboardContent) {
                console.log('⏳ Waiting for dashboard content (Case Management)...');
                setTimeout(waitForDashboard, 500);
                return;
            }

            let caseSection = document.getElementById('case-management-section');
            if (!caseSection) {
                console.log('📝 Creating case-management-section element...');
                caseSection = document.createElement('div');
                caseSection.id = 'case-management-section';
                caseSection.className = 'hidden';
                dashboardContent.appendChild(caseSection);
                console.log('✅ Case Management section element created');
            } else {
                console.log('✅ Case Management section element already exists');
            }
            
            this.populateCaseManagementContent(caseSection);
        };
        
        waitForDashboard();
    }
    
    populateCaseManagementContent(caseSection) {
        if (caseSection.innerHTML.length > 100) {
            console.log('⏭️ Case Management section already has content, skipping');
            return;
        }
        
        console.log('📝 Populating case management section content...');

        caseSection.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Comprehensive Case Management System</h2>
                    <p>Complete case lifecycle management with privacy-first design and multi-channel support</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="text-sm">Privacy Protected</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-route mr-2"></i>
                            <span class="text-sm">Full Journey Tracking</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-users mr-2"></i>
                            <span class="text-sm">Multi-Agency Coordination</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            <span class="text-sm">Real-time Updates</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Case Statistics Overview -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-folder-open text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${this.cases.length}</h3>
                            <p class="text-sm text-gray-600">Total Active Cases</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-clock text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${this.cases.filter(c => c.caseStatus === 'reported').length}</h3>
                            <p class="text-sm text-gray-600">New Reports</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${this.cases.filter(c => c.priorityLevel === 'critical').length}</h3>
                            <p class="text-sm text-gray-600">Critical Priority</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${this.cases.filter(c => c.caseStatus === 'closed').length}</h3>
                            <p class="text-sm text-gray-600">Cases Resolved</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-calendar text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">4.2</h3>
                            <p class="text-sm text-gray-600">Avg Days to Response</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Case Management Controls -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-medium text-gray-900">Case Management Dashboard</h3>
                    <div class="flex items-center space-x-4">
                        <select id="case-status-filter" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                            <option value="all">All Statuses</option>
                            <option value="reported">Reported</option>
                            <option value="under_investigation">Under Investigation</option>
                            <option value="services_provided">Services Provided</option>
                            <option value="court_proceedings">Court Proceedings</option>
                            <option value="closed">Closed</option>
                        </select>
                        <select id="case-priority-filter" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                            <option value="all">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                            <i class="fas fa-plus mr-2"></i>New Case
                        </button>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                        <i class="fas fa-phone text-blue-500 text-xl mb-2"></i>
                        <div class="font-medium text-gray-900">Phone Report</div>
                        <div class="text-sm text-gray-500">Log phone call report</div>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                        <i class="fas fa-user-friends text-green-500 text-xl mb-2"></i>
                        <div class="font-medium text-gray-900">Walk-in Report</div>
                        <div class="text-sm text-gray-500">Register walk-in survivor</div>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                        <i class="fas fa-exchange-alt text-orange-500 text-xl mb-2"></i>
                        <div class="font-medium text-gray-900">Transfer Case</div>
                        <div class="text-sm text-gray-500">Inter-agency transfer</div>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                        <i class="fas fa-calendar-check text-purple-500 text-xl mb-2"></i>
                        <div class="font-medium text-gray-900">Schedule Follow-up</div>
                        <div class="text-sm text-gray-500">Book appointment</div>
                    </button>
                </div>
            </div>

            <!-- Cases Table -->
            <div class="bg-white rounded-lg shadow mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900">Active Cases</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="cases-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Table content will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Case Analytics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Case Status Distribution</h3>
                    <canvas id="case-status-chart" width="400" height="300"></canvas>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Case Resolution Timeline</h3>
                    <canvas id="case-timeline-chart" width="400" height="300"></canvas>
                </div>
            </div>
        `;
        
        console.log('✅ Case Management section content populated successfully!');
        this.populateCaseData();
    }

    populateCaseData() {
        this.populateCaseTable();
        this.renderCaseStatusChart();
        this.renderCaseTimelineChart();
        this.setupCaseFilters();
    }

    populateCaseTable() {
        const tbody = document.getElementById('cases-table-body');
        if (!tbody) return;

        const casesToShow = this.cases.slice(0, 15);

        tbody.innerHTML = casesToShow.map(caseItem => {
            const statusColorClass = this.getStatusColorClass(caseItem.caseStatus);
            const priorityColorClass = this.getPriorityColorClass(caseItem.priorityLevel);
            
            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${caseItem.id}</div>
                        <div class="text-sm text-gray-500">${caseItem.caseNumber}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${caseItem.gbvType}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${caseItem.district}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorClass}">
                            ${caseItem.caseStatus.replace('_', ' ')}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColorClass}">
                            ${caseItem.priorityLevel}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${caseItem.assignedTo}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${caseItem.lastUpdated.toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="enhancedCaseManagement.viewCase('${caseItem.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-900 mr-2" onclick="enhancedCaseManagement.editCase('${caseItem.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-purple-600 hover:text-purple-900" onclick="enhancedCaseManagement.addNote('${caseItem.id}')">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getStatusColorClass(status) {
        const colorMap = {
            'reported': 'bg-yellow-100 text-yellow-800',
            'under_investigation': 'bg-blue-100 text-blue-800',
            'services_provided': 'bg-green-100 text-green-800',
            'court_proceedings': 'bg-purple-100 text-purple-800',
            'closed': 'bg-gray-100 text-gray-800',
            'referred': 'bg-orange-100 text-orange-800'
        };
        return colorMap[status] || 'bg-gray-100 text-gray-800';
    }

    getPriorityColorClass(priority) {
        const colorMap = {
            'low': 'bg-green-100 text-green-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'high': 'bg-orange-100 text-orange-800',
            'critical': 'bg-red-100 text-red-800'
        };
        return colorMap[priority] || 'bg-gray-100 text-gray-800';
    }

    renderCaseStatusChart() {
        const ctx = document.getElementById('case-status-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        const statusCounts = this.caseStatuses.map(status => 
            this.cases.filter(c => c.caseStatus === status).length
        );

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.caseStatuses.map(s => s.replace('_', ' ')),
                datasets: [{
                    data: statusCounts,
                    backgroundColor: [
                        '#FEF3C7', '#DBEAFE', '#D1FAE5', '#E9D5FF', '#F3F4F6', '#FED7AA'
                    ],
                    borderColor: [
                        '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#6B7280', '#F97316'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderCaseTimelineChart() {
        const ctx = document.getElementById('case-timeline-chart');
        if (!ctx || typeof Chart === 'undefined') return;

        const last30Days = Array.from({length: 30}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        const casesPerDay = last30Days.map(() => Math.floor(Math.random() * 8) + 2);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last30Days,
                datasets: [{
                    label: 'New Cases',
                    data: casesPerDay,
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Case Intake (Last 30 Days)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Cases'
                        }
                    }
                }
            }
        });
    }

    setupCaseFilters() {
        const statusFilter = document.getElementById('case-status-filter');
        const priorityFilter = document.getElementById('case-priority-filter');

        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterCases());
        }
        if (priorityFilter) {
            priorityFilter.addEventListener('change', () => this.filterCases());
        }
    }

    filterCases() {
        // Filter implementation would go here
        console.log('Filtering cases...');
        this.populateCaseTable();
    }

    // Public methods for case interactions
    viewCase(caseId) {
        const caseItem = this.cases.find(c => c.id === caseId);
        if (caseItem) {
            alert(`Case Details: ${caseId}\\n\\nType: ${caseItem.gbvType}\\nDistrict: ${caseItem.district}\\nStatus: ${caseItem.caseStatus}\\nPriority: ${caseItem.priorityLevel}\\nAssigned: ${caseItem.assignedTo}\\n\\nServices: ${caseItem.servicesProvided.join(', ')}\\n\\nRisk Assessment: ${caseItem.riskAssessment.overallRisk}`);
        }
    }

    editCase(caseId) {
        console.log(`Opening edit form for case ${caseId}`);
        // In production, would open case edit modal
    }

    addNote(caseId) {
        const note = prompt('Add progress note:');
        if (note) {
            console.log(`Adding note to case ${caseId}: ${note}`);
            // In production, would save note to database
        }
    }

    // Public API
    getCases() {
        return this.cases;
    }

    isInitialized() {
        return this.initialized;
    }
}

// Initialize enhanced case management system
window.enhancedCaseManagement = new EnhancedCaseManagement();