/**
 * Chart Integration - Ensures all charts work with lazy loader
 * Automatically registers all Chart.js canvases with the lazy loading system
 */

class ChartIntegration {
    constructor() {
        this.registeredCharts = new Set();
        this.observer = null;
        console.log('📊 Chart Integration System initialized');
    }
    
    /**
     * Auto-discover and register all chart canvases
     */
    autoRegisterCharts() {
        console.log('🔍 Auto-discovering charts...');
        
        // Find all canvas elements
        const canvases = document.querySelectorAll('canvas');
        console.log(`Found ${canvases.length} canvas elements`);
        
        canvases.forEach(canvas => {
            if (!canvas.id) {
                console.warn('⚠️ Canvas without ID found, skipping');
                return;
            }
            
            if (this.registeredCharts.has(canvas.id)) {
                return; // Already registered
            }
            
            // Register with lazy loader
            this.registerChartCanvas(canvas);
        });
        
        // Watch for dynamically added canvases
        this.watchForNewCanvases();
    }
    
    /**
     * Register a single canvas with lazy loader
     */
    registerChartCanvas(canvas) {
        const chartId = canvas.id;
        
        // Create init function if it doesn't exist
        const initFunction = () => {
            console.log(`📊 Initializing chart: ${chartId}`);
            
            // Check if there's a specific init function
            const specificInit = window[`init${this.capitalize(chartId)}`];
            if (typeof specificInit === 'function') {
                specificInit();
                return;
            }
            
            // Check if chart data is available
            const chartData = window[`${chartId}Data`] || window[chartId + '_data'];
            if (chartData) {
                this.createGenericChart(canvas, chartData);
                return;
            }
            
            // Create sample chart if no data
            this.createSampleChart(canvas, chartId);
        };
        
        // Register with lazy loader
        if (window.chartLazyLoader) {
            window.chartLazyLoader.registerChart(chartId, initFunction);
            this.registeredCharts.add(chartId);
            console.log(`✅ Registered: ${chartId}`);
        }
    }
    
    /**
     * Watch for dynamically added canvases
     */
    watchForNewCanvases() {
        if (!window.MutationObserver) return;
        
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'CANVAS' && node.id && !this.registeredCharts.has(node.id)) {
                        console.log(`🆕 New canvas detected: ${node.id}`);
                        this.registerChartCanvas(node);
                    }
                    
                    // Check children
                    if (node.querySelectorAll) {
                        node.querySelectorAll('canvas').forEach(canvas => {
                            if (canvas.id && !this.registeredCharts.has(canvas.id)) {
                                console.log(`🆕 New canvas in children: ${canvas.id}`);
                                this.registerChartCanvas(canvas);
                            }
                        });
                    }
                });
            });
        });
        
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('👀 Watching for new canvases...');
    }
    
    /**
     * Create a generic chart from data
     */
    createGenericChart(canvas, data) {
        if (!window.Chart) {
            console.error('❌ Chart.js not loaded');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        new Chart(ctx, data);
    }
    
    /**
     * Create sample chart for testing
     */
    createSampleChart(canvas, chartId) {
        if (!window.Chart) {
            console.error('❌ Chart.js not loaded');
            return;
        }
        
        console.log(`📊 Creating sample chart for: ${chartId}`);
        
        const ctx = canvas.getContext('2d');
        const chartType = this.guessChartType(chartId);
        
        new Chart(ctx, {
            type: chartType,
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: chartId.replace(/([A-Z])/g, ' $1').trim(),
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sample Data - Loading...'
                    },
                    legend: {
                        display: true
                    }
                },
                scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
                    y: {
                        beginAtZero: true
                    }
                } : undefined
            }
        });
    }
    
    /**
     * Guess chart type from ID
     */
    guessChartType(chartId) {
        const id = chartId.toLowerCase();
        
        if (id.includes('pie')) return 'pie';
        if (id.includes('doughnut')) return 'doughnut';
        if (id.includes('bar')) return 'bar';
        if (id.includes('radar')) return 'radar';
        if (id.includes('polar')) return 'polarArea';
        if (id.includes('line') || id.includes('trend') || id.includes('forecast')) return 'line';
        
        return 'bar'; // Default
    }
    
    /**
     * Capitalize first letter
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Force reload all charts
     */
    reloadAllCharts() {
        console.log('🔄 Reloading all charts...');
        
        this.registeredCharts.forEach(chartId => {
            const canvas = document.getElementById(chartId);
            if (canvas && canvas.dataset.chartLoaded) {
                delete canvas.dataset.chartLoaded;
                console.log(`↻ Reloading: ${chartId}`);
            }
        });
        
        // Re-register
        this.autoRegisterCharts();
    }
}

// Create global instance
window.chartIntegration = new ChartIntegration();

// Auto-register on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.chartIntegration.autoRegisterCharts();
        }, 1500); // Wait for other scripts
    });
} else {
    setTimeout(() => {
        window.chartIntegration.autoRegisterCharts();
    }, 1500);
}

// Export for manual use
window.reloadAllCharts = () => window.chartIntegration.reloadAllCharts();

console.log('✅ Chart Integration System Ready');
