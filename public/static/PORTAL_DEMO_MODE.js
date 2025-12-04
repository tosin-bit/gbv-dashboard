/**
 * PORTAL DEMO MODE - Bypass login for portals on production
 * These portals will work in view-only/demo mode without backend authentication
 */

console.log('🔓 PORTAL DEMO MODE Loading...');

// Override login handlers to bypass authentication
window.addEventListener('DOMContentLoaded', function() {
    
    // Override Rainbo login
    const originalRainboLogin = window.handleRainboLogin;
    window.handleRainboLogin = async function(event) {
        event.preventDefault();
        console.log('🔓 Rainbo login bypassed - Demo mode');
        
        // Create demo session
        const demoUser = {
            id: 'demo-rainbo',
            name: 'Demo Rainbo Staff',
            role: 'rainbo_staff',
            center: 'Demo Center'
        };
        
        localStorage.setItem('gbv_session_id', 'demo-session-' + Date.now());
        localStorage.setItem('gbv_user_data', JSON.stringify(demoUser));
        
        // Show success message
        alert('✅ Demo Mode\n\nYou are viewing the Rainbo Portal in demo mode.\nThis is a demonstration version with sample data.');
        
        // Load Rainbo dashboard content in the current section
        const rainboSection = document.getElementById('rainbo-portal-section');
        if (rainboSection && typeof loadRainboDashboard === 'function') {
            loadRainboDashboard(rainboSection);
        }
    };
    
    // Override FSU login
    const originalFSULogin = window.handleFSULogin;
    window.handleFSULogin = async function(event) {
        event.preventDefault();
        console.log('🔓 FSU login bypassed - Demo mode');
        
        // Create demo session
        const demoUser = {
            id: 'demo-fsu',
            name: 'Demo FSU Officer',
            role: 'fsu_officer',
            district: 'Demo District'
        };
        
        localStorage.setItem('gbv_session_id', 'demo-session-' + Date.now());
        localStorage.setItem('gbv_user_data', JSON.stringify(demoUser));
        
        // Show success message
        alert('✅ Demo Mode\n\nYou are viewing the Police FSU Portal in demo mode.\nThis is a demonstration version with sample data.');
        
        // Load FSU dashboard content in the current section
        const fsuSection = document.getElementById('police-fsu-section');
        if (fsuSection && typeof loadFSUDashboard === 'function') {
            loadFSUDashboard(fsuSection);
        }
    };
    
});

console.log('✅ PORTAL DEMO MODE Ready - Logins will bypass authentication');
