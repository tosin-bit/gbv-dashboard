/**
 * ANALYTICS FIX WORKING - Direct content replacement
 */

console.log('🚀 ANALYTICS FIX WORKING Loading...');

// Override showAnalyticsSection with working version
window.showAnalyticsSection = function(sectionType) {
    console.log(`🎯 Loading ${sectionType} NOW...`);
    
    // Find the analytics content container (where the cards are shown)
    let targetSection = document.querySelector('#dashboard-content');
    
    // If we're on analytics tab, the content is inside dashboard-content
    if (!targetSection) {
        console.error('❌ No dashboard-content found');
        return;
    }
    
    console.log('✅ Target section found:', targetSection);
    
    // Call the load function directly and let IT handle the HTML replacement
    switch(sectionType) {
        case 'spike-prediction':
            console.log('📈 Calling loadSpikePrediction NOW...');
            loadSpikePrediction(targetSection);
            console.log('✅ loadSpikePrediction called');
            break;
            
        case 'risk-scoring':
            console.log('⚠️ Calling loadRiskScoring NOW...');
            loadRiskScoring(targetSection);
            console.log('✅ loadRiskScoring called');
            break;
            
        case 'resource-forecast':
            console.log('📦 Calling loadResourceForecast NOW...');
            loadResourceForecast(targetSection);
            console.log('✅ loadResourceForecast called');
            break;
            
        case 'trend-intelligence':
            console.log('🔍 Calling loadTrendIntelligence NOW...');
            loadTrendIntelligence(targetSection);
            console.log('✅ loadTrendIntelligence called');
            break;
    }
    
    // Scroll to top to see the new content
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

console.log('✅ ANALYTICS FIX WORKING Ready');
