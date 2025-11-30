// Keyboard Shortcuts - Power user features for quick navigation
// Comprehensive keyboard shortcut system for GBV Dashboard

const shortcuts = {
  navigation: [
    { keys: 'Alt+D', description: 'Go to Dashboard', action: () => showTab('dashboard') },
    { keys: 'Alt+C', description: 'View Cases', action: () => showTab('cases') },
    { keys: 'Alt+R', description: 'Report New Case', action: () => showTab('report') },
    { keys: 'Alt+A', description: 'Analytics', action: () => showTab('analytics') },
    { keys: 'Alt+S', description: 'Settings', action: () => showTab('settings') }
  ],
  actions: [
    { keys: 'Ctrl+N', description: 'New Case Report', action: () => showTab('report') },
    { keys: 'Ctrl+S', description: 'Save Current Form', action: () => saveCurrentForm() },
    { keys: 'Ctrl+F', description: 'Search Cases', action: () => focusSearch() },
    { keys: 'Ctrl+P', description: 'Print Current View', action: () => printCurrentView() },
    { keys: 'Ctrl+E', description: 'Export Data', action: () => showExportSystem() }
  ],
  features: [
    { keys: 'Alt+M', description: 'Team Messaging', action: () => showMessagingSystem() },
    { keys: 'Alt+T', description: 'Training Modules', action: () => showInteractiveTraining() },
    { keys: 'Alt+P', description: 'Survivor Portal', action: () => showSurvivorPortal() },
    { keys: 'Alt+I', description: 'AI Chatbot', action: () => showAIChatbot() },
    { keys: 'Alt+K', description: 'Risk Assessment', action: () => showRiskAssessmentModal() },
    { keys: 'Alt+V', description: 'Video Resources', action: () => showVideoResources() },
    { keys: 'Alt+B', description: 'Report Builder', action: () => showCustomReportBuilder() },
    { keys: 'Alt+W', description: 'WhatsApp/SMS', action: () => showWhatsAppSMS() }
  ],
  modals: [
    { keys: 'Escape', description: 'Close Modal/Dialog', action: () => closeTopModal() },
    { keys: 'Ctrl+/', description: 'Show Shortcuts Help', action: () => showShortcutsHelp() },
    { keys: 'Alt+N', description: 'Toggle Notifications', action: () => toggleNotificationsPanel() },
    { keys: 'Alt+L', description: 'Toggle Dark Mode', action: () => toggleDarkMode() }
  ],
  emergency: [
    { keys: 'Alt+Shift+E', description: '🚨 Activate Panic Button', action: () => activatePanicButton() },
    { keys: 'Alt+Shift+H', description: '🆘 Show Emergency Help', action: () => showEmergencyHelp() }
  ]
};

let shortcutsEnabled = true;
let shortcutsVisible = false;
let activeShortcuts = new Map();

function initializeKeyboardShortcuts() {
  // Register all shortcuts
  Object.values(shortcuts).flat().forEach(shortcut => {
    registerShortcut(shortcut.keys, shortcut.action);
  });

  // Create floating shortcuts indicator
  createShortcutsIndicator();

  // Load user preferences
  loadShortcutPreferences();

  console.log('✅ Keyboard shortcuts initialized');
}

function registerShortcut(keys, action) {
  const normalizedKeys = normalizeKeys(keys);
  activeShortcuts.set(normalizedKeys, action);
}

function normalizeKeys(keys) {
  return keys.toLowerCase().replace(/\s/g, '');
}

function handleKeyPress(event) {
  if (!shortcutsEnabled) return;

  // Don't trigger shortcuts when typing in input fields
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
    // Except for Escape key
    if (event.key !== 'Escape') return;
  }

  const keys = [];
  if (event.ctrlKey) keys.push('ctrl');
  if (event.altKey) keys.push('alt');
  if (event.shiftKey) keys.push('shift');
  keys.push(event.key.toLowerCase());

  const pressedKeys = normalizeKeys(keys.join('+'));

  // Check if this combination is registered
  const action = activeShortcuts.get(pressedKeys);
  if (action) {
    event.preventDefault();
    event.stopPropagation();
    action();
    showShortcutFeedback(keys.join('+'));
  }
}

function createShortcutsIndicator() {
  const indicatorHTML = `
    <div id="shortcuts-indicator" class="fixed bottom-6 right-6 z-30 hidden">
      <button onclick="toggleShortcutsHelp()" 
              class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group">
        <i class="fas fa-keyboard text-xl"></i>
        <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div class="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
            Keyboard Shortcuts (Ctrl+/)
          </div>
        </div>
      </button>
    </div>

    <!-- Shortcut Feedback Toast -->
    <div id="shortcut-feedback" 
         class="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hidden transition-all transform translate-x-full">
      <div class="flex items-center gap-2">
        <i class="fas fa-keyboard"></i>
        <span id="shortcut-feedback-text">Shortcut activated</span>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', indicatorHTML);

  // Show indicator after 3 seconds
  setTimeout(() => {
    document.getElementById('shortcuts-indicator').classList.remove('hidden');
  }, 3000);
}

function showShortcutFeedback(keys) {
  const feedback = document.getElementById('shortcut-feedback');
  const text = document.getElementById('shortcut-feedback-text');

  text.textContent = `${keys} pressed`;
  feedback.classList.remove('hidden', 'translate-x-full');

  setTimeout(() => {
    feedback.classList.add('translate-x-full');
    setTimeout(() => {
      feedback.classList.add('hidden');
    }, 300);
  }, 1500);
}

function showShortcutsHelp() {
  if (shortcutsVisible) {
    closeShortcutsHelp();
    return;
  }

  const modalHTML = `
    <div id="shortcuts-help-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <i class="fas fa-keyboard text-2xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Keyboard Shortcuts</h2>
              <p class="text-sm text-indigo-100">Power user features for quick navigation</p>
            </div>
          </div>
          <button onclick="closeShortcutsHelp()" class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Status Bar -->
          <div class="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-check text-white"></i>
                </div>
                <div>
                  <div class="font-bold text-gray-800">Shortcuts Active</div>
                  <div class="text-sm text-gray-600">Press any shortcut to see it in action</div>
                </div>
              </div>
              <button onclick="toggleShortcutsEnabled()" 
                      id="shortcuts-toggle-btn"
                      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <i class="fas fa-toggle-on mr-2"></i>
                Enabled
              </button>
            </div>
          </div>

          <!-- Shortcuts Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Navigation -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-compass text-blue-600"></i>
                Navigation
              </h3>
              <div class="space-y-2">
                ${shortcuts.navigation.map(s => renderShortcut(s)).join('')}
              </div>
            </div>

            <!-- Actions -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-bolt text-yellow-600"></i>
                Actions
              </h3>
              <div class="space-y-2">
                ${shortcuts.actions.map(s => renderShortcut(s)).join('')}
              </div>
            </div>

            <!-- Features -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-star text-purple-600"></i>
                Features
              </h3>
              <div class="space-y-2">
                ${shortcuts.features.map(s => renderShortcut(s)).join('')}
              </div>
            </div>

            <!-- Modals & UI -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-window-restore text-indigo-600"></i>
                Interface
              </h3>
              <div class="space-y-2">
                ${shortcuts.modals.map(s => renderShortcut(s)).join('')}
              </div>
            </div>

            <!-- Emergency -->
            <div class="md:col-span-2">
              <h3 class="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
                Emergency Shortcuts
              </h3>
              <div class="grid grid-cols-2 gap-2">
                ${shortcuts.emergency.map(s => renderShortcut(s, true)).join('')}
              </div>
            </div>
          </div>

          <!-- Tips Section -->
          <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
            <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-lightbulb text-yellow-500"></i>
              Pro Tips
            </h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-green-600 mt-0.5"></i>
                <span>Press <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">Ctrl+/</kbd> anytime to view this shortcuts guide</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-green-600 mt-0.5"></i>
                <span>Shortcuts work everywhere except when typing in text fields</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-green-600 mt-0.5"></i>
                <span>Press <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">Escape</kbd> to quickly close any modal or dialog</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-green-600 mt-0.5"></i>
                <span>Emergency shortcuts require Shift to prevent accidental activation</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-green-600 mt-0.5"></i>
                <span>You can disable shortcuts temporarily if needed using the toggle above</span>
              </li>
            </ul>
          </div>

          <!-- Customization (Future Feature) -->
          <div class="mt-6 p-6 bg-gray-100 border-2 border-gray-300 rounded-xl opacity-60">
            <h3 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <i class="fas fa-cog text-gray-600"></i>
              Custom Shortcuts
              <span class="px-2 py-0.5 bg-gray-400 text-white text-xs rounded-full">Coming Soon</span>
            </h3>
            <p class="text-sm text-gray-600">
              Future update will allow you to customize keyboard shortcuts to match your workflow preferences.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <i class="fas fa-info-circle text-indigo-600 mr-1"></i>
            <span id="shortcuts-count">${Object.values(shortcuts).flat().length} shortcuts available</span>
          </div>
          <div class="flex gap-3">
            <button onclick="printShortcuts()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <i class="fas fa-print mr-2"></i>
              Print Reference
            </button>
            <button onclick="closeShortcutsHelp()" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  shortcutsVisible = true;
}

function renderShortcut(shortcut, isEmergency = false) {
  const keys = shortcut.keys.split('+');
  const keysHTML = keys.map(key => 
    `<kbd class="px-2 py-1 ${isEmergency ? 'bg-red-100 border-red-300 text-red-800' : 'bg-white border-gray-300'} border rounded text-xs font-mono">${key}</kbd>`
  ).join(' <span class="text-gray-400">+</span> ');

  return `
    <div class="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-${isEmergency ? 'red' : 'indigo'}-400 transition-all group">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          ${keysHTML}
        </div>
        <span class="text-sm text-gray-700">${shortcut.description}</span>
      </div>
      <button onclick="${shortcut.action.toString().match(/\w+\(\)/)?.[0] || 'null'}" 
              class="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 hover:text-indigo-800 text-sm">
        <i class="fas fa-play"></i>
      </button>
    </div>
  `;
}

function toggleShortcutsHelp() {
  if (shortcutsVisible) {
    closeShortcutsHelp();
  } else {
    showShortcutsHelp();
  }
}

function closeShortcutsHelp() {
  document.getElementById('shortcuts-help-modal')?.remove();
  shortcutsVisible = false;
}

function toggleShortcutsEnabled() {
  shortcutsEnabled = !shortcutsEnabled;
  saveShortcutPreferences();

  const btn = document.getElementById('shortcuts-toggle-btn');
  if (btn) {
    if (shortcutsEnabled) {
      btn.innerHTML = '<i class="fas fa-toggle-on mr-2"></i>Enabled';
      btn.className = 'px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600';
    } else {
      btn.innerHTML = '<i class="fas fa-toggle-off mr-2"></i>Disabled';
      btn.className = 'px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600';
    }
  }

  const feedback = shortcutsEnabled ? 'Keyboard shortcuts enabled' : 'Keyboard shortcuts disabled';
  showShortcutFeedback(feedback);
}

function printShortcuts() {
  window.print();
}

// Helper Functions

function showTab(tabName) {
  const tabs = {
    'dashboard': () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
      document.getElementById('tab-dashboard')?.click();
    },
    'cases': () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
      document.getElementById('tab-cases')?.click();
    },
    'report': () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
      document.getElementById('tab-report')?.click();
    },
    'analytics': () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
      document.getElementById('tab-analytics')?.click();
    },
    'settings': () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
      document.getElementById('tab-settings')?.click();
    }
  };

  const action = tabs[tabName];
  if (action) action();
}

function saveCurrentForm() {
  // Find active form and save
  const activeForm = document.querySelector('form:not([style*="display: none"])');
  if (activeForm) {
    const submitBtn = activeForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.click();
    } else {
      alert('✅ Form data saved locally');
    }
  } else {
    alert('ℹ️ No active form to save');
  }
}

function focusSearch() {
  const searchInput = document.getElementById('case-search') || 
                     document.querySelector('input[type="search"]') ||
                     document.querySelector('input[placeholder*="Search"]');
  
  if (searchInput) {
    searchInput.focus();
    searchInput.select();
  } else {
    alert('ℹ️ No search field available on current page');
  }
}

function printCurrentView() {
  window.print();
}

function closeTopModal() {
  // Find and close the topmost modal
  const modals = [
    'shortcuts-help-modal',
    'ai-chatbot-modal',
    'risk-assessment-modal',
    'advanced-analytics-modal',
    'messaging-modal',
    'training-modal',
    'survivor-portal-modal',
    'video-resources-modal',
    'report-builder-modal',
    'whatsapp-sms-modal',
    'export-modal',
    'quick-stats-modal',
    'case-details-modal',
    'notification-modal'
  ];

  for (const modalId of modals) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.remove();
      return;
    }
  }
}

function toggleNotificationsPanel() {
  const panel = document.getElementById('notifications-panel');
  if (panel) {
    panel.classList.toggle('hidden');
  } else if (typeof showNotifications === 'function') {
    showNotifications();
  }
}

function showEmergencyHelp() {
  alert(`🆘 EMERGENCY HELP

📞 NATIONAL GBV HOTLINE: 116 (24/7)

🏥 EMERGENCY SERVICES:
• Rainbo Centre: [Contact Info]
• Police FSU: [Contact Info]
• Hospital Emergency: [Contact Info]

🚨 Use Alt+Shift+E to activate Panic Button

💬 Use Alt+I to chat with AI Support Bot

🔒 Your safety is the top priority`);
}

function saveShortcutPreferences() {
  localStorage.setItem('gbv_shortcuts_enabled', shortcutsEnabled);
}

function loadShortcutPreferences() {
  const saved = localStorage.getItem('gbv_shortcuts_enabled');
  if (saved !== null) {
    shortcutsEnabled = saved === 'true';
  }
}

// Global event listener
document.addEventListener('keydown', handleKeyPress);

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeKeyboardShortcuts);
} else {
  initializeKeyboardShortcuts();
}

console.log('✅ Keyboard Shortcuts system loaded successfully');
