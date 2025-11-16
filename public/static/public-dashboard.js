/**
 * Public Transparency Dashboard
 * Anonymized public view of GBV data for accountability and transparency
 * No personal information - only aggregated statistics
 */

function loadPublicDashboard(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-eye mr-3"></i>Public Transparency Dashboard
                        </h2>
                        <p class="text-green-100 text-lg">
                            Real-time GBV statistics for Sierra Leone - Anonymized & Aggregated Data
                        </p>
                        <div class="flex items-center space-x-4 mt-3">
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-shield-alt mr-2"></i>Privacy Protected
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-sync mr-2"></i>Updated Daily
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-share-alt mr-2"></i>Shareable Link
                            </span>
                        </div>
                    </div>
                    <button onclick="sharePublicDashboard()" 
                            class="px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                        <i class="fas fa-share-nodes mr-2"></i>Share Dashboard
                    </button>
                </div>
            </div>

            <!-- Privacy Notice -->
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div class="flex items-start">
                    <i class="fas fa-info-circle text-blue-600 text-xl mr-3 mt-0.5"></i>
                    <div>
                        <h3 class="font-semibold text-blue-900 mb-1">Privacy & Data Protection</h3>
                        <p class="text-sm text-blue-800">
                            This dashboard displays only aggregated, anonymized statistics. No personal information, 
                            survivor identities, or case details are publicly visible. All data is presented in compliance 
                            with Sierra Leone's Data Protection Act 2021 and international privacy standards.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Key Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-file-alt text-green-600 text-2xl"></i>
                        </div>
                        <span class="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                            2025 YTD
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-1">2,871</div>
                    <div class="text-sm text-gray-600">Cases Reported</div>
                    <div class="mt-3 flex items-center text-xs">
                        <i class="fas fa-arrow-up text-red-500 mr-1"></i>
                        <span class="text-red-500 font-semibold">+8.2%</span>
                        <span class="text-gray-500 ml-1">vs 2024</span>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-hand-holding-heart text-blue-600 text-2xl"></i>
                        </div>
                        <span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            Live
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-1">2,403</div>
                    <div class="text-sm text-gray-600">Survivors Supported</div>
                    <div class="mt-3 flex items-center text-xs">
                        <i class="fas fa-check text-green-500 mr-1"></i>
                        <span class="text-green-500 font-semibold">83.7%</span>
                        <span class="text-gray-500 ml-1">coverage rate</span>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-hospital text-purple-600 text-2xl"></i>
                        </div>
                        <span class="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                            Active
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-1">16</div>
                    <div class="text-sm text-gray-600">Service Centers</div>
                    <div class="mt-3 flex items-center text-xs">
                        <i class="fas fa-map-marker-alt text-purple-500 mr-1"></i>
                        <span class="text-gray-500">All 16 districts</span>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-clock text-orange-600 text-2xl"></i>
                        </div>
                        <span class="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold">
                            Avg.
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-1">< 18h</div>
                    <div class="text-sm text-gray-600">Response Time</div>
                    <div class="mt-3 flex items-center text-xs">
                        <i class="fas fa-arrow-down text-green-500 mr-1"></i>
                        <span class="text-green-500 font-semibold">-25%</span>
                        <span class="text-gray-500 ml-1">improved</span>
                    </div>
                </div>
            </div>

            <!-- National Trends -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-chart-line mr-3"></i>National Trends (Last 12 Months)
                </h3>
                <div class="h-80">
                    <canvas id="public-trends-chart"></canvas>
                </div>
            </div>

            <!-- District Heatmap -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-map mr-3"></i>District Case Distribution
                </h3>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    ${generatePublicDistrictCards()}
                </div>
                
                <div class="text-center text-sm text-gray-500 mt-4">
                    <i class="fas fa-info-circle mr-1"></i>
                    Click "District Map" tab for interactive visualization
                </div>
            </div>

            <!-- Service Provider Access -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-hospital-user mr-3"></i>Service Provider Coverage
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-hospital text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Rainbo Centers</h4>
                                <p class="text-xs text-gray-500">One-Stop Medical & Psychosocial Care</p>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Centers Operating</span>
                                <span class="font-semibold">9</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Survivors Served</span>
                                <span class="font-semibold">1,247</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Avg. Response</span>
                                <span class="font-semibold text-green-600">< 24 hours</span>
                            </div>
                        </div>
                    </div>

                    <div class="border rounded-lg p-4">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-shield-alt text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Police FSU</h4>
                                <p class="text-xs text-gray-500">Family Support Unit - Investigation</p>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">FSU Stations</span>
                                <span class="font-semibold">16</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Cases Investigated</span>
                                <span class="font-semibold">654</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Avg. Response</span>
                                <span class="font-semibold text-yellow-600">< 48 hours</span>
                            </div>
                        </div>
                    </div>

                    <div class="border rounded-lg p-4">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-phone-alt text-green-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">116 Hotline</h4>
                                <p class="text-xs text-gray-500">24/7 Emergency Support</p>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Languages</span>
                                <span class="font-semibold">4</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Calls Handled</span>
                                <span class="font-semibold">189</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Avg. Response</span>
                                <span class="font-semibold text-green-600">< 2 minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Access -->
                <div class="mt-6 bg-green-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                        <i class="fas fa-phone text-green-600 mr-2"></i>
                        Emergency Contacts
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="flex items-center">
                            <span class="text-gray-700">GBV Emergency Hotline:</span>
                            <a href="tel:116" class="ml-2 font-semibold text-green-600 hover:underline">116 (Toll-Free)</a>
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-700">Police Emergency:</span>
                            <a href="tel:999" class="ml-2 font-semibold text-blue-600 hover:underline">999</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Freshness & Methodology -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-database mr-3"></i>Data Transparency & Methodology
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-3">Data Sources</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                                <span>Ministry of Gender and Children's Affairs reporting system</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                                <span>Rainbo Initiative medical records (anonymized)</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                                <span>Sierra Leone Police FSU incident reports</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                                <span>Community-based organizations and hotlines</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-3">Update Frequency</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-center justify-between">
                                <span>Statistics Dashboard</span>
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Daily</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <span>District Maps</span>
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">Real-time</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <span>Trend Analysis</span>
                                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">Weekly</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <span>Last Updated</span>
                                <span class="font-semibold text-gray-900">2025-10-17 08:30 AM</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="mt-6 bg-gray-50 rounded-lg p-4">
                    <p class="text-sm text-gray-700">
                        <strong>Note:</strong> All data is aggregated and anonymized. No individual case details, 
                        survivor identities, or personal information is included. Statistics represent reported cases 
                        only and may not capture all incidents of GBV in Sierra Leone. For detailed analysis and 
                        methodology, please refer to our quarterly reports.
                    </p>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-8 text-center">
                <h3 class="text-2xl font-bold mb-3">Need Help or Want to Report?</h3>
                <p class="text-green-100 mb-6 max-w-2xl mx-auto">
                    If you or someone you know is experiencing gender-based violence, help is available 24/7. 
                    All services are confidential and free of charge.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="tel:116" 
                       class="px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold flex items-center">
                        <i class="fas fa-phone-alt mr-2"></i>Call 116 (Toll-Free)
                    </a>
                    <button onclick="switchTab('reportCase')" 
                            class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors font-semibold flex items-center">
                        <i class="fas fa-file-alt mr-2"></i>Report Online
                    </button>
                    <button onclick="switchTab('resources')" 
                            class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center">
                        <i class="fas fa-book mr-2"></i>Learn More
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Initialize chart
    setTimeout(() => {
        initializePublicChart();
    }, 500);
}

function generatePublicDistrictCards() {
    const districts = [
        { name: 'Western Area', cases: 695, risk: 'high' },
        { name: 'Bo', cases: 412, risk: 'high' },
        { name: 'Kenema', cases: 324, risk: 'high' },
        { name: 'Bombali', cases: 298, risk: 'medium' },
        { name: 'Port Loko', cases: 289, risk: 'medium' },
        { name: 'Kailahun', cases: 287, risk: 'medium' },
        { name: 'Kono', cases: 156, risk: 'low' },
        { name: 'Tonkolili', cases: 132, risk: 'low' }
    ];
    
    return districts.map(d => `
        <div class="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-gray-900 text-sm">${d.name}</h4>
                <span class="w-3 h-3 rounded-full ${
                    d.risk === 'high' ? 'bg-red-500' :
                    d.risk === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                }"></span>
            </div>
            <div class="text-2xl font-bold text-gray-900">${d.cases}</div>
            <div class="text-xs text-gray-500">cases reported</div>
        </div>
    `).join('');
}

function initializePublicChart() {
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet');
        return;
    }
    
    const ctx = document.getElementById('public-trends-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25'],
                datasets: [{
                    label: 'Cases Reported',
                    data: [245, 263, 230, 215, 245, 268, 276, 289, 310, 305, 298, 287],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function sharePublicDashboard() {
    const url = window.location.origin + '/public-dashboard';
    const text = 'Sierra Leone GBV Public Dashboard - Real-time transparency and accountability in gender-based violence response';
    
    if (navigator.share) {
        navigator.share({
            title: 'GBV Public Dashboard',
            text: text,
            url: url
        }).catch(() => {});
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert(`📋 Dashboard link copied to clipboard!\n\n${url}\n\nShare this link with:\n• Community leaders\n• Donor organizations\n• Media & journalists\n• Civil society organizations\n• International partners`);
        });
    }
}

function switchTab(tabName) {
    // This would trigger the main dashboard tab switching
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabName.toLowerCase().replace('Case', ' Case'))) {
            tab.click();
        }
    });
}

// Export functions
window.loadPublicDashboard = loadPublicDashboard;
window.sharePublicDashboard = sharePublicDashboard;
window.switchTab = switchTab;
