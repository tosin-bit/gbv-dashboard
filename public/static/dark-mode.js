/**
 * GBV Dashboard - Dark Mode
 * Auto-switching dark mode for better UX and reduced eye strain
 */

// Dark mode state
let darkModeEnabled = false;
let autoSwitchEnabled = true;

// Initialize dark mode
function initDarkMode() {
    // Load saved preference
    const saved = localStorage.getItem('gbv_dark_mode');
    const autoSwitch = localStorage.getItem('gbv_auto_switch');
    
    if (saved !== null) {
        darkModeEnabled = saved === 'true';
    } else {
        // Auto-detect system preference
        darkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    if (autoSwitch !== null) {
        autoSwitchEnabled = autoSwitch === 'true';
    }
    
    // Apply dark mode if enabled
    if (darkModeEnabled) {
        enableDarkMode();
    }
    
    // Create dark mode toggle button
    createDarkModeToggle();
    
    // Setup auto-switch if enabled
    if (autoSwitchEnabled) {
        setupAutoSwitch();
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (autoSwitchEnabled) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
}

// Create dark mode toggle button
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.className = 'fixed top-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center border border-gray-200 dark:border-gray-700';
    toggle.innerHTML = `
        <i class="fas fa-${darkModeEnabled ? 'sun' : 'moon'} text-xl text-gray-700 dark:text-gray-300"></i>
    `;
    toggle.onclick = toggleDarkMode;
    toggle.title = 'Toggle Dark Mode';
    
    document.body.appendChild(toggle);
}

// Toggle dark mode
function toggleDarkMode() {
    if (darkModeEnabled) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
    
    // Update toggle button icon
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.innerHTML = `<i class="fas fa-${darkModeEnabled ? 'sun' : 'moon'} text-xl text-gray-700 dark:text-gray-300"></i>`;
    }
    
    // Save preference
    localStorage.setItem('gbv_dark_mode', darkModeEnabled.toString());
    
    // Show notification
    showDarkModeNotification(darkModeEnabled ? 'Dark mode enabled' : 'Light mode enabled');
}

// Enable dark mode
function enableDarkMode() {
    darkModeEnabled = true;
    document.documentElement.classList.add('dark');
    
    // Add dark mode styles if not already added
    if (!document.getElementById('dark-mode-styles')) {
        addDarkModeStyles();
    }
}

// Disable dark mode
function disableDarkMode() {
    darkModeEnabled = false;
    document.documentElement.classList.remove('dark');
}

// Add dark mode CSS
function addDarkModeStyles() {
    const style = document.createElement('style');
    style.id = 'dark-mode-styles';
    style.textContent = `
        /* Dark mode color variables */
        :root.dark {
            color-scheme: dark;
        }
        
        /* Background colors */
        .dark body {
            background-color: #111827;
            color: #f3f4f6;
        }
        
        .dark .bg-white {
            background-color: #1f2937 !important;
            color: #f3f4f6 !important;
        }
        
        .dark .bg-gray-50 {
            background-color: #111827 !important;
        }
        
        .dark .bg-gray-100 {
            background-color: #374151 !important;
        }
        
        .dark .bg-gray-200 {
            background-color: #4b5563 !important;
        }
        
        /* Text colors */
        .dark .text-gray-600 {
            color: #d1d5db !important;
        }
        
        .dark .text-gray-700 {
            color: #e5e7eb !important;
        }
        
        .dark .text-gray-800 {
            color: #f3f4f6 !important;
        }
        
        .dark .text-gray-900 {
            color: #f9fafb !important;
        }
        
        /* Borders */
        .dark .border-gray-200 {
            border-color: #374151 !important;
        }
        
        .dark .border-gray-300 {
            border-color: #4b5563 !important;
        }
        
        /* Cards and panels */
        .dark .shadow-sm,
        .dark .shadow-md,
        .dark .shadow-lg {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Inputs */
        .dark input,
        .dark textarea,
        .dark select {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }
        
        .dark input::placeholder,
        .dark textarea::placeholder {
            color: #9ca3af !important;
        }
        
        .dark input:focus,
        .dark textarea:focus,
        .dark select:focus {
            background-color: #4b5563 !important;
        }
        
        /* Buttons that should stay branded */
        .dark button[style*="background-color: #1e3a8a"],
        .dark button[style*="background-color: #32cd32"],
        .dark button[style*="background-color: #1e90ff"] {
            /* Keep original colors for branded buttons */
        }
        
        /* Tables */
        .dark table {
            color: #f3f4f6 !important;
        }
        
        .dark thead {
            background-color: #374151 !important;
        }
        
        .dark tbody tr:hover {
            background-color: #374151 !important;
        }
        
        .dark td,
        .dark th {
            border-color: #4b5563 !important;
        }
        
        /* Charts remain visible */
        .dark canvas {
            filter: invert(0.9) hue-rotate(180deg);
        }
        
        /* Preserve colors for status badges */
        .dark .bg-green-100,
        .dark .bg-yellow-100,
        .dark .bg-red-100,
        .dark .bg-blue-100 {
            filter: brightness(0.8);
        }
        
        /* Modal backgrounds */
        .dark #case-details-modal,
        .dark #case-notes-modal,
        .dark #resource-modal,
        .dark #chatbot-window {
            background-color: #1f2937 !important;
        }
        
        /* Smooth transition */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Preserve gradient headers */
        .dark .bg-gradient-to-r {
            /* Keep gradients as-is */
        }
    `;
    
    document.head.appendChild(style);
}

// Setup auto-switch based on time
function setupAutoSwitch() {
    // Check every hour
    setInterval(checkTimeAndSwitch, 3600000);
    checkTimeAndSwitch();
}

// Check time and switch mode
function checkTimeAndSwitch() {
    if (!autoSwitchEnabled) return;
    
    const hour = new Date().getHours();
    
    // Auto dark mode between 6 PM and 7 AM
    if (hour >= 18 || hour < 7) {
        if (!darkModeEnabled) {
            enableDarkMode();
            updateDarkModeToggle();
        }
    } else {
        if (darkModeEnabled) {
            disableDarkMode();
            updateDarkModeToggle();
        }
    }
}

// Update toggle button
function updateDarkModeToggle() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.innerHTML = `<i class="fas fa-${darkModeEnabled ? 'sun' : 'moon'} text-xl text-gray-700 dark:text-gray-300"></i>`;
    }
}

// Show notification
function showDarkModeNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${darkModeEnabled ? 'moon' : 'sun'} text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Export functions
window.toggleDarkMode = toggleDarkMode;
window.enableDarkMode = enableDarkMode;
window.disableDarkMode = disableDarkMode;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}

// Add animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-down {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-slide-down {
        animation: slide-down 0.3s ease-out;
    }
`;
document.head.appendChild(style);
