// CHART FIX - Force immediate chart rendering on all pages
console.log('🎨 CHART FIX Loading...');

// Wait for Chart.js to be loaded
function waitForChart(callback) {
    if (typeof Chart !== 'undefined') {
        callback();
    } else {
        setTimeout(() => waitForChart(callback), 100);
    }
}

waitForChart(() => {
    console.log('✅ Chart.js detected, applying fixes...');
    
    // Override Chart.js defaults for immediate rendering
    Chart.defaults.animation = {
        duration: 0  // No animation delays
    };
    
    // Force chart rendering after tab switches
    const originalLoadSection = window.loadSection;
    if (originalLoadSection) {
        window.loadSection = function(sectionName) {
            originalLoadSection(sectionName);
            
            // After section loads, force chart rendering
            setTimeout(() => {
                const canvases = document.querySelectorAll('canvas');
                console.log(`🎨 Found ${canvases.length} canvas elements in ${sectionName}`);
                
                canvases.forEach((canvas, idx) => {
                    if (canvas && canvas.id) {
                        console.log(`🎨 Rendering chart: ${canvas.id}`);
                        
                        // Get the canvas context
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            // Check if chart needs to be created
                            const existingChart = Chart.getChart(canvas);
                            if (!existingChart) {
                                console.log(`⚠️ Chart not found for ${canvas.id}, triggering creation...`);
                                
                                // Trigger chart creation based on canvas ID
                                if (canvas.id === 'monthlyTrendsChart' && typeof loadMonthlyTrends === 'function') {
                                    loadMonthlyTrends();
                                } else if (canvas.id === 'ageDistributionChart' && typeof loadAgeDistribution === 'function') {
                                    loadAgeDistribution();
                                } else if (canvas.id === 'violenceTypesChart' && typeof loadViolenceTypes === 'function') {
                                    loadViolenceTypes();
                                }
                            } else {
                                console.log(`✅ Chart exists for ${canvas.id}, forcing update...`);
                                existingChart.update('none'); // Update without animation
                            }
                        }
                    }
                });
            }, 100);
        };
    }
    
    // Force chart rendering on Overview tab
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🎨 Checking for Overview charts...');
            
            // Monthly Trends Chart
            if (typeof loadMonthlyTrends === 'function') {
                console.log('🎨 Forcing Monthly Trends chart...');
                loadMonthlyTrends();
            }
            
            // Age Distribution Chart
            if (typeof loadAgeDistribution === 'function') {
                console.log('🎨 Forcing Age Distribution chart...');
                loadAgeDistribution();
            }
            
            // Check every 2 seconds for missing charts
            const chartCheckInterval = setInterval(() => {
                const canvases = document.querySelectorAll('canvas');
                canvases.forEach(canvas => {
                    if (canvas && canvas.id) {
                        const chart = Chart.getChart(canvas);
                        if (!chart) {
                            console.log(`⚠️ Chart still missing for ${canvas.id}, retrying...`);
                            
                            if (canvas.id === 'monthlyTrendsChart' && typeof loadMonthlyTrends === 'function') {
                                loadMonthlyTrends();
                            } else if (canvas.id === 'ageDistributionChart' && typeof loadAgeDistribution === 'function') {
                                loadAgeDistribution();
                            }
                        }
                    }
                });
            }, 2000);
            
            // Stop checking after 30 seconds
            setTimeout(() => clearInterval(chartCheckInterval), 30000);
            
        }, 1000);
    });
    
    console.log('✅ Chart Fix initialized - charts will render immediately');
});
