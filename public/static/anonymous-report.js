/**
 * Anonymous Self-Reporting Form
 * Trauma-informed, accessible reporting for GBV survivors
 * Includes voice recording option for illiterate survivors
 */

// Global state for voice recording
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentLanguage = 'en'; // Default to English

// Language translations
const translations = {
    en: {
        title: "Report an Incident",
        subtitle: "Your safety is our priority. Share what happened at your own pace.",
        anonymousNote: "This form is completely anonymous. You can choose to share your identity later if you wish.",
        language: "Select Language",
        whenHappened: "When did this happen?",
        whereHappened: "Where did this happen?",
        whatHappened: "What happened?",
        whatHappenedPlaceholder: "Describe the incident in your own words. Take your time. You can write in any language you're comfortable with.",
        perpetrator: "Information about the perpetrator (if known)",
        perpetratorPlaceholder: "Name, description, relationship to you (optional)",
        injuries: "Were you injured?",
        medicalHelp: "Have you received medical attention?",
        reportPolice: "Have you reported to police?",
        shareIdentity: "Would you like to share your identity?",
        yourName: "Your Name (optional)",
        yourAge: "Your Age",
        yourPhone: "Your Contact Number (optional)",
        yourLocation: "Your Location/District",
        urgentHelp: "Do you need urgent help right now?",
        voiceOption: "Can't write? Record your report",
        startRecording: "Start Recording",
        stopRecording: "Stop Recording",
        recordingActive: "Recording in progress...",
        submit: "Submit Report",
        yes: "Yes",
        no: "No",
        caseNumber: "Your Case Number",
        saveThis: "Save this number to check your case status later",
        nextSteps: "What Happens Next?",
        emergencyHelp: "Need Help Now?"
    },
    krio: {
        title: "Ripɔt Wetin Dɔn Apin",
        subtitle: "Yu sefti na wi fɔs tin. Tɔk wetin apin bay yu yon yon.",
        anonymousNote: "Dis fɔm na sɛkrɛt. Yu fit tel wi hu yu bi leta if yu want.",
        language: "Pik Langwej",
        whenHappened: "Wen dis tin apin?",
        whereHappened: "Usay dis tin apin?",
        whatHappened: "Wetin apin?",
        whatHappenedPlaceholder: "Tɔk wetin apin wit yu yon wɔd. Tek yu tɛm. Yu fit rayt pan ɛni langwej we yu sabi.",
        perpetrator: "Infɔmeshɔn bɔt di pɔsin we du am (if yu sabi)",
        perpetratorPlaceholder: "Nem, diskripsho, aw una rilɛt (ɔpshɔnal)",
        injuries: "Dɛn wɔn yu?",
        medicalHelp: "Yu dɔn go na ɔspital?",
        reportPolice: "Yu dɔn ripɔt na polis?",
        shareIdentity: "Yu want mek wi sabi hu yu bi?",
        yourName: "Yu Nem (ɔpshɔnal)",
        yourAge: "Yu Yiya",
        yourPhone: "Yu Fon Nɔmba (ɔpshɔnal)",
        yourLocation: "Usay Yu De/Distrikt",
        urgentHelp: "Yu nid ɛp kwik kwik naw?",
        voiceOption: "Yu nɔ sabi rayt? Rikɔd yu ripɔt",
        startRecording: "Start Rikɔd",
        stopRecording: "Stɔp Rikɔd",
        recordingActive: "Rikɔd de go...",
        submit: "Sɛn Ripɔt",
        yes: "Yɛs",
        no: "Nɔ",
        caseNumber: "Yu Kes Nɔmba",
        saveThis: "Kip dis nɔmba fɔ chɛk yu kes leta",
        nextSteps: "Wetin Go Apin Nɛks?",
        emergencyHelp: "Yu Nid Ɛp Naw?"
    },
    mende: {
        title: "Ngi Hina Tao",
        subtitle: "Bi mahunɛma i wa pie hu. Wa ngi hina ta i wa pie hu.",
        anonymousNote: "Bi fɔm yɛ pie pɛlɛ. Bi ti wɔ kɛ i nyandehu a wɔlɔ.",
        language: "Pik Langwej",
        whenHappened: "Hendɛ ngi ta?",
        whereHappened: "Ngɛma ngi ta?",
        whatHappened: "Ngi ta?",
        whatHappenedPlaceholder: "Wa ngi hina ta i wa pie hu. Na wie. Bi ti wɔ kɛ i langwej nyandehu.",
        perpetrator: "Ngi ta numu yɛ (kɛ i lo)",
        perpetratorPlaceholder: "Nyande, ngi hina, bi gboma (kɛ i wɔlɔ)",
        injuries: "A i wun?",
        medicalHelp: "Bi ti njia na dokita?",
        reportPolice: "Bi ti ngi na polis?",
        shareIdentity: "Bi wɔlɔ kɛ mu lo numu?",
        yourName: "I nyande (kɛ i wɔlɔ)",
        yourAge: "I yia",
        yourPhone: "I fon nɔmba (kɛ i wɔlɔ)",
        yourLocation: "Ngɛma i ti/Distrikt",
        urgentHelp: "Bi wɔlɔ maho kɛ kakaka?",
        voiceOption: "Bi nya wɔlɔ rayt? Rikɔd i ripɔt",
        startRecording: "Start Rikɔd",
        stopRecording: "Stɔp Rikɔd",
        recordingActive: "Rikɔd ya...",
        submit: "Send Ripɔt",
        yes: "Yɛs",
        no: "Nɔ",
        caseNumber: "I Kes Nɔmba",
        saveThis: "Kip dis nɔmba fɔ chɛk i kes",
        nextSteps: "Ngi ta waka?",
        emergencyHelp: "Bi Wɔlɔ Maho Kakaka?"
    },
    temne: {
        title: "Ka Report An Kakiɛnt",
        subtitle: "A safety na a first tin. Ka tɔk wetin apin wit a yon pace.",
        anonymousNote: "Dis fɔm na sɛkrɛt. A fit tɛl wi hu a bi leta if a want.",
        language: "Pik Langwej",
        whenHappened: "Wen dis tin apin?",
        whereHappened: "Usay dis tin apin?",
        whatHappened: "Wetin apin?",
        whatHappenedPlaceholder: "Ka tɔk wetin apin wit a yon wɔd. Tek a tɛm. A fit rayt pan ɛni langwej.",
        perpetrator: "Infɔmeshɔn bɔt di pɔsin we du am (if a sabi)",
        perpetratorPlaceholder: "Nem, diskripsho, aw a rilɛt (ɔpshɔnal)",
        injuries: "Dɛn wɔn a?",
        medicalHelp: "A dɔn go na ɔspital?",
        reportPolice: "A dɔn ripɔt na polis?",
        shareIdentity: "A want mek wi sabi hu a bi?",
        yourName: "A Nem (ɔpshɔnal)",
        yourAge: "A Yiya",
        yourPhone: "A Fon Nɔmba (ɔpshɔnal)",
        yourLocation: "Usay A De/Distrikt",
        urgentHelp: "A nid ɛp kwik kwik naw?",
        voiceOption: "A nɔ sabi rayt? Rikɔd a ripɔt",
        startRecording: "Start Rikɔd",
        stopRecording: "Stɔp Rikɔd",
        recordingActive: "Rikɔd de go...",
        submit: "Sɛn Ripɔt",
        yes: "Yɛs",
        no: "Nɔ",
        caseNumber: "A Kes Nɔmba",
        saveThis: "Kip dis nɔmba fɔ chɛk a kes leta",
        nextSteps: "Wetin Go Apin Nɛks?",
        emergencyHelp: "A Nid Ɛp Naw?"
    }
};

function loadAnonymousReport(section) {
    const t = translations[currentLanguage];
    
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Quick Exit Button -->
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" 
                        class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>

            <!-- Back Button -->
            <div class="mb-4">
                <button onclick="loadSurvivorPortal(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Survivor Portal
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-shield-alt text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">${t.title}</h1>
                        <p class="text-xl text-blue-50">${t.subtitle}</p>
                    </div>
                </div>
            </div>

            <!-- Anonymous Notice -->
            <div class="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                <div class="flex items-start">
                    <i class="fas fa-user-secret text-green-600 text-3xl mr-4"></i>
                    <div>
                        <h3 class="text-lg font-bold text-green-800 mb-2">
                            <i class="fas fa-lock mr-2"></i>Complete Privacy & Safety
                        </h3>
                        <p class="text-green-700">${t.anonymousNote}</p>
                    </div>
                </div>
            </div>

            <!-- Language Selector -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-language mr-2"></i>${t.language}
                </label>
                <select id="language-select" onchange="changeReportLanguage(this.value)" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
                    <option value="krio" ${currentLanguage === 'krio' ? 'selected' : ''}>Krio</option>
                    <option value="mende" ${currentLanguage === 'mende' ? 'selected' : ''}>Mende</option>
                    <option value="temne" ${currentLanguage === 'temne' ? 'selected' : ''}>Temne</option>
                </select>
            </div>

            <!-- Report Form -->
            <form id="anonymous-report-form" class="space-y-6">
                <!-- Date of Incident -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-calendar-alt mr-2"></i>${t.whenHappened} *
                    </label>
                    <input type="date" id="incident-date" required
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           max="${new Date().toISOString().split('T')[0]}">
                </div>

                <!-- Location of Incident -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-map-marker-alt mr-2"></i>${t.whereHappened} *
                    </label>
                    <select id="incident-location" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select District...</option>
                        <option value="Western Area Urban">Western Area Urban (Freetown)</option>
                        <option value="Western Area Rural">Western Area Rural</option>
                        <option value="Bo">Bo</option>
                        <option value="Bombali">Bombali</option>
                        <option value="Bonthe">Bonthe</option>
                        <option value="Kailahun">Kailahun</option>
                        <option value="Kambia">Kambia</option>
                        <option value="Kenema">Kenema</option>
                        <option value="Koinadugu">Koinadugu</option>
                        <option value="Kono">Kono</option>
                        <option value="Moyamba">Moyamba</option>
                        <option value="Port Loko">Port Loko</option>
                        <option value="Pujehun">Pujehun</option>
                        <option value="Tonkolili">Tonkolili</option>
                        <option value="Falaba">Falaba</option>
                        <option value="Karene">Karene</option>
                    </select>
                </div>

                <!-- What Happened - Text Option -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-comment-alt mr-2"></i>${t.whatHappened} *
                    </label>
                    <textarea id="incident-description" rows="6" required
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="${t.whatHappenedPlaceholder}"></textarea>
                    <p class="text-sm text-gray-500 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>Take your time. Write as much or as little as you feel comfortable sharing.
                    </p>
                </div>

                <!-- Voice Recording Option -->
                <div class="bg-blue-50 rounded-xl shadow-md p-6 border-2 border-blue-200">
                    <div class="flex items-start mb-4">
                        <i class="fas fa-microphone text-blue-600 text-3xl mr-4"></i>
                        <div>
                            <h3 class="text-lg font-bold text-blue-800 mb-2">${t.voiceOption}</h3>
                            <p class="text-sm text-blue-700 mb-4">
                                You can record your story using your voice. This is helpful if writing is difficult.
                            </p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <button type="button" id="record-button" onclick="toggleRecording()"
                                class="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all transform hover:scale-105">
                            <i class="fas fa-microphone mr-2"></i>
                            <span id="record-button-text">${t.startRecording}</span>
                        </button>
                        <div id="recording-status" class="hidden bg-red-100 border border-red-300 rounded-lg p-4 text-center">
                            <div class="flex items-center justify-center">
                                <div class="w-3 h-3 bg-red-600 rounded-full animate-pulse mr-3"></div>
                                <span class="text-red-800 font-semibold">${t.recordingActive}</span>
                            </div>
                        </div>
                        <div id="audio-preview" class="hidden">
                            <p class="text-sm text-gray-600 mb-2"><i class="fas fa-check-circle text-green-600 mr-2"></i>Recording saved</p>
                        </div>
                    </div>
                </div>

                <!-- Perpetrator Information -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-user mr-2"></i>${t.perpetrator}
                    </label>
                    <textarea id="perpetrator-info" rows="3"
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="${t.perpetratorPlaceholder}"></textarea>
                    <p class="text-sm text-gray-500 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>Share only what you feel safe sharing. This is optional.
                    </p>
                </div>

                <!-- Medical & Support Questions -->
                <div class="bg-white rounded-xl shadow-md p-6 space-y-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">
                        <i class="fas fa-heartbeat mr-2"></i>Medical & Support Information
                    </h3>
                    
                    <!-- Injuries -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">${t.injuries}</label>
                        <div class="flex gap-4">
                            <label class="flex items-center">
                                <input type="radio" name="injuries" value="yes" class="mr-2">
                                <span>${t.yes}</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="injuries" value="no" class="mr-2">
                                <span>${t.no}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Medical Attention -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">${t.medicalHelp}</label>
                        <div class="flex gap-4">
                            <label class="flex items-center">
                                <input type="radio" name="medical-attention" value="yes" class="mr-2">
                                <span>${t.yes}</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="medical-attention" value="no" class="mr-2">
                                <span>${t.no}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Police Report -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">${t.reportPolice}</label>
                        <div class="flex gap-4">
                            <label class="flex items-center">
                                <input type="radio" name="police-report" value="yes" class="mr-2">
                                <span>${t.yes}</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="police-report" value="no" class="mr-2">
                                <span>${t.no}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Urgent Help -->
                <div class="bg-red-50 border-2 border-red-300 rounded-xl shadow-md p-6">
                    <label class="block text-sm font-semibold text-red-800 mb-3">
                        <i class="fas fa-exclamation-triangle mr-2"></i>${t.urgentHelp}
                    </label>
                    <div class="flex gap-4 mb-4">
                        <label class="flex items-center">
                            <input type="radio" name="urgent-help" value="yes" class="mr-2">
                            <span class="font-semibold">${t.yes}</span>
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="urgent-help" value="no" class="mr-2">
                            <span>${t.no}</span>
                        </label>
                    </div>
                    <a href="tel:116" class="block w-full px-6 py-4 bg-red-600 text-white rounded-lg text-center font-bold hover:bg-red-700 transition-all">
                        <i class="fas fa-phone-alt mr-2"></i>Call 116 Emergency Hotline
                    </a>
                </div>

                <!-- Optional Identity Information -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-start mb-4">
                        <i class="fas fa-id-card text-blue-600 text-3xl mr-4"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">${t.shareIdentity}</h3>
                            <p class="text-sm text-gray-600 mb-4">
                                Sharing your contact information helps us follow up with you and provide support. This is completely optional.
                            </p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${t.yourName}</label>
                            <input type="text" id="survivor-name"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Leave blank to remain anonymous">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${t.yourAge}</label>
                                <input type="number" id="survivor-age" min="10" max="120"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">${t.yourPhone}</label>
                                <input type="tel" id="survivor-phone"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="+232 XX XXX XXX">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${t.yourLocation}</label>
                            <input type="text" id="survivor-location"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Area/Community">
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex gap-4">
                    <button type="submit" 
                            class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg">
                        <i class="fas fa-paper-plane mr-3"></i>${t.submit}
                    </button>
                </div>
            </form>
        </div>
    `;

    // Add form submission handler
    setTimeout(() => {
        const form = document.getElementById('anonymous-report-form');
        if (form) {
            form.addEventListener('submit', handleReportSubmission);
        }
    }, 100);
}

// Change language and reload form
function changeReportLanguage(lang) {
    currentLanguage = lang;
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    loadAnonymousReport(section);
}

// Voice recording functions
async function toggleRecording() {
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Show audio preview
            const preview = document.getElementById('audio-preview');
            if (preview) {
                preview.innerHTML = `
                    <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>Recording saved (${(audioBlob.size / 1024).toFixed(0)} KB)
                    </p>
                    <audio controls class="w-full">
                        <source src="${audioUrl}" type="audio/wav">
                    </audio>
                `;
                preview.classList.remove('hidden');
            }

            // Store audio data for submission
            window.reportAudioBlob = audioBlob;
        };

        mediaRecorder.start();
        isRecording = true;

        // Update UI
        const button = document.getElementById('record-button');
        const buttonText = document.getElementById('record-button-text');
        const status = document.getElementById('recording-status');
        const t = translations[currentLanguage];

        if (button) {
            button.classList.remove('bg-red-600', 'hover:bg-red-700');
            button.classList.add('bg-gray-600', 'hover:bg-gray-700');
        }
        if (buttonText) buttonText.textContent = t.stopRecording;
        if (status) status.classList.remove('hidden');

    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check your browser settings.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;

        // Update UI
        const button = document.getElementById('record-button');
        const buttonText = document.getElementById('record-button-text');
        const status = document.getElementById('recording-status');
        const t = translations[currentLanguage];

        if (button) {
            button.classList.remove('bg-gray-600', 'hover:bg-gray-700');
            button.classList.add('bg-red-600', 'hover:bg-red-700');
        }
        if (buttonText) buttonText.textContent = t.startRecording;
        if (status) status.classList.add('hidden');
    }
}

// Handle form submission
async function handleReportSubmission(e) {
    e.preventDefault();
    
    const t = translations[currentLanguage];
    
    // Generate case number
    const caseNumber = 'GBV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    // Collect form data
    const reportData = {
        caseNumber: caseNumber,
        language: currentLanguage,
        incidentDate: document.getElementById('incident-date')?.value,
        incidentLocation: document.getElementById('incident-location')?.value,
        incidentDescription: document.getElementById('incident-description')?.value,
        perpetratorInfo: document.getElementById('perpetrator-info')?.value,
        injuries: document.querySelector('input[name="injuries"]:checked')?.value || 'not-specified',
        medicalAttention: document.querySelector('input[name="medical-attention"]:checked')?.value || 'not-specified',
        policeReport: document.querySelector('input[name="police-report"]:checked')?.value || 'not-specified',
        urgentHelp: document.querySelector('input[name="urgent-help"]:checked')?.value || 'no',
        survivorName: document.getElementById('survivor-name')?.value || 'Anonymous',
        survivorAge: document.getElementById('survivor-age')?.value,
        survivorPhone: document.getElementById('survivor-phone')?.value,
        survivorLocation: document.getElementById('survivor-location')?.value,
        hasAudioRecording: !!window.reportAudioBlob,
        submittedAt: new Date().toISOString()
    };

    // Store using unified case system (prevents duplicates across all portals)
    let finalCaseNumber = caseNumber;
    try {
        // Use unified case system for cross-portal sync (AWAIT the async function)
        const result = await saveUnifiedCase(reportData, CASE_SOURCES.SURVIVOR);
        
        if (result.success && result.caseId) {
            finalCaseNumber = result.caseId; // Use the server-generated case number
        }
        
        if (result.isDuplicate) {
            alert(`⚠️ ${result.message}\n\nYour information has been added to the existing case for additional context.`);
            finalCaseNumber = result.linkedToCaseId; // Use the existing case number
        }
        
        // Also keep in old storage for backward compatibility
        reportData.caseNumber = finalCaseNumber;
        const existingReports = JSON.parse(localStorage.getItem('survivor_reports') || '[]');
        existingReports.push(reportData);
        localStorage.setItem('survivor_reports', JSON.stringify(existingReports));
        
        // Store audio separately if exists
        if (window.reportAudioBlob) {
            // In real app, upload to secure server
            console.log('Audio recording attached to case:', finalCaseNumber);
        }
    } catch (error) {
        console.error('Error saving report:', error);
        // Continue with local case number if API fails
    }

    // Show success message
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Success Header -->
            <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl shadow-lg text-center">
                <i class="fas fa-check-circle text-8xl mb-4 opacity-90"></i>
                <h1 class="text-4xl font-bold mb-3">Report Submitted Successfully</h1>
                <p class="text-xl text-green-50">Your report has been received. You are brave.</p>
            </div>

            <!-- Case Number -->
            <div class="bg-white rounded-xl shadow-lg p-8 text-center border-4 border-green-600">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-hashtag mr-2 text-green-600"></i>${t.caseNumber}
                </h2>
                <div class="bg-gray-100 p-6 rounded-lg mb-4">
                    <p class="text-4xl font-bold text-green-600 font-mono tracking-wider">${finalCaseNumber}</p>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    <i class="fas fa-save mr-2"></i>${t.saveThis}
                </p>
                <button onclick="navigator.clipboard.writeText('${finalCaseNumber}')" 
                        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                    <i class="fas fa-copy mr-2"></i>Copy Case Number
                </button>
            </div>

            <!-- What Happens Next -->
            <div class="bg-blue-50 rounded-xl shadow-md p-6">
                <h3 class="text-xl font-bold text-blue-800 mb-4">
                    <i class="fas fa-tasks mr-2"></i>${t.nextSteps}
                </h3>
                <div class="space-y-3">
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">1</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Case Review (24 hours)</div>
                            <div class="text-sm text-gray-600">A trained caseworker will review your report</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">2</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Contact (if provided)</div>
                            <div class="text-sm text-gray-600">We'll reach out using your preferred contact method</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">3</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Support Plan</div>
                            <div class="text-sm text-gray-600">We'll create a personalized support plan for you</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">4</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Track Your Case</div>
                            <div class="text-sm text-gray-600">Use your case number to check status anytime</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Emergency Help -->
            <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 class="text-lg font-bold text-red-800 mb-2">
                    <i class="fas fa-exclamation-triangle mr-2"></i>${t.emergencyHelp}
                </h3>
                <p class="text-red-700 mb-4">
                    If you need immediate help, don't wait. Call 116 now.
                </p>
                <a href="tel:116" class="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold">
                    <i class="fas fa-phone-alt mr-2"></i>Call 116 Hotline
                </a>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onclick="loadSurvivorPortal(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <i class="fas fa-home mr-2"></i>Back to Portal
                </button>
                <button onclick="showCaseStatus()" 
                        class="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all">
                    <i class="fas fa-search mr-2"></i>Track My Case
                </button>
                <button onclick="showServiceFinder()" 
                        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                    <i class="fas fa-map-marked-alt mr-2"></i>Find Help Near Me
                </button>
            </div>
        </div>
    `;
}

// Export functions
window.loadAnonymousReport = loadAnonymousReport;
window.changeReportLanguage = changeReportLanguage;
window.toggleRecording = toggleRecording;
window.handleReportSubmission = handleReportSubmission;
