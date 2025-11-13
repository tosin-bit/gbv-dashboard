/**
 * GBV Dashboard - Educational Modules Hub
 * Interactive learning platform for GBV prevention and response training
 */

// Sample educational modules data
const educationalModules = [
    {
        id: 1,
        title: 'Understanding GBV: Types and Forms',
        description: 'Comprehensive overview of gender-based violence including physical, sexual, psychological, and economic abuse.',
        category: 'prevention',
        duration: 15,
        difficulty: 'beginner',
        lessons: [
            {
                id: 1,
                title: 'What is GBV?',
                duration: 3,
                content: `
                    <h3 class="text-xl font-bold mb-4">What is Gender-Based Violence?</h3>
                    <p class="mb-4">Gender-based violence (GBV) is any harmful act directed at individuals based on their gender. It is rooted in gender inequality, the abuse of power, and harmful social norms.</p>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                        <p class="font-semibold mb-2">Key Definition:</p>
                        <p class="text-sm">GBV includes physical violence, sexual violence, psychological abuse, and economic abuse perpetrated against someone based on their gender.</p>
                    </div>
                    
                    <h4 class="font-bold mt-4 mb-2">Why Gender Matters:</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li>The majority of GBV is perpetrated by men against women</li>
                        <li>GBV is linked to power imbalances and gender inequality</li>
                        <li>Harmful gender norms and stereotypes contribute to GBV</li>
                        <li>GBV affects people of all genders, but disproportionately impacts women and girls</li>
                    </ul>
                `,
                quiz: {
                    question: 'What is the primary root cause of gender-based violence?',
                    options: [
                        'Alcohol and substance abuse',
                        'Gender inequality and power imbalances',
                        'Mental illness',
                        'Cultural differences'
                    ],
                    correct: 1,
                    explanation: 'While factors like substance abuse may be present, the root cause of GBV is gender inequality, power imbalances, and harmful social norms that perpetuate violence.'
                }
            },
            {
                id: 2,
                title: 'Types of GBV',
                duration: 5,
                content: `
                    <h3 class="text-xl font-bold mb-4">Types of Gender-Based Violence</h3>
                    
                    <div class="space-y-6">
                        <div class="border-l-4 border-red-500 pl-4">
                            <h4 class="font-bold text-lg mb-2">1. Physical Violence</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Hitting, slapping, punching, kicking</li>
                                <li>Burning, scalding</li>
                                <li>Use of weapons</li>
                                <li>Physical restraint</li>
                                <li>Any act causing physical harm</li>
                            </ul>
                        </div>
                        
                        <div class="border-l-4 border-purple-500 pl-4">
                            <h4 class="font-bold text-lg mb-2">2. Sexual Violence</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Rape and sexual assault</li>
                                <li>Forced sexual acts</li>
                                <li>Sexual harassment</li>
                                <li>Female Genital Mutilation (FGM/C)</li>
                                <li>Child sexual abuse</li>
                                <li>Sex trafficking</li>
                            </ul>
                        </div>
                        
                        <div class="border-l-4 border-blue-500 pl-4">
                            <h4 class="font-bold text-lg mb-2">3. Psychological/Emotional Abuse</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Threats and intimidation</li>
                                <li>Verbal abuse and humiliation</li>
                                <li>Isolation from friends and family</li>
                                <li>Stalking and harassment</li>
                                <li>Controlling behavior</li>
                                <li>Constant criticism</li>
                            </ul>
                        </div>
                        
                        <div class="border-l-4 border-green-500 pl-4">
                            <h4 class="font-bold text-lg mb-2">4. Economic Abuse</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Controlling finances</li>
                                <li>Preventing access to money</li>
                                <li>Preventing employment or education</li>
                                <li>Stealing money or property</li>
                                <li>Forcing financial dependency</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border border-yellow-200 rounded p-4 mt-6">
                        <p class="font-semibold mb-2">⚠️ Important Note:</p>
                        <p class="text-sm">These types of violence often occur together. Survivors may experience multiple forms of abuse simultaneously.</p>
                    </div>
                `,
                quiz: {
                    question: 'Which of the following is an example of economic abuse?',
                    options: [
                        'Shouting and yelling at someone',
                        'Controlling all household finances and preventing access to money',
                        'Pushing or shoving',
                        'Sending unwanted text messages'
                    ],
                    correct: 1,
                    explanation: 'Controlling finances and preventing access to money is economic abuse. This creates dependency and limits a person\'s ability to leave an abusive situation.'
                }
            },
            {
                id: 3,
                title: 'Warning Signs',
                duration: 4,
                content: `
                    <h3 class="text-xl font-bold mb-4">Recognizing Warning Signs of GBV</h3>
                    
                    <p class="mb-4">Early recognition of warning signs can help prevent escalation of violence and support survivors.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-red-50 p-4 rounded">
                            <h4 class="font-bold mb-3 flex items-center gap-2">
                                <i class="fas fa-exclamation-triangle text-red-600"></i>
                                Behavioral Warning Signs
                            </h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Extreme jealousy or possessiveness</li>
                                <li>Controlling behavior</li>
                                <li>Isolation from support networks</li>
                                <li>Unpredictable mood swings</li>
                                <li>Blaming others for their actions</li>
                                <li>History of violence</li>
                            </ul>
                        </div>
                        
                        <div class="bg-orange-50 p-4 rounded">
                            <h4 class="font-bold mb-3 flex items-center gap-2">
                                <i class="fas fa-eye text-orange-600"></i>
                                Signs in a Survivor
                            </h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Unexplained injuries or frequent accidents</li>
                                <li>Changes in behavior or personality</li>
                                <li>Withdrawal from activities</li>
                                <li>Fear of partner or family member</li>
                                <li>Making excuses for partner's behavior</li>
                                <li>Anxiety, depression, or low self-esteem</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-blue-100 border-l-4 border-blue-500 p-4 mt-6">
                        <h4 class="font-bold mb-2">🤝 How to Help:</h4>
                        <ul class="list-disc pl-6 space-y-1 text-sm">
                            <li>Listen without judgment</li>
                            <li>Believe them</li>
                            <li>Provide information about services</li>
                            <li>Respect their decisions</li>
                            <li>Maintain confidentiality</li>
                            <li>Follow up if they want support</li>
                        </ul>
                    </div>
                `,
                quiz: {
                    question: 'What is the FIRST thing you should do when someone discloses GBV to you?',
                    options: [
                        'Tell them to leave their partner immediately',
                        'Listen without judgment and believe them',
                        'Call the police right away',
                        'Confront the perpetrator'
                    ],
                    correct: 1,
                    explanation: 'The most important first step is to listen without judgment and believe the survivor. They need support and validation. Decisions about next steps should respect their autonomy and safety.'
                }
            },
            {
                id: 4,
                title: 'Supporting Survivors',
                duration: 3,
                content: `
                    <h3 class="text-xl font-bold mb-4">How to Support GBV Survivors</h3>
                    
                    <div class="space-y-4">
                        <div class="bg-green-50 border-l-4 border-green-500 p-4">
                            <h4 class="font-bold mb-2">✓ DO:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Listen</strong> without judgment</li>
                                <li><strong>Believe</strong> them</li>
                                <li><strong>Provide information</strong> about services (Rainbo Centers, Police FSU, hotline 116)</li>
                                <li><strong>Respect their autonomy</strong> - let them make their own decisions</li>
                                <li><strong>Maintain confidentiality</strong></li>
                                <li><strong>Follow up</strong> if they want support</li>
                                <li><strong>Take care of yourself</strong> - supporting survivors can be emotionally taxing</li>
                            </ul>
                        </div>
                        
                        <div class="bg-red-50 border-l-4 border-red-500 p-4">
                            <h4 class="font-bold mb-2">✗ DON'T:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Don't blame</strong> them or ask "why didn't you leave?"</li>
                                <li><strong>Don't pressure</strong> them to take action they're not ready for</li>
                                <li><strong>Don't make promises</strong> you can't keep</li>
                                <li><strong>Don't confront</strong> the perpetrator - this could endanger the survivor</li>
                                <li><strong>Don't share</strong> their story without permission</li>
                                <li><strong>Don't judge</strong> their decisions</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 p-4 rounded mt-4">
                        <h4 class="font-bold mb-2 flex items-center gap-2">
                            <i class="fas fa-phone text-blue-600"></i>
                            Emergency Contacts
                        </h4>
                        <ul class="space-y-1 text-sm">
                            <li><strong>National GBV Hotline:</strong> 116 (24/7)</li>
                            <li><strong>Rainbo Centers:</strong> Medical care and support</li>
                            <li><strong>Police FSU:</strong> Report and investigation</li>
                            <li><strong>Legal Aid:</strong> Free legal representation</li>
                        </ul>
                    </div>
                `,
                quiz: {
                    question: 'Why is it important NOT to confront the perpetrator on behalf of a survivor?',
                    options: [
                        'It might make you look bad',
                        'The perpetrator might deny it',
                        'It could endanger the survivor and escalate violence',
                        'It\'s not your responsibility'
                    ],
                    correct: 2,
                    explanation: 'Confronting the perpetrator can endanger the survivor and escalate violence. The survivor knows their situation best and should be supported in making their own decisions about next steps.'
                }
            }
        ],
        icon: 'book-open',
        color: 'blue',
        completions: 247,
        rating: 4.8
    },
    {
        id: 2,
        title: 'Bystander Intervention: The 5 Ds',
        description: 'Learn safe and effective ways to intervene when you witness GBV or support someone experiencing violence.',
        category: 'prevention',
        duration: 20,
        difficulty: 'intermediate',
        lessons: [
            {
                id: 1,
                title: 'Introduction to Bystander Intervention',
                duration: 4,
                content: `
                    <h3 class="text-xl font-bold mb-4">What is Bystander Intervention?</h3>
                    
                    <p class="mb-4">Bystander intervention is when someone who witnesses or becomes aware of GBV takes action to prevent, stop, or respond to the violence in a safe way.</p>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                        <h4 class="font-bold mb-2">Why Bystander Intervention Matters:</h4>
                        <ul class="list-disc pl-6 space-y-1 text-sm">
                            <li>You can help prevent violence before it occurs</li>
                            <li>You can interrupt violence in progress</li>
                            <li>You can support survivors after violence</li>
                            <li>Community action changes social norms</li>
                            <li>Everyone has a role in preventing GBV</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 p-4 rounded">
                        <h4 class="font-bold mb-2">The Bystander Effect:</h4>
                        <p class="text-sm mb-2">The bystander effect is a psychological phenomenon where people are less likely to help when others are present. Understanding this helps us overcome it.</p>
                        <p class="text-sm font-semibold">Remember: If everyone thinks "someone else will help," no one helps. Be the someone!</p>
                    </div>
                `,
                quiz: {
                    question: 'What is the "bystander effect"?',
                    options: [
                        'When bystanders always intervene',
                        'When people are less likely to help because others are present',
                        'When bystanders become victims',
                        'When intervention always works'
                    ],
                    correct: 1,
                    explanation: 'The bystander effect means people are less likely to help when others are present because they assume someone else will intervene. Knowing this helps us overcome it and take action.'
                }
            },
            {
                id: 2,
                title: 'The 5 Ds: Direct',
                duration: 4,
                content: `
                    <h3 class="text-xl font-bold mb-4">Direct Intervention</h3>
                    
                    <p class="mb-4">Directly addressing the situation by speaking up or taking action.</p>
                    
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <h4 class="font-bold mb-2">⚠️ Safety First!</h4>
                        <p class="text-sm">Only use direct intervention if it is safe to do so. Your safety and the survivor's safety are the top priorities.</p>
                    </div>
                    
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-bold mb-2">When Direct Intervention is Appropriate:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>You feel safe and confident</li>
                                <li>The situation has not escalated to physical violence</li>
                                <li>You have support from others</li>
                                <li>There is no weapon involved</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-bold mb-2">Examples of Direct Intervention:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Saying "That's not okay" or "Stop"</li>
                                <li>Speaking up against harmful comments or jokes</li>
                                <li>Telling someone their behavior is unacceptable</li>
                                <li>Intervening in an argument before it escalates</li>
                            </ul>
                        </div>
                        
                        <div class="bg-yellow-50 p-4 rounded">
                            <h4 class="font-bold mb-2">💡 Tips for Direct Intervention:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm">
                                <li>Stay calm and confident</li>
                                <li>Use a firm but not aggressive tone</li>
                                <li>Be clear and concise</li>
                                <li>Don't escalate the situation</li>
                                <li>Have an exit plan if things get unsafe</li>
                            </ul>
                        </div>
                    </div>
                `,
                quiz: {
                    question: 'When should you NOT use direct intervention?',
                    options: [
                        'When you feel unsafe or threatened',
                        'When you are alone',
                        'When there is a weapon involved',
                        'All of the above'
                    ],
                    correct: 3,
                    explanation: 'You should not use direct intervention when you feel unsafe, are alone without support, or when there is a weapon involved. Safety always comes first - use other methods like Distract, Delegate, or Delay instead.'
                }
            }
        ],
        icon: 'users',
        color: 'green',
        completions: 189,
        rating: 4.6
    },
    {
        id: 3,
        title: 'Survivor-Centered Case Management',
        description: 'Comprehensive training for service providers on survivor-centered case management best practices.',
        category: 'service_provider_training',
        duration: 60,
        difficulty: 'advanced',
        lessons: [
            {
                id: 1,
                title: 'Core Principles',
                duration: 10,
                content: `
                    <h3 class="text-xl font-bold mb-4">Survivor-Centered Approach: Core Principles</h3>
                    
                    <p class="mb-4">A survivor-centered approach puts the survivor at the center of all interventions, prioritizing their safety, dignity, and autonomy.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-blue-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-shield-alt text-blue-600"></i>
                                1. Safety First
                            </h4>
                            <p class="text-sm">The safety and security of the survivor is the top priority in all decisions and actions.</p>
                        </div>
                        
                        <div class="bg-purple-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-lock text-purple-600"></i>
                                2. Confidentiality
                            </h4>
                            <p class="text-sm">Protect survivor information and only share with their informed consent (except mandatory reporting situations).</p>
                        </div>
                        
                        <div class="bg-green-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-heart text-green-600"></i>
                                3. Respect and Dignity
                            </h4>
                            <p class="text-sm">Treat survivors with respect, compassion, and without judgment. Recognize their strength and resilience.</p>
                        </div>
                        
                        <div class="bg-yellow-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-user-check text-yellow-600"></i>
                                4. Survivor Autonomy
                            </h4>
                            <p class="text-sm">Support survivors in making their own informed decisions. They are the experts on their own lives.</p>
                        </div>
                        
                        <div class="bg-red-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-equals text-red-600"></i>
                                5. Non-Discrimination
                            </h4>
                            <p class="text-sm">Provide services without discrimination based on age, gender, religion, ethnicity, sexual orientation, disability, or any other factor.</p>
                        </div>
                        
                        <div class="bg-teal-50 p-4 rounded">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <i class="fas fa-sync-alt text-teal-600"></i>
                                6. Holistic Response
                            </h4>
                            <p class="text-sm">Address all survivor needs - medical, legal, psychosocial, safety, and economic - through coordinated services.</p>
                        </div>
                    </div>
                    
                    <div class="bg-blue-100 border-l-4 border-blue-500 p-4">
                        <p class="font-semibold mb-2">Remember:</p>
                        <p class="text-sm">These principles should guide every interaction with survivors and inform all case management decisions.</p>
                    </div>
                `,
                quiz: {
                    question: 'What does "survivor autonomy" mean in case management?',
                    options: [
                        'The service provider makes all decisions for the survivor',
                        'The survivor is supported in making their own informed decisions',
                        'The survivor must handle everything alone',
                        'The survivor\'s family makes all decisions'
                    ],
                    correct: 1,
                    explanation: 'Survivor autonomy means supporting survivors in making their own informed decisions. They are the experts on their own lives and should be empowered to make choices that feel right for them, with full information and support.'
                }
            }
        ],
        icon: 'graduation-cap',
        color: 'purple',
        completions: 156,
        rating: 4.9
    }
];

// Current module and lesson state
let currentModule = null;
let currentLessonIndex = 0;
let quizAnswers = {};
let moduleProgress = {};

// Initialize education hub
function initEducationHub() {
    loadModuleCards();
}

// Load module cards
function loadModuleCards() {
    const container = document.getElementById('modules-grid');
    if (!container) return;
    
    container.innerHTML = educationalModules.map(module => `
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer" onclick="viewModuleDetails(${module.id})">
            <div class="bg-gradient-to-r from-${module.color}-500 to-${module.color}-600 text-white p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-${module.icon} text-2xl"></i>
                    </div>
                    <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold capitalize">
                        ${module.difficulty}
                    </span>
                </div>
                <h3 class="text-xl font-bold mb-2">${module.title}</h3>
                <p class="text-${module.color}-100 text-sm mb-4">${module.description}</p>
                
                <div class="flex items-center justify-between text-sm">
                    <span><i class="fas fa-clock mr-1"></i>${module.duration} min</span>
                    <span><i class="fas fa-book-reader mr-1"></i>${module.lessons.length} lessons</span>
                </div>
            </div>
            
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-star text-yellow-500"></i>
                        <span class="font-semibold">${module.rating}</span>
                        <span class="text-gray-500 text-sm">(${module.completions} completed)</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Your Progress</span>
                    <span class="text-sm font-semibold text-${module.color}-600">${getModuleProgress(module.id)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div class="bg-${module.color}-600 h-2 rounded-full transition-all" style="width: ${getModuleProgress(module.id)}%"></div>
                </div>
                
                <button onclick="event.stopPropagation(); startModule(${module.id})" class="mt-4 w-full px-4 py-2 bg-${module.color}-600 text-white rounded-lg hover:bg-${module.color}-700 transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-play-circle"></i>
                    ${getModuleProgress(module.id) > 0 ? 'Continue Learning' : 'Start Module'}
                </button>
            </div>
        </div>
    `).join('');
}

// Get module progress
function getModuleProgress(moduleId) {
    return moduleProgress[moduleId] || 0;
}

// Start module
function startModule(moduleId) {
    currentModule = educationalModules.find(m => m.id === moduleId);
    if (!currentModule) return;
    
    currentLessonIndex = 0;
    quizAnswers = {};
    
    showLessonModal();
}

// View module details
function viewModuleDetails(moduleId) {
    const module = educationalModules.find(m => m.id === moduleId);
    if (!module) return;
    
    const modalHTML = `
        <div id="module-details-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeModuleModal(event)">
            <div class="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="bg-gradient-to-r from-${module.color}-500 to-${module.color}-600 text-white p-6">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 mb-3 capitalize">
                                ${module.difficulty} Level
                            </span>
                            <h2 class="text-2xl font-bold mb-2">${module.title}</h2>
                            <p class="text-${module.color}-100">${module.description}</p>
                        </div>
                        <button onclick="closeModuleModal()" class="text-white hover:text-gray-200 ml-4">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <i class="fas fa-clock text-${module.color}-600 text-2xl mb-2"></i>
                            <div class="font-semibold">${module.duration} minutes</div>
                            <div class="text-xs text-gray-600">Total Duration</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <i class="fas fa-book-reader text-${module.color}-600 text-2xl mb-2"></i>
                            <div class="font-semibold">${module.lessons.length} lessons</div>
                            <div class="text-xs text-gray-600">Interactive Content</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <i class="fas fa-certificate text-${module.color}-600 text-2xl mb-2"></i>
                            <div class="font-semibold">${module.lessons.length} quizzes</div>
                            <div class="text-xs text-gray-600">Knowledge Checks</div>
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-semibold mb-4">Course Content</h3>
                    <div class="space-y-2">
                        ${module.lessons.map((lesson, index) => `
                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-${module.color}-100 text-${module.color}-600 rounded-full flex items-center justify-center font-semibold">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <div class="font-medium">${lesson.title}</div>
                                        <div class="text-xs text-gray-500">${lesson.duration} minutes</div>
                                    </div>
                                </div>
                                <i class="fas fa-check-circle text-green-500"></i>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-6 flex gap-3">
                        <button onclick="startModule(${module.id})" class="flex-1 px-6 py-3 bg-${module.color}-600 text-white rounded-lg hover:bg-${module.color}-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                            <i class="fas fa-play-circle"></i>
                            Start Learning
                        </button>
                        <button onclick="closeModuleModal()" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show lesson modal
function showLessonModal() {
    if (!currentModule || currentLessonIndex >= currentModule.lessons.length) {
        showCompletionModal();
        return;
    }
    
    const lesson = currentModule.lessons[currentLessonIndex];
    const progress = ((currentLessonIndex / currentModule.lessons.length) * 100).toFixed(0);
    
    const modalHTML = `
        <div id="lesson-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="bg-gradient-to-r from-${currentModule.color}-500 to-${currentModule.color}-600 text-white p-6 sticky top-0 z-10">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="text-sm opacity-80 mb-1">Lesson ${currentLessonIndex + 1} of ${currentModule.lessons.length}</div>
                            <h2 class="text-2xl font-bold">${lesson.title}</h2>
                        </div>
                        <button onclick="closeLessonModal()" class="text-white hover:text-gray-200 ml-4">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    
                    <!-- Progress bar -->
                    <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                        <div class="bg-white h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                    </div>
                    <div class="text-xs mt-1 opacity-80">${progress}% Complete</div>
                </div>
                
                <!-- Content -->
                <div id="lesson-content-area" class="p-6">
                    <div class="prose max-w-none">
                        ${lesson.content}
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t sticky bottom-0">
                    ${currentLessonIndex > 0 ? `
                        <button onclick="previousLesson()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                            <i class="fas fa-arrow-left"></i>
                            Previous
                        </button>
                    ` : '<div></div>'}
                    
                    <button onclick="showQuiz()" class="px-6 py-2 bg-${currentModule.color}-600 text-white rounded-lg hover:bg-${currentModule.color}-700 transition-colors flex items-center gap-2">
                        Take Quiz
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show quiz
function showQuiz() {
    const lesson = currentModule.lessons[currentLessonIndex];
    const quiz = lesson.quiz;
    
    const contentArea = document.getElementById('lesson-content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                <h3 class="text-xl font-bold mb-4">Knowledge Check</h3>
                <p class="text-gray-700 mb-6">${quiz.question}</p>
                
                <div class="space-y-3" id="quiz-options">
                    ${quiz.options.map((option, index) => `
                        <button onclick="selectAnswer(${index})" 
                                class="quiz-option w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                                data-index="${index}">
                            <div class="flex items-center gap-3">
                                <div class="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                    <div class="w-3 h-3 rounded-full hidden"></div>
                                </div>
                                <span>${option}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
                
                <div id="quiz-feedback" class="mt-6 hidden"></div>
                
                <button id="submit-quiz-btn" onclick="submitQuiz()" 
                        class="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled>
                    Submit Answer
                </button>
            </div>
        </div>
    `;
}

// Select answer
function selectAnswer(index) {
    quizAnswers[currentLessonIndex] = index;
    
    // Update UI
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('border-blue-500', 'bg-blue-50');
            opt.querySelector('.w-3').classList.remove('hidden');
            opt.querySelector('.w-3').classList.add('bg-blue-500');
        } else {
            opt.classList.remove('border-blue-500', 'bg-blue-50');
            opt.querySelector('.w-3').classList.add('hidden');
        }
    });
    
    // Enable submit button
    document.getElementById('submit-quiz-btn').disabled = false;
}

// Submit quiz
function submitQuiz() {
    const lesson = currentModule.lessons[currentLessonIndex];
    const quiz = lesson.quiz;
    const userAnswer = quizAnswers[currentLessonIndex];
    const isCorrect = userAnswer === quiz.correct;
    
    const feedback = document.getElementById('quiz-feedback');
    if (!feedback) return;
    
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
        <div class="p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}">
            <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-${isCorrect ? 'check-circle text-green-600' : 'times-circle text-red-600'} text-xl"></i>
                <span class="font-semibold">${isCorrect ? 'Correct!' : 'Not quite right'}</span>
            </div>
            <p class="text-sm text-gray-700">${quiz.explanation}</p>
        </div>
    `;
    
    // Update button
    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.textContent = 'Continue to Next Lesson';
    submitBtn.onclick = nextLesson;
    submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
}

// Next lesson
function nextLesson() {
    currentLessonIndex++;
    
    // Update progress
    moduleProgress[currentModule.id] = ((currentLessonIndex / currentModule.lessons.length) * 100).toFixed(0);
    
    closeLessonModal();
    
    if (currentLessonIndex < currentModule.lessons.length) {
        showLessonModal();
    } else {
        showCompletionModal();
    }
}

// Previous lesson
function previousLesson() {
    if (currentLessonIndex > 0) {
        currentLessonIndex--;
        closeLessonModal();
        showLessonModal();
    }
}

// Show completion modal
function showCompletionModal() {
    const modalHTML = `
        <div id="completion-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-trophy text-green-600 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2">Module Complete!</h2>
                <p class="text-gray-600 mb-6">Congratulations! You've completed "${currentModule.title}"</p>
                
                <div class="bg-blue-50 rounded-lg p-4 mb-6">
                    <div class="text-sm text-gray-600 mb-2">Your Score</div>
                    <div class="text-3xl font-bold text-blue-600">${calculateScore()}%</div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="closeCompletionModal(); loadModuleCards();" 
                            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Back to Modules
                    </button>
                    <button onclick="shareCompletion()" 
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Calculate score
function calculateScore() {
    let correct = 0;
    currentModule.lessons.forEach((lesson, index) => {
        if (quizAnswers[index] === lesson.quiz.correct) {
            correct++;
        }
    });
    return ((correct / currentModule.lessons.length) * 100).toFixed(0);
}

// Close modals
function closeModuleModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('module-details-modal');
    if (modal) modal.remove();
}

function closeLessonModal() {
    const modal = document.getElementById('lesson-modal');
    if (modal) modal.remove();
}

function closeCompletionModal() {
    const modal = document.getElementById('completion-modal');
    if (modal) modal.remove();
}

function shareCompletion() {
    alert('Certificate download feature coming soon!');
}

// Export functions
window.initEducationHub = initEducationHub;
window.viewModuleDetails = viewModuleDetails;
window.closeModuleModal = closeModuleModal;
window.startModule = startModule;
window.closeLessonModal = closeLessonModal;
window.showQuiz = showQuiz;
window.selectAnswer = selectAnswer;
window.submitQuiz = submitQuiz;
window.nextLesson = nextLesson;
window.previousLesson = previousLesson;
window.closeCompletionModal = closeCompletionModal;
window.shareCompletion = shareCompletion;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEducationHub);
} else {
    initEducationHub();
}
