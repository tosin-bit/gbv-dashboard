// ANALYTICS NAVIGATION FIX - Fix "Back to Analytics Dashboard" button
console.log('🔙 ANALYTICS NAVIGATION FIX Loading...');

// Function to return to analytics dashboard
window.returnToAnalyticsDashboard = function() {
    console.log('🔙 Returning to Analytics Dashboard...');
    
    // Find analytics section
    const analyticsSection = document.getElementById('analytics-section');
    if (!analyticsSection) {
        console.error('❌ Analytics section not found');
        return;
    }
    
    // Load analytics dashboard
    if (typeof loadAnalyticsDashboard === 'function') {
        console.log('✅ Loading Analytics Dashboard...');
        loadAnalyticsDashboard(analyticsSection);
    } else {
        console.error('❌ loadAnalyticsDashboard function not found');
    }
};

// Also provide a shortcut
window.backToAnalytics = window.returnToAnalyticsDashboard;

console.log('✅ Analytics Navigation Fix initialized');
console.log('✅ Use: returnToAnalyticsDashboard() or backToAnalytics()');
