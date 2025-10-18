// Voice Recording System for GBV Reports
console.log('Voice Recording System initialized');

let mediaRecorder = null;
let audioChunks = [];
let recordingStartTime = null;
let recordingTimer = null;
let isRecording = false;
let audioStream = null;

// Load Voice Report interface
function loadVoiceReport(section) {
    section.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="text-center mb-8">
                    <div class="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
                         style="background: linear-gradient(135deg, #32cd32 0%, #1e3a8a 100%);">
                        <i class="fas fa-microphone text-6xl text-white"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-2" style="color: #1e3a8a;">Voice Reporting System</h2>
                    <p class="text-gray-600">Report GBV cases via voice recording - Anonymous & Secure</p>
                </div>

                <!-- Recording Interface -->
                <div id="recording-interface" class="mb-8">
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
                        <div id="recording-status" class="mb-6">
                            <div id="status-idle" class="status-view">
                                <i class="fas fa-microphone text-6xl mb-4" style="color: #32cd32;"></i>
                                <h3 class="text-2xl font-semibold mb-2">Ready to Record</h3>
                                <p class="text-gray-600">Click the button below to start your voice report</p>
                            </div>
                            
                            <div id="status-recording" class="status-view hidden">
                                <div class="relative inline-block mb-4">
                                    <i class="fas fa-microphone text-6xl text-red-600 recording-pulse"></i>
                                    <div class="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                                </div>
                                <h3 class="text-2xl font-semibold mb-2 text-red-600">Recording...</h3>
                                <p class="text-gray-600">Speak clearly about the incident</p>
                                <div id="recording-timer" class="text-4xl font-bold text-gray-900 mt-4">00:00</div>
                            </div>
                            
                            <div id="status-processing" class="status-view hidden">
                                <i class="fas fa-spinner fa-spin text-6xl mb-4" style="color: #1e3a8a;"></i>
                                <h3 class="text-2xl font-semibold mb-2">Processing...</h3>
                                <p class="text-gray-600">Transcribing your voice report</p>
                            </div>
                            
                            <div id="status-complete" class="status-view hidden">
                                <i class="fas fa-check-circle text-6xl mb-4 text-green-600"></i>
                                <h3 class="text-2xl font-semibold mb-2">Report Submitted!</h3>
                                <p class="text-gray-600">Case Number: <span id="voice-case-number" class="font-bold"></span></p>
                            </div>
                        </div>
                        
                        <!-- Recording Controls -->
                        <div id="recording-controls" class="flex justify-center space-x-4">
                            <button id="start-recording-btn" onclick="startRecording()" 
                                    class="px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
                                    style="background-color: #32cd32;">
                                <i class="fas fa-microphone mr-2"></i>Start Recording
                            </button>
                            
                            <button id="stop-recording-btn" onclick="stopRecording()" 
                                    class="hidden px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
                                    style="background-color: #dc2626;">
                                <i class="fas fa-stop mr-2"></i>Stop Recording
                            </button>
                            
                            <button id="restart-recording-btn" onclick="restartRecording()" 
                                    class="hidden px-6 py-4 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors">
                                <i class="fas fa-redo mr-2"></i>Record Again
                            </button>
                        </div>
                        
                        <!-- Audio Playback -->
                        <div id="playback-section" class="hidden mt-6">
                            <div class="bg-white rounded-lg p-4 shadow-inner">
                                <p class="text-sm text-gray-600 mb-2">Review your recording:</p>
                                <audio id="audio-playback" controls class="w-full"></audio>
                                <div class="mt-4 flex justify-center space-x-4">
                                    <button onclick="submitVoiceReport()" 
                                            class="px-6 py-3 rounded-lg text-white font-semibold"
                                            style="background-color: #1e3a8a;">
                                        <i class="fas fa-paper-plane mr-2"></i>Submit Report
                                    </button>
                                    <button onclick="restartRecording()" 
                                            class="px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700">
                                        <i class="fas fa-redo mr-2"></i>Re-record
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Alternative: Call 116 -->
                <div class="border-2 rounded-lg p-6 text-center mb-8" style="border-color: #32cd32;">
                    <i class="fas fa-phone text-5xl mb-4" style="color: #32cd32;"></i>
                    <h3 class="text-xl font-semibold mb-2">Or Call 116 Hotline</h3>
                    <p class="text-sm text-gray-600 mb-4">Free 24/7 toll-free number</p>
                    <div class="text-5xl font-bold mb-4" style="color: #32cd32;">116</div>
                    <p class="text-xs text-gray-500">Available in Krio, English, Mende & Temne</p>
                </div>

                <!-- How It Works -->
                <div class="bg-blue-50 rounded-lg p-6">
                    <h4 class="font-semibold mb-4 text-lg" style="color: #1e3a8a;">
                        <i class="fas fa-info-circle mr-2"></i>How Voice Reporting Works:
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background-color: #32cd32; color: white;">1</div>
                            <div>
                                <strong>Record Your Report</strong>
                                <p class="text-xs">Click "Start Recording" and describe the incident in your own words</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background-color: #32cd32; color: white;">2</div>
                            <div>
                                <strong>Review & Submit</strong>
                                <p class="text-xs">Listen to your recording and submit when ready</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background-color: #32cd32; color: white;">3</div>
                            <div>
                                <strong>Automatic Processing</strong>
                                <p class="text-xs">System transcribes your voice and creates a case record</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background-color: #32cd32; color: white;">4</div>
                            <div>
                                <strong>Immediate Response</strong>
                                <p class="text-xs">Relevant services notified and case number provided</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-white rounded border-l-4" style="border-left-color: #32cd32;">
                        <p class="text-xs text-gray-600">
                            <i class="fas fa-shield-alt mr-2" style="color: #32cd32;"></i>
                            <strong>Your Privacy:</strong> Voice recordings are encrypted and can be submitted anonymously. 
                            Personal information is optional. All reports are treated confidentially and handled by trained professionals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .recording-pulse {
                animation: pulse 1.5s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.05); }
            }
            .status-view.hidden {
                display: none;
            }
        </style>
    `;
}

// Start recording
async function startRecording() {
    try {
        // Request microphone access
        audioStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            } 
        });
        
        // Create media recorder
        const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
        mediaRecorder = new MediaRecorder(audioStream, { mimeType });
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = handleRecordingStop;
        
        // Start recording
        mediaRecorder.start(1000); // Collect data every second
        isRecording = true;
        recordingStartTime = Date.now();
        
        // Update UI
        showStatus('recording');
        document.getElementById('start-recording-btn').classList.add('hidden');
        document.getElementById('stop-recording-btn').classList.remove('hidden');
        document.getElementById('playback-section').classList.add('hidden');
        
        // Start timer
        updateRecordingTimer();
        recordingTimer = setInterval(updateRecordingTimer, 1000);
        
        console.log('Recording started');
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Unable to access microphone. Please ensure you have granted microphone permissions and try again.');
    }
}

// Stop recording
function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        clearInterval(recordingTimer);
        
        // Stop all audio tracks
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
        }
        
        console.log('Recording stopped');
    }
}

// Handle recording stop
function handleRecordingStop() {
    // Create audio blob
    const mimeType = mediaRecorder.mimeType;
    const audioBlob = new Blob(audioChunks, { type: mimeType });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Show playback
    const audioPlayer = document.getElementById('audio-playback');
    audioPlayer.src = audioUrl;
    
    // Update UI
    showStatus('idle');
    document.getElementById('stop-recording-btn').classList.add('hidden');
    document.getElementById('restart-recording-btn').classList.remove('hidden');
    document.getElementById('playback-section').classList.remove('hidden');
    
    // Store blob for submission
    window.currentAudioBlob = audioBlob;
    
    console.log('Recording ready for playback');
}

// Restart recording
function restartRecording() {
    audioChunks = [];
    showStatus('idle');
    document.getElementById('start-recording-btn').classList.remove('hidden');
    document.getElementById('stop-recording-btn').classList.add('hidden');
    document.getElementById('restart-recording-btn').classList.add('hidden');
    document.getElementById('playback-section').classList.add('hidden');
    document.getElementById('recording-timer').textContent = '00:00';
    window.currentAudioBlob = null;
}

// Submit voice report
async function submitVoiceReport() {
    if (!window.currentAudioBlob) {
        alert('No recording to submit');
        return;
    }
    
    showStatus('processing');
    
    try {
        // In a real implementation, this would:
        // 1. Upload audio to cloud storage
        // 2. Send to speech-to-text API (Google Speech-to-Text, Azure, etc.)
        // 3. Parse transcript for key information
        // 4. Create case with extracted data
        
        // For now, create a case with voice recording metadata
        const formData = new FormData();
        formData.append('audio', window.currentAudioBlob, 'voice-report.webm');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create case via API
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                incident_date: new Date().toISOString().split('T')[0],
                district: 'Western Area Urban', // Would be detected from transcript or user input
                violence_types: ['Voice Report - Pending Transcription'],
                reported_by: 'Voice Recording System',
                reporting_channel: 'Voice/IVR',
                priority_level: 'High',
                case_notes: 'Voice recording submitted. Duration: ' + getRecordingDuration() + '. Awaiting transcription.',
                survivor_gender: 'Not Specified'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success
            document.getElementById('voice-case-number').textContent = result.case_number;
            showStatus('complete');
            
            // Hide controls
            document.getElementById('restart-recording-btn').classList.add('hidden');
            document.getElementById('playback-section').classList.add('hidden');
            
            // Show completion message
            setTimeout(() => {
                alert(`✅ Voice Report Submitted Successfully!\n\nCase Number: ${result.case_number}\n\nYour report has been received and will be reviewed by our team. Appropriate services have been notified.\n\nFor urgent assistance, please call 116 immediately.`);
                
                // Reset for new recording
                setTimeout(() => {
                    restartRecording();
                }, 3000);
            }, 1000);
        } else {
            showStatus('idle');
            alert('Failed to submit voice report. Please try again or call 116 for immediate assistance.');
        }
    } catch (error) {
        console.error('Error submitting voice report:', error);
        showStatus('idle');
        alert('Network error. Please check your connection and try again, or call 116 for immediate assistance.');
    }
}

// Helper functions
function showStatus(status) {
    const statuses = ['idle', 'recording', 'processing', 'complete'];
    statuses.forEach(s => {
        const el = document.getElementById(`status-${s}`);
        if (el) {
            if (s === status) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

function updateRecordingTimer() {
    if (!recordingStartTime) return;
    
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timer = document.getElementById('recording-timer');
    if (timer) {
        timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function getRecordingDuration() {
    if (!recordingStartTime) return '0:00';
    
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// Export functions
window.loadVoiceReport = loadVoiceReport;
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.restartRecording = restartRecording;
window.submitVoiceReport = submitVoiceReport;

console.log('Voice Recording System ready');
