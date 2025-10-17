/**
 * Enhanced GBV Dashboard - Survivor Journey Tracking Module
 * Comprehensive survivor support pathway monitoring and outcome measurement
 * Built by Insyt FamilyCare Healthcare Technology for Ministry of Gender and Children's Affairs
 */

class SurvivorJourney {
    constructor() {
        this.initialized = false;
        this.journeyStages = [
            { id: 'initial_contact', name: 'Initial Contact', icon: 'fa-phone', color: 'blue' },
            { id: 'safety_assessment', name: 'Safety Assessment', icon: 'fa-shield-alt', color: 'yellow' },
            { id: 'emergency_services', name: 'Emergency Services', icon: 'fa-ambulance', color: 'red' },
            { id: 'counseling', name: 'Counseling Support', icon: 'fa-comments', color: 'green' },
            { id: 'legal_aid', name: 'Legal Assistance', icon: 'fa-balance-scale', color: 'purple' },
            { id: 'medical_care', name: 'Medical Care', icon: 'fa-heartbeat', color: 'pink' },
            { id: 'economic_support', name: 'Economic Empowerment', icon: 'fa-coins', color: 'orange' },
            { id: 'long_term_support', name: 'Long-term Support', icon: 'fa-hands-helping', color: 'indigo' },
            { id: 'case_closure', name: 'Case Closure/Follow-up', icon: 'fa-check-circle', color: 'gray' }
        ];
        
        this.outcomeMetrics = [
            'safety_achieved', 'psychological_wellbeing', 'legal_resolution', 
            'economic_stability', 'social_reintegration', 'service_satisfaction'
        ];
        
        this.init();
    }

    init() {
        console.log('🛤️ Initializing Survivor Journey Tracking System...');
        this.setupJourneyInterface();
        this.loadSampleJourneys();
        this.initializeOutcomeTracking();
        this.initialized = true;
    }

    setupJourneyInterface() {
        // Create survivor journey interface
        this.createJourneyDashboard();
        this.setupJourneyFilters();
        this.initializeJourneyVisualization();
    }

    createJourneyDashboard() {
        // Add journey tab content
        const dashboardContent = document.getElementById('dashboard-content');
        if (!dashboardContent) return;

        let journeySection = document.getElementById('survivor-journey-section');
        if (!journeySection) {
            journeySection = document.createElement('div');
            journeySection.id = 'survivor-journey-section';
            journeySection.className = 'hidden';
            dashboardContent.appendChild(journeySection);
        }

        journeySection.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Survivor Journey Tracking</h2>
                    <p>Comprehensive monitoring of survivor support pathways and outcomes</p>
                    <div class="mt-4 flex items-center space-x-6">
                        <div class="flex items-center">
                            <i class="fas fa-route mr-2"></i>
                            <span class="text-sm">End-to-end journey mapping</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-chart-line mr-2"></i>
                            <span class="text-sm">Outcome measurement</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            <span class="text-sm">Real-time tracking</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Journey Overview Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-user-friends text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900" id="active-journeys">156</h3>
                            <p class="text-sm text-gray-600">Active Journeys</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900" id="completed-journeys">89</h3>
                            <p class="text-sm text-gray-600">Completed Successfully</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-clock text-orange-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900" id="avg-journey-time">45</h3>
                            <p class="text-sm text-gray-600">Avg Days to Resolution</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-star text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900" id="satisfaction-score">4.7</h3>
                            <p class="text-sm text-gray-600">Avg Satisfaction (5.0)</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Journey Stage Visualization -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-6">Journey Stage Analysis</h3>
                <div class="relative">
                    <div id="journey-flow-chart" class="min-h-96"></div>
                </div>
            </div>

            <!-- Journey Details Table -->
            <div class="bg-white rounded-lg shadow mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">Individual Journey Tracking</h3>
                        <div class="flex items-center space-x-4">
                            <select id="journey-filter" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option value="all">All Stages</option>
                                <option value="initial_contact">Initial Contact</option>
                                <option value="safety_assessment">Safety Assessment</option>
                                <option value="counseling">Counseling Support</option>
                                <option value="legal_aid">Legal Assistance</option>
                            </select>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                <i class="fas fa-download mr-2"></i>Export Report
                            </button>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survivor ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days in Journey</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="journey-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Table content will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Outcome Measurement Dashboard -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Outcome Metrics</h3>
                    <canvas id="outcome-chart" width="400" height="300"></canvas>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Service Utilization Patterns</h3>
                    <canvas id="service-utilization-chart" width="400" height="300"></canvas>
                </div>
            </div>

            <!-- Journey Success Stories -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Success Stories & Case Studies</h3>
                <div id="success-stories" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Success stories will be populated by JavaScript -->
                </div>
            </div>
        `;

        this.populateJourneyData();
    }

    loadSampleJourneys() {
        // Generate sample journey data for demonstration
        this.sampleJourneys = [];
        
        for (let i = 0; i < 50; i++) {
            const startDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
            const currentStageIndex = Math.floor(Math.random() * this.journeyStages.length);
            const daysInJourney = Math.floor((Date.now() - startDate.getTime()) / (24 * 60 * 60 * 1000));
            
            const journey = {
                id: `SJ-${String(i + 1).padStart(4, '0')}`,
                survivorId: `SUR-${String(i + 1).padStart(6, '0')}`,
                startDate: startDate,
                currentStage: this.journeyStages[currentStageIndex],
                stagesCompleted: this.journeyStages.slice(0, currentStageIndex + 1),
                daysInJourney: daysInJourney,
                riskLevel: this.calculateRiskLevel(daysInJourney, currentStageIndex),
                outcomes: this.generateOutcomes(),
                services: this.generateServicesReceived(),
                satisfaction: Math.random() * 2 + 3, // 3-5 scale
                nextAction: this.getNextAction(currentStageIndex),
                caseWorker: `Worker ${Math.floor(Math.random() * 10) + 1}`,
                district: this.getRandomDistrict()
            };
            
            this.sampleJourneys.push(journey);
        }
    }

    calculateRiskLevel(daysInJourney, stageIndex) {
        // Calculate risk based on time in journey and stage progress
        let riskScore = 0;
        
        // Time-based risk (longer journeys = higher risk)
        if (daysInJourney > 60) riskScore += 3;
        else if (daysInJourney > 30) riskScore += 2;
        else if (daysInJourney > 14) riskScore += 1;
        
        // Stage-based risk (stuck in early stages = higher risk)
        if (stageIndex < 3 && daysInJourney > 14) riskScore += 2;
        if (stageIndex < 2 && daysInJourney > 7) riskScore += 1;
        
        if (riskScore >= 4) return 'Critical';
        if (riskScore >= 3) return 'High';
        if (riskScore >= 2) return 'Medium';
        return 'Low';
    }

    generateOutcomes() {
        return this.outcomeMetrics.reduce((outcomes, metric) => {
            outcomes[metric] = Math.random() * 0.4 + 0.6; // 60-100% achievement
            return outcomes;
        }, {});
    }

    generateServicesReceived() {
        const allServices = [
            'Emergency shelter', 'Medical care', 'Psychological counseling', 
            'Legal aid', 'Economic support', 'Skills training', 'Family mediation',
            'Child care', 'Transportation', 'Documentation assistance'
        ];
        
        const numServices = Math.floor(Math.random() * 5) + 2;
        return allServices.sort(() => 0.5 - Math.random()).slice(0, numServices);
    }

    getNextAction(stageIndex) {
        const actions = [
            'Schedule intake assessment',
            'Conduct safety planning',
            'Coordinate emergency response',
            'Begin counseling sessions',
            'Initiate legal proceedings',
            'Arrange medical examination',
            'Start economic empowerment program',
            'Develop long-term support plan',
            'Prepare case closure documentation'
        ];
        
        return actions[Math.min(stageIndex, actions.length - 1)];
    }

    getRandomDistrict() {
        const districts = [
            'Western Area Urban', 'Western Area Rural', 'Bo', 'Bonthe', 'Moyamba', 
            'Pujehun', 'Bombali', 'Falaba', 'Koinadugu', 'Tonkolili', 'Karene', 
            'Kailahun', 'Kenema', 'Kono', 'Portloko', 'Kambia'
        ];
        return districts[Math.floor(Math.random() * districts.length)];
    }

    populateJourneyData() {
        this.populateJourneyTable();
        this.renderOutcomeChart();
        this.renderServiceUtilizationChart();
        this.populateSuccessStories();
        this.createJourneyFlowVisualization();
    }

    populateJourneyTable() {
        const tbody = document.getElementById('journey-table-body');
        if (!tbody) return;

        const journeysToShow = this.sampleJourneys.slice(0, 15);
        
        tbody.innerHTML = journeysToShow.map(journey => {
            const progressPercent = ((journey.stagesCompleted.length / this.journeyStages.length) * 100).toFixed(0);
            const riskColorClass = this.getRiskColorClass(journey.riskLevel);
            
            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${journey.survivorId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex items-center">
                            <i class="fas ${journey.currentStage.icon} text-${journey.currentStage.color}-500 mr-2"></i>
                            ${journey.currentStage.name}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="text-xs text-gray-600">${progressPercent}% complete</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${journey.daysInJourney} days
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${journey.nextAction}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColorClass}">
                            ${journey.riskLevel}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="survivorJourney.viewJourneyDetails('${journey.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-900" onclick="survivorJourney.updateJourney('${journey.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getRiskColorClass(riskLevel) {
        const colorMap = {
            'Low': 'bg-green-100 text-green-800',
            'Medium': 'bg-yellow-100 text-yellow-800',
            'High': 'bg-orange-100 text-orange-800',
            'Critical': 'bg-red-100 text-red-800'
        };
        return colorMap[riskLevel] || 'bg-gray-100 text-gray-800';
    }

    renderOutcomeChart() {
        const ctx = document.getElementById('outcome-chart');
        if (!ctx) return;

        // Calculate average outcomes across all completed journeys
        const completedJourneys = this.sampleJourneys.filter(j => j.stagesCompleted.length === this.journeyStages.length);
        const avgOutcomes = this.outcomeMetrics.map(metric => {
            const avg = completedJourneys.reduce((sum, journey) => sum + journey.outcomes[metric], 0) / completedJourneys.length;
            return (avg * 100).toFixed(1);
        });

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Safety Achieved', 'Psychological Wellbeing', 'Legal Resolution',
                    'Economic Stability', 'Social Reintegration', 'Service Satisfaction'
                ],
                datasets: [{
                    label: 'Average Outcome Achievement (%)',
                    data: avgOutcomes,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    renderServiceUtilizationChart() {
        const ctx = document.getElementById('service-utilization-chart');
        if (!ctx) return;

        // Calculate service utilization statistics
        const serviceCount = {};
        this.sampleJourneys.forEach(journey => {
            journey.services.forEach(service => {
                serviceCount[service] = (serviceCount[service] || 0) + 1;
            });
        });

        const sortedServices = Object.entries(serviceCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: sortedServices.map(([service]) => service),
                datasets: [{
                    data: sortedServices.map(([, count]) => count),
                    backgroundColor: [
                        '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
                        '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'
                    ]
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

    populateSuccessStories() {
        const container = document.getElementById('success-stories');
        if (!container) return;

        const stories = [
            {
                title: "Complete Recovery Journey",
                description: "Survivor achieved full economic independence through skills training program",
                outcomes: ["Safety achieved", "Economic stability", "Psychological healing"],
                duration: "4 months",
                services: 8
            },
            {
                title: "Legal Justice Achieved",
                description: "Successful prosecution with comprehensive support throughout legal process",
                outcomes: ["Legal resolution", "Safety achieved", "Community support"],
                duration: "8 months",
                services: 6
            },
            {
                title: "Family Reconciliation",
                description: "Successful mediation and family healing with ongoing support",
                outcomes: ["Family stability", "Psychological wellbeing", "Social reintegration"],
                duration: "6 months",
                services: 7
            },
            {
                title: "Youth Empowerment Success",
                description: "Young survivor completed education and secured employment",
                outcomes: ["Educational achievement", "Economic empowerment", "Peer support"],
                duration: "12 months",
                services: 9
            }
        ];

        container.innerHTML = stories.map(story => `
            <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="font-medium text-gray-900 mb-2">${story.title}</h4>
                <p class="text-sm text-gray-600 mb-4">${story.description}</p>
                
                <div class="space-y-2 mb-4">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-clock text-blue-500 mr-2"></i>
                        <span>Duration: ${story.duration}</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-hospital text-green-500 mr-2"></i>
                        <span>${story.services} services utilized</span>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-1">
                    ${story.outcomes.map(outcome => `
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            ${outcome}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    createJourneyFlowVisualization() {
        // Create interactive journey flow chart
        const container = document.getElementById('journey-flow-chart');
        if (!container) return;

        // Calculate stage statistics
        const stageStats = this.journeyStages.map(stage => {
            const count = this.sampleJourneys.filter(j => j.currentStage.id === stage.id).length;
            const avgDays = this.sampleJourneys
                .filter(j => j.currentStage.id === stage.id)
                .reduce((sum, j, _, arr) => sum + j.daysInJourney / arr.length, 0);
            
            return { ...stage, count, avgDays: Math.round(avgDays) };
        });

        container.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h4 class="text-lg font-medium text-gray-900">Journey Flow Analysis</h4>
                <div class="text-sm text-gray-500">Real-time data from ${this.sampleJourneys.length} active journeys</div>
            </div>
            
            <div class="relative">
                ${stageStats.map((stage, index) => `
                    <div class="flex items-center mb-4 ${index < stageStats.length - 1 ? 'pb-4 border-b border-gray-200' : ''}">
                        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-${stage.color}-100 mr-4">
                            <i class="fas ${stage.icon} text-${stage.color}-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <h5 class="font-medium text-gray-900">${stage.name}</h5>
                                <div class="text-sm text-gray-500">${stage.count} survivors</div>
                            </div>
                            <div class="flex items-center mt-1">
                                <div class="w-full bg-gray-200 rounded-full h-2 mr-4">
                                    <div class="bg-${stage.color}-500 h-2 rounded-full" style="width: ${(stage.count / Math.max(...stageStats.map(s => s.count))) * 100}%"></div>
                                </div>
                                <span class="text-xs text-gray-500 whitespace-nowrap">Avg: ${stage.avgDays} days</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupJourneyFilters() {
        const filter = document.getElementById('journey-filter');
        if (filter) {
            filter.addEventListener('change', (e) => {
                this.filterJourneys(e.target.value);
            });
        }
    }

    filterJourneys(stage) {
        // Filter journeys by stage and update table
        let filteredJourneys = this.sampleJourneys;
        
        if (stage !== 'all') {
            filteredJourneys = this.sampleJourneys.filter(j => j.currentStage.id === stage);
        }
        
        // Update table with filtered data
        const tbody = document.getElementById('journey-table-body');
        if (tbody) {
            // Re-populate table with filtered journeys
            // Implementation would be similar to populateJourneyTable()
        }
    }

    viewJourneyDetails(journeyId) {
        const journey = this.sampleJourneys.find(j => j.id === journeyId);
        if (!journey) return;

        // Create detailed journey modal or panel
        alert(`Journey Details for ${journey.survivorId}:\n\nCurrent Stage: ${journey.currentStage.name}\nDays in Journey: ${journey.daysInJourney}\nRisk Level: ${journey.riskLevel}\nServices: ${journey.services.join(', ')}`);
    }

    updateJourney(journeyId) {
        // Open journey update interface
        console.log(`Opening update interface for journey ${journeyId}`);
        // Implementation would open a form to update journey progress
    }

    initializeOutcomeTracking() {
        console.log('📊 Initializing outcome tracking system...');
        
        // Setup periodic outcome updates
        setInterval(() => {
            this.updateOutcomeMetrics();
        }, 300000); // Update every 5 minutes
    }

    updateOutcomeMetrics() {
        // Simulate real-time outcome metric updates
        const activeJourneys = document.getElementById('active-journeys');
        const completedJourneys = document.getElementById('completed-journeys');
        const avgJourneyTime = document.getElementById('avg-journey-time');
        const satisfactionScore = document.getElementById('satisfaction-score');

        if (activeJourneys) {
            const currentActive = parseInt(activeJourneys.textContent);
            activeJourneys.textContent = currentActive + Math.floor(Math.random() * 3) - 1;
        }

        if (completedJourneys) {
            const currentCompleted = parseInt(completedJourneys.textContent);
            if (Math.random() > 0.7) { // 30% chance of new completion
                completedJourneys.textContent = currentCompleted + 1;
            }
        }

        if (avgJourneyTime) {
            const variance = Math.random() * 4 - 2; // ±2 days variance
            const newAvg = Math.max(30, 45 + variance);
            avgJourneyTime.textContent = Math.round(newAvg);
        }

        if (satisfactionScore) {
            const variance = Math.random() * 0.2 - 0.1; // ±0.1 variance
            const newScore = Math.min(5.0, Math.max(3.0, 4.7 + variance));
            satisfactionScore.textContent = newScore.toFixed(1);
        }
    }

    // Public API methods
    getJourneyData() {
        return this.sampleJourneys;
    }

    getJourneyStages() {
        return this.journeyStages;
    }

    isInitialized() {
        return this.initialized;
    }
}

// Initialize survivor journey system
window.survivorJourney = new SurvivorJourney();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SurvivorJourney;
}