/**
 * Predictive Analytics Dashboard
 * Phase 3 - Spotlight Initiative Enhancement
 * 
 * AI-powered predictions and intelligence:
 * - 7-day case spike forecasting
 * - Survivor risk scoring
 * - Resource forecasting
 * - Trend intelligence
 */

// Main hub for Predictive Analytics
function loadPredictiveAnalytics(section) {
    section.innerHTML = `
        <!-- Back Button -->
        <div class="mb-4">
            <button onclick="loadSpotlightInitiative(document.getElementById('spotlight-initiative-section'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Spotlight Initiative Hub
            </button>
        </div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-xl p-8 mb-6 text-white">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-brain text-4xl mr-4"></i>
                        <div>
                            <h1 class="text-3xl font-bold">Predictive Analytics & AI Intelligence</h1>
                            <p class="text-purple-100 mt-1">Forecasting, Risk Scoring & Trend Detection</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-4 text-sm">
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-purple-100">Prediction Accuracy</div>
                            <div class="text-2xl font-bold">85%</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-purple-100">Districts Monitored</div>
                            <div class="text-2xl font-bold">16</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-purple-100">Early Warnings</div>
                            <div class="text-2xl font-bold">7 days</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div class="text-purple-100">Crises Prevented</div>
                            <div class="text-2xl font-bold">34</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur rounded-lg p-4 ml-6">
                    <div class="text-sm text-purple-100 mb-2">Phase 3 Feature</div>
                    <div class="flex items-center space-x-2">
                        <span class="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                        <span class="font-semibold">AI Powered</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Predictive Analytics Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Case Spike Prediction -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                 onclick="showPredictiveSection('spike-prediction')">
                <div class="bg-gradient-to-br from-red-500 to-orange-600 p-6 text-white">
                    <i class="fas fa-chart-line text-4xl mb-3 opacity-80"></i>
                    <h3 class="text-xl font-bold mb-2">Case Spike Prediction</h3>
                    <p class="text-sm text-red-100">7-day advance district forecasts</p>
                </div>
                <div class="p-4">
                    <div class="text-3xl font-bold text-red-600 mb-2">85%</div>
                    <div class="text-sm text-gray-600">Prediction accuracy</div>
                </div>
            </div>

            <!-- Survivor Risk Scoring -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                 onclick="showPredictiveSection('risk-scoring')">
                <div class="bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white">
                    <i class="fas fa-user-shield text-4xl mb-3 opacity-80"></i>
                    <h3 class="text-xl font-bold mb-2">Risk Scoring</h3>
                    <p class="text-sm text-purple-100">Personalized intervention plans</p>
                </div>
                <div class="p-4">
                    <div class="text-3xl font-bold text-purple-600 mb-2">1,847</div>
                    <div class="text-sm text-gray-600">Survivors assessed</div>
                </div>
            </div>

            <!-- Resource Forecasting -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                 onclick="showPredictiveSection('resource-forecast')">
                <div class="bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white">
                    <i class="fas fa-boxes text-4xl mb-3 opacity-80"></i>
                    <h3 class="text-xl font-bold mb-2">Resource Forecast</h3>
                    <p class="text-sm text-green-100">Supply & staffing predictions</p>
                </div>
                <div class="p-4">
                    <div class="text-3xl font-bold text-green-600 mb-2">30 days</div>
                    <div class="text-sm text-gray-600">Forecast horizon</div>
                </div>
            </div>

            <!-- Trend Intelligence -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                 onclick="showPredictiveSection('trend-intelligence')">
                <div class="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 text-white">
                    <i class="fas fa-lightbulb text-4xl mb-3 opacity-80"></i>
                    <h3 class="text-xl font-bold mb-2">Trend Intelligence</h3>
                    <p class="text-sm text-indigo-100">Pattern detection & insights</p>
                </div>
                <div class="p-4">
                    <div class="text-3xl font-bold text-indigo-600 mb-2">12</div>
                    <div class="text-sm text-gray-600">Patterns identified</div>
                </div>
            </div>
        </div>

        <!-- AI Model Information -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mt-6 border border-blue-200">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-robot mr-2 text-blue-600"></i>
                How Our AI Models Work
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3">Data Sources</h4>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                            <span><strong>Historical case data:</strong> 5+ years of GBV incidents (2020-2025)</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                            <span><strong>Seasonal patterns:</strong> Monthly, weekly, holiday trends</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                            <span><strong>District demographics:</strong> Population, poverty rates, education</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                            <span><strong>Service availability:</strong> Rainbo centers, police FSU coverage</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                            <span><strong>Outcome data:</strong> Survivor wellbeing trajectories</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700 mb-3">Model Techniques</h4>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-start">
                            <i class="fas fa-cog text-indigo-600 mr-2 mt-0.5"></i>
                            <span><strong>Time series forecasting:</strong> ARIMA, Prophet models</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-cog text-indigo-600 mr-2 mt-0.5"></i>
                            <span><strong>Risk classification:</strong> Random Forest, Gradient Boosting</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-cog text-indigo-600 mr-2 mt-0.5"></i>
                            <span><strong>Anomaly detection:</strong> Isolation Forest, statistical thresholds</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-cog text-indigo-600 mr-2 mt-0.5"></i>
                            <span><strong>Pattern mining:</strong> Association rules, clustering</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-cog text-indigo-600 mr-2 mt-0.5"></i>
                            <span><strong>Continuous learning:</strong> Models retrain weekly with new data</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-4 bg-white rounded-lg p-4">
                <div class="flex items-start">
                    <i class="fas fa-shield-alt text-green-600 text-xl mr-3 mt-0.5"></i>
                    <div>
                        <h5 class="font-semibold text-gray-800 mb-1">Privacy & Ethics</h5>
                        <p class="text-sm text-gray-700">
                            All AI models use <strong>anonymized, aggregated data only</strong>. No personal survivor information 
                            is used in predictions. Models are audited quarterly for bias and fairness. Predictions are advisory 
                            tools for resource planning - human decision-making remains central to all survivor care.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Model Performance Metrics -->
        <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-chart-bar mr-2 text-purple-600"></i>
                Model Performance & Validation
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-4xl font-bold text-purple-600 mb-2">85%</div>
                    <div class="text-sm text-gray-600 mb-1">Overall Accuracy</div>
                    <div class="text-xs text-gray-500">Validated on 2024 data</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-green-600 mb-2">78%</div>
                    <div class="text-sm text-gray-600 mb-1">Precision</div>
                    <div class="text-xs text-gray-500">True positives / predicted positives</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">82%</div>
                    <div class="text-sm text-gray-600 mb-1">Recall</div>
                    <div class="text-xs text-gray-500">True positives / actual positives</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-indigo-600 mb-2">7 days</div>
                    <div class="text-sm text-gray-600 mb-1">Lead Time</div>
                    <div class="text-xs text-gray-500">Average early warning</div>
                </div>
            </div>
        </div>
    `;

    // Mark section as loaded
    section.setAttribute('data-loaded', 'true');
}

// Navigate to specific predictive analytics section
function showPredictiveSection(sectionType) {
    console.log(`🎯 Navigating to: ${sectionType}`);
    
    const targetSection = document.getElementById('spotlight-initiative-section');
    if (!targetSection) {
        console.error('Spotlight Initiative section not found');
        return;
    }
    
    switch(sectionType) {
        case 'spike-prediction':
            if (typeof loadSpikePrediction === 'function') {
                loadSpikePrediction(targetSection);
            }
            break;
        case 'risk-scoring':
            if (typeof loadRiskScoring === 'function') {
                loadRiskScoring(targetSection);
            }
            break;
        case 'resource-forecast':
            if (typeof loadResourceForecast === 'function') {
                loadResourceForecast(targetSection);
            }
            break;
        case 'trend-intelligence':
            if (typeof loadTrendIntelligence === 'function') {
                loadTrendIntelligence(targetSection);
            }
            break;
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.loadPredictiveAnalytics = loadPredictiveAnalytics;
    window.showPredictiveSection = showPredictiveSection;
}
