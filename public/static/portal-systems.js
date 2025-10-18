/**
 * Portal Login Systems
 * Rainbo Initiative Portal and Police FSU Portal
 */

// Rainbo Portal
function loadRainboPortal(section) {
    section.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="p-8 text-center" style="background: linear-gradient(135deg, #1e3a8a 0%, #32cd32 100%);">
                    <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <i class="fas fa-hospital text-5xl" style="color: #1e3a8a;"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Rainbo Initiative Portal</h2>
                    <p class="text-white text-opacity-90">One-Stop Centers for GBV Survivors</p>
                </div>

                <!-- Login Form -->
                <div class="p-8">
                    <form id="rainbo-login-form" onsubmit="handleRainboLogin(event)">
                        <div class="space-y-6">
                            <!-- Center Selection -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-hospital mr-2"></i>Rainbo Center
                                </label>
                                <select name="center" required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Your Center</option>
                                    <option value="freetown">Rainbo Centre Freetown (PCMH)</option>
                                    <option value="bo">Rainbo Centre Bo</option>
                                    <option value="kenema">Rainbo Centre Kenema</option>
                                    <option value="makeni">Rainbo Centre Makeni</option>
                                    <option value="koidu">Rainbo Centre Koidu</option>
                                    <option value="kailahun">Rainbo Centre Kailahun</option>
                                    <option value="kabala">Rainbo Centre Kabala</option>
                                    <option value="waterloo">Rainbo Centre Waterloo</option>
                                    <option value="portloko">Rainbo Centre Port Loko</option>
                                </select>
                            </div>

                            <!-- Username -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-user mr-2"></i>Username
                                </label>
                                <input type="text" name="username" required
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                       placeholder="Enter your username">
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-lock mr-2"></i>Password
                                </label>
                                <input type="password" name="password" required
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                       placeholder="Enter your password">
                            </div>

                            <!-- Remember Me -->
                            <div class="flex items-center justify-between">
                                <label class="flex items-center">
                                    <input type="checkbox" name="remember" class="mr-2">
                                    <span class="text-sm text-gray-700">Remember me</span>
                                </label>
                                <a href="#" class="text-sm" style="color: #1e3a8a;">Forgot password?</a>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit"
                                    class="w-full py-3 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                                    style="background: linear-gradient(135deg, #1e3a8a 0%, #32cd32 100%);">
                                <i class="fas fa-sign-in-alt mr-2"></i>Sign In to Rainbo Portal
                            </button>
                        </div>
                    </form>

                    <!-- Additional Links -->
                    <div class="mt-6 pt-6 border-t text-center text-sm text-gray-600">
                        <p class="mb-2">Need access? Contact your Center Coordinator</p>
                        <div class="flex items-center justify-center space-x-4">
                            <a href="#" style="color: #1e3a8a;">
                                <i class="fas fa-phone mr-1"></i>Emergency: 116
                            </a>
                            <span>|</span>
                            <a href="#" style="color: #32cd32;">
                                <i class="fas fa-question-circle mr-1"></i>Help
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Features Info -->
                <div class="bg-gray-50 p-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">Portal Features:</h3>
                    <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Case Management</div>
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Medical Records</div>
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Psychosocial Notes</div>
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Referral System</div>
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Service Coordination</div>
                        <div><i class="fas fa-check-circle mr-2 text-green-500"></i>Reporting Tools</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Police FSU Portal
function loadPoliceFSU(section) {
    section.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="p-8 text-center" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 100%);">
                    <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <i class="fas fa-shield-alt text-5xl" style="color: #1e3a8a;"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Police FSU Portal</h2>
                    <p class="text-white text-opacity-90">Family Support Unit - Sierra Leone Police</p>
                </div>

                <!-- Login Form -->
                <div class="p-8">
                    <form id="fsu-login-form" onsubmit="handleFSULogin(event)">
                        <div class="space-y-6">
                            <!-- Station Selection -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-building mr-2"></i>Police Station / FSU
                                </label>
                                <select name="station" required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Your Station</option>
                                    <option value="central">Central Police Station - Freetown</option>
                                    <option value="east">Eastern Police - Freetown</option>
                                    <option value="west">Western Police - Freetown</option>
                                    <option value="bo">Bo Police Station FSU</option>
                                    <option value="kenema">Kenema Police Station FSU</option>
                                    <option value="makeni">Makeni Police Station FSU</option>
                                    <option value="koidu">Koidu Police Station FSU</option>
                                    <option value="kailahun">Kailahun Police Station FSU</option>
                                    <option value="portloko">Port Loko Police Station FSU</option>
                                    <option value="kabala">Kabala Police Station FSU</option>
                                    <option value="bonthe">Bonthe Police Station FSU</option>
                                    <option value="moyamba">Moyamba Police Station FSU</option>
                                    <option value="pujehun">Pujehun Police Station FSU</option>
                                    <option value="kambia">Kambia Police Station FSU</option>
                                    <option value="kono">Kono Police Station FSU</option>
                                    <option value="tonkolili">Tonkolili Police Station FSU</option>
                                </select>
                            </div>

                            <!-- Officer ID -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-id-badge mr-2"></i>Officer ID
                                </label>
                                <input type="text" name="officer_id" required
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                       placeholder="Enter your Officer ID">
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-key mr-2"></i>Password
                                </label>
                                <input type="password" name="password" required
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                       placeholder="Enter your password">
                            </div>

                            <!-- Security Code -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-mobile-alt mr-2"></i>2FA Security Code (Optional)
                                </label>
                                <input type="text" name="security_code"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                       placeholder="6-digit code from authenticator">
                            </div>

                            <!-- Remember Me -->
                            <div class="flex items-center justify-between">
                                <label class="flex items-center">
                                    <input type="checkbox" name="remember" class="mr-2">
                                    <span class="text-sm text-gray-700">Trust this device</span>
                                </label>
                                <a href="#" class="text-sm" style="color: #1e3a8a;">Reset password</a>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit"
                                    class="w-full py-3 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                                    style="background: linear-gradient(135deg, #1e3a8a 0%, #1e90ff 100%);">
                                <i class="fas fa-sign-in-alt mr-2"></i>Access FSU Portal
                            </button>
                        </div>
                    </form>

                    <!-- Additional Links -->
                    <div class="mt-6 pt-6 border-t text-center text-sm text-gray-600">
                        <p class="mb-2">For technical support, contact FSU Headquarters</p>
                        <div class="flex items-center justify-center space-x-4">
                            <a href="#" style="color: #1e3a8a;">
                                <i class="fas fa-phone mr-1"></i>FSU Hotline
                            </a>
                            <span>|</span>
                            <a href="#" style="color: #1e90ff;">
                                <i class="fas fa-book mr-1"></i>User Manual
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Features Info -->
                <div class="bg-gray-50 p-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">FSU Portal Features:</h3>
                    <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Case Filing</div>
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Investigation Tracking</div>
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Evidence Management</div>
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Witness Statements</div>
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Court Coordination</div>
                        <div><i class="fas fa-check-circle mr-2 text-blue-500"></i>Multi-Agency Collaboration</div>
                    </div>
                </div>

                <!-- Security Notice -->
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div class="flex">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
                        <div class="text-sm text-yellow-700">
                            <strong>Security Notice:</strong> This is a secure government system. Unauthorized access is prohibited and will be prosecuted.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Login handlers
async function handleRainboLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Logging in...';
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Check if user has correct role
            if (data.user.role !== 'rainbo_staff') {
                alert('❌ Access Denied\n\nThis portal is for Rainbo Centre staff only.\n\nYour role: ' + data.user.role);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }
            
            // Store session
            localStorage.setItem('gbv_session_id', data.session_id);
            localStorage.setItem('gbv_user_data', JSON.stringify(data.user));
            
            // Redirect to Rainbo dashboard
            window.location.href = '/rainbo-dashboard';
        } else {
            alert('❌ Login Failed\n\n' + (data.error || 'Invalid credentials'));
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('❌ Network Error\n\nPlease check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

async function handleFSULogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('officer_id'); // Using officer_id as username
    const password = formData.get('password');
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Logging in...';
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Check if user has correct role
            if (data.user.role !== 'police_fsu') {
                alert('❌ Access Denied\n\nThis portal is for Police FSU officers only.\n\nYour role: ' + data.user.role);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }
            
            // Store session
            localStorage.setItem('gbv_session_id', data.session_id);
            localStorage.setItem('gbv_user_data', JSON.stringify(data.user));
            
            // Redirect to Police dashboard
            window.location.href = '/police-dashboard';
        } else {
            alert('❌ Login Failed\n\n' + (data.error || 'Invalid credentials'));
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('❌ Network Error\n\nPlease check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Resources Tab
function loadResources(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4" style="color: #1e3a8a;">
                    <i class="fas fa-book mr-2"></i>GBV Resources & Documentation
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${generateResourceCards()}
                </div>
            </div>
        </div>
    `;
}

function generateResourceCards() {
    const resources = [
        { icon: 'file-pdf', title: 'GBV Laws & Policies', desc: 'Sierra Leone legal framework', color: 'red' },
        { icon: 'book-medical', title: 'Medical Protocols', desc: 'Clinical management guidelines', color: 'blue' },
        { icon: 'users', title: 'Counseling Guide', desc: 'Psychosocial support protocols', color: 'green' },
        { icon: 'balance-scale', title: 'Legal Procedures', desc: 'Justice system navigation', color: 'purple' },
        { icon: 'shield-alt', title: 'Safety Planning', desc: 'Survivor protection strategies', color: 'yellow' },
        { icon: 'phone', title: 'Contact Directory', desc: 'Service providers nationwide', color: 'teal' }
    ];
    
    const colors = {
        red: '#ef4444', blue: '#1e3a8a', green: '#32cd32',
        purple: '#9333ea', yellow: '#ffd700', teal: '#14b8a6'
    };
    
    return resources.map(r => `
        <div class="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" 
                 style="background-color: ${colors[r.color]}20;">
                <i class="fas fa-${r.icon} text-2xl" style="color: ${colors[r.color]};"></i>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">${r.title}</h3>
            <p class="text-sm text-gray-600 mb-4">${r.desc}</p>
            <button class="text-sm font-semibold" style="color: ${colors[r.color]};">
                <i class="fas fa-download mr-2"></i>Download
            </button>
        </div>
    `).join('');
}

// Voice Report Tab - Implementation is in voice-recording.js
// The loadVoiceReport() function is provided by voice-recording.js

// Admin Tab
function loadAdminPanel(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-6" style="color: #1e3a8a;">
                    <i class="fas fa-cog mr-2"></i>System Administration
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${generateAdminCards()}
                </div>
            </div>
        </div>
    `;
}

function generateAdminCards() {
    const adminSections = [
        { icon: 'users-cog', title: 'User Management', count: '245 users' },
        { icon: 'shield-alt', title: 'Permissions', count: '12 roles' },
        { icon: 'database', title: 'Data Management', count: '3,910 cases' },
        { icon: 'chart-line', title: 'System Reports', count: '89 reports' },
        { icon: 'bell', title: 'Notifications', count: '23 pending' },
        { icon: 'file-import', title: 'Data Import', count: 'CSV, Excel' },
        { icon: 'sync', title: 'System Sync', count: 'Last: 2 min ago' },
        { icon: 'history', title: 'Audit Logs', count: 'View activity' }
    ];
    
    return adminSections.map(s => `
        <div class="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <i class="fas fa-${s.icon} text-3xl mb-3" style="color: #1e3a8a;"></i>
            <h3 class="font-semibold text-gray-900 mb-1">${s.title}</h3>
            <p class="text-sm text-gray-500">${s.count}</p>
        </div>
    `).join('');
}
