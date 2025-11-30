/**
 * Interactive Voice Interview System
 * Guides users through questions and auto-fills case report form
 */

console.log('🎤 Interactive Voice Interview System loaded');

// Interview state
window.voiceInterview = {
    isActive: false,
    currentQuestion: 0,
    responses: {},
    recognition: null,
    synthesis: null,
    autoSubmit: false
};

// Question flow with follow-ups
const interviewQuestions = [
    {
        id: 'language',
        text: 'Hello. Thank you for contacting us. What language would you like to use? Say English, Krio, Mende, or Temne.',
        textKrio: 'Alo. Tenki fɔ kɔntakt wi. Wetin langwej yu want yuz? Tok Inglis, Krio, Mende, ɔ Temne.',
        field: 'language',
        type: 'choice',
        options: ['english', 'krio', 'mende', 'temne'],
        required: true
    },
    {
        id: 'incident_date',
        text: 'When did this incident happen? You can say today, yesterday, last week, or tell me the specific date.',
        textKrio: 'Wɛn dis tin apin? Yu kin se tide, yestade, las wik, ɔ tɛl mi di spɛsifik det.',
        field: 'incident_date',
        type: 'date',
        required: true
    },
    {
        id: 'district',
        text: 'Which district did this happen in? For example, Freetown, Bo, Kenema, or another district.',
        textKrio: 'Na wetin distrikt dis tin apin? Fɔ ɛgzampul, Frɛntɔn, Bo, Kenema, ɔ ɔda distrikt.',
        field: 'district',
        type: 'district',
        required: true
    },
    {
        id: 'violence_type',
        text: 'What type of violence occurred? You can say rape, sexual assault, domestic violence, child abuse, or other.',
        textKrio: 'Wetin kayn vaiolɛns apin? Yu kin se rep, sɛkshual asɔlt, dɔmɛstik vaiolɛns, pikin abyus, ɔ ɔda.',
        field: 'gbv_type',
        type: 'violence_type',
        required: true
    },
    {
        id: 'survivor_age',
        text: 'How old is the survivor? You can give an approximate age if exact age is unknown.',
        textKrio: 'Aw ol na di pɔsin we dis tin apin to am? Yu kin gi aprɔksimet ej if yu nɔ no di ɛgzat ej.',
        field: 'survivor_age',
        type: 'number',
        required: false
    },
    {
        id: 'description',
        text: 'Please describe what happened in as much detail as you feel comfortable sharing. Take your time.',
        textKrio: 'Duya diskreyb wetin apin wit ɔl di ditel we yu fil kɔmfɔtebul fɔ shɛr. Tek yu tɛm.',
        field: 'description',
        type: 'long_text',
        required: true
    },
    {
        id: 'injuries',
        text: 'Are there any physical injuries? Say yes or no, and describe if yes.',
        textKrio: 'Ɛni fizikul injri de? Se yɛs ɔ no, ɛn diskreyb if yɛs.',
        field: 'has_injuries',
        type: 'yes_no',
        required: false
    },
    {
        id: 'medical_help',
        text: 'Has the survivor received medical help? Say yes or no.',
        textKrio: 'Di pɔsin we dis tin apin to am dɔn gɛt mɛdikal ɛlp? Se yɛs ɔ no.',
        field: 'medical_help_received',
        type: 'yes_no',
        required: false
    },
    {
        id: 'urgent',
        text: 'Is this an emergency requiring immediate help? Say yes or no.',
        textKrio: 'Dis na ɛmajɛnsi we nid imidiet ɛlp? Se yɛs ɔ no.',
        field: 'is_urgent',
        type: 'yes_no',
        required: true
    },
    {
        id: 'contact_info',
        text: 'Would you like to provide contact information for follow-up? This is optional. Say yes to provide details, or no to remain anonymous.',
        textKrio: 'Yu want gi kɔntakt infɔmeshɔn fɔ fala-ɔp? Dis na ɔpshɔnal. Se yɛs fɔ gi ditel, ɔ no fɔ rimen anɔnimas.',
        field: 'provide_contact',
        type: 'yes_no',
        required: false
    }
];

// District mapping
const districtMapping = {
    'freetown': 'Western Area Urban',
    'western area urban': 'Western Area Urban',
    'western urban': 'Western Area Urban',
    'western area rural': 'Western Area Rural',
    'western rural': 'Western Area Rural',
    'bo': 'Bo',
    'kenema': 'Kenema',
    'kailahun': 'Kailahun',
    'kono': 'Kono',
    'bombali': 'Bombali',
    'port loko': 'Port Loko',
    'tonkolili': 'Tonkolili',
    'kambia': 'Kambia',
    'moyamba': 'Moyamba',
    'pujehun': 'Pujehun',
    'bonthe': 'Bonthe',
    'karene': 'Karene',
    'falaba': 'Falaba',
    'koinadugu': 'Koinadugu'
};

// Violence type mapping
const violenceTypeMapping = {
    'rape': 'Rape',
    'sexual assault': 'Sexual Assault',
    'sexual abuse': 'Sexual Assault',
    'domestic violence': 'Domestic Violence',
    'domestic abuse': 'Domestic Violence',
    'child abuse': 'Child Abuse',
    'child sexual abuse': 'Child Abuse',
    'fgm': 'FGM/C',
    'female genital mutilation': 'FGM/C',
    'early marriage': 'Early/Forced Marriage',
    'forced marriage': 'Early/Forced Marriage',
    'other': 'Other'
};

// Initialize voice interview
function initVoiceInterview() {
    console.log('🎙️ Initializing voice interview...');
    
    // Check for Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;
    
    if (!SpeechRecognition) {
        console.warn('⚠️ Speech Recognition not supported in this browser');
        return false;
    }
    
    if (!SpeechSynthesis) {
        console.warn('⚠️ Speech Synthesis not supported in this browser');
        return false;
    }
    
    // Initialize recognition
    window.voiceInterview.recognition = new SpeechRecognition();
    window.voiceInterview.recognition.continuous = false;
    window.voiceInterview.recognition.interimResults = false;
    window.voiceInterview.recognition.lang = 'en-US';
    
    // Initialize synthesis
    window.voiceInterview.synthesis = SpeechSynthesis;
    
    console.log('✅ Voice interview initialized');
    return true;
}

// Start interactive voice interview
function startVoiceInterview() {
    console.log('🎬 Starting voice interview...');
    
    if (!initVoiceInterview()) {
        showError('Voice interview is not supported in your browser. Please use the form instead.');
        return;
    }
    
    // Reset state
    window.voiceInterview.isActive = true;
    window.voiceInterview.currentQuestion = 0;
    window.voiceInterview.responses = {};
    
    // Show interview interface
    showInterviewInterface();
    
    // Start first question
    askQuestion(0);
}

// Show interview interface
function showInterviewInterface() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-comments mr-3"></i>Interactive Voice Interview
                        </h2>
                        <p class="text-blue-100">I'll guide you through some questions to report the incident</p>
                    </div>
                    <button onclick="cancelVoiceInterview()" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-opacity">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                </div>
            </div>
            
            <!-- Progress -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-600">Progress</span>
                    <span class="text-sm font-medium text-gray-900">
                        Question <span id="current-question-num">1</span> of ${interviewQuestions.length}
                    </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div id="progress-bar" class="h-3 rounded-full transition-all duration-500" 
                         style="width: 0%; background-color: #32cd32;"></div>
                </div>
            </div>
            
            <!-- Interview Card -->
            <div class="bg-white rounded-lg shadow-xl p-8 mb-6">
                <!-- Question Display -->
                <div id="question-display" class="mb-8">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center" 
                                 style="background: linear-gradient(135deg, #32cd32, #1e3a8a);">
                                <i class="fas fa-question text-2xl text-white"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="bg-blue-50 rounded-lg p-6 mb-4">
                                <p id="question-text" class="text-xl text-gray-800 leading-relaxed"></p>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-gray-500">
                                <i class="fas fa-info-circle"></i>
                                <span>Speak clearly after clicking "Start Answer"</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Voice Input Status -->
                <div id="voice-status" class="mb-6">
                    <div id="status-listening" class="hidden">
                        <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
                            <div class="relative inline-block mb-3">
                                <i class="fas fa-microphone text-5xl text-red-600"></i>
                                <div class="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                            </div>
                            <p class="text-lg font-semibold text-red-600">Listening...</p>
                            <p class="text-sm text-gray-600 mt-2">Speak your answer now</p>
                        </div>
                    </div>
                    
                    <div id="status-processing" class="hidden">
                        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                            <i class="fas fa-spinner fa-spin text-5xl text-blue-600 mb-3"></i>
                            <p class="text-lg font-semibold text-blue-600">Processing...</p>
                        </div>
                    </div>
                </div>
                
                <!-- Response Display -->
                <div id="response-display" class="hidden mb-6">
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3 mt-1"></i>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-green-800 mb-1">You said:</p>
                                <p id="response-text" class="text-gray-800"></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Controls -->
                <div id="interview-controls" class="flex justify-center space-x-4">
                    <button id="start-answer-btn" onclick="startListening()" 
                            class="px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
                            style="background-color: #32cd32;">
                        <i class="fas fa-microphone mr-2"></i>Start Answer
                    </button>
                    
                    <button id="next-question-btn" onclick="nextQuestion()" 
                            class="hidden px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
                            style="background-color: #1e3a8a;">
                        <i class="fas fa-arrow-right mr-2"></i>Next Question
                    </button>
                    
                    <button id="repeat-question-btn" onclick="repeatQuestion()" 
                            class="px-6 py-4 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors">
                        <i class="fas fa-redo mr-2"></i>Repeat Question
                    </button>
                </div>
            </div>
            
            <!-- Help Card -->
            <div class="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
                <div class="flex items-start">
                    <i class="fas fa-lightbulb text-yellow-600 text-2xl mr-4 mt-1"></i>
                    <div>
                        <h4 class="font-semibold text-yellow-800 mb-2">Tips for Voice Interview:</h4>
                        <ul class="text-sm text-yellow-700 space-y-1">
                            <li>• Speak clearly and at a normal pace</li>
                            <li>• Find a quiet place with minimal background noise</li>
                            <li>• You can repeat or correct your answer before moving on</li>
                            <li>• All information is confidential and secure</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Ask a question
function askQuestion(questionIndex) {
    const question = interviewQuestions[questionIndex];
    if (!question) {
        // All questions answered - review and submit
        showReviewScreen();
        return;
    }
    
    console.log(`📝 Asking question ${questionIndex + 1}:`, question.text);
    
    // Update UI
    document.getElementById('current-question-num').textContent = questionIndex + 1;
    document.getElementById('question-text').textContent = question.text;
    
    // Update progress bar
    const progress = ((questionIndex + 1) / interviewQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    
    // Speak the question
    speakText(question.text);
    
    // Show start answer button
    document.getElementById('start-answer-btn').classList.remove('hidden');
    document.getElementById('next-question-btn').classList.add('hidden');
    document.getElementById('response-display').classList.add('hidden');
}

// Speak text using speech synthesis
function speakText(text) {
    if (!window.voiceInterview.synthesis) return;
    
    // Cancel any ongoing speech
    window.voiceInterview.synthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Speak
    window.voiceInterview.synthesis.speak(utterance);
}

// Start listening for answer
function startListening() {
    console.log('🎤 Starting to listen...');
    
    if (!window.voiceInterview.recognition) {
        showError('Speech recognition not available');
        return;
    }
    
    // Show listening status
    document.getElementById('status-listening').classList.remove('hidden');
    document.getElementById('status-processing').classList.add('hidden');
    document.getElementById('start-answer-btn').classList.add('hidden');
    
    // Setup recognition handlers
    window.voiceInterview.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('📝 Recognized:', transcript);
        handleAnswer(transcript);
    };
    
    window.voiceInterview.recognition.onerror = (event) => {
        console.error('❌ Recognition error:', event.error);
        document.getElementById('status-listening').classList.add('hidden');
        document.getElementById('start-answer-btn').classList.remove('hidden');
        showError('Could not understand. Please try again.');
    };
    
    window.voiceInterview.recognition.onend = () => {
        document.getElementById('status-listening').classList.add('hidden');
    };
    
    // Start recognition
    window.voiceInterview.recognition.start();
}

// Handle answer
function handleAnswer(transcript) {
    console.log('✅ Processing answer:', transcript);
    
    // Show processing
    document.getElementById('status-processing').classList.remove('hidden');
    
    const currentQuestion = interviewQuestions[window.voiceInterview.currentQuestion];
    
    // Process answer based on question type
    let processedAnswer = processAnswer(transcript, currentQuestion);
    
    // Store response
    window.voiceInterview.responses[currentQuestion.field] = processedAnswer;
    
    // Show response
    setTimeout(() => {
        document.getElementById('status-processing').classList.add('hidden');
        document.getElementById('response-display').classList.remove('hidden');
        document.getElementById('response-text').textContent = transcript;
        document.getElementById('next-question-btn').classList.remove('hidden');
        
        // Auto-advance for yes/no questions
        if (currentQuestion.type === 'yes_no') {
            setTimeout(() => nextQuestion(), 1500);
        }
    }, 800);
}

// Process answer based on question type
function processAnswer(transcript, question) {
    const lowerTranscript = transcript.toLowerCase().trim();
    
    switch (question.type) {
        case 'date':
            return parseDateFromSpeech(lowerTranscript);
        
        case 'district':
            return parseDistrict(lowerTranscript);
        
        case 'violence_type':
            return parseViolenceType(lowerTranscript);
        
        case 'number':
            return parseNumber(lowerTranscript);
        
        case 'yes_no':
            return parseYesNo(lowerTranscript);
        
        case 'choice':
            return lowerTranscript;
        
        default:
            return transcript;
    }
}

// Parse date from speech
function parseDateFromSpeech(text) {
    if (text.includes('today')) {
        return new Date().toISOString().split('T')[0];
    } else if (text.includes('yesterday')) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    } else if (text.includes('last week')) {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return lastWeek.toISOString().split('T')[0];
    }
    
    // Try to extract date from text (basic parsing)
    const dateMatch = text.match(/(\d{1,2}).*?(january|february|march|april|may|june|july|august|september|october|november|december)/i);
    if (dateMatch) {
        const day = dateMatch[1];
        const month = new Date(Date.parse(dateMatch[2] + " 1, 2025")).getMonth();
        const year = new Date().getFullYear();
        return new Date(year, month, parseInt(day)).toISOString().split('T')[0];
    }
    
    // Default to today if can't parse
    return new Date().toISOString().split('T')[0];
}

// Parse district
function parseDistrict(text) {
    for (const [key, value] of Object.entries(districtMapping)) {
        if (text.includes(key)) {
            return value;
        }
    }
    return 'Western Area Urban'; // Default
}

// Parse violence type
function parseViolenceType(text) {
    for (const [key, value] of Object.entries(violenceTypeMapping)) {
        if (text.includes(key)) {
            return value;
        }
    }
    return 'Other'; // Default
}

// Parse number from speech
function parseNumber(text) {
    const numberWords = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
        'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
        'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
        'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };
    
    // Try direct number
    const directNumber = parseInt(text);
    if (!isNaN(directNumber)) {
        return directNumber;
    }
    
    // Try word to number
    for (const [word, num] of Object.entries(numberWords)) {
        if (text.includes(word)) {
            return num;
        }
    }
    
    return null;
}

// Parse yes/no
function parseYesNo(text) {
    if (text.includes('yes') || text.includes('yeah') || text.includes('yea')) {
        return 'Yes';
    } else if (text.includes('no') || text.includes('nope')) {
        return 'No';
    }
    return 'Unknown';
}

// Next question
function nextQuestion() {
    window.voiceInterview.currentQuestion++;
    askQuestion(window.voiceInterview.currentQuestion);
}

// Repeat question
function repeatQuestion() {
    const currentQuestion = interviewQuestions[window.voiceInterview.currentQuestion];
    speakText(currentQuestion.text);
}

// Show review screen
function showReviewScreen() {
    console.log('📋 Showing review screen');
    speakText('Thank you. Let me review the information you provided.');
    
    const container = document.getElementById('dashboard-content');
    const responses = window.voiceInterview.responses;
    
    // Determine resources based on violence type
    const resources = determineResources(responses);
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-6">
                <h2 class="text-3xl font-bold mb-2">
                    <i class="fas fa-clipboard-check mr-3"></i>Review Your Report
                </h2>
                <p class="text-blue-100">Please review the information before submitting</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h3 class="text-xl font-bold mb-4 text-gray-800">Case Information</h3>
                
                <div class="space-y-4">
                    ${Object.entries(responses).map(([key, value]) => {
                        const question = interviewQuestions.find(q => q.field === key);
                        return `
                            <div class="border-b pb-3">
                                <div class="text-sm font-medium text-gray-500">${question?.text || key}</div>
                                <div class="text-lg text-gray-900 mt-1">${value || 'Not provided'}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <!-- Recommended Resources -->
            <div class="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 class="text-lg font-bold mb-4 text-blue-900">
                    <i class="fas fa-hands-helping mr-2"></i>Recommended Resources
                </h3>
                <div class="space-y-3">
                    ${resources.map(resource => `
                        <div class="bg-white rounded-lg p-4 border-l-4" style="border-left-color: ${resource.color};">
                            <div class="flex items-start">
                                <i class="${resource.icon} text-2xl mr-3" style="color: ${resource.color};"></i>
                                <div>
                                    <div class="font-semibold text-gray-800">${resource.name}</div>
                                    <div class="text-sm text-gray-600">${resource.description}</div>
                                    <div class="text-sm font-medium mt-1" style="color: ${resource.color};">${resource.contact}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-center space-x-4">
                <button onclick="submitVoiceInterview()" 
                        class="px-10 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
                        style="background-color: #32cd32;">
                    <i class="fas fa-paper-plane mr-2"></i>Submit Report
                </button>
                <button onclick="startVoiceInterview()" 
                        class="px-6 py-4 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700">
                    <i class="fas fa-redo mr-2"></i>Start Over
                </button>
                <button onclick="cancelVoiceInterview()" 
                        class="px-6 py-4 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">
                    <i class="fas fa-times mr-2"></i>Cancel
                </button>
            </div>
        </div>
    `;
}

// Determine resources based on case details
function determineResources(responses) {
    const resources = [];
    const violenceType = responses.gbv_type || '';
    const isUrgent = responses.is_urgent === 'Yes';
    const needsMedical = responses.medical_help_received === 'No';
    
    // Always include 116 hotline
    resources.push({
        name: '116 GBV Hotline',
        description: 'Free 24/7 toll-free support hotline',
        contact: 'Call 116 (Toll-Free)',
        icon: 'fas fa-phone',
        color: '#32cd32'
    });
    
    // Rainbo Center for medical care
    if (needsMedical || violenceType.includes('Sexual') || violenceType.includes('Rape')) {
        resources.push({
            name: 'Rainbo Initiative Centre',
            description: 'Medical examination, treatment, and psychological support',
            contact: 'Nearest center in your district',
            icon: 'fas fa-hospital',
            color: '#3b82f6'
        });
    }
    
    // Police FSU for reporting
    if (violenceType.includes('Rape') || violenceType.includes('Sexual Assault') || isUrgent) {
        resources.push({
            name: 'Police Family Support Unit (FSU)',
            description: 'Report crime and get police protection',
            contact: 'Visit nearest FSU station or call 999',
            icon: 'fas fa-shield-alt',
            color: '#ef4444'
        });
    }
    
    // Legal aid
    resources.push({
        name: 'Legal Aid Services',
        description: 'Free legal advice and representation',
        contact: 'Contact through 116 hotline',
        icon: 'fas fa-gavel',
        color: '#9333ea'
    });
    
    // Safe house for urgent cases
    if (isUrgent) {
        resources.push({
            name: 'Safe House / Emergency Shelter',
            description: 'Temporary safe accommodation',
            contact: 'Arranged through 116 hotline',
            icon: 'fas fa-home',
            color: '#f59e0b'
        });
    }
    
    return resources;
}

// Submit voice interview
async function submitVoiceInterview() {
    console.log('📤 Submitting voice interview...');
    
    const submitButton = event.target;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
    
    try {
        const responses = window.voiceInterview.responses;
        
        // Prepare case data
        const caseData = {
            incident_date: responses.incident_date,
            district: responses.district,
            gbv_type: responses.gbv_type,
            survivor_age: responses.survivor_age,
            description: responses.description,
            priority: responses.is_urgent === 'Yes' ? 'urgent' : 'medium',
            source: 'voice_interview',
            notes: `Voice Interview - ${responses.has_injuries ? 'Has injuries. ' : ''}${responses.medical_help_received === 'No' ? 'Needs medical help. ' : ''}`
        };
        
        // Submit to API (would be real API call in production)
        console.log('📝 Case data:', caseData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate case number
        const caseNumber = 'GBV-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Show success
        showSuccessScreen(caseNumber);
        
        // Speak success message
        speakText(`Your report has been submitted successfully. Your case number is ${caseNumber}. Help is on the way.`);
        
    } catch (error) {
        console.error('❌ Error submitting:', error);
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Report';
        showError('Failed to submit report. Please try again.');
    }
}

// Show success screen
function showSuccessScreen(caseNumber) {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <div class="max-w-4xl mx-auto text-center">
            <div class="bg-white rounded-lg shadow-xl p-12">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" 
                     style="background-color: rgba(50, 205, 50, 0.2);">
                    <i class="fas fa-check-circle text-6xl" style="color: #32cd32;"></i>
                </div>
                
                <h2 class="text-3xl font-bold mb-4" style="color: #1e3a8a;">Report Submitted Successfully!</h2>
                
                <div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 inline-block">
                    <div class="text-sm text-gray-600 mb-1">Your Case Number:</div>
                    <div class="text-4xl font-bold" style="color: #32cd32;">${caseNumber}</div>
                </div>
                
                <p class="text-lg text-gray-700 mb-8">
                    Please save this case number for future reference. Our team has been notified and will respond soon.
                </p>
                
                <div class="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 class="font-bold text-lg mb-4" style="color: #1e3a8a;">Next Steps:</h3>
                    <div class="text-left space-y-3 text-gray-700">
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                            <span>A trained counselor will contact you within 24 hours</span>
                        </div>
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                            <span>Recommended services have been notified</span>
                        </div>
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                            <span>For emergencies, call 116 or 999 immediately</span>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-center space-x-4">
                    <button onclick="handleTabNavigation('Overview')" 
                            class="px-8 py-3 rounded-lg text-white font-semibold"
                            style="background-color: #1e3a8a;">
                        <i class="fas fa-home mr-2"></i>Back to Dashboard
                    </button>
                    <button onclick="startVoiceInterview()" 
                            class="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">
                        <i class="fas fa-plus mr-2"></i>Report Another Case
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Cancel voice interview
function cancelVoiceInterview() {
    if (confirm('Are you sure you want to cancel? Your progress will be lost.')) {
        window.voiceInterview.isActive = false;
        window.voiceInterview.synthesis?.cancel();
        window.voiceInterview.recognition?.stop();
        handleTabNavigation('Voice Report');
    }
}

// Show error
function showError(message) {
    alert(message);
}

// Export functions
window.startVoiceInterview = startVoiceInterview;
window.startListening = startListening;
window.nextQuestion = nextQuestion;
window.repeatQuestion = repeatQuestion;
window.submitVoiceInterview = submitVoiceInterview;
window.cancelVoiceInterview = cancelVoiceInterview;

console.log('✅ Voice Interview System ready');
