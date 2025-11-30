/**
 * GBV Dashboard - Smart Notifications System
 * Real-time alerts, browser push notifications, priority-based notifications
 */

// Notification state
let notificationsEnabled = false;
let notificationPermission = 'default';
let notificationQueue = [];
let unreadCount = 0;

// Sample notifications (will be replaced with API)
const sampleNotifications = [
    {
        id: 1,
        type: 'case_assignment',
        title: 'New Case Assigned',
        message: 'Case GBV-2025-0156 has been assigned to you',
        priority: 'high',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        link: '/cases/GBV-2025-0156',
        icon: 'fa-folder-open'
    },
    {
        id: 2,
        type: 'followup_due',
        title: 'Follow-up Appointment Due',
        message: 'Case GBV-2025-0134 follow-up scheduled for today at 2:00 PM',
        priority: 'urgent',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
        link: '/cases/GBV-2025-0134',
        icon: 'fa-calendar-check'
    },
    {
        id: 3,
        type: 'training',
        title: 'Training Module Due',
        message: 'Complete "Survivor-Centered Case Management" by Friday',
        priority: 'medium',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
        link: '/education',
        icon: 'fa-graduation-cap'
    },
    {
        id: 4,
        type: 'system',
        title: 'New Features Available',
        message: 'Check out the new AI Chatbot and Dark Mode features!',
        priority: 'low',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
        link: null,
        icon: 'fa-sparkles'
    }
];

// Initialize notifications
function initNotifications() {
    checkNotificationPermission();
    createNotificationButton();
    loadNotifications();
    startNotificationPolling();
}

// Check notification permission
async function checkNotificationPermission() {
    if ('Notification' in window) {
        notificationPermission = Notification.permission;
        
        if (notificationPermission === 'granted') {
            notificationsEnabled = true;
        }
    }
}

// Request notification permission
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return false;
    }
    
    if (Notification.permission === 'granted') {
        notificationsEnabled = true;
        return true;
    }
    
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        notificationPermission = permission;
        
        if (permission === 'granted') {
            notificationsEnabled = true;
            showToast('Notifications enabled! You will receive alerts for important updates.', 'success');
            return true;
        }
    }
    
    if (Notification.permission === 'denied') {
        showToast('Notifications are blocked. Please enable them in your browser settings.', 'warning');
    }
    
    return false;
}

// Create notification button
function createNotificationButton() {
    const button = document.createElement('button');
    button.id = 'notifications-button';
    button.className = 'fixed top-4 right-20 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center border border-gray-200 dark:border-gray-700 relative';
    button.innerHTML = `
        <i class="fas fa-bell text-xl text-gray-700 dark:text-gray-300"></i>
        <span id="notification-badge" class="hidden absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"></span>
    `;
    button.onclick = toggleNotificationPanel;
    button.title = 'Notifications';
    
    document.body.appendChild(button);
    
    updateNotificationBadge();
}

// Toggle notification panel
function toggleNotificationPanel() {
    const existingPanel = document.getElementById('notification-panel');
    
    if (existingPanel) {
        closeNotificationPanel();
    } else {
        openNotificationPanel();
    }
}

// Open notification panel
function openNotificationPanel() {
    const panel = document.createElement('div');
    panel.id = 'notification-panel';
    panel.className = 'fixed top-20 right-4 w-96 max-h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden animate-slide-down';
    panel.innerHTML = `
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fas fa-bell text-xl"></i>
                <div>
                    <div class="font-semibold">Notifications</div>
                    <div class="text-xs text-blue-100">${unreadCount} unread</div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                ${!notificationsEnabled ? `
                    <button onclick="requestNotificationPermission()" class="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all">
                        Enable Alerts
                    </button>
                ` : ''}
                <button onclick="closeNotificationPanel()" class="w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
        </div>
        
        <!-- Filters -->
        <div class="border-b border-gray-200 dark:border-gray-700 p-3">
            <div class="flex gap-2 overflow-x-auto">
                <button onclick="filterNotifications('all')" class="filter-btn active px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    All
                </button>
                <button onclick="filterNotifications('unread')" class="filter-btn px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    Unread (${unreadCount})
                </button>
                <button onclick="filterNotifications('urgent')" class="filter-btn px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    Urgent
                </button>
            </div>
        </div>
        
        <!-- Notifications List -->
        <div id="notifications-list" class="flex-1 overflow-y-auto">
            ${renderNotifications(sampleNotifications)}
        </div>
        
        <!-- Footer -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
            <button onclick="markAllAsRead()" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Mark all as read
            </button>
            <button onclick="clearAllNotifications()" class="text-sm text-red-600 dark:text-red-400 hover:underline">
                Clear all
            </button>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// Close notification panel
function closeNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
        panel.remove();
    }
}

// Render notifications
function renderNotifications(notifications, filter = 'all') {
    let filtered = notifications;
    
    if (filter === 'unread') {
        filtered = notifications.filter(n => !n.read);
    } else if (filter === 'urgent') {
        filtered = notifications.filter(n => n.priority === 'urgent');
    }
    
    if (filtered.length === 0) {
        return `
            <div class="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <i class="fas fa-bell-slash text-4xl mb-3"></i>
                <p>No notifications</p>
            </div>
        `;
    }
    
    return filtered.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'} border-b border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
             onclick="handleNotificationClick(${notification.id})"
             data-priority="${notification.priority}">
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getPriorityColor(notification.priority)}">
                    <i class="fas ${notification.icon} text-white"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2 mb-1">
                        <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-200">${notification.title}</h4>
                        ${!notification.read ? '<div class="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>' : ''}
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${notification.message}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500 dark:text-gray-500">${formatTimestamp(notification.timestamp)}</span>
                        ${notification.priority === 'urgent' ? '<span class="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full">Urgent</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get priority color
function getPriorityColor(priority) {
    const colors = {
        'urgent': 'bg-red-500',
        'high': 'bg-orange-500',
        'medium': 'bg-blue-500',
        'low': 'bg-gray-400'
    };
    return colors[priority] || colors.medium;
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

// Handle notification click
function handleNotificationClick(id) {
    const notification = sampleNotifications.find(n => n.id === id);
    if (!notification) return;
    
    // Mark as read
    notification.read = true;
    updateUnreadCount();
    updateNotificationBadge();
    
    // Navigate if has link
    if (notification.link) {
        window.location.href = notification.link;
    }
    
    closeNotificationPanel();
}

// Filter notifications
function filterNotifications(filter) {
    const list = document.getElementById('notifications-list');
    if (!list) return;
    
    list.innerHTML = renderNotifications(sampleNotifications, filter);
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
    });
    
    event.target.classList.add('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
    event.target.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
}

// Mark all as read
function markAllAsRead() {
    sampleNotifications.forEach(n => n.read = true);
    updateUnreadCount();
    updateNotificationBadge();
    
    const list = document.getElementById('notifications-list');
    if (list) {
        list.innerHTML = renderNotifications(sampleNotifications);
    }
    
    showToast('All notifications marked as read', 'success');
}

// Clear all notifications
function clearAllNotifications() {
    if (confirm('Are you sure you want to clear all notifications?')) {
        sampleNotifications.length = 0;
        updateUnreadCount();
        updateNotificationBadge();
        closeNotificationPanel();
        showToast('All notifications cleared', 'success');
    }
}

// Update unread count
function updateUnreadCount() {
    unreadCount = sampleNotifications.filter(n => !n.read).length;
}

// Update notification badge
function updateNotificationBadge() {
    const badge = document.getElementById('notification-badge');
    if (!badge) return;
    
    if (unreadCount > 0) {
        badge.classList.remove('hidden');
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    } else {
        badge.classList.add('hidden');
    }
}

// Load notifications (from API in future)
function loadNotifications() {
    updateUnreadCount();
    updateNotificationBadge();
}

// Start polling for new notifications
function startNotificationPolling() {
    // Check for new notifications every 30 seconds
    setInterval(() => {
        // In production, this would call an API
        // For now, we'll simulate a new notification occasionally
        if (Math.random() < 0.1) { // 10% chance
            addNewNotification({
                id: Date.now(),
                type: 'system',
                title: 'New Update',
                message: 'A new case update is available',
                priority: 'medium',
                timestamp: new Date().toISOString(),
                read: false,
                link: null,
                icon: 'fa-info-circle'
            });
        }
    }, 30000);
}

// Add new notification
function addNewNotification(notification) {
    sampleNotifications.unshift(notification);
    updateUnreadCount();
    updateNotificationBadge();
    
    // Show browser notification if enabled
    if (notificationsEnabled && notification.priority !== 'low') {
        showBrowserNotification(notification);
    }
    
    // Show in-app toast for urgent notifications
    if (notification.priority === 'urgent') {
        showToast(`🚨 ${notification.title}: ${notification.message}`, 'error', 5000);
    }
}

// Show browser notification
function showBrowserNotification(notification) {
    if (!notificationsEnabled || !('Notification' in window)) return;
    
    const options = {
        body: notification.message,
        icon: '/static/ministry-logo.png',
        badge: '/static/ministry-logo.png',
        tag: notification.id.toString(),
        requireInteraction: notification.priority === 'urgent',
        silent: notification.priority === 'low'
    };
    
    const browserNotification = new Notification(notification.title, options);
    
    browserNotification.onclick = () => {
        window.focus();
        handleNotificationClick(notification.id);
        browserNotification.close();
    };
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 left-1/2 transform -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up max-w-md`;
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// Export functions
window.toggleNotificationPanel = toggleNotificationPanel;
window.closeNotificationPanel = closeNotificationPanel;
window.requestNotificationPermission = requestNotificationPermission;
window.filterNotifications = filterNotifications;
window.handleNotificationClick = handleNotificationClick;
window.markAllAsRead = markAllAsRead;
window.clearAllNotifications = clearAllNotifications;
window.showToast = showToast;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotifications);
} else {
    initNotifications();
}
