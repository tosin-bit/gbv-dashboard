/**
 * Donor Impact Report Generator
 * Auto-generate quarterly reports for EU, UN, World Bank, and Ministry of Gender
 * Professional PDF-ready format with charts, metrics, and impact stories
 */

function loadDonorReports(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Back Button -->
            <div class="mb-4">
                <button onclick="loadSpotlightInitiative(document.getElementById('spotlight-initiative-section'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Spotlight Initiative Hub
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-file-invoice mr-3"></i>Donor Impact Report Generator
                        </h2>
                        <p class="text-indigo-100 text-lg">
                            Professional reports for EU, UN, World Bank & Ministry stakeholders
                        </p>
                        <div class="flex items-center space-x-4 mt-3">
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-calendar mr-2"></i>Quarterly Reports
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-chart-pie mr-2"></i>Impact Metrics
                            </span>
                            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">
                                <i class="fas fa-download mr-2"></i>PDF Export
                            </span>
                        </div>
                    </div>
                    <button onclick="generateQuickReport()" 
                            class="px-6 py-3 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
                        <i class="fas fa-bolt mr-2"></i>Quick Generate
                    </button>
                </div>
            </div>

            <!-- Report Configuration -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-6 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-cog mr-3"></i>Report Configuration
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Report Type -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                        <select id="report-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                            <option value="quarterly">Quarterly Report</option>
                            <option value="annual">Annual Report</option>
                            <option value="donor">Donor-Specific Report</option>
                            <option value="sdg">SDG Progress Report</option>
                            <option value="impact">Impact Assessment</option>
                        </select>
                    </div>
                    
                    <!-- Period -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Reporting Period</label>
                        <select id="report-period" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                            <option value="q4-2025">Q4 2025 (Oct-Dec)</option>
                            <option value="q3-2025">Q3 2025 (Jul-Sep)</option>
                            <option value="q2-2025">Q2 2025 (Apr-Jun)</option>
                            <option value="q1-2025">Q1 2025 (Jan-Mar)</option>
                            <option value="2025">Full Year 2025</option>
                            <option value="2024">Full Year 2024</option>
                        </select>
                    </div>
                    
                    <!-- Stakeholder -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Primary Stakeholder</label>
                        <select id="report-stakeholder" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                            <option value="ministry">Ministry of Gender</option>
                            <option value="un">UN Women</option>
                            <option value="eu">European Union</option>
                            <option value="worldbank">World Bank</option>
                            <option value="spotlight">Spotlight Initiative</option>
                            <option value="usaid">USAID</option>
                            <option value="who">WHO</option>
                        </select>
                    </div>
                    
                    <!-- Language -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Report Language</label>
                        <select id="report-language" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                            <option value="en">English</option>
                            <option value="en-fr">English + French</option>
                        </select>
                    </div>
                </div>
                
                <!-- Advanced Options -->
                <div class="mt-6 border-t pt-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Include in Report</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Executive Summary</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Key Metrics Dashboard</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">District Breakdown</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">SDG Alignment</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Impact Stories</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Budget Utilization</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Service Provider Details</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Case Studies (Anonymized)</span>
                        </label>
                    </div>
                </div>
                
                <!-- Generate Button -->
                <div class="mt-6 flex justify-end space-x-4">
                    <button onclick="previewReport()" 
                            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-eye mr-2"></i>Preview Report
                    </button>
                    <button onclick="generateFullReport()" 
                            class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        <i class="fas fa-file-pdf mr-2"></i>Generate PDF Report
                    </button>
                </div>
            </div>

            <!-- Recent Reports -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-6 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-history mr-3"></i>Recent Reports
                </h3>
                
                <div class="space-y-4">
                    ${generateRecentReports()}
                </div>
            </div>

            <!-- Report Preview (Executive Summary) -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-6 flex items-center" style="color: #1e3a8a;">
                    <i class="fas fa-file-alt mr-3"></i>Sample Report Preview: Q3 2025
                </h3>
                
                <!-- Executive Summary -->
                <div class="prose max-w-none">
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                        <h4 class="text-lg font-bold text-gray-900 mb-3">Executive Summary</h4>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            During Q3 2025 (July - September), Sierra Leone's GBV response system demonstrated significant progress 
                            in service delivery and survivor support, aligned with UN SDG 5 and 16 targets. The quarter recorded 
                            <strong class="text-indigo-600">871 new cases</strong> across 16 districts, with 
                            <strong class="text-green-600">83.7% receiving comprehensive services</strong> through Rainbo Centers, 
                            Police FSU, and community support networks.
                        </p>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="bg-white rounded-lg p-3 text-center">
                                <div class="text-2xl font-bold text-indigo-600">871</div>
                                <div class="text-xs text-gray-600">Cases Reported</div>
                            </div>
                            <div class="bg-white rounded-lg p-3 text-center">
                                <div class="text-2xl font-bold text-green-600">729</div>
                                <div class="text-xs text-gray-600">Survivors Served</div>
                            </div>
                            <div class="bg-white rounded-lg p-3 text-center">
                                <div class="text-2xl font-bold text-purple-600">18hrs</div>
                                <div class="text-xs text-gray-600">Avg Response Time</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Key Achievements -->
                    <div class="mb-6">
                        <h4 class="text-lg font-bold text-gray-900 mb-3">Key Achievements</h4>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-1 mr-2"></i>
                                <span class="text-gray-700">
                                    <strong>Service Coverage Expanded:</strong> Opened 2 new satellite Rainbo centers in Port Loko 
                                    and Kambia, increasing rural access by 28%
                                </span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-1 mr-2"></i>
                                <span class="text-gray-700">
                                    <strong>Response Time Improved:</strong> Average emergency response reduced from 24 hours to 18 hours 
                                    through enhanced coordination protocols
                                </span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-1 mr-2"></i>
                                <span class="text-gray-700">
                                    <strong>Legal Outcomes:</strong> 45 successful prosecutions completed, representing 6.5% conviction 
                                    rate (up from 4.2% in Q2)
                                </span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mt-1 mr-2"></i>
                                <span class="text-gray-700">
                                    <strong>Prevention Programs:</strong> Launched community awareness campaigns reaching 127,000 people 
                                    in local languages (Krio, Mende, Temne)
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Challenges & Recommendations -->
                    <div class="mb-6">
                        <h4 class="text-lg font-bold text-gray-900 mb-3">Challenges & Recommendations</h4>
                        <div class="bg-yellow-50 rounded-lg p-4 mb-3">
                            <div class="flex items-start">
                                <i class="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
                                <div>
                                    <div class="font-semibold text-gray-900 mb-1">Rural Service Gaps</div>
                                    <p class="text-sm text-gray-700 mb-2">
                                        Remote chiefdoms in Kailahun and Kono still experience 48+ hour response times.
                                    </p>
                                    <p class="text-sm text-green-700">
                                        <strong>Recommendation:</strong> Deploy 3 mobile Rainbo units with motorcycle transport for rapid response.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-red-50 rounded-lg p-4">
                            <div class="flex items-start">
                                <i class="fas fa-times-circle text-red-600 mt-1 mr-3"></i>
                                <div>
                                    <div class="font-semibold text-gray-900 mb-1">Prosecution Bottleneck</div>
                                    <p class="text-sm text-gray-700 mb-2">
                                        Case backlog in Fast Track Courts averaging 18.3 months to resolution.
                                    </p>
                                    <p class="text-sm text-green-700">
                                        <strong>Recommendation:</strong> Increase judicial capacity with 2 additional specialized courts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Budget Utilization -->
                    <div class="mb-6">
                        <h4 class="text-lg font-bold text-gray-900 mb-3">Budget Utilization (Q3 2025)</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-sm">
                                <thead>
                                    <tr class="bg-gray-50 border-b">
                                        <th class="px-4 py-2 text-left font-semibold">Program Area</th>
                                        <th class="px-4 py-2 text-right font-semibold">Allocated</th>
                                        <th class="px-4 py-2 text-right font-semibold">Spent</th>
                                        <th class="px-4 py-2 text-center font-semibold">Utilization</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b">
                                        <td class="px-4 py-2">Medical Services (Rainbo)</td>
                                        <td class="px-4 py-2 text-right">$485,000</td>
                                        <td class="px-4 py-2 text-right">$423,150</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">87.2%</span>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-4 py-2">Police FSU Operations</td>
                                        <td class="px-4 py-2 text-right">$320,000</td>
                                        <td class="px-4 py-2 text-right">$289,600</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">90.5%</span>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-4 py-2">Legal Aid & Court Support</td>
                                        <td class="px-4 py-2 text-right">$215,000</td>
                                        <td class="px-4 py-2 text-right">$161,250</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">75.0%</span>
                                        </td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-4 py-2">Prevention & Awareness</td>
                                        <td class="px-4 py-2 text-right">$180,000</td>
                                        <td class="px-4 py-2 text-right">$153,000</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">85.0%</span>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-50 font-semibold">
                                        <td class="px-4 py-2">Total</td>
                                        <td class="px-4 py-2 text-right">$1,200,000</td>
                                        <td class="px-4 py-2 text-right">$1,027,000</td>
                                        <td class="px-4 py-2 text-center">
                                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">85.6%</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Impact Story -->
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                        <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                            <i class="fas fa-heart text-pink-600 mr-2"></i>Impact Story: "Aminata's Journey to Recovery"
                        </h4>
                        <p class="text-gray-700 leading-relaxed italic mb-3">
                            "When I first came to the Rainbo Center, I was scared and didn't know where to turn. 
                            The staff helped me feel safe immediately. They provided medical care, counseling, and 
                            connected me with a lawyer. Now, 6 months later, I am testifying in court and helping 
                            other survivors find their voice."
                        </p>
                        <p class="text-sm text-gray-600">
                            <strong>Case Outcome:</strong> Survivor received comprehensive care within 8 hours of reporting. 
                            Perpetrator arrested within 24 hours. Case successfully prosecuted with conviction secured in Q3 2025.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateRecentReports() {
    const reports = [
        { 
            title: 'Q3 2025 Quarterly Report', 
            stakeholder: 'Ministry of Gender', 
            date: '2025-10-05', 
            status: 'Published',
            downloads: 247
        },
        { 
            title: 'UN Spotlight Initiative Mid-Year Report 2025', 
            stakeholder: 'UN Women', 
            date: '2025-07-15', 
            status: 'Published',
            downloads: 412
        },
        { 
            title: 'SDG Progress Report - Annual 2024', 
            stakeholder: 'World Bank', 
            date: '2025-02-20', 
            status: 'Published',
            downloads: 589
        },
        { 
            title: 'Q2 2025 Impact Assessment', 
            stakeholder: 'European Union', 
            date: '2025-07-01', 
            status: 'Published',
            downloads: 324
        }
    ];
    
    return reports.map(r => `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 mb-1">${r.title}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                        <span><i class="fas fa-building mr-1"></i>${r.stakeholder}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${r.date}</span>
                        <span><i class="fas fa-download mr-1"></i>${r.downloads} downloads</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        <i class="fas fa-check-circle mr-1"></i>${r.status}
                    </span>
                    <button onclick="downloadReport('${r.title}')" 
                            class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateQuickReport() {
    alert('⚡ Quick Report Generation\n\nGenerating standard quarterly report with:\n\n✓ Executive Summary\n✓ Key Metrics Dashboard\n✓ District Breakdown\n✓ SDG Alignment\n✓ Budget Utilization\n\nEstimated time: 30 seconds\nFormat: PDF (12-15 pages)\n\nThis would automatically compile data from the database and generate a professional report.');
}

function previewReport() {
    alert('👁️ Report Preview\n\nOpening interactive preview in new window...\n\nPreview features:\n✓ Full report with charts\n✓ Edit sections before export\n✓ Add custom commentary\n✓ Select/deselect chapters\n\nFinal export to PDF after review.');
}

function generateFullReport() {
    // Get selected options
    const reportType = document.getElementById('report-type')?.value || 'quarterly';
    const period = document.getElementById('report-period')?.value || 'q4-2025';
    const stakeholder = document.getElementById('report-stakeholder')?.value || 'ministry';
    const language = document.getElementById('report-language')?.value || 'en';
    
    alert(`📊 Generating Full Report...\n\nConfiguration:\n• Type: ${reportType}\n• Period: ${period}\n• Stakeholder: ${stakeholder}\n• Language: ${language}\n\nReport will include:\n✓ Executive Summary\n✓ Key Metrics & Charts\n✓ District Analysis\n✓ SDG Progress Tracking\n✓ Budget Utilization\n✓ Impact Stories\n✓ Recommendations\n\nEstimated pages: 18-22\nDelivery: PDF download in 45 seconds\n\n[In production, this would generate a real PDF with all data from the database]`);
}

function downloadReport(reportTitle) {
    alert(`📥 Downloading Report: ${reportTitle}\n\nFormat: PDF\nSize: ~2.8 MB\nPages: 18\n\nThis would download the pre-generated report file.`);
}

// Export functions
window.loadDonorReports = loadDonorReports;
window.generateQuickReport = generateQuickReport;
window.previewReport = previewReport;
window.generateFullReport = generateFullReport;
window.downloadReport = downloadReport;
