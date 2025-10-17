// Enhanced GBV Dashboard - Frontend JavaScript
console.log('Enhanced GBV Dashboard initializing...');

// Global state
window.GBVDashboard = {
    data: {
        stats: {},
        cases: [],
        districts: [],
        serviceProviders: [],
        loading: true
    },
    charts: {}
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Enhanced GBV Dashboard...');
    console.log('DOM loaded, starting dashboard initialization...');
    
    // Start loading data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
});

// Load all dashboard data
async function loadDashboardData() {
    try {
        console.log('Loading dashboard data...');
        
        // Load statistics
        const statsResponse = await fetch('/api/stats');
        const statsData = await statsResponse.json();
        
        // Load districts
        const districtsResponse = await fetch('/api/districts');
        const districtsData = await districtsResponse.json();
        
        // Load recent cases
        const casesResponse = await fetch('/api/cases?limit=10');
        const casesData = await casesResponse.json();
        
        // Load service providers
        const providersResponse = await fetch('/api/service-providers');
        const providersData = await providersResponse.json();
        
        // Update global state
        window.GBVDashboard.data = {
            stats: statsData.stats || {},
            cases: casesData.cases || [],
            districts: districtsData.districts || [],
            serviceProviders: providersData.serviceProviders || [],
            loading: false
        };
        
        console.log('Data loaded successfully:', window.GBVDashboard.data);
        
        // Update UI
        updateDashboard();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update dashboard UI with loaded data
function updateDashboard() {
    console.log('Updating dashboard UI...');
    
    // Hide loading state
    const loadingState = document.getElementById('loading-state');
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (loadingState) loadingState.classList.add('hidden');
    if (dashboardContent) dashboardContent.classList.remove('hidden');
    
    // Update KPI cards
    updateKPICards();
    
    // Update charts
    updateCharts();
    
    // Update recent cases table
    updateRecentCasesTable();
    
    console.log('Dashboard updated successfully');
}

// Update KPI cards with statistics
function updateKPICards() {
    const { stats } = window.GBVDashboard.data;
    
    // Total cases
    const totalCasesElement = document.getElementById('total-cases');
    if (totalCasesElement && stats.totalCases !== undefined) {
        totalCasesElement.textContent = stats.totalCases.toLocaleString();
    }
    
    // Cases by status
    if (stats.casesByStatus && stats.casesByStatus.length > 0) {
        const pendingCases = stats.casesByStatus.find(s => s.case_status === 'reported')?.count || 0;
        const resolvedCases = stats.casesByStatus.find(s => s.case_status === 'closed')?.count || 0;
        
        const pendingElement = document.getElementById('pending-cases');
        const resolvedElement = document.getElementById('resolved-cases');
        
        if (pendingElement) pendingElement.textContent = pendingCases.toLocaleString();
        if (resolvedElement) resolvedElement.textContent = resolvedCases.toLocaleString();
    }
    
    // Service providers count
    const serviceProvidersElement = document.getElementById('service-providers-count');
    if (serviceProvidersElement && stats.serviceProviders) {
        const totalProviders = stats.serviceProviders.reduce((sum, sp) => sum + sp.count, 0);
        serviceProvidersElement.textContent = totalProviders.toLocaleString();
    }
}

// Update charts using Chart.js
function updateCharts() {
    // Load Chart.js if not already loaded
    if (typeof Chart === 'undefined') {
        console.log('Loading Chart.js...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('Chart.js loaded, creating charts...');
            createCharts();
        };
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

// Create charts
function createCharts() {
    const { stats } = window.GBVDashboard.data;
    
    // Cases by District Chart
    if (stats.casesByDistrict && stats.casesByDistrict.length > 0) {
        const districtCtx = document.getElementById('districtChart');
        if (districtCtx) {
            // Destroy existing chart if it exists
            if (window.GBVDashboard.charts.districtChart) {
                window.GBVDashboard.charts.districtChart.destroy();
            }
            
            const districtLabels = stats.casesByDistrict.map(d => d.district_name);
            const districtData = stats.casesByDistrict.map(d => d.case_count);
            
            window.GBVDashboard.charts.districtChart = new Chart(districtCtx, {
                type: 'bar',
                data: {
                    labels: districtLabels,
                    datasets: [{
                        label: 'Cases',
                        data: districtData,
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    }]
                },
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
                            ticks: {
                                stepSize: 1
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 45
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Cases by Type Chart
    if (stats.casesByType && stats.casesByType.length > 0) {
        const typeCtx = document.getElementById('typeChart');
        if (typeCtx) {
            // Destroy existing chart if it exists
            if (window.GBVDashboard.charts.typeChart) {
                window.GBVDashboard.charts.typeChart.destroy();
            }
            
            const typeLabels = stats.casesByType.map(t => t.gbv_type);
            const typeData = stats.casesByType.map(t => t.case_count);
            
            // Generate colors for different types
            const colors = [
                '#EF4444', '#F97316', '#EAB308', '#22C55E', 
                '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899',
                '#64748B', '#DC2626', '#EA580C', '#CA8A04'
            ];
            
            window.GBVDashboard.charts.typeChart = new Chart(typeCtx, {
                type: 'doughnut',
                data: {
                    labels: typeLabels,
                    datasets: [{
                        data: typeData,
                        backgroundColor: colors.slice(0, typeData.length),
                        borderWidth: 2,
                        borderColor: '#FFFFFF'
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
    }
}

// Update recent cases table
function updateRecentCasesTable() {
    const { cases } = window.GBVDashboard.data;
    const tableBody = document.getElementById('recent-cases-table');
    
    if (!tableBody || !cases || cases.length === 0) {
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                        No recent cases available
                    </td>
                </tr>
            `;
        }
        return;
    }
    
    tableBody.innerHTML = cases.map(caseItem => {
        const statusColor = getStatusColor(caseItem.case_status);
        const priorityColor = getPriorityColor(caseItem.priority_level);
        
        return `
            <tr class="hover:bg-gray-50 cursor-pointer" data-case-id="${caseItem.id}">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${caseItem.case_number}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${formatDate(caseItem.incident_date)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${caseItem.gbv_type}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${caseItem.district_name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}">
                        ${caseItem.case_status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColor}">
                        ${caseItem.priority_level}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Tab navigation
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active', 'border-blue-600', 'text-blue-600');
                t.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'border-blue-600', 'text-blue-600');
            this.classList.remove('border-transparent', 'text-gray-500');
            
            // Handle tab switching logic here
            const tabText = this.textContent.trim();
            console.log('Switching to tab:', tabText);
        });
    });
    
    // Case row clicks
    document.addEventListener('click', function(e) {
        const caseRow = e.target.closest('[data-case-id]');
        if (caseRow) {
            const caseId = caseRow.getAttribute('data-case-id');
            console.log('Case clicked:', caseId);
            // Handle case details view here
        }
    });
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function getStatusColor(status) {
    const colors = {
        'reported': 'bg-yellow-100 text-yellow-800',
        'under_investigation': 'bg-blue-100 text-blue-800',
        'services_provided': 'bg-green-100 text-green-800',
        'closed': 'bg-gray-100 text-gray-800',
        'referred': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getPriorityColor(priority) {
    const colors = {
        'low': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'high': 'bg-red-100 text-red-800',
        'critical': 'bg-red-200 text-red-900'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

function showError(message) {
    console.error(message);
    
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Make functions globally available for debugging
window.GBVDashboard.loadData = loadDashboardData;
window.GBVDashboard.updateUI = updateDashboard;

console.log('Enhanced GBV Dashboard frontend loaded successfully');