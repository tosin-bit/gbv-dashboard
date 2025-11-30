// Custom Report Builder - Drag-and-drop report creation tool
// Comprehensive GBV data reporting with customizable templates

const reportTemplates = {
  monthly_summary: {
    id: 'monthly_summary',
    name: 'Monthly Summary Report',
    description: 'Overview of all GBV cases for the month',
    sections: [
      { id: 'header', type: 'header', title: 'Monthly GBV Summary Report', locked: true },
      { id: 'date_range', type: 'date_range', title: 'Reporting Period', locked: true },
      { id: 'executive_summary', type: 'text', title: 'Executive Summary', required: true },
      { id: 'case_statistics', type: 'chart', title: 'Case Statistics', chartType: 'bar', required: true },
      { id: 'violence_breakdown', type: 'chart', title: 'Violence Type Breakdown', chartType: 'pie', required: true },
      { id: 'survivor_demographics', type: 'table', title: 'Survivor Demographics', required: true },
      { id: 'case_outcomes', type: 'table', title: 'Case Outcomes & Status', required: false },
      { id: 'recommendations', type: 'text', title: 'Recommendations & Next Steps', required: true }
    ],
    category: 'monthly',
    icon: 'calendar-alt'
  },
  quarterly_analysis: {
    id: 'quarterly_analysis',
    name: 'Quarterly Analysis Report',
    description: 'Detailed analysis of trends over 3 months',
    sections: [
      { id: 'header', type: 'header', title: 'Quarterly GBV Analysis', locked: true },
      { id: 'date_range', type: 'date_range', title: 'Quarter Period', locked: true },
      { id: 'trend_analysis', type: 'chart', title: 'Trend Analysis', chartType: 'line', required: true },
      { id: 'geographic_distribution', type: 'map', title: 'Geographic Distribution', required: true },
      { id: 'service_utilization', type: 'table', title: 'Service Utilization Rates', required: true },
      { id: 'perpetrator_analysis', type: 'chart', title: 'Perpetrator Analysis', chartType: 'bar', required: false },
      { id: 'impact_assessment', type: 'text', title: 'Impact Assessment', required: true },
      { id: 'strategic_insights', type: 'text', title: 'Strategic Insights', required: true }
    ],
    category: 'quarterly',
    icon: 'chart-line'
  },
  annual_report: {
    id: 'annual_report',
    name: 'Annual Comprehensive Report',
    description: 'Full year analysis with insights and recommendations',
    sections: [
      { id: 'header', type: 'header', title: 'Annual GBV Comprehensive Report', locked: true },
      { id: 'year', type: 'date_range', title: 'Reporting Year', locked: true },
      { id: 'executive_summary', type: 'text', title: 'Executive Summary', required: true },
      { id: 'yearly_trends', type: 'chart', title: 'Yearly Trends', chartType: 'line', required: true },
      { id: 'case_volume', type: 'chart', title: 'Case Volume Analysis', chartType: 'bar', required: true },
      { id: 'survivor_profiles', type: 'table', title: 'Survivor Profiles & Demographics', required: true },
      { id: 'service_effectiveness', type: 'table', title: 'Service Effectiveness Metrics', required: true },
      { id: 'partnerships', type: 'text', title: 'Partnership & Collaboration Impact', required: false },
      { id: 'success_stories', type: 'text', title: 'Success Stories & Case Studies', required: false },
      { id: 'challenges', type: 'text', title: 'Challenges & Barriers', required: true },
      { id: 'budget_overview', type: 'table', title: 'Budget & Resource Allocation', required: false },
      { id: 'recommendations', type: 'text', title: 'Strategic Recommendations', required: true }
    ],
    category: 'annual',
    icon: 'file-alt'
  },
  incident_report: {
    id: 'incident_report',
    name: 'Individual Incident Report',
    description: 'Detailed report for a specific case',
    sections: [
      { id: 'header', type: 'header', title: 'Incident Report', locked: true },
      { id: 'case_number', type: 'text', title: 'Case Number', locked: true, required: true },
      { id: 'incident_details', type: 'table', title: 'Incident Details', required: true },
      { id: 'survivor_information', type: 'table', title: 'Survivor Information (Anonymized)', required: true },
      { id: 'services_provided', type: 'table', title: 'Services Provided', required: true },
      { id: 'timeline', type: 'table', title: 'Case Timeline', required: true },
      { id: 'outcomes', type: 'text', title: 'Case Outcomes & Status', required: true },
      { id: 'follow_up', type: 'text', title: 'Follow-up Actions Required', required: false }
    ],
    category: 'case',
    icon: 'file-medical'
  },
  donor_report: {
    id: 'donor_report',
    name: 'Donor Impact Report',
    description: 'Report highlighting impact for funding partners',
    sections: [
      { id: 'header', type: 'header', title: 'Donor Impact Report', locked: true },
      { id: 'date_range', type: 'date_range', title: 'Reporting Period', locked: true },
      { id: 'impact_summary', type: 'text', title: 'Impact Summary', required: true },
      { id: 'survivors_served', type: 'chart', title: 'Survivors Served', chartType: 'bar', required: true },
      { id: 'service_breakdown', type: 'chart', title: 'Service Breakdown', chartType: 'pie', required: true },
      { id: 'success_metrics', type: 'table', title: 'Success Metrics & KPIs', required: true },
      { id: 'testimonials', type: 'text', title: 'Survivor Testimonials (Anonymized)', required: false },
      { id: 'financial_overview', type: 'table', title: 'Financial Overview', required: true },
      { id: 'future_goals', type: 'text', title: 'Future Goals & Sustainability', required: true }
    ],
    category: 'donor',
    icon: 'hand-holding-heart'
  },
  custom: {
    id: 'custom',
    name: 'Custom Report',
    description: 'Build your own report from scratch',
    sections: [
      { id: 'header', type: 'header', title: 'Custom Report', locked: false }
    ],
    category: 'custom',
    icon: 'magic'
  }
};

const sectionComponents = [
  {
    type: 'header',
    name: 'Header',
    icon: 'heading',
    description: 'Report title and branding',
    configurable: ['title', 'subtitle', 'logo']
  },
  {
    type: 'text',
    name: 'Text Section',
    icon: 'paragraph',
    description: 'Rich text editor for narratives',
    configurable: ['title', 'content', 'formatting']
  },
  {
    type: 'table',
    name: 'Data Table',
    icon: 'table',
    description: 'Tabular data display',
    configurable: ['title', 'columns', 'filters', 'sorting']
  },
  {
    type: 'chart',
    name: 'Chart/Graph',
    icon: 'chart-bar',
    description: 'Visual data representation',
    configurable: ['title', 'chart_type', 'data_source', 'colors']
  },
  {
    type: 'date_range',
    name: 'Date Range',
    icon: 'calendar',
    description: 'Report period selector',
    configurable: ['start_date', 'end_date', 'format']
  },
  {
    type: 'map',
    name: 'Geographic Map',
    icon: 'map-marked-alt',
    description: 'Location-based visualization',
    configurable: ['title', 'regions', 'data_points', 'zoom']
  },
  {
    type: 'statistics',
    name: 'Key Statistics',
    icon: 'chart-pie',
    description: 'Highlight key metrics',
    configurable: ['metrics', 'layout', 'styling']
  },
  {
    type: 'image',
    name: 'Image/Media',
    icon: 'image',
    description: 'Add images or media',
    configurable: ['source', 'caption', 'size']
  }
];

let currentReport = null;
let currentSections = [];
let draggedSection = null;
let reportHistory = [];

function showCustomReportBuilder() {
  const modalHTML = `
    <div id="report-builder-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <i class="fas fa-file-invoice text-2xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Custom Report Builder</h2>
              <p class="text-sm text-indigo-100">Drag-and-drop report creation tool</p>
            </div>
          </div>
          <button onclick="closeReportBuilder()" class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-hidden flex">
          <!-- Left Sidebar: Templates & Components -->
          <div class="w-80 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            <!-- Templates Section -->
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i class="fas fa-layer-group text-indigo-600"></i>
                Report Templates
              </h3>
              <div id="template-list" class="space-y-2">
                ${Object.values(reportTemplates).map(template => `
                  <button onclick="loadTemplate('${template.id}')" 
                          class="w-full text-left p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 transition-all group">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <i class="fas fa-${template.icon} text-indigo-600"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-gray-800 text-sm">${template.name}</div>
                        <div class="text-xs text-gray-500">${template.description}</div>
                      </div>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Components Section -->
            <div class="p-4">
              <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i class="fas fa-puzzle-piece text-purple-600"></i>
                Report Components
              </h3>
              <div id="component-list" class="space-y-2">
                ${sectionComponents.map(component => `
                  <div draggable="true" 
                       ondragstart="handleComponentDragStart(event, '${component.type}')"
                       class="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-purple-500 cursor-move transition-all group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <i class="fas fa-${component.icon} text-purple-600 text-sm"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-gray-800 text-sm">${component.name}</div>
                        <div class="text-xs text-gray-500">${component.description}</div>
                      </div>
                      <i class="fas fa-grip-vertical text-gray-400"></i>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Center: Report Canvas -->
          <div class="flex-1 overflow-y-auto bg-gray-100 p-6">
            <div class="max-w-4xl mx-auto">
              <!-- Report Info Bar -->
              <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center justify-between">
                <div>
                  <input type="text" id="report-title" placeholder="Untitled Report" 
                         class="text-xl font-bold text-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">
                  <div class="text-sm text-gray-500 mt-1">
                    <span id="section-count">0 sections</span> • 
                    <span id="report-status">Not saved</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button onclick="undoLastChange()" class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Undo">
                    <i class="fas fa-undo"></i>
                  </button>
                  <button onclick="clearReport()" class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Clear All">
                    <i class="fas fa-trash"></i>
                  </button>
                  <button onclick="saveReport()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <i class="fas fa-save"></i>
                    Save
                  </button>
                </div>
              </div>

              <!-- Report Canvas -->
              <div id="report-canvas" 
                   ondrop="handleCanvasDrop(event)" 
                   ondragover="handleCanvasDragOver(event)"
                   class="bg-white rounded-lg shadow-lg p-8 min-h-[600px] border-2 border-dashed border-gray-300">
                <div id="canvas-empty-state" class="text-center py-20">
                  <i class="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">Start Building Your Report</h3>
                  <p class="text-gray-500 mb-6">Choose a template from the left or drag components to create a custom report</p>
                  <button onclick="loadTemplate('custom')" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <i class="fas fa-plus mr-2"></i>
                    Start from Scratch
                  </button>
                </div>
                <div id="canvas-sections" class="space-y-4 hidden"></div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Section Editor -->
          <div id="section-editor-sidebar" class="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto hidden">
            <div class="p-4">
              <h3 class="font-bold text-gray-800 mb-3 flex items-center justify-between">
                <span>Section Properties</span>
                <button onclick="closeSectionEditor()" class="text-gray-500 hover:text-gray-700">
                  <i class="fas fa-times"></i>
                </button>
              </h3>
              <div id="section-editor-content" class="space-y-4">
                <p class="text-gray-500 text-sm">Select a section to edit its properties</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer: Action Buttons -->
        <div class="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <i class="fas fa-info-circle text-indigo-600 mr-1"></i>
            Tip: Drag components into the canvas and click to configure
          </div>
          <div class="flex gap-3">
            <button onclick="previewReport()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <i class="fas fa-eye mr-2"></i>
              Preview
            </button>
            <button onclick="generateReport()" class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700">
              <i class="fas fa-file-download mr-2"></i>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  initializeReportBuilder();
}

function initializeReportBuilder() {
  currentReport = {
    id: Date.now(),
    title: 'Untitled Report',
    created: new Date().toISOString(),
    sections: []
  };
  currentSections = [];
  reportHistory = [];
  
  // Load saved reports from localStorage
  loadSavedReports();
}

function loadTemplate(templateId) {
  const template = reportTemplates[templateId];
  if (!template) return;

  // Save to history
  saveToHistory();

  // Load template sections
  currentReport.title = template.name;
  currentSections = template.sections.map(section => ({
    ...section,
    id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    data: {}
  }));

  // Update UI
  document.getElementById('report-title').value = template.name;
  renderCanvas();
  updateSectionCount();
}

function handleComponentDragStart(event, componentType) {
  event.dataTransfer.effectAllowed = 'copy';
  event.dataTransfer.setData('text/plain', componentType);
}

function handleCanvasDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

function handleCanvasDrop(event) {
  event.preventDefault();
  const componentType = event.dataTransfer.getData('text/plain');
  
  if (componentType) {
    addSection(componentType);
  }
}

function addSection(type) {
  saveToHistory();

  const component = sectionComponents.find(c => c.type === type);
  if (!component) return;

  const newSection = {
    id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: type,
    title: component.name,
    required: false,
    locked: false,
    data: {}
  };

  currentSections.push(newSection);
  renderCanvas();
  updateSectionCount();
}

function renderCanvas() {
  const emptyState = document.getElementById('canvas-empty-state');
  const sectionsContainer = document.getElementById('canvas-sections');

  if (currentSections.length === 0) {
    emptyState.classList.remove('hidden');
    sectionsContainer.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  sectionsContainer.classList.remove('hidden');

  sectionsContainer.innerHTML = currentSections.map((section, index) => `
    <div id="${section.id}" 
         class="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-indigo-400 transition-all group relative"
         draggable="${!section.locked}"
         ondragstart="handleSectionDragStart(event, ${index})"
         ondrop="handleSectionDrop(event, ${index})"
         ondragover="handleSectionDragOver(event)">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          ${!section.locked ? '<i class="fas fa-grip-vertical text-gray-400 cursor-move"></i>' : ''}
          <div>
            <h4 class="font-bold text-gray-800">${section.title}</h4>
            <div class="text-xs text-gray-500">
              ${section.type} ${section.required ? '• Required' : ''} ${section.locked ? '• Locked' : ''}
            </div>
          </div>
        </div>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="editSection('${section.id}')" class="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
            <i class="fas fa-edit"></i>
          </button>
          ${!section.locked ? `
            <button onclick="removeSection('${section.id}')" class="p-2 text-red-600 hover:bg-red-50 rounded">
              <i class="fas fa-trash"></i>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Section Content Preview -->
      <div class="bg-gray-50 rounded p-3 text-sm text-gray-600">
        ${getSectionPreview(section)}
      </div>
    </div>
  `).join('');
}

function getSectionPreview(section) {
  switch (section.type) {
    case 'header':
      return `<div class="text-center"><div class="text-lg font-bold">${section.title}</div></div>`;
    case 'text':
      return '<i class="fas fa-paragraph mr-2"></i>Text content will appear here';
    case 'table':
      return '<i class="fas fa-table mr-2"></i>Table with data will be displayed';
    case 'chart':
      return `<i class="fas fa-chart-bar mr-2"></i>Chart (${section.data.chartType || 'bar'}) visualization`;
    case 'date_range':
      return '<i class="fas fa-calendar mr-2"></i>Date range selector';
    case 'map':
      return '<i class="fas fa-map-marked-alt mr-2"></i>Geographic map visualization';
    case 'statistics':
      return '<i class="fas fa-chart-pie mr-2"></i>Key statistics display';
    case 'image':
      return '<i class="fas fa-image mr-2"></i>Image or media content';
    default:
      return 'Section content';
  }
}

function handleSectionDragStart(event, index) {
  draggedSection = index;
  event.dataTransfer.effectAllowed = 'move';
}

function handleSectionDrop(event, targetIndex) {
  event.preventDefault();
  if (draggedSection === null || draggedSection === targetIndex) return;

  saveToHistory();

  // Reorder sections
  const [removed] = currentSections.splice(draggedSection, 1);
  currentSections.splice(targetIndex, 0, removed);
  
  draggedSection = null;
  renderCanvas();
}

function editSection(sectionId) {
  const section = currentSections.find(s => s.id === sectionId);
  if (!section) return;

  const sidebar = document.getElementById('section-editor-sidebar');
  const content = document.getElementById('section-editor-content');

  sidebar.classList.remove('hidden');

  content.innerHTML = `
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
        <input type="text" value="${section.title}" 
               onchange="updateSectionProperty('${sectionId}', 'title', this.value)"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
      </div>

      ${!section.locked ? `
        <div>
          <label class="flex items-center gap-2">
            <input type="checkbox" ${section.required ? 'checked' : ''}
                   onchange="updateSectionProperty('${sectionId}', 'required', this.checked)"
                   class="w-4 h-4 text-indigo-600 rounded">
            <span class="text-sm font-semibold text-gray-700">Required Section</span>
          </label>
        </div>
      ` : ''}

      ${section.type === 'chart' ? `
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Chart Type</label>
          <select onchange="updateSectionProperty('${sectionId}', 'chartType', this.value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="bar" ${section.data.chartType === 'bar' ? 'selected' : ''}>Bar Chart</option>
            <option value="line" ${section.data.chartType === 'line' ? 'selected' : ''}>Line Chart</option>
            <option value="pie" ${section.data.chartType === 'pie' ? 'selected' : ''}>Pie Chart</option>
            <option value="doughnut" ${section.data.chartType === 'doughnut' ? 'selected' : ''}>Doughnut Chart</option>
          </select>
        </div>
      ` : ''}

      <div class="pt-4 border-t border-gray-200">
        <button onclick="duplicateSection('${sectionId}')" 
                class="w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 mb-2">
          <i class="fas fa-copy mr-2"></i>
          Duplicate Section
        </button>
        ${!section.locked ? `
          <button onclick="removeSection('${sectionId}')" 
                  class="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
            <i class="fas fa-trash mr-2"></i>
            Delete Section
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function updateSectionProperty(sectionId, property, value) {
  const section = currentSections.find(s => s.id === sectionId);
  if (!section) return;

  saveToHistory();

  if (property === 'chartType') {
    section.data.chartType = value;
  } else {
    section[property] = value;
  }

  renderCanvas();
}

function duplicateSection(sectionId) {
  const section = currentSections.find(s => s.id === sectionId);
  if (!section) return;

  saveToHistory();

  const duplicate = {
    ...section,
    id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: `${section.title} (Copy)`,
    locked: false
  };

  const index = currentSections.findIndex(s => s.id === sectionId);
  currentSections.splice(index + 1, 0, duplicate);

  renderCanvas();
  updateSectionCount();
}

function removeSection(sectionId) {
  if (!confirm('Are you sure you want to remove this section?')) return;

  saveToHistory();

  currentSections = currentSections.filter(s => s.id !== sectionId);
  renderCanvas();
  updateSectionCount();
  closeSectionEditor();
}

function closeSectionEditor() {
  document.getElementById('section-editor-sidebar').classList.add('hidden');
}

function updateSectionCount() {
  const count = currentSections.length;
  document.getElementById('section-count').textContent = `${count} section${count !== 1 ? 's' : ''}`;
}

function saveToHistory() {
  reportHistory.push({
    sections: JSON.parse(JSON.stringify(currentSections)),
    timestamp: Date.now()
  });

  // Keep only last 20 states
  if (reportHistory.length > 20) {
    reportHistory.shift();
  }
}

function undoLastChange() {
  if (reportHistory.length === 0) {
    alert('Nothing to undo');
    return;
  }

  const lastState = reportHistory.pop();
  currentSections = lastState.sections;
  renderCanvas();
  updateSectionCount();
}

function clearReport() {
  if (!confirm('Are you sure you want to clear all sections? This cannot be undone.')) return;

  saveToHistory();
  currentSections = [];
  renderCanvas();
  updateSectionCount();
  closeSectionEditor();
}

function saveReport() {
  const title = document.getElementById('report-title').value || 'Untitled Report';
  currentReport.title = title;
  currentReport.sections = currentSections;
  currentReport.updated = new Date().toISOString();

  // Save to localStorage
  const savedReports = JSON.parse(localStorage.getItem('gbv_custom_reports') || '[]');
  const existingIndex = savedReports.findIndex(r => r.id === currentReport.id);

  if (existingIndex >= 0) {
    savedReports[existingIndex] = currentReport;
  } else {
    savedReports.push(currentReport);
  }

  localStorage.setItem('gbv_custom_reports', JSON.stringify(savedReports));

  document.getElementById('report-status').textContent = 'Saved';
  setTimeout(() => {
    document.getElementById('report-status').textContent = `Last saved ${new Date().toLocaleTimeString()}`;
  }, 2000);

  alert('✅ Report template saved successfully!');
}

function loadSavedReports() {
  const savedReports = JSON.parse(localStorage.getItem('gbv_custom_reports') || '[]');
  console.log('Loaded saved reports:', savedReports);
}

function previewReport() {
  // Generate preview
  alert('🔍 Preview functionality - would show report preview with sample data');
}

function generateReport() {
  if (currentSections.length === 0) {
    alert('⚠️ Please add at least one section to generate a report');
    return;
  }

  // Check required sections
  const missingRequired = currentSections.filter(s => s.required && !s.data.completed);
  if (missingRequired.length > 0) {
    alert(`⚠️ Please complete all required sections:\n${missingRequired.map(s => `• ${s.title}`).join('\n')}`);
    return;
  }

  alert('📊 Generating report...\n\n✅ Report would be generated as PDF/Excel with all configured sections and live data from the database.');
}

function closeReportBuilder() {
  if (currentSections.length > 0) {
    if (!confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
  }

  document.getElementById('report-builder-modal').remove();
}

// Initialize on page load
console.log('✅ Custom Report Builder loaded successfully');
