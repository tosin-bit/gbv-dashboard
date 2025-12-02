/**
 * Voice Reporting System with AI Prompts
 * Allows survivors to report incidents verbally with guided questions
 */

class VoiceReporting {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentStep = 0;
        this.responses = {};
        
        this.questions = [
            {
                id: 'incident_date',
                text: 'When did the incident happen? You can say the date or "today", "yesterday", etc.',
                field: 'incident_date'
            },
            {
                id: 'location',
                text: 'Where did the incident happen? Please tell me the district and specific location.',
                field: 'district'
            },
            {
                id: 'violence_type',
                text: 'What type of violence occurred? For example: physical assault, sexual assault, domestic violence, etc.',
                field: 'gbv_type'
            },
            {
                id: 'description',
                text: 'Can you describe what happened? Take your time, and share as much or as little as you're comfortable with.',
                field: 'incident_description'
            },
            {
                id: 'perpetrator',
                text: 'Do you know the person who did this? What is your relationship to them?',
                field: 'perpetrator_relationship'
            },
            {
                id: 'injuries',
                text: 'Did you sustain any injuries? Do you need medical attention?',
                field: 'injuries_sustained'
            },
            {
                id: 'contact',
                text: 'How can we reach you? Please provide a phone number or other contact method.',
                field: 'survivor_contact'
            }
        ];
        
        console.log('🎤 Voice Reporting System initialized');
    }
    
    /**
     * Start voice reporting session
     */
    async start(section) {
        if (!section) {
            section = document.getElementById('dashboard-content');
        }
        
        this.currentStep = 0;
        this.responses = {};
        
        // Check microphone permission
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop immediately, just testing permission
            
            this.showVoiceInterface(section);
            this.speakQuestion(0);
            
        } catch (error) {
            console.error('❌ Microphone access denied:', error);
            alert('Microphone access is required for voice reporting. Please enable it in your browser settings.');
        }
    }
    
    /**
     * Show voice reporting interface
     */
    showVoiceInterface(section) {
        section.innerHTML = `
            <div class="max-w-3xl mx-auto space-y-6">
                <!-- Header -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-microphone mr-2"></i>Voice Reporting
                        </h2>
                        <button onclick="voiceReporting.cancel()" 
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                            <i class="fas fa-times mr-2"></i>Cancel
                        </button>
                    </div>
                    <p class="text-gray-600">
                        Answer the questions verbally. Your responses will be used to fill out the report form.
                        This is confidential and secure.
                    </p>
                </div>
                
                <!-- Progress -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">Progress</span>
                        <span id="progress-text" class="text-sm text-gray-600">Question 1 of ${this.questions.length}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div id="progress-bar" class="bg-blue-600 h-3 rounded-full transition-all" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Current Question -->
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-8 text-center">
                    <div id="question-speaker" class="w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-volume-up text-white text-3xl"></i>
                    </div>
                    
                    <h3 id="current-question" class="text-xl font-bold text-gray-800 mb-6">
                        Loading question...
                    </h3>
                    
                    <!-- Recording Controls -->
                    <div id="recording-controls" class="space-y-4">
                        <button id="record-btn" onclick="voiceReporting.toggleRecording()" 
                            class="w-32 h-32 mx-auto bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transform hover:scale-110 transition-all shadow-2xl">
                            <i class="fas fa-microphone text-5xl"></i>
                        </button>
                        <p id="recording-status" class="text-gray-600 font-semibold">
                            Click to start recording
                        </p>
                    </div>
                    
                    <!-- Navigation -->
                    <div class="flex justify-between mt-8">
                        <button onclick="voiceReporting.previousQuestion()" 
                            id="prev-btn"
                            class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                            <i class="fas fa-arrow-left mr-2"></i>Previous
                        </button>
                        <button onclick="voiceReporting.nextQuestion()" 
                            id="next-btn"
                            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Next<i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Responses Summary -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-4 text-gray-800">
                        <i class="fas fa-list mr-2"></i>Your Responses
                    </h3>
                    <div id="responses-summary" class="space-y-2 text-sm text-gray-600">
                        <p class="text-gray-400 italic">No responses yet</p>
                    </div>
                </div>
                
                <!-- Submit -->
                <div class="text-center">
                    <button onclick="voiceReporting.submitReport()" 
                        id="submit-voice-report"
                        class="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg disabled:opacity-50"
                        disabled>
                        <i class="fas fa-paper-plane mr-2"></i>Submit Report
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Speak question using Text-to-Speech
     */
    speakQuestion(stepIndex) {
        if (stepIndex >= this.questions.length) {
            this.finishQuestions();
            return;
        }
        
        const question = this.questions[stepIndex];
        const questionEl = document.getElementById('current-question');
        const progressText = document.getElementById('progress-text');
        const progressBar = document.getElementById('progress-bar');
        const prevBtn = document.getElementById('prev-btn');
        
        if (questionEl) questionEl.textContent = question.text;
        if (progressText) progressText.textContent = `Question ${stepIndex + 1} of ${this.questions.length}`;
        if (progressBar) progressBar.style.width = `${((stepIndex + 1) / this.questions.length) * 100}%`;
        if (prevBtn) prevBtn.disabled = stepIndex === 0;
        
        // Use Web Speech API for text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(question.text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
        }
        
        this.currentStep = stepIndex;
    }
    
    /**
     * Toggle recording
     */
    async toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }
    
    /**
     * Start recording
     */
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            
            this.mediaRecorder.addEventListener('dataavailable', event => {
                this.audioChunks.push(event.data);
            });
            
            this.mediaRecorder.addEventListener('stop', () => {
                this.processRecording();
            });
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Update UI
            const recordBtn = document.getElementById('record-btn');
            const status = document.getElementById('recording-status');
            if (recordBtn) {
                recordBtn.classList.add('animate-pulse');
                recordBtn.innerHTML = '<i class="fas fa-stop text-5xl"></i>';
            }
            if (status) status.textContent = 'Recording... Click to stop';
            
            console.log('🎤 Recording started');
            
        } catch (error) {
            console.error('❌ Recording error:', error);
            alert('Unable to start recording. Please check microphone permissions.');
        }
    }
    
    /**
     * Stop recording
     */
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.isRecording = false;
            
            // Update UI
            const recordBtn = document.getElementById('record-btn');
            const status = document.getElementById('recording-status');
            if (recordBtn) {
                recordBtn.classList.remove('animate-pulse');
                recordBtn.innerHTML = '<i class="fas fa-microphone text-5xl"></i>';
            }
            if (status) status.textContent = 'Processing your response...';
            
            console.log('🎤 Recording stopped');
        }
    }
    
    /**
     * Process recorded audio
     */
    processRecording() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        
        // In production, this would send to AI transcription service
        // For now, simulate processing
        setTimeout(() => {
            const question = this.questions[this.currentStep];
            const simulatedResponse = `[Voice response to: ${question.id}]`;
            
            this.responses[question.field] = simulatedResponse;
            this.updateResponsesSummary();
            
            const status = document.getElementById('recording-status');
            if (status) status.textContent = 'Response recorded!';
            
            console.log(`✅ Response saved for: ${question.field}`);
        }, 1500);
    }
    
    /**
     * Update responses summary
     */
    updateResponsesSummary() {
        const summaryDiv = document.getElementById('responses-summary');
        if (!summaryDiv) return;
        
        const responseCount = Object.keys(this.responses).length;
        
        if (responseCount === 0) {
            summaryDiv.innerHTML = '<p class="text-gray-400 italic">No responses yet</p>';
            return;
        }
        
        summaryDiv.innerHTML = Object.entries(this.responses).map(([field, value]) => `
            <div class="flex items-start space-x-2">
                <i class="fas fa-check-circle text-green-600 mt-1"></i>
                <div>
                    <p class="font-semibold text-gray-700">${field}</p>
                    <p class="text-gray-600">${value}</p>
                </div>
            </div>
        `).join('');
        
        // Enable submit if we have enough responses
        const submitBtn = document.getElementById('submit-voice-report');
        if (submitBtn && responseCount >= 3) {
            submitBtn.disabled = false;
        }
    }
    
    /**
     * Navigate to next question
     */
    nextQuestion() {
        if (this.currentStep < this.questions.length - 1) {
            this.speakQuestion(this.currentStep + 1);
        } else {
            this.finishQuestions();
        }
    }
    
    /**
     * Navigate to previous question
     */
    previousQuestion() {
        if (this.currentStep > 0) {
            this.speakQuestion(this.currentStep - 1);
        }
    }
    
    /**
     * Finish questions
     */
    finishQuestions() {
        alert('All questions completed! Please review your responses and submit the report.');
        document.getElementById('submit-voice-report').focus();
    }
    
    /**
     * Submit voice report
     */
    async submitReport() {
        const submitBtn = document.getElementById('submit-voice-report');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
        }
        
        // In production, convert voice responses to structured data and submit
        // For now, show success message
        setTimeout(() => {
            alert('Voice report submitted successfully! Case number will be generated.');
            this.cancel();
        }, 2000);
    }
    
    /**
     * Cancel voice reporting
     */
    cancel() {
        if (this.isRecording) {
            this.stopRecording();
        }
        
        const section = document.getElementById('dashboard-content');
        if (section && typeof window.loadSurvivorPortal === 'function') {
            window.loadSurvivorPortal(section);
        } else {
            location.reload();
        }
    }
}

// Create global instance
window.voiceReporting = new VoiceReporting();

// Export function
window.startVoiceReporting = () => {
    const section = document.getElementById('dashboard-content');
    window.voiceReporting.start(section);
};

console.log('✅ Voice Reporting System Ready');
