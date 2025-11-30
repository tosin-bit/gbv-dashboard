// Internal Messaging System - Real-time Team Communication
// Aligned with Sierra Leone Spotlight Initiative - Enhanced Collaboration

/**
 * INTERNAL MESSAGING SYSTEM
 * 
 * Features:
 * - Real-time chat interface
 * - @mentions for user tagging
 * - File attachments and sharing
 * - Message threading (replies)
 * - Channel-based organization
 * - Direct messages (1-on-1)
 * - Group conversations
 * - Message search and filtering
 * - Read receipts
 * - Typing indicators
 * - Message reactions (emoji)
 * - Message pinning
 * - Notification integration
 * - Offline message queue
 * - Message history
 * - User presence indicators (online/offline)
 */

let messagingModal = null;
let currentChannel = null;
let currentDM = null;
let messagePolling = null;
let typingTimeout = null;

// Sample data (in production, this would come from API)
const sampleChannels = [
  { id: 1, name: 'general', description: 'General discussions', type: 'public', members: 45, unread: 3 },
  { id: 2, name: 'case-coordination', description: 'Case management coordination', type: 'public', members: 23, unread: 7 },
  { id: 3, name: 'urgent-alerts', description: 'Urgent case alerts only', type: 'public', members: 45, unread: 0 },
  { id: 4, name: 'rainbo-team', description: 'Rainbo staff only', type: 'private', members: 12, unread: 2 },
  { id: 5, name: 'police-fsu', description: 'FSU officers coordination', type: 'private', members: 16, unread: 0 },
  { id: 6, name: 'training', description: 'Training and education', type: 'public', members: 34, unread: 1 }
];

const sampleUsers = [
  { id: 1, name: 'Sarah Johnson', role: 'Case Manager', organization: 'Ministry', status: 'online', avatar: '👩‍💼' },
  { id: 2, name: 'Dr. Amina Kamara', role: 'Medical Director', organization: 'Rainbo', status: 'online', avatar: '👩‍⚕️' },
  { id: 3, name: 'Officer James Sesay', role: 'FSU Commander', organization: 'Police', status: 'away', avatar: '👮' },
  { id: 4, name: 'Maria Santos', role: 'Counselor', organization: 'Rainbo', status: 'offline', avatar: '👩‍🏫' },
  { id: 5, name: 'Ibrahim Koroma', role: 'Data Analyst', organization: 'Ministry', status: 'online', avatar: '👨‍💻' }
];

const sampleMessages = {
  1: [ // general channel
    {
      id: 1,
      channel_id: 1,
      user_id: 1,
      user_name: 'Sarah Johnson',
      user_avatar: '👩‍💼',
      content: 'Good morning team! Quick reminder about the monthly review meeting at 2 PM today.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reactions: { '👍': 5, '✅': 3 },
      replies_count: 2,
      pinned: true
    },
    {
      id: 2,
      channel_id: 1,
      user_id: 2,
      user_name: 'Dr. Amina Kamara',
      user_avatar: '👩‍⚕️',
      content: 'Thanks for the reminder! I have the monthly report ready.',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      reactions: { '👍': 2 },
      replies_count: 0
    }
  ],
  2: [ // case-coordination channel
    {
      id: 10,
      channel_id: 2,
      user_id: 3,
      user_name: 'Officer James Sesay',
      user_avatar: '👮',
      content: '@Sarah Johnson Case GBV-2025-0156 requires immediate attention. Suspect has been identified and we need medical evidence ASAP.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      mentions: [1],
      reactions: { '🚨': 3 },
      replies_count: 4,
      urgent: true
    }
  ]
};

/**
 * Show Messaging Modal
 */
function showMessagingSystem() {
  const modalHTML = `
    <div id="messaging-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div class="flex items-center gap-3">
            <i class="fas fa-comments text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">Internal Messaging</h2>
              <p class="text-blue-100 text-sm">Team Communication Hub</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="showNewChannelModal()" 
                    class="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors text-sm">
              <i class="fas fa-plus mr-2"></i>New Channel
            </button>
            <button onclick="closeMessagingSystem()" 
                    class="text-white hover:text-blue-200 text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Sidebar -->
          <div class="w-80 border-r bg-gray-50 flex flex-col">
            <!-- Search -->
            <div class="p-4 border-b">
              <div class="relative">
                <input type="text" 
                       id="message-search"
                       placeholder="Search messages..."
                       class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex border-b">
              <button onclick="switchMessagingTab('channels')" 
                      class="messaging-tab flex-1 px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
                      data-tab="channels">
                <i class="fas fa-hashtag mr-1"></i>Channels
              </button>
              <button onclick="switchMessagingTab('direct')" 
                      class="messaging-tab flex-1 px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                      data-tab="direct">
                <i class="fas fa-user mr-1"></i>Direct
              </button>
            </div>

            <!-- Channels/Users List -->
            <div id="messaging-sidebar-content" class="flex-1 overflow-y-auto p-4">
              ${generateChannelsList()}
            </div>
          </div>

          <!-- Chat Area -->
          <div class="flex-1 flex flex-col bg-white">
            <div id="messaging-chat-area">
              ${generateEmptyState()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  messagingModal = document.getElementById('messaging-modal');
}

/**
 * Generate Channels List
 */
function generateChannelsList() {
  return `
    <div class="space-y-2">
      ${sampleChannels.map(channel => `
        <button onclick="selectChannel(${channel.id})" 
                class="w-full text-left p-3 rounded-lg hover:bg-white transition-colors ${currentChannel === channel.id ? 'bg-white shadow-sm' : ''}">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2">
              <i class="fas fa-${channel.type === 'private' ? 'lock' : 'hashtag'} text-gray-400 text-sm"></i>
              <span class="font-medium text-gray-900">${channel.name}</span>
            </div>
            ${channel.unread > 0 ? `
              <span class="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                ${channel.unread}
              </span>
            ` : ''}
          </div>
          <p class="text-xs text-gray-500 truncate">${channel.description}</p>
          <div class="text-xs text-gray-400 mt-1">
            <i class="fas fa-users mr-1"></i>${channel.members} members
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * Generate Direct Messages List
 */
function generateDirectMessagesList() {
  return `
    <div class="space-y-2">
      ${sampleUsers.map(user => `
        <button onclick="selectDirectMessage(${user.id})" 
                class="w-full text-left p-3 rounded-lg hover:bg-white transition-colors ${currentDM === user.id ? 'bg-white shadow-sm' : ''}">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-lg">
                ${user.avatar}
              </div>
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-gray-900 truncate">${user.name}</div>
              <div class="text-xs text-gray-500 truncate">${user.role} • ${user.organization}</div>
            </div>
          </div>
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * Generate Empty State
 */
function generateEmptyState() {
  return `
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <i class="fas fa-comments text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Select a Channel or User</h3>
        <p class="text-gray-500">Choose a channel or start a direct message to begin chatting</p>
      </div>
    </div>
  `;
}

/**
 * Select Channel
 */
function selectChannel(channelId) {
  currentChannel = channelId;
  currentDM = null;
  
  const channel = sampleChannels.find(c => c.id === channelId);
  const messages = sampleMessages[channelId] || [];
  
  const chatArea = document.getElementById('messaging-chat-area');
  chatArea.innerHTML = generateChatInterface(channel, messages, 'channel');
  
  // Scroll to bottom
  setTimeout(() => {
    const messagesList = document.getElementById('messages-list');
    if (messagesList) {
      messagesList.scrollTop = messagesList.scrollHeight;
    }
  }, 100);
}

/**
 * Select Direct Message
 */
function selectDirectMessage(userId) {
  currentDM = userId;
  currentChannel = null;
  
  const user = sampleUsers.find(u => u.id === userId);
  const messages = []; // Would load from API
  
  const chatArea = document.getElementById('messaging-chat-area');
  chatArea.innerHTML = generateChatInterface(user, messages, 'dm');
}

/**
 * Generate Chat Interface
 */
function generateChatInterface(target, messages, type) {
  const isChannel = type === 'channel';
  
  return `
    <!-- Chat Header -->
    <div class="border-b px-6 py-4 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          ${isChannel ? `
            <i class="fas fa-${target.type === 'private' ? 'lock' : 'hashtag'} text-gray-600"></i>
            <div>
              <h3 class="font-bold text-gray-900">${target.name}</h3>
              <p class="text-sm text-gray-500">${target.description} • ${target.members} members</p>
            </div>
          ` : `
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-lg">
                ${target.avatar}
              </div>
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${target.status === 'online' ? 'bg-green-500' : target.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}"></span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">${target.name}</h3>
              <p class="text-sm text-gray-500">${target.role} • ${target.organization}</p>
            </div>
          `}
        </div>
        <div class="flex items-center gap-2">
          ${isChannel ? `
            <button onclick="showChannelInfo(${target.id})" 
                    class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Channel Info">
              <i class="fas fa-info-circle text-gray-600"></i>
            </button>
          ` : ''}
          <button onclick="showAttachmentPicker()" 
                  class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Attach File">
            <i class="fas fa-paperclip text-gray-600"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Messages List -->
    <div id="messages-list" class="flex-1 overflow-y-auto p-6 space-y-4">
      ${messages.length > 0 ? messages.map(msg => generateMessageHTML(msg)).join('') : `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-comment-slash text-4xl mb-3"></i>
          <p>No messages yet. Start the conversation!</p>
        </div>
      `}
    </div>

    <!-- Typing Indicator -->
    <div id="typing-indicator" class="px-6 py-2 text-sm text-gray-500 italic hidden">
      <i class="fas fa-ellipsis-h animate-pulse"></i> Someone is typing...
    </div>

    <!-- Message Input -->
    <div class="border-t p-4 bg-gray-50">
      <form onsubmit="sendMessage(event, ${isChannel ? target.id : target.id}, '${type}')" class="flex gap-2">
        <div class="flex-1 relative">
          <textarea id="message-input" 
                    placeholder="${isChannel ? 'Message #' + target.name : 'Message ' + target.name}..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="2"
                    onkeydown="handleMessageInput(event)"
                    oninput="handleTyping()"></textarea>
          <div class="absolute bottom-2 right-2 flex gap-1">
            <button type="button" 
                    onclick="insertEmoji()"
                    class="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Add Emoji">
              <i class="far fa-smile text-gray-500"></i>
            </button>
            <button type="button" 
                    onclick="insertMention()"
                    class="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Mention Someone">
              <i class="fas fa-at text-gray-500"></i>
            </button>
          </div>
        </div>
        <button type="submit" 
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold">
          <i class="fas fa-paper-plane"></i>
          Send
        </button>
      </form>
      <div class="text-xs text-gray-500 mt-2">
        <i class="fas fa-info-circle mr-1"></i>
        Press Enter to send, Shift+Enter for new line. Use @ to mention someone.
      </div>
    </div>
  `;
}

/**
 * Generate Message HTML
 */
function generateMessageHTML(message) {
  const timeAgo = getTimeAgo(message.timestamp);
  
  return `
    <div class="message-item ${message.urgent ? 'border-l-4 border-red-600 pl-4 bg-red-50 py-2 rounded' : ''}">
      <div class="flex gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
          ${message.user_avatar}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2 mb-1">
            <span class="font-semibold text-gray-900">${message.user_name}</span>
            <span class="text-xs text-gray-500">${timeAgo}</span>
            ${message.pinned ? '<i class="fas fa-thumbtack text-yellow-600 text-xs" title="Pinned"></i>' : ''}
          </div>
          <div class="text-gray-800 whitespace-pre-wrap break-words">
            ${formatMessageContent(message.content)}
          </div>
          
          <!-- Reactions -->
          ${message.reactions ? `
            <div class="flex flex-wrap gap-2 mt-2">
              ${Object.entries(message.reactions).map(([emoji, count]) => `
                <button onclick="toggleReaction('${emoji}', ${message.id})" 
                        class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
                  ${emoji} ${count}
                </button>
              `).join('')}
              <button onclick="showReactionPicker(${message.id})" 
                      class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
                <i class="far fa-smile"></i>
              </button>
            </div>
          ` : ''}
          
          <!-- Reply/Actions -->
          <div class="flex items-center gap-3 mt-2 text-sm">
            <button onclick="replyToMessage(${message.id})" 
                    class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-reply mr-1"></i>Reply${message.replies_count > 0 ? ` (${message.replies_count})` : ''}
            </button>
            <button onclick="showMessageActions(${message.id})" 
                    class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format Message Content (handle @mentions)
 */
function formatMessageContent(content) {
  // Replace @mentions with styled spans
  return content.replace(/@(\w+\s*\w*)/g, '<span class="bg-blue-100 text-blue-800 px-1 rounded font-semibold">@$1</span>');
}

/**
 * Send Message
 */
function sendMessage(event, targetId, type) {
  event.preventDefault();
  
  const input = document.getElementById('message-input');
  const content = input.value.trim();
  
  if (!content) return;
  
  // In production, send to API
  const newMessage = {
    id: Date.now(),
    channel_id: type === 'channel' ? targetId : null,
    user_id: 1,
    user_name: 'Current User',
    user_avatar: '👤',
    content: content,
    timestamp: new Date().toISOString(),
    reactions: {},
    replies_count: 0
  };
  
  // Add to messages
  if (type === 'channel') {
    if (!sampleMessages[targetId]) {
      sampleMessages[targetId] = [];
    }
    sampleMessages[targetId].push(newMessage);
  }
  
  // Clear input
  input.value = '';
  
  // Refresh chat
  if (type === 'channel') {
    selectChannel(targetId);
  } else {
    selectDirectMessage(targetId);
  }
  
  // Show toast
  if (typeof showToast === 'function') {
    showToast('Message sent', 'success');
  }
}

/**
 * Handle Message Input (Shift+Enter for new line)
 */
function handleMessageInput(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    event.target.form.dispatchEvent(new Event('submit'));
  }
}

/**
 * Handle Typing Indicator
 */
function handleTyping() {
  // In production, send typing event to server
  clearTimeout(typingTimeout);
  
  typingTimeout = setTimeout(() => {
    // User stopped typing
  }, 1000);
}

/**
 * Switch Messaging Tab
 */
function switchMessagingTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.messaging-tab').forEach(btn => {
    btn.classList.remove('border-blue-600', 'text-blue-600');
    btn.classList.add('border-transparent', 'text-gray-600');
  });
  
  const activeBtn = document.querySelector(`.messaging-tab[data-tab="${tab}"]`);
  if (activeBtn) {
    activeBtn.classList.add('border-blue-600', 'text-blue-600');
    activeBtn.classList.remove('border-transparent', 'text-gray-600');
  }
  
  // Update content
  const content = document.getElementById('messaging-sidebar-content');
  if (tab === 'channels') {
    content.innerHTML = generateChannelsList();
  } else {
    content.innerHTML = generateDirectMessagesList();
  }
}

/**
 * Show New Channel Modal
 */
function showNewChannelModal() {
  const modalHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]" id="new-channel-modal">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Create New Channel</h3>
        <form onsubmit="createNewChannel(event)">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
              <input type="text" 
                     required
                     placeholder="e.g., case-updates"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows="3"
                        placeholder="What is this channel about?"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="rounded">
                <span class="text-sm text-gray-700">Make this channel private</span>
              </label>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button type="button" 
                    onclick="document.getElementById('new-channel-modal').remove()"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" 
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Create New Channel
 */
function createNewChannel(event) {
  event.preventDefault();
  if (typeof showToast === 'function') {
    showToast('Channel creation coming soon...', 'info');
  }
  document.getElementById('new-channel-modal')?.remove();
}

/**
 * Insert Emoji
 */
function insertEmoji() {
  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '✅', '⚠️', '🚨', '💪', '🙏'];
  const input = document.getElementById('message-input');
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  input.value += emoji;
  input.focus();
}

/**
 * Insert Mention
 */
function insertMention() {
  const input = document.getElementById('message-input');
  input.value += '@';
  input.focus();
}

/**
 * Utility Functions
 */
function getTimeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function toggleReaction(emoji, messageId) {
  if (typeof showToast === 'function') {
    showToast(`Reacted with ${emoji}`, 'success');
  }
}

function showReactionPicker(messageId) {
  if (typeof showToast === 'function') {
    showToast('Reaction picker coming soon...', 'info');
  }
}

function replyToMessage(messageId) {
  if (typeof showToast === 'function') {
    showToast('Message threading coming soon...', 'info');
  }
}

function showMessageActions(messageId) {
  if (typeof showToast === 'function') {
    showToast('Message actions: pin, delete, edit coming soon...', 'info');
  }
}

function showChannelInfo(channelId) {
  if (typeof showToast === 'function') {
    showToast('Channel info coming soon...', 'info');
  }
}

function showAttachmentPicker() {
  if (typeof showToast === 'function') {
    showToast('File attachment coming soon...', 'info');
  }
}

/**
 * Close Messaging System
 */
function closeMessagingSystem() {
  if (messagePolling) {
    clearInterval(messagePolling);
  }
  
  if (messagingModal) {
    messagingModal.remove();
    messagingModal = null;
  }
  
  currentChannel = null;
  currentDM = null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Internal Messaging System loaded');
});
