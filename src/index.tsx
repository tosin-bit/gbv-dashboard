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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Enhanced GBV Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sierra Leone & Beyond</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button className="dashboard-tab active border-b-2 border-blue-600 py-4 px-1 text-sm font-medium text-blue-600">
              <i className="fas fa-chart-dashboard mr-2"></i>Dashboard
            </button>
            <button className="dashboard-tab border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              <i className="fas fa-map-marker-alt mr-2"></i>Geographic View
            </button>
            <button className="dashboard-tab border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              <i className="fas fa-folder-open mr-2"></i>Case Management
            </button>
            <button className="dashboard-tab border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              <i className="fas fa-hospital mr-2"></i>Service Providers
            </button>
            <button className="dashboard-tab border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              <i className="fas fa-chart-line mr-2"></i>Reports
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
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Cases</dt>
                      <dd className="text-lg font-medium text-gray-900" id="total-cases">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <i className="fas fa-clock text-white"></i>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Cases</dt>
                      <dd className="text-lg font-medium text-gray-900" id="pending-cases">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <i className="fas fa-check-circle text-white"></i>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Cases Resolved</dt>
                      <dd className="text-lg font-medium text-gray-900" id="resolved-cases">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <i className="fas fa-hospital text-white"></i>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Service Providers</dt>
                      <dd className="text-lg font-medium text-gray-900" id="service-providers-count">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Cases by District Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cases by District</h3>
              <canvas id="districtChart" width="400" height="300"></canvas>
            </div>

            {/* Cases by Type Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cases by Violence Type</h3>
              <canvas id="typeChart" width="400" height="300"></canvas>
            </div>
          </div>

          {/* Recent Cases Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Cases</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody id="recent-cases-table" className="bg-white divide-y divide-gray-200">
                  {/* Table content will be populated by JavaScript */}
                </tbody>
              </table>
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
      <script src="/static/app.js"></script>
      <script src="/static/case-management.js"></script>
    </div>
  );
});

export default app
