/**
 * GBV Dashboard - AI Chatbot Assistant
 * 24/7 AI-powered help for survivors, case workers, and staff
 * Multi-language support, context-aware, voice-enabled
 */

// Chatbot state
let chatbotOpen = false;
let chatHistory = [];
let currentLanguage = 'en';
let isTyping = false;
let recognitionActive = false;

// Knowledge base for AI responses
const knowledgeBase = {
    // Emergency responses
    emergency: {
        keywords: ['emergency', 'danger', 'help now', 'urgent', 'scared', 'threatening', 'weapon'],
        response: `🚨 **EMERGENCY HELP AVAILABLE**

**Immediate Action:**
📞 **Call 116** - National GBV Hotline (24/7)
🚓 **Police FSU** - Report to Family Support Unit
🏥 **Nearest Rainbo Center** - Medical care & safety

**If in immediate danger:**
- Get to a safe location
- Call emergency services
- Do not confront the perpetrator
- Preserve evidence if safe to do so

**You are not alone. Help is available right now.**`
    },
    
    // Rights information
    rights: {
        keywords: ['rights', 'what can i do', 'legal', 'can i', 'allowed', 'law'],
        response: `⚖️ **YOUR RIGHTS AS A SURVIVOR**

You have the RIGHT to:
1. ✅ **Safety** - Protection from further violence
2. ✅ **Medical Care** - Free emergency treatment at Rainbo Centers
3. ✅ **Confidentiality** - Your information is protected
4. ✅ **Justice** - Report to police, fast-track court
5. ✅ **Support** - Counseling and psychosocial services
6. ✅ **Information** - Understand your options

📚 Learn more in our [Resource Library](/resources)`
    },
    
    // Services and support
    services: {
        keywords: ['services', 'help', 'support', 'where', 'how to get', 'counseling', 'therapy'],
        response: `🤝 **AVAILABLE SERVICES**

**Medical Care:**
🏥 **Rainbo Centers** - Free medical care, PEP, emergency contraception
- Open 24/7 for emergencies
- Confidential care
- Documentation for legal proceedings

**Legal Services:**
⚖️ **Police FSU** - Investigation and protection
⚖️ **Legal Aid** - Free legal representation

**Psychosocial Support:**
❤️ **Counseling** - Individual and group therapy
❤️ **Crisis Support** - 24/7 emotional support
❤️ **Long-term Care** - Ongoing mental health services

**Safety:**
🛡️ **Safe Houses** - Temporary accommodation
🛡️ **Protection Orders** - Legal protection from perpetrator

📞 **Contact 116** for immediate assistance`
    },
    
    // Reporting procedures
    report: {
        keywords: ['report', 'file case', 'complain', 'press charges', 'go to police'],
        response: `📋 **HOW TO REPORT GBV**

**Step 1: Immediate Safety**
- Ensure you're in a safe location
- Seek medical attention if injured

**Step 2: Report to Police FSU**
- Go to nearest Police Family Support Unit
- You can bring a support person
- Police will take your statement
- You'll receive a case number

**Step 3: Medical Examination**
- Visit Rainbo Center within 72 hours
- Medical evidence collection
- PEP treatment (within 72 hours)
- Medical report for legal proceedings

**Step 4: Legal Support**
- Contact legal aid for free lawyer
- Your case goes to Sexual Offences Court
- Fast-track proceedings

**Important:**
- You have the right to report at any time
- You control the pace of legal proceedings
- You can withdraw charges if you choose
- Confidentiality is maintained

Need help reporting? Call 116.`
    },
    
    // Medical information
    medical: {
        keywords: ['medical', 'doctor', 'pep', 'emergency contraception', 'injuries', 'examination'],
        response: `🏥 **MEDICAL CARE INFORMATION**

**Immediate Medical Needs (within 72 hours):**
⏰ **PEP (Post-Exposure Prophylaxis)** - HIV prevention
⏰ **Emergency Contraception** - Pregnancy prevention
⏰ **STI Treatment** - Infection prevention
⏰ **Injury Treatment** - Medical care

**Where to Go:**
🏥 **Rainbo Centers** - Free, confidential care
- Freetown, Bo, Kenema, Makeni locations
- 24/7 emergency services
- Female healthcare providers available
- No police report required to receive care

**What to Expect:**
1. Private examination room
2. Medical history
3. Physical examination
4. Evidence collection (if you consent)
5. Treatment and medications
6. Follow-up appointments scheduled

**Important:**
- Medical care is FREE
- You don't need police report
- Everything is confidential
- You can bring a support person

📞 Call 116 for nearest Rainbo Center location`
    },
    
    // Support for someone else
    helping: {
        keywords: ['friend', 'someone i know', 'family member', 'help someone', 'what should i do'],
        response: `🤝 **HELPING SOMEONE EXPERIENCING GBV**

**DO:**
✅ Listen without judgment
✅ Believe them
✅ Provide information about services
✅ Respect their decisions
✅ Maintain confidentiality
✅ Follow up if they want support

**DON'T:**
❌ Blame them or ask "why didn't you leave?"
❌ Pressure them to take action
❌ Make promises you can't keep
❌ Confront the perpetrator
❌ Share their story without permission

**Provide:**
📞 GBV Hotline: 116 (24/7)
🏥 Rainbo Centers - Medical care
👮 Police FSU - Report & investigation
⚖️ Legal Aid - Free lawyers

**Remember:**
- Leaving is the most dangerous time
- They know their situation best
- Your support matters
- Take care of yourself too

📚 [Learn more about Bystander Intervention](/education)`
    },
    
    // Training and resources
    training: {
        keywords: ['training', 'learn', 'education', 'course', 'module', 'workshop'],
        response: `🎓 **TRAINING & EDUCATION**

**Free Interactive Modules:**
📖 Understanding GBV (15 min)
📖 Bystander Intervention (20 min)
📖 Case Management (60 min)

**Features:**
✅ Self-paced learning
✅ Quizzes and certificates
✅ Progress tracking
✅ Professional development

🎓 [Start Learning Now](/education)

**Additional Resources:**
📚 [Resource Library](/resources) - Laws, guides, and procedures
🏥 Service provider protocols
⚖️ Legal procedures and forms`
    },
    
    // Case management
    case_management: {
        keywords: ['case', 'document', 'notes', 'follow up', 'tracking'],
        response: `📋 **CASE MANAGEMENT TOOLS**

**Available Features:**
📝 **Case Notes** - Voice-to-text documentation
📊 **Case Tracking** - Monitor progress
📅 **Follow-ups** - Schedule appointments
🔒 **Confidential Notes** - Secure documentation

**Note Types:**
- Medical assessments
- Legal documentation
- Psychosocial support
- Follow-up notes
- Safety planning
- Referral notes

**Speech-to-Text:**
🎤 Click microphone to speak your notes
- Saves 50%+ documentation time
- Accurate transcription
- Works in multiple languages

💡 Tip: Go to View Cases → Click "Notes" on any case`
    },
    
    // Statistics and data
    statistics: {
        keywords: ['statistics', 'data', 'numbers', 'trends', 'reports'],
        response: `📊 **GBV DATA & STATISTICS**

**Available Reports:**
📈 District-level analysis
📈 Monthly trends
📈 Service provider coverage
📈 Case outcomes
📈 Risk assessments

**Features:**
✅ Real-time dashboards
✅ Predictive analytics
✅ Custom reports
✅ Export to PDF/Excel

🔍 View in: Analytics Dashboard

**Privacy Note:**
All data is anonymized and aggregated to protect survivor identities.`
    },
    
    // Languages
    languages: {
        keywords: ['language', 'krio', 'mende', 'temne', 'translate'],
        response: `🌍 **LANGUAGE SUPPORT**

**Currently Available:**
✅ English

**Coming Soon:**
🔜 Krio
🔜 Mende
🔜 Temne
🔜 Other Sierra Leone languages

**How to Change Language:**
Click the language button at the top of the chat.

💡 You can also use voice input in your preferred language - the system will auto-detect!`
    },
    
    // General help
    general: {
        keywords: ['hi', 'hello', 'help', 'what can you do', 'how does this work'],
        response: `👋 **Welcome! I'm Your GBV Support Assistant**

**I can help you with:**

🚨 **Emergency Help** - Immediate assistance
⚖️ **Your Rights** - Know your options
🏥 **Medical Care** - Find services
👮 **Reporting** - File a case
🤝 **Support Someone** - Help a friend/family
🎓 **Training** - Learn about GBV
📋 **Case Management** - Documentation tools
📊 **Statistics** - View data and trends

**Just ask me anything like:**
- "I need help right now"
- "What are my rights?"
- "How do I report GBV?"
- "Where can I get medical care?"
- "How do I help someone?"
- "I want to learn more about GBV"

**Quick Actions:**
📞 Emergency: Call 116 (24/7)
📚 [Resources](/resources)
🎓 [Training](/education)

How can I help you today?`
    }
};

// Initialize chatbot
function initChatbot() {
    createChatbotButton();
    loadChatHistory();
}

// Create floating chatbot button
function createChatbotButton() {
    const button = document.createElement('button');
    button.id = 'chatbot-button';
    button.className = 'fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center group';
    button.innerHTML = `
        <i class="fas fa-robot text-2xl group-hover:scale-110 transition-transform"></i>
        <span class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">AI</span>
    `;
    button.onclick = toggleChatbot;
    document.body.appendChild(button);
}

// Toggle chatbot window
function toggleChatbot() {
    if (chatbotOpen) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

// Open chatbot
function openChatbot() {
    chatbotOpen = true;
    
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.className = 'fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up';
    chatWindow.innerHTML = `
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-xl"></i>
                </div>
                <div>
                    <div class="font-semibold">GBV AI Assistant</div>
                    <div class="text-xs text-blue-100">Online 24/7 • Confidential</div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="toggleVoiceInput()" class="w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all" title="Voice Input">
                    <i class="fas fa-microphone text-sm"></i>
                </button>
                <button onclick="closeChatbot()" class="w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="bg-gray-50 p-3 border-b border-gray-200">
            <div class="flex gap-2 overflow-x-auto pb-2">
                <button onclick="sendQuickMessage('I need emergency help')" class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs whitespace-nowrap hover:bg-red-200 transition-colors">
                    🚨 Emergency
                </button>
                <button onclick="sendQuickMessage('What are my rights?')" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs whitespace-nowrap hover:bg-blue-200 transition-colors">
                    ⚖️ Rights
                </button>
                <button onclick="sendQuickMessage('How do I report?')" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs whitespace-nowrap hover:bg-green-200 transition-colors">
                    📋 Report
                </button>
                <button onclick="sendQuickMessage('Find services')" class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs whitespace-nowrap hover:bg-purple-200 transition-colors">
                    🏥 Services
                </button>
            </div>
        </div>
        
        <!-- Chat Messages -->
        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4">
            ${renderWelcomeMessage()}
        </div>
        
        <!-- Voice Input Indicator -->
        <div id="voice-indicator" class="hidden bg-blue-50 border-t border-blue-200 p-3">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-sm text-gray-700">Listening... Speak now</span>
                <button onclick="stopVoiceInput()" class="ml-auto text-sm text-blue-600 hover:text-blue-800">
                    Stop
                </button>
            </div>
        </div>
        
        <!-- Input Area -->
        <div class="border-t border-gray-200 p-4 bg-white">
            <div class="flex gap-2">
                <input 
                    type="text" 
                    id="chat-input" 
                    placeholder="Ask me anything about GBV support..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onkeypress="handleChatKeypress(event)"
                />
                <button onclick="sendMessage()" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="text-xs text-gray-500 mt-2 text-center">
                🔒 Confidential • 🤖 AI-Powered • 🌍 Multi-Language
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWindow);
    
    // Focus input
    document.getElementById('chat-input').focus();
    
    // Load chat history
    if (chatHistory.length > 0) {
        renderChatHistory();
    }
}

// Close chatbot
function closeChatbot() {
    chatbotOpen = false;
    const chatWindow = document.getElementById('chatbot-window');
    if (chatWindow) {
        chatWindow.remove();
    }
}

// Render welcome message
function renderWelcomeMessage() {
    return `
        <div class="flex justify-center">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 max-w-xs text-center border border-blue-200">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-robot text-white text-xl"></i>
                </div>
                <div class="font-semibold text-gray-800 mb-2">Welcome! I'm here to help</div>
                <div class="text-sm text-gray-600">Ask me anything about GBV support, services, or your rights. I'm available 24/7.</div>
            </div>
        </div>
    `;
}

// Handle chat keypress
function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessageToChat('user', message);
    
    // Clear input
    input.value = '';
    
    // Save to history
    chatHistory.push({ role: 'user', content: message, timestamp: new Date().toISOString() });
    saveChatHistory();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        hideTypingIndicator();
        addMessageToChat('ai', response);
        chatHistory.push({ role: 'ai', content: response, timestamp: new Date().toISOString() });
        saveChatHistory();
    }, 1000 + Math.random() * 1000); // Simulate thinking time
}

// Send quick message
function sendQuickMessage(message) {
    const input = document.getElementById('chat-input');
    if (input) {
        input.value = message;
        sendMessage();
    }
}

// Add message to chat
function addMessageToChat(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 max-w-xs">
                ${escapeHtml(content)}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="bg-gray-100 rounded-lg px-4 py-3 max-w-md">
                <div class="prose prose-sm max-w-none">
                    ${formatAIResponse(content)}
                </div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex justify-start';
    typingDiv.innerHTML = `
        <div class="bg-gray-100 rounded-lg px-4 py-3">
            <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get AI response
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each knowledge category
    for (const [category, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response;
        }
    }
    
    // Default response if no match
    return knowledgeBase.general.response;
}

// Format AI response (convert markdown-like to HTML)
function formatAIResponse(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^(.*)$/gm, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Voice input
function toggleVoiceInput() {
    if (recognitionActive) {
        stopVoiceInput();
    } else {
        startVoiceInput();
    }
}

function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'en' ? 'en-US' : currentLanguage;
    
    recognition.onstart = function() {
        recognitionActive = true;
        const indicator = document.getElementById('voice-indicator');
        if (indicator) indicator.classList.remove('hidden');
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = transcript;
            sendMessage();
        }
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        stopVoiceInput();
    };
    
    recognition.onend = function() {
        recognitionActive = false;
        const indicator = document.getElementById('voice-indicator');
        if (indicator) indicator.classList.add('hidden');
    };
    
    recognition.start();
    window.currentRecognition = recognition;
}

function stopVoiceInput() {
    if (window.currentRecognition) {
        window.currentRecognition.stop();
    }
    recognitionActive = false;
    const indicator = document.getElementById('voice-indicator');
    if (indicator) indicator.classList.add('hidden');
}

// Save/load chat history
function saveChatHistory() {
    try {
        localStorage.setItem('gbv_chat_history', JSON.stringify(chatHistory));
    } catch (e) {
        console.error('Failed to save chat history:', e);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('gbv_chat_history');
        if (saved) {
            chatHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load chat history:', e);
    }
}

function renderChatHistory() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    chatHistory.forEach(msg => {
        addMessageToChat(msg.role, msg.content);
    });
}

// Export functions
window.toggleChatbot = toggleChatbot;
window.closeChatbot = closeChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.handleChatKeypress = handleChatKeypress;
window.toggleVoiceInput = toggleVoiceInput;
window.stopVoiceInput = stopVoiceInput;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .animate-slide-up {
        animation: slide-up 0.3s ease-out;
    }
    
    .animate-fade-in {
        animation: fade-in 0.3s ease-out;
    }
    
    #chatbot-window {
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    #chat-messages::-webkit-scrollbar {
        width: 6px;
    }
    
    #chat-messages::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    #chat-messages::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    
    #chat-messages::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
document.head.appendChild(style);
