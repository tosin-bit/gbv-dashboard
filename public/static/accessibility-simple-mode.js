// Accessibility Simple Mode
// Ultra-simplified interface for low-literacy users with large icons and minimal text

let simpleModeEnabled = false;

const simpleModeConfig = {
  mainActions: [
    {
      id: 'report_picture',
      icon: '📸',
      emoji: '👆',
      color: 'red',
      size: 'large',
      label_en: 'REPORT with PICTURES',
      label_krio: 'REPORT wit PICTURES',
      description_en: 'Click pictures to report',
      description_krio: 'Click pictures fɔ report',
      action: () => showPictureBasedReport()
    },
    {
      id: 'call_help',
      icon: '📞',
      emoji: '🆘',
      color: 'green',
      size: 'large',
      label_en: 'CALL for HELP',
      label_krio: 'CALL fɔ HELP',
      description_en: 'Talk to someone now',
      description_krio: 'Tok to somebody now',
      action: () => initiateCall()
    },
    {
      id: 'speak_report',
      icon: '🎤',
      emoji: '🗣️',
      color: 'blue',
      size: 'large',
      label_en: 'SPEAK your Story',
      label_krio: 'TOK yu Story',
      description_en: 'Tell us with your voice',
      description_krio: 'Tel wi wit yu voice',
      action: () => startVoiceReport()
    },
    {
      id: 'watch_videos',
      icon: '▶️',
      emoji: '📺',
      color: 'purple',
      size: 'large',
      label_en: 'WATCH Videos',
      label_krio: 'WATCH Videos',
      description_en: 'Learn about your rights',
      description_krio: 'Learn about yu rights',
      action: () => showVideoResources()
    },
    {
      id: 'find_help',
      icon: '🏥',
      emoji: '📍',
      color: 'orange',
      size: 'large',
      label_en: 'FIND Help Near You',
      label_krio: 'FIND Help Near Yu',
      description_en: 'Hospitals, police, support',
      description_krio: 'Hospitals, police, support',
      action: () => showNearbyServices()
    },
    {
      id: 'chat_help',
      icon: '💬',
      emoji: '🤖',
      color: 'indigo',
      size: 'large',
      label_en: 'CHAT for Help',
      label_krio: 'CHAT fɔ Help',
      description_en: 'Get answers anytime',
      description_krio: 'Get answers anytime',
      action: () => showAIChatbot()
    }
  ]
};

function toggleSimpleMode() {
  simpleModeEnabled = !simpleModeEnabled;
  
  if (simpleModeEnabled) {
    showSimpleMode();
  } else {
    hideSimpleMode();
  }
  
  saveSimpleModePreference();
}

function showSimpleMode() {
  // Hide complex interface elements
  hideComplexElements();
  
  // Show simple mode interface
  const simpleHTML = `
    <div id="simple-mode-interface" class="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 z-[100] overflow-y-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-xl">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl">
              🛡️
            </div>
            <div>
              <h1 class="text-4xl font-bold">GBV HELP</h1>
              <p class="text-xl text-indigo-100">
                ${currentLanguage === 'en' ? 'We are here to help you' : 'Wi de ya fɔ help yu'}
              </p>
            </div>
          </div>
          <button onclick="toggleSimpleMode()" 
                  class="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 shadow-lg">
            <i class="fas fa-times mr-2"></i>
            CLOSE
          </button>
        </div>
      </div>
      
      <!-- Emergency Banner -->
      <div class="bg-red-600 text-white p-6 text-center animate-pulse">
        <h2 class="text-4xl font-bold mb-3">
          <i class="fas fa-phone-alt mr-3"></i>
          EMERGENCY: CALL 116
        </h2>
        <p class="text-2xl">
          ${currentLanguage === 'en' ? 'For immediate help - 24/7 Free' : 'Fɔ immediate help - 24/7 Free'}
        </p>
        <button onclick="initiateCall()" 
                class="mt-4 px-12 py-4 bg-white text-red-600 rounded-full font-bold text-3xl hover:bg-red-50 shadow-2xl transform hover:scale-105">
          <i class="fas fa-phone-alt mr-3"></i>
          CALL NOW
        </button>
      </div>
      
      <!-- Main Actions Grid -->
      <div class="max-w-7xl mx-auto p-8">
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-8">
          ${currentLanguage === 'en' ? 'What do you need?' : 'Wetin yu nid?'}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${simpleModeConfig.mainActions.map(action => `
            <button onclick="${action.action.name}()" 
                    class="p-8 bg-white border-4 border-${action.color}-300 rounded-3xl hover:border-${action.color}-500 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95">
              <div class="text-center">
                <div class="text-9xl mb-4">${action.icon}</div>
                <div class="text-7xl mb-4">${action.emoji}</div>
                <h3 class="text-3xl font-bold text-gray-800 mb-4">
                  ${action['label_' + currentLanguage]}
                </h3>
                <p class="text-xl text-gray-600">
                  ${action['description_' + currentLanguage]}
                </p>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
      
      <!-- Bottom Help Bar -->
      <div class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 shadow-xl">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-6">
            <button onclick="speakInstructions()" 
                    class="px-6 py-4 bg-white text-green-600 rounded-full font-bold text-xl hover:bg-green-50 shadow-lg">
              <i class="fas fa-volume-up mr-2"></i>
              ${currentLanguage === 'en' ? 'HEAR HELP' : 'HEAR HELP'}
            </button>
            <button onclick="toggleLanguage()" 
                    class="px-6 py-4 bg-white text-green-600 rounded-full font-bold text-xl hover:bg-green-50 shadow-lg">
              <i class="fas fa-language mr-2"></i>
              ${currentLanguage === 'en' ? 'KRIO' : 'ENGLISH'}
            </button>
          </div>
          <div class="text-2xl font-bold">
            ${currentLanguage === 'en' ? 'All help is FREE and PRIVATE' : 'All help na FREE en PRIVATE'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', simpleHTML);
  
  // Auto-speak welcome
  if (typeof speakText === 'function') {
    setTimeout(() => {
      const welcomeText = currentLanguage === 'en' ?
        'Welcome. This is simple mode. Choose what you need. Everything is free and private. For emergency, call one one six.' :
        'Welcome. Dis na simple mode. Choose wetin yu nid. Ɔltin na free en private. Fɔ emergency, call wan wan siks.';
      speakText(welcomeText);
    }, 500);
  }
}

function hideSimpleMode() {
  document.getElementById('simple-mode-interface')?.remove();
  showComplexElements();
}

function hideComplexElements() {
  // Hide navigation tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.style.display = 'none');
  
  // Hide complex menus
  const menus = document.querySelectorAll('.quick-actions, .sidebar, .complex-menu');
  menus.forEach(menu => menu.style.display = 'none');
}

function showComplexElements() {
  // Show navigation tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.style.display = '');
  
  // Show complex menus
  const menus = document.querySelectorAll('.quick-actions, .sidebar, .complex-menu');
  menus.forEach(menu => menu.style.display = '');
}

function initiateCall() {
  const confirmText = currentLanguage === 'en' ?
    'Call 116 for Emergency GBV Support?\n\n✅ Free\n✅ 24/7 Available\n✅ Confidential\n\nAvailable in: English, Krio, Mende, Temne' :
    'Call 116 fɔ Emergency GBV Support?\n\n✅ Free\n✅ 24/7 Available\n✅ Confidential\n\nAvailable in: English, Krio, Mende, Temne';
  
  if (confirm(confirmText)) {
    // In production, this would initiate the call
    window.location.href = 'tel:116';
  }
}

function startVoiceReport() {
  if (typeof speakText === 'function') {
    speakText(currentLanguage === 'en' ?
      'Starting voice report. Press the microphone button and speak. Tell us what happened in your own words.' :
      'Starting voice report. Press di microphone button en tok. Tel wi wetin happen na yu own words.'
    );
  }
  
  // Show voice recording interface
  setTimeout(() => {
    if (typeof startRecording === 'function') {
      startRecording();
    } else {
      alert(currentLanguage === 'en' ?
        'Voice recording feature will be enabled soon. For now, please use Picture Report or Call for Help.' :
        'Voice recording feature go dɛ enable sun. For now, please use Picture Report ɔ Call fɔ Help.'
      );
    }
  }, 1000);
}

function showNearbyServices() {
  if (typeof speakText === 'function') {
    speakText(currentLanguage === 'en' ?
      'Finding help near you. This will show hospitals, police stations, and support centers in your area.' :
      'Finding help near yu. Dis go show hospitals, police stations, en support centers na yu area.'
    );
  }
  
  // Show map with nearby services
  setTimeout(() => {
    alert(`📍 ${currentLanguage === 'en' ? 'NEARBY SERVICES' : 'SERVICES NEAR YU'}\n\n` +
      `🏥 Rainbo Centre\n📞 [Contact]\n📍 [Address]\n\n` +
      `👮 Police FSU\n📞 [Contact]\n📍 [Address]\n\n` +
      `${currentLanguage === 'en' ? 'All services are FREE and CONFIDENTIAL' : 'All services na FREE en CONFIDENTIAL'}`
    );
  }, 500);
}

function saveSimpleModePreference() {
  localStorage.setItem('gbv_simple_mode', simpleModeEnabled);
}

function loadSimpleModePreference() {
  const saved = localStorage.getItem('gbv_simple_mode');
  if (saved === 'true') {
    simpleModeEnabled = true;
    showSimpleMode();
  }
}

// Create Simple Mode toggle button in main interface
function createSimpleModeToggle() {
  const toggleHTML = `
    <button id="simple-mode-toggle-btn" 
            onclick="toggleSimpleMode()"
            class="fixed bottom-24 left-6 z-40 px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold text-lg flex items-center gap-3 animate-bounce">
      <i class="fas fa-hand-pointer text-2xl"></i>
      <div class="text-left">
        <div class="text-sm">Simple Mode</div>
        <div class="text-xs opacity-90">Easy to Use</div>
      </div>
    </button>
  `;
  
  document.body.insertAdjacentHTML('beforeend', toggleHTML);
  
  // Stop animation after 5 seconds
  setTimeout(() => {
    const btn = document.getElementById('simple-mode-toggle-btn');
    if (btn) {
      btn.classList.remove('animate-bounce');
    }
  }, 5000);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createSimpleModeToggle();
    loadSimpleModePreference();
  });
} else {
  createSimpleModeToggle();
  loadSimpleModePreference();
}

console.log('✅ Accessibility Simple Mode loaded successfully');
