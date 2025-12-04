/**
 * ANALYTICS BUTTONS - RESTORE ORIGINAL FUNCTIONALITY
 * Connects the 4 analytics buttons to the ORIGINAL detailed dashboard pages
 */

console.log('🔬 ANALYTICS BUTTONS - Restoring Original Dashboards...');

// ========================================
// Connect Buttons to Original Functions
// ========================================

window.showSpikePrediction = function() {
    console.log('📈 Loading Spike Prediction Dashboard...');
    const section = document.querySelector('#dashboard-content');
    if (section && typeof loadSpikePrediction === 'function') {
        loadSpikePrediction(section);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('❌ loadSpikePrediction function not found or section missing');
        alert('Loading Spike Prediction... Please wait for all scripts to load and try again.');
        // Retry after 2 seconds
        setTimeout(() => {
            if (typeof loadSpikePrediction === 'function') {
                const sec = document.querySelector('#dashboard-content');
                if (sec) loadSpikePrediction(sec);
            }
        }, 2000);
    }
};

window.showRiskScoring = function() {
    console.log('⚠️ Loading Risk Scoring Dashboard...');
    const section = document.querySelector('#dashboard-content');
    if (section && typeof loadRiskScoring === 'function') {
        loadRiskScoring(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('❌ loadRiskScoring function not found or section missing');
        alert('Loading Risk Scoring... Please wait for all scripts to load and try again.');
        setTimeout(() => {
            if (typeof loadRiskScoring === 'function') {
                const sec = document.querySelector('#dashboard-content');
                if (sec) loadRiskScoring(sec);
            }
        }, 2000);
    }
};

window.showResourceForecast = function() {
    console.log('📦 Loading Resource Forecast Dashboard...');
    const section = document.querySelector('#dashboard-content');
    if (section && typeof loadResourceForecast === 'function') {
        loadResourceForecast(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('❌ loadResourceForecast function not found or section missing');
        alert('Loading Resource Forecast... Please wait for all scripts to load and try again.');
        setTimeout(() => {
            if (typeof loadResourceForecast === 'function') {
                const sec = document.querySelector('#dashboard-content');
                if (sec) loadResourceForecast(sec);
            }
        }, 2000);
    }
};

window.showTrendIntelligence = function() {
    console.log('🔍 Loading Trend Intelligence Dashboard...');
    const section = document.querySelector('#dashboard-content');
    if (section && typeof loadTrendIntelligence === 'function') {
        loadTrendIntelligence(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('❌ loadTrendIntelligence function not found or section missing');
        alert('Loading Trend Intelligence... Please wait for all scripts to load and try again.');
        setTimeout(() => {
            if (typeof loadTrendIntelligence === 'function') {
                const sec = document.querySelector('#dashboard-content');
                if (sec) loadTrendIntelligence(sec);
            }
        }, 2000);
    }
};

// ========================================
// Event Delegation - Catch Button Clicks
// ========================================
document.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;
    
    const text = button.textContent.trim();
    
    if (text.includes('View Predictions') || text.includes('Spike Prediction')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Button clicked: Spike Prediction');
        showSpikePrediction();
    } else if (text.includes('Calculate Risk') || text.includes('Risk Scoring')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Button clicked: Risk Scoring');
        showRiskScoring();
    } else if (text.includes('View Forecast') || text.includes('Resource Forecast')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Button clicked: Resource Forecast');
        showResourceForecast();
    } else if (text.includes('Analyze Trends') || text.includes('Trend Intelligence')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Button clicked: Trend Intelligence');
        showTrendIntelligence();
    }
}, true); // Use capture phase

// ========================================
// Direct Connection (Backup)
// ========================================
function connectButtonsDirect() {
    console.log('🔌 Connecting analytics buttons...');
    
    const buttons = document.querySelectorAll('button');
    let connected = 0;
    
    buttons.forEach(button => {
        const text = button.textContent.trim();
        
        if (text.includes('View Predictions')) {
            button.onclick = (e) => {
                e.preventDefault();
                showSpikePrediction();
            };
            connected++;
            console.log('✅ Connected: View Predictions');
        } else if (text.includes('Calculate Risk')) {
            button.onclick = (e) => {
                e.preventDefault();
                showRiskScoring();
            };
            connected++;
            console.log('✅ Connected: Calculate Risk');
        } else if (text.includes('View Forecast')) {
            button.onclick = (e) => {
                e.preventDefault();
                showResourceForecast();
            };
            connected++;
            console.log('✅ Connected: View Forecast');
        } else if (text.includes('Analyze Trends')) {
            button.onclick = (e) => {
                e.preventDefault();
                showTrendIntelligence();
            };
            connected++;
            console.log('✅ Connected: Analyze Trends');
        }
    });
    
    console.log(`✅ Connected ${connected}/4 analytics buttons`);
    
    if (connected < 4) {
        console.log('⏳ Retrying in 2 seconds...');
        setTimeout(connectButtonsDirect, 2000);
    } else {
        console.log('🎉 All analytics buttons connected to ORIGINAL dashboards!');
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectButtonsDirect);
} else {
    connectButtonsDirect();
}

// Retry multiple times for dynamic content
setTimeout(connectButtonsDirect, 1000);
setTimeout(connectButtonsDirect, 3000);
setTimeout(connectButtonsDirect, 5000);

console.log('✅ ANALYTICS BUTTONS RESTORE - Ready (using ORIGINAL detailed dashboards)');
