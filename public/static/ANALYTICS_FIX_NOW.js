/**
 * ANALYTICS FIX NOW - Force visibility and direct replacement
 */

console.log('🔥 ANALYTICS FIX NOW Loading...');

window.showAnalyticsSection = function(sectionType) {
    console.log(`🎯 FORCING ${sectionType} to load...`);
    
    // Get the main content area
    let targetSection = document.querySelector('#dashboard-content');
    
    if (!targetSection) {
        console.error('❌ dashboard-content not found!');
        alert('Error: Cannot find dashboard content area. Please refresh the page.');
        return;
    }
    
    console.log('✅ Found target section');
    console.log('Current innerHTML length:', targetSection.innerHTML.length);
    
    // Make absolutely sure it's visible
    targetSection.style.display = 'block';
    targetSection.style.visibility = 'visible';
    targetSection.classList.remove('hidden');
    
    // Clear it first
    targetSection.innerHTML = '<div class="p-8 text-center"><i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i><p class="mt-4 text-lg">Loading...</p></div>';
    
    console.log('Cleared section, now calling load function...');
    
    // Small delay to ensure clearing happens
    setTimeout(() => {
        try {
            switch(sectionType) {
                case 'spike-prediction':
                    console.log('📈 Executing loadSpikePrediction...');
                    if (typeof loadSpikePrediction !== 'function') {
                        console.error('❌ loadSpikePrediction is not a function!');
                        alert('Error: Spike Prediction module not loaded. Please refresh.');
                        return;
                    }
                    loadSpikePrediction(targetSection);
                    console.log('✅ loadSpikePrediction executed');
                    console.log('New innerHTML length:', targetSection.innerHTML.length);
                    break;
                    
                case 'risk-scoring':
                    console.log('⚠️ Executing loadRiskScoring...');
                    if (typeof loadRiskScoring !== 'function') {
                        console.error('❌ loadRiskScoring is not a function!');
                        alert('Error: Risk Scoring module not loaded. Please refresh.');
                        return;
                    }
                    loadRiskScoring(targetSection);
                    console.log('✅ loadRiskScoring executed');
                    break;
                    
                case 'resource-forecast':
                    console.log('📦 Executing loadResourceForecast...');
                    if (typeof loadResourceForecast !== 'function') {
                        console.error('❌ loadResourceForecast is not a function!');
                        alert('Error: Resource Forecast module not loaded. Please refresh.');
                        return;
                    }
                    loadResourceForecast(targetSection);
                    console.log('✅ loadResourceForecast executed');
                    break;
                    
                case 'trend-intelligence':
                    console.log('🔍 Executing loadTrendIntelligence...');
                    if (typeof loadTrendIntelligence !== 'function') {
                        console.error('❌ loadTrendIntelligence is not a function!');
                        alert('Error: Trend Intelligence module not loaded. Please refresh.');
                        return;
                    }
                    loadTrendIntelligence(targetSection);
                    console.log('✅ loadTrendIntelligence executed');
                    break;
                    
                default:
                    console.error('❌ Unknown section:', sectionType);
                    alert('Error: Unknown analytics section: ' + sectionType);
                    return;
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Log success
            console.log('🎉 Dashboard loaded successfully!');
            
        } catch (error) {
            console.error('❌ ERROR loading dashboard:', error);
            alert('Error loading analytics: ' + error.message);
        }
    }, 100);
};

console.log('✅ ANALYTICS FIX NOW Ready - Enhanced logging enabled');
