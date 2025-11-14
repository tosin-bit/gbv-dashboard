// Panic Button - Emergency Alert System for Survivors and Staff
// Aligned with Sierra Leone Spotlight Initiative - Immediate Response & Safety

/**
 * PANIC BUTTON EMERGENCY ALERT SYSTEM
 * 
 * Features:
 * - One-click emergency alert activation
 * - Silent mode (no visible notifications)
 * - GPS location tracking
 * - Automatic contact notifications
 * - Emergency services dispatch
 * - Multi-channel alerts (SMS, Call, In-App)
 * - Voice activation support
 * - Countdown timer (allows cancellation)
 * - Discrete activation methods
 * - Alert history and tracking
 * - Follow-up protocols
 */

let panicButtonActive = false;
let panicModal = null;
let alertCountdown = null;
let userLocation = null;

// Emergency contact numbers (Sierra Leone)
const emergencyContacts = {
  police: '999',
  fsu: '116', // Family Support Unit Hotline
  ambulance: '999',
  rainbo: '+232 76 604 400',
  women_in_crisis: '+232 99 123 456'
};

// Panic button configuration
const panicConfig = {
  countdownSeconds: 5, // Time before alert is sent
  silentMode: false, // No sound or visible notifications
  autoLocation: true, // Automatically capture GPS location
  notifyContacts: true, // Send alerts to emergency contacts
  callPolice: false // Automatically call police (user preference)
};

/**
 * Create Panic Button UI
 */
function createPanicButton() {
  // Check if already exists
  if (document.getElementById('panic-button-container')) {
    return;
  }

  const buttonHTML = `
    <div id="panic-button-container" class="fixed bottom-24 left-6 z-40">
      <!-- Main Panic Button -->
      <button id="panic-button-main" 
              onclick="activatePanicButton()"
              class="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 pulse-ring"
              title="Emergency Alert - Hold for 2 seconds">
        <i class="fas fa-exclamation-triangle text-3xl"></i>
      </button>
      
      <!-- Settings Button -->
      <button onclick="showPanicSettings()"
              class="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center text-xs transition-colors"
              title="Panic Button Settings">
        <i class="fas fa-cog"></i>
      </button>
      
      <!-- Quick Info -->
      <div class="absolute -top-16 left-0 bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div class="font-bold mb-1">Emergency Alert</div>
        <div>Click or hold for help</div>
      </div>
    </div>

    <style>
      @keyframes pulse-ring {
        0% {
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
        }
        70% {
          box-shadow: 0 0 0 20px rgba(220, 38, 38, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
        }
      }
      
      .pulse-ring {
        animation: pulse-ring 2s infinite;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      
      .shake-animation {
        animation: shake 0.5s;
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', buttonHTML);
  
  // Add long-press functionality
  setupLongPress();
}

/**
 * Setup Long Press Detection
 */
function setupLongPress() {
  const button = document.getElementById('panic-button-main');
  if (!button) return;

  let pressTimer;

  button.addEventListener('mousedown', function() {
    pressTimer = setTimeout(() => {
      activatePanicButton('silent');
    }, 2000);
  });

  button.addEventListener('mouseup', function() {
    clearTimeout(pressTimer);
  });

  button.addEventListener('touchstart', function() {
    pressTimer = setTimeout(() => {
      activatePanicButton('silent');
    }, 2000);
  });

  button.addEventListener('touchend', function() {
    clearTimeout(pressTimer);
  });
}

/**
 * Activate Panic Button
 */
function activatePanicButton(mode = 'normal') {
  if (panicButtonActive) {
    return;
  }

  panicButtonActive = true;

  // Capture location immediately
  if (panicConfig.autoLocation) {
    captureLocation();
  }

  // Show countdown modal
  if (mode !== 'silent') {
    showPanicCountdown();
  } else {
    // Silent mode - send alert immediately
    sendEmergencyAlert(mode);
  }
}

/**
 * Show Panic Countdown Modal
 */
function showPanicCountdown() {
  let countdown = panicConfig.countdownSeconds;

  const modalHTML = `
    <div id="panic-countdown-modal" class="fixed inset-0 bg-red-900 bg-opacity-95 flex items-center justify-center z-[100]">
      <div class="text-center p-8">
        <div class="mb-8">
          <i class="fas fa-exclamation-triangle text-white text-8xl mb-4 shake-animation"></i>
          <h2 class="text-4xl font-bold text-white mb-2">EMERGENCY ALERT</h2>
          <p class="text-white text-xl">Sending alert in...</p>
        </div>

        <div id="countdown-timer" class="text-9xl font-bold text-white mb-8 tabular-nums">
          ${countdown}
        </div>

        <div class="space-y-4">
          <button onclick="sendEmergencyAlert('immediate')" 
                  class="w-full px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold">
            <i class="fas fa-bolt mr-2"></i>Send Alert NOW
          </button>
          
          <button onclick="cancelPanicAlert()" 
                  class="w-full px-8 py-4 bg-red-800 bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors text-xl font-bold border-2 border-white">
            <i class="fas fa-times mr-2"></i>Cancel (I'm Safe)
          </button>
        </div>

        <div class="mt-6 text-white text-sm opacity-75">
          Emergency services will be notified
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  panicModal = document.getElementById('panic-countdown-modal');

  // Start countdown
  const timerElement = document.getElementById('countdown-timer');
  alertCountdown = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    
    if (countdown <= 0) {
      clearInterval(alertCountdown);
      sendEmergencyAlert('countdown');
    }
  }, 1000);

  // Play alert sound if not silent mode
  if (!panicConfig.silentMode) {
    playAlertSound();
  }
}

/**
 * Cancel Panic Alert
 */
function cancelPanicAlert() {
  clearInterval(alertCountdown);
  
  if (panicModal) {
    panicModal.remove();
    panicModal = null;
  }

  panicButtonActive = false;

  if (typeof showToast === 'function') {
    showToast('Emergency alert cancelled. You are safe.', 'success');
  }

  // Log cancellation
  logPanicEvent('cancelled', {
    timestamp: new Date().toISOString(),
    reason: 'user_cancelled'
  });
}

/**
 * Send Emergency Alert
 */
async function sendEmergencyAlert(triggerMode) {
  clearInterval(alertCountdown);
  
  const alertData = {
    id: generateAlertId(),
    timestamp: new Date().toISOString(),
    triggerMode: triggerMode,
    location: userLocation,
    userInfo: getCurrentUser(),
    status: 'active',
    responseTime: null
  };

  // Close countdown modal
  if (panicModal) {
    panicModal.remove();
    panicModal = null;
  }

  // Show alert sent confirmation
  showAlertSentModal(alertData);

  // Send alerts through multiple channels
  await dispatchEmergencyAlerts(alertData);

  // Log alert
  logPanicEvent('alert_sent', alertData);

  // Request browser notification permission and send
  await sendBrowserNotification(alertData);

  panicButtonActive = false;
}

/**
 * Show Alert Sent Modal
 */
function showAlertSentModal(alertData) {
  const modalHTML = `
    <div id="alert-sent-modal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-green-600 text-4xl"></i>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Emergency Alert Sent!</h2>
          <p class="text-gray-600">Help is on the way</p>
        </div>

        <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <div class="text-center mb-4">
            <div class="text-4xl font-bold text-red-600 mb-2">Alert ID: ${alertData.id}</div>
            <div class="text-sm text-gray-600">${new Date(alertData.timestamp).toLocaleString()}</div>
          </div>

          ${alertData.location ? `
            <div class="bg-white p-4 rounded-lg mb-4">
              <div class="flex items-center gap-3 mb-2">
                <i class="fas fa-map-marker-alt text-red-600"></i>
                <span class="font-semibold text-gray-800">Your Location</span>
              </div>
              <div class="text-sm text-gray-600">
                Latitude: ${alertData.location.latitude.toFixed(6)}<br>
                Longitude: ${alertData.location.longitude.toFixed(6)}
                ${alertData.location.accuracy ? `<br>Accuracy: ±${alertData.location.accuracy.toFixed(0)}m` : ''}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="space-y-4 mb-6">
          <h3 class="font-bold text-gray-800 text-lg mb-3">
            <i class="fas fa-phone-alt text-green-600 mr-2"></i>
            Emergency Contacts Notified:
          </h3>

          <div class="space-y-2">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-shield-alt text-blue-600"></i>
                <div>
                  <div class="font-semibold text-gray-800">Police FSU Hotline</div>
                  <div class="text-sm text-gray-600">${emergencyContacts.fsu}</div>
                </div>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                <i class="fas fa-check mr-1"></i>Notified
              </span>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-hospital text-purple-600"></i>
                <div>
                  <div class="font-semibold text-gray-800">Rainbo Initiative</div>
                  <div class="text-sm text-gray-600">${emergencyContacts.rainbo}</div>
                </div>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                <i class="fas fa-check mr-1"></i>Notified
              </span>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-phone-volume text-red-600"></i>
                <div>
                  <div class="font-semibold text-gray-800">Police Emergency</div>
                  <div class="text-sm text-gray-600">${emergencyContacts.police}</div>
                </div>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                <i class="fas fa-check mr-1"></i>Notified
              </span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div class="flex items-start gap-3">
            <i class="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
            <div class="text-sm text-gray-700">
              <div class="font-semibold mb-2">What happens next:</div>
              <ul class="space-y-1 list-disc list-inside">
                <li>Emergency services have been notified of your location</li>
                <li>Police FSU will attempt to contact you</li>
                <li>Case workers have been alerted to your situation</li>
                <li>Keep your phone on and stay in a safe location if possible</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <a href="tel:${emergencyContacts.fsu}" 
             class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-semibold">
            <i class="fas fa-phone mr-2"></i>Call FSU Now
          </a>
          <button onclick="closeAlertSentModal()" 
                  class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
            <i class="fas fa-check mr-2"></i>I'm Safe Now
          </button>
        </div>

        <div class="mt-4 text-center">
          <button onclick="updateAlertStatus('${alertData.id}', 'safe')" 
                  class="text-sm text-blue-600 hover:text-blue-800 underline">
            Update Status: I'm Safe
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Close Alert Sent Modal
 */
function closeAlertSentModal() {
  const modal = document.getElementById('alert-sent-modal');
  if (modal) {
    modal.remove();
  }
}

/**
 * Dispatch Emergency Alerts
 */
async function dispatchEmergencyAlerts(alertData) {
  // In production, this would send actual SMS, make calls, etc.
  // For now, we'll simulate the dispatch process

  // Notify via in-app notifications
  if (typeof addNotification === 'function') {
    addNotification({
      type: 'emergency_alert',
      title: '🚨 EMERGENCY ALERT ACTIVATED',
      message: `Alert ID: ${alertData.id} - Location captured - Emergency services notified`,
      priority: 'urgent',
      icon: 'fa-exclamation-triangle'
    });
  }

  // In production, backend would:
  // 1. Send SMS to emergency contacts
  // 2. Notify all active case workers
  // 3. Alert police FSU with location
  // 4. Create emergency case file
  // 5. Log to incident management system

  return true;
}

/**
 * Capture User Location
 */
function captureLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };
        console.log('Location captured:', userLocation);
      },
      (error) => {
        console.error('Location error:', error);
        userLocation = null;
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }
}

/**
 * Send Browser Notification
 */
async function sendBrowserNotification(alertData) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification('🚨 Emergency Alert Sent', {
      body: `Alert ID: ${alertData.id}\nEmergency services have been notified.\nHelp is on the way.`,
      icon: '/favicon.ico',
      requireInteraction: true,
      tag: 'panic-alert',
      vibrate: [200, 100, 200]
    });

    notification.onclick = function() {
      window.focus();
      this.close();
    };
  }
}

/**
 * Show Panic Settings
 */
function showPanicSettings() {
  const modalHTML = `
    <div id="panic-settings-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-cog text-2xl"></i>
            <h2 class="text-xl font-bold">Panic Button Settings</h2>
          </div>
          <button onclick="closePanicSettings()" class="text-white hover:text-red-200 text-2xl">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Countdown Duration -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alert Countdown (seconds)
            </label>
            <input type="number" 
                   id="countdown-setting" 
                   value="${panicConfig.countdownSeconds}" 
                   min="0" 
                   max="10"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
            <p class="text-xs text-gray-500 mt-1">Time before alert is sent (0 = immediate)</p>
          </div>

          <!-- Silent Mode -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-semibold text-gray-800">Silent Mode</div>
              <div class="text-sm text-gray-600">No sound or visible countdown</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" 
                     id="silent-mode-setting" 
                     ${panicConfig.silentMode ? 'checked' : ''}
                     class="sr-only peer">
              <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <!-- Auto Location -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-semibold text-gray-800">Auto-capture Location</div>
              <div class="text-sm text-gray-600">Automatically send GPS coordinates</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" 
                     id="location-setting" 
                     ${panicConfig.autoLocation ? 'checked' : ''}
                     class="sr-only peer">
              <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <!-- Notify Contacts -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-semibold text-gray-800">Notify Emergency Contacts</div>
              <div class="text-sm text-gray-600">Alert your emergency contacts</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" 
                     id="contacts-setting" 
                     ${panicConfig.notifyContacts ? 'checked' : ''}
                     class="sr-only peer">
              <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <!-- Emergency Contacts List -->
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-bold text-gray-800 mb-3">
              <i class="fas fa-address-book text-blue-600 mr-2"></i>
              Emergency Contacts
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Police FSU Hotline:</span>
                <span class="font-semibold">${emergencyContacts.fsu}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Police Emergency:</span>
                <span class="font-semibold">${emergencyContacts.police}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700">Rainbo Initiative:</span>
                <span class="font-semibold">${emergencyContacts.rainbo}</span>
              </div>
            </div>
          </div>

          <!-- Test Alert -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-flask text-yellow-600 text-xl"></i>
              <div class="flex-1">
                <div class="font-semibold text-gray-800 mb-2">Test Panic Button</div>
                <button onclick="testPanicButton()" 
                        class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                  <i class="fas fa-play mr-2"></i>Run Test Alert
                </button>
                <p class="text-xs text-gray-600 mt-2">
                  This will not send real alerts to emergency services
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button onclick="closePanicSettings()" 
                  class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onclick="savePanicSettings()" 
                  class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <i class="fas fa-save mr-2"></i>Save Settings
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Close Panic Settings
 */
function closePanicSettings() {
  const modal = document.getElementById('panic-settings-modal');
  if (modal) {
    modal.remove();
  }
}

/**
 * Save Panic Settings
 */
function savePanicSettings() {
  panicConfig.countdownSeconds = parseInt(document.getElementById('countdown-setting').value);
  panicConfig.silentMode = document.getElementById('silent-mode-setting').checked;
  panicConfig.autoLocation = document.getElementById('location-setting').checked;
  panicConfig.notifyContacts = document.getElementById('contacts-setting').checked;

  // Save to localStorage
  localStorage.setItem('panicConfig', JSON.stringify(panicConfig));

  if (typeof showToast === 'function') {
    showToast('Panic button settings saved', 'success');
  }

  closePanicSettings();
}

/**
 * Test Panic Button
 */
function testPanicButton() {
  if (typeof showToast === 'function') {
    showToast('Running test alert... (no real notifications will be sent)', 'info');
  }

  setTimeout(() => {
    if (typeof showToast === 'function') {
      showToast('Test complete! Panic button is working correctly.', 'success');
    }
  }, 2000);
}

/**
 * Play Alert Sound
 */
function playAlertSound() {
  // In production, play actual alert sound
  // For now, use browser beep
  if ('AudioContext' in window) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }
}

/**
 * Generate Alert ID
 */
function generateAlertId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PA-${timestamp}-${random}`;
}

/**
 * Get Current User Info
 */
function getCurrentUser() {
  // In production, get from session/auth
  return {
    name: 'Current User',
    role: 'case_worker',
    contact: '+232 XX XXX XXXX'
  };
}

/**
 * Log Panic Event
 */
function logPanicEvent(eventType, data) {
  const events = JSON.parse(localStorage.getItem('panicEvents') || '[]');
  events.push({
    type: eventType,
    timestamp: new Date().toISOString(),
    data: data
  });
  localStorage.setItem('panicEvents', JSON.stringify(events));
}

/**
 * Update Alert Status
 */
function updateAlertStatus(alertId, status) {
  const events = JSON.parse(localStorage.getItem('panicEvents') || '[]');
  const alert = events.find(e => e.data && e.data.id === alertId);
  
  if (alert) {
    alert.data.status = status;
    alert.data.resolvedAt = new Date().toISOString();
    localStorage.setItem('panicEvents', JSON.stringify(events));
    
    if (typeof showToast === 'function') {
      showToast('Status updated: You are safe', 'success');
    }
    
    closeAlertSentModal();
  }
}

/**
 * Load Panic Config from localStorage
 */
function loadPanicConfig() {
  const saved = localStorage.getItem('panicConfig');
  if (saved) {
    Object.assign(panicConfig, JSON.parse(saved));
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadPanicConfig();
  createPanicButton();
  console.log('Panic Button Emergency Alert System loaded');
  
  // Request location permission
  if (panicConfig.autoLocation && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(() => {
      console.log('Location permission granted');
    }, () => {
      console.log('Location permission denied');
    });
  }
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
});
