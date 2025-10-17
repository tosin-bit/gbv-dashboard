/**
 * Enhanced GBV Dashboard - Advanced Role Management System
 * 7-tier access control system for Ministry of Gender and Children's Affairs
 * Built by Insyt FamilyCare Healthcare Technology
 */

class RoleManagement {
    constructor() {
        this.initialized = false;
        this.roleHierarchy = [
            {
                id: 'super_admin',
                name: 'Super Administrator',
                level: 7,
                description: 'Full system access and configuration',
                permissions: ['*'], // All permissions
                color: 'red',
                icon: 'fa-crown',
                maxUsers: 2
            },
            {
                id: 'ministry_director',
                name: 'Ministry Director',
                level: 6,
                description: 'Executive oversight and policy decisions',
                permissions: [
                    'view_all_data', 'manage_policies', 'access_reports', 'approve_budgets',
                    'system_configuration', 'user_management', 'audit_access'
                ],
                color: 'purple',
                icon: 'fa-user-tie',
                maxUsers: 5
            },
            {
                id: 'program_manager',
                name: 'Program Manager',
                level: 5,
                description: 'Program oversight and resource allocation',
                permissions: [
                    'manage_programs', 'view_analytics', 'access_reports', 'manage_resources',
                    'coordinate_services', 'supervise_staff', 'budget_planning'
                ],
                color: 'indigo',
                icon: 'fa-tasks',
                maxUsers: 15
            },
            {
                id: 'regional_coordinator',
                name: 'Regional Coordinator',
                level: 4,
                description: 'Regional program coordination and oversight',
                permissions: [
                    'regional_oversight', 'coordinate_districts', 'manage_regional_staff',
                    'regional_reporting', 'service_monitoring', 'community_engagement'
                ],
                color: 'blue',
                icon: 'fa-map-marked-alt',
                maxUsers: 25
            },
            {
                id: 'case_manager',
                name: 'Case Manager',
                level: 3,
                description: 'Direct case management and survivor support',
                permissions: [
                    'manage_cases', 'access_survivor_data', 'coordinate_services',
                    'case_documentation', 'referral_management', 'follow_up_tracking'
                ],
                color: 'green',
                icon: 'fa-clipboard-user',
                maxUsers: 100
            },
            {
                id: 'field_worker',
                name: 'Field Worker',
                level: 2,
                description: 'Community outreach and frontline response',
                permissions: [
                    'community_outreach', 'initial_assessments', 'data_collection',
                    'awareness_activities', 'basic_counseling', 'referral_initiation'
                ],
                color: 'yellow',
                icon: 'fa-walking',
                maxUsers: 500
            },
            {
                id: 'data_clerk',
                name: 'Data Entry Clerk',
                level: 1,
                description: 'Data entry and basic administrative tasks',
                permissions: [
                    'data_entry', 'basic_reporting', 'document_management',
                    'appointment_scheduling', 'contact_management'
                ],
                color: 'gray',
                icon: 'fa-keyboard',
                maxUsers: 200
            }
        ];

        this.permissionCategories = {
            'System Administration': [
                { id: 'system_configuration', name: 'System Configuration', description: 'Modify system settings and configurations' },
                { id: 'user_management', name: 'User Management', description: 'Create, modify, and deactivate user accounts' },
                { id: 'audit_access', name: 'Audit Access', description: 'View system audit logs and security reports' },
                { id: 'backup_management', name: 'Backup Management', description: 'Manage system backups and recovery' }
            ],
            'Data Access': [
                { id: 'view_all_data', name: 'View All Data', description: 'Access all system data across regions' },
                { id: 'access_survivor_data', name: 'Access Survivor Data', description: 'View sensitive survivor information' },
                { id: 'data_export', name: 'Data Export', description: 'Export data in various formats' },
                { id: 'anonymous_analytics', name: 'Anonymous Analytics', description: 'Access anonymized analytics and trends' }
            ],
            'Case Management': [
                { id: 'manage_cases', name: 'Manage Cases', description: 'Create, update, and close GBV cases' },
                { id: 'case_documentation', name: 'Case Documentation', description: 'Document case progress and outcomes' },
                { id: 'referral_management', name: 'Referral Management', description: 'Manage referrals between services' },
                { id: 'follow_up_tracking', name: 'Follow-up Tracking', description: 'Track survivor progress and outcomes' }
            ],
            'Program Management': [
                { id: 'manage_programs', name: 'Manage Programs', description: 'Create and oversee prevention programs' },
                { id: 'coordinate_services', name: 'Coordinate Services', description: 'Coordinate between service providers' },
                { id: 'supervise_staff', name: 'Supervise Staff', description: 'Supervise and evaluate staff performance' },
                { id: 'community_engagement', name: 'Community Engagement', description: 'Engage with community leaders and groups' }
            ],
            'Reporting & Analytics': [
                { id: 'access_reports', name: 'Access Reports', description: 'View standard system reports' },
                { id: 'view_analytics', name: 'View Analytics', description: 'Access advanced analytics and predictions' },
                { id: 'regional_reporting', name: 'Regional Reporting', description: 'Generate regional-level reports' },
                { id: 'custom_reports', name: 'Custom Reports', description: 'Create custom report templates' }
            ],
            'Financial Management': [
                { id: 'approve_budgets', name: 'Approve Budgets', description: 'Approve program and operational budgets' },
                { id: 'budget_planning', name: 'Budget Planning', description: 'Participate in budget planning process' },
                { id: 'expense_tracking', name: 'Expense Tracking', description: 'Track and manage program expenses' },
                { id: 'resource_allocation', name: 'Resource Allocation', description: 'Allocate resources across programs' }
            ]
        };

        this.currentUsers = [];
        this.auditLog = [];
        
        this.init();
    }

    init() {
        console.log('👥 Initializing Advanced Role Management System...');
        this.generateSampleUsers();
        this.setupRoleInterface();
        this.initializePermissionMatrix();
        this.setupAuditSystem();
        this.initialized = true;
    }

    generateSampleUsers() {
        // Generate sample users for demonstration
        const names = [
            'Dr. Fatima Sesay', 'Hon. Mohamed Bangura', 'Mrs. Aminata Kamara', 
            'Mr. Ibrahim Conteh', 'Ms. Zainab Turay', 'Dr. Samuel Koroma',
            'Mrs. Isata Mansaray', 'Mr. Abdul Rahman', 'Ms. Mariama Jalloh',
            'Dr. Joseph Momoh', 'Mrs. Hawa Kargbo', 'Mr. Alhassan Fofana'
        ];

        const districts = [
            'Western Area Urban', 'Western Area Rural', 'Bo', 'Bonthe', 'Moyamba',
            'Pujehun', 'Bombali', 'Falaba', 'Koinadugu', 'Tonkolili', 'Karene',
            'Kailahun', 'Kenema', 'Kono', 'Portloko', 'Kambia'
        ];

        this.currentUsers = [];
        let userId = 1;

        // Create users for each role
        this.roleHierarchy.forEach(role => {
            const numUsers = Math.min(role.maxUsers, Math.floor(role.maxUsers * 0.3)); // 30% of max capacity
            
            for (let i = 0; i < numUsers && userId <= 50; i++) {
                const user = {
                    id: `USR-${String(userId).padStart(4, '0')}`,
                    name: names[Math.floor(Math.random() * names.length)],
                    email: `user${userId}@mogca.gov.sl`,
                    role: role.id,
                    roleLevel: role.level,
                    district: districts[Math.floor(Math.random() * districts.length)],
                    status: Math.random() > 0.1 ? 'active' : 'inactive',
                    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
                    casesAssigned: role.level <= 3 ? Math.floor(Math.random() * 20) : 0,
                    performance: this.generatePerformanceMetrics(),
                    permissions: this.getRolePermissions(role.id)
                };
                
                this.currentUsers.push(user);
                userId++;
            }
        });
    }

    generatePerformanceMetrics() {
        return {
            casesCompleted: Math.floor(Math.random() * 50),
            avgResponseTime: Math.floor(Math.random() * 24) + 1, // Hours
            qualityScore: Math.random() * 2 + 3, // 3-5 scale
            trainingCompleted: Math.floor(Math.random() * 10),
            communityEngagement: Math.random() * 50 + 50 // 50-100%
        };
    }

    getRolePermissions(roleId) {
        const role = this.roleHierarchy.find(r => r.id === roleId);
        return role ? role.permissions : [];
    }

    setupRoleInterface() {
        const dashboardContent = document.getElementById('dashboard-content');
        if (!dashboardContent) return;

        let roleSection = document.getElementById('role-management-section');
        if (!roleSection) {
            roleSection = document.createElement('div');
            roleSection.id = 'role-management-section';
            roleSection.className = 'hidden';
            dashboardContent.appendChild(roleSection);
        }

        roleSection.innerHTML = `
            <div class="mb-8">
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">Advanced Role Management System</h2>
                    <p>7-tier hierarchical access control for comprehensive security and governance</p>
                    <div class="mt-4 flex items-center space-x-6">
                        <div class="flex items-center">
                            <i class="fas fa-users-cog mr-2"></i>
                            <span class="text-sm">Multi-level authorization</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="text-sm">Granular permissions</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-audit mr-2"></i>
                            <span class="text-sm">Complete audit trail</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Role Hierarchy Overview -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-6">Role Hierarchy</h3>
                    <div class="space-y-4">
                        ${this.roleHierarchy.map(role => `
                            <div class="flex items-center p-4 border border-gray-200 rounded-lg">
                                <div class="w-12 h-12 bg-${role.color}-100 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas ${role.icon} text-${role.color}-600 text-lg"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-medium text-gray-900">${role.name}</h4>
                                        <span class="bg-${role.color}-100 text-${role.color}-800 text-xs px-2 py-1 rounded-full">
                                            Level ${role.level}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-600 mt-1">${role.description}</p>
                                    <div class="flex items-center mt-2 text-xs text-gray-500">
                                        <span>Max: ${role.maxUsers} users</span>
                                        <span class="mx-2">•</span>
                                        <span>Active: ${this.currentUsers.filter(u => u.role === role.id && u.status === 'active').length}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-6">User Distribution</h3>
                    <canvas id="role-distribution-chart" width="400" height="300"></canvas>
                </div>
            </div>

            <!-- Permission Matrix -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-medium text-gray-900">Permission Matrix</h3>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                        <i class="fas fa-download mr-2"></i>Export Matrix
                    </button>
                </div>
                <div id="permission-matrix" class="overflow-x-auto">
                    <!-- Permission matrix will be populated by JavaScript -->
                </div>
            </div>

            <!-- User Management -->
            <div class="bg-white rounded-lg shadow mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">User Management</h3>
                        <div class="flex items-center space-x-4">
                            <select id="user-role-filter" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option value="all">All Roles</option>
                                ${this.roleHierarchy.map(role => `
                                    <option value="${role.id}">${role.name}</option>
                                `).join('')}
                            </select>
                            <button class="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                                <i class="fas fa-plus mr-2"></i>Add User
                            </button>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="user-table-body" class="bg-white divide-y divide-gray-200">
                            <!-- Table content will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Security Audit Dashboard -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Security Audit</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <span class="text-sm font-medium">Password Policy Compliance</span>
                            </div>
                            <span class="text-sm text-green-600">98%</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-exclamation-triangle text-yellow-500 mr-3"></i>
                                <span class="text-sm font-medium">Inactive Users (>30 days)</span>
                            </div>
                            <span class="text-sm text-yellow-600">12 users</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-times-circle text-red-500 mr-3"></i>
                                <span class="text-sm font-medium">Failed Login Attempts</span>
                            </div>
                            <span class="text-sm text-red-600">3 today</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-clock text-blue-500 mr-3"></i>
                                <span class="text-sm font-medium">Avg Session Duration</span>
                            </div>
                            <span class="text-sm text-blue-600">2.5 hours</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Audit Events</h3>
                    <div id="audit-events" class="space-y-3 max-h-96 overflow-y-auto">
                        <!-- Audit events will be populated by JavaScript -->
                    </div>
                </div>
            </div>

            <!-- Role-based Analytics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-6">Role Performance Analytics</h3>
                <canvas id="performance-analytics-chart" width="800" height="400"></canvas>
            </div>
        `;

        this.populateRoleData();
    }

    populateRoleData() {
        this.populateUserTable();
        this.renderRoleDistributionChart();
        this.createPermissionMatrix();
        this.populateAuditEvents();
        this.renderPerformanceAnalytics();
    }

    populateUserTable() {
        const tbody = document.getElementById('user-table-body');
        if (!tbody) return;

        const usersToShow = this.currentUsers.slice(0, 20);

        tbody.innerHTML = usersToShow.map(user => {
            const role = this.roleHierarchy.find(r => r.id === user.role);
            const statusColorClass = user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            const performanceScore = user.performance.qualityScore;
            const performanceColor = performanceScore >= 4 ? 'text-green-600' : performanceScore >= 3 ? 'text-yellow-600' : 'text-red-600';

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-${role?.color}-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas ${role?.icon} text-${role?.color}-600"></i>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${role?.color}-100 text-${role?.color}-800">
                            Level ${role?.level} - ${role?.name}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.district}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorClass}">
                            ${user.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.lastLogin.toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <span class="text-sm font-medium ${performanceColor}">${performanceScore.toFixed(1)}/5.0</span>
                            <div class="ml-2 w-12 bg-gray-200 rounded-full h-2">
                                <div class="bg-${performanceScore >= 4 ? 'green' : performanceScore >= 3 ? 'yellow' : 'red'}-500 h-2 rounded-full" style="width: ${(performanceScore / 5) * 100}%"></div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="roleManagement.editUser('${user.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-900 mr-2" onclick="roleManagement.viewPermissions('${user.id}')">
                            <i class="fas fa-key"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-900" onclick="roleManagement.suspendUser('${user.id}')">
                            <i class="fas fa-ban"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    renderRoleDistributionChart() {
        const ctx = document.getElementById('role-distribution-chart');
        if (!ctx) return;

        const roleData = this.roleHierarchy.map(role => ({
            role: role.name,
            count: this.currentUsers.filter(u => u.role === role.id && u.status === 'active').length,
            color: this.getRoleColor(role.color)
        }));

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: roleData.map(r => r.role),
                datasets: [{
                    data: roleData.map(r => r.count),
                    backgroundColor: roleData.map(r => r.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    getRoleColor(colorName) {
        const colorMap = {
            'red': '#EF4444',
            'purple': '#8B5CF6',
            'indigo': '#6366F1',
            'blue': '#3B82F6',
            'green': '#10B981',
            'yellow': '#F59E0B',
            'gray': '#6B7280'
        };
        return colorMap[colorName] || '#6B7280';
    }

    createPermissionMatrix() {
        const container = document.getElementById('permission-matrix');
        if (!container) return;

        const allPermissions = Object.values(this.permissionCategories).flat();
        
        container.innerHTML = `
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                        ${this.roleHierarchy.map(role => `
                            <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex flex-col items-center">
                                    <i class="fas ${role.icon} text-${role.color}-500 mb-1"></i>
                                    <span>L${role.level}</span>
                                </div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${Object.entries(this.permissionCategories).map(([category, permissions]) => `
                        <tr class="bg-gray-100">
                            <td colspan="${this.roleHierarchy.length + 1}" class="px-6 py-2 text-sm font-medium text-gray-900">
                                ${category}
                            </td>
                        </tr>
                        ${permissions.map(permission => `
                            <tr>
                                <td class="px-6 py-3">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">${permission.name}</div>
                                        <div class="text-xs text-gray-500">${permission.description}</div>
                                    </div>
                                </td>
                                ${this.roleHierarchy.map(role => {
                                    const hasPermission = role.permissions.includes('*') || role.permissions.includes(permission.id);
                                    return `
                                        <td class="px-3 py-3 text-center">
                                            <i class="fas ${hasPermission ? 'fa-check text-green-500' : 'fa-times text-red-500'}"></i>
                                        </td>
                                    `;
                                }).join('')}
                            </tr>
                        `).join('')}
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    populateAuditEvents() {
        const container = document.getElementById('audit-events');
        if (!container) return;

        // Generate sample audit events
        const events = [
            { user: 'Dr. Fatima Sesay', action: 'User login', time: '2 minutes ago', status: 'success' },
            { user: 'System Admin', action: 'Permission updated', time: '15 minutes ago', status: 'info' },
            { user: 'Hon. Mohamed Bangura', action: 'Report accessed', time: '32 minutes ago', status: 'success' },
            { user: 'Failed Login', action: 'Invalid credentials', time: '1 hour ago', status: 'warning' },
            { user: 'Mrs. Aminata Kamara', action: 'Case created', time: '2 hours ago', status: 'success' },
            { user: 'Mr. Ibrahim Conteh', action: 'Data exported', time: '3 hours ago', status: 'info' },
            { user: 'System', action: 'Automatic backup', time: '4 hours ago', status: 'success' }
        ];

        container.innerHTML = events.map(event => {
            const statusColors = {
                'success': 'text-green-600 bg-green-100',
                'warning': 'text-yellow-600 bg-yellow-100',
                'info': 'text-blue-600 bg-blue-100',
                'error': 'text-red-600 bg-red-100'
            };

            return `
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center">
                        <div class="w-2 h-2 ${statusColors[event.status]} rounded-full mr-3"></div>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${event.user}</div>
                            <div class="text-xs text-gray-500">${event.action}</div>
                        </div>
                    </div>
                    <span class="text-xs text-gray-500">${event.time}</span>
                </div>
            `;
        }).join('');
    }

    renderPerformanceAnalytics() {
        const ctx = document.getElementById('performance-analytics-chart');
        if (!ctx) return;

        // Aggregate performance data by role
        const rolePerformance = this.roleHierarchy.map(role => {
            const roleUsers = this.currentUsers.filter(u => u.role === role.id && u.status === 'active');
            if (roleUsers.length === 0) return { role: role.name, avgQuality: 0, avgResponse: 0, caseLoad: 0 };

            const avgQuality = roleUsers.reduce((sum, u) => sum + u.performance.qualityScore, 0) / roleUsers.length;
            const avgResponse = roleUsers.reduce((sum, u) => sum + u.performance.avgResponseTime, 0) / roleUsers.length;
            const totalCases = roleUsers.reduce((sum, u) => sum + (u.casesAssigned || 0), 0);

            return {
                role: role.name,
                avgQuality: avgQuality,
                avgResponse: avgResponse,
                caseLoad: totalCases
            };
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rolePerformance.map(r => r.role),
                datasets: [
                    {
                        label: 'Quality Score (1-5)',
                        data: rolePerformance.map(r => r.avgQuality),
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Avg Response Time (hours)',
                        data: rolePerformance.map(r => r.avgResponse),
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        max: 5,
                        title: {
                            display: true,
                            text: 'Quality Score'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Response Time (hours)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    setupAuditSystem() {
        console.log('🔐 Setting up security audit system...');
        
        // Setup periodic security checks
        setInterval(() => {
            this.performSecurityAudit();
        }, 300000); // Every 5 minutes
    }

    performSecurityAudit() {
        const auditResults = {
            timestamp: new Date(),
            inactiveUsers: this.currentUsers.filter(u => {
                const daysSinceLogin = (Date.now() - u.lastLogin.getTime()) / (24 * 60 * 60 * 1000);
                return daysSinceLogin > 30;
            }),
            passwordCompliance: Math.floor(Math.random() * 5) + 95, // 95-100%
            failedLogins: Math.floor(Math.random() * 5),
            suspiciousActivity: Math.random() > 0.9 // 10% chance
        };

        console.log('🔍 Security audit completed:', auditResults);
        
        if (auditResults.suspiciousActivity) {
            this.logSecurityAlert('Suspicious activity detected');
        }
    }

    logSecurityAlert(message) {
        const alert = {
            id: `SEC-${Date.now()}`,
            message: message,
            timestamp: new Date(),
            severity: 'high',
            resolved: false
        };

        this.auditLog.push(alert);
        console.warn('🚨 Security Alert:', alert);
    }

    // Public methods for user interactions
    editUser(userId) {
        const user = this.currentUsers.find(u => u.id === userId);
        if (user) {
            console.log(`Opening edit dialog for user: ${user.name}`);
            // Implementation would open user edit modal
        }
    }

    viewPermissions(userId) {
        const user = this.currentUsers.find(u => u.id === userId);
        if (user) {
            console.log(`Viewing permissions for user: ${user.name}`);
            console.log('Permissions:', user.permissions);
            // Implementation would show permission details modal
        }
    }

    suspendUser(userId) {
        const user = this.currentUsers.find(u => u.id === userId);
        if (user && confirm(`Are you sure you want to suspend ${user.name}?`)) {
            user.status = 'inactive';
            console.log(`User ${user.name} has been suspended`);
            this.populateUserTable(); // Refresh table
        }
    }

    initializePermissionMatrix() {
        console.log('🔑 Initializing permission matrix...');
        // Additional permission matrix setup if needed
    }

    // Public API methods
    getRoleHierarchy() {
        return this.roleHierarchy;
    }

    getCurrentUsers() {
        return this.currentUsers;
    }

    getAuditLog() {
        return this.auditLog;
    }

    isInitialized() {
        return this.initialized;
    }
}

// Initialize role management system
window.roleManagement = new RoleManagement();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoleManagement;
}