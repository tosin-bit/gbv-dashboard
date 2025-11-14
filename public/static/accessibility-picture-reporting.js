// Accessibility Picture-Based Reporting
// Visual reporting system for low-literacy users with icons and images

const pictureCategories = {
  violence_types: [
    {
      id: 'physical',
      icon: '👊',
      emoji: '😢',
      color: 'red',
      label_en: 'Physical Violence',
      label_krio: 'Physical Violence',
      description_en: 'Hitting, beating, pushing, or hurting the body',
      description_krio: 'Dem bit yu, push yu, ɔ hurt yu bɔdi',
      examples: ['Beating', 'Slapping', 'Kicking', 'Burning']
    },
    {
      id: 'sexual',
      icon: '⚠️',
      emoji: '😰',
      color: 'purple',
      label_en: 'Sexual Violence',
      label_krio: 'Sexual Violence',
      description_en: 'Rape, sexual assault, or unwanted sexual contact',
      description_krio: 'Rape, sexual assault, ɔ unwanted sexual contact',
      examples: ['Rape', 'Sexual Assault', 'Harassment', 'Abuse']
    },
    {
      id: 'emotional',
      icon: '💔',
      emoji: '😔',
      color: 'blue',
      label_en: 'Emotional/Psychological',
      label_krio: 'Emotional/Psychological',
      description_en: 'Threats, insults, control, or mental harm',
      description_krio: 'Dem threaten yu, insult yu, ɔ control yu',
      examples: ['Threats', 'Insults', 'Isolation', 'Control']
    },
    {
      id: 'economic',
      icon: '💰',
      emoji: '😟',
      color: 'green',
      label_en: 'Economic Abuse',
      label_krio: 'Economic Abuse',
      description_en: 'Controlling money, preventing work, or taking resources',
      description_krio: 'Dem control yu moni, stop yu frɔm wok, ɔ tek yu tins',
      examples: ['Money Control', 'Prevented from Working', 'Property Taken']
    },
    {
      id: 'child_marriage',
      icon: '👧💍',
      emoji: '😭',
      color: 'pink',
      label_en: 'Child Marriage',
      label_krio: 'Child Marriage',
      description_en: 'Forced marriage of children under 18',
      description_krio: 'Fɔs pikin ɔnda 18 fɔ mared',
      examples: ['Forced Marriage', 'Early Marriage', 'Against Will']
    },
    {
      id: 'fgm',
      icon: '🚫',
      emoji: '😢',
      color: 'orange',
      label_en: 'Female Genital Mutilation',
      label_krio: 'Female Genital Mutilation (FGM)',
      description_en: 'Cutting or harming female genitals',
      description_krio: 'Cut ɔ damage woman private part',
      examples: ['FGM/C', 'Cutting', 'Forced Initiation']
    }
  ],
  
  urgency_levels: [
    {
      id: 'emergency',
      icon: '🚨',
      color: 'red',
      label_en: 'EMERGENCY - Need Help NOW',
      label_krio: 'EMERGENCY - Nid Help NAW',
      description_en: 'Life is in danger, need immediate help',
      description_krio: 'Life de na danger, nid help now now',
      action: 'Call 116 immediately'
    },
    {
      id: 'urgent',
      icon: '⚠️',
      color: 'orange',
      label_en: 'Urgent - Need Help Soon',
      label_krio: 'Urgent - Nid Help Sun',
      description_en: 'Not immediate danger, but need help soon',
      description_krio: 'No immediate danger, bot nid help sun',
      action: 'Contact within 24 hours'
    },
    {
      id: 'not_urgent',
      icon: '📋',
      color: 'blue',
      label_en: 'Not Urgent - Planning for Help',
      label_krio: 'No Urgent - Planning fɔ Help',
      description_en: 'Safe now, want to report or get information',
      description_krio: 'Safe now, want fɔ report ɔ get information',
      action: 'Contact when convenient'
    }
  ],
  
  locations: [
    {
      id: 'home',
      icon: '🏠',
      label_en: 'At Home',
      label_krio: 'Na Os',
      emoji: '🏡'
    },
    {
      id: 'school',
      icon: '🏫',
      label_en: 'At School',
      label_krio: 'Na Skul',
      emoji: '📚'
    },
    {
      id: 'work',
      icon: '🏢',
      label_en: 'At Work',
      label_krio: 'Na Wok',
      emoji: '💼'
    },
    {
      id: 'public',
      icon: '🚶',
      label_en: 'Public Place',
      label_krio: 'Public Ples',
      emoji: '🛣️'
    },
    {
      id: 'other',
      icon: '📍',
      label_en: 'Other Place',
      label_krio: 'Ɔda Ples',
      emoji: '🗺️'
    }
  ],
  
  relationship: [
    {
      id: 'intimate_partner',
      icon: '💑',
      label_en: 'Husband/Boyfriend/Partner',
      label_krio: 'Husband/Boyfriend/Partner',
      emoji: '👫'
    },
    {
      id: 'family',
      icon: '👨‍👩‍👧‍👦',
      label_en: 'Family Member',
      label_krio: 'Family Memba',
      emoji: '👪'
    },
    {
      id: 'known',
      icon: '👤',
      label_en: 'Someone I Know',
      label_krio: 'Pɔsin We A Sabi',
      emoji: '🙋'
    },
    {
      id: 'stranger',
      icon: '❓',
      label_en: 'Stranger',
      label_krio: 'Pɔsin We A No Sabi',
      emoji: '🚶‍♂️'
    },
    {
      id: 'unknown',
      icon: '🤷',
      label_en: 'Don\'t Want to Say',
      label_krio: 'A No Want Fɔ Tok',
      emoji: '🤐'
    }
  ]
};

let pictureReportData = {
  violence_type: null,
  urgency: null,
  location: null,
  relationship: null,
  voice_description: null
};

let currentLanguage = 'en';

function showPictureBasedReport() {
  // Get language from voice navigation if available
  if (typeof window.currentLanguage !== 'undefined') {
    currentLanguage = window.currentLanguage;
  }
  
  const modalHTML = `
    <div id="picture-report-modal" class="fixed inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center z-50 overflow-y-auto p-4">
      <!-- Header with Voice Button -->
      <div class="fixed top-4 left-4 right-4 z-60 flex justify-between items-center">
        <button onclick="closePictureReport()" 
                class="px-6 py-3 bg-red-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-red-700">
          <i class="fas fa-times mr-2"></i>
          CLOSE
        </button>
        <button onclick="speakInstructions()" 
                class="px-6 py-3 bg-green-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-green-700 animate-pulse">
          <i class="fas fa-volume-up mr-2"></i>
          HEAR HELP
        </button>
        <button onclick="toggleReportLanguage()" 
                class="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700">
          <i class="fas fa-language mr-2"></i>
          ${currentLanguage === 'en' ? 'KRIO' : 'ENGLISH'}
        </button>
      </div>
      
      <!-- Main Content -->
      <div class="w-full max-w-6xl mt-24 mb-8">
        <!-- Progress Bar -->
        <div class="bg-white bg-opacity-20 rounded-full h-4 mb-8">
          <div id="picture-report-progress" class="bg-green-400 h-4 rounded-full transition-all" style="width: 0%"></div>
        </div>
        
        <!-- Step Container -->
        <div id="picture-report-steps" class="bg-white rounded-3xl shadow-2xl p-8">
          ${renderStep1ViolenceType()}
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6" id="picture-nav-buttons">
          <button onclick="previousStep()" 
                  id="prev-btn"
                  class="px-8 py-4 bg-gray-500 text-white rounded-2xl font-bold text-xl hidden hover:bg-gray-600">
            <i class="fas fa-arrow-left mr-2"></i>
            BACK
          </button>
          <button onclick="nextStep()" 
                  id="next-btn"
                  class="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-xl ml-auto hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled>
            NEXT
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Auto-speak instructions
  setTimeout(() => speakInstructions(), 500);
}

function renderStep1ViolenceType() {
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-hand-paper text-red-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'What Happened?' : 'Wetin Happen?'}
      </h2>
      <p class="text-xl text-gray-600">
        ${currentLanguage === 'en' ? 'Click the picture that shows what happened to you' : 'Click di picture we show wetin happen to yu'}
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      ${pictureCategories.violence_types.map(type => `
        <button onclick="selectViolenceType('${type.id}')" 
                data-type="${type.id}"
                class="violence-type-btn p-6 border-4 border-gray-300 rounded-3xl hover:border-${type.color}-500 hover:bg-${type.color}-50 transition-all transform hover:scale-105 active:scale-95">
          <div class="text-center">
            <div class="text-8xl mb-4">${type.icon}</div>
            <div class="text-6xl mb-4">${type.emoji}</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">
              ${type['label_' + currentLanguage]}
            </h3>
            <p class="text-sm text-gray-600">
              ${type['description_' + currentLanguage]}
            </p>
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

function renderStep2Urgency() {
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'How Urgent?' : 'Aw E Urgent?'}
      </h2>
      <p class="text-xl text-gray-600">
        ${currentLanguage === 'en' ? 'Do you need help right now?' : 'Yu nid help now now?'}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${pictureCategories.urgency_levels.map(level => `
        <button onclick="selectUrgency('${level.id}')" 
                data-urgency="${level.id}"
                class="urgency-btn p-8 border-4 border-gray-300 rounded-3xl hover:border-${level.color}-500 hover:bg-${level.color}-50 transition-all transform hover:scale-105 active:scale-95">
          <div class="text-center">
            <div class="text-9xl mb-6">${level.icon}</div>
            <h3 class="text-3xl font-bold text-gray-800 mb-4">
              ${level['label_' + currentLanguage]}
            </h3>
            <p class="text-lg text-gray-600 mb-4">
              ${level['description_' + currentLanguage]}
            </p>
            <div class="text-sm font-semibold text-${level.color}-700 bg-${level.color}-100 py-2 px-4 rounded-full">
              ${level.action}
            </div>
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

function renderStep3Location() {
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-map-marker-alt text-blue-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'Where Did It Happen?' : 'Usai E Happen?'}
      </h2>
      <p class="text-xl text-gray-600">
        ${currentLanguage === 'en' ? 'Click the picture that shows where' : 'Click di picture we show usai'}
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
      ${pictureCategories.locations.map(loc => `
        <button onclick="selectLocation('${loc.id}')" 
                data-location="${loc.id}"
                class="location-btn p-6 border-4 border-gray-300 rounded-3xl hover:border-blue-500 hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95">
          <div class="text-center">
            <div class="text-8xl mb-4">${loc.icon}</div>
            <div class="text-6xl mb-4">${loc.emoji}</div>
            <h3 class="text-xl font-bold text-gray-800">
              ${loc['label_' + currentLanguage]}
            </h3>
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

function renderStep4Relationship() {
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-users text-purple-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'Who Did This?' : 'Udat Du Dis?'}
      </h2>
      <p class="text-xl text-gray-600">
        ${currentLanguage === 'en' ? 'What is your relationship with this person?' : 'Aw yu sabi dis pɔsin?'}
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
      ${pictureCategories.relationship.map(rel => `
        <button onclick="selectRelationship('${rel.id}')" 
                data-relationship="${rel.id}"
                class="relationship-btn p-6 border-4 border-gray-300 rounded-3xl hover:border-purple-500 hover:bg-purple-50 transition-all transform hover:scale-105 active:scale-95">
          <div class="text-center">
            <div class="text-8xl mb-4">${rel.icon}</div>
            <div class="text-6xl mb-4">${rel.emoji}</div>
            <h3 class="text-xl font-bold text-gray-800">
              ${rel['label_' + currentLanguage]}
            </h3>
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

function renderStep5VoiceDescription() {
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-microphone text-red-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'Tell Your Story' : 'Tok Yu Story'}
      </h2>
      <p class="text-xl text-gray-600 mb-6">
        ${currentLanguage === 'en' ? 'Speak to tell us more. Press the button and talk.' : 'Tok fɔ tel wi mɔ. Press di button en tok.'}
      </p>
    </div>
    
    <div class="bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-200 rounded-3xl p-12 text-center">
      <button onclick="startVoiceRecording()" 
              id="voice-record-btn"
              class="w-48 h-48 bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 active:scale-95 mx-auto flex items-center justify-center flex-col mb-6">
        <i class="fas fa-microphone text-7xl mb-4"></i>
        <span class="text-2xl font-bold">
          ${currentLanguage === 'en' ? 'SPEAK' : 'TOK'}
        </span>
      </button>
      
      <div id="voice-status" class="text-2xl font-bold text-gray-700 mb-4">
        ${currentLanguage === 'en' ? 'Press button to speak' : 'Press button fɔ tok'}
      </div>
      
      <div id="voice-transcript" class="bg-white rounded-2xl p-6 text-xl text-gray-800 min-h-[100px] max-h-[300px] overflow-y-auto hidden"></div>
      
      <button onclick="skipVoiceRecording()" 
              class="mt-6 px-8 py-4 bg-gray-400 text-white rounded-2xl font-bold text-xl hover:bg-gray-500">
        ${currentLanguage === 'en' ? 'Skip This Step' : 'Skip Dis Step'}
      </button>
    </div>
  `;
}

function renderStep6Confirmation() {
  const violenceType = pictureCategories.violence_types.find(v => v.id === pictureReportData.violence_type);
  const urgency = pictureCategories.urgency_levels.find(u => u.id === pictureReportData.urgency);
  const location = pictureCategories.locations.find(l => l.id === pictureReportData.location);
  const relationship = pictureCategories.relationship.find(r => r.id === pictureReportData.relationship);
  
  return `
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        <i class="fas fa-check-circle text-green-600 mr-3"></i>
        ${currentLanguage === 'en' ? 'Confirm Your Report' : 'Confirm Yu Report'}
      </h2>
      <p class="text-xl text-gray-600">
        ${currentLanguage === 'en' ? 'Please check if everything is correct' : 'Check if ɔltin correct'}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          ${currentLanguage === 'en' ? 'What Happened' : 'Wetin Happen'}
        </h3>
        <div class="text-6xl mb-3">${violenceType?.icon}</div>
        <div class="text-xl font-semibold">${violenceType?.['label_' + currentLanguage]}</div>
      </div>
      
      <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          ${currentLanguage === 'en' ? 'How Urgent' : 'Aw E Urgent'}
        </h3>
        <div class="text-6xl mb-3">${urgency?.icon}</div>
        <div class="text-xl font-semibold">${urgency?.['label_' + currentLanguage]}</div>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          ${currentLanguage === 'en' ? 'Where' : 'Usai'}
        </h3>
        <div class="text-6xl mb-3">${location?.icon}</div>
        <div class="text-xl font-semibold">${location?.['label_' + currentLanguage]}</div>
      </div>
      
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          ${currentLanguage === 'en' ? 'Who' : 'Udat'}
        </h3>
        <div class="text-6xl mb-3">${relationship?.icon}</div>
        <div class="text-xl font-semibold">${relationship?.['label_' + currentLanguage]}</div>
      </div>
    </div>
    
    <button onclick="submitPictureReport()" 
            class="w-full px-12 py-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-3xl font-bold text-3xl hover:from-green-700 hover:to-teal-700 shadow-xl transform hover:scale-105 active:scale-95">
      <i class="fas fa-paper-plane mr-4"></i>
      ${currentLanguage === 'en' ? 'SEND REPORT' : 'SEND REPORT'}
    </button>
  `;
}

let currentStep = 1;
const totalSteps = 6;

function selectViolenceType(typeId) {
  pictureReportData.violence_type = typeId;
  
  // Highlight selected
  document.querySelectorAll('.violence-type-btn').forEach(btn => {
    btn.classList.remove('border-red-500', 'bg-red-50');
    if (btn.dataset.type === typeId) {
      btn.classList.add('border-red-500', 'bg-red-50');
    }
  });
  
  // Enable next button
  document.getElementById('next-btn').disabled = false;
  
  // Speak selection
  const type = pictureCategories.violence_types.find(t => t.id === typeId);
  if (typeof speakText === 'function') {
    speakText(type['label_' + currentLanguage]);
  }
}

function selectUrgency(urgencyId) {
  pictureReportData.urgency = urgencyId;
  
  document.querySelectorAll('.urgency-btn').forEach(btn => {
    btn.classList.remove('border-red-500', 'border-orange-500', 'border-blue-500');
    if (btn.dataset.urgency === urgencyId) {
      const level = pictureCategories.urgency_levels.find(u => u.id === urgencyId);
      btn.classList.add(`border-${level.color}-500`);
    }
  });
  
  document.getElementById('next-btn').disabled = false;
}

function selectLocation(locationId) {
  pictureReportData.location = locationId;
  
  document.querySelectorAll('.location-btn').forEach(btn => {
    btn.classList.remove('border-blue-500', 'bg-blue-50');
    if (btn.dataset.location === locationId) {
      btn.classList.add('border-blue-500', 'bg-blue-50');
    }
  });
  
  document.getElementById('next-btn').disabled = false;
}

function selectRelationship(relationshipId) {
  pictureReportData.relationship = relationshipId;
  
  document.querySelectorAll('.relationship-btn').forEach(btn => {
    btn.classList.remove('border-purple-500', 'bg-purple-50');
    if (btn.dataset.relationship === relationshipId) {
      btn.classList.add('border-purple-500', 'bg-purple-50');
    }
  });
  
  document.getElementById('next-btn').disabled = false;
}

function nextStep() {
  currentStep++;
  updateProgress();
  
  const container = document.getElementById('picture-report-steps');
  
  switch(currentStep) {
    case 2:
      container.innerHTML = renderStep2Urgency();
      document.getElementById('prev-btn').classList.remove('hidden');
      break;
    case 3:
      container.innerHTML = renderStep3Location();
      break;
    case 4:
      container.innerHTML = renderStep4Relationship();
      break;
    case 5:
      container.innerHTML = renderStep5VoiceDescription();
      document.getElementById('next-btn').textContent = currentLanguage === 'en' ? 'FINISH' : 'FINISH';
      break;
    case 6:
      container.innerHTML = renderStep6Confirmation();
      document.getElementById('next-btn').classList.add('hidden');
      break;
  }
  
  // Disable next button until selection made
  if (currentStep < 6) {
    document.getElementById('next-btn').disabled = true;
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
    
    const container = document.getElementById('picture-report-steps');
    
    switch(currentStep) {
      case 1:
        container.innerHTML = renderStep1ViolenceType();
        document.getElementById('prev-btn').classList.add('hidden');
        break;
      case 2:
        container.innerHTML = renderStep2Urgency();
        break;
      case 3:
        container.innerHTML = renderStep3Location();
        break;
      case 4:
        container.innerHTML = renderStep4Relationship();
        break;
      case 5:
        container.innerHTML = renderStep5VoiceDescription();
        break;
    }
    
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('next-btn').disabled = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById('picture-report-progress').style.width = progress + '%';
}

function startVoiceRecording() {
  // Use existing voice recording if available
  if (typeof startRecording === 'function') {
    startRecording();
  } else {
    alert(currentLanguage === 'en' ? 
      'Voice recording will be enabled in production. For now, you can type or skip this step.' :
      'Voice recording go dɛ enable na production. For now, yu fit type ɔ skip dis step.');
  }
  
  document.getElementById('next-btn').disabled = false;
}

function skipVoiceRecording() {
  pictureReportData.voice_description = null;
  nextStep();
}

function submitPictureReport() {
  // Show success message
  alert(`✅ ${currentLanguage === 'en' ? 
    'Report Submitted Successfully!\n\nYour case number is: GBV-' + Date.now().toString().slice(-6) + '\n\nKeep this number safe. Someone will contact you soon.' :
    'Report Don Submit Successfully!\n\nYu case number na: GBV-' + Date.now().toString().slice(-6) + '\n\nKeep dis number safe. Somebody go contact yu sun.'
  }`);
  
  // Close modal
  closePictureReport();
  
  // In production, this would submit to the database
  console.log('Picture Report Submitted:', pictureReportData);
}

function speakInstructions() {
  const text = currentLanguage === 'en' ?
    'Welcome. This is a simple way to report. Click the pictures that match what happened to you. Everything is private and safe. You can get help anytime by calling one one six.' :
    'Welcome. Dis na simple way fɔ report. Click di pictures we match wetin happen to yu. Ɔltin na private en safe. Yu fit get help anytime by calling wan wan siks.';
  
  if (typeof speakText === 'function') {
    speakText(text);
  } else {
    alert(text);
  }
}

function toggleReportLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'krio' : 'en';
  
  // Reload current step with new language
  const container = document.getElementById('picture-report-steps');
  
  switch(currentStep) {
    case 1:
      container.innerHTML = renderStep1ViolenceType();
      break;
    case 2:
      container.innerHTML = renderStep2Urgency();
      break;
    case 3:
      container.innerHTML = renderStep3Location();
      break;
    case 4:
      container.innerHTML = renderStep4Relationship();
      break;
    case 5:
      container.innerHTML = renderStep5VoiceDescription();
      break;
    case 6:
      container.innerHTML = renderStep6Confirmation();
      break;
  }
  
  // Update language button
  document.querySelector('[onclick="toggleReportLanguage()"]').innerHTML = 
    `<i class="fas fa-language mr-2"></i>${currentLanguage === 'en' ? 'KRIO' : 'ENGLISH'}`;
}

function closePictureReport() {
  document.getElementById('picture-report-modal')?.remove();
  
  // Reset data
  pictureReportData = {
    violence_type: null,
    urgency: null,
    location: null,
    relationship: null,
    voice_description: null
  };
  currentStep = 1;
}

console.log('✅ Accessibility Picture-Based Reporting loaded successfully');
