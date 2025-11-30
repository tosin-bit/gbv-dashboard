/**
 * Safety Planning Tools
 * Interactive personal safety plan builder with emergency checklist
 */

function loadSafetyPlanning(section) {
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Quick Exit Button -->
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" 
                        class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>

            <!-- Back Button -->
            <div class="mb-4">
                <button onclick="loadSurvivorPortal(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Survivor Portal
                </button>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-shield-alt text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">Your Personal Safety Plan</h1>
                        <p class="text-xl text-purple-50">Create a plan that keeps you safe</p>
                    </div>
                </div>
            </div>

            <!-- Privacy Notice -->
            <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <div class="flex items-start">
                    <i class="fas fa-lock text-blue-600 text-3xl mr-4"></i>
                    <div>
                        <h3 class="text-lg font-bold text-blue-800 mb-2">Stored Privately on Your Device</h3>
                        <p class="text-blue-700 text-sm">
                            Your safety plan is saved only on this device and never sent to any server. 
                            You can clear it anytime using the "Clear Plan" button at the bottom.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="flex flex-wrap border-b border-gray-200">
                    <button onclick="showSafetyTab('escape')" id="tab-escape"
                            class="flex-1 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 border-b-4 border-purple-600">
                        <i class="fas fa-running mr-2"></i>Escape Plan
                    </button>
                    <button onclick="showSafetyTab('contacts')" id="tab-contacts"
                            class="flex-1 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 border-b-4 border-transparent">
                        <i class="fas fa-users mr-2"></i>Safe Contacts
                    </button>
                    <button onclick="showSafetyTab('bag')" id="tab-bag"
                            class="flex-1 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 border-b-4 border-transparent">
                        <i class="fas fa-suitcase mr-2"></i>Emergency Bag
                    </button>
                    <button onclick="showSafetyTab('codewords')" id="tab-codewords"
                            class="flex-1 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50 border-b-4 border-transparent">
                        <i class="fas fa-key mr-2"></i>Code Words
                    </button>
                </div>

                <!-- Tab Content -->
                <div id="safety-tab-content" class="p-6">
                    <!-- Content will be loaded here -->
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
                <button onclick="saveSafetyPlan()" 
                        class="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-bold">
                    <i class="fas fa-save mr-2"></i>Save Plan to Device
                </button>
                <button onclick="printSafetyPlan()" 
                        class="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold">
                    <i class="fas fa-print mr-2"></i>Print Plan
                </button>
                <button onclick="clearSafetyPlan()" 
                        class="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold">
                    <i class="fas fa-trash mr-2"></i>Clear Plan
                </button>
            </div>
        </div>
    `;

    // Load saved plan or show escape tab
    loadSavedPlan();
    showSafetyTab('escape');
}

function showSafetyTab(tab) {
    // Update tab buttons
    ['escape', 'contacts', 'bag', 'codewords'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) {
            if (t === tab) {
                btn.classList.add('border-purple-600', 'bg-gray-50');
                btn.classList.remove('border-transparent');
            } else {
                btn.classList.remove('border-purple-600', 'bg-gray-50');
                btn.classList.add('border-transparent');
            }
        }
    });

    const content = document.getElementById('safety-tab-content');
    if (!content) return;

    if (tab === 'escape') {
        content.innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Emergency Escape Plan</h3>
            <p class="text-gray-600 mb-6">Think about how you would leave quickly if you need to.</p>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Safe place to go (friend, family, shelter)
                    </label>
                    <textarea id="safe-place" rows="2" 
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              placeholder="Example: My sister's house at 45 Main Street, or Freetown Safe House"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        How will you get there? (walk, taxi, bus)
                    </label>
                    <textarea id="transport" rows="2"
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              placeholder="Example: Call taxi from corner shop, or walk to bus stop on King Street"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Best time to leave (when is it safest?)
                    </label>
                    <textarea id="timing" rows="2"
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              placeholder="Example: Morning when they go to work, or when children are at school"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Important things to remember
                    </label>
                    <textarea id="escape-notes" rows="3"
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              placeholder="Example: Hide spare money in safe place, tell trusted neighbor, keep phone charged"></textarea>
                </div>
            </div>

            <div class="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                <p class="text-sm text-yellow-800">
                    <i class="fas fa-lightbulb mr-2"></i><strong>Safety Tip:</strong> 
                    Practice your escape route when it's safe. Know where the exits are.
                </p>
            </div>
        `;
    } else if (tab === 'contacts') {
        content.innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Safe Contacts</h3>
            <p class="text-gray-600 mb-6">People you trust who can help you.</p>
            
            <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-bold text-gray-800 mb-3">Contact 1</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                            <input type="text" id="contact1-name"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" id="contact1-phone"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                            <input type="text" id="contact1-relation"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                   placeholder="Example: Sister, Best friend, Aunt">
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-bold text-gray-800 mb-3">Contact 2</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                            <input type="text" id="contact2-name"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" id="contact2-phone"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                            <input type="text" id="contact2-relation"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                   placeholder="Example: Neighbor, Cousin, Pastor">
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-bold text-gray-800 mb-3">Contact 3</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                            <input type="text" id="contact3-name"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" id="contact3-phone"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                            <input type="text" id="contact3-relation"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                   placeholder="Example: Coworker, Teacher, Church member">
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p class="text-sm text-blue-800">
                    <i class="fas fa-info-circle mr-2"></i><strong>Important:</strong> 
                    Choose people who will believe you and not tell the abuser where you are.
                </p>
            </div>
        `;
    } else if (tab === 'bag') {
        content.innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Emergency Bag Checklist</h3>
            <p class="text-gray-600 mb-6">Keep these items in a safe place where you can grab them quickly.</p>
            
            <div class="space-y-6">
                <div>
                    <h4 class="font-bold text-gray-800 mb-3">
                        <i class="fas fa-id-card mr-2 text-purple-600"></i>Important Documents
                    </h4>
                    <div class="space-y-2">
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="id-card">
                            <span>National ID Card or Birth Certificate</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="children-docs">
                            <span>Children's documents (birth certificates, school records)</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="medical-records">
                            <span>Medical records and prescriptions</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="bank-info">
                            <span>Bank account information</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="protection-order">
                            <span>Copy of protection order (if you have one)</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-gray-800 mb-3">
                        <i class="fas fa-wallet mr-2 text-green-600"></i>Money & Valuables
                    </h4>
                    <div class="space-y-2">
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="money">
                            <span>Cash for transport and emergencies</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="bank-cards">
                            <span>Bank cards (if safe to take)</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="jewelry">
                            <span>Small valuable items (jewelry for emergency money)</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-gray-800 mb-3">
                        <i class="fas fa-mobile-alt mr-2 text-blue-600"></i>Personal Items
                    </h4>
                    <div class="space-y-2">
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="phone">
                            <span>Charged mobile phone</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="charger">
                            <span>Phone charger</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="keys">
                            <span>House and car keys</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="medicines">
                            <span>Medicines you need</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="clothes">
                            <span>Change of clothes for you and children</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="photos">
                            <span>Photos of family (for comfort)</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="safety-checklist mr-3 w-5 h-5" data-item="toys">
                            <span>Children's favorite toy or comfort item</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p class="text-sm text-green-800">
                    <i class="fas fa-check-circle mr-2"></i><strong>Tip:</strong> 
                    Hide this bag at a friend's house, workplace, or in a safe place outside your home.
                </p>
            </div>
        `;
    } else if (tab === 'codewords') {
        content.innerHTML = `
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Secret Code Words</h3>
            <p class="text-gray-600 mb-6">Use special words to signal danger to people you trust.</p>
            
            <div class="space-y-6">
                <div class="bg-red-50 rounded-lg p-6">
                    <h4 class="font-bold text-gray-800 mb-3 text-lg">
                        <i class="fas fa-exclamation-triangle mr-2 text-red-600"></i>Emergency Code Word
                    </h4>
                    <p class="text-sm text-gray-600 mb-4">
                        A word that means "I'm in danger right now, call police"
                    </p>
                    <input type="text" id="emergency-codeword"
                           class="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 text-lg font-semibold"
                           placeholder="Example: 'Can you pick up RED bananas?'">
                    <p class="text-xs text-gray-500 mt-2">
                        Use a word that sounds natural in a phone call or text message
                    </p>
                </div>

                <div class="bg-yellow-50 rounded-lg p-6">
                    <h4 class="font-bold text-gray-800 mb-3 text-lg">
                        <i class="fas fa-exclamation-circle mr-2 text-yellow-600"></i>Warning Code Word
                    </h4>
                    <p class="text-sm text-gray-600 mb-4">
                        A word that means "I need help soon but not emergency"
                    </p>
                    <input type="text" id="warning-codeword"
                           class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 text-lg font-semibold"
                           placeholder="Example: 'Do you have any BLUE paint?'">
                    <p class="text-xs text-gray-500 mt-2">
                        Use this when things are getting worse but not emergency yet
                    </p>
                </div>

                <div class="bg-green-50 rounded-lg p-6">
                    <h4 class="font-bold text-gray-800 mb-3 text-lg">
                        <i class="fas fa-check-circle mr-2 text-green-600"></i>Safe Code Word
                    </h4>
                    <p class="text-sm text-gray-600 mb-4">
                        A word that means "I'm safe now"
                    </p>
                    <input type="text" id="safe-codeword"
                           class="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                           placeholder="Example: 'The weather is SUNNY today'">
                    <p class="text-xs text-gray-500 mt-2">
                        Use this to let trusted people know you're okay
                    </p>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <h4 class="font-semibold text-blue-800 mb-2">How to use code words:</h4>
                    <ul class="text-sm text-blue-700 space-y-1">
                        <li><i class="fas fa-check mr-2"></i>Tell your safe contacts what each word means</li>
                        <li><i class="fas fa-check mr-2"></i>Practice using them in normal conversation</li>
                        <li><i class="fas fa-check mr-2"></i>Use words that sound natural to you</li>
                        <li><i class="fas fa-check mr-2"></i>Change them if you think the abuser knows them</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Load saved data for this tab
    loadTabData(tab);
}

function loadSavedPlan() {
    try {
        const saved = localStorage.getItem('safety_plan');
        if (saved) {
            const plan = JSON.parse(saved);
            window.safetyPlan = plan;
        }
    } catch (error) {
        console.error('Error loading safety plan:', error);
    }
}

function loadTabData(tab) {
    const plan = window.safetyPlan || {};
    
    setTimeout(() => {
        if (tab === 'escape') {
            if (plan.safePlace) document.getElementById('safe-place').value = plan.safePlace;
            if (plan.transport) document.getElementById('transport').value = plan.transport;
            if (plan.timing) document.getElementById('timing').value = plan.timing;
            if (plan.escapeNotes) document.getElementById('escape-notes').value = plan.escapeNotes;
        } else if (tab === 'contacts') {
            for (let i = 1; i <= 3; i++) {
                if (plan[`contact${i}Name`]) document.getElementById(`contact${i}-name`).value = plan[`contact${i}Name`];
                if (plan[`contact${i}Phone`]) document.getElementById(`contact${i}-phone`).value = plan[`contact${i}Phone`];
                if (plan[`contact${i}Relation`]) document.getElementById(`contact${i}-relation`).value = plan[`contact${i}Relation`];
            }
        } else if (tab === 'bag') {
            const checkboxes = document.querySelectorAll('.safety-checklist');
            checkboxes.forEach(cb => {
                const item = cb.dataset.item;
                if (plan.checklist && plan.checklist[item]) {
                    cb.checked = true;
                }
            });
        } else if (tab === 'codewords') {
            if (plan.emergencyCodeword) document.getElementById('emergency-codeword').value = plan.emergencyCodeword;
            if (plan.warningCodeword) document.getElementById('warning-codeword').value = plan.warningCodeword;
            if (plan.safeCodeword) document.getElementById('safe-codeword').value = plan.safeCodeword;
        }
    }, 100);
}

function saveSafetyPlan() {
    const plan = {
        // Escape plan
        safePlace: document.getElementById('safe-place')?.value || '',
        transport: document.getElementById('transport')?.value || '',
        timing: document.getElementById('timing')?.value || '',
        escapeNotes: document.getElementById('escape-notes')?.value || '',
        
        // Contacts
        contact1Name: document.getElementById('contact1-name')?.value || '',
        contact1Phone: document.getElementById('contact1-phone')?.value || '',
        contact1Relation: document.getElementById('contact1-relation')?.value || '',
        contact2Name: document.getElementById('contact2-name')?.value || '',
        contact2Phone: document.getElementById('contact2-phone')?.value || '',
        contact2Relation: document.getElementById('contact2-relation')?.value || '',
        contact3Name: document.getElementById('contact3-name')?.value || '',
        contact3Phone: document.getElementById('contact3-phone')?.value || '',
        contact3Relation: document.getElementById('contact3-relation')?.value || '',
        
        // Checklist
        checklist: {},
        
        // Code words
        emergencyCodeword: document.getElementById('emergency-codeword')?.value || '',
        warningCodeword: document.getElementById('warning-codeword')?.value || '',
        safeCodeword: document.getElementById('safe-codeword')?.value || '',
        
        lastUpdated: new Date().toISOString()
    };

    // Save checklist items
    const checkboxes = document.querySelectorAll('.safety-checklist');
    checkboxes.forEach(cb => {
        plan.checklist[cb.dataset.item] = cb.checked;
    });

    try {
        localStorage.setItem('safety_plan', JSON.stringify(plan));
        window.safetyPlan = plan;
        
        alert('✅ Your safety plan has been saved to this device!');
    } catch (error) {
        console.error('Error saving safety plan:', error);
        alert('Error saving plan. Please try again.');
    }
}

function printSafetyPlan() {
    const plan = window.safetyPlan || {};
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>My Personal Safety Plan</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
                h1 { color: #1e3a8a; border-bottom: 3px solid #1e3a8a; padding-bottom: 10px; }
                h2 { color: #4b5563; margin-top: 30px; }
                .section { margin-bottom: 30px; }
                .contact { background: #f3f4f6; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
                .checklist { list-style: none; padding-left: 0; }
                .checklist li { padding: 5px 0; }
                .codeword { background: #fef3c7; padding: 10px; margin: 10px 0; border-radius: 5px; font-weight: bold; }
                .warning { background: #fee2e2; padding: 15px; border-radius: 8px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>My Personal Safety Plan</h1>
            <p><em>Created: ${new Date(plan.lastUpdated || Date.now()).toLocaleDateString()}</em></p>
            
            <div class="section">
                <h2>🏃 Emergency Escape Plan</h2>
                <p><strong>Safe place to go:</strong> ${plan.safePlace || 'Not specified'}</p>
                <p><strong>How I will get there:</strong> ${plan.transport || 'Not specified'}</p>
                <p><strong>Best time to leave:</strong> ${plan.timing || 'Not specified'}</p>
                <p><strong>Notes:</strong> ${plan.escapeNotes || 'Not specified'}</p>
            </div>
            
            <div class="section">
                <h2>👥 Safe Contacts</h2>
                ${[1,2,3].map(i => plan[`contact${i}Name`] ? `
                    <div class="contact">
                        <strong>${plan[`contact${i}Name`]}</strong> (${plan[`contact${i}Relation`] || 'Contact'})<br>
                        Phone: ${plan[`contact${i}Phone`] || 'Not provided'}
                    </div>
                ` : '').join('')}
            </div>
            
            <div class="section">
                <h2>🎒 Emergency Bag Checklist</h2>
                <ul class="checklist">
                    ${Object.entries(plan.checklist || {}).map(([item, checked]) => 
                        checked ? `<li>☑ ${item.replace(/-/g, ' ')}</li>` : ''
                    ).join('')}
                </ul>
            </div>
            
            <div class="section">
                <h2>🔑 Secret Code Words</h2>
                ${plan.emergencyCodeword ? `<div class="codeword">🚨 Emergency: "${plan.emergencyCodeword}"</div>` : ''}
                ${plan.warningCodeword ? `<div class="codeword">⚠️ Warning: "${plan.warningCodeword}"</div>` : ''}
                ${plan.safeCodeword ? `<div class="codeword">✅ Safe: "${plan.safeCodeword}"</div>` : ''}
            </div>
            
            <div class="warning">
                <strong>⚠️ IMPORTANT SAFETY REMINDER:</strong><br>
                • Keep this plan in a safe place where it won't be found<br>
                • Update it regularly as your situation changes<br>
                • Emergency Hotline: <strong>116</strong> (24/7, Free, Confidential)<br>
                • Police Emergency: <strong>999</strong>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function clearSafetyPlan() {
    if (confirm('Are you sure you want to delete your safety plan? This cannot be undone.')) {
        localStorage.removeItem('safety_plan');
        window.safetyPlan = null;
        alert('Your safety plan has been cleared.');
        showSafetyTab('escape');
    }
}

// Export functions
window.loadSafetyPlanning = loadSafetyPlanning;
window.showSafetyTab = showSafetyTab;
window.saveSafetyPlan = saveSafetyPlan;
window.printSafetyPlan = printSafetyPlan;
window.clearSafetyPlan = clearSafetyPlan;
