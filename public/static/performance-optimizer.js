/**
 * Performance Optimizer - Load scripts only when needed
 * Prevents loading 50+ scripts at once
 */

class PerformanceOptimizer {
    constructor() {
        this.loadedScripts = new Set();
        this.loading = new Map();
        console.log('⚡ Performance Optimizer initialized');
    }
    
    /**
     * Load script on demand
     */
    async loadScript(scriptPath) {
        // Already loaded
        if (this.loadedScripts.has(scriptPath)) {
            return Promise.resolve();
        }
        
        // Currently loading
        if (this.loading.has(scriptPath)) {
            return this.loading.get(scriptPath);
        }
        
        // Start loading
        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;
            
            script.onload = () => {
                this.loadedScripts.add(scriptPath);
                this.loading.delete(scriptPath);
                console.log(`✅ Loaded: ${scriptPath}`);
                resolve();
            };
            
            script.onerror = () => {
                this.loading.delete(scriptPath);
                console.error(`❌ Failed to load: ${scriptPath}`);
                reject(new Error(`Failed to load ${scriptPath}`));
            };
            
            document.head.appendChild(script);
        });
        
        this.loading.set(scriptPath, promise);
        return promise;
    }
    
    /**
     * Load multiple scripts in sequence
     */
    async loadScripts(scriptPaths) {
        for (const path of scriptPaths) {
            await this.loadScript(path);
        }
    }
    
    /**
     * Preload critical scripts
     */
    preloadCritical() {
        const critical = [
            '/static/chart-lazy-loader.js',
            '/static/final-fixes.js',
            '/static/chart-integration.js'
        ];
        
        this.loadScripts(critical).then(() => {
            console.log('✅ Critical scripts loaded');
        });
    }
}

// Create global instance
window.performanceOptimizer = new PerformanceOptimizer();

// Preload critical scripts
window.performanceOptimizer.preloadCritical();

// Reduce console logs in production
if (location.hostname !== 'localhost' && !location.hostname.includes('sandbox')) {
    const originalLog = console.log;
    console.log = function(...args) {
        // Only log errors and warnings
        if (args[0] && (args[0].includes('❌') || args[0].includes('⚠️'))) {
            originalLog.apply(console, args);
        }
    };
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Trigger resize complete event
        window.dispatchEvent(new Event('resizeComplete'));
    }, 250);
});

// Optimize scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Trigger optimized scroll event
            window.dispatchEvent(new Event('optimizedScroll'));
            ticking = false;
        });
        ticking = true;
    }
});

console.log('✅ Performance Optimizer Ready');
