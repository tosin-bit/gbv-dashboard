/**
 * PORTAL DEMO MODE - Demo credentials for portals
 * 
 * DEMO CREDENTIALS:
 * Rainbo Portal: username: demo / password: demo123
 * Police FSU: username: demo / password: demo123
 */

console.log('🔓 PORTAL DEMO MODE Loading...');

// Demo credentials
const DEMO_CREDENTIALS = {
    rainbo: { username: 'demo', password: 'demo123' },
    fsu: { username: 'demo', password: 'demo123' }
};

// Intercept fetch calls to /api/auth/login
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    // Check if it's a login request
    if (url.includes('/api/auth/login')) {
        console.log('🔓 Intercepting login request...');
        
        // Parse the request body
        try {
            const body = JSON.parse(options.body);
            const username = body.username;
            const password = body.password;
            
            console.log('Login attempt:', username);
            
            // Check demo credentials
            if ((username === DEMO_CREDENTIALS.rainbo.username && password === DEMO_CREDENTIALS.rainbo.password) ||
                (username === DEMO_CREDENTIALS.fsu.username && password === DEMO_CREDENTIALS.fsu.password)) {
                
                console.log('✅ Demo credentials accepted');
                
                // Return successful login response
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        success: true,
                        session_id: 'demo-session-' + Date.now(),
                        user: {
                            id: 'demo-' + username,
                            username: username,
                            name: 'Demo User',
                            role: username === 'demo' ? 'rainbo_staff' : 'fsu_officer',
                            center: 'Demo Center',
                            district: 'Demo District'
                        }
                    })
                });
            } else {
                console.log('❌ Invalid demo credentials');
                
                // Return error for wrong credentials
                return Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({
                        success: false,
                        error: 'Invalid credentials. Use demo/demo123 for demo access.'
                    })
                });
            }
            
        } catch (e) {
            console.error('Error parsing login request:', e);
        }
    }
    
    // For all other requests, use original fetch
    return originalFetch.apply(this, arguments);
};

// Add demo credentials hint to login forms
function addDemoHint() {
    // Wait a bit for forms to load
    setTimeout(() => {
        // Rainbo portal login form
        const rainboForm = document.querySelector('#rainbo-portal-section form');
        if (rainboForm && !rainboForm.querySelector('.demo-hint')) {
            const hint = document.createElement('div');
            hint.className = 'demo-hint bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded text-sm';
            hint.innerHTML = `
                <div class="flex items-start">
                    <i class="fas fa-info-circle text-blue-600 mt-0.5 mr-2"></i>
                    <div>
                        <strong class="text-blue-800">Demo Mode</strong>
                        <p class="text-blue-700 mt-1">Username: <code class="bg-blue-100 px-2 py-0.5 rounded">demo</code></p>
                        <p class="text-blue-700">Password: <code class="bg-blue-100 px-2 py-0.5 rounded">demo123</code></p>
                    </div>
                </div>
            `;
            rainboForm.insertBefore(hint, rainboForm.firstChild);
        }
        
        // FSU portal login form
        const fsuForm = document.querySelector('#police-fsu-section form');
        if (fsuForm && !fsuForm.querySelector('.demo-hint')) {
            const hint = document.createElement('div');
            hint.className = 'demo-hint bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded text-sm';
            hint.innerHTML = `
                <div class="flex items-start">
                    <i class="fas fa-info-circle text-blue-600 mt-0.5 mr-2"></i>
                    <div>
                        <strong class="text-blue-800">Demo Mode</strong>
                        <p class="text-blue-700 mt-1">Officer ID: <code class="bg-blue-100 px-2 py-0.5 rounded">demo</code></p>
                        <p class="text-blue-700">Password: <code class="bg-blue-100 px-2 py-0.5 rounded">demo123</code></p>
                    </div>
                </div>
            `;
            fsuForm.insertBefore(hint, fsuForm.firstChild);
        }
    }, 500);
}

// Run when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDemoHint);
} else {
    addDemoHint();
}

// Also run when switching tabs
document.addEventListener('click', function(e) {
    if (e.target.closest('.dashboard-tab')) {
        setTimeout(addDemoHint, 500);
    }
});

console.log('✅ PORTAL DEMO MODE Ready');
console.log('📝 Demo credentials: username=demo, password=demo123');
