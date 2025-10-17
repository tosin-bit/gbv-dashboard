// Advanced Reporting and Export System for Ministry Demo
// Comprehensive reporting capabilities for government officials and stakeholders

console.log('Loading Advanced Reporting System...');

window.ReportingSystem = {
    templates: {},
    currentReport: null,
    exportFormats: ['pdf', 'excel', 'csv', 'powerpoint'],
    scheduledReports: [],
    reportHistory: []
};

// Initialize Reporting System
function initializeReportingSystem() {
    console.log('Initializing Advanced Reporting System...');
    
    // Set up report templates
    setupReportTemplates();
    
    // Initialize export capabilities
    initializeExportSystem();
    
    // Setup scheduled reporting
    setupScheduledReporting();
}

// Report Templates for Different Stakeholders
function setupReportTemplates() {
    window.ReportingSystem.templates = {
        'ministry_monthly': {
            name: 'Ministry Monthly Report',
            description: 'Comprehensive monthly overview for Ministry leadership',
            sections: [
                'Executive Summary',
                'Key Performance Indicators',
                'Geographic Distribution',
                'Service Provider Performance',
                'Case Outcomes & Justice',
                'Referral System Analysis',
                'Recommendations'
            ],
            stakeholders: ['Ministry Leadership', 'Parliament', 'President\'s Office'],
            frequency: 'Monthly',
            confidentiality: 'Government Use Only'
        },
        'donor_quarterly': {
            name: 'Donor Quarterly Report',
            description: 'Impact and outcome report for international donors',
            sections: [
                'Program Impact Assessment',
                'Beneficiary Statistics',
                'Fund Utilization',
                'Success Stories',
                'Challenges & Mitigation',
                'Next Quarter Projections'
            ],
            stakeholders: ['UN Agencies', 'Irish Aid', 'DFID', 'World Bank'],
            frequency: 'Quarterly',
            confidentiality: 'Partner Restricted'
        },
        'public_dashboard': {
            name: 'Public Transparency Report',
            description: 'Aggregated statistics for public accountability',
            sections: [
                'National GBV Statistics',
                'Service Availability',
                'Government Response',
                'Prevention Programs',
                'How to Get Help'
            ],
            stakeholders: ['General Public', 'Civil Society', 'Media'],
            frequency: 'Monthly',
            confidentiality: 'Public'
        },
        'early_warning': {
            name: 'Early Warning Assessment',
            description: 'Risk analysis and prevention recommendations',
            sections: [
                'Risk Factor Analysis',
                'Geographic Hotspots',
                'Seasonal Patterns',
                'Predictive Indicators',
                'Prevention Recommendations',
                'Resource Allocation Needs'
            ],
            stakeholders: ['ONS', 'WANEP', 'Security Council', 'UN'],
            frequency: 'Weekly/On-Demand',
            confidentiality: 'Security Sensitive'
        },
        'service_performance': {
            name: 'Service Provider Performance',
            description: 'Detailed analysis of service delivery effectiveness',
            sections: [
                'Provider Performance Metrics',
                'Response Time Analysis',
                'Quality Indicators',
                'Capacity Assessment',
                'Training Needs',
                'Network Optimization'
            ],
            stakeholders: ['Service Providers', 'NGO Partners', 'Health Ministry'],
            frequency: 'Quarterly',
            confidentiality: 'Partner Access'
        }
    };
}

// Advanced Export System
function initializeExportSystem() {
    console.log('Setting up export capabilities...');
    
    // Add export modal functionality
    setupExportModal();
}

function setupExportModal() {
    // Add event listener for export buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('#generate-report') || e.target.closest('#generate-report')) {
            showReportGenerationModal();
        }
        
        if (e.target.matches('#export-data') || e.target.closest('#export-data')) {
            showDataExportModal();
        }
        
        if (e.target.matches('#schedule-report') || e.target.closest('#schedule-report')) {
            showScheduleReportModal();
        }
    });
}

function showReportGenerationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-4xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900">📊 Generate Advanced Report</h3>
                <button class="close-modal text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Report Templates -->
                <div class="lg:col-span-2">
                    <h4 class="font-semibold text-gray-900 mb-4">Select Report Template</h4>
                    <div class="space-y-3">
                        ${Object.entries(window.ReportingSystem.templates).map(([key, template]) => `
                            <div class="report-template-card border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors" data-template="${key}">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <h5 class="font-medium text-gray-900">${template.name}</h5>
                                        <p class="text-sm text-gray-600 mt-1">${template.description}</p>
                                        <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span>📅 ${template.frequency}</span>
                                            <span>🔒 ${template.confidentiality}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <i class="fas fa-file-alt text-2xl text-gray-400"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Report Configuration -->
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Report Configuration</h4>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="form-label">Time Period</label>
                            <select id="report-period" class="form-input">
                                <option value="last-30">Last 30 Days</option>
                                <option value="last-90">Last 3 Months</option>
                                <option value="last-year">Last Year</option>
                                <option value="custom">Custom Range</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Geographic Scope</label>
                            <select id="report-geography" class="form-input">
                                <option value="national">National (All Districts)</option>
                                <option value="regional">Regional Analysis</option>
                                <option value="district-specific">Specific Districts</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Output Format</label>
                            <div class="grid grid-cols-2 gap-2 mt-2">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" value="pdf" checked>
                                    <span class="text-sm">📄 PDF Report</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" value="excel">
                                    <span class="text-sm">📊 Excel Data</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" value="powerpoint">
                                    <span class="text-sm">📋 PowerPoint</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" value="dashboard">
                                    <span class="text-sm">🖥️ Live Dashboard</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label class="form-label">Language</label>
                            <select id="report-language" class="form-input">
                                <option value="en">🇸🇱 English</option>
                                <option value="kri">🗣️ Krio Summary</option>
                                <option value="multi">📚 Multilingual</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Distribution List</label>
                            <textarea id="report-recipients" class="form-input" rows="3" placeholder="Enter email addresses separated by commas..."></textarea>
                        </div>
                        
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h6 class="font-medium text-yellow-900 text-sm">⏱️ Estimated Generation Time</h6>
                            <p class="text-yellow-800 text-xs mt-1">Large reports: 2-5 minutes • Standard reports: 30-60 seconds</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Report Preview -->
            <div id="report-preview" class="hidden mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 class="font-semibold text-gray-900 mb-3">📋 Report Preview</h4>
                <div id="preview-content">
                    <!-- Preview content will be populated here -->
                </div>
            </div>
            
            <div class="flex justify-between items-center pt-6 border-t mt-6">
                <div class="text-sm text-gray-500">
                    Selected template: <span id="selected-template-name" class="font-medium">None</span>
                </div>
                <div class="flex space-x-4">
                    <button class="close-modal btn-secondary">Cancel</button>
                    <button id="preview-report" class="btn-secondary">
                        <i class="fas fa-eye mr-2"></i>Preview
                    </button>
                    <button id="generate-report-final" class="btn-primary">
                        <i class="fas fa-cog mr-2"></i>Generate Report
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add template selection handlers
    setupReportTemplateSelection(modal);
    
    // Add close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Add generate handler
    modal.querySelector('#generate-report-final').addEventListener('click', () => {
        generateReport(modal);
    });
}

function setupReportTemplateSelection(modal) {
    const templateCards = modal.querySelectorAll('.report-template-card');
    const selectedTemplateName = modal.querySelector('#selected-template-name');
    
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            templateCards.forEach(c => c.classList.remove('border-blue-500', 'bg-blue-50'));
            
            // Add active class to clicked card
            this.classList.add('border-blue-500', 'bg-blue-50');
            
            // Update selected template
            const templateKey = this.getAttribute('data-template');
            const template = window.ReportingSystem.templates[templateKey];
            selectedTemplateName.textContent = template.name;
            
            // Show report preview
            showReportPreview(templateKey, modal);
        });
    });
}

function showReportPreview(templateKey, modal) {
    const template = window.ReportingSystem.templates[templateKey];
    const previewDiv = modal.querySelector('#report-preview');
    const previewContent = modal.querySelector('#preview-content');
    
    previewContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h5 class="font-medium text-gray-900 mb-2">Report Sections</h5>
                <ul class="space-y-1 text-sm">
                    ${template.sections.map(section => `
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            ${section}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div>
                <h5 class="font-medium text-gray-900 mb-2">Target Stakeholders</h5>
                <div class="space-y-1">
                    ${template.stakeholders.map(stakeholder => `
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                            ${stakeholder}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    previewDiv.classList.remove('hidden');
}

function generateReport(modal) {
    const selectedCard = modal.querySelector('.report-template-card.border-blue-500');
    if (!selectedCard) {
        showNotification('Please select a report template', 'warning');
        return;
    }
    
    const templateKey = selectedCard.getAttribute('data-template');
    const template = window.ReportingSystem.templates[templateKey];
    
    // Show generation progress
    showReportGenerationProgress(template.name);
    modal.remove();
    
    // Simulate report generation
    setTimeout(() => {
        showGeneratedReport(templateKey);
    }, 3000);
}

function showReportGenerationProgress(templateName) {
    const progressModal = document.createElement('div');
    progressModal.className = 'modal';
    progressModal.innerHTML = `
        <div class="modal-content max-w-lg">
            <div class="text-center py-8">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Generating Report</h3>
                <p class="text-gray-600 mb-4">${templateName}</p>
                
                <div class="space-y-2 text-left">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>Collecting data from all sources...</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-cog fa-spin text-blue-500 mr-2"></i>
                        <span>Processing analytics and statistics...</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-400">
                        <i class="fas fa-circle mr-2"></i>
                        <span>Generating visualizations...</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-400">
                        <i class="fas fa-circle mr-2"></i>
                        <span>Formatting document...</span>
                    </div>
                </div>
                
                <div class="mt-6 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full progress-bar" style="width: 0%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">This usually takes 30-60 seconds...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressModal);
    
    // Animate progress bar
    const progressBar = progressModal.querySelector('.progress-bar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressModal.remove();
            }, 500);
        }
    }, 200);
}

function showGeneratedReport(templateKey) {
    const template = window.ReportingSystem.templates[templateKey];
    
    const reportModal = document.createElement('div');
    reportModal.className = 'modal';
    reportModal.innerHTML = `
        <div class="modal-content max-w-6xl">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900">📊 ${template.name}</h3>
                    <p class="text-gray-600">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                </div>
                <div class="flex space-x-2">
                    <button id="download-pdf" class="btn-secondary text-sm">
                        <i class="fas fa-file-pdf mr-1"></i>PDF
                    </button>
                    <button id="download-excel" class="btn-secondary text-sm">
                        <i class="fas fa-file-excel mr-1"></i>Excel
                    </button>
                    <button id="share-report" class="btn-primary text-sm">
                        <i class="fas fa-share mr-1"></i>Share
                    </button>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <!-- Report Header -->
                <div class="bg-blue-600 text-white p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold">${template.name}</h1>
                            <p class="text-blue-100">Sierra Leone Gender-Based Violence Response System</p>
                        </div>
                        <div class="text-right">
                            <div class="text-blue-100">Report Period</div>
                            <div class="font-semibold">${new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Executive Summary -->
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">📋 Executive Summary</h2>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                        <div class="bg-red-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-red-600">156</div>
                            <div class="text-red-800 font-medium">New Cases</div>
                            <div class="text-red-600 text-sm">+12% from last period</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">89%</div>
                            <div class="text-green-800 font-medium">Service Response</div>
                            <div class="text-green-600 text-sm">Within 24 hours</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">47</div>
                            <div class="text-blue-800 font-medium">Service Providers</div>
                            <div class="text-blue-600 text-sm">Active network</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600">78%</div>
                            <div class="text-purple-800 font-medium">Case Resolution</div>
                            <div class="text-purple-600 text-sm">Successfully closed</div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">Key Findings</h3>
                        <ul class="space-y-1 text-sm text-gray-700">
                            <li>• Domestic violence cases increased 15% during holiday period</li>
                            <li>• Western Urban area shows highest concentration of cases (34%)</li>
                            <li>• Average response time improved to 2.4 hours (from 3.1 hours)</li>
                            <li>• Rural districts show 23% gap in psychosocial service coverage</li>
                            <li>• Voice reporting system captured 18% more cases than traditional methods</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Key Visualizations -->
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">📊 Data Analysis</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="font-medium text-gray-900 mb-2">Geographic Distribution</h3>
                            <div class="h-48 bg-white rounded border flex items-center justify-center">
                                <div class="text-center text-gray-500">
                                    <i class="fas fa-map text-3xl mb-2"></i>
                                    <div>Interactive map visualization</div>
                                    <div class="text-sm">(Available in full report)</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="font-medium text-gray-900 mb-2">Trend Analysis</h3>
                            <div class="h-48 bg-white rounded border flex items-center justify-center">
                                <div class="text-center text-gray-500">
                                    <i class="fas fa-chart-line text-3xl mb-2"></i>
                                    <div>Time series analysis</div>
                                    <div class="text-sm">(Available in full report)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recommendations -->
                <div class="p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">💡 Key Recommendations</h2>
                    <div class="space-y-3">
                        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                            <div class="font-medium text-yellow-900">High Priority</div>
                            <div class="text-yellow-800 text-sm">Expand psychosocial services in rural districts (Koinadugu, Falaba, Karene)</div>
                        </div>
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
                            <div class="font-medium text-blue-900">Medium Priority</div>
                            <div class="text-blue-800 text-sm">Strengthen prevention programs during holiday periods to address seasonal spikes</div>
                        </div>
                        <div class="bg-green-50 border-l-4 border-green-500 p-4">
                            <div class="font-medium text-green-900">Success to Scale</div>
                            <div class="text-green-800 text-sm">Expand voice reporting system to all districts based on 18% increase in case capture</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-between items-center pt-6">
                <div class="text-sm text-gray-500">
                    Report ID: RPT-${Date.now()} | Confidentiality: ${template.confidentiality}
                </div>
                <div class="flex space-x-4">
                    <button class="close-modal btn-secondary">Close</button>
                    <button class="btn-primary">
                        <i class="fas fa-calendar-plus mr-2"></i>Schedule Next Report
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(reportModal);
    
    // Add close handlers
    reportModal.querySelector('.close-modal').addEventListener('click', () => reportModal.remove());
    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) reportModal.remove();
    });
    
    // Add download handlers
    reportModal.querySelector('#download-pdf').addEventListener('click', () => {
        showNotification(`Downloading ${template.name} as PDF...`, 'success');
    });
    
    reportModal.querySelector('#download-excel').addEventListener('click', () => {
        showNotification(`Downloading ${template.name} data as Excel...`, 'success');
    });
    
    reportModal.querySelector('#share-report').addEventListener('click', () => {
        showShareReportModal(template.name);
    });
}

function showShareReportModal(reportName) {
    const shareModal = document.createElement('div');
    shareModal.className = 'modal';
    shareModal.innerHTML = `
        <div class="modal-content max-w-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-900">📤 Share Report</h3>
                <button class="close-modal text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="form-label">Recipients</label>
                    <textarea class="form-input" rows="3" placeholder="Enter email addresses separated by commas..."></textarea>
                </div>
                
                <div>
                    <label class="form-label">Access Level</label>
                    <select class="form-input">
                        <option>View Only</option>
                        <option>Comment Access</option>
                        <option>Full Access</option>
                    </select>
                </div>
                
                <div>
                    <label class="form-label">Message (Optional)</label>
                    <textarea class="form-input" rows="2" placeholder="Add a message for recipients..."></textarea>
                </div>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div class="flex items-center">
                        <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                        <div>
                            <div class="font-medium text-blue-900 text-sm">Secure Sharing</div>
                            <div class="text-blue-800 text-xs">All shared reports are encrypted and access-controlled</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6 border-t mt-6">
                <button class="close-modal btn-secondary">Cancel</button>
                <button class="btn-primary">
                    <i class="fas fa-send mr-2"></i>Share Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Add close handlers
    shareModal.querySelector('.close-modal').addEventListener('click', () => shareModal.remove());
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) shareModal.remove();
    });
}

// Scheduled Reporting
function setupScheduledReporting() {
    console.log('Setting up scheduled reporting...');
}

function showScheduleReportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-2xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900">⏰ Schedule Automated Reports</h3>
                <button class="close-modal text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Report Schedule</h4>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="form-label">Report Template</label>
                            <select class="form-input">
                                <option>Ministry Monthly Report</option>
                                <option>Donor Quarterly Report</option>
                                <option>Public Transparency Report</option>
                                <option>Early Warning Assessment</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Frequency</label>
                            <select class="form-input">
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Delivery Time</label>
                            <div class="grid grid-cols-2 gap-2">
                                <select class="form-input">
                                    <option>1st of Month</option>
                                    <option>15th of Month</option>
                                    <option>Last Day</option>
                                </select>
                                <input type="time" class="form-input" value="09:00">
                            </div>
                        </div>
                        
                        <div>
                            <label class="form-label">Recipients</label>
                            <textarea class="form-input" rows="3" placeholder="Enter email addresses..."></textarea>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Current Scheduled Reports</h4>
                    
                    <div class="space-y-3">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-green-900 text-sm">Ministry Monthly Report</div>
                                    <div class="text-green-700 text-xs">Every 1st at 9:00 AM</div>
                                    <div class="text-green-600 text-xs">Next: Jan 1, 2024</div>
                                </div>
                                <span class="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-blue-900 text-sm">Donor Quarterly Report</div>
                                    <div class="text-blue-700 text-xs">Every quarter at 2:00 PM</div>
                                    <div class="text-blue-600 text-xs">Next: Jan 15, 2024</div>
                                </div>
                                <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">Active</span>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-medium text-gray-700 text-sm">Early Warning Weekly</div>
                                    <div class="text-gray-600 text-xs">Every Monday at 8:00 AM</div>
                                    <div class="text-gray-500 text-xs">Next: Dec 25, 2024</div>
                                </div>
                                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">Paused</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div class="flex items-start">
                            <i class="fas fa-lightbulb text-yellow-600 mr-2 mt-0.5"></i>
                            <div>
                                <div class="font-medium text-yellow-900 text-sm">Smart Scheduling</div>
                                <div class="text-yellow-800 text-xs">Reports are automatically generated and sent based on data availability and system health checks.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6 border-t mt-6">
                <button class="close-modal btn-secondary">Cancel</button>
                <button class="btn-primary">
                    <i class="fas fa-calendar-plus mr-2"></i>Schedule Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showDataExportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content max-w-3xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900">💾 Data Export & API Access</h3>
                <button class="close-modal text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Data Export Options -->
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">🗂️ Data Export</h4>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="form-label">Dataset</label>
                            <select class="form-input">
                                <option>All Cases (Anonymized)</option>
                                <option>District Statistics</option>
                                <option>Service Provider Data</option>
                                <option>Referral Analytics</option>
                                <option>Monthly Aggregates</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="form-label">Time Range</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="date" class="form-input">
                                <input type="date" class="form-input">
                            </div>
                        </div>
                        
                        <div>
                            <label class="form-label">Format</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center">
                                    <input type="radio" name="format" value="csv" class="mr-2" checked>
                                    <span class="text-sm">📊 CSV</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="format" value="excel" class="mr-2">
                                    <span class="text-sm">📈 Excel</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="format" value="json" class="mr-2">
                                    <span class="text-sm">🔗 JSON</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="format" value="xml" class="mr-2">
                                    <span class="text-sm">📋 XML</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label class="form-label">Privacy Level</label>
                            <select class="form-input">
                                <option>Fully Anonymized</option>
                                <option>Aggregated Only</option>
                                <option>Case-level (No PII)</option>
                            </select>
                        </div>
                        
                        <button class="w-full btn-primary">
                            <i class="fas fa-download mr-2"></i>Generate Export
                        </button>
                    </div>
                </div>
                
                <!-- API Access -->
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">🔌 API Access</h4>
                    
                    <div class="space-y-4">
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h5 class="font-medium text-gray-900 mb-2">REST API Endpoints</h5>
                            <div class="space-y-2 text-sm font-mono">
                                <div class="flex justify-between">
                                    <span class="text-blue-600">GET /api/stats</span>
                                    <span class="text-gray-500">Dashboard statistics</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-blue-600">GET /api/districts</span>
                                    <span class="text-gray-500">District data</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-blue-600">GET /api/cases</span>
                                    <span class="text-gray-500">Case listings</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-blue-600">POST /api/cases</span>
                                    <span class="text-gray-500">Create new case</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="form-label">API Key</label>
                            <div class="flex">
                                <input type="password" class="form-input flex-1" value="sk-gbv-sl-2024-abcd1234..." readonly>
                                <button class="ml-2 btn-secondary">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Keep your API key secure. It provides access to anonymized data only.</p>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h6 class="font-medium text-blue-900 text-sm">📖 API Documentation</h6>
                            <p class="text-blue-800 text-xs mt-1">Complete API documentation with examples and authentication details.</p>
                            <button class="mt-2 text-blue-700 text-xs font-medium hover:underline">
                                View Full Documentation →
                            </button>
                        </div>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                            <h6 class="font-medium text-green-900 text-sm">🔗 Integration Examples</h6>
                            <p class="text-green-800 text-xs mt-1">Sample code for common integrations (Python, R, Excel, Power BI)</p>
                            <button class="mt-2 text-green-700 text-xs font-medium hover:underline">
                                Download Examples →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6 border-t mt-6">
                <button class="close-modal btn-secondary">Close</button>
                <button class="btn-primary">
                    <i class="fas fa-key mr-2"></i>Generate New API Key
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeReportingSystem, 3000);
});

console.log('Advanced Reporting System loaded successfully');