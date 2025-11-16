/**
 * Healing Resources
 * Self-care tools and coping resources for survivors
 */

function loadHealingResources(section) {
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
            <div class="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-heart text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">Healing & Wellness</h1>
                        <p class="text-xl text-pink-50">Tools to help you feel better</p>
                    </div>
                </div>
            </div>

            <!-- Quick Tools -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onclick="showBreathingExercise()" 
                        class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow text-left">
                    <div class="text-5xl mb-3">🫁</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Breathing Exercise</h3>
                    <p class="text-sm text-gray-600">Calm your mind in 5 minutes</p>
                </button>
                <button onclick="showAffirmations()" 
                        class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow text-left">
                    <div class="text-5xl mb-3">💚</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Daily Affirmations</h3>
                    <p class="text-sm text-gray-600">Positive reminders for you</p>
                </button>
                <button onclick="showGroundingTechniques()" 
                        class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow text-left">
                    <div class="text-5xl mb-3">🌟</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Grounding Techniques</h3>
                    <p class="text-sm text-gray-600">Stay present and calm</p>
                </button>
            </div>

            <!-- Self-Care Tips -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-spa mr-2 text-pink-600"></i>Self-Care Tips
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-gray-800 mb-3">Taking Care of Your Body</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Try to eat regular meals, even small ones</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Drink water throughout the day</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Try to get some sleep, even if it's difficult</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Move your body gently - walk, stretch</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                                <span>Take a warm bath or shower</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 mb-3">Taking Care of Your Mind</h4>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                                <span>Talk to someone you trust</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                                <span>Write in a journal if it helps</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                                <span>Do something you enjoy, even for 5 minutes</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                                <span>Be patient and kind to yourself</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                                <span>It's okay to have bad days</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Coping with Feelings -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-brain mr-2 text-purple-600"></i>Understanding Your Feelings
                </h3>
                <p class="text-gray-600 mb-4">
                    After trauma, you may feel many different things. All your feelings are valid.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Angry</h4>
                        <p class="text-sm text-gray-700">It's normal to feel angry. Try: deep breathing, walking, talking to someone, writing it down.</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Sad</h4>
                        <p class="text-sm text-gray-700">Sadness is okay. Try: crying if you need to, talking to a friend, doing something comforting.</p>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Scared</h4>
                        <p class="text-sm text-gray-700">Fear is normal. Try: safety planning, calling 116, staying with someone you trust.</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Numb</h4>
                        <p class="text-sm text-gray-700">Numbness can happen. Try: gentle movement, talking even if you don't want to, being patient with yourself.</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Guilty</h4>
                        <p class="text-sm text-gray-700">It's NOT your fault. Try: talking to a counselor, repeating "It's not my fault", being kind to yourself.</p>
                    </div>
                    <div class="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-600">
                        <h4 class="font-bold text-gray-800 mb-2">If You Feel Confused</h4>
                        <p class="text-sm text-gray-700">Mixed feelings are normal. Try: taking it one day at a time, talking to a counselor, giving yourself time.</p>
                    </div>
                </div>
            </div>

            <!-- Success Stories -->
            <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-star mr-2 text-yellow-500"></i>Stories of Hope
                </h3>
                <p class="text-gray-600 mb-6">You are not alone. Many survivors have healed and found happiness again.</p>
                <div class="space-y-4">
                    <div class="bg-white rounded-lg p-4">
                        <p class="text-gray-700 italic mb-2">
                            "I thought my life was over. But with support from Rainbo Centre and my family, I found my strength again. 
                            Today I help other women. There is hope." - Fatmata, Bo
                        </p>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <p class="text-gray-700 italic mb-2">
                            "It took time, but I learned I am strong. I went back to school and now I'm a teacher. 
                            What happened doesn't define me." - Mariama, Freetown
                        </p>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <p class="text-gray-700 italic mb-2">
                            "Healing isn't a straight line. Some days are hard. But I have people who care, and I'm getting stronger every day." 
                            - Aminata, Kenema
                        </p>
                    </div>
                </div>
            </div>

            <!-- Professional Help -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-user-md mr-2 text-blue-600"></i>Professional Counseling
                </h3>
                <p class="text-gray-600 mb-4">
                    Talking to a trained counselor can really help. It's confidential and free.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Rainbo Centre Counseling</h4>
                        <p class="text-sm text-gray-600 mb-2">Free trauma counseling for survivors</p>
                        <a href="tel:076777777" class="text-blue-600 hover:underline">076-777-777</a>
                    </div>
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Lifeline Nehemiah</h4>
                        <p class="text-sm text-gray-600 mb-2">Trauma counseling & support groups</p>
                        <a href="tel:076300300" class="text-blue-600 hover:underline">076-300-300</a>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl shadow-lg p-8 text-center">
                <h3 class="text-2xl font-bold mb-3">You Are Strong. You Are Brave. You Are Healing.</h3>
                <p class="text-lg mb-6">Recovery takes time, but you don't have to do it alone.</p>
                <a href="tel:116" class="inline-block px-8 py-4 bg-white text-pink-600 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg">
                    <i class="fas fa-phone-alt mr-2"></i>Call 116 for Support
                </a>
            </div>
        </div>
    `;
}

function showBreathingExercise() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    section.innerHTML = `
        <div class="space-y-6">
            <!-- Quick Exit & Back -->
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>
            <button onclick="loadHealingResources(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <i class="fas fa-arrow-left mr-2"></i>Back
            </button>

            <!-- Breathing Exercise -->
            <div class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-xl shadow-lg text-center">
                <div class="text-6xl mb-4">🫁</div>
                <h1 class="text-4xl font-bold mb-2">Calm Breathing Exercise</h1>
                <p class="text-xl text-blue-50">Take 5 minutes to calm your mind and body</p>
            </div>

            <!-- Exercise Instructions -->
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">4-7-8 Breathing Technique</h3>
                
                <div id="breathing-animation" class="flex flex-col items-center justify-center mb-8">
                    <div id="breathing-circle" class="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold transition-all duration-1000">
                        Ready
                    </div>
                    <div id="breathing-instruction" class="mt-6 text-2xl font-bold text-gray-800">Click Start to Begin</div>
                </div>

                <div class="text-center mb-6">
                    <button id="start-breathing" onclick="startBreathingExercise()" 
                            class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg">
                        <i class="fas fa-play mr-2"></i>Start Exercise
                    </button>
                </div>

                <div class="space-y-4 text-gray-700">
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">1</div>
                        <div>
                            <div class="font-bold">Breathe IN through your nose</div>
                            <div class="text-sm text-gray-600">Count to 4 slowly</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">2</div>
                        <div>
                            <div class="font-bold">HOLD your breath</div>
                            <div class="text-sm text-gray-600">Count to 7</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">3</div>
                        <div>
                            <div class="font-bold">Breathe OUT through your mouth</div>
                            <div class="text-sm text-gray-600">Count to 8 slowly</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">4</div>
                        <div>
                            <div class="font-bold">Repeat</div>
                            <div class="text-sm text-gray-600">Do this 4 times</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function startBreathingExercise() {
    const circle = document.getElementById('breathing-circle');
    const instruction = document.getElementById('breathing-instruction');
    const button = document.getElementById('start-breathing');
    
    if (!circle || !instruction || !button) return;
    
    button.disabled = true;
    button.textContent = 'Exercise in progress...';
    
    let round = 0;
    const totalRounds = 4;
    
    function doRound() {
        if (round >= totalRounds) {
            instruction.textContent = 'Great job! You finished!';
            circle.textContent = '✓';
            circle.style.transform = 'scale(1)';
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-redo mr-2"></i>Do It Again';
            return;
        }
        
        round++;
        
        // Breathe In (4 seconds)
        instruction.textContent = 'Breathe IN through your nose...';
        circle.textContent = 'IN';
        circle.style.transform = 'scale(1.5)';
        circle.style.backgroundColor = '#3b82f6';
        
        setTimeout(() => {
            // Hold (7 seconds)
            instruction.textContent = 'HOLD your breath...';
            circle.textContent = 'HOLD';
            circle.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                // Breathe Out (8 seconds)
                instruction.textContent = 'Breathe OUT through your mouth...';
                circle.textContent = 'OUT';
                circle.style.transform = 'scale(1)';
                circle.style.backgroundColor = '#6366f1';
                
                setTimeout(() => {
                    doRound();
                }, 8000);
            }, 7000);
        }, 4000);
    }
    
    doRound();
}

function showAffirmations() {
    const affirmations = [
        "I am strong and capable.",
        "What happened is not my fault.",
        "I deserve safety and peace.",
        "I am brave for seeking help.",
        "My feelings are valid.",
        "I am healing every day.",
        "I am worthy of love and respect.",
        "I choose to take care of myself.",
        "I have the strength to overcome this.",
        "I am not defined by what happened to me.",
        "I am proud of my courage.",
        "I deserve happiness."
    ];
    
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    section.innerHTML = `
        <div class="space-y-6">
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>
            <button onclick="loadHealingResources(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <i class="fas fa-arrow-left mr-2"></i>Back
            </button>

            <div class="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl shadow-lg text-center">
                <div class="text-6xl mb-4">💚</div>
                <h1 class="text-4xl font-bold mb-2">Daily Affirmations</h1>
                <p class="text-xl text-pink-50">Positive reminders just for you</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                <div id="affirmation-display" class="mb-8">
                    <p class="text-3xl font-bold text-gray-800 mb-4">"${affirmations[0]}"</p>
                    <p class="text-gray-600">Take a moment to let these words sink in.</p>
                </div>
                <button onclick="showRandomAffirmation(${JSON.stringify(affirmations)})" 
                        class="px-8 py-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-bold text-lg">
                    <i class="fas fa-heart mr-2"></i>Show Me Another
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">All Affirmations</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${affirmations.map(aff => `
                        <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border-l-4 border-pink-600">
                            <p class="text-gray-800 font-semibold">"${aff}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showRandomAffirmation(affirmations) {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    const display = document.getElementById('affirmation-display');
    if (display) {
        display.innerHTML = `
            <p class="text-3xl font-bold text-gray-800 mb-4">"${randomAffirmation}"</p>
            <p class="text-gray-600">Take a moment to let these words sink in.</p>
        `;
    }
}

function showGroundingTechniques() {
    const section = document.querySelector('.space-y-6')?.parentElement || document.getElementById('dashboard-content');
    section.innerHTML = `
        <div class="space-y-6">
            <div class="fixed top-20 right-4 z-50">
                <button onclick="quickExit()" class="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700">
                    <i class="fas fa-times-circle mr-2"></i>Quick Exit
                </button>
            </div>
            <button onclick="loadHealingResources(document.querySelector('#survivor-portal-section') || document.getElementById('dashboard-content'))" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <i class="fas fa-arrow-left mr-2"></i>Back
            </button>

            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg text-center">
                <div class="text-6xl mb-4">🌟</div>
                <h1 class="text-4xl font-bold mb-2">Grounding Techniques</h1>
                <p class="text-xl text-purple-50">Ways to stay present when you feel overwhelmed</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">5-4-3-2-1 Grounding Method</h3>
                <p class="text-gray-600 mb-4">Use your senses to bring yourself back to the present moment.</p>
                <div class="space-y-4">
                    <div class="border-l-4 border-purple-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">👀 Name 5 things you can SEE</h4>
                        <p class="text-sm text-gray-600">Look around. What colors, shapes, objects do you notice?</p>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">✋ Name 4 things you can TOUCH</h4>
                        <p class="text-sm text-gray-600">Feel the chair, your clothes, the ground under your feet.</p>
                    </div>
                    <div class="border-l-4 border-green-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">👂 Name 3 things you can HEAR</h4>
                        <p class="text-sm text-gray-600">Birds, traffic, voices, music - what sounds are around you?</p>
                    </div>
                    <div class="border-l-4 border-yellow-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">👃 Name 2 things you can SMELL</h4>
                        <p class="text-sm text-gray-600">Fresh air, food, flowers - take a deep breath.</p>
                    </div>
                    <div class="border-l-4 border-red-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">👅 Name 1 thing you can TASTE</h4>
                        <p class="text-sm text-gray-600">Maybe have a sip of water or notice the taste in your mouth.</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">More Grounding Techniques</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Hold Ice or Cold Water</h4>
                        <p class="text-sm text-gray-600">The cold sensation helps bring you to the present.</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Count Backwards</h4>
                        <p class="text-sm text-gray-600">Start at 100 and count backwards by 7s.</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Name Categories</h4>
                        <p class="text-sm text-gray-600">List colors, animals, or cities - anything that makes you think.</p>
                    </div>
                    <div class="bg-pink-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Feel Your Feet</h4>
                        <p class="text-sm text-gray-600">Press your feet firmly on the ground. Wiggle your toes.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.loadHealingResources = loadHealingResources;
window.showBreathingExercise = showBreathingExercise;
window.startBreathingExercise = startBreathingExercise;
window.showAffirmations = showAffirmations;
window.showRandomAffirmation = showRandomAffirmation;
window.showGroundingTechniques = showGroundingTechniques;
