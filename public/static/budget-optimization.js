/**
 * GBV Dashboard - Budget Optimization & Resource Management Module
 * Advanced financial planning and resource allocation for Ministry of Gender and Children's Affairs
 * Built by Insyt Solutions
 */

class BudgetOptimization {
    constructor() {
        this.initialized = false;
        this.currentFiscalYear = 2024;
        this.budgetCategories = [
            {
                id: 'prevention_programs',
                name: 'Prevention Programs',
                description: 'Community awareness and education programs',
                icon: 'fa-shield-alt',
                color: 'green',
                priority: 'high'
            },
            {
                id: 'response_services',
                name: 'Response Services',
                description: 'Direct survivor support and case management',
                icon: 'fa-ambulance',
                color: 'red',
                priority: 'critical'
            },
            {
                id: 'capacity_building',
                name: 'Capacity Building',
                description: 'Staff training and system development',
                icon: 'fa-graduation-cap',
                color: 'blue',
                priority: 'medium'
            },
            {
                id: 'infrastructure',
                name: 'Infrastructure',
                description: 'Safe houses, centers, and equipment',
                icon: 'fa-building',
                color: 'purple',
                priority: 'high'
            },
            {
                id: 'technology',
                name: 'Technology Systems',
                description: 'IT infrastructure and digital solutions',
                icon: 'fa-laptop',
                color: 'indigo',
                priority: 'medium'
            },
            {
                id: 'research_monitoring',
                name: 'Research & M&E',
                description: 'Data collection, research, and monitoring',
                icon: 'fa-chart-line',
                color: 'orange',
                priority: 'medium'
            }
        ];

        this.fundingSources = [
            { id: 'government', name: 'Government of Sierra Leone', percentage: 35, reliable: true },
            { id: 'world_bank', name: 'World Bank', percentage: 25, reliable: true },
            { id: 'un_women', name: 'UN Women', percentage: 15, reliable: true },
            { id: 'dfid', name: 'UK Foreign Office', percentage: 12, reliable: true },
            { id: 'usaid', name: 'USAID', percentage: 8, reliable: true },
            { id: 'other_ngos', name: 'Other NGOs', percentage: 5, reliable: false }
        ];

        this.districts = [
            'Western Area Urban', 'Western Area Rural', 'Bo', 'Bonthe', 'Moyamba', 
            'Pujehun', 'Bombali', 'Falaba', 'Koinadugu', 'Tonkolili', 'Karene', 
            'Kailahun', 'Kenema', 'Kono', 'Portloko', 'Kambia'
        ];

        this.totalBudget = 2500000; // $2.5M USD
        this.quarterlyBudgets = {};
        this.districtAllocations = {};
        this.expenditures = [];
        this.resourceOptimization = {};

        this.init();
    }

    init() {
        console.log('💰 Initializing Budget Optimization & Resource Management System...');
        this.generateBudgetData();
        this.calculateResourceOptimization();
        this.setupBudgetInterface();
        this.initializePredictiveModeling();
        this.initialized = true;
    }

    generateBudgetData() {
        // Generate realistic budget allocations
        this.budgetAllocations = {
            prevention_programs: {
                allocated: 750000,   // $750k (30%)
                spent: 450000,      // 60% utilization
                committed: 200000,
                available: 100000
            },
            response_services: {
                allocated: 875000,   // $875k (35%)
                spent: 650000,      // 74% utilization  
                committed: 150000,
                available: 75000
            },
            capacity_building: {
                allocated: 300000,   // $300k (12%)
                spent: 180000,      // 60% utilization
                committed: 80000,
                available: 40000
            },
            infrastructure: {
                allocated: 400000,   // $400k (16%)
                spent: 200000,      // 50% utilization
                committed: 120000,
                available: 80000
            },
            technology: {
                allocated: 125000,   // $125k (5%)
                spent: 75000,       // 60% utilization
                committed: 30000,
                available: 20000
            },
            research_monitoring: {
                allocated: 50000,    // $50k (2%)
                spent: 30000,       // 60% utilization
                committed: 15000,
                available: 5000
            }
        };

        // Generate quarterly budget tracking
        this.generateQuarterlyData();
        
        // Generate district-wise allocations
        this.generateDistrictAllocations();
        
        // Generate expenditure tracking
        this.generateExpenditureData();
    }

    generateQuarterlyData() {
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        
        quarters.forEach((quarter, index) => {
            this.quarterlyBudgets[quarter] = {
                planned: this.totalBudget * 0.25,
                actual: this.totalBudget * (0.20 + Math.random() * 0.10), // 20-30% variance
                variance: 0,
                categories: {}
            };

            // Calculate variance
            this.quarterlyBudgets[quarter].variance = 
                this.quarterlyBudgets[quarter].actual - this.quarterlyBudgets[quarter].planned;

            // Category breakdown per quarter
            this.budgetCategories.forEach(category => {
                const categoryBudget = this.budgetAllocations[category.id].allocated * 0.25;
                this.quarterlyBudgets[quarter].categories[category.id] = {
                    planned: categoryBudget,
                    actual: categoryBudget * (0.8 + Math.random() * 0.4), // 80-120% variance
                    utilization: Math.random() * 0.3 + 0.6 // 60-90% utilization
                };
            });
        });
    }

    generateDistrictAllocations() {
        const totalPopulation = 7976983; // Sierra Leone population
        const districtPopulations = {
            'Western Area Urban': 1055964,
            'Western Area Rural': 442951,
            'Bo': 654142,
            'Bonthe': 168729,
            'Moyamba': 278119,
            'Pujehun': 335574,
            'Bombali': 606183,
            'Falaba': 204417,
            'Koinadugu': 408097,
            'Tonkolili': 531435,
            'Karene': 318064,
            'Kailahun': 525562,
            'Kenema': 609873,
            'Kono': 506847,
            'Portloko': 653376,
            'Kambia': 335838
        };

        this.districts.forEach(district => {
            const population = districtPopulations[district] || 300000;
            const populationWeight = population / totalPopulation;
            
            // Risk-adjusted allocation (higher risk = more funding)
            const riskMultiplier = this.getDistrictRiskMultiplier(district);
            const baseAllocation = this.totalBudget * populationWeight;
            const adjustedAllocation = baseAllocation * riskMultiplier;

            this.districtAllocations[district] = {
                population: population,
                baseAllocation: baseAllocation,
                riskMultiplier: riskMultiplier,
                finalAllocation: adjustedAllocation,
                spent: adjustedAllocation * (0.5 + Math.random() * 0.4), // 50-90% utilization
                programs: this.generateDistrictPrograms(district, adjustedAllocation),
                performance: this.generateDistrictPerformance()
            };
        });
    }

    getDistrictRiskMultiplier(district) {
        // Higher risk districts get more funding
        const riskFactors = {
            'Western Area Urban': 1.2,   // High population density
            'Western Area Rural': 1.0,
            'Bo': 1.1,                   // Regional center
            'Bonthe': 1.4,               // Remote, limited access
            'Moyamba': 1.2,
            'Pujehun': 1.3,              // Border area, remote
            'Bombali': 1.1,
            'Falaba': 1.3,               // New district, limited infrastructure
            'Koinadugu': 1.4,            // Remote, limited access
            'Tonkolili': 1.2,
            'Karene': 1.2,
            'Kailahun': 1.3,             // Border area
            'Kenema': 1.1,               // Regional center
            'Kono': 1.2,                 // Mining area
            'Portloko': 1.1,
            'Kambia': 1.2                // Border area
        };
        
        return riskFactors[district] || 1.0;
    }

    generateDistrictPrograms(district, allocation) {
        const programs = [
            'Community awareness campaigns',
            'Women empowerment groups',
            'Youth engagement programs',
            'Traditional leader training',
            'School-based education',
            'Healthcare provider training',
            'Safe house operations',
            'Legal aid services'
        ];

        return programs.slice(0, 4 + Math.floor(Math.random() * 4)).map(program => ({
            name: program,
            budget: allocation * (0.05 + Math.random() * 0.15), // 5-20% of district budget
            status: Math.random() > 0.2 ? 'active' : 'planning',
            beneficiaries: Math.floor(Math.random() * 500) + 100,
            startDate: new Date(2024, Math.floor(Math.random() * 12), 1)
        }));
    }

    generateDistrictPerformance() {
        return {
            casesHandled: Math.floor(Math.random() * 50) + 10,
            preventionReach: Math.floor(Math.random() * 5000) + 1000,
            serviceSatisfaction: Math.random() * 2 + 3, // 3-5 scale
            budgetEfficiency: Math.random() * 0.3 + 0.7, // 70-100%
            timeToResponse: Math.floor(Math.random() * 24) + 1 // Hours
        };
    }

    generateExpenditureData() {
        const expenditureTypes = [
            'Staff salaries', 'Training workshops', 'Community outreach', 'Equipment purchase',
            'Vehicle maintenance', 'Office rent', 'Communications', 'Travel expenses',
            'Program materials', 'Beneficiary support', 'Technology upgrades', 'Facility maintenance'
        ];

        // Generate monthly expenditures for current year
        for (let month = 0; month < 12; month++) {
            const monthlyTotal = this.totalBudget / 12 * (0.7 + Math.random() * 0.6); // ±30% variance
            const numTransactions = Math.floor(Math.random() * 15) + 10;

            for (let i = 0; i < numTransactions; i++) {
                const expenditure = {
                    id: `EXP-${month + 1}-${String(i + 1).padStart(3, '0')}`,
                    date: new Date(2024, month, Math.floor(Math.random() * 28) + 1),
                    category: this.budgetCategories[Math.floor(Math.random() * this.budgetCategories.length)].id,
                    type: expenditureTypes[Math.floor(Math.random() * expenditureTypes.length)],
                    amount: Math.floor(Math.random() * 10000) + 500,
                    district: this.districts[Math.floor(Math.random() * this.districts.length)],
                    vendor: `Vendor ${Math.floor(Math.random() * 20) + 1}`,
                    status: Math.random() > 0.1 ? 'approved' : 'pending',
                    approvedBy: `Approver ${Math.floor(Math.random() * 5) + 1}`
                };

                this.expenditures.push(expenditure);
            }
        }
    }

    calculateResourceOptimization() {
        console.log('🎯 Calculating resource optimization recommendations...');

        // Analyze budget efficiency across categories
        this.resourceOptimization = {
            underutilizedCategories: this.findUnderutilizedCategories(),
            overutilizedCategories: this.findOverutilizedCategories(),
            reallocationOpportunities: this.identifyReallocationOpportunities(),
            costEfficiencyAnalysis: this.performCostEfficiencyAnalysis(),
            predictiveRecommendations: this.generatePredictiveRecommendations(),
            riskAssessment: this.assessBudgetRisks()
        };
    }

    findUnderutilizedCategories() {
        return Object.entries(this.budgetAllocations)
            .filter(([category, data]) => {
                const utilization = data.spent / data.allocated;
                return utilization < 0.7; // Less than 70% utilization
            })
            .map(([category, data]) => ({
                category: category,
                utilization: (data.spent / data.allocated * 100).toFixed(1),
                available: data.available,
                recommendation: 'Consider reallocating unused funds to high-demand areas'
            }));
    }

    findOverutilizedCategories() {
        return Object.entries(this.budgetAllocations)
            .filter(([category, data]) => {
                const utilization = data.spent / data.allocated;
                return utilization > 0.9; // More than 90% utilization
            })
            .map(([category, data]) => ({
                category: category,
                utilization: (data.spent / data.allocated * 100).toFixed(1),
                shortage: Math.max(0, (data.spent + data.committed) - data.allocated),
                recommendation: 'May need additional funding or budget reallocation'
            }));
    }

    identifyReallocationOpportunities() {
        const opportunities = [];
        
        // Find categories with surplus that could fund deficit categories
        const surplus = this.resourceOptimization.underutilizedCategories || [];
        const deficit = this.resourceOptimization.overutilizedCategories || [];

        surplus.forEach(surplusCategory => {
            deficit.forEach(deficitCategory => {
                if (surplusCategory.available > 10000) { // Minimum threshold
                    opportunities.push({
                        from: surplusCategory.category,
                        to: deficitCategory.category,
                        amount: Math.min(surplusCategory.available, 50000), // Max $50k transfers
                        impact: 'Improve resource utilization efficiency',
                        priority: this.calculateTransferPriority(surplusCategory.category, deficitCategory.category)
                    });
                }
            });
        });

        return opportunities.sort((a, b) => b.priority - a.priority).slice(0, 5);
    }

    calculateTransferPriority(fromCategory, toCategory) {
        const categoryPriorities = {
            'response_services': 5,     // Critical
            'prevention_programs': 4,   // High
            'infrastructure': 3,        // High
            'capacity_building': 2,     // Medium
            'technology': 2,            // Medium
            'research_monitoring': 1    // Low
        };

        const fromPriority = categoryPriorities[fromCategory] || 2;
        const toPriority = categoryPriorities[toCategory] || 2;
        
        // Higher priority = transfer FROM lower priority TO higher priority
        return toPriority - fromPriority;
    }

    performCostEfficiencyAnalysis() {
        return {
            costPerCase: this.calculateCostPerCase(),
            costPerBeneficiary: this.calculateCostPerBeneficiary(),
            adminOverhead: this.calculateAdminOverhead(),
            programEffectiveness: this.calculateProgramEffectiveness(),
            bestPerformingDistricts: this.identifyBestPerformingDistricts(),
            improvementOpportunities: this.identifyImprovementOpportunities()
        };
    }

    calculateCostPerCase() {
        const totalResponseSpending = this.budgetAllocations.response_services.spent;
        const totalCasesHandled = Object.values(this.districtAllocations)
            .reduce((sum, district) => sum + district.performance.casesHandled, 0);
        
        return totalCasesHandled > 0 ? (totalResponseSpending / totalCasesHandled) : 0;
    }

    calculateCostPerBeneficiary() {
        const totalPreventionSpending = this.budgetAllocations.prevention_programs.spent;
        const totalBeneficiaries = Object.values(this.districtAllocations)
            .reduce((sum, district) => sum + district.performance.preventionReach, 0);
        
        return totalBeneficiaries > 0 ? (totalPreventionSpending / totalBeneficiaries) : 0;
    }

    calculateAdminOverhead() {
        const adminCategories = ['capacity_building', 'technology', 'research_monitoring'];
        const adminSpending = adminCategories.reduce((sum, category) => 
            sum + this.budgetAllocations[category].spent, 0);
        
        return (adminSpending / this.totalBudget * 100).toFixed(1);
    }

    calculateProgramEffectiveness() {
        return Object.entries(this.districtAllocations).map(([district, data]) => ({
            district: district,
            efficiency: (data.performance.casesHandled / data.spent * 1000000).toFixed(2), // Cases per million dollars
            satisfaction: data.performance.serviceSatisfaction,
            responseTime: data.performance.timeToResponse
        })).sort((a, b) => b.efficiency - a.efficiency);
    }

    identifyBestPerformingDistricts() {
        return Object.entries(this.districtAllocations)
            .map(([district, data]) => ({
                district: district,
                score: this.calculateDistrictScore(data),
                efficiency: data.performance.budgetEfficiency,
                satisfaction: data.performance.serviceSatisfaction
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }

    calculateDistrictScore(districtData) {
        const efficiency = districtData.performance.budgetEfficiency;
        const satisfaction = districtData.performance.serviceSatisfaction / 5; // Normalize to 0-1
        const responseTime = Math.max(0, 1 - (districtData.performance.timeToResponse / 24)); // Normalize

        return (efficiency * 0.4 + satisfaction * 0.4 + responseTime * 0.2) * 100;
    }

    identifyImprovementOpportunities() {
        return [
            {
                area: 'Technology Integration',
                impact: 'High',
                cost: 75000,
                savings: 150000,
                timeline: '6 months',
                description: 'Implement digital case management system to reduce administrative overhead'
            },
            {
                area: 'Regional Coordination',
                impact: 'Medium',
                cost: 50000,
                savings: 120000,
                timeline: '3 months',
                description: 'Establish regional hubs to optimize resource sharing and reduce travel costs'
            },
            {
                area: 'Community Partnerships',
                impact: 'High',
                cost: 25000,
                savings: 100000,
                timeline: '4 months',
                description: 'Partner with local organizations to leverage community resources'
            }
        ];
    }

    generatePredictiveRecommendations() {
        return {
            nextQuarterNeeds: this.predictNextQuarterNeeds(),
            budgetReallocations: this.recommendBudgetReallocations(),
            riskMitigation: this.recommendRiskMitigation(),
            investmentPriorities: this.identifyInvestmentPriorities()
        };
    }

    predictNextQuarterNeeds() {
        // Predict budget needs based on trends and seasonality
        const trends = {};
        
        this.budgetCategories.forEach(category => {
            const currentUtilization = this.budgetAllocations[category.id].spent / this.budgetAllocations[category.id].allocated;
            const projectedNeed = this.budgetAllocations[category.id].allocated * Math.min(1.2, currentUtilization + 0.1);
            
            trends[category.id] = {
                current: this.budgetAllocations[category.id].allocated,
                projected: projectedNeed,
                variance: projectedNeed - this.budgetAllocations[category.id].allocated,
                confidence: Math.random() * 0.2 + 0.8 // 80-100% confidence
            };
        });

        return trends;
    }

    recommendBudgetReallocations() {
        return this.resourceOptimization.reallocationOpportunities || [];
    }

    recommendRiskMitigation() {
        return [
            {
                risk: 'Funding shortfall in response services',
                probability: 'Medium',
                impact: 'High',
                mitigation: 'Establish emergency funding reserve of $100k',
                cost: 100000
            },
            {
                risk: 'Technology system failure',
                probability: 'Low',
                impact: 'High',
                mitigation: 'Implement backup systems and regular maintenance',
                cost: 25000
            },
            {
                risk: 'Staff turnover in remote areas',
                probability: 'High',
                impact: 'Medium',
                mitigation: 'Increase retention incentives and remote work support',
                cost: 75000
            }
        ];
    }

    identifyInvestmentPriorities() {
        return [
            {
                priority: 1,
                investment: 'Mobile response units',
                amount: 200000,
                expectedROI: '300% in 2 years',
                beneficiaries: 5000,
                description: 'Deploy mobile units to reach remote communities effectively'
            },
            {
                priority: 2,
                investment: 'Digital case management platform',
                amount: 150000,
                expectedROI: '250% in 18 months',
                beneficiaries: 2000,
                description: 'Streamline case management and improve coordination'
            },
            {
                priority: 3,
                investment: 'Community partnership program',
                amount: 100000,
                expectedROI: '200% in 1 year',
                beneficiaries: 8000,
                description: 'Leverage community resources for sustainable prevention'
            }
        ];
    }

    assessBudgetRisks() {
        return {
            fundingRisks: [
                { source: 'UN Women', risk: 'Low', impact: 'Medium', mitigation: 'Diversify funding sources' },
                { source: 'Government', risk: 'Medium', impact: 'High', mitigation: 'Advocate for increased allocation' }
            ],
            operationalRisks: [
                { area: 'Remote districts', risk: 'High', impact: 'High', mitigation: 'Mobile service delivery' },
                { area: 'Technology dependence', risk: 'Medium', impact: 'Medium', mitigation: 'Backup systems' }
            ],
            complianceRisks: [
                { requirement: 'Donor reporting', risk: 'Low', impact: 'High', mitigation: 'Automated reporting' }
            ]
        };
    }

    setupBudgetInterface() {
        const dashboardContent = document.getElementById('dashboard-content');
        if (!dashboardContent) return;

        let budgetSection = document.getElementById('budget-section');
        if (!budgetSection) {
            budgetSection = document.createElement('div');
            budgetSection.id = 'budget-section';
            budgetSection.className = 'hidden';
            dashboardContent.appendChild(budgetSection);
        }

        budgetSection.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Budget Optimization & Resource Management</h2>
                    <p>AI-powered financial planning and resource allocation for maximum impact</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <i class="fas fa-dollar-sign mr-2"></i>
                            <span class="text-sm">$${(this.totalBudget / 1000000).toFixed(1)}M Total Budget</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-chart-pie mr-2"></i>
                            <span class="text-sm">6 Budget Categories</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            <span class="text-sm">16 Districts Covered</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-robot mr-2"></i>
                            <span class="text-sm">AI-Powered Optimization</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Budget Overview Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-dollar-sign text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">$${(this.totalBudget / 1000000).toFixed(1)}M</h3>
                            <p class="text-sm text-gray-600">Total Budget (FY${this.currentFiscalYear})</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${((Object.values(this.budgetAllocations).reduce((sum, cat) => sum + cat.spent, 0) / this.totalBudget) * 100).toFixed(1)}%</h3>
                            <p class="text-sm text-gray-600">Budget Utilization</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-users text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${(Object.values(this.districtAllocations).reduce((sum, dist) => sum + dist.performance.preventionReach, 0) / 1000).toFixed(0)}K</h3>
                            <p class="text-sm text-gray-600">People Reached</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-optimize text-orange-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">$${(this.resourceOptimization.costEfficiencyAnalysis?.costPerCase / 1000 || 2.5).toFixed(1)}K</h3>
                            <p class="text-sm text-gray-600">Cost per Case</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Budget Allocation Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Budget Allocation by Category</h3>
                    <canvas id="budget-allocation-chart" width="400" height="300"></canvas>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Quarterly Budget Trends</h3>
                    <canvas id="quarterly-trends-chart" width="400" height="300"></canvas>
                </div>
            </div>

            <!-- Optimization Recommendations -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-6">AI Optimization Recommendations</h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-medium text-gray-900 mb-4">Reallocation Opportunities</h4>
                        <div class="space-y-3">
                            ${(this.resourceOptimization.reallocationOpportunities || []).slice(0, 3).map(opp => `
                                <div class="p-4 bg-blue-50 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-medium text-gray-900">Transfer $${(opp.amount / 1000).toFixed(0)}K</span>
                                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Priority ${opp.priority}</span>
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        From: ${this.budgetCategories.find(c => c.id === opp.from)?.name || opp.from}<br>
                                        To: ${this.budgetCategories.find(c => c.id === opp.to)?.name || opp.to}
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">${opp.impact}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <h4 class="font-medium text-gray-900 mb-4">Investment Priorities</h4>
                        <div class="space-y-3">
                            ${(this.resourceOptimization.predictiveRecommendations?.investmentPriorities || []).slice(0, 3).map(inv => `
                                <div class="p-4 bg-green-50 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-medium text-gray-900">${inv.investment}</span>
                                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">ROI: ${inv.expectedROI}</span>
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        Investment: $${(inv.amount / 1000).toFixed(0)}K<br>
                                        Beneficiaries: ${inv.beneficiaries.toLocaleString()}
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">${inv.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- District Performance Matrix -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-6">District Performance & Resource Allocation</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cases</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                            </tr>
                        </thead>
                        <tbody id="district-performance-table" class="bg-white divide-y divide-gray-200">
                            <!-- Table content will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Risk Assessment Dashboard -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Budget Risk Assessment</h3>
                    <div class="space-y-4">
                        ${(this.resourceOptimization.riskAssessment?.fundingRisks || []).map(risk => `
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                    <div class="text-sm font-medium text-gray-900">${risk.source}</div>
                                    <div class="text-xs text-gray-500">${risk.mitigation}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs font-medium ${risk.risk === 'Low' ? 'text-green-600' : risk.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'}">${risk.risk} Risk</div>
                                    <div class="text-xs text-gray-500">${risk.impact} Impact</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Cost Efficiency Metrics</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium text-gray-900">Cost per Case Handled</span>
                            <span class="text-sm text-gray-900">$${(this.resourceOptimization.costEfficiencyAnalysis?.costPerCase || 2500).toLocaleString()}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium text-gray-900">Cost per Beneficiary Reached</span>
                            <span class="text-sm text-gray-900">$${(this.resourceOptimization.costEfficiencyAnalysis?.costPerBeneficiary || 150).toFixed(0)}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium text-gray-900">Administrative Overhead</span>
                            <span class="text-sm text-gray-900">${this.resourceOptimization.costEfficiencyAnalysis?.adminOverhead || '18.5'}%</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-sm font-medium text-gray-900">Program Effectiveness Score</span>
                            <span class="text-sm text-gray-900">87/100</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.populateBudgetData();
    }

    populateBudgetData() {
        this.renderBudgetAllocationChart();
        this.renderQuarterlyTrendsChart();
        this.populateDistrictPerformanceTable();
    }

    renderBudgetAllocationChart() {
        const ctx = document.getElementById('budget-allocation-chart');
        if (!ctx) return;

        const categories = this.budgetCategories.map(cat => cat.name);
        const allocated = this.budgetCategories.map(cat => this.budgetAllocations[cat.id].allocated);
        const spent = this.budgetCategories.map(cat => this.budgetAllocations[cat.id].spent);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Allocated',
                        data: allocated,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Spent',
                        data: spent,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${(context.parsed.y / 1000).toFixed(0)}K`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    renderQuarterlyTrendsChart() {
        const ctx = document.getElementById('quarterly-trends-chart');
        if (!ctx) return;

        const quarters = Object.keys(this.quarterlyBudgets);
        const planned = quarters.map(q => this.quarterlyBudgets[q].planned);
        const actual = quarters.map(q => this.quarterlyBudgets[q].actual);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [
                    {
                        label: 'Planned Budget',
                        data: planned,
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Actual Spending',
                        data: actual,
                        borderColor: 'rgba(16, 185, 129, 1)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${(context.parsed.y / 1000).toFixed(0)}K`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    populateDistrictPerformanceTable() {
        const tbody = document.getElementById('district-performance-table');
        if (!tbody) return;

        const sortedDistricts = Object.entries(this.districtAllocations)
            .sort(([,a], [,b]) => this.calculateDistrictScore(b) - this.calculateDistrictScore(a));

        tbody.innerHTML = sortedDistricts.map(([district, data]) => {
            const utilizationPercent = (data.spent / data.finalAllocation * 100).toFixed(1);
            const efficiencyPercent = (data.performance.budgetEfficiency * 100).toFixed(1);
            const performanceScore = this.calculateDistrictScore(data).toFixed(1);

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${district}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${(data.finalAllocation / 1000).toFixed(0)}K</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex items-center">
                            <span class="mr-2">${utilizationPercent}%</span>
                            <div class="w-16 bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(100, utilizationPercent)}%"></div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.performance.casesHandled}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${efficiencyPercent}%</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.performance.serviceSatisfaction.toFixed(1)}/5.0</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            performanceScore >= 80 ? 'bg-green-100 text-green-800' :
                            performanceScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }">
                            ${performanceScore}/100
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    }

    initializePredictiveModeling() {
        console.log('🤖 Initializing predictive budget modeling...');
        
        // Setup periodic budget optimization
        setInterval(() => {
            this.updatePredictiveModels();
        }, 300000); // Update every 5 minutes
    }

    updatePredictiveModels() {
        // Simulate real-time budget optimization updates
        console.log('🔄 Updating predictive budget models...');
        
        // Recalculate optimization recommendations
        this.calculateResourceOptimization();
    }

    // Public API methods
    getBudgetData() {
        return {
            allocations: this.budgetAllocations,
            districts: this.districtAllocations,
            quarterly: this.quarterlyBudgets,
            optimization: this.resourceOptimization
        };
    }

    getOptimizationRecommendations() {
        return this.resourceOptimization;
    }

    isInitialized() {
        return this.initialized;
    }
}

// Initialize budget optimization system
window.budgetOptimization = new BudgetOptimization();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BudgetOptimization;
}