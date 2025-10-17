import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer for HTML responses
app.use(renderer)

// API Routes for GBV Dashboard

// Get Dashboard Statistics
app.get('/api/stats', async (c) => {
  const { env } = c;
  
  try {
    // Get total cases by status
    const totalCasesResult = await env.DB.prepare(`
      SELECT 
        case_status,
        COUNT(*) as count
      FROM gbv_cases 
      GROUP BY case_status
    `).all();

    // Get cases by district (top 10)
    const casesByDistrictResult = await env.DB.prepare(`
      SELECT 
        d.name as district_name,
        COUNT(gc.id) as case_count
      FROM districts d
      LEFT JOIN gbv_cases gc ON d.id = gc.district_id
      GROUP BY d.id, d.name
      ORDER BY case_count DESC
      LIMIT 10
    `).all();

    // Get cases by GBV type
    const casesByTypeResult = await env.DB.prepare(`
      SELECT 
        gt.name as gbv_type,
        gt.category,
        COUNT(gc.id) as case_count
      FROM gbv_types gt
      LEFT JOIN gbv_cases gc ON gt.id = gc.gbv_type_id
      GROUP BY gt.id, gt.name, gt.category
      ORDER BY case_count DESC
    `).all();

    // Get monthly trends (last 6 months)
    const monthlyTrendsResult = await env.DB.prepare(`
      SELECT 
        year,
        month,
        SUM(total_cases) as total_cases
      FROM monthly_stats
      WHERE year >= 2024 AND month >= 5
      GROUP BY year, month
      ORDER BY year, month
    `).all();

    // Get service providers count
    const serviceProvidersResult = await env.DB.prepare(`
      SELECT 
        type,
        COUNT(*) as count
      FROM service_providers
      WHERE active = TRUE
      GROUP BY type
    `).all();

    const stats = {
      totalCases: totalCasesResult.results?.reduce((sum: number, row: any) => sum + row.count, 0) || 0,
      casesByStatus: totalCasesResult.results || [],
      casesByDistrict: casesByDistrictResult.results || [],
      casesByType: casesByTypeResult.results || [],
      monthlyTrends: monthlyTrendsResult.results || [],
      serviceProviders: serviceProvidersResult.results || []
    };

    return c.json({ stats, loading: false });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch statistics', loading: false }, 500);
  }
});

// Get Districts
app.get('/api/districts', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        d.id,
        d.name,
        d.code,
        d.population,
        d.latitude,
        d.longitude,
        COUNT(gc.id) as case_count
      FROM districts d
      LEFT JOIN gbv_cases gc ON d.id = gc.district_id
      GROUP BY d.id, d.name, d.code, d.population, d.latitude, d.longitude
      ORDER BY d.name
    `).all();

    return c.json({ districts: result.results || [] });
  } catch (error) {
    console.error('Error fetching districts:', error);
    return c.json({ error: 'Failed to fetch districts' }, 500);
  }
});

// Get Cases (with pagination and filters)
app.get('/api/cases', async (c) => {
  const { env } = c;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const district = c.req.query('district');
  const status = c.req.query('status');
  const offset = (page - 1) * limit;

  try {
    let whereClause = '1=1';
    const params: any[] = [];

    if (district && district !== 'all') {
      whereClause += ' AND gc.district_id = ?';
      params.push(district);
    }

    if (status && status !== 'all') {
      whereClause += ' AND gc.case_status = ?';
      params.push(status);
    }

    const result = await env.DB.prepare(`
      SELECT 
        gc.id,
        gc.case_number,
        gc.incident_date,
        gc.reported_date,
        gt.name as gbv_type,
        d.name as district_name,
        gc.survivor_age_group,
        gc.survivor_gender,
        gc.case_status,
        gc.priority_level,
        u.name as assigned_to
      FROM gbv_cases gc
      LEFT JOIN gbv_types gt ON gc.gbv_type_id = gt.id
      LEFT JOIN districts d ON gc.district_id = d.id
      LEFT JOIN users u ON gc.assigned_to = u.id
      WHERE ${whereClause}
      ORDER BY gc.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...params, limit, offset).all();

    // Get total count for pagination
    const countResult = await env.DB.prepare(`
      SELECT COUNT(*) as total
      FROM gbv_cases gc
      WHERE ${whereClause}
    `).bind(...params).first();

    return c.json({
      cases: result.results || [],
      pagination: {
        page,
        limit,
        total: countResult?.total || 0,
        totalPages: Math.ceil((countResult?.total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return c.json({ error: 'Failed to fetch cases' }, 500);
  }
});

// Get Service Providers
app.get('/api/service-providers', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        sp.id,
        sp.name,
        sp.type,
        sp.contact_person,
        sp.phone,
        sp.email,
        d.name as district_name,
        sp.services_offered
      FROM service_providers sp
      LEFT JOIN districts d ON sp.district_id = d.id
      WHERE sp.active = TRUE
      ORDER BY sp.name
    `).all();

    return c.json({ serviceProviders: result.results || [] });
  } catch (error) {
    console.error('Error fetching service providers:', error);
    return c.json({ error: 'Failed to fetch service providers' }, 500);
  }
});

// Create New Case
app.post('/api/cases', async (c) => {
  const { env } = c;
  
  try {
    const caseData = await c.req.json();
    
    // Generate unique case number
    const timestamp = Date.now();
    const caseNumber = `GBV-SL-${timestamp}`;
    
    const result = await env.DB.prepare(`
      INSERT INTO gbv_cases (
        case_number, incident_date, gbv_type_id, district_id, sub_district_id,
        survivor_age_group, survivor_gender, perpetrator_relationship,
        reported_by, reporting_channel, case_status, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      caseNumber,
      caseData.incident_date,
      caseData.gbv_type_id,
      caseData.district_id,
      caseData.sub_district_id || null,
      caseData.survivor_age_group,
      caseData.survivor_gender,
      caseData.perpetrator_relationship,
      caseData.reported_by,
      caseData.reporting_channel,
      'reported',
      1 // Default user ID
    ).run();

    return c.json({ 
      success: true, 
      case_id: result.meta.last_row_id,
      case_number: caseNumber 
    });
  } catch (error) {
    console.error('Error creating case:', error);
    return c.json({ error: 'Failed to create case' }, 500);
  }
});

// Main Dashboard Page
app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo placeholder */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Sierra Leone GBV Dashboard</h1>
                <p className="text-sm text-gray-600">Ministry of Gender and Children's Affairs</p>
                <p className="text-xs text-gray-500">Real-time Gender-Based Violence Incident Tracking System</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Powered by Insyt Solutions</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">USAID</span>
                  <span className="text-xs bg-blue-400 text-white px-2 py-0.5 rounded">WHO</span>
                  <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">UN Women</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-lg font-semibold text-gray-900" id="last-updated">10/17/2025</div>
              <div className="text-xs text-gray-400">© 2025 Insyt Solutions</div>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  System Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-green-700 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            <button className="dashboard-tab bg-white text-green-700 py-3 px-4 text-sm font-medium whitespace-nowrap rounded-t">
              <i className="fas fa-eye mr-2"></i>Overview
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600">
              <i className="fas fa-file-alt mr-2"></i>Report Case
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600">
              <i className="fas fa-map mr-2"></i>District Map
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600 relative">
              <i className="fas fa-chart-bar mr-2"></i>Analytics
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600 relative">
              <i className="fas fa-hospital mr-2"></i>Rainbo Portal
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600 relative">
              <i className="fas fa-shield-alt mr-2"></i>Police FSU
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded">New</span>
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600">
              <i className="fas fa-book mr-2"></i>Resources
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600">
              <i className="fas fa-microphone mr-2"></i>Voice Report
            </button>
            <button className="dashboard-tab text-white py-3 px-4 text-sm font-medium whitespace-nowrap hover:bg-green-600">
              <i className="fas fa-user-cog mr-2"></i>Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Loading State */}
        <div id="loading-state" className="text-center py-12">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-lg text-gray-600">Loading Enhanced GBV Dashboard...</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Connecting to database and loading statistics...</p>
        </div>

        {/* Dashboard Content (hidden by default) */}
        <div id="dashboard-content" className="hidden">
          {/* Emergency Banner */}
          <div className="bg-green-700 text-white p-3 rounded mb-4 text-center">
            <i className="fas fa-phone-alt mr-2"></i>
            <strong>EMERGENCY: Call 116 (Toll-Free) for immediate GBV support</strong>
            <span className="ml-4">| Available 24/7 in Krio, English, Mende & Temne</span>
          </div>

          {/* Current Alerts */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Current Alerts</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div><strong>Bo:</strong> 25% increase in cases this week - response team deployed</div>
                  <div><strong>Kailahun:</strong> Medical supplies low at One-Stop Center - resupply scheduled</div>
                  <div><strong>Western Area:</strong> Successful conviction - life sentence for child rape case</div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards - 4 cards layout */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Total Cases (2025)</div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-folder text-green-600"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="total-cases">0</div>
              <div className="text-xs text-green-600 mt-1">
                <i className="fas fa-check-circle mr-1"></i>Based on actual reporting
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">This Month</div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-calendar text-blue-600"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="this-month-cases">0</div>
              <div className="text-xs text-blue-600 mt-1">
                <i className="fas fa-calendar-alt mr-1"></i><span id="current-month">October 2025</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Sexual Assault Cases</div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="sexual-assault-cases">0</div>
              <div className="text-xs text-yellow-600 mt-1">
                <i className="fas fa-percentage mr-1"></i><span id="assault-percentage">94%</span> of all cases
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">Service Coverage</div>
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-hand-holding-heart text-teal-600"></i>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900" id="service-coverage">0%</div>
              <div className="text-xs text-teal-600 mt-1">
                <i className="fas fa-check mr-1"></i>Survivors receiving care
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trends Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Trends (2025)</h3>
                <div className="flex space-x-4 text-sm">
                  <button className="text-blue-600 border-b-2 border-blue-600 pb-1 font-medium">Cases</button>
                  <button className="text-gray-500 hover:text-gray-700">Services</button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs mb-3">
                <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 mr-1"></span>Total Cases</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-1"></span>Sexual Assault</span>
              </div>
              <canvas id="monthlyTrendsChart" width="400" height="250"></canvas>
            </div>

            {/* Age Group Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Age Group Distribution</h3>
              <div className="flex items-center justify-center" style="height: 300px;">
                <canvas id="ageDistributionChart" width="300" height="300"></canvas>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>0-10</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>11-15</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>16-17</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>18-25</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>26-35</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>36+</div>
              </div>
            </div>
          </div>

          {/* District Case Distribution & Service Providers - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* District Case Distribution - Takes 2 columns */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">District Case Distribution</h3>
              
              {/* District Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Western Area */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Western Area</div>
                  <div className="text-2xl font-bold text-gray-900">695</div>
                  <div className="flex items-center text-xs text-red-600 mt-1">
                    <i className="fas fa-exclamation-triangle mr-1"></i>High Risk
                  </div>
                </div>

                {/* Bo */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Bo</div>
                  <div className="text-2xl font-bold text-gray-900">412</div>
                  <div className="flex items-center text-xs text-red-600 mt-1">
                    <i className="fas fa-exclamation-triangle mr-1"></i>High Risk
                  </div>
                </div>

                {/* Kenema */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Kenema</div>
                  <div className="text-2xl font-bold text-gray-900">324</div>
                  <div className="flex items-center text-xs text-orange-600 mt-1">
                    <i className="fas fa-exclamation-circle mr-1"></i>High Risk
                  </div>
                </div>

                {/* Kailahun */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Kailahun</div>
                  <div className="text-2xl font-bold text-gray-900">287</div>
                  <div className="flex items-center text-xs text-yellow-600 mt-1">
                    <i className="fas fa-info-circle mr-1"></i>Medium Risk
                  </div>
                </div>

                {/* Bombali */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Bombali</div>
                  <div className="text-2xl font-bold text-gray-900">298</div>
                  <div className="flex items-center text-xs text-yellow-600 mt-1">
                    <i className="fas fa-info-circle mr-1"></i>Medium Risk
                  </div>
                </div>

                {/* Port Loko */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Port Loko</div>
                  <div className="text-2xl font-bold text-gray-900">189</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <i className="fas fa-check-circle mr-1"></i>Low Risk
                  </div>
                </div>

                {/* Tonkolili */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Tonkolili</div>
                  <div className="text-2xl font-bold text-gray-900">167</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <i className="fas fa-check-circle mr-1"></i>Low Risk
                  </div>
                </div>

                {/* Koinadugu */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Koinadugu</div>
                  <div className="text-2xl font-bold text-gray-900">143</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <i className="fas fa-check-circle mr-1"></i>Low Risk
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <i className="fas fa-map text-green-600 text-4xl mb-3"></i>
                <div className="text-gray-700 font-medium mb-1">Interactive Sierra Leone Map</div>
                <div className="text-sm text-gray-500">Click districts above to highlight</div>
              </div>
            </div>

            {/* Service Providers - Takes 1 column */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Providers</h3>
              
              <div className="space-y-4">
                {/* Rainbo Initiative */}
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Rainbo Initiative</div>
                    <span className="text-xs text-orange-500">24 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">9 Centers</div>
                  <div className="text-sm font-semibold text-blue-600">1247 cases</div>
                </div>

                {/* One-Stop Centers */}
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">One-Stop Centers</div>
                    <span className="text-xs text-yellow-500">12 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">7 Hospitals</div>
                  <div className="text-sm font-semibold text-blue-600">692 cases</div>
                </div>

                {/* Police FSU */}
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Police FSU</div>
                    <span className="text-xs text-orange-500">48 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">16 Districts</div>
                  <div className="text-sm font-semibold text-blue-600">654 cases</div>
                </div>

                {/* 116 Hotline */}
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">116 Hotline</div>
                    <span className="text-xs text-green-500">2 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">National</div>
                  <div className="text-sm font-semibold text-blue-600">189 cases</div>
                </div>

                {/* Community Reports */}
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-900">Community Reports</div>
                    <span className="text-xs text-yellow-500">72 hours</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Village Level</div>
                  <div className="text-sm font-semibold text-blue-600">89 cases</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Enhanced GBV Dashboard</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">Insyt FamilyCare Healthcare Technology</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Version 2.0</span>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm text-gray-500">© 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Load JavaScript */}
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="/static/app-simplified.js"></script>
    </div>
  );
});

export default app
