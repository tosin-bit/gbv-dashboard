// Export System - Multi-format data export
// Comprehensive data export functionality for GBV Dashboard (PDF, Excel, CSV, JSON)

const exportFormats = [
  {
    id: 'pdf',
    name: 'PDF Document',
    icon: 'file-pdf',
    color: 'red',
    description: 'Professional report format with charts and formatting',
    features: ['Charts', 'Tables', 'Formatting', 'Headers/Footers'],
    size: 'Medium',
    recommended: ['Reports', 'Case Files', 'Presentations']
  },
  {
    id: 'excel',
    name: 'Excel Spreadsheet',
    icon: 'file-excel',
    color: 'green',
    description: 'Editable spreadsheet with multiple sheets and formulas',
    features: ['Multiple Sheets', 'Formulas', 'Filters', 'Pivot Tables'],
    size: 'Large',
    recommended: ['Data Analysis', 'Statistics', 'Bulk Editing']
  },
  {
    id: 'csv',
    name: 'CSV File',
    icon: 'file-csv',
    color: 'blue',
    description: 'Simple comma-separated values for universal compatibility',
    features: ['Lightweight', 'Universal', 'Simple', 'Fast'],
    size: 'Small',
    recommended: ['Data Import', 'Quick Backup', 'Legacy Systems']
  },
  {
    id: 'json',
    name: 'JSON Data',
    icon: 'file-code',
    color: 'purple',
    description: 'Structured data format for API integration and developers',
    features: ['Structured', 'API-Ready', 'Hierarchical', 'Complete'],
    size: 'Medium',
    recommended: ['API Integration', 'Backups', 'Migration']
  }
];

const exportTemplates = {
  cases: {
    name: 'Cases Export',
    icon: 'folder',
    description: 'Export case records with filters',
    fields: [
      { id: 'case_number', label: 'Case Number', required: true },
      { id: 'date_reported', label: 'Date Reported', required: true },
      { id: 'violence_type', label: 'Violence Type', required: true },
      { id: 'status', label: 'Status', required: true },
      { id: 'risk_level', label: 'Risk Level', required: false },
      { id: 'assigned_to', label: 'Assigned To', required: false },
      { id: 'last_updated', label: 'Last Updated', required: false },
      { id: 'survivor_age', label: 'Survivor Age', required: false },
      { id: 'location', label: 'Location', required: false },
      { id: 'services_provided', label: 'Services Provided', required: false }
    ],
    filters: ['date_range', 'status', 'violence_type', 'organization']
  },
  analytics: {
    name: 'Analytics Export',
    icon: 'chart-line',
    description: 'Statistical data and trends',
    fields: [
      { id: 'metric_name', label: 'Metric', required: true },
      { id: 'value', label: 'Value', required: true },
      { id: 'period', label: 'Period', required: true },
      { id: 'comparison', label: 'Comparison', required: false },
      { id: 'trend', label: 'Trend', required: false }
    ],
    filters: ['date_range', 'metric_type']
  },
  survivors: {
    name: 'Survivor Data',
    icon: 'user-shield',
    description: 'Anonymized survivor information',
    fields: [
      { id: 'survivor_id', label: 'ID (Anonymized)', required: true },
      { id: 'age_group', label: 'Age Group', required: true },
      { id: 'gender', label: 'Gender', required: true },
      { id: 'location', label: 'Location', required: false },
      { id: 'cases_count', label: 'Number of Cases', required: false },
      { id: 'services_received', label: 'Services Received', required: false },
      { id: 'outcome', label: 'Outcome', required: false }
    ],
    filters: ['date_range', 'age_group', 'location']
  },
  services: {
    name: 'Services Report',
    icon: 'hand-holding-heart',
    description: 'Services provided and utilization',
    fields: [
      { id: 'service_type', label: 'Service Type', required: true },
      { id: 'provider', label: 'Service Provider', required: true },
      { id: 'cases_served', label: 'Cases Served', required: true },
      { id: 'date', label: 'Date', required: true },
      { id: 'outcome', label: 'Outcome', required: false },
      { id: 'notes', label: 'Notes', required: false }
    ],
    filters: ['date_range', 'service_type', 'provider']
  }
};

let exportConfig = {
  template: 'cases',
  format: 'pdf',
  fields: [],
  filters: {},
  includeCharts: true,
  includeHeaders: true,
  anonymize: true
};

function showExportSystem() {
  const modalHTML = `
    <div id="export-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <i class="fas fa-file-download text-2xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Export System</h2>
              <p class="text-sm text-green-100">Multi-format data export with advanced options</p>
            </div>
          </div>
          <button onclick="closeExportSystem()" class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-hidden flex">
          <!-- Left: Configuration -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Step 1: Choose Template -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Choose Data Template
              </h3>
              <div class="grid grid-cols-2 gap-4">
                ${Object.entries(exportTemplates).map(([key, template]) => `
                  <div onclick="selectExportTemplate('${key}')" 
                       id="template-${key}"
                       class="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 cursor-pointer transition-all group ${key === 'cases' ? 'border-green-500 bg-green-50' : ''}">
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <i class="fas fa-${template.icon} text-green-600 text-xl"></i>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-gray-800">${template.name}</h4>
                        <p class="text-xs text-gray-600">${template.description}</p>
                      </div>
                      <i class="fas fa-check-circle text-green-600 text-xl ${key === 'cases' ? '' : 'opacity-0'}" id="template-check-${key}"></i>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Step 2: Choose Format -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Choose Export Format
              </h3>
              <div class="grid grid-cols-2 gap-4">
                ${exportFormats.map(format => `
                  <div onclick="selectExportFormat('${format.id}')" 
                       id="format-${format.id}"
                       class="p-4 border-2 border-gray-200 rounded-xl hover:border-${format.color}-500 cursor-pointer transition-all group ${format.id === 'pdf' ? 'border-red-500 bg-red-50' : ''}">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-${format.color}-100 rounded-lg flex items-center justify-center">
                          <i class="fas fa-${format.icon} text-${format.color}-600 text-2xl"></i>
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-800">${format.name}</h4>
                          <p class="text-xs text-gray-500">Size: ${format.size}</p>
                        </div>
                      </div>
                      <i class="fas fa-check-circle text-${format.color}-600 text-xl ${format.id === 'pdf' ? '' : 'opacity-0'}" id="format-check-${format.id}"></i>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${format.description}</p>
                    <div class="flex flex-wrap gap-1 mb-2">
                      ${format.features.map(feat => `
                        <span class="px-2 py-0.5 bg-${format.color}-100 text-${format.color}-700 rounded text-xs">${feat}</span>
                      `).join('')}
                    </div>
                    <div class="text-xs text-gray-500">
                      <i class="fas fa-lightbulb text-yellow-500 mr-1"></i>
                      Best for: ${format.recommended.join(', ')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Step 3: Configure Options -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Configure Export Options
              </h3>

              <!-- Date Range Filter -->
              <div class="mb-4 p-4 bg-gray-50 rounded-xl">
                <h4 class="font-semibold text-gray-800 mb-3">Date Range</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input type="date" id="export-start-date" 
                           value="2024-01-01"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input type="date" id="export-end-date" 
                           value="${new Date().toISOString().split('T')[0]}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  </div>
                </div>
              </div>

              <!-- Field Selection -->
              <div class="mb-4 p-4 bg-gray-50 rounded-xl">
                <h4 class="font-semibold text-gray-800 mb-3">Select Fields to Export</h4>
                <div id="field-selection" class="grid grid-cols-2 gap-2">
                  ${renderFieldSelection(exportTemplates.cases)}
                </div>
              </div>

              <!-- Advanced Options -->
              <div class="p-4 bg-gray-50 rounded-xl">
                <h4 class="font-semibold text-gray-800 mb-3">Advanced Options</h4>
                <div class="space-y-3">
                  <label class="flex items-center gap-2">
                    <input type="checkbox" id="export-include-charts" checked 
                           class="w-4 h-4 text-green-600 rounded">
                    <span class="text-sm text-gray-700">Include charts and visualizations (PDF only)</span>
                  </label>
                  <label class="flex items-center gap-2">
                    <input type="checkbox" id="export-include-headers" checked 
                           class="w-4 h-4 text-green-600 rounded">
                    <span class="text-sm text-gray-700">Include headers and metadata</span>
                  </label>
                  <label class="flex items-center gap-2">
                    <input type="checkbox" id="export-anonymize" checked 
                           class="w-4 h-4 text-green-600 rounded">
                    <span class="text-sm text-gray-700">Anonymize sensitive data (recommended)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Preview & Actions -->
          <div class="w-96 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Export Summary</h3>

            <!-- Summary Card -->
            <div class="bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
              <div class="space-y-3">
                <div>
                  <div class="text-xs text-gray-500 mb-1">Template</div>
                  <div class="font-semibold text-gray-800" id="summary-template">Cases Export</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Format</div>
                  <div class="font-semibold text-gray-800" id="summary-format">PDF Document</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Date Range</div>
                  <div class="font-semibold text-gray-800" id="summary-dates">Jan 2024 - Present</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Fields</div>
                  <div class="font-semibold text-gray-800" id="summary-fields">10 fields selected</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Estimated Records</div>
                  <div class="font-semibold text-gray-800">1,234 records</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Estimated Size</div>
                  <div class="font-semibold text-gray-800">~2.5 MB</div>
                </div>
              </div>
            </div>

            <!-- Export Button -->
            <button onclick="startExport()" 
                    class="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 font-bold text-lg mb-4 flex items-center justify-center gap-2">
              <i class="fas fa-download"></i>
              Export Data
            </button>

            <!-- Quick Export Options -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-3 text-sm">Quick Export</h4>
              <div class="space-y-2">
                <button onclick="quickExport('cases', 'pdf')" 
                        class="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 text-sm text-left flex items-center justify-between group">
                  <span><i class="fas fa-file-pdf text-red-600 mr-2"></i>All Cases (PDF)</span>
                  <i class="fas fa-arrow-right text-gray-400 group-hover:text-red-600"></i>
                </button>
                <button onclick="quickExport('cases', 'excel')" 
                        class="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 text-sm text-left flex items-center justify-between group">
                  <span><i class="fas fa-file-excel text-green-600 mr-2"></i>All Cases (Excel)</span>
                  <i class="fas fa-arrow-right text-gray-400 group-hover:text-green-600"></i>
                </button>
                <button onclick="quickExport('analytics', 'csv')" 
                        class="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 text-sm text-left flex items-center justify-between group">
                  <span><i class="fas fa-file-csv text-blue-600 mr-2"></i>Analytics (CSV)</span>
                  <i class="fas fa-arrow-right text-gray-400 group-hover:text-blue-600"></i>
                </button>
              </div>
            </div>

            <!-- Recent Exports -->
            <div>
              <h4 class="font-semibold text-gray-800 mb-3 text-sm">Recent Exports</h4>
              <div class="space-y-2">
                <div class="p-3 bg-white border border-gray-200 rounded-lg text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-semibold text-gray-800">Cases_2024.pdf</span>
                    <span class="text-gray-500">2.1 MB</span>
                  </div>
                  <div class="text-gray-500">Yesterday, 3:45 PM</div>
                </div>
                <div class="p-3 bg-white border border-gray-200 rounded-lg text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-semibold text-gray-800">Analytics_Q1.xlsx</span>
                    <span class="text-gray-500">1.8 MB</span>
                  </div>
                  <div class="text-gray-500">2 days ago, 10:22 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function renderFieldSelection(template) {
  return template.fields.map(field => `
    <label class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
      <input type="checkbox" 
             ${field.required ? 'checked disabled' : 'checked'}
             data-field="${field.id}"
             class="w-4 h-4 text-green-600 rounded">
      <span class="text-sm text-gray-700">${field.label}${field.required ? ' *' : ''}</span>
    </label>
  `).join('');
}

function selectExportTemplate(templateKey) {
  exportConfig.template = templateKey;

  // Update UI
  Object.keys(exportTemplates).forEach(key => {
    const elem = document.getElementById(`template-${key}`);
    const check = document.getElementById(`template-check-${key}`);
    if (key === templateKey) {
      elem.classList.add('border-green-500', 'bg-green-50');
      check.classList.remove('opacity-0');
    } else {
      elem.classList.remove('border-green-500', 'bg-green-50');
      check.classList.add('opacity-0');
    }
  });

  // Update field selection
  const template = exportTemplates[templateKey];
  document.getElementById('field-selection').innerHTML = renderFieldSelection(template);
  document.getElementById('summary-template').textContent = template.name;
}

function selectExportFormat(formatId) {
  exportConfig.format = formatId;

  // Update UI
  exportFormats.forEach(format => {
    const elem = document.getElementById(`format-${format.id}`);
    const check = document.getElementById(`format-check-${format.id}`);
    if (format.id === formatId) {
      elem.classList.add(`border-${format.color}-500`, `bg-${format.color}-50`);
      check.classList.remove('opacity-0');
    } else {
      elem.classList.remove(`border-${format.color}-500`, `bg-${format.color}-50`);
      check.classList.add('opacity-0');
    }
  });

  const format = exportFormats.find(f => f.id === formatId);
  document.getElementById('summary-format').textContent = format.name;
}

function startExport() {
  // Gather configuration
  const startDate = document.getElementById('export-start-date').value;
  const endDate = document.getElementById('export-end-date').value;
  const includeCharts = document.getElementById('export-include-charts').checked;
  const includeHeaders = document.getElementById('export-include-headers').checked;
  const anonymize = document.getElementById('export-anonymize').checked;

  // Get selected fields
  const selectedFields = Array.from(document.querySelectorAll('#field-selection input:checked'))
    .map(input => input.dataset.field);

  const config = {
    ...exportConfig,
    startDate,
    endDate,
    fields: selectedFields,
    includeCharts,
    includeHeaders,
    anonymize
  };

  console.log('Export configuration:', config);

  // Simulate export
  showExportProgress(config);
}

function showExportProgress(config) {
  const progressHTML = `
    <div id="export-progress-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-file-download text-green-600 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Exporting Data</h3>
          <p class="text-gray-600 mb-6">Preparing your ${config.format.toUpperCase()} file...</p>
          
          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div id="export-progress-bar" class="bg-gradient-to-r from-green-600 to-teal-600 h-4 rounded-full transition-all" style="width: 0%"></div>
          </div>
          
          <div id="export-status" class="text-sm text-gray-600 mb-6">
            Initializing...
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', progressHTML);

  // Simulate progress
  simulateExportProgress(config);
}

function simulateExportProgress(config) {
  const statuses = [
    'Querying database...',
    'Filtering records...',
    'Formatting data...',
    'Generating charts...',
    'Creating document...',
    'Finalizing export...'
  ];

  let progress = 0;
  let statusIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;

    document.getElementById('export-progress-bar').style.width = progress + '%';
    
    if (statusIndex < statuses.length) {
      document.getElementById('export-status').textContent = statuses[statusIndex];
      statusIndex++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        completeExport(config);
      }, 500);
    }
  }, 600);
}

function completeExport(config) {
  document.getElementById('export-progress-modal').remove();

  const fileName = `GBV_${config.template}_${new Date().toISOString().split('T')[0]}.${config.format}`;

  alert(`✅ Export Complete!

File: ${fileName}
Format: ${config.format.toUpperCase()}
Records: 1,234
Size: ~2.5 MB

In production, this file would be automatically downloaded to your device.`);

  // Save to recent exports
  saveRecentExport({
    fileName,
    format: config.format,
    template: config.template,
    timestamp: new Date().toISOString(),
    size: '2.5 MB'
  });
}

function quickExport(template, format) {
  exportConfig = {
    template,
    format,
    fields: exportTemplates[template].fields.map(f => f.id),
    filters: {},
    includeCharts: true,
    includeHeaders: true,
    anonymize: true,
    startDate: '2024-01-01',
    endDate: new Date().toISOString().split('T')[0]
  };

  startExport();
}

function saveRecentExport(exportData) {
  let recent = JSON.parse(localStorage.getItem('gbv_recent_exports') || '[]');
  recent.unshift(exportData);
  recent = recent.slice(0, 10); // Keep only last 10
  localStorage.setItem('gbv_recent_exports', JSON.stringify(recent));
}

function closeExportSystem() {
  document.getElementById('export-modal')?.remove();
  document.getElementById('export-progress-modal')?.remove();
}

// Initialize on page load
console.log('✅ Export System loaded successfully');
