// Real-time System - Live Updates & Cross-Portal Communication
console.log('⚡ Real-time System Loading...');

// Real-time System for Live Updates and Cross-Portal Communication
window.realTimeSystem = (function() {
    
    // Real-time connection status
    let isConnected = true;
    let heartbeatInterval = null;
    let updateInterval = null;
    let notificationQueue = [];
    
    // Portal status tracking
    const portalStatus = {
        ministry: { active: true, lastUpdate: Date.now() },
        rainbo: { active: false, lastUpdate: null },
        police: { active: false, lastUpdate: null }
    };

    // Real-time metrics
    const realTimeMetrics = {
        totalUpdates: 0,
        messagesSent: 0,
        notificationsDelivered: 0,
        systemUptime: Date.now(),
        avgResponseTime: 150, // milliseconds
        connectionQuality: 'excellent'
    };

    // Live case tracking
    const liveCaseUpdates = new Map();
    
    // Initialize real-time system
    function initializeRealTimeSystem() {
        console.log('🚀 Initializing Real-time Communication System...');
        
        // Create real-time interface
        createRealTimeInterface();
        
        // Start real-time services
        startHeartbeat();
        startUpdateLoop();
        startNotificationSystem();
        
        // Set up cross-portal communication
        setupCrossPortalCommunication();
        
        // Monitor portal activity
        monitorPortalActivity();
        
        console.log('✅ Real-time System initialized successfully!');
    }

    // Create real-time interface
    function createRealTimeInterface() {
        // Add real-time status indicator
        addRealTimeStatusIndicator();
        
        // Create live updates panel
        createLiveUpdatesPanel();
        
        // Add notification center
        createNotificationCenter();
    }

    // Add real-time status indicator
    function addRealTimeStatusIndicator() {
        const existingIndicator = document.getElementById('realtime-status');
        if (existingIndicator) existingIndicator.remove();

        // Find header to add status to
        const header = document.querySelector('header .max-w-7xl .flex.items-center.justify-between');
        if (!header) return;
        
        const rightSection = header.querySelector('.flex.items-center.space-x-4');
        if (!rightSection) return;

        const indicator = document.createElement('div');
        indicator.id = 'realtime-status';
        indicator.className = 'relative';
        indicator.innerHTML = `
            <!-- Real-time Status Trigger Button -->
            <button id="realtime-trigger" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <div class="flex items-center space-x-1">
                    <div id="connection-dot" class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-medium">Live</span>
                </div>
                <i class="fas fa-chevron-down text-xs"></i>
            </button>
            
            <!-- Real-time Status Panel (Hidden by default) -->
            <div id="realtime-panel" class="hidden absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64 z-50">
                <div class="flex items-center justify-between mb-3">
                    <h6 class="font-semibold text-gray-900 text-sm">Real-time System Status</h6>
                    <button id="close-realtime-panel" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
                
                <div id="realtime-content" class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-600">Connection</span>
                        <div class="flex items-center space-x-1">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span id="connection-text" class="text-xs text-green-600 font-medium">Live</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-600">Portals Online</span>
                        <span id="portals-online" class="text-xs font-medium text-gray-900">1/3</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-600">Live Updates</span>
                        <span id="live-updates-count" class="text-xs font-medium text-blue-600">0</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-600">Response Time</span>
                        <span id="response-time" class="text-xs font-medium text-gray-900">150ms</span>
                    </div>
                    
                    <div class="border-t border-gray-100 pt-2">
                        <div class="grid grid-cols-3 gap-1 text-center">
                            <div class="portal-indicator" data-portal="ministry">
                                <div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                                <div class="text-xs text-gray-600">Ministry</div>
                            </div>
                            <div class="portal-indicator" data-portal="rainbo">
                                <div class="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                                <div class="text-xs text-gray-600">Rainbo</div>
                            </div>
                            <div class="portal-indicator" data-portal="police">
                                <div class="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                                <div class="text-xs text-gray-600">Police</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before the user icon in header
        const userIcon = rightSection.querySelector('.w-8.h-8.bg-blue-600');
        if (userIcon && userIcon.parentElement) {
            rightSection.insertBefore(indicator, userIcon.parentElement);
        } else {
            rightSection.appendChild(indicator);
        }
        
        // Add event listeners for dropdown
        const trigger = document.getElementById('realtime-trigger');
        const panel = document.getElementById('realtime-panel');
        const closeBtn = document.getElementById('close-realtime-panel');
        
        if (trigger && panel) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.classList.toggle('hidden');
            });
        }
        
        if (closeBtn && panel) {
            closeBtn.addEventListener('click', () => {
                panel.classList.add('hidden');
            });
        }
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (panel && !indicator.contains(e.target)) {
                panel.classList.add('hidden');
            }
        });
    }

    // Create live updates panel
    function createLiveUpdatesPanel() {
        const existingPanel = document.getElementById('live-updates-panel');
        if (existingPanel) existingPanel.remove();

        const panel = document.createElement('div');
        panel.id = 'live-updates-panel';
        panel.className = 'hidden fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 w-96 max-h-96 overflow-hidden z-50';
        panel.innerHTML = `
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-broadcast-tower"></i>
                        <h6 class="font-semibold">Live Updates</h6>
                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <button id="close-live-updates" class="text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <div id="live-updates-list" class="space-y-3 max-h-64 overflow-y-auto">
                    <div class="text-center text-gray-500 text-sm py-4">
                        <i class="fas fa-satellite-dish text-2xl mb-2"></i>
                        <p>Monitoring for live updates...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
    }

    // Create notification center
    function createNotificationCenter() {
        const existingCenter = document.getElementById('notification-center');
        if (existingCenter) existingCenter.remove();

        const center = document.createElement('div');
        center.id = 'notification-center';
        center.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
        
        document.body.appendChild(center);
    }

    // Start heartbeat to monitor connection
    function startHeartbeat() {
        heartbeatInterval = setInterval(() => {
            // Simulate connection check
            checkConnection();
            updateConnectionStatus();
        }, 5000); // Every 5 seconds
    }

    // Start update loop for real-time data
    function startUpdateLoop() {
        updateInterval = setInterval(() => {
            // Check for system updates
            checkSystemUpdates();
            
            // Update metrics
            updateRealTimeMetrics();
            
            // Process notification queue
            processNotificationQueue();
            
        }, 2000); // Every 2 seconds
    }

    // Start notification system
    function startNotificationSystem() {
        // Listen for custom events from all portals
        setupEventListeners();
        
        // Monitor DOM changes for portal activity
        setupPortalMonitoring();
    }

    // Set up cross-portal communication
    function setupCrossPortalCommunication() {
        // Create shared event bus
        window.eventBus = {
            emit: function(eventType, data) {
                const event = new CustomEvent(eventType, { detail: data });
                document.dispatchEvent(event);
                
                // Track the event
                realTimeMetrics.messagesSent++;
                addLiveUpdate('system', `Event emitted: ${eventType}`, 'info');
                
                console.log(`📡 Event Bus: ${eventType}`, data);
            },
            
            on: function(eventType, handler) {
                document.addEventListener(eventType, handler);
            }
        };

        // Set up cross-portal event handlers
        setupCrossPortalEventHandlers();
    }

    // Set up cross-portal event handlers
    function setupCrossPortalEventHandlers() {
        // Listen for new case reports
        window.eventBus.on('new_case_reported', function(e) {
            const caseData = e.detail;
            
            // Broadcast to all relevant portals
            broadcastNewCase(caseData);
            
            // Update live tracking
            liveCaseUpdates.set(caseData.case_number, {
                status: 'reported',
                lastUpdate: Date.now(),
                portalsNotified: []
            });
            
            addLiveUpdate('case', `New case reported: ${caseData.case_number}`, 'success');
        });

        // Listen for case status updates
        window.eventBus.on('case_status_updated', function(e) {
            const updateData = e.detail;
            
            // Update live tracking
            if (liveCaseUpdates.has(updateData.case_number)) {
                const tracking = liveCaseUpdates.get(updateData.case_number);
                tracking.status = updateData.status;
                tracking.lastUpdate = Date.now();
                liveCaseUpdates.set(updateData.case_number, tracking);
            }
            
            addLiveUpdate('update', `Case ${updateData.case_number} status: ${updateData.status}`, 'info');
        });

        // Listen for service assignments
        window.eventBus.on('service_assigned', function(e) {
            const serviceData = e.detail;
            addLiveUpdate('service', `Service assigned: ${serviceData.service_type} for ${serviceData.case_number}`, 'success');
        });

        // Listen for investigation updates
        window.eventBus.on('investigation_updated', function(e) {
            const investigationData = e.detail;
            addLiveUpdate('investigation', `Investigation update: ${investigationData.case_number} - ${investigationData.stage}`, 'warning');
        });
    }

    // Broadcast new case to all portals
    function broadcastNewCase(caseData) {
        console.log('📡 Broadcasting new case to all portals:', caseData);
        
        // Create comprehensive notification object
        const notification = {
            type: 'new_case',
            case_number: caseData.case_number || generateCaseNumber(),
            incident_type: caseData.template || caseData.incident_type,
            priority: determineCasePriority(caseData),
            district: caseData.basic_info?.district || caseData.district,
            services_needed: caseData.services_needed || [],
            timestamp: new Date().toISOString(),
            reporter_info: caseData.reporter_info || {},
            incident_details: caseData.incident_details || {}
        };

        // Send to Rainbo Initiative if services are needed
        const rainboServices = ['medical', 'counseling', 'shelter', 'nutrition', 'economic'];
        const needsRainbo = notification.services_needed.some(service => 
            rainboServices.includes(service)
        );
        
        if (needsRainbo && typeof window.rainboPortal !== 'undefined') {
            window.rainboPortal.receiveServiceRequest(notification);
            markPortalNotified('rainbo', notification.case_number);
            addLiveUpdate('rainbo', `Rainbo notified for case ${notification.case_number}`, 'success');
        }

        // Send to Police FSU for investigation
        if (typeof window.policeFSUPortal !== 'undefined') {
            window.policeFSUPortal.receiveInvestigationCase(notification);
            markPortalNotified('police', notification.case_number);
            addLiveUpdate('police', `Police FSU notified for case ${notification.case_number}`, 'success');
        }

        // Update main dashboard in real-time
        updateMainDashboardRealTime(notification);
        
        // Show cross-portal notification
        showCrossPortalNotification(notification);
        
        // Track the broadcast
        realTimeMetrics.notificationsDelivered++;
    }

    // Mark portal as notified for a case
    function markPortalNotified(portal, caseNumber) {
        if (liveCaseUpdates.has(caseNumber)) {
            const tracking = liveCaseUpdates.get(caseNumber);
            if (!tracking.portalsNotified.includes(portal)) {
                tracking.portalsNotified.push(portal);
                liveCaseUpdates.set(caseNumber, tracking);
            }
        }
    }

    // Generate case number if not provided
    function generateCaseNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `GBV-SL-${new Date().getFullYear()}-${random}`;
    }

    // Determine case priority based on data
    function determineCasePriority(caseData) {
        if (caseData.template === 'sexual_violence' || caseData.template === 'trafficking') {
            return 'critical';
        }
        if (caseData.template === 'child_abuse' || caseData.services_needed?.includes('medical')) {
            return 'high';
        }
        return 'medium';
    }

    // Update main dashboard in real-time
    function updateMainDashboardRealTime(notification) {
        // Refresh KPI cards
        if (typeof window.GBVDashboard !== 'undefined' && window.GBVDashboard.loadData) {
            setTimeout(() => {
                window.GBVDashboard.loadData();
            }, 1000);
        }
        
        // Show alert banner
        const alertBanner = document.getElementById('alert-banner');
        const alertMessage = document.getElementById('alert-message');
        
        if (alertBanner && alertMessage) {
            alertMessage.innerHTML = `
                🚨 <strong>LIVE UPDATE:</strong> New ${notification.incident_type.replace('_', ' ')} case reported in ${notification.district}
                <span class="ml-2 bg-red-600 text-white px-2 py-1 rounded text-xs">CASE: ${notification.case_number}</span>
            `;
            alertBanner.classList.remove('hidden');
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                alertBanner.classList.add('hidden');
            }, 10000);
        }
    }

    // Show cross-portal notification
    function showCrossPortalNotification(notification) {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg p-4 transform transition-all duration-500 translate-x-full';
        notificationElement.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <i class="fas fa-broadcast-tower text-xl"></i>
                </div>
                <div class="flex-1">
                    <div class="font-semibold text-sm">Cross-Portal Notification</div>
                    <div class="text-xs opacity-90 mt-1">
                        Case ${notification.case_number} broadcast to all connected portals
                    </div>
                    <div class="flex items-center space-x-2 mt-2">
                        <span class="bg-white text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            ${notification.priority.toUpperCase()}
                        </span>
                        <span class="text-xs opacity-75">
                            ${notification.district}
                        </span>
                    </div>
                </div>
                <button class="text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const notificationCenter = document.getElementById('notification-center');
        if (notificationCenter) {
            notificationCenter.appendChild(notificationElement);
            
            // Animate in
            setTimeout(() => {
                notificationElement.classList.remove('translate-x-full');
            }, 100);
            
            // Auto-remove after 8 seconds
            setTimeout(() => {
                notificationElement.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notificationElement.parentElement) {
                        notificationElement.remove();
                    }
                }, 500);
            }, 8000);
        }
    }

    // Add live update to panel
    function addLiveUpdate(type, message, level) {
        const updatesList = document.getElementById('live-updates-list');
        if (!updatesList) return;

        // Clear placeholder if exists
        const placeholder = updatesList.querySelector('.text-center');
        if (placeholder) placeholder.remove();

        const iconMap = {
            'case': 'fa-file-alt',
            'service': 'fa-hands-helping',
            'investigation': 'fa-search',
            'update': 'fa-sync',
            'system': 'fa-cog',
            'rainbo': 'fa-rainbow',
            'police': 'fa-shield-alt'
        };

        const colorMap = {
            'success': 'text-green-600',
            'info': 'text-blue-600',
            'warning': 'text-yellow-600',
            'error': 'text-red-600'
        };

        const updateElement = document.createElement('div');
        updateElement.className = 'flex items-start space-x-3 p-3 bg-gray-50 rounded-lg';
        updateElement.innerHTML = `
            <div class="flex-shrink-0">
                <i class="fas ${iconMap[type] || 'fa-info'} ${colorMap[level] || 'text-gray-600'}"></i>
            </div>
            <div class="flex-1">
                <div class="text-sm text-gray-900">${message}</div>
                <div class="text-xs text-gray-500">${new Date().toLocaleTimeString()}</div>
            </div>
        `;

        updatesList.insertBefore(updateElement, updatesList.firstChild);

        // Keep only last 20 updates
        const updates = updatesList.children;
        if (updates.length > 20) {
            updatesList.removeChild(updates[updates.length - 1]);
        }

        // Update counter
        const counter = document.getElementById('live-updates-count');
        if (counter) {
            counter.textContent = parseInt(counter.textContent) + 1;
        }

        realTimeMetrics.totalUpdates++;
    }

    // Check connection status
    function checkConnection() {
        // Simulate connection check with occasional issues
        const random = Math.random();
        const wasConnected = isConnected;
        
        if (random < 0.05) { // 5% chance of connection issue
            isConnected = false;
        } else {
            isConnected = true;
        }
        
        // If connection status changed, update UI
        if (wasConnected !== isConnected) {
            updateConnectionStatus();
            
            if (isConnected) {
                addLiveUpdate('system', 'Connection restored', 'success');
            } else {
                addLiveUpdate('system', 'Connection lost - attempting reconnect', 'error');
            }
        }
    }

    // Update connection status in UI
    function updateConnectionStatus() {
        const dot = document.getElementById('connection-dot');
        const text = document.getElementById('connection-text');
        
        if (dot && text) {
            if (isConnected) {
                dot.className = 'w-2 h-2 bg-green-500 rounded-full animate-pulse';
                text.className = 'text-xs text-green-600 font-medium';
                text.textContent = 'Live';
            } else {
                dot.className = 'w-2 h-2 bg-red-500 rounded-full';
                text.className = 'text-xs text-red-600 font-medium';
                text.textContent = 'Offline';
            }
        }
    }

    // Monitor portal activity
    function monitorPortalActivity() {
        setInterval(() => {
            // Check which portals are currently open
            const ministryActive = !document.getElementById('dashboard-content')?.classList.contains('hidden');
            const rainboActive = !document.getElementById('rainbo-portal-modal')?.classList.contains('hidden');
            const policeActive = !document.getElementById('police-fsu-modal')?.classList.contains('hidden');
            
            // Update portal status
            portalStatus.ministry.active = ministryActive;
            portalStatus.rainbo.active = rainboActive;
            portalStatus.police.active = policeActive;
            
            if (ministryActive) portalStatus.ministry.lastUpdate = Date.now();
            if (rainboActive) portalStatus.rainbo.lastUpdate = Date.now();
            if (policeActive) portalStatus.police.lastUpdate = Date.now();
            
            // Update UI
            updatePortalIndicators();
            
        }, 1000);
    }

    // Update portal indicators
    function updatePortalIndicators() {
        const indicators = document.querySelectorAll('.portal-indicator');
        
        indicators.forEach(indicator => {
            const portal = indicator.dataset.portal;
            const dot = indicator.querySelector('.w-3');
            const status = portalStatus[portal];
            
            if (status && status.active) {
                dot.className = 'w-3 h-3 bg-green-500 rounded-full mx-auto mb-1 animate-pulse';
            } else {
                dot.className = 'w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1';
            }
        });
        
        // Update portals online count
        const onlineCount = Object.values(portalStatus).filter(status => status.active).length;
        const onlineElement = document.getElementById('portals-online');
        if (onlineElement) {
            onlineElement.textContent = `${onlineCount}/3`;
        }
    }

    // Check for system updates
    function checkSystemUpdates() {
        // Simulate periodic system updates
        if (Math.random() < 0.1) { // 10% chance every 2 seconds
            const updates = [
                'Database synchronized across all portals',
                'New case data synchronized',
                'Performance metrics updated',
                'Security scan completed - all clear',
                'Backup process completed successfully',
                'User session data refreshed'
            ];
            
            const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
            addLiveUpdate('system', randomUpdate, 'info');
        }
    }

    // Update real-time metrics
    function updateRealTimeMetrics() {
        // Update response time with simulation
        const baseTime = 150;
        const variation = Math.random() * 100 - 50; // ±50ms
        realTimeMetrics.avgResponseTime = Math.max(50, baseTime + variation);
        
        // Update connection quality
        if (realTimeMetrics.avgResponseTime < 100) {
            realTimeMetrics.connectionQuality = 'excellent';
        } else if (realTimeMetrics.avgResponseTime < 200) {
            realTimeMetrics.connectionQuality = 'good';
        } else {
            realTimeMetrics.connectionQuality = 'fair';
        }
        
        // Update UI
        const responseTimeElement = document.getElementById('response-time');
        if (responseTimeElement) {
            responseTimeElement.textContent = `${Math.round(realTimeMetrics.avgResponseTime)}ms`;
        }
    }

    // Process notification queue
    function processNotificationQueue() {
        if (notificationQueue.length === 0) return;
        
        const notification = notificationQueue.shift();
        
        // Process the notification
        switch (notification.type) {
            case 'case_update':
                handleCaseUpdate(notification);
                break;
            case 'service_request':
                handleServiceRequest(notification);
                break;
            case 'investigation_update':
                handleInvestigationUpdate(notification);
                break;
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Toggle real-time panel
        document.addEventListener('click', function(e) {
            if (e.target.closest('#toggle-realtime-panel')) {
                toggleRealTimePanel();
            }
            
            if (e.target.closest('#close-live-updates')) {
                closeLiveUpdatesPanel();
            }
            
            // Show live updates panel when clicking on updates count
            if (e.target.closest('#live-updates-count')) {
                showLiveUpdatesPanel();
            }
        });

        // Listen for incident report submissions
        document.addEventListener('click', function(e) {
            if (e.target.closest('#submit-report')) {
                // Wait for form submission to complete, then broadcast
                setTimeout(() => {
                    const formData = collectIncidentFormData();
                    if (formData) {
                        window.eventBus.emit('new_case_reported', formData);
                    }
                }, 1000);
            }
        });
    }

    // Toggle real-time panel
    function toggleRealTimePanel() {
        const content = document.getElementById('realtime-content');
        const button = document.getElementById('toggle-realtime-panel');
        const icon = button.querySelector('i');
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.className = 'fas fa-chevron-up text-xs';
        } else {
            content.classList.add('hidden');
            icon.className = 'fas fa-chevron-down text-xs';
        }
    }

    // Show live updates panel
    function showLiveUpdatesPanel() {
        const panel = document.getElementById('live-updates-panel');
        if (panel) {
            panel.classList.remove('hidden');
        }
    }

    // Close live updates panel
    function closeLiveUpdatesPanel() {
        const panel = document.getElementById('live-updates-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }

    // Collect incident form data (helper function)
    function collectIncidentFormData() {
        if (typeof window.incidentReportSystem !== 'undefined' && 
            window.incidentReportSystem.collectFormData) {
            return window.incidentReportSystem.collectFormData();
        }
        return null;
    }

    // Set up portal monitoring
    function setupPortalMonitoring() {
        // Monitor for modal openings/closings
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    
                    // Check for portal modal changes
                    if (target.id === 'rainbo-portal-modal') {
                        const isHidden = target.classList.contains('hidden');
                        if (!isHidden) {
                            addLiveUpdate('rainbo', 'Rainbo Initiative portal opened', 'info');
                        }
                    } else if (target.id === 'police-fsu-modal') {
                        const isHidden = target.classList.contains('hidden');
                        if (!isHidden) {
                            addLiveUpdate('police', 'Police FSU portal opened', 'info');
                        }
                    }
                }
            });
        });

        // Start observing
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }

    // Handle case update
    function handleCaseUpdate(notification) {
        addLiveUpdate('update', `Case ${notification.case_number} updated: ${notification.update}`, 'info');
    }

    // Handle service request
    function handleServiceRequest(notification) {
        addLiveUpdate('service', `Service request: ${notification.service} for ${notification.case_number}`, 'success');
    }

    // Handle investigation update
    function handleInvestigationUpdate(notification) {
        addLiveUpdate('investigation', `Investigation progress: ${notification.case_number} - ${notification.stage}`, 'warning');
    }

    // Queue notification for processing
    function queueNotification(notification) {
        notificationQueue.push(notification);
    }

    // Public methods
    return {
        init: initializeRealTimeSystem,
        broadcast: broadcastNewCase,
        addUpdate: addLiveUpdate,
        queueNotification: queueNotification,
        getMetrics: () => realTimeMetrics,
        getLiveCases: () => Object.fromEntries(liveCaseUpdates),
        getPortalStatus: () => portalStatus
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.realTimeSystem.init(), 1000);
    });
} else {
    setTimeout(() => window.realTimeSystem.init(), 1000);
}

console.log('⚡ Real-time System Module - Fully Loaded!');
console.log('🔥 Live updates and cross-portal communication system ready!');