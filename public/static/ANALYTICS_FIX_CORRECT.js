/**
 * ANALYTICS FIX CORRECT - Use the RIGHT section ID
 */

console.log('🎯 ANALYTICS FIX CORRECT Loading...');

window.showAnalyticsSection = function(sectionType) {
    console.log(`🚀 Loading ${sectionType}...`);
    
    // CORRECT: Analytics content goes into #analytics-section, NOT #dashboard-content
    let targetSection = document.getElementById('analytics-section');
    
    if (!targetSection) {
        console.error('❌ analytics-section not found!');
        alert('Error: Analytics section not found. Please refresh the page.');
        return;
    }
    
    console.log('✅ Found analytics-section');
    
    // Make sure it's visible
    targetSection.classList.remove('hidden');
    targetSection.style.display = 'block';
    
    // Show loading
    targetSection.innerHTML = '<div class="flex items-center justify-center py-20"><i class="fas fa-spinner fa-spin text-5xl text-blue-600"></i><p class="ml-4 text-xl">Loading analytics...</p></div>';
    
    // Load after brief delay
    setTimeout(() => {
        switch(sectionType) {
            case 'spike-prediction':
                console.log('📈 Loading Spike Prediction...');
                loadSpikePrediction(targetSection);
                break;
                
            case 'risk-scoring':
                console.log('⚠️ Loading Risk Scoring...');
                loadRiskScoring(targetSection);
                break;
                
            case 'resource-forecast':
                console.log('📦 Loading Resource Forecast...');
                loadResourceForecast(targetSection);
                break;
                
            case 'trend-intelligence':
                console.log('🔍 Loading Trend Intelligence...');
                loadTrendIntelligence(targetSection);
                break;
        }
        
        console.log('✅ Dashboard loaded into analytics-section!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
};

console.log('✅ ANALYTICS FIX CORRECT Ready - Using #analytics-section');
