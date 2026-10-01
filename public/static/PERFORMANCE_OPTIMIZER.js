/**
 * PERFORMANCE OPTIMIZER
 * 
 * Implements smart script loading to reduce initial page load time
 * - Tracks which scripts are already loaded
 * - Loads scripts on-demand when tabs are opened
 * - Prevents duplicate loading
 */

// Track loaded scripts to prevent duplicates
window.loadedScripts = window.loadedScripts || new Set();

/**
 * Load a script dynamically and cache the result
 */
window.loadScriptOnce = function(src, callback) {
    // If already loaded, call callback immediately
    if (window.loadedScripts.has(src)) {
        console.log(`✅ Script already loaded: ${src}`);
        if (callback) callback();
        return Promise.resolve();
    }

    console.log(`⏳ Loading script: ${src}`);
    
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        script.onload = () => {
            window.loadedScripts.add(src);
            console.log(`✅ Loaded: ${src}`);
            if (callback) callback();
            resolve();
        };
        
        script.onerror = () => {
            console.error(`❌ Failed to load: ${src}`);
            reject(new Error(`Failed to load script: ${src}`));
        };
        
        document.head.appendChild(script);
    });
};

/**
 * Load multiple scripts in sequence
 */
window.loadScriptsSequentially = function(scripts, callback) {
    let promise = Promise.resolve();
    
    scripts.forEach(src => {
        promise = promise.then(() => window.loadScriptOnce(src));
    });
    
    promise.then(() => {
        if (callback) callback();
    }).catch(error => {
        console.error('❌ Script loading error:', error);
    });
};

/**
 * Load scripts required for Analytics Dashboard
 */
window.loadAnalyticsScripts = function(callback) {
    const scripts = [
        '/static/chart-lazy-loader.js',
        '/static/analytics-dashboard.js',
        '/static/spike-prediction.js',
        '/static/risk-scoring.js',
        '/static/resource-forecast.js',
        '/static/trend-intelligence.js',
        '/static/ANALYTICS_FIX_IMMEDIATE.js',
        '/static/ANALYTICS_NAVIGATION_FIX.js'
    ];
    
    console.log('📊 Loading Analytics scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for Report Case
 */
window.loadReportCaseScripts = function(callback) {
    const scripts = [
        '/static/report-case-form.js',
        '/static/unified-case-system.js'
    ];
    
    console.log('📝 Loading Report Case scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for View Cases
 */
window.loadViewCasesScripts = function(callback) {
    const scripts = [
        '/static/view-cases.js',
        '/static/case-notes.js'
    ];
    
    console.log('👁️ Loading View Cases scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for Partner View
 */
window.loadPartnerViewScripts = function(callback) {
    const scripts = [
        '/static/spotlight-initiative.js',
        '/static/district-map.js'
    ];
    
    console.log('🤝 Loading Partner View scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for Survivor Portal
 */
window.loadSurvivorPortalScripts = function(callback) {
    const scripts = [
        '/static/survivor-portal.js',
        '/static/emergency-sos.js'
    ];
    
    console.log('🏥 Loading Survivor Portal scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for Voice Report
 */
window.loadVoiceReportScripts = function(callback) {
    const scripts = [
        '/static/voice-recording.js',
        '/static/VOICE_REPORT_FIX.js'
    ];
    
    console.log('🎤 Loading Voice Report scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load scripts required for Export System
 */
window.loadExportScripts = function(callback) {
    const scripts = [
        '/static/export-system.js'
    ];
    
    console.log('📤 Loading Export scripts on-demand...');
    window.loadScriptsSequentially(scripts, callback);
};

/**
 * Load portal-specific scripts
 */
window.loadPortalScripts = function(portalType, callback) {
    let scripts = ['/static/portal-systems.js'];
    
    if (portalType === 'rainbo') {
        scripts.push('/static/rainbo-dashboard-enhanced.js');
    } else if (portalType === 'fsu') {
        scripts.push('/static/police-dashboard-enhanced.js');
    }
    
    console.log(`🏛️ Loading ${portalType} portal scripts on-demand...`);
    window.loadScriptsSequentially(scripts, callback);
};

console.log('⚡ Performance Optimizer initialized - Scripts will load on-demand');
