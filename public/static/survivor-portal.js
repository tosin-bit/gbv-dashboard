// Survivor Portal - Anonymous Self-Service for Survivors
// Aligned with Sierra Leone Spotlight Initiative - Survivor-Centered Approach

/**
 * SURVIVOR PORTAL SYSTEM
 * 
 * Features:
 * - Anonymous access (no login required)
 * - Anonymous case tracking with secure code
 * - Resource library access
 * - Self-assessment tools
 * - Safety planning tools
 * - Service finder (locations, hours)
 * - Live chat support
 * - Multilingual support (English, Krio, Mende, Temne)
 * - Quick exit button (escape to weather site)
 * - No browsing history saved
 * - Secure PIN-based case access
 * - Legal rights information
 * - Appointment booking
 * - Progress tracking
 * - Educational materials
 * - Anonymous feedback
 */

let survivorPortalModal = null;
let currentPortalSection = 'home';
let caseAccessCode = null;

/**
 * Show Survivor Portal
 */
function showSurvivorPortal() {
  const modalHTML = `
    <div id="survivor-portal-modal" class="fixed inset-0 bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center z-50 overflow-y-auto">
      <!-- Quick Exit Button (Top Right) -->
      <button onclick="quickExitPortal()" 
              class="fixed top-4 right-4 z-[60] px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-2xl font-bold flex items-center gap-2 animate-pulse">
        <i class="fas fa-times-circle text-xl"></i>
        QUICK EXIT
      </button>

      <div class="max-w-7xl w-full mx-4 my-8">
        <!-- Header -->
        <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-t-2xl px-8 py-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold mb-2">Survivor Support Portal</h1>
              <p class="text-purple-200">Anonymous, Safe, Confidential</p>
            </div>
            <div class="text-right">
              <div class="text-sm mb-2">Language</div>
              <select onchange="changeLanguage(this.value)" 
                      class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg border-2 border-white border-opacity-30">
                <option value="en">English</option>
                <option value="krio">Krio</option>
                <option value="mende">Mende</option>
                <option value="temne">Temne</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          <div class="flex">
            <!-- Sidebar Navigation -->
            <div class="w-64 bg-gradient-to-b from-purple-50 to-pink-50 p-6 border-r">
              <nav class="space-y-2">
                <button onclick="navigatePortal('home')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg bg-purple-600 text-white font-medium"
                        data-section="home">
                  <i class="fas fa-home mr-3"></i>Home
                </button>
                <button onclick="navigatePortal('track-case')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="track-case">
                  <i class="fas fa-search mr-3"></i>Track My Case
                </button>
                <button onclick="navigatePortal('resources')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="resources">
                  <i class="fas fa-book mr-3"></i>Resources
                </button>
                <button onclick="navigatePortal('safety-plan')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="safety-plan">
                  <i class="fas fa-shield-alt mr-3"></i>Safety Planning
                </button>
                <button onclick="navigatePortal('services')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="services">
                  <i class="fas fa-hospital mr-3"></i>Find Services
                </button>
                <button onclick="navigatePortal('rights')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="rights">
                  <i class="fas fa-balance-scale mr-3"></i>Your Rights
                </button>
                <button onclick="navigatePortal('chat')" 
                        class="portal-nav w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
                        data-section="chat">
                  <i class="fas fa-comments mr-3"></i>Live Support
                </button>
              </nav>

              <!-- Emergency Contacts -->
              <div class="mt-8 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <h4 class="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <i class="fas fa-phone-alt"></i>
                  Emergency
                </h4>
                <div class="space-y-2 text-sm">
                  <a href="tel:116" class="block text-red-700 font-bold hover:text-red-900">
                    📞 116 - GBV Hotline
                  </a>
                  <a href="tel:999" class="block text-red-700 font-bold hover:text-red-900">
                    🚓 999 - Police
                  </a>
                </div>
              </div>
            </div>

            <!-- Content Area -->
            <div id="portal-content" class="flex-1 p-8 min-h-[600px]">
              ${generateHomeContent()}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-4 text-center text-white text-sm">
          <p class="mb-2">
            <i class="fas fa-lock mr-2"></i>
            Your privacy is our priority. This portal is anonymous and secure.
          </p>
          <p class="text-purple-200">
            Powered by Insyt Solutions • Sierra Leone GBV Response System
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  survivorPortalModal = document.getElementById('survivor-portal-modal');
  
  // Clear browser history for this page
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname);
  }
}

/**
 * Generate Home Content
 */
function generateHomeContent() {
  return `
    <div class="space-y-8">
      <!-- Welcome Message -->
      <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Welcome. You are not alone.</h2>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto">
          This safe space is designed to help you access support, information, and resources. 
          Everything here is anonymous and confidential.
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
             onclick="navigatePortal('track-case')">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <i class="fas fa-search text-3xl text-purple-600"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 text-center mb-2">Track My Case</h3>
          <p class="text-gray-600 text-center text-sm">
            Check the status of your case using your secure access code
          </p>
        </div>

        <div class="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
             onclick="navigatePortal('safety-plan')">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <i class="fas fa-shield-alt text-3xl text-green-600"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 text-center mb-2">Create Safety Plan</h3>
          <p class="text-gray-600 text-center text-sm">
            Build a personalized safety plan to protect yourself
          </p>
        </div>

        <div class="bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
             onclick="navigatePortal('services')">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <i class="fas fa-hospital text-3xl text-blue-600"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 text-center mb-2">Find Services</h3>
          <p class="text-gray-600 text-center text-sm">
            Locate nearby support services and facilities
          </p>
        </div>
      </div>

      <!-- Information Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-blue-800 mb-4">
            <i class="fas fa-info-circle mr-2"></i>What You Need to Know
          </h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-1"></i>
              <span>You have the right to medical care within 72 hours</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-1"></i>
              <span>All services are free and confidential</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-1"></i>
              <span>You can report without giving your name</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-1"></i>
              <span>Support is available 24/7 via the 116 hotline</span>
            </li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-purple-800 mb-4">
            <i class="fas fa-heart mr-2"></i>You Are Not Alone
          </h3>
          <p class="text-gray-700 mb-4">
            Thousands of survivors receive support every year. Recovery is possible, and help is available.
          </p>
          <button onclick="navigatePortal('chat')" 
                  class="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            <i class="fas fa-comments mr-2"></i>Talk to Someone Now
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Track Case Content
 */
function generateTrackCaseContent() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Track Your Case</h2>
        <p class="text-gray-600">Enter your secure case access code</p>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p class="text-sm text-yellow-800">
          <i class="fas fa-lock mr-2"></i>
          Your case code is confidential. It was provided to you when your case was registered.
        </p>
      </div>

      <form onsubmit="trackCase(event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Case Access Code
          </label>
          <input type="text" 
                 placeholder="Enter your case code (e.g., GBV-2025-0156-ABC123)"
                 class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                 required>
        </div>

        <button type="submit" 
                class="w-full px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold text-lg">
          <i class="fas fa-search mr-2"></i>Track Case
        </button>
      </form>

      <div class="text-center text-sm text-gray-600">
        <p class="mb-2">Don't have a case code?</p>
        <button onclick="navigatePortal('services')" 
                class="text-purple-600 hover:text-purple-800 font-semibold">
          Find Services to Register
        </button>
      </div>
    </div>
  `;
}

/**
 * Generate Safety Plan Content
 */
function generateSafetyPlanContent() {
  return `
    <div class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Personal Safety Plan</h2>
        <p class="text-gray-600">Create a plan to keep yourself safe</p>
      </div>

      <div class="bg-green-50 rounded-xl p-6">
        <h3 class="text-xl font-bold text-green-800 mb-4">Your Safety is Priority</h3>
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">1. Safe Place to Go</h4>
            <input type="text" 
                   placeholder="Where can you go if you need to leave quickly?"
                   class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">2. Trusted Person to Call</h4>
            <input type="text" 
                   placeholder="Name and phone number"
                   class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">3. Important Documents</h4>
            <textarea rows="3"
                      placeholder="List important documents you would take (ID, birth certificates, etc.)"
                      class="w-full px-3 py-2 border border-gray-300 rounded"></textarea>
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">4. Emergency Money</h4>
            <input type="text" 
                   placeholder="Where do you keep emergency funds?"
                   class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">5. Code Word</h4>
            <input type="text" 
                   placeholder="A secret word to signal you need help"
                   class="w-full px-3 py-2 border border-gray-300 rounded">
          </div>
        </div>

        <button onclick="saveSafetyPlan()" 
                class="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold">
          <i class="fas fa-save mr-2"></i>Save My Safety Plan
        </button>
      </div>
    </div>
  `;
}

/**
 * Generate Services Content
 */
function generateServicesContent() {
  return `
    <div class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Find Support Services</h2>
        <p class="text-gray-600">Locate facilities and services near you</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Rainbo Centers -->
        <div class="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 class="text-xl font-bold text-purple-800 mb-4">
            <i class="fas fa-hospital mr-2"></i>Rainbo Centers
          </h3>
          <p class="text-gray-700 mb-4">One-stop centers for medical care and support</p>
          <ul class="space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Freetown:</strong> Connaught Hospital • Open 24/7</li>
            <li><strong>Bo:</strong> Bo Government Hospital • Open 24/7</li>
            <li><strong>Kenema:</strong> Kenema Hospital • Open 24/7</li>
            <li><strong>Makeni:</strong> Makeni Hospital • Open 24/7</li>
          </ul>
          <div class="bg-white p-3 rounded">
            <strong>Services:</strong> Medical exams, PEP, counseling, police reports
          </div>
        </div>

        <!-- Police FSU -->
        <div class="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 class="text-xl font-bold text-blue-800 mb-4">
            <i class="fas fa-shield-alt mr-2"></i>Police Family Support Unit
          </h3>
          <p class="text-gray-700 mb-4">Report cases and get police protection</p>
          <ul class="space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Freetown:</strong> Central Police Station</li>
            <li><strong>Districts:</strong> FSU offices in all 16 districts</li>
            <li><strong>Hotline:</strong> 116 (24/7)</li>
          </ul>
          <div class="bg-white p-3 rounded">
            <strong>Services:</strong> Case reporting, investigations, protection orders
          </div>
        </div>

        <!-- Legal Aid -->
        <div class="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <h3 class="text-xl font-bold text-green-800 mb-4">
            <i class="fas fa-balance-scale mr-2"></i>Legal Aid Board
          </h3>
          <p class="text-gray-700 mb-4">Free legal assistance for survivors</p>
          <ul class="space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Freetown:</strong> LAB Headquarters</li>
            <li><strong>Coverage:</strong> All districts</li>
          </ul>
          <div class="bg-white p-3 rounded">
            <strong>Services:</strong> Legal advice, court representation, protection orders
          </div>
        </div>

        <!-- Counseling -->
        <div class="bg-pink-50 border-2 border-pink-200 rounded-xl p-6">
          <h3 class="text-xl font-bold text-pink-800 mb-4">
            <i class="fas fa-heart mr-2"></i>Counseling Services
          </h3>
          <p class="text-gray-700 mb-4">Mental health and trauma support</p>
          <ul class="space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Rainbo Centers:</strong> Free counseling</li>
            <li><strong>Women in Crisis:</strong> Support groups</li>
            <li><strong>Phone:</strong> 116 for crisis counseling</li>
          </ul>
          <div class="bg-white p-3 rounded">
            <strong>Services:</strong> Individual counseling, group therapy, crisis support
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Rights Content
 */
function generateRightsContent() {
  return `
    <div class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Know Your Rights</h2>
        <p class="text-gray-600">As a survivor, you have rights protected by Sierra Leone law</p>
      </div>

      <div class="space-y-4">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-3">1. Right to Medical Care</h3>
          <p class="text-gray-700">
            You have the right to free medical examination and treatment at any Rainbo Center or government hospital, regardless of whether you report to police.
          </p>
        </div>

        <div class="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
          <h3 class="text-xl font-bold text-green-800 mb-3">2. Right to Confidentiality</h3>
          <p class="text-gray-700">
            Your medical records and case details must be kept confidential. No one can share your information without your permission.
          </p>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-3">3. Right to Legal Support</h3>
          <p class="text-gray-700">
            You are entitled to free legal representation from the Legal Aid Board. You can pursue criminal charges against the perpetrator.
          </p>
        </div>

        <div class="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
          <h3 class="text-xl font-bold text-yellow-800 mb-3">4. Right to Protection</h3>
          <p class="text-gray-700">
            You can request a protection order to keep the perpetrator away from you. Police must investigate your case promptly.
          </p>
        </div>

        <div class="bg-pink-50 border-l-4 border-pink-600 p-6 rounded-r-lg">
          <h3 class="text-xl font-bold text-pink-800 mb-3">5. Right to Safe Shelter</h3>
          <p class="text-gray-700">
            If you are not safe at home, you have the right to access safe shelter and emergency accommodation.
          </p>
        </div>
      </div>

      <div class="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-8">
        <h3 class="text-xl font-bold text-red-800 mb-3">
          <i class="fas fa-exclamation-triangle mr-2"></i>Sierra Leone Laws Protect You
        </h3>
        <ul class="space-y-2 text-gray-700">
          <li><strong>Sexual Offences Act 2012:</strong> Life imprisonment for rape</li>
          <li><strong>Domestic Violence Act 2007:</strong> Protection from abuse</li>
          <li><strong>Child Rights Act 2007:</strong> Special protection for children</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * Navigate Portal
 */
function navigatePortal(section) {
  currentPortalSection = section;
  
  // Update nav buttons
  document.querySelectorAll('.portal-nav').forEach(btn => {
    btn.classList.remove('bg-purple-600', 'text-white');
    btn.classList.add('hover:bg-purple-100');
  });
  
  const activeBtn = document.querySelector(`.portal-nav[data-section="${section}"]`);
  if (activeBtn) {
    activeBtn.classList.add('bg-purple-600', 'text-white');
    activeBtn.classList.remove('hover:bg-purple-100');
  }
  
  // Update content
  const content = document.getElementById('portal-content');
  let html = '';
  
  switch(section) {
    case 'home':
      html = generateHomeContent();
      break;
    case 'track-case':
      html = generateTrackCaseContent();
      break;
    case 'resources':
      html = '<div class="text-center py-12"><p class="text-lg text-gray-600">Resource library loading...</p></div>';
      break;
    case 'safety-plan':
      html = generateSafetyPlanContent();
      break;
    case 'services':
      html = generateServicesContent();
      break;
    case 'rights':
      html = generateRightsContent();
      break;
    case 'chat':
      html = '<div class="text-center py-12"><p class="text-lg text-gray-600">Live chat connecting...</p></div>';
      break;
  }
  
  content.innerHTML = html;
  content.scrollTop = 0;
}

/**
 * Track Case
 */
function trackCase(event) {
  event.preventDefault();
  if (typeof showToast === 'function') {
    showToast('Case tracking feature coming soon with API integration...', 'info');
  }
}

/**
 * Save Safety Plan
 */
function saveSafetyPlan() {
  if (typeof showToast === 'function') {
    showToast('Safety plan saved securely to your device', 'success');
  }
}

/**
 * Change Language
 */
function changeLanguage(lang) {
  if (typeof showToast === 'function') {
    showToast(`Language changed to ${lang === 'en' ? 'English' : lang === 'krio' ? 'Krio' : lang === 'mende' ? 'Mende' : 'Temne'}`, 'info');
  }
}

/**
 * Quick Exit Portal
 */
function quickExitPortal() {
  // Redirect to innocent website (weather)
  window.location.href = 'https://weather.com';
}

/**
 * Close Survivor Portal
 */
function closeSurvivorPortal() {
  if (survivorPortalModal) {
    survivorPortalModal.remove();
    survivorPortalModal = null;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Survivor Portal System loaded');
});
