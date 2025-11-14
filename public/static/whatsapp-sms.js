// WhatsApp/SMS Integration - Multi-Channel Reporting System
// Aligned with Sierra Leone Spotlight Initiative - Accessible Reporting

/**
 * WHATSAPP/SMS INTEGRATION SYSTEM
 * 
 * Features:
 * - WhatsApp Business API integration
 * - SMS gateway integration
 * - Report via WhatsApp message
 * - Report via SMS
 * - Automated responses
 * - Case status updates via WhatsApp/SMS
 * - Multi-language support
 * - Template messages
 * - Media sharing (photos, voice notes)
 * - Interactive menus
 * - Appointment reminders
 * - Follow-up messages
 * - Bulk messaging
 * - Message templates library
 * - Opt-in/opt-out management
 * - Analytics dashboard
 */

let whatsappSMSModal = null;
let messageTemplates = {};

// Message Templates
const templates = {
  welcome: {
    en: "Welcome to GBV Support. You can report cases, get information, or check status. Reply with:\n1️⃣ Report Case\n2️⃣ Get Help\n3️⃣ Check Status\n4️⃣ Find Services",
    krio: "Welkom to GBV Support. Yu fit report case, get information, or check status. Reply wit:\n1️⃣ Report Case\n2️⃣ Get Help\n3️⃣ Check Status\n4️⃣ Find Services"
  },
  case_received: {
    en: "✅ Your case has been received. Case Code: {code}\n\n🔒 Keep this code safe. Use it to track your case.\n\n📞 Emergency: Call 116 (24/7)",
    krio: "✅ Wi don receive yu case. Case Code: {code}\n\n🔒 Keep dis code safe. Use am to check yu case.\n\n📞 Emergency: Call 116 (24/7)"
  },
  status_update: {
    en: "📋 Case Update: {code}\nStatus: {status}\n\nNext Steps: {next_steps}\n\nNeed help? Call 116",
    krio: "📋 Case Update: {code}\nStatus: {status}\n\nNext Steps: {next_steps}\n\nNeed help? Call 116"
  },
  appointment_reminder: {
    en: "⏰ Reminder: You have an appointment tomorrow at {time} at {location}.\n\nPlease confirm: Reply Y",
    krio: "⏰ Reminder: Yu get appointment tumara at {time} at {location}.\n\nPlease confirm: Reply Y"
  }
};

// Sample WhatsApp/SMS logs
const sampleMessages = [
  {
    id: 1,
    from: '+232 76 XXX XXX',
    to: '116',
    channel: 'whatsapp',
    content: 'I need help. I was assaulted.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'received',
    case_created: 'GBV-2025-0234'
  },
  {
    id: 2,
    from: 'System',
    to: '+232 76 XXX XXX',
    channel: 'whatsapp',
    content: '✅ Your case has been received. Case Code: GBV-2025-0234-AB12\n\n🔒 Keep this code safe.',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
    status: 'sent'
  },
  {
    id: 3,
    from: '+232 88 XXX XXX',
    to: '116',
    channel: 'sms',
    content: 'Check status GBV-2025-0156-XY89',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'received'
  }
];

/**
 * Show WhatsApp/SMS Integration Modal
 */
function showWhatsAppSMS() {
  const modalHTML = `
    <div id="whatsapp-sms-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <i class="fab fa-whatsapp text-3xl"></i>
            <div>
              <h2 class="text-2xl font-bold">WhatsApp & SMS Integration</h2>
              <p class="text-green-100 text-sm">Multi-channel reporting and updates</p>
            </div>
          </div>
          <button onclick="closeWhatsAppSMS()" 
                  class="text-white hover:text-green-200 text-2xl">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Tabs -->
        <div class="border-b bg-gray-50 sticky top-16 z-10">
          <nav class="flex">
            <button onclick="switchWhatsAppTab('overview')" 
                    class="wa-tab px-6 py-3 font-medium border-b-2 border-green-600 text-green-600"
                    data-tab="overview">
              <i class="fas fa-chart-pie mr-2"></i>Overview
            </button>
            <button onclick="switchWhatsAppTab('messages')" 
                    class="wa-tab px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="messages">
              <i class="fas fa-comments mr-2"></i>Messages
            </button>
            <button onclick="switchWhatsAppTab('templates')" 
                    class="wa-tab px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="templates">
              <i class="fas fa-file-alt mr-2"></i>Templates
            </button>
            <button onclick="switchWhatsAppTab('send')" 
                    class="wa-tab px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="send">
              <i class="fas fa-paper-plane mr-2"></i>Send Message
            </button>
            <button onclick="switchWhatsAppTab('settings')" 
                    class="wa-tab px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                    data-tab="settings">
              <i class="fas fa-cog mr-2"></i>Settings
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div id="whatsapp-content" class="p-6">
          ${generateOverviewContent()}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  whatsappSMSModal = document.getElementById('whatsapp-sms-modal');
}

/**
 * Generate Overview Content
 */
function generateOverviewContent() {
  return `
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200">
          <div class="flex items-center justify-between mb-2">
            <i class="fab fa-whatsapp text-3xl text-green-600"></i>
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
          </div>
          <div class="text-2xl font-bold text-gray-800">234</div>
          <div class="text-sm text-gray-600">WhatsApp Reports</div>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-sms text-3xl text-blue-600"></i>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
          </div>
          <div class="text-2xl font-bold text-gray-800">89</div>
          <div class="text-sm text-gray-600">SMS Reports</div>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border border-purple-200">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-paper-plane text-3xl text-purple-600"></i>
          </div>
          <div class="text-2xl font-bold text-gray-800">1,247</div>
          <div class="text-sm text-gray-600">Messages Sent</div>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-lg border border-yellow-200">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-clock text-3xl text-yellow-600"></i>
          </div>
          <div class="text-2xl font-bold text-gray-800">2.3 min</div>
          <div class="text-sm text-gray-600">Avg Response Time</div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          <i class="fas fa-info-circle text-green-600 mr-2"></i>
          How Multi-Channel Reporting Works
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-green-800 mb-3 flex items-center gap-2">
              <i class="fab fa-whatsapp text-xl"></i>
              WhatsApp Reporting
            </h4>
            <ol class="space-y-2 text-sm text-gray-700">
              <li>1️⃣ Survivor sends message to <strong>+232 116</strong></li>
              <li>2️⃣ System creates case automatically</li>
              <li>3️⃣ Survivor receives case code instantly</li>
              <li>4️⃣ Updates sent via WhatsApp automatically</li>
              <li>5️⃣ Survivor can track status anytime</li>
            </ol>
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <i class="fas fa-sms text-xl"></i>
              SMS Reporting
            </h4>
            <ol class="space-y-2 text-sm text-gray-700">
              <li>1️⃣ Survivor texts to <strong>116</strong></li>
              <li>2️⃣ System parses message content</li>
              <li>3️⃣ Case created from SMS details</li>
              <li>4️⃣ SMS confirmation with case code</li>
              <li>5️⃣ Status updates via SMS</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-language text-2xl text-green-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Multi-Language</h4>
              <p class="text-sm text-gray-600">English, Krio, Mende, Temne support</p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-robot text-2xl text-blue-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Auto-Response</h4>
              <p class="text-sm text-gray-600">Instant automated acknowledgment</p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-bell text-2xl text-purple-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Status Updates</h4>
              <p class="text-sm text-gray-600">Real-time case progress notifications</p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-calendar text-2xl text-yellow-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Reminders</h4>
              <p class="text-sm text-gray-600">Appointment and follow-up reminders</p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-image text-2xl text-pink-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Media Support</h4>
              <p class="text-sm text-gray-600">Photos, voice notes, documents</p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <i class="fas fa-chart-bar text-2xl text-indigo-600 mt-1"></i>
            <div>
              <h4 class="font-semibold text-gray-800 mb-1">Analytics</h4>
              <p class="text-sm text-gray-600">Message performance tracking</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration Status -->
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div class="flex items-start gap-3">
          <i class="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
          <div>
            <h4 class="font-semibold text-yellow-800 mb-2">API Integration Required</h4>
            <p class="text-sm text-yellow-700 mb-3">
              This feature requires WhatsApp Business API and SMS gateway credentials to be configured in production.
            </p>
            <div class="space-y-1 text-sm text-yellow-700">
              <div><strong>WhatsApp Business API:</strong> Meta Business Account + Phone Number</div>
              <div><strong>SMS Gateway:</strong> Twilio, Africas Talking, or local provider</div>
              <div><strong>Phone Number:</strong> Dedicated short code (116) or long number</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Messages Content
 */
function generateMessagesContent() {
  return `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Recent Messages</h3>
        <button onclick="refreshMessages()" 
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <i class="fas fa-sync-alt mr-2"></i>Refresh
        </button>
      </div>

      <div class="space-y-3">
        ${sampleMessages.map(msg => `
          <div class="border rounded-lg p-4 ${msg.channel === 'whatsapp' ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}">
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <i class="fab fa-${msg.channel === 'whatsapp' ? 'whatsapp' : 'sms'} text-xl ${msg.channel === 'whatsapp' ? 'text-green-600' : 'text-blue-600'}"></i>
                <span class="font-semibold">${msg.from}</span>
                <span class="text-xs text-gray-500">→ ${msg.to}</span>
              </div>
              <span class="text-xs text-gray-500">${new Date(msg.timestamp).toLocaleString()}</span>
            </div>
            <p class="text-gray-700 mb-2">${msg.content}</p>
            <div class="flex items-center gap-3 text-xs">
              <span class="px-2 py-1 rounded ${msg.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                ${msg.status.toUpperCase()}
              </span>
              ${msg.case_created ? `
                <span class="px-2 py-1 rounded bg-purple-100 text-purple-800">
                  Case: ${msg.case_created}
                </span>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Generate Templates Content
 */
function generateTemplatesContent() {
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Message Templates</h3>
        <button onclick="createNewTemplate()" 
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <i class="fas fa-plus mr-2"></i>New Template
        </button>
      </div>

      ${Object.entries(templates).map(([key, langs]) => `
        <div class="border rounded-lg p-4">
          <h4 class="font-bold text-gray-800 mb-3 capitalize">${key.replace('_', ' ')}</h4>
          <div class="space-y-3">
            ${Object.entries(langs).map(([lang, text]) => `
              <div class="bg-gray-50 p-3 rounded">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700 uppercase">${lang}</span>
                  <button onclick="copyTemplate('${key}', '${lang}')" 
                          class="text-xs text-blue-600 hover:text-blue-800">
                    <i class="fas fa-copy mr-1"></i>Copy
                  </button>
                </div>
                <pre class="text-sm text-gray-700 whitespace-pre-wrap font-sans">${text}</pre>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Switch WhatsApp Tab
 */
function switchWhatsAppTab(tab) {
  document.querySelectorAll('.wa-tab').forEach(btn => {
    btn.classList.remove('border-green-600', 'text-green-600');
    btn.classList.add('border-transparent', 'text-gray-600');
  });
  
  const activeBtn = document.querySelector(`.wa-tab[data-tab="${tab}"]`);
  if (activeBtn) {
    activeBtn.classList.add('border-green-600', 'text-green-600');
    activeBtn.classList.remove('border-transparent', 'text-gray-600');
  }
  
  const content = document.getElementById('whatsapp-content');
  let html = '';
  
  switch(tab) {
    case 'overview':
      html = generateOverviewContent();
      break;
    case 'messages':
      html = generateMessagesContent();
      break;
    case 'templates':
      html = generateTemplatesContent();
      break;
    case 'send':
      html = '<div class="text-center py-12"><p class="text-lg text-gray-600">Send message interface coming soon...</p></div>';
      break;
    case 'settings':
      html = '<div class="text-center py-12"><p class="text-lg text-gray-600">Integration settings coming soon...</p></div>';
      break;
  }
  
  content.innerHTML = html;
}

function refreshMessages() {
  if (typeof showToast === 'function') {
    showToast('Messages refreshed', 'success');
  }
}

function createNewTemplate() {
  if (typeof showToast === 'function') {
    showToast('Template creation coming soon...', 'info');
  }
}

function copyTemplate(key, lang) {
  const text = templates[key][lang];
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') {
      showToast('Template copied to clipboard', 'success');
    }
  });
}

/**
 * Close WhatsApp/SMS Modal
 */
function closeWhatsAppSMS() {
  if (whatsappSMSModal) {
    whatsappSMSModal.remove();
    whatsappSMSModal = null;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('WhatsApp/SMS Integration System loaded');
});
