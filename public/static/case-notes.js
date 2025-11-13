/**
 * GBV Dashboard - Case Notes System
 * Comprehensive note-taking with speech-to-text integration
 */

// Speech recognition setup
let recognition = null;
let isRecording = false;
let currentNoteField = null;

// Initialize speech recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Can be changed to support multiple languages
        
        recognition.onstart = function() {
            console.log('🎤 Speech recognition started');
            isRecording = true;
            updateRecordingUI(true);
        };
        
        recognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            if (currentNoteField) {
                const currentValue = currentNoteField.value;
                const cursorPosition = currentNoteField.selectionStart;
                
                // Insert transcription at cursor position
                if (finalTranscript) {
                    currentNoteField.value = currentValue.substring(0, cursorPosition) + 
                                            finalTranscript + 
                                            currentValue.substring(cursorPosition);
                    currentNoteField.selectionStart = cursorPosition + finalTranscript.length;
                    currentNoteField.selectionEnd = cursorPosition + finalTranscript.length;
                }
                
                // Show interim results
                const interimDisplay = document.getElementById('interim-transcript');
                if (interimDisplay) {
                    interimDisplay.textContent = interimTranscript;
                }
            }
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech') {
                showNotification('No speech detected. Please try again.', 'warning');
            } else if (event.error === 'not-allowed') {
                showNotification('Microphone access denied. Please enable microphone permissions.', 'error');
            } else {
                showNotification('Speech recognition error: ' + event.error, 'error');
            }
            stopRecording();
        };
        
        recognition.onend = function() {
            console.log('🎤 Speech recognition ended');
            isRecording = false;
            updateRecordingUI(false);
        };
        
        return true;
    } else {
        console.warn('Speech recognition not supported in this browser');
        return false;
    }
}

// Start recording
function startRecording(textareaId) {
    if (!recognition) {
        if (!initSpeechRecognition()) {
            showNotification('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.', 'error');
            return;
        }
    }
    
    currentNoteField = document.getElementById(textareaId);
    if (!currentNoteField) {
        console.error('Note field not found:', textareaId);
        return;
    }
    
    try {
        recognition.start();
        showNotification('🎤 Listening... Speak now', 'info');
    } catch (error) {
        console.error('Error starting recognition:', error);
        showNotification('Could not start recording. Please try again.', 'error');
    }
}

// Stop recording
function stopRecording() {
    if (recognition && isRecording) {
        recognition.stop();
        const interimDisplay = document.getElementById('interim-transcript');
        if (interimDisplay) {
            interimDisplay.textContent = '';
        }
        showNotification('Recording stopped', 'success');
    }
}

// Toggle recording
function toggleRecording(textareaId) {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording(textareaId);
    }
}

// Update recording UI
function updateRecordingUI(recording) {
    const recordButtons = document.querySelectorAll('.record-button');
    recordButtons.forEach(btn => {
        if (recording) {
            btn.classList.add('recording');
            btn.innerHTML = '<i class="fas fa-stop"></i>';
            btn.style.backgroundColor = '#ef4444';
        } else {
            btn.classList.remove('recording');
            btn.innerHTML = '<i class="fas fa-microphone"></i>';
            btn.style.backgroundColor = '#3b82f6';
        }
    });
}

// Show case notes modal
function showCaseNotesModal(caseId, caseNumber) {
    const modalHTML = `
        <div id="case-notes-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeCaseNotesModal(event)">
            <div class="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sticky top-0 z-10">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold flex items-center gap-3">
                                <i class="fas fa-clipboard-list"></i>
                                Case Notes
                            </h2>
                            <p class="text-blue-100 mt-1">Case ${caseNumber} - Comprehensive Documentation</p>
                        </div>
                        <button onclick="closeCaseNotesModal()" class="text-white hover:text-gray-200 ml-4">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <!-- Tabs for note types -->
                    <div class="flex border-b border-gray-200 mb-6 overflow-x-auto">
                        <button class="note-type-tab active px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600" data-type="all">
                            <i class="fas fa-list mr-2"></i>All Notes
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="medical">
                            <i class="fas fa-heartbeat mr-2"></i>Medical
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="legal">
                            <i class="fas fa-gavel mr-2"></i>Legal
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="psychosocial">
                            <i class="fas fa-heart mr-2"></i>Psychosocial
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="followup">
                            <i class="fas fa-calendar-check mr-2"></i>Follow-up
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="safety_planning">
                            <i class="fas fa-shield-alt mr-2"></i>Safety
                        </button>
                        <button class="note-type-tab px-4 py-2 font-medium text-gray-600 hover:text-blue-600" data-type="referral">
                            <i class="fas fa-exchange-alt mr-2"></i>Referral
                        </button>
                    </div>

                    <!-- Add new note section -->
                    <div class="bg-blue-50 rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i class="fas fa-plus-circle text-blue-600"></i>
                            Add New Note
                        </h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
                                <select id="new-note-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="general">General Note</option>
                                    <option value="medical">Medical Assessment</option>
                                    <option value="legal">Legal Documentation</option>
                                    <option value="psychosocial">Psychosocial Support</option>
                                    <option value="followup">Follow-up Note</option>
                                    <option value="safety_planning">Safety Planning</option>
                                    <option value="referral">Referral Note</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Confidentiality</label>
                                <div class="flex items-center gap-4 mt-3">
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" id="note-confidential" class="w-4 h-4 text-blue-600 rounded">
                                        <span class="text-sm text-gray-700">
                                            <i class="fas fa-lock text-red-600 mr-1"></i>
                                            Mark as Confidential
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-sm font-medium text-gray-700">Note Content</label>
                                <div class="flex items-center gap-2">
                                    <span id="interim-transcript" class="text-xs text-blue-600 italic"></span>
                                    <button 
                                        onclick="toggleRecording('new-note-content')" 
                                        class="record-button px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                                        title="Click to start/stop voice recording">
                                        <i class="fas fa-microphone"></i>
                                        <span class="hidden sm:inline">Voice Input</span>
                                    </button>
                                </div>
                            </div>
                            <textarea 
                                id="new-note-content" 
                                rows="6" 
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Type or speak your note here... Click 'Voice Input' to use speech-to-text."
                            ></textarea>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle mr-1"></i>
                                Tip: Click "Voice Input" and speak clearly. The text will appear automatically.
                            </p>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-600">
                                <i class="fas fa-paperclip mr-1"></i>
                                <span>Attachments coming soon</span>
                            </div>
                            <button 
                                onclick="saveNewNote(${caseId}, '${caseNumber}')"
                                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <i class="fas fa-save"></i>
                                Save Note
                            </button>
                        </div>
                    </div>

                    <!-- Existing notes timeline -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i class="fas fa-history text-gray-600"></i>
                            Notes History
                        </h3>
                        <div id="notes-timeline" class="space-y-4">
                            <!-- Notes will be loaded here -->
                            <div class="text-center py-8 text-gray-500">
                                <i class="fas fa-clipboard-list text-4xl mb-3"></i>
                                <p>Loading notes...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                        All notes are securely stored and encrypted
                    </div>
                    <button onclick="closeCaseNotesModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Setup tab handlers
    setupNoteTypeTabs();
    
    // Load existing notes
    loadCaseNotes(caseId);
}

// Setup note type tabs
function setupNoteTypeTabs() {
    const tabs = document.querySelectorAll('.note-type-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            tabs.forEach(t => {
                t.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
                t.classList.add('text-gray-600');
            });
            this.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            this.classList.remove('text-gray-600');
            
            // Filter notes by type
            const noteType = this.dataset.type;
            filterNotesByType(noteType);
        });
    });
}

// Filter notes by type
function filterNotesByType(type) {
    const notes = document.querySelectorAll('.note-item');
    notes.forEach(note => {
        if (type === 'all' || note.dataset.type === type) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
}

// Load case notes
async function loadCaseNotes(caseId) {
    const timeline = document.getElementById('notes-timeline');
    if (!timeline) return;
    
    // Sample notes (will be replaced with API call)
    const sampleNotes = [
        {
            id: 1,
            type: 'medical',
            content: 'Initial medical examination completed. Patient presented with minor bruising on left arm and upper back. No serious injuries observed. PEP administered within 48 hours. Follow-up appointment scheduled for 2 weeks.',
            created_by: 'Dr. Fatmata Sesay',
            created_at: '2025-01-12 14:30:00',
            is_confidential: true,
            voice_transcription: false
        },
        {
            id: 2,
            type: 'legal',
            content: 'Survivor expressed interest in pursuing legal action. Explained legal process and survivor rights. Connected with legal aid organization for free representation. Case filed with Police FSU.',
            created_by: 'Sarah Kamara - Legal Aid',
            created_at: '2025-01-12 16:00:00',
            is_confidential: false,
            voice_transcription: false
        },
        {
            id: 3,
            type: 'psychosocial',
            content: 'Initial counseling session conducted. Survivor showing signs of trauma and anxiety. Discussed coping strategies and safety planning. Referred to trauma counseling group sessions. Survivor expressed feeling supported.',
            created_by: 'Mohamed Bangura - Counselor',
            created_at: '2025-01-13 10:00:00',
            is_confidential: true,
            voice_transcription: true
        },
        {
            id: 4,
            type: 'followup',
            content: 'Follow-up call made. Survivor is safe and staying with relatives. Attending counseling sessions regularly. Medical follow-up appointment scheduled for next week. Police investigation ongoing.',
            created_by: 'Aminata Koroma - Case Worker',
            created_at: '2025-01-15 11:30:00',
            is_confidential: false,
            voice_transcription: false
        }
    ];
    
    displayNotes(sampleNotes);
}

// Display notes
function displayNotes(notes) {
    const timeline = document.getElementById('notes-timeline');
    if (!timeline) return;
    
    if (notes.length === 0) {
        timeline.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-clipboard text-4xl mb-3"></i>
                <p>No notes added yet</p>
                <p class="text-sm mt-2">Add the first note above</p>
            </div>
        `;
        return;
    }
    
    timeline.innerHTML = notes.map(note => {
        const typeIcons = {
            'general': 'file-alt',
            'medical': 'heartbeat',
            'legal': 'gavel',
            'psychosocial': 'heart',
            'followup': 'calendar-check',
            'safety_planning': 'shield-alt',
            'referral': 'exchange-alt'
        };
        
        const typeColors = {
            'general': 'gray',
            'medical': 'red',
            'legal': 'blue',
            'psychosocial': 'purple',
            'followup': 'green',
            'safety_planning': 'yellow',
            'referral': 'teal'
        };
        
        const icon = typeIcons[note.type] || 'file-alt';
        const color = typeColors[note.type] || 'gray';
        
        return `
            <div class="note-item bg-white rounded-lg border-l-4 border-${color}-500 shadow-sm p-4" data-type="${note.type}">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-${icon} text-${color}-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-800 capitalize">${note.type.replace('_', ' ')}</div>
                            <div class="text-xs text-gray-500">${note.created_at}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${note.is_confidential ? '<span class="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"><i class="fas fa-lock mr-1"></i>Confidential</span>' : ''}
                        ${note.voice_transcription ? '<span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"><i class="fas fa-microphone mr-1"></i>Voice</span>' : ''}
                    </div>
                </div>
                
                <p class="text-gray-700 mb-3 leading-relaxed">${note.content}</p>
                
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <div>
                        <i class="fas fa-user mr-1"></i>
                        ${note.created_by}
                    </div>
                    <div class="flex items-center gap-3">
                        <button class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-print mr-1"></i>Print
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Save new note
async function saveNewNote(caseId, caseNumber) {
    const type = document.getElementById('new-note-type').value;
    const content = document.getElementById('new-note-content').value.trim();
    const isConfidential = document.getElementById('note-confidential').checked;
    
    if (!content) {
        showNotification('Please enter note content', 'warning');
        return;
    }
    
    // Show saving indicator
    const saveButton = event.target;
    const originalHTML = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
    saveButton.disabled = true;
    
    // Simulate API call (replace with actual API)
    setTimeout(() => {
        showNotification('✓ Note saved successfully', 'success');
        
        // Clear form
        document.getElementById('new-note-content').value = '';
        document.getElementById('note-confidential').checked = false;
        document.getElementById('new-note-type').value = 'general';
        
        // Reload notes
        loadCaseNotes(caseId);
        
        // Reset button
        saveButton.innerHTML = originalHTML;
        saveButton.disabled = false;
    }, 1000);
}

// Close modal
function closeCaseNotesModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    // Stop recording if active
    if (isRecording) {
        stopRecording();
    }
    
    const modal = document.getElementById('case-notes-modal');
    if (modal) modal.remove();
}

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions to window
window.showCaseNotesModal = showCaseNotesModal;
window.closeCaseNotesModal = closeCaseNotesModal;
window.saveNewNote = saveNewNote;
window.toggleRecording = toggleRecording;
window.startRecording = startRecording;
window.stopRecording = stopRecording;

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSpeechRecognition();
    });
} else {
    initSpeechRecognition();
}
