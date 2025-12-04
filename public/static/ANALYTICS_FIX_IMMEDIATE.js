/**
 * ANALYTICS FIX IMMEDIATE - Load dashboards immediately without delay
 */

console.log('⚡ ANALYTICS FIX IMMEDIATE Loading...');

window.showAnalyticsSection = function(sectionType) {
    console.log(`🎯 showAnalyticsSection called: ${sectionType}`);
    
    // Get the analytics section
    const targetSection = document.getElementById('analytics-section');
    
    if (!targetSection) {
        console.error('❌ analytics-section NOT FOUND');
        alert('Error: Analytics section not found. Please refresh.');
        return;
    }
    
    console.log('✅ Found analytics-section');
    
    // Check if the load functions exist
    console.log('Checking functions:');
    console.log('- loadSpikePrediction:', typeof window.loadSpikePrediction);
    console.log('- loadRiskScoring:', typeof window.loadRiskScoring);
    console.log('- loadResourceForecast:', typeof window.loadResourceForecast);
    console.log('- loadTrendIntelligence:', typeof window.loadTrendIntelligence);
    
    // Call the function immediately - NO DELAY
    try {
        switch(sectionType) {
            case 'spike-prediction':
                if (typeof window.loadSpikePrediction !== 'function') {
                    console.error('❌ loadSpikePrediction is not available!');
                    targetSection.innerHTML = '<div class="p-8"><h2 class="text-2xl text-red-600">Error: Spike Prediction module not loaded</h2><p class="mt-4">Please refresh the page.</p></div>';
                    return;
                }
                console.log('📈 Calling loadSpikePrediction NOW...');
                window.loadSpikePrediction(targetSection);
                console.log('✅ loadSpikePrediction completed');
                break;
                
            case 'risk-scoring':
                if (typeof window.loadRiskScoring !== 'function') {
                    console.error('❌ loadRiskScoring is not available!');
                    targetSection.innerHTML = '<div class="p-8"><h2 class="text-2xl text-red-600">Error: Risk Scoring module not loaded</h2><p class="mt-4">Please refresh the page.</p></div>';
                    return;
                }
                console.log('⚠️ Calling loadRiskScoring NOW...');
                window.loadRiskScoring(targetSection);
                console.log('✅ loadRiskScoring completed');
                break;
                
            case 'resource-forecast':
                if (typeof window.loadResourceForecast !== 'function') {
                    console.error('❌ loadResourceForecast is not available!');
                    targetSection.innerHTML = '<div class="p-8"><h2 class="text-2xl text-red-600">Error: Resource Forecast module not loaded</h2><p class="mt-4">Please refresh the page.</p></div>';
                    return;
                }
                console.log('📦 Calling loadResourceForecast NOW...');
                window.loadResourceForecast(targetSection);
                console.log('✅ loadResourceForecast completed');
                break;
                
            case 'trend-intelligence':
                if (typeof window.loadTrendIntelligence !== 'function') {
                    console.error('❌ loadTrendIntelligence is not available!');
                    targetSection.innerHTML = '<div class="p-8"><h2 class="text-2xl text-red-600">Error: Trend Intelligence module not loaded</h2><p class="mt-4">Please refresh the page.</p></div>';
                    return;
                }
                console.log('🔍 Calling loadTrendIntelligence NOW...');
                window.loadTrendIntelligence(targetSection);
                console.log('✅ loadTrendIntelligence completed');
                break;
                
            default:
                console.error('❌ Unknown section type:', sectionType);
                targetSection.innerHTML = '<div class="p-8"><h2 class="text-2xl text-red-600">Error: Unknown section</h2></div>';
                return;
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('🎉 Dashboard should now be visible!');
        
    } catch (error) {
        console.error('❌ ERROR:', error);
        targetSection.innerHTML = `<div class="p-8"><h2 class="text-2xl text-red-600">Error loading dashboard</h2><p class="mt-4">${error.message}</p></div>`;
    }
};

console.log('✅ ANALYTICS FIX IMMEDIATE Ready');
