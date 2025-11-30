// Analytics & Reports System - Advanced Reporting and Data Analysis Module
console.log('📊 Analytics & Reports System Loading...');

// Advanced Analytics and Reporting System for Ministry GBV Dashboard
window.analyticsReportsSystem = (function() {
    
    // Sample comprehensive reporting data
    const reportTemplates = [
        {
            id: 1,
            name: "Monthly GBV Summary Report",
            category: "Executive",
            description: "Comprehensive monthly overview of all GBV cases and interventions",
            lastGenerated: "2024-01-15",
            frequency: "Monthly",
            recipients: ["Ministry Leadership", "District Coordinators"],
            parameters: ["Date Range", "District Filter", "Case Status"],
            format: ["PDF", "Excel", "PowerPoint"],
            status: "Active"
        },
        {
            id: 2,
            name: "District Performance Analysis",
            category: "Operational",
            description: "Detailed analysis of service provider performance by district",
            lastGenerated: "2024-01-14",
            frequency: "Weekly",
            recipients: ["Regional Managers", "Service Coordinators"],
            parameters: ["District Selection", "Performance Metrics", "Time Period"],
            format: ["Excel", "CSV"],
            status: "Active"
        },
        {
            id: 3,
            name: "Survivor Journey Outcomes",
            category: "Impact",
            description: "Longitudinal analysis of survivor recovery and empowerment outcomes",
            lastGenerated: "2024-01-12",
            frequency: "Quarterly",
            recipients: ["Policy Makers", "Program Directors"],
            parameters: ["Outcome Indicators", "Follow-up Period", "Demographic Filters"],
            format: ["PDF", "PowerPoint"],
            status: "Active"
        },
        {
            id: 4,
            name: "Financial Resource Allocation",
            category: "Financial",
            description: "Budget utilization and resource allocation efficiency analysis",
            lastGenerated: "2024-01-10",
            frequency: "Monthly",
            recipients: ["Finance Department", "Ministry Leadership"],
            parameters: ["Budget Categories", "Allocation Period", "District Breakdown"],
            format: ["Excel", "PDF"],
            status: "Active"
        },
        {
            id: 5,
            name: "Early Warning System Alert",
            category: "Predictive",
            description: "AI-powered predictive analysis for potential GBV hotspots and trends",
            lastGenerated: "2024-01-15",
            frequency: "Daily",
            recipients: ["Emergency Response Team", "District Supervisors"],
            parameters: ["Risk Threshold", "Geographic Scope", "Alert Type"],
            format: ["JSON", "XML", "Email Alert"],
            status: "Active"
        }
    ];

    // Analytics data samples
    const analyticsData = {
        caseVolumeTrends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '2023',
                    data: [45, 52, 48, 61, 55, 67, 72, 69, 58, 63, 57, 71],
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)'
                },
                {
                    label: '2024 (Projected)',
                    data: [38, 44, 41, 52, 49, 58, 0, 0, 0, 0, 0, 0],
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderDash: [5, 5]
                }
            ]
        },
        resolutionRates: {
            labels: ['Western Urban', 'Western Rural', 'Bo', 'Kenema', 'Bombali', 'Tonkolili', 'Port Loko', 'Kailahun'],
            datasets: [{
                label: 'Resolution Rate (%)',
                data: [94, 87, 91, 89, 83, 78, 85, 81],
                backgroundColor: [
                    '#10B981', '#008000', '#047857', '#065F46',
                    '#F59E0B', '#D97706', '#B45309', '#92400E'
                ]
            }]
        },
        serviceUtilization: {
            labels: ['Medical Care', 'Legal Aid', 'Psychosocial Support', 'Safe House', 'Economic Empowerment', 'Education Support'],
            datasets: [{
                label: 'Utilization Rate (%)',
                data: [85, 72, 91, 67, 58, 74],
                backgroundColor: [
                    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', '#8B5CF6'
                ]
            }]
        }
    };

    // Report generation queue
    const reportQueue = [
        {
            id: 'RPT-001',
            name: 'Monthly Summary - December 2023',
            status: 'Generating',
            progress: 75,
            estimatedTime: '2 minutes',
            requestedBy: 'Dr. Sarah Johnson',
            requestedAt: '2024-01-15 14:30:00'
        },
        {
            id: 'RPT-002',
            name: 'District Performance - Bo Region',
            status: 'Queued',
            progress: 0,
            estimatedTime: '5 minutes',
            requestedBy: 'Mary Kamara',
            requestedAt: '2024-01-15 14:25:00'
        },
        {
            id: 'RPT-003',
            name: 'Financial Analysis Q4 2023',
            status: 'Completed',
            progress: 100,
            estimatedTime: 'Completed',
            requestedBy: 'Finance Director',
            requestedAt: '2024-01-15 14:15:00'
        }
    ];

    // Performance metrics
    const performanceMetrics = {
        dataQuality: 96.7,
        reportingEfficiency: 94.2,
        userSatisfaction: 4.8,
        systemUptime: 99.9,
        avgGenerationTime: '3.2 minutes',
        totalReportsGenerated: 1247,
        activeUsers: 89,
        dataVolume: '2.3 TB'
    };

    // Initialize analytics and reports system
    function initializeAnalyticsSystem() {
        console.log('🚀 Initializing Analytics & Reports System...');
        
        // Create the analytics section
        createAnalyticsSection();
        
        // Populate analytics data
        populateAnalyticsMetrics();
        populateReportTemplates();
        populateReportQueue();
        populateAnalyticsCharts();
        populateExportOptions();
        
        // Set up interactive features
        setupAnalyticsEventListeners();
        
        console.log('✅ Analytics & Reports System initialized successfully!');
    }

    // Create analytics section HTML
    function createAnalyticsSection() {
        const existingSection = document.getElementById('analytics-reports-section');
        if (existingSection) {
            existingSection.remove();
        }

        const section = document.createElement('div');
        section.id = 'analytics-reports-section';
        section.className = 'hidden space-y-6';
        section.innerHTML = `
            <!-- Analytics Header -->
            <div class="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-chart-bar mr-3"></i>
                            Analytics & Reports
                        </h2>
                        <p class="text-green-100">Advanced Data Analysis & Automated Reporting System</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" id="data-quality">96.7%</div>
                        <div class="text-sm text-green-200">Data Quality Score</div>
                    </div>
                </div>
            </div>

            <!-- Analytics Metrics Dashboard -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Reports Generated</p>
                            <p class="text-3xl font-bold text-gray-900" id="total-reports">1,247</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full">
                            <i class="fas fa-file-alt text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Active Users</p>
                            <p class="text-3xl font-bold text-gray-900" id="active-users">89</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full">
                            <i class="fas fa-users text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Avg Generation Time</p>
                            <p class="text-3xl font-bold text-gray-900" id="avg-time">3.2m</p>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-full">
                            <i class="fas fa-clock text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">User Satisfaction</p>
                            <p class="text-3xl font-bold text-gray-900" id="user-satisfaction">4.8/5</p>
                        </div>
                        <div class="p-3 bg-yellow-100 rounded-full">
                            <i class="fas fa-star text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Report Templates & Quick Actions -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Report Templates -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-gray-900">
                                <i class="fas fa-file-contract mr-2 text-green-600"></i>
                                Report Templates
                            </h3>
                            <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                <i class="fas fa-plus mr-2"></i>New Template
                            </button>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="report-templates" class="space-y-4 max-h-96 overflow-y-auto"></div>
                    </div>
                </div>

                <!-- Quick Analytics -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-tachometer-alt mr-2 text-blue-600"></i>
                            Quick Analytics
                        </h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <button class="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">Case Volume Analysis</p>
                                        <p class="text-sm text-gray-600">Real-time case trending and patterns</p>
                                    </div>
                                    <i class="fas fa-chart-line text-blue-600"></i>
                                </div>
                            </button>
                            
                            <button class="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">Service Utilization</p>
                                        <p class="text-sm text-gray-600">Service usage statistics and efficiency</p>
                                    </div>
                                    <i class="fas fa-chart-pie text-green-600"></i>
                                </div>
                            </button>
                            
                            <button class="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">Geographic Distribution</p>
                                        <p class="text-sm text-gray-600">District-wise case distribution maps</p>
                                    </div>
                                    <i class="fas fa-map-marked text-purple-600"></i>
                                </div>
                            </button>
                            
                            <button class="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">Predictive Insights</p>
                                        <p class="text-sm text-gray-600">AI-powered trend predictions</p>
                                    </div>
                                    <i class="fas fa-brain text-red-600"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analytics Visualizations -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-chart-line mr-2 text-blue-600"></i>
                            Case Volume Trends
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="case-volume-chart" width="400" height="250"></canvas>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-check-circle mr-2 text-green-600"></i>
                            Resolution Rates by District
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="resolution-rates-chart" width="400" height="250"></canvas>
                    </div>
                </div>
            </div>

            <!-- Service Utilization Analysis -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-chart-pie mr-2 text-purple-600"></i>
                        Service Utilization Analysis
                    </h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2">
                            <canvas id="service-utilization-chart" width="500" height="250"></canvas>
                        </div>
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Service Insights</h4>
                            <div class="space-y-3" id="service-insights"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Report Generation Queue -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-tasks mr-2 text-orange-600"></i>
                            Report Generation Queue
                        </h3>
                        <button class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                            <i class="fas fa-refresh mr-2"></i>Refresh Queue
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <div id="report-queue" class="space-y-4"></div>
                </div>
            </div>

            <!-- Export & Sharing Options -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-download mr-2 text-indigo-600"></i>
                        Export & Sharing Options
                    </h3>
                </div>
                <div class="p-6">
                    <div id="export-options" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                </div>
            </div>
        `;

        // Append to the dashboard container
        const dashboardContainer = document.querySelector('.min-h-screen .max-w-7xl');
        if (dashboardContainer) {
            dashboardContainer.appendChild(section);
        }
    }

    // Populate analytics metrics
    function populateAnalyticsMetrics() {
        document.getElementById('data-quality').textContent = `${performanceMetrics.dataQuality}%`;
        document.getElementById('total-reports').textContent = performanceMetrics.totalReportsGenerated.toLocaleString();
        document.getElementById('active-users').textContent = performanceMetrics.activeUsers;
        document.getElementById('avg-time').textContent = performanceMetrics.avgGenerationTime;
        document.getElementById('user-satisfaction').textContent = `${performanceMetrics.userSatisfaction}/5`;
    }

    // Populate report templates
    function populateReportTemplates() {
        const templates = document.getElementById('report-templates');
        if (!templates) return;

        templates.innerHTML = reportTemplates.map(template => {
            const categoryColor = {
                'Executive': 'bg-purple-100 text-purple-800',
                'Operational': 'bg-blue-100 text-blue-800',
                'Impact': 'bg-green-100 text-green-800',
                'Financial': 'bg-yellow-100 text-yellow-800',
                'Predictive': 'bg-red-100 text-red-800'
            }[template.category];

            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <h4 class="text-lg font-semibold text-gray-900">${template.name}</h4>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}">
                                    ${template.category}
                                </span>
                            </div>
                            
                            <p class="text-sm text-gray-600 mt-1">${template.description}</p>
                            
                            <div class="mt-3 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Frequency:</span>
                                    <span class="font-medium ml-1">${template.frequency}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">Last Generated:</span>
                                    <span class="font-medium ml-1">${template.lastGenerated}</span>
                                </div>
                            </div>
                            
                            <div class="mt-2 flex flex-wrap gap-1">
                                ${template.format.map(format => 
                                    `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">${format}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="flex space-x-2 ml-4">
                            <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                <i class="fas fa-play mr-1"></i>Generate
                            </button>
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <i class="fas fa-edit mr-1"></i>Edit
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Populate report generation queue
    function populateReportQueue() {
        const queue = document.getElementById('report-queue');
        if (!queue) return;

        queue.innerHTML = reportQueue.map(report => {
            const statusColor = {
                'Generating': 'text-blue-600',
                'Queued': 'text-yellow-600',
                'Completed': 'text-green-600',
                'Failed': 'text-red-600'
            }[report.status];

            const bgColor = {
                'Generating': 'bg-blue-50',
                'Queued': 'bg-yellow-50',
                'Completed': 'bg-green-50',
                'Failed': 'bg-red-50'
            }[report.status];

            return `
                <div class="${bgColor} border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <h4 class="font-medium text-gray-900">${report.name}</h4>
                                <span class="${statusColor} font-medium text-sm">${report.status}</span>
                            </div>
                            
                            <div class="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                    <span class="font-medium">ID:</span> ${report.id}
                                </div>
                                <div>
                                    <span class="font-medium">Requested by:</span> ${report.requestedBy}
                                </div>
                                <div>
                                    <span class="font-medium">Time:</span> ${report.estimatedTime}
                                </div>
                            </div>
                            
                            ${report.status === 'Generating' ? `
                                <div class="mt-3">
                                    <div class="flex items-center justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>${report.progress}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${report.progress}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex space-x-2 ml-4">
                            ${report.status === 'Completed' ? `
                                <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                    <i class="fas fa-download mr-1"></i>Download
                                </button>
                            ` : report.status === 'Generating' || report.status === 'Queued' ? `
                                <button class="text-red-600 hover:text-red-800 text-sm font-medium">
                                    <i class="fas fa-times mr-1"></i>Cancel
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Create analytics charts
    function populateAnalyticsCharts() {
        setTimeout(() => {
            // Case Volume Trends Chart
            const caseVolumeCtx = document.getElementById('case-volume-chart');
            if (caseVolumeCtx && typeof Chart !== 'undefined') {
                new Chart(caseVolumeCtx, {
                    type: 'line',
                    data: analyticsData.caseVolumeTrends,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Resolution Rates Chart
            const resolutionCtx = document.getElementById('resolution-rates-chart');
            if (resolutionCtx && typeof Chart !== 'undefined') {
                new Chart(resolutionCtx, {
                    type: 'bar',
                    data: analyticsData.resolutionRates,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                });
            }

            // Service Utilization Chart
            const serviceCtx = document.getElementById('service-utilization-chart');
            if (serviceCtx && typeof Chart !== 'undefined') {
                new Chart(serviceCtx, {
                    type: 'doughnut',
                    data: analyticsData.serviceUtilization,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                });
            }
        }, 1000);
    }

    // Populate service insights
    function populateServiceInsights() {
        const insights = document.getElementById('service-insights');
        if (!insights) return;

        const serviceInsights = [
            {
                title: 'Top Performing Service',
                value: 'Psychosocial Support',
                rate: '91%',
                trend: 'up',
                color: 'text-green-600'
            },
            {
                title: 'Needs Attention',
                value: 'Economic Empowerment',
                rate: '58%',
                trend: 'down',
                color: 'text-red-600'
            },
            {
                title: 'Most Requested',
                value: 'Medical Care',
                rate: '85%',
                trend: 'up',
                color: 'text-blue-600'
            },
            {
                title: 'Fastest Response',
                value: 'Legal Aid',
                rate: '72%',
                trend: 'stable',
                color: 'text-gray-600'
            }
        ];

        insights.innerHTML = serviceInsights.map(insight => `
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-xs font-medium text-gray-600 uppercase">${insight.title}</div>
                <div class="flex items-center justify-between mt-1">
                    <div class="font-semibold text-gray-900">${insight.value}</div>
                    <div class="flex items-center space-x-1">
                        <span class="${insight.color} font-medium">${insight.rate}</span>
                        <i class="fas fa-arrow-${insight.trend === 'up' ? 'up' : insight.trend === 'down' ? 'down' : 'right'} ${insight.color} text-xs"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Populate export options
    function populateExportOptions() {
        const exportOptions = document.getElementById('export-options');
        if (!exportOptions) return;

        const formats = [
            { name: 'PDF Report', icon: 'fa-file-pdf', color: 'red', description: 'Executive summary format' },
            { name: 'Excel Spreadsheet', icon: 'fa-file-excel', color: 'green', description: 'Data analysis ready' },
            { name: 'PowerPoint Presentation', icon: 'fa-file-powerpoint', color: 'orange', description: 'Ministry briefing format' },
            { name: 'CSV Data', icon: 'fa-file-csv', color: 'blue', description: 'Raw data export' },
            { name: 'JSON API', icon: 'fa-code', color: 'purple', description: 'Developer integration' },
            { name: 'XML Export', icon: 'fa-file-code', color: 'gray', description: 'System interoperability' }
        ];

        exportOptions.innerHTML = formats.map(format => `
            <button class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center">
                <div class="text-${format.color}-600 text-3xl mb-2">
                    <i class="fas ${format.icon}"></i>
                </div>
                <h4 class="font-medium text-gray-900">${format.name}</h4>
                <p class="text-sm text-gray-600 mt-1">${format.description}</p>
                <div class="mt-3">
                    <span class="bg-${format.color}-100 text-${format.color}-800 px-3 py-1 rounded-full text-xs font-medium">
                        Export Now
                    </span>
                </div>
            </button>
        `).join('');
    }

    // Set up event listeners
    function setupAnalyticsEventListeners() {
        // Update progress bars periodically
        setInterval(updateReportProgress, 2000);
        
        // Populate service insights
        populateServiceInsights();
    }

    // Update report generation progress
    function updateReportProgress() {
        const progressBars = document.querySelectorAll('[style*="width"]');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth < 100 && Math.random() > 0.7) {
                const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 10));
                bar.style.width = `${newWidth}%`;
                
                // Update progress text
                const progressText = bar.closest('.bg-blue-50').querySelector('span');
                if (progressText) {
                    progressText.textContent = `${newWidth}%`;
                }
            }
        });
    }

    // Public methods
    return {
        init: initializeAnalyticsSystem,
        populateData: function() {
            populateAnalyticsMetrics();
            populateReportTemplates();
            populateReportQueue();
            populateAnalyticsCharts();
            populateServiceInsights();
            populateExportOptions();
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.analyticsReportsSystem.init(), 500);
    });
} else {
    setTimeout(() => window.analyticsReportsSystem.init(), 500);
}

console.log('📊 Analytics & Reports System Module - Fully Loaded!');
console.log('🔥 Advanced reporting and data analysis system ready for Ministry demonstration');