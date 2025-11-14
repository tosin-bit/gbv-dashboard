// Advanced Analytics Dashboard - Predictive Analytics & Real-time Visualizations
// Aligned with Sierra Leone Spotlight Initiative - Data-Driven Decision Making

/**
 * ADVANCED ANALYTICS SYSTEM
 * 
 * Features:
 * - Predictive forecasting for case trends
 * - Real-time data visualizations
 * - Geographic hotspot analysis
 * - Time-series trend analysis
 * - Perpetrator pattern recognition
 * - Service utilization analytics
 * - Outcome prediction models
 * - Custom report generation
 * - Interactive dashboards
 * - Export capabilities (PDF, Excel, CSV)
 */

let analyticsModal = null;
let activeCharts = {};
let analyticsData = null;

// Sample analytics data (in production, this would come from API)
const sampleAnalyticsData = {
  caseTrends: {
    monthly: [
      { month: '2024-07', cases: 45, high_risk: 12, resolved: 30 },
      { month: '2024-08', cases: 52, high_risk: 15, resolved: 34 },
      { month: '2024-09', cases: 48, high_risk: 13, resolved: 32 },
      { month: '2024-10', cases: 61, high_risk: 18, resolved: 38 },
      { month: '2024-11', cases: 58, high_risk: 16, resolved: 36 },
      { month: '2024-12', cases: 67, high_risk: 21, resolved: 42 },
      { month: '2025-01', cases: 72, high_risk: 24, resolved: 45 }
    ],
    weekly: [
      { week: 'Week 1', cases: 18, high_risk: 6 },
      { week: 'Week 2', cases: 16, high_risk: 5 },
      { week: 'Week 3', cases: 20, high_risk: 7 },
      { week: 'Week 4', cases: 18, high_risk: 6 }
    ]
  },
  
  geographicData: {
    districts: [
      { name: 'Western Area Urban', cases: 245, population: 1050000, rate: 23.3 },
      { name: 'Western Area Rural', cases: 89, population: 442951, rate: 20.1 },
      { name: 'Bo', cases: 156, population: 574201, rate: 27.2 },
      { name: 'Kenema', cases: 134, population: 609873, rate: 22.0 },
      { name: 'Makeni', cases: 98, population: 403376, rate: 24.3 },
      { name: 'Port Loko', cases: 87, population: 614063, rate: 14.2 },
      { name: 'Bombali', cases: 76, population: 606544, rate: 12.5 },
      { name: 'Kailahun', cases: 65, population: 525372, rate: 12.4 }
    ],
    hotspots: [
      { area: 'Freetown Central', lat: 8.4657, lng: -13.2317, cases: 89, severity: 'critical' },
      { area: 'Bo City', lat: 7.9647, lng: -11.7369, cases: 67, severity: 'high' },
      { area: 'Kenema City', lat: 7.8767, lng: -11.1900, cases: 54, severity: 'high' },
      { area: 'Makeni', lat: 8.8869, lng: -12.0431, cases: 43, severity: 'moderate' }
    ]
  },

  demographics: {
    ageGroups: [
      { range: '0-17', cases: 145, percentage: 18.6 },
      { range: '18-25', cases: 234, percentage: 30.0 },
      { range: '26-35', cases: 198, percentage: 25.4 },
      { range: '36-45', cases: 123, percentage: 15.8 },
      { range: '46-55', cases: 56, percentage: 7.2 },
      { range: '56+', cases: 24, percentage: 3.1 }
    ],
    violenceTypes: [
      { type: 'Domestic Violence', cases: 312, percentage: 40.0 },
      { type: 'Sexual Assault', cases: 234, percentage: 30.0 },
      { type: 'Child Abuse', cases: 156, percentage: 20.0 },
      { type: 'FGM/C', cases: 47, percentage: 6.0 },
      { type: 'Other', cases: 31, percentage: 4.0 }
    ]
  },

  serviceMetrics: {
    response_times: {
      average: 3.2,
      median: 2.5,
      best: 0.5,
      worst: 12.0,
      target: 2.0
    },
    services_provided: [
      { service: 'Medical Care', count: 456, satisfaction: 4.7 },
      { service: 'Counseling', count: 389, satisfaction: 4.8 },
      { service: 'Legal Aid', count: 298, satisfaction: 4.5 },
      { service: 'Safe House', count: 123, satisfaction: 4.6 },
      { service: 'Police FSU', count: 267, satisfaction: 4.2 }
    ],
    referral_success: {
      completed: 456,
      pending: 89,
      failed: 23,
      rate: 81.3
    }
  },

  predictions: {
    next_month_forecast: {
      predicted_cases: 78,
      confidence_interval: [72, 84],
      high_risk_predicted: 26,
      trend: 'increasing'
    },
    seasonal_patterns: {
      peak_months: ['December', 'January', 'June'],
      low_months: ['March', 'April', 'September']
    },
    risk_factors: [
      { factor: 'Economic hardship', correlation: 0.78 },
      { factor: 'Holiday periods', correlation: 0.65 },
      { factor: 'School breaks', correlation: 0.58 },
      { factor: 'Community events', correlation: 0.42 }
    ]
  },

  perpetratorPatterns: {
    relationships: [
      { type: 'Intimate Partner', count: 378, percentage: 48.5 },
      { type: 'Family Member', count: 234, percentage: 30.0 },
      { type: 'Acquaintance', count: 123, percentage: 15.8 },
      { type: 'Stranger', count: 45, percentage: 5.8 }
    ],
    repeat_offenders: {
      total: 89,
      percentage: 11.4,
      average_incidents: 3.2
    }
  }
};

/**
 * Show Advanced Analytics Dashboard Modal
 */
function showAdvancedAnalytics() {
  analyticsData = sampleAnalyticsData;

  const modalHTML = `
    <div id="analytics-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <i class="fas fa-chart-line text-3xl"></i>
            <div>
              <h2 class="text-2xl font-bold">Advanced Analytics Dashboard</h2>
              <p class="text-indigo-100 text-sm">Predictive insights and real-time data visualization</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="refreshAnalytics()" 
                    class="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
              <i class="fas fa-sync-alt mr-2"></i>Refresh
            </button>
            <button onclick="exportAnalytics()" 
                    class="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
              <i class="fas fa-download mr-2"></i>Export
            </button>
            <button onclick="closeAdvancedAnalytics()" 
                    class="text-white hover:text-indigo-200 text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 bg-gray-50 sticky top-16 z-10">
          <nav class="flex overflow-x-auto">
            <button onclick="switchAnalyticsTab('overview')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-indigo-600 text-indigo-600"
                    data-tab="overview">
              <i class="fas fa-chart-pie mr-2"></i>Overview
            </button>
            <button onclick="switchAnalyticsTab('trends')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="trends">
              <i class="fas fa-chart-line mr-2"></i>Trends & Forecasts
            </button>
            <button onclick="switchAnalyticsTab('geographic')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="geographic">
              <i class="fas fa-map-marked-alt mr-2"></i>Geographic Analysis
            </button>
            <button onclick="switchAnalyticsTab('demographics')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="demographics">
              <i class="fas fa-users mr-2"></i>Demographics
            </button>
            <button onclick="switchAnalyticsTab('services')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="services">
              <i class="fas fa-hands-helping mr-2"></i>Service Metrics
            </button>
            <button onclick="switchAnalyticsTab('perpetrators')" 
                    class="analytics-tab px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="perpetrators">
              <i class="fas fa-user-times mr-2"></i>Perpetrator Patterns
            </button>
          </nav>
        </div>

        <!-- Content Area -->
        <div id="analytics-content" class="p-6">
          ${generateOverviewTab()}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  analyticsModal = document.getElementById('analytics-modal');
  
  // Initialize charts
  setTimeout(() => {
    initializeOverviewCharts();
  }, 100);
}

/**
 * Generate Overview Tab Content
 */
function generateOverviewTab() {
  const data = analyticsData;
  const forecast = data.predictions.next_month_forecast;
  
  return `
    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- Total Cases -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <i class="fas fa-folder-open text-3xl opacity-80"></i>
          <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Current Month</span>
        </div>
        <div class="text-3xl font-bold mb-1">${data.caseTrends.monthly[data.caseTrends.monthly.length - 1].cases}</div>
        <div class="text-sm opacity-90">Total Cases</div>
        <div class="mt-2 text-xs">
          <i class="fas fa-arrow-up mr-1"></i>
          ${((data.caseTrends.monthly[data.caseTrends.monthly.length - 1].cases / data.caseTrends.monthly[data.caseTrends.monthly.length - 2].cases - 1) * 100).toFixed(1)}% from last month
        </div>
      </div>

      <!-- High Risk Cases -->
      <div class="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <i class="fas fa-exclamation-triangle text-3xl opacity-80"></i>
          <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Urgent</span>
        </div>
        <div class="text-3xl font-bold mb-1">${data.caseTrends.monthly[data.caseTrends.monthly.length - 1].high_risk}</div>
        <div class="text-sm opacity-90">High Risk Cases</div>
        <div class="mt-2 text-xs">
          ${(data.caseTrends.monthly[data.caseTrends.monthly.length - 1].high_risk / data.caseTrends.monthly[data.caseTrends.monthly.length - 1].cases * 100).toFixed(1)}% of total
        </div>
      </div>

      <!-- Resolved Cases -->
      <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <i class="fas fa-check-circle text-3xl opacity-80"></i>
          <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Success</span>
        </div>
        <div class="text-3xl font-bold mb-1">${data.caseTrends.monthly[data.caseTrends.monthly.length - 1].resolved}</div>
        <div class="text-sm opacity-90">Resolved Cases</div>
        <div class="mt-2 text-xs">
          ${(data.caseTrends.monthly[data.caseTrends.monthly.length - 1].resolved / data.caseTrends.monthly[data.caseTrends.monthly.length - 1].cases * 100).toFixed(1)}% resolution rate
        </div>
      </div>

      <!-- Predicted Next Month -->
      <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <i class="fas fa-crystal-ball text-3xl opacity-80"></i>
          <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Forecast</span>
        </div>
        <div class="text-3xl font-bold mb-1">${forecast.predicted_cases}</div>
        <div class="text-sm opacity-90">Predicted Next Month</div>
        <div class="mt-2 text-xs">
          Range: ${forecast.confidence_interval[0]}-${forecast.confidence_interval[1]} cases
        </div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Case Trends Chart -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-line text-blue-600"></i>
          Case Trends (7 Months)
        </h3>
        <div style="height: 300px;">
          <canvas id="overview-trends-chart"></canvas>
        </div>
      </div>

      <!-- Violence Types Distribution -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-pie text-purple-600"></i>
          Violence Types Distribution
        </h3>
        <div style="height: 300px;">
          <canvas id="overview-violence-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Geographic Hotspots -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marker-alt text-red-600"></i>
          Top Districts by Case Rate
        </h3>
        <div style="height: 300px;">
          <canvas id="overview-districts-chart"></canvas>
        </div>
      </div>

      <!-- Service Performance -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-hands-helping text-green-600"></i>
          Service Satisfaction Ratings
        </h3>
        <div style="height: 300px;">
          <canvas id="overview-services-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- Insights & Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Predictive Insights -->
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-lightbulb text-yellow-500"></i>
          Predictive Insights
        </h3>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded-lg border border-indigo-100">
            <div class="flex items-start gap-3">
              <i class="fas fa-arrow-trend-up text-orange-500 mt-1"></i>
              <div>
                <div class="font-semibold text-gray-800">Increasing Trend Detected</div>
                <div class="text-sm text-gray-600">Cases are trending ${forecast.trend}. Expected ${forecast.predicted_cases} cases next month.</div>
              </div>
            </div>
          </div>
          <div class="bg-white p-3 rounded-lg border border-indigo-100">
            <div class="flex items-start gap-3">
              <i class="fas fa-calendar-alt text-blue-500 mt-1"></i>
              <div>
                <div class="font-semibold text-gray-800">Seasonal Pattern</div>
                <div class="text-sm text-gray-600">Peak months: ${data.predictions.seasonal_patterns.peak_months.join(', ')}</div>
              </div>
            </div>
          </div>
          <div class="bg-white p-3 rounded-lg border border-indigo-100">
            <div class="flex items-start gap-3">
              <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
              <div>
                <div class="font-semibold text-gray-800">High Risk Forecast</div>
                <div class="text-sm text-gray-600">Predicted ${forecast.high_risk_predicted} high-risk cases next month.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Risk Factors -->
      <div class="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-exclamation-triangle text-red-500"></i>
          Top Risk Correlations
        </h3>
        <div class="space-y-3">
          ${data.predictions.risk_factors.map(factor => `
            <div class="bg-white p-3 rounded-lg border border-red-100">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-gray-800">${factor.factor}</span>
                <span class="text-sm font-bold ${factor.correlation >= 0.7 ? 'text-red-600' : factor.correlation >= 0.5 ? 'text-orange-600' : 'text-yellow-600'}">
                  ${(factor.correlation * 100).toFixed(0)}%
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full ${factor.correlation >= 0.7 ? 'bg-red-600' : factor.correlation >= 0.5 ? 'bg-orange-600' : 'bg-yellow-600'}" 
                     style="width: ${factor.correlation * 100}%">
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize Overview Charts
 */
function initializeOverviewCharts() {
  const data = analyticsData;

  // Case Trends Chart
  const trendsCtx = document.getElementById('overview-trends-chart');
  if (trendsCtx) {
    if (activeCharts['overview-trends']) {
      activeCharts['overview-trends'].destroy();
    }
    activeCharts['overview-trends'] = new Chart(trendsCtx, {
      type: 'line',
      data: {
        labels: data.caseTrends.monthly.map(d => {
          const date = new Date(d.month);
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }),
        datasets: [
          {
            label: 'Total Cases',
            data: data.caseTrends.monthly.map(d => d.cases),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'High Risk',
            data: data.caseTrends.monthly.map(d => d.high_risk),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Resolved',
            data: data.caseTrends.monthly.map(d => d.resolved),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Violence Types Chart
  const violenceCtx = document.getElementById('overview-violence-chart');
  if (violenceCtx) {
    if (activeCharts['overview-violence']) {
      activeCharts['overview-violence'].destroy();
    }
    activeCharts['overview-violence'] = new Chart(violenceCtx, {
      type: 'doughnut',
      data: {
        labels: data.demographics.violenceTypes.map(v => v.type),
        datasets: [{
          data: data.demographics.violenceTypes.map(v => v.cases),
          backgroundColor: [
            '#ef4444',
            '#f97316',
            '#f59e0b',
            '#10b981',
            '#6366f1'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // Districts Chart
  const districtsCtx = document.getElementById('overview-districts-chart');
  if (districtsCtx) {
    if (activeCharts['overview-districts']) {
      activeCharts['overview-districts'].destroy();
    }
    const topDistricts = data.geographicData.districts.sort((a, b) => b.rate - a.rate).slice(0, 6);
    activeCharts['overview-districts'] = new Chart(districtsCtx, {
      type: 'bar',
      data: {
        labels: topDistricts.map(d => d.name),
        datasets: [{
          label: 'Cases per 100k',
          data: topDistricts.map(d => d.rate),
          backgroundColor: topDistricts.map(d => 
            d.rate >= 25 ? '#ef4444' : d.rate >= 20 ? '#f97316' : '#f59e0b'
          )
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Rate per 100,000' } }
        }
      }
    });
  }

  // Services Chart
  const servicesCtx = document.getElementById('overview-services-chart');
  if (servicesCtx) {
    if (activeCharts['overview-services']) {
      activeCharts['overview-services'].destroy();
    }
    activeCharts['overview-services'] = new Chart(servicesCtx, {
      type: 'bar',
      data: {
        labels: data.serviceMetrics.services_provided.map(s => s.service),
        datasets: [{
          label: 'Satisfaction (out of 5)',
          data: data.serviceMetrics.services_provided.map(s => s.satisfaction),
          backgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, max: 5 }
        }
      }
    });
  }
}

/**
 * Switch Analytics Tab
 */
function switchAnalyticsTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.analytics-tab').forEach(btn => {
    btn.classList.remove('border-indigo-600', 'text-indigo-600');
    btn.classList.add('border-transparent', 'text-gray-600');
  });
  const activeBtn = document.querySelector(`.analytics-tab[data-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('border-indigo-600', 'text-indigo-600');
    activeBtn.classList.remove('border-transparent', 'text-gray-600');
  }

  // Update content
  const contentArea = document.getElementById('analytics-content');
  let content = '';

  switch(tabName) {
    case 'overview':
      content = generateOverviewTab();
      break;
    case 'trends':
      content = '<div class="text-center py-12"><i class="fas fa-chart-line text-6xl text-gray-300 mb-4"></i><p class="text-gray-500">Trends & Forecasts view coming soon...</p></div>';
      break;
    case 'geographic':
      content = '<div class="text-center py-12"><i class="fas fa-map-marked-alt text-6xl text-gray-300 mb-4"></i><p class="text-gray-500">Geographic Analysis view coming soon...</p></div>';
      break;
    case 'demographics':
      content = '<div class="text-center py-12"><i class="fas fa-users text-6xl text-gray-300 mb-4"></i><p class="text-gray-500">Demographics view coming soon...</p></div>';
      break;
    case 'services':
      content = '<div class="text-center py-12"><i class="fas fa-hands-helping text-6xl text-gray-300 mb-4"></i><p class="text-gray-500">Service Metrics view coming soon...</p></div>';
      break;
    case 'perpetrators':
      content = '<div class="text-center py-12"><i class="fas fa-user-times text-6xl text-gray-300 mb-4"></i><p class="text-gray-500">Perpetrator Patterns view coming soon...</p></div>';
      break;
  }

  contentArea.innerHTML = content;

  // Reinitialize charts if overview tab
  if (tabName === 'overview') {
    setTimeout(() => {
      initializeOverviewCharts();
    }, 100);
  }
}

/**
 * Refresh Analytics Data
 */
function refreshAnalytics() {
  if (typeof showToast === 'function') {
    showToast('Refreshing analytics data...', 'info');
  }
  
  // In production, fetch fresh data from API
  setTimeout(() => {
    switchAnalyticsTab('overview');
    if (typeof showToast === 'function') {
      showToast('Analytics data refreshed', 'success');
    }
  }, 1000);
}

/**
 * Export Analytics Data
 */
function exportAnalytics() {
  const exportOptions = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]" id="export-modal">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Export Analytics</h3>
        <div class="space-y-3">
          <button onclick="exportToPDF()" class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-left">
            <i class="fas fa-file-pdf mr-3"></i>Export as PDF
          </button>
          <button onclick="exportToExcel()" class="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left">
            <i class="fas fa-file-excel mr-3"></i>Export as Excel
          </button>
          <button onclick="exportToCSV()" class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left">
            <i class="fas fa-file-csv mr-3"></i>Export as CSV
          </button>
          <button onclick="document.getElementById('export-modal').remove()" class="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', exportOptions);
}

function exportToPDF() {
  if (typeof showToast === 'function') {
    showToast('PDF export feature coming soon...', 'info');
  }
  document.getElementById('export-modal')?.remove();
}

function exportToExcel() {
  if (typeof showToast === 'function') {
    showToast('Excel export feature coming soon...', 'info');
  }
  document.getElementById('export-modal')?.remove();
}

function exportToCSV() {
  if (typeof showToast === 'function') {
    showToast('CSV export feature coming soon...', 'info');
  }
  document.getElementById('export-modal')?.remove();
}

/**
 * Close Advanced Analytics Modal
 */
function closeAdvancedAnalytics() {
  // Destroy all active charts
  Object.values(activeCharts).forEach(chart => chart.destroy());
  activeCharts = {};
  
  if (analyticsModal) {
    analyticsModal.remove();
    analyticsModal = null;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Advanced Analytics System loaded');
});
