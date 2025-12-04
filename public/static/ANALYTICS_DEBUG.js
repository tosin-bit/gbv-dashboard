/**
 * ANALYTICS DEBUG - Find out why cards aren't working
 */

console.log('🔍 ANALYTICS DEBUG LOADED');

// Monitor when analytics dashboard loads
const originalLoadAnalytics = window.loadAnalyticsDashboard;
if (originalLoadAnalytics) {
    window.loadAnalyticsDashboard = function(section) {
        console.log('📊 Analytics Dashboard Loading...');
        console.log('Section element:', section);
        const result = originalLoadAnalytics(section);
        
        // Check if cards are rendered
        setTimeout(() => {
            const cards = document.querySelectorAll('[onclick*="showAnalyticsSection"]');
            console.log(`✅ Found ${cards.length} analytics cards with onclick handlers`);
            
            // Check if functions exist
            console.log('Functions available:');
            console.log('- loadSpikePrediction:', typeof loadSpikePrediction);
            console.log('- loadRiskScoring:', typeof loadRiskScoring);
            console.log('- loadResourceForecast:', typeof loadResourceForecast);
            console.log('- loadTrendIntelligence:', typeof loadTrendIntelligence);
            console.log('- showAnalyticsSection:', typeof showAnalyticsSection);
        }, 500);
        
        return result;
    };
}

// Monitor showAnalyticsSection calls
const originalShowAnalytics = window.showAnalyticsSection;
if (originalShowAnalytics) {
    window.showAnalyticsSection = function(sectionType) {
        console.log('🎯 showAnalyticsSection called with:', sectionType);
        console.log('Available functions:');
        console.log('- loadSpikePrediction:', typeof loadSpikePrediction);
        console.log('- loadRiskScoring:', typeof loadRiskScoring);
        console.log('- loadResourceForecast:', typeof loadResourceForecast);
        console.log('- loadTrendIntelligence:', typeof loadTrendIntelligence);
        
        return originalShowAnalytics(sectionType);
    };
}

// Also catch any clicks on analytics cards
document.addEventListener('click', function(e) {
    const card = e.target.closest('[onclick*="showAnalyticsSection"]');
    if (card) {
        console.log('🖱️ Analytics card clicked!');
        console.log('Card element:', card);
        console.log('onclick attribute:', card.getAttribute('onclick'));
    }
}, true);

console.log('✅ ANALYTICS DEBUG READY - Check console when clicking cards');
