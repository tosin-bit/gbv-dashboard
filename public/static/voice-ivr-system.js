// Voice/IVR System - 116 Hotline & Voice Reporting Module  
console.log('📞 Voice/IVR System Loading...');

// Voice/IVR System for 116 Hotline - Ministry GBV Dashboard
window.voiceIVRSystem = (function() {
    
    // Sample call data for 116 hotline
    const callData = [
        {
            id: 'CALL-001',
            phoneNumber: '+232-76-******',
            district: 'Western Area Urban', 
            callType: 'Emergency Report',
            language: 'English',
            duration: '4:23',
            timestamp: '2024-01-15 14:30:15',
            status: 'Completed',
            priority: 'High',
            caseGenerated: 'GBV-2024-001',
            agent: 'Sarah Johnson',
            incidentType: 'Domestic Violence',
            followUpRequired: true,
            voiceQuality: 'Good',
            satisfaction: 4
        },
        {
            id: 'CALL-002',
            phoneNumber: '+232-78-******',
            district: 'Bo',
            callType: 'Information Request',
            language: 'Krio',
            duration: '2:15',
            timestamp: '2024-01-15 14:25:30',
            status: 'Completed',
            priority: 'Medium',
            caseGenerated: null,
            agent: 'Mohamed Kamara',
            incidentType: 'Information',
            followUpRequired: false,
            voiceQuality: 'Excellent',
            satisfaction: 5
        },
        {
            id: 'CALL-003', 
            phoneNumber: '+232-77-******',
            district: 'Kenema',
            callType: 'Crisis Support',
            language: 'Mende',
            duration: '8:42',
            timestamp: '2024-01-15 14:20:10',
            status: 'In Progress',
            priority: 'Critical',
            caseGenerated: 'GBV-2024-002',
            agent: 'Fatmata Bangura',
            incidentType: 'Sexual Violence',
            followUpRequired: true,
            voiceQuality: 'Fair',
            satisfaction: null
        },
        {
            id: 'CALL-004',
            phoneNumber: '+232-79-******',
            district: 'Bombali',
            callType: 'Follow-up Call',
            language: 'Temne',
            duration: '3:56',
            timestamp: '2024-01-15 14:15:45',
            status: 'Completed',
            priority: 'Medium',
            caseGenerated: 'GBV-2024-003',
            agent: 'Ibrahim Koroma',
            incidentType: 'Child Abuse',
            followUpRequired: true,
            voiceQuality: 'Good',
            satisfaction: 4
        }
    ];

    // IVR menu statistics
    const ivrStats = {
        totalCalls: 1247,
        todaysCalls: 67,
        emergencyCalls: 23,
        averageWaitTime: '45 seconds',
        callResolution: 94,
        multilanguageSupport: 4,
        agentAvailability: 89,
        systemUptime: 99.8
    };

    // Voice system agents
    const agents = [
        {
            id: 'AGT-001',
            name: 'Sarah Johnson',
            languages: ['English', 'Krio'],
            status: 'Available',
            currentCall: null,
            todaysCalls: 12,
            rating: 4.8,
            specialization: 'Crisis Counseling',
            experience: '3 years'
        },
        {
            id: 'AGT-002', 
            name: 'Mohamed Kamara',
            languages: ['Krio', 'Temne'],
            status: 'On Call',
            currentCall: 'CALL-005',
            todaysCalls: 8,
            rating: 4.6,
            specialization: 'Legal Support',
            experience: '2 years'
        },
        {
            id: 'AGT-003',
            name: 'Fatmata Bangura',
            languages: ['Mende', 'English'],
            status: 'On Call',
            currentCall: 'CALL-003',
            todaysCalls: 15,
            rating: 4.9,
            specialization: 'Emergency Response',
            experience: '5 years'
        },
        {
            id: 'AGT-004',
            name: 'Ibrahim Koroma',
            languages: ['Temne', 'English'],
            status: 'Break',
            currentCall: null,
            todaysCalls: 6,
            rating: 4.7,
            specialization: 'Community Outreach',
            experience: '1 year'
        }
    ];

    // IVR menu flow
    const ivrMenuFlow = {
        mainMenu: {
            prompt: 'Welcome to 116 GBV Hotline. Press 1 for Emergency, 2 for Information, 3 for Follow-up, 4 for Language Options',
            options: {
                1: 'Emergency Response',
                2: 'Information Services',
                3: 'Follow-up Services',
                4: 'Language Selection'
            }
        },
        languageMenu: {
            prompt: 'Select Language: Press 1 for English, 2 for Krio, 3 for Mende, 4 for Temne',
            options: {
                1: 'English',
                2: 'Krio', 
                3: 'Mende',
                4: 'Temne'
            }
        }
    };

    // Call analytics
    const callAnalytics = {
        hourlyDistribution: [3, 2, 1, 2, 4, 8, 12, 15, 18, 22, 25, 28, 32, 29, 26, 24, 21, 18, 15, 12, 8, 6, 4, 3],
        languageDistribution: {
            English: 45,
            Krio: 32,
            Mende: 15,
            Temne: 8
        },
        incidentTypes: {
            'Domestic Violence': 42,
            'Sexual Violence': 28,
            'Child Abuse': 18,
            'Information Request': 12
        }
    };

    // Initialize Voice/IVR system
    function initializeVoiceIVRSystem() {
        console.log('🚀 Initializing Voice/IVR System...');
        
        // Create the voice/IVR section
        createVoiceIVRSection();
        
        // Populate voice/IVR data
        populateVoiceMetrics();
        populateCallQueue();
        populateAgentStatus();
        populateIVRFlow();
        populateCallAnalytics();
        
        // Set up interactive features
        setupVoiceEventListeners();
        
        console.log('✅ Voice/IVR System initialized successfully!');
    }

    // Create Voice/IVR section HTML
    function createVoiceIVRSection() {
        const existingSection = document.getElementById('voice-ivr-section');
        if (existingSection) {
            existingSection.remove();
        }

        const section = document.createElement('div');
        section.id = 'voice-ivr-section';
        section.className = 'hidden space-y-6';
        section.innerHTML = `
            <!-- Voice/IVR Header -->
            <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            <i class="fas fa-phone-volume mr-3"></i>
                            Voice/IVR System - 116 Hotline
                        </h2>
                        <p class="text-red-100">Multi-language Voice Reporting & Crisis Response System</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" id="system-uptime">99.8%</div>
                        <div class="text-sm text-red-200">System Uptime</div>
                    </div>
                </div>
            </div>

            <!-- Voice System Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Total Calls Today</p>
                            <p class="text-3xl font-bold text-gray-900" id="todays-calls">67</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full">
                            <i class="fas fa-phone text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Emergency Calls</p>
                            <p class="text-3xl font-bold text-gray-900" id="emergency-calls">23</p>
                        </div>
                        <div class="p-3 bg-red-100 rounded-full">
                            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Avg Wait Time</p>
                            <p class="text-3xl font-bold text-gray-900" id="avg-wait-time">45s</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full">
                            <i class="fas fa-clock text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Resolution Rate</p>
                            <p class="text-3xl font-bold text-gray-900" id="resolution-rate">94%</p>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-full">
                            <i class="fas fa-check-circle text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Call Queue & Agent Status -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Live Call Queue -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-gray-900">
                                <i class="fas fa-list-ol mr-2 text-blue-600"></i>
                                Live Call Queue
                            </h3>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span class="text-sm text-gray-600">Live</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="call-queue" class="space-y-4 max-h-96 overflow-y-auto"></div>
                    </div>
                </div>

                <!-- Agent Status -->
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-headset mr-2 text-green-600"></i>
                            Agent Status
                        </h3>
                    </div>
                    <div class="p-6">
                        <div id="agent-status" class="space-y-4"></div>
                    </div>
                </div>
            </div>

            <!-- IVR Menu Flow -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-sitemap mr-2 text-purple-600"></i>
                        Interactive Voice Response (IVR) Menu Flow
                    </h3>
                </div>
                <div class="p-6">
                    <div id="ivr-flow" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                </div>
            </div>

            <!-- Call Analytics -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-chart-line mr-2 text-indigo-600"></i>
                            24-Hour Call Volume
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="hourly-calls-chart" width="400" height="250"></canvas>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            <i class="fas fa-language mr-2 text-orange-600"></i>
                            Language Distribution
                        </h3>
                    </div>
                    <div class="p-6">
                        <canvas id="language-distribution-chart" width="400" height="250"></canvas>
                    </div>
                </div>
            </div>

            <!-- Voice System Controls -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-cogs mr-2 text-gray-600"></i>
                        Voice System Controls & Monitoring
                    </h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- System Status -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-900 mb-3">
                                <i class="fas fa-server mr-2 text-blue-600"></i>
                                System Status
                            </h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">PBX System</span>
                                    <span class="text-green-600 font-medium">Online</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">IVR Engine</span>
                                    <span class="text-green-600 font-medium">Active</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Recording System</span>
                                    <span class="text-green-600 font-medium">Enabled</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">SMS Gateway</span>
                                    <span class="text-green-600 font-medium">Connected</span>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-900 mb-3">
                                <i class="fas fa-bolt mr-2 text-yellow-600"></i>
                                Quick Actions
                            </h4>
                            <div class="space-y-2">
                                <button class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                    <i class="fas fa-broadcast-tower mr-2"></i>System Announcement
                                </button>
                                <button class="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">
                                    <i class="fas fa-user-plus mr-2"></i>Add Agent to Queue
                                </button>
                                <button class="w-full bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700">
                                    <i class="fas fa-pause mr-2"></i>Maintenance Mode
                                </button>
                                <button class="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700">
                                    <i class="fas fa-phone-slash mr-2"></i>Emergency Override
                                </button>
                            </div>
                        </div>

                        <!-- Live Statistics -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h4 class="font-semibold text-gray-900 mb-3">
                                <i class="fas fa-chart-bar mr-2 text-purple-600"></i>
                                Live Statistics
                            </h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Calls in Queue</span>
                                    <span class="font-bold text-blue-600" id="live-queue-count">3</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Active Agents</span>
                                    <span class="font-bold text-green-600" id="live-agent-count">2</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Avg Response Time</span>
                                    <span class="font-bold text-yellow-600" id="live-response-time">32s</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Success Rate</span>
                                    <span class="font-bold text-purple-600" id="live-success-rate">96%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Voice Recording & Transcription -->
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-microphone mr-2 text-red-600"></i>
                        Voice Recording & AI Transcription
                    </h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-800">Recent Call Transcriptions</h4>
                            <div class="space-y-3">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-medium text-gray-800">Call: CALL-001</span>
                                        <span class="text-xs text-gray-500">English • 4:23</span>
                                    </div>
                                    <p class="text-sm text-gray-700 italic">"Hello, I need help. My husband hit me again and I'm scared. Can someone please help me find a safe place?"</p>
                                    <div class="mt-2 flex items-center justify-between">
                                        <span class="text-xs text-green-600">✓ Transcribed</span>
                                        <button class="text-blue-600 hover:text-blue-800 text-xs">View Full</button>
                                    </div>
                                </div>
                                
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-medium text-gray-800">Call: CALL-002</span>
                                        <span class="text-xs text-gray-500">Krio • 2:15</span>
                                    </div>
                                    <p class="text-sm text-gray-700 italic">"A want no information about wetin una dey do for woman dem wey dey suffer..."</p>
                                    <div class="mt-2 flex items-center justify-between">
                                        <span class="text-xs text-green-600">✓ Transcribed</span>
                                        <button class="text-blue-600 hover:text-blue-800 text-xs">View Full</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-800">AI Analysis Capabilities</h4>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="bg-blue-50 p-3 rounded-lg text-center">
                                    <i class="fas fa-language text-blue-600 text-2xl mb-2"></i>
                                    <div class="text-sm font-medium text-blue-800">Multi-language</div>
                                    <div class="text-xs text-blue-600">4 Languages</div>
                                </div>
                                <div class="bg-green-50 p-3 rounded-lg text-center">
                                    <i class="fas fa-brain text-green-600 text-2xl mb-2"></i>
                                    <div class="text-sm font-medium text-green-800">AI Sentiment</div>
                                    <div class="text-xs text-green-600">95% Accuracy</div>
                                </div>
                                <div class="bg-yellow-50 p-3 rounded-lg text-center">
                                    <i class="fas fa-exclamation text-yellow-600 text-2xl mb-2"></i>
                                    <div class="text-sm font-medium text-yellow-800">Crisis Detection</div>
                                    <div class="text-xs text-yellow-600">Real-time</div>
                                </div>
                                <div class="bg-purple-50 p-3 rounded-lg text-center">
                                    <i class="fas fa-shield-alt text-purple-600 text-2xl mb-2"></i>
                                    <div class="text-sm font-medium text-purple-800">Privacy Protected</div>
                                    <div class="text-xs text-purple-600">Encrypted</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append to the dashboard container
        const dashboardContainer = document.querySelector('.min-h-screen .max-w-7xl');
        if (dashboardContainer) {
            dashboardContainer.appendChild(section);
        }
    }

    // Populate voice system metrics
    function populateVoiceMetrics() {
        document.getElementById('system-uptime').textContent = `${ivrStats.systemUptime}%`;
        document.getElementById('todays-calls').textContent = ivrStats.todaysCalls;
        document.getElementById('emergency-calls').textContent = ivrStats.emergencyCalls;
        document.getElementById('avg-wait-time').textContent = ivrStats.averageWaitTime;
        document.getElementById('resolution-rate').textContent = `${ivrStats.callResolution}%`;
    }

    // Populate live call queue
    function populateCallQueue() {
        const queueContainer = document.getElementById('call-queue');
        if (!queueContainer) return;

        // Filter for active calls
        const activeCalls = callData.filter(call => call.status === 'In Progress' || call.status === 'Queued');
        
        if (activeCalls.length === 0) {
            queueContainer.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-phone-slash text-gray-400 text-3xl mb-2"></i>
                    <p class="text-gray-600">No calls currently in queue</p>
                </div>
            `;
            return;
        }

        queueContainer.innerHTML = activeCalls.map(call => {
            const priorityColor = {
                'Critical': 'bg-red-100 text-red-800 border-red-200',
                'High': 'bg-orange-100 text-orange-800 border-orange-200',
                'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                'Low': 'bg-green-100 text-green-800 border-green-200'
            }[call.priority];

            const statusColor = call.status === 'In Progress' ? 'text-blue-600' : 'text-yellow-600';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${call.priority === 'Critical' ? 'border-red-300 bg-red-50' : ''}">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <span class="font-medium text-gray-900">${call.id}</span>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColor}">
                                    ${call.priority}
                                </span>
                                <span class="${statusColor} text-sm font-medium">${call.status}</span>
                            </div>
                            
                            <div class="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <span class="font-medium">District:</span> ${call.district}
                                </div>
                                <div>
                                    <span class="font-medium">Language:</span> ${call.language}
                                </div>
                                <div>
                                    <span class="font-medium">Type:</span> ${call.callType}
                                </div>
                                <div>
                                    <span class="font-medium">Agent:</span> ${call.agent || 'Unassigned'}
                                </div>
                            </div>
                            
                            <div class="mt-2 text-xs text-gray-500">
                                Started: ${new Date(call.timestamp).toLocaleString()}
                                ${call.status === 'In Progress' ? ` • Duration: ${call.duration}` : ''}
                            </div>
                        </div>
                        
                        <div class="flex space-x-2 ml-4">
                            ${call.status === 'Queued' ? `
                                <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                                    <i class="fas fa-play mr-1"></i>Answer
                                </button>
                            ` : `
                                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    <i class="fas fa-eye mr-1"></i>Monitor
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Update live statistics
        document.getElementById('live-queue-count').textContent = activeCalls.filter(c => c.status === 'Queued').length;
    }

    // Populate agent status
    function populateAgentStatus() {
        const agentContainer = document.getElementById('agent-status');
        if (!agentContainer) return;

        agentContainer.innerHTML = agents.map(agent => {
            const statusColor = {
                'Available': 'text-green-600 bg-green-50',
                'On Call': 'text-blue-600 bg-blue-50',
                'Break': 'text-yellow-600 bg-yellow-50',
                'Offline': 'text-red-600 bg-red-50'
            }[agent.status];

            return `
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-gray-600 text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-900">${agent.name}</h4>
                                    <p class="text-sm text-gray-600">${agent.specialization}</p>
                                </div>
                            </div>
                            
                            <div class="mt-3 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Languages:</span>
                                    <div class="flex flex-wrap gap-1 mt-1">
                                        ${agent.languages.map(lang => 
                                            `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${lang}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                                <div>
                                    <span class="text-gray-600">Today's Calls:</span>
                                    <span class="font-medium ml-1">${agent.todaysCalls}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-right">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}">
                                ${agent.status}
                            </span>
                            <div class="text-sm text-gray-600 mt-1">
                                Rating: ${agent.rating}/5
                            </div>
                            ${agent.currentCall ? `
                                <div class="text-xs text-blue-600 mt-1">
                                    Call: ${agent.currentCall}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Update live agent count
        document.getElementById('live-agent-count').textContent = agents.filter(a => a.status === 'Available' || a.status === 'On Call').length;
    }

    // Populate IVR flow
    function populateIVRFlow() {
        const ivrContainer = document.getElementById('ivr-flow');
        if (!ivrContainer) return;

        ivrContainer.innerHTML = `
            <!-- Main Menu -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-semibold text-blue-800 mb-3">
                    <i class="fas fa-play mr-2"></i>Main Menu
                </h4>
                <div class="text-sm text-blue-700 mb-3">${ivrMenuFlow.mainMenu.prompt}</div>
                <div class="space-y-2">
                    ${Object.entries(ivrMenuFlow.mainMenu.options).map(([key, value]) => `
                        <div class="flex items-center space-x-2">
                            <span class="bg-blue-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">${key}</span>
                            <span class="text-sm text-gray-700">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Language Menu -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="font-semibold text-green-800 mb-3">
                    <i class="fas fa-language mr-2"></i>Language Selection
                </h4>
                <div class="text-sm text-green-700 mb-3">${ivrMenuFlow.languageMenu.prompt}</div>
                <div class="space-y-2">
                    ${Object.entries(ivrMenuFlow.languageMenu.options).map(([key, value]) => `
                        <div class="flex items-center space-x-2">
                            <span class="bg-green-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">${key}</span>
                            <span class="text-sm text-gray-700">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Create call analytics charts
    function populateCallAnalytics() {
        setTimeout(() => {
            // Hourly call volume chart
            const hourlyCtx = document.getElementById('hourly-calls-chart');
            if (hourlyCtx && typeof Chart !== 'undefined') {
                new Chart(hourlyCtx, {
                    type: 'line',
                    data: {
                        labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                        datasets: [{
                            label: 'Calls per Hour',
                            data: callAnalytics.hourlyDistribution,
                            borderColor: 'rgb(239, 68, 68)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Language distribution chart
            const langCtx = document.getElementById('language-distribution-chart');
            if (langCtx && typeof Chart !== 'undefined') {
                new Chart(langCtx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(callAnalytics.languageDistribution),
                        datasets: [{
                            data: Object.values(callAnalytics.languageDistribution),
                            backgroundColor: [
                                'rgb(59, 130, 246)',
                                'rgb(16, 185, 129)',
                                'rgb(245, 158, 11)',
                                'rgb(139, 92, 246)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }, 1000);
    }

    // Set up event listeners
    function setupVoiceEventListeners() {
        // Auto-refresh queue every 10 seconds
        setInterval(updateLiveData, 10000);
    }

    // Update live data simulation
    function updateLiveData() {
        // Simulate new calls and status changes
        const queueCount = Math.floor(Math.random() * 5);
        const responseTime = Math.floor(Math.random() * 60) + 20;
        const successRate = 94 + Math.floor(Math.random() * 6);
        
        document.getElementById('live-queue-count').textContent = queueCount;
        document.getElementById('live-response-time').textContent = `${responseTime}s`;
        document.getElementById('live-success-rate').textContent = `${successRate}%`;
        
        // Update emergency calls
        const emergencyCalls = Math.floor(Math.random() * 5) + 20;
        document.getElementById('emergency-calls').textContent = emergencyCalls;
    }

    // Public methods
    return {
        init: initializeVoiceIVRSystem,
        populateData: function() {
            populateVoiceMetrics();
            populateCallQueue();
            populateAgentStatus();
            populateIVRFlow();
            populateCallAnalytics();
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => window.voiceIVRSystem.init(), 500);
    });
} else {
    setTimeout(() => window.voiceIVRSystem.init(), 500);
}

console.log('📞 Voice/IVR System Module - Fully Loaded!');
console.log('🔥 Comprehensive 116 hotline and voice reporting system ready for Ministry demonstration');