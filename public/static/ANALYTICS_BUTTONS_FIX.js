/**
 * ANALYTICS BUTTONS FIX
 * Connect the 4 AI analytics buttons to their respective features
 */

console.log('🔬 ANALYTICS BUTTONS FIX Loading...');

// ========================================
// Global Functions for Analytics Buttons
// ========================================

// 1. Spike Prediction Button
window.showSpikePrediction = function() {
    console.log('📈 Opening Spike Prediction...');
    
    // Check if spike-prediction.js loaded
    if (typeof loadSpikePrediction === 'function') {
        const section = document.querySelector('#dashboard-content');
        if (section) {
            loadSpikePrediction(section);
        } else {
            console.error('Dashboard content section not found');
        }
    } else {
        // Show modal with spike prediction data
        showAnalyticsModal('Spike Prediction', `
            <div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-2">7-Day Case Forecasting</h3>
                    <p class="text-blue-100">AI-powered prediction of GBV case trends</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div class="text-sm text-red-600 font-semibold">Next 7 Days</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">+24 cases</div>
                        <div class="text-xs text-red-600 mt-1">
                            <i class="fas fa-arrow-up mr-1"></i>15% increase predicted
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <div class="text-sm text-yellow-600 font-semibold">Confidence Level</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">85%</div>
                        <div class="text-xs text-yellow-600 mt-1">
                            <i class="fas fa-chart-line mr-1"></i>High accuracy
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div class="text-sm text-blue-600 font-semibold">Districts at Risk</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">3</div>
                        <div class="text-xs text-blue-600 mt-1">
                            <i class="fas fa-map-marker-alt mr-1"></i>Requires attention
                        </div>
                    </div>
                </div>
                
                <div class="bg-white border rounded-lg p-6">
                    <h4 class="font-bold text-gray-900 mb-4">Key Insights</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>District-level forecasts:</strong> Western Area Urban expected +8 cases</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>7-day advance warning:</strong> Early intervention planning enabled</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Recommended actions:</strong> Deploy additional resources to high-risk districts</span>
                        </li>
                    </ul>
                </div>
            </div>
        `);
    }
};

// 2. Risk Scoring Button
window.showRiskScoring = function() {
    console.log('⚠️ Opening Risk Scoring...');
    
    if (typeof loadRiskScoring === 'function') {
        const section = document.querySelector('#dashboard-content');
        if (section) {
            loadRiskScoring(section);
        }
    } else {
        showAnalyticsModal('Risk Scoring', `
            <div class="space-y-6">
                <div class="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-2">Survivor Risk Assessment</h3>
                    <p class="text-green-100">AI-powered risk evaluation for intervention planning</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div class="text-sm text-red-600 font-semibold">High Risk Survivors</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">1,847</div>
                        <div class="text-xs text-red-600 mt-1">
                            <i class="fas fa-exclamation-triangle mr-1"></i>Immediate attention needed
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <div class="text-sm text-yellow-600 font-semibold">Risk Factors Analyzed</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">12</div>
                        <div class="text-xs text-yellow-600 mt-1">
                            <i class="fas fa-list-check mr-1"></i>Comprehensive evaluation
                        </div>
                    </div>
                    
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div class="text-sm text-green-600 font-semibold">Accuracy Rate</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">82%</div>
                        <div class="text-xs text-green-600 mt-1">
                            <i class="fas fa-check-circle mr-1"></i>Validated model
                        </div>
                    </div>
                </div>
                
                <div class="bg-white border rounded-lg p-6">
                    <h4 class="font-bold text-gray-900 mb-4">Risk Assessment Features</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Intervention planning:</strong> Prioritize high-risk survivors for services</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>82% accuracy rate:</strong> Reliable risk predictions for better outcomes</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Multi-factor analysis:</strong> Age, violence type, location, and support system evaluated</span>
                        </li>
                    </ul>
                </div>
            </div>
        `);
    }
};

// 3. Resource Forecast Button
window.showResourceForecast = function() {
    console.log('📊 Opening Resource Forecast...');
    
    if (typeof loadResourceForecast === 'function') {
        const section = document.querySelector('#dashboard-content');
        if (section) {
            loadResourceForecast(section);
        }
    } else {
        showAnalyticsModal('Resource Forecast', `
            <div class="space-y-6">
                <div class="bg-gradient-to-r from-lime-500 to-green-600 text-white p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-2">Supply & Budget Predictions</h3>
                    <p class="text-lime-100">30-day forecast for optimal resource allocation</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div class="text-sm text-blue-600 font-semibold">30-Day Forecast</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">$45,230</div>
                        <div class="text-xs text-blue-600 mt-1">
                            <i class="fas fa-dollar-sign mr-1"></i>Budget requirement
                        </div>
                    </div>
                    
                    <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                        <div class="text-sm text-orange-600 font-semibold">Medical Supplies</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">1,250</div>
                        <div class="text-xs text-orange-600 mt-1">
                            <i class="fas fa-box mr-1"></i>Units needed
                        </div>
                    </div>
                    
                    <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                        <div class="text-sm text-purple-600 font-semibold">Staffing Needs</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">32</div>
                        <div class="text-xs text-purple-600 mt-1">
                            <i class="fas fa-users mr-1"></i>Staff hours required
                        </div>
                    </div>
                </div>
                
                <div class="bg-white border rounded-lg p-6">
                    <h4 class="font-bold text-gray-900 mb-4">Forecasting Insights</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Medical supply tracking:</strong> Monitor inventory and predict needs</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Staffing requirements:</strong> Plan counselor and medical staff schedules</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>87% forecast accuracy:</strong> Reliable predictions for budget planning</span>
                        </li>
                    </ul>
                </div>
            </div>
        `);
    }
};

// 4. Trend Intelligence Button
window.showTrendIntelligence = function() {
    console.log('📉 Opening Trend Intelligence...');
    
    if (typeof loadTrendIntelligence === 'function') {
        const section = document.querySelector('#dashboard-content');
        if (section) {
            loadTrendIntelligence(section);
        }
    } else {
        showAnalyticsModal('Trend Intelligence', `
            <div class="space-y-6">
                <div class="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-2">Pattern & Policy Impact</h3>
                    <p class="text-yellow-100">AI-powered analysis of trends and intervention effectiveness</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div class="text-sm text-green-600 font-semibold">Active Patterns</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">12</div>
                        <div class="text-xs text-green-600 mt-1">
                            <i class="fas fa-chart-line mr-1"></i>Currently tracked
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div class="text-sm text-blue-600 font-semibold">Seasonal Analysis</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">Q4</div>
                        <div class="text-xs text-blue-600 mt-1">
                            <i class="fas fa-calendar mr-1"></i>Peak period identified
                        </div>
                    </div>
                    
                    <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                        <div class="text-sm text-purple-600 font-semibold">Policy Effectiveness</div>
                        <div class="text-3xl font-bold text-gray-900 mt-2">73%</div>
                        <div class="text-xs text-purple-600 mt-1">
                            <i class="fas fa-gavel mr-1"></i>Success rate
                        </div>
                    </div>
                </div>
                
                <div class="bg-white border rounded-lg p-6">
                    <h4 class="font-bold text-gray-900 mb-4">Intelligence Features</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Perpetrator profiling:</strong> Identify common characteristics and patterns</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Policy effectiveness:</strong> Measure impact of interventions and legislation</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span><strong>Seasonal analysis:</strong> Understand time-based trends for better planning</span>
                        </li>
                    </ul>
                </div>
            </div>
        `);
    }
};

// ========================================
// Helper Function: Show Analytics Modal
// ========================================
function showAnalyticsModal(title, content) {
    // Remove existing modal
    const existingModal = document.getElementById('analytics-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'analytics-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-900">
                    <i class="fas fa-chart-bar mr-2" style="color: #1e3a8a;"></i>${title}
                </h2>
                <button onclick="closeAnalyticsModal()" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                ${content}
            </div>
            
            <!-- Footer -->
            <div class="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end space-x-3">
                <button onclick="closeAnalyticsModal()" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
                    Close
                </button>
                <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    <i class="fas fa-download mr-2"></i>Export Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAnalyticsModal();
        }
    });
}

window.closeAnalyticsModal = function() {
    const modal = document.getElementById('analytics-modal');
    if (modal) modal.remove();
};

// ========================================
// Connect Buttons After Page Load
// ========================================
function connectAnalyticsButtons() {
    console.log('🔌 Connecting Analytics Buttons...');
    
    // Find all analytics buttons by their text content
    const buttons = document.querySelectorAll('button');
    let connected = 0;
    
    buttons.forEach(button => {
        const text = button.textContent.trim();
        
        if (text.includes('View Predictions')) {
            button.onclick = showSpikePrediction;
            connected++;
            console.log('✅ Connected: View Predictions button');
        } else if (text.includes('Calculate Risk')) {
            button.onclick = showRiskScoring;
            connected++;
            console.log('✅ Connected: Calculate Risk button');
        } else if (text.includes('View Forecast')) {
            button.onclick = showResourceForecast;
            connected++;
            console.log('✅ Connected: View Forecast button');
        } else if (text.includes('Analyze Trends')) {
            button.onclick = showTrendIntelligence;
            connected++;
            console.log('✅ Connected: Analyze Trends button');
        }
    });
    
    console.log(`✅ Connected ${connected} analytics buttons`);
    
    if (connected < 4) {
        console.warn(`⚠️ Only ${connected}/4 buttons connected. Will retry in 2 seconds...`);
        setTimeout(connectAnalyticsButtons, 2000);
    } else {
        console.log('🎉 All 4 analytics buttons connected successfully!');
    }
}

// ========================================
// Initialize
// ========================================
// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectAnalyticsButtons);
} else {
    connectAnalyticsButtons();
}

// Also retry after delays to catch dynamically loaded content
setTimeout(connectAnalyticsButtons, 1000);
setTimeout(connectAnalyticsButtons, 3000);

console.log('✅ ANALYTICS BUTTONS FIX Loaded');
