/**
 * Chart Lazy Loader - Performance Optimization
 * Only initializes charts when they become visible on screen
 * Prevents "page unresponsive" warnings from loading all charts at once
 */

class ChartLazyLoader {
    constructor() {
        this.observers = new Map();
        this.chartQueue = [];
        this.isProcessing = false;
        this.maxConcurrentCharts = 2; // Only load 2 charts at a time
        
        console.log('📊 Chart Lazy Loader initialized');
    }
    
    /**
     * Register a chart for lazy loading
     * @param {string} chartId - Canvas element ID
     * @param {Function} initFunction - Function that creates the chart
     * @param {Object} options - Additional options
     */
    registerChart(chartId, initFunction, options = {}) {
        const canvas = document.getElementById(chartId);
        if (!canvas) {
            console.warn(`⚠️ Chart canvas not found: ${chartId}`);
            return;
        }
        
        // Create intersection observer for this chart
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !canvas.dataset.chartLoaded) {
                    this.queueChart(chartId, initFunction, canvas);
                }
            });
        }, {
            root: null,
            rootMargin: '100px', // Start loading 100px before visible
            threshold: 0.1
        });
        
        observer.observe(canvas);
        this.observers.set(chartId, observer);
        
        console.log(`✅ Chart registered for lazy loading: ${chartId}`);
    }
    
    /**
     * Add chart to loading queue
     */
    queueChart(chartId, initFunction, canvas) {
        this.chartQueue.push({ chartId, initFunction, canvas });
        
        if (!this.isProcessing) {
            this.processQueue();
        }
    }
    
    /**
     * Process chart loading queue with rate limiting
     */
    async processQueue() {
        if (this.chartQueue.length === 0) {
            this.isProcessing = false;
            return;
        }
        
        this.isProcessing = true;
        const batch = this.chartQueue.splice(0, this.maxConcurrentCharts);
        
        // Load charts in parallel (but limited batch)
        await Promise.all(batch.map(item => this.loadChart(item)));
        
        // Wait a bit before loading next batch
        setTimeout(() => this.processQueue(), 300);
    }
    
    /**
     * Load a single chart
     */
    async loadChart({ chartId, initFunction, canvas }) {
        try {
            console.log(`🔄 Loading chart: ${chartId}`);
            
            // Show loading indicator
            const parent = canvas.parentElement;
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'chart-loading';
            loadingDiv.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                    <p class="mt-2 text-sm text-gray-600">Loading chart...</p>
                </div>
            `;
            parent.insertBefore(loadingDiv, canvas);
            canvas.style.display = 'none';
            
            // Use requestAnimationFrame to prevent blocking
            await new Promise(resolve => {
                requestAnimationFrame(() => {
                    try {
                        initFunction();
                        canvas.dataset.chartLoaded = 'true';
                        console.log(`✅ Chart loaded: ${chartId}`);
                    } catch (error) {
                        console.error(`❌ Error loading chart ${chartId}:`, error);
                        this.showChartError(canvas, chartId);
                    }
                    resolve();
                });
            });
            
            // Remove loading indicator
            if (loadingDiv.parentElement) {
                loadingDiv.remove();
            }
            canvas.style.display = 'block';
            
        } catch (error) {
            console.error(`❌ Failed to load chart ${chartId}:`, error);
            this.showChartError(canvas, chartId);
        }
    }
    
    /**
     * Show error message for failed charts
     */
    showChartError(canvas, chartId) {
        const parent = canvas.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'chart-error';
        errorDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <i class="fas fa-exclamation-triangle text-red-600 text-xl mb-2"></i>
                <p class="text-sm text-red-800">Unable to load chart</p>
                <button onclick="chartLazyLoader.retryChart('${chartId}')" 
                    class="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Retry
                </button>
            </div>
        `;
        parent.appendChild(errorDiv);
        canvas.style.display = 'none';
    }
    
    /**
     * Retry loading a failed chart
     */
    retryChart(chartId) {
        const canvas = document.getElementById(chartId);
        if (canvas) {
            delete canvas.dataset.chartLoaded;
            const errorDiv = canvas.parentElement.querySelector('.chart-error');
            if (errorDiv) errorDiv.remove();
            canvas.style.display = 'block';
        }
    }
    
    /**
     * Destroy all observers (cleanup)
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.chartQueue = [];
        console.log('🧹 Chart Lazy Loader cleaned up');
    }
}

// Create global instance
window.chartLazyLoader = new ChartLazyLoader();

// Helper function for easy chart registration
window.lazyLoadChart = (chartId, initFunction, options) => {
    window.chartLazyLoader.registerChart(chartId, initFunction, options);
};

// Debounce helper for expensive operations
window.debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle helper for scroll/resize events
window.throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

console.log('✅ Chart Performance Utilities Loaded');
