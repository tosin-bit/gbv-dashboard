// Accessibility Voice Navigation System
// Text-to-Speech navigation and content reading for low-literacy users

let voiceEnabled = false;
let currentLanguage = 'en'; // 'en' or 'krio'
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let autoReadEnabled = true;
let readSpeed = 0.9; // Slower for better comprehension

const translations = {
  en: {
    // Main Navigation
    dashboard: 'Dashboard - View all statistics',
    cases: 'Cases - View and manage cases',
    report: 'Report Case - File a new report',
    analytics: 'Analytics - View data and trends',
    settings: 'Settings - Configure your preferences',
    
    // Actions
    click_to_speak: 'Click to hear this read aloud',
    voice_on: 'Voice navigation is now ON. All buttons and text will be read to you.',
    voice_off: 'Voice navigation is now OFF.',
    language_english: 'Language changed to English',
    language_krio: 'Language changed to Krio',
    
    // Instructions
    welcome: 'Welcome to the GBV Support Dashboard. You can report cases, get help, and access services. Press the speaker button anytime to hear instructions.',
    emergency: 'Emergency Help. Call one one six for immediate assistance. Available twenty four hours, seven days a week.',
    how_to_report: 'To report a case: Click the Report Case button. You can speak your report or select pictures. All information is confidential and secure.',
    
    // Form Labels
    violence_type: 'Type of violence',
    location: 'Location where it happened',
    date: 'When did it happen',
    age: 'Age of survivor',
    urgent: 'Is this urgent',
    
    // Buttons
    submit: 'Submit your report',
    cancel: 'Cancel and go back',
    help: 'Get help and support',
    speak: 'Speak your answer',
    next: 'Go to next question',
    previous: 'Go back to previous question'
  },
  
  krio: {
    // Main Navigation
    dashboard: 'Dashboard - Si ol statistics dem',
    cases: 'Cases - Si en manage cases dem',
    report: 'Report Case - File new report',
    analytics: 'Analytics - Si data en trends',
    settings: 'Settings - Configure yu preferences',
    
    // Actions
    click_to_speak: 'Click fɔ hear dis',
    voice_on: 'Voice navigation don ON naw. All button en text go read to yu.',
    voice_off: 'Voice navigation don OFF naw.',
    language_english: 'Language don change to English',
    language_krio: 'Language don change to Krio',
    
    // Instructions
    welcome: 'Welcome to di GBV Support Dashboard. Yu fit report cases, get help, en access services. Press di speaker button anytime fɔ hear instructions.',
    emergency: 'Emergency Help. Call wan wan siks fɔ immediate help. Available twentifɔ awas, seven days a week.',
    how_to_report: 'Fɔ report case: Click di Report Case button. Yu fit tok yu report ɔ select pictures. All information na secret en safe.',
    
    // Form Labels
    violence_type: 'Wetin kayn violence',
    location: 'Usai e happen',
    date: 'Usai day e happen',
    age: 'Aw ol di pɔsin',
    urgent: 'Na urgent',
    
    // Buttons
    submit: 'Send yu report',
    cancel: 'Cancel en go back',
    help: 'Get help en support',
    speak: 'Tok yu answer',
    next: 'Go to next question',
    previous: 'Go back to previous question'
  }
};

function initializeVoiceNavigation() {
  // Create voice control panel
  createVoiceControlPanel();
  
  // Add voice icons to all interactive elements
  addVoiceIconsToElements();
  
  // Load saved preferences
  loadVoicePreferences();
  
  console.log('✅ Voice Navigation System initialized');
}

function createVoiceControlPanel() {
  const panelHTML = `
    <div id="voice-control-panel" class="fixed top-20 right-6 z-50 bg-white rounded-2xl shadow-2xl p-4 border-2 border-indigo-300">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <i class="fas fa-volume-up text-indigo-600"></i>
        </div>
        <div>
          <div class="font-bold text-gray-800">Voice Help</div>
          <div class="text-xs text-gray-500">For Everyone</div>
        </div>
      </div>
      
      <!-- Voice Toggle -->
      <button onclick="toggleVoiceNavigation()" 
              id="voice-toggle-btn"
              class="w-full px-4 py-3 mb-2 rounded-xl font-bold text-white transition-all ${voiceEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}">
        <i class="fas fa-${voiceEnabled ? 'volume-up' : 'volume-mute'} mr-2"></i>
        <span id="voice-toggle-text">${voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
      </button>
      
      <!-- Language Toggle -->
      <button onclick="toggleLanguage()" 
              class="w-full px-4 py-3 mb-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-bold transition-all">
        <i class="fas fa-language mr-2"></i>
        <span id="language-text">${currentLanguage === 'en' ? 'English' : 'Krio'}</span>
      </button>
      
      <!-- Speed Control -->
      <div class="mb-2">
        <label class="text-xs font-semibold text-gray-700 mb-1 block">Speed</label>
        <input type="range" min="0.5" max="1.5" step="0.1" value="${readSpeed}" 
               onchange="updateReadSpeed(this.value)"
               class="w-full">
        <div class="text-xs text-gray-500 text-center">${readSpeed}x</div>
      </div>
      
      <!-- Quick Actions -->
      <div class="pt-3 border-t border-gray-200 space-y-2">
        <button onclick="readCurrentPage()" 
                class="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm font-semibold">
          <i class="fas fa-play mr-2"></i>
          Read This Page
        </button>
        <button onclick="speakEmergencyInfo()" 
                class="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-semibold">
          <i class="fas fa-phone-alt mr-2"></i>
          Emergency Info
        </button>
        <button onclick="speakHowToReport()" 
                class="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-semibold">
          <i class="fas fa-question-circle mr-2"></i>
          How to Report
        </button>
        <button onclick="stopSpeaking()" 
                class="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-semibold">
          <i class="fas fa-stop mr-2"></i>
          Stop Reading
        </button>
      </div>
      
      <!-- Auto-Read Toggle -->
      <label class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
        <input type="checkbox" ${autoReadEnabled ? 'checked' : ''} 
               onchange="toggleAutoRead(this.checked)"
               class="w-4 h-4 text-indigo-600 rounded">
        <span class="text-xs text-gray-700">Auto-read buttons when clicked</span>
      </label>
    </div>
    
    <!-- Floating Speaker Button (Always Visible) -->
    <button id="floating-speaker-btn" 
            onclick="showVoicePanel()"
            class="fixed top-20 right-6 z-40 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center animate-pulse">
      <i class="fas fa-volume-up text-2xl"></i>
    </button>
  `;
  
  document.body.insertAdjacentHTML('beforeend', panelHTML);
  
  // Hide panel initially, show only floating button
  document.getElementById('voice-control-panel').style.display = 'none';
}

function addVoiceIconsToElements() {
  // Add speaker icons to all buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.querySelector('.voice-icon') && !button.id?.includes('voice') && !button.id?.includes('speaker')) {
      const icon = document.createElement('i');
      icon.className = 'fas fa-volume-up voice-icon text-xs opacity-50 ml-1';
      icon.style.fontSize = '10px';
      button.appendChild(icon);
      
      // Add hover listener
      button.addEventListener('mouseenter', () => {
        if (voiceEnabled && autoReadEnabled) {
          speakButtonText(button);
        }
      });
    }
  });
  
  // Add click-to-read to headings
  const headings = document.querySelectorAll('h1, h2, h3, h4');
  headings.forEach(heading => {
    if (!heading.querySelector('.voice-read-icon')) {
      const icon = document.createElement('i');
      icon.className = 'fas fa-volume-up voice-read-icon text-sm text-indigo-600 ml-2 cursor-pointer hover:text-indigo-800';
      icon.title = 'Click to read aloud';
      icon.onclick = () => speakText(heading.textContent);
      heading.appendChild(icon);
    }
  });
}

function showVoicePanel() {
  const panel = document.getElementById('voice-control-panel');
  const floatingBtn = document.getElementById('floating-speaker-btn');
  
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    floatingBtn.style.display = 'none';
    speakText(translations[currentLanguage].welcome);
  } else {
    panel.style.display = 'none';
    floatingBtn.style.display = 'flex';
  }
}

function toggleVoiceNavigation() {
  voiceEnabled = !voiceEnabled;
  
  const btn = document.getElementById('voice-toggle-btn');
  const text = document.getElementById('voice-toggle-text');
  
  if (voiceEnabled) {
    btn.className = 'w-full px-4 py-3 mb-2 rounded-xl font-bold text-white transition-all bg-green-500 hover:bg-green-600';
    text.textContent = 'Voice ON';
    speakText(translations[currentLanguage].voice_on);
  } else {
    btn.className = 'w-full px-4 py-3 mb-2 rounded-xl font-bold text-white transition-all bg-gray-400 hover:bg-gray-500';
    text.textContent = 'Voice OFF';
    speakText(translations[currentLanguage].voice_off);
    stopSpeaking();
  }
  
  saveVoicePreferences();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'krio' : 'en';
  document.getElementById('language-text').textContent = currentLanguage === 'en' ? 'English' : 'Krio';
  
  const message = currentLanguage === 'en' ? translations.en.language_english : translations.krio.language_krio;
  speakText(message);
  
  saveVoicePreferences();
}

function updateReadSpeed(speed) {
  readSpeed = parseFloat(speed);
  document.querySelector('#voice-control-panel input[type="range"] + div').textContent = `${readSpeed}x`;
  saveVoicePreferences();
}

function toggleAutoRead(enabled) {
  autoReadEnabled = enabled;
  saveVoicePreferences();
}

function speakText(text, interrupt = true) {
  if (!voiceEnabled || !text) return;
  
  // Stop current speech if interrupting
  if (interrupt) {
    stopSpeaking();
  }
  
  // Create new utterance
  currentUtterance = new SpeechSynthesisUtterance(text);
  
  // Set language
  currentUtterance.lang = currentLanguage === 'en' ? 'en-US' : 'en-SL'; // Sierra Leone English for Krio
  currentUtterance.rate = readSpeed;
  currentUtterance.pitch = 1;
  currentUtterance.volume = 1;
  
  // Speak
  speechSynthesis.speak(currentUtterance);
}

function speakButtonText(button) {
  if (!voiceEnabled) return;
  
  // Get button text without icon text
  const text = button.textContent.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
  
  // Get translated text if available
  const translated = getTranslatedText(text);
  speakText(translated, false);
}

function getTranslatedText(text) {
  const lowerText = text.toLowerCase();
  
  // Try to find translation
  for (const [key, value] of Object.entries(translations[currentLanguage])) {
    if (lowerText.includes(key) || value.toLowerCase().includes(lowerText)) {
      return value;
    }
  }
  
  return text; // Return original if no translation found
}

function readCurrentPage() {
  if (!voiceEnabled) return;
  
  stopSpeaking();
  
  // Get main content
  const mainContent = document.getElementById('main-content') || document.querySelector('main') || document.body;
  
  // Extract text from visible elements
  const visibleText = [];
  
  // Add headings
  mainContent.querySelectorAll('h1, h2, h3, h4').forEach(el => {
    if (isElementVisible(el)) {
      visibleText.push(el.textContent.trim());
    }
  });
  
  // Add important text
  mainContent.querySelectorAll('p, li, .text-lg, .font-bold').forEach(el => {
    if (isElementVisible(el) && el.textContent.trim().length > 10) {
      visibleText.push(el.textContent.trim());
    }
  });
  
  // Speak combined text
  const fullText = visibleText.slice(0, 20).join('. '); // Limit to 20 items
  speakText(fullText);
}

function isElementVisible(el) {
  const style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function speakEmergencyInfo() {
  const text = translations[currentLanguage].emergency;
  speakText(text);
}

function speakHowToReport() {
  const text = translations[currentLanguage].how_to_report;
  speakText(text);
}

function stopSpeaking() {
  speechSynthesis.cancel();
  currentUtterance = null;
}

function saveVoicePreferences() {
  localStorage.setItem('gbv_voice_preferences', JSON.stringify({
    enabled: voiceEnabled,
    language: currentLanguage,
    speed: readSpeed,
    autoRead: autoReadEnabled
  }));
}

function loadVoicePreferences() {
  const saved = localStorage.getItem('gbv_voice_preferences');
  if (saved) {
    try {
      const prefs = JSON.parse(saved);
      voiceEnabled = prefs.enabled || false;
      currentLanguage = prefs.language || 'en';
      readSpeed = prefs.speed || 0.9;
      autoReadEnabled = prefs.autoRead !== false;
      
      // Update UI
      if (document.getElementById('voice-toggle-btn')) {
        const btn = document.getElementById('voice-toggle-btn');
        const text = document.getElementById('voice-toggle-text');
        if (voiceEnabled) {
          btn.className = 'w-full px-4 py-3 mb-2 rounded-xl font-bold text-white transition-all bg-green-500 hover:bg-green-600';
          text.textContent = 'Voice ON';
        }
        document.getElementById('language-text').textContent = currentLanguage === 'en' ? 'English' : 'Krio';
      }
    } catch (e) {
      console.error('Error loading voice preferences:', e);
    }
  }
}

// Add global voice navigation to all clickable elements
document.addEventListener('click', (e) => {
  if (!voiceEnabled || !autoReadEnabled) return;
  
  const target = e.target.closest('button, a, [onclick]');
  if (target && !target.id?.includes('voice') && !target.id?.includes('speaker')) {
    speakButtonText(target);
  }
});

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVoiceNavigation);
} else {
  initializeVoiceNavigation();
}

console.log('✅ Accessibility Voice Navigation loaded successfully');
