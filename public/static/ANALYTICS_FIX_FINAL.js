/**
 * ANALYTICS FIX FINAL - Override showAnalyticsSection with simpler logic
 */

console.log('🔧 ANALYTICS FIX FINAL Loading...');

// Wait for page to be ready
function initAnalyticsFix() {
    console.log('🔧 Initializing Analytics Fix...');
    
    // Override the showAnalyticsSection function with a simpler version
    window.showAnalyticsSection = function(sectionType) {
        console.log(`🎯 Analytics Fix: Loading ${sectionType}`);
        
        // Find the main dashboard content area
        let targetSection = document.getElementById('dashboard-content');
        
        if (!targetSection) {
            console.error('❌ dashboard-content not found');
            return;
        }
        
        console.log('✅ Found dashboard-content, loading section...');
        
        // Check if functions exist
        console.log('Function check:', {
            loadSpikePrediction: typeof loadSpikePrediction,
            loadRiskScoring: typeof loadRiskScoring,
            loadResourceForecast: typeof loadResourceForecast,
            loadTrendIntelligence: typeof loadTrendIntelligence
        });
        
        // Load the appropriate dashboard directly
        try {
            switch(sectionType) {
                case 'spike-prediction':
                    if (typeof loadSpikePrediction === 'function') {
                        console.log('📈 Loading Spike Prediction...');
                        loadSpikePrediction(targetSection);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.error('❌ loadSpikePrediction function not found');
                        alert('Spike Prediction is loading... Please wait a moment and try again.');
                    }
                    break;
                    
                case 'risk-scoring':
                    if (typeof loadRiskScoring === 'function') {
                        console.log('⚠️ Loading Risk Scoring...');
                        loadRiskScoring(targetSection);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.error('❌ loadRiskScoring function not found');
                        alert('Risk Scoring is loading... Please wait a moment and try again.');
                    }
                    break;
                    
                case 'resource-forecast':
                    if (typeof loadResourceForecast === 'function') {
                        console.log('📦 Loading Resource Forecast...');
                        loadResourceForecast(targetSection);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.error('❌ loadResourceForecast function not found');
                        alert('Resource Forecast is loading... Please wait a moment and try again.');
                    }
                    break;
                    
                case 'trend-intelligence':
                    if (typeof loadTrendIntelligence === 'function') {
                        console.log('🔍 Loading Trend Intelligence...');
                        loadTrendIntelligence(targetSection);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.error('❌ loadTrendIntelligence function not found');
                        alert('Trend Intelligence is loading... Please wait a moment and try again.');
                    }
                    break;
                    
                default:
                    console.error('❌ Unknown section type:', sectionType);
            }
        } catch (error) {
            console.error('❌ Error loading analytics section:', error);
            alert('An error occurred. Please refresh the page and try again.');
        }
    };
    
    console.log('✅ Analytics Fix initialized - showAnalyticsSection overridden');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalyticsFix);
} else {
    initAnalyticsFix();
}

// Also initialize after delays to ensure it overrides the original
setTimeout(initAnalyticsFix, 1000);
setTimeout(initAnalyticsFix, 2000);
setTimeout(initAnalyticsFix, 3000);

console.log('✅ ANALYTICS FIX FINAL Loaded');
