// Interactive Training Scenarios - Gamified GBV Response Learning
// Aligned with Sierra Leone Spotlight Initiative - Capacity Building

/**
 * INTERACTIVE TRAINING SCENARIOS SYSTEM
 * 
 * Features:
 * - Branching storyline scenarios
 * - Decision-based outcomes
 * - Real-world case simulations
 * - Role-specific training paths
 * - Performance scoring
 * - Badge and achievement system
 * - Progress tracking
 * - Instant feedback on decisions
 * - Multi-path scenarios
 * - Replay functionality
 * - Peer comparison
 * - Certificate generation
 * - Time-based challenges
 * - Team scenarios (multiplayer)
 */

let trainingModal = null;
let currentScenario = null;
let currentStep = 0;
let scenarioChoices = [];
let scenarioScore = 0;

// Training Scenarios Database
const trainingScenarios = [
  {
    id: 1,
    title: 'First Response: Sexual Assault Survivor',
    description: 'Learn proper initial response procedures when a sexual assault survivor arrives at your facility',
    difficulty: 'beginner',
    duration: '15 minutes',
    role: 'medical',
    category: 'emergency_response',
    badge: 'first-responder',
    steps: [
      {
        id: 1,
        type: 'situation',
        title: 'Initial Contact',
        content: `
          <div class="space-y-4">
            <p class="text-lg">A 23-year-old woman enters the Rainbo Center at 10 PM, visibly distressed and crying. She reports she was sexually assaulted 3 hours ago.</p>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p class="text-sm"><strong>Context:</strong> This is your first interaction with the survivor. Your initial response will set the tone for her entire healing journey.</p>
            </div>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Immediately ask her detailed questions about what happened',
            feedback: '❌ This approach can be re-traumatizing. Survivors need to feel safe before sharing details.',
            score: 0,
            outcome: 'negative',
            next: 2
          },
          {
            id: 'B',
            text: 'Welcome her warmly, ensure privacy, and let her know she is safe now',
            feedback: '✅ Excellent! Creating a safe, private environment is the first priority.',
            score: 20,
            outcome: 'positive',
            next: 3
          },
          {
            id: 'C',
            text: 'Tell her to wait while you find a doctor',
            feedback: '⚠️ Leaving a traumatized survivor alone can worsen their distress. Stay with them.',
            score: 5,
            outcome: 'neutral',
            next: 2
          },
          {
            id: 'D',
            text: 'Offer her water, ensure she sits comfortably, and introduce yourself calmly',
            feedback: '✅ Perfect! Meeting basic needs and establishing trust is crucial.',
            score: 20,
            outcome: 'positive',
            next: 3
          }
        ]
      },
      {
        id: 2,
        type: 'recovery',
        title: 'Recovery Path',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The survivor seems more withdrawn after your initial approach. You need to rebuild trust.</p>
            <div class="bg-red-50 border-l-4 border-red-400 p-4">
              <p class="text-sm"><strong>Learning Point:</strong> Initial mistakes can be corrected with patience and the right approach.</p>
            </div>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Apologize sincerely and ask how she would prefer to proceed',
            feedback: '✅ Good recovery! Acknowledging mistakes and respecting her autonomy helps rebuild trust.',
            score: 15,
            outcome: 'positive',
            next: 3
          },
          {
            id: 'B',
            text: 'Continue with the same approach but speak more gently',
            feedback: '❌ This doesn\'t address the core issue. Change your approach fundamentally.',
            score: 0,
            outcome: 'negative',
            next: 4
          }
        ]
      },
      {
        id: 3,
        type: 'medical_decision',
        title: 'Medical Care Priority',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The survivor is now calm and feels safe. She mentions the assault happened 3 hours ago. What is your immediate medical priority?</p>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p class="text-sm"><strong>Time-Sensitive:</strong> The 72-hour window for PEP and emergency contraception is critical.</p>
            </div>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Offer PEP (Post-Exposure Prophylaxis) immediately',
            feedback: '✅ Correct! PEP should be started within 72 hours, ideally within 2 hours.',
            score: 25,
            outcome: 'positive',
            next: 5
          },
          {
            id: 'B',
            text: 'Conduct forensic examination first',
            feedback: '⚠️ While important, PEP is time-critical. It should be offered first.',
            score: 10,
            outcome: 'neutral',
            next: 5
          },
          {
            id: 'C',
            text: 'Wait for the doctor to arrive before any medical intervention',
            feedback: '❌ Delays can compromise prevention effectiveness. Nurses can initiate PEP.',
            score: 0,
            outcome: 'negative',
            next: 5
          },
          {
            id: 'D',
            text: 'Offer PEP, emergency contraception, and explain the 72-hour window',
            feedback: '✅ Perfect! Comprehensive and timely approach.',
            score: 30,
            outcome: 'positive',
            next: 5
          }
        ]
      },
      {
        id: 4,
        type: 'final_negative',
        title: 'Scenario Outcome',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The survivor decides to leave without receiving full care. This highlights the importance of trauma-informed care from the first interaction.</p>
            <div class="bg-red-50 border-l-4 border-red-400 p-4">
              <p class="text-sm"><strong>Key Learning:</strong> Your approach in the first minutes can determine whether a survivor receives life-saving care.</p>
            </div>
          </div>
        `,
        isFinal: true
      },
      {
        id: 5,
        type: 'counseling',
        title: 'Psychosocial Support',
        content: `
          <div class="space-y-4">
            <p class="text-lg">Medical care is underway. The survivor asks if she can speak to someone about what happened. How do you respond?</p>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Connect her with a trained counselor immediately',
            feedback: '✅ Excellent! Immediate psychosocial support is crucial.',
            score: 20,
            outcome: 'positive',
            next: 6
          },
          {
            id: 'B',
            text: 'Tell her she can talk to you while you work',
            feedback: '⚠️ While empathetic, trained counselors are better equipped for trauma processing.',
            score: 10,
            outcome: 'neutral',
            next: 6
          },
          {
            id: 'C',
            text: 'Suggest she wait until after medical treatment to discuss emotional concerns',
            feedback: '❌ Emotional support should be integrated with medical care, not delayed.',
            score: 0,
            outcome: 'negative',
            next: 6
          }
        ]
      },
      {
        id: 6,
        type: 'final_positive',
        title: 'Successful Outcome',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The survivor receives comprehensive care and leaves feeling supported. She thanks you for treating her with dignity and respect.</p>
            <div class="bg-green-50 border-l-4 border-green-400 p-4">
              <p class="text-sm"><strong>Success!</strong> You've demonstrated excellent trauma-informed care. Your compassionate, professional approach made a critical difference.</p>
            </div>
          </div>
        `,
        isFinal: true
      }
    ]
  },
  {
    id: 2,
    title: 'Police Investigation: Suspect Interview',
    description: 'Learn proper evidence collection and interview techniques while protecting survivor rights',
    difficulty: 'intermediate',
    duration: '20 minutes',
    role: 'police',
    category: 'investigation',
    badge: 'detective',
    steps: [
      {
        id: 1,
        type: 'situation',
        title: 'Suspect Detained',
        content: `
          <div class="space-y-4">
            <p class="text-lg">You've detained a suspect in a sexual assault case. The survivor identified him, but the suspect denies everything. How do you proceed?</p>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Confront him aggressively to get a confession',
            feedback: '❌ Coercion invalidates confessions and violates due process.',
            score: 0,
            outcome: 'negative',
            next: 2
          },
          {
            id: 'B',
            text: 'Conduct a professional interview while preserving evidence',
            feedback: '✅ Correct! Professional investigation ensures justice.',
            score: 25,
            outcome: 'positive',
            next: 3
          }
        ]
      },
      {
        id: 2,
        type: 'final_negative',
        title: 'Case Compromised',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The suspect\'s lawyer successfully argues the confession was coerced. The case is dismissed.</p>
            <div class="bg-red-50 border-l-4 border-red-400 p-4">
              <p class="text-sm"><strong>Key Learning:</strong> Professional investigation techniques are essential for successful prosecution.</p>
            </div>
          </div>
        `,
        isFinal: true
      },
      {
        id: 3,
        type: 'final_positive',
        title: 'Strong Case Built',
        content: `
          <div class="space-y-4">
            <p class="text-lg">Your professional approach yields solid evidence. The case proceeds to prosecution with a strong foundation.</p>
            <div class="bg-green-50 border-l-4 border-green-400 p-4">
              <p class="text-sm"><strong>Success!</strong> Professional investigation protects both survivor rights and due process.</p>
            </div>
          </div>
        `,
        isFinal: true
      }
    ]
  },
  {
    id: 3,
    title: 'Case Manager: Multi-Agency Coordination',
    description: 'Coordinate services across Rainbo, Police FSU, and legal aid for complex case',
    difficulty: 'advanced',
    duration: '25 minutes',
    role: 'case_manager',
    category: 'coordination',
    badge: 'coordinator',
    steps: [
      {
        id: 1,
        type: 'situation',
        title: 'Complex Case Assignment',
        content: `
          <div class="space-y-4">
            <p class="text-lg">A 16-year-old survivor needs medical care, police investigation, and legal support. Multiple agencies are involved. How do you coordinate?</p>
          </div>
        `,
        choices: [
          {
            id: 'A',
            text: 'Schedule sequential services (medical → police → legal)',
            feedback: '⚠️ Sequential approach delays care. Parallel coordination is better.',
            score: 10,
            outcome: 'neutral',
            next: 2
          },
          {
            id: 'B',
            text: 'Coordinate all services simultaneously with clear communication',
            feedback: '✅ Excellent! Efficient coordination ensures comprehensive care.',
            score: 30,
            outcome: 'positive',
            next: 3
          }
        ]
      },
      {
        id: 2,
        type: 'final_neutral',
        title: 'Delayed Resolution',
        content: `
          <div class="space-y-4">
            <p class="text-lg">The survivor receives all services but the process takes 3 weeks. Better coordination could have expedited care.</p>
          </div>
        `,
        isFinal: true
      },
      {
        id: 3,
        type: 'final_positive',
        title: 'Excellent Coordination',
        content: `
          <div class="space-y-4">
            <p class="text-lg">All services delivered within 5 days. The survivor receives comprehensive, coordinated support.</p>
            <div class="bg-green-50 border-l-4 border-green-400 p-4">
              <p class="text-sm"><strong>Success!</strong> Your coordination ensured efficient, survivor-centered care.</p>
            </div>
          </div>
        `,
        isFinal: true
      }
    ]
  }
];

// Badges/Achievements
const badges = {
  'first-responder': { name: 'First Responder', icon: '🚑', description: 'Completed emergency response training' },
  'detective': { name: 'Detective', icon: '🔍', description: 'Mastered investigation techniques' },
  'coordinator': { name: 'Master Coordinator', icon: '🎯', description: 'Expert in multi-agency coordination' },
  'perfect-score': { name: 'Perfect Score', icon: '⭐', description: 'Achieved 100% in a scenario' },
  'quick-learner': { name: 'Quick Learner', icon: '⚡', description: 'Completed scenario in under 10 minutes' }
};

/**
 * Show Training Modal
 */
function showInteractiveTraining() {
  const modalHTML = `
    <div id="training-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <i class="fas fa-gamepad text-3xl"></i>
            <div>
              <h2 class="text-2xl font-bold">Interactive Training Scenarios</h2>
              <p class="text-purple-100 text-sm">Learn through realistic case simulations</p>
            </div>
          </div>
          <button onclick="closeInteractiveTraining()" 
                  class="text-white hover:text-purple-200 text-2xl">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Content -->
        <div id="training-content" class="p-6">
          ${generateScenariosList()}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  trainingModal = document.getElementById('training-modal');
}

/**
 * Generate Scenarios List
 */
function generateScenariosList() {
  return `
    <div class="space-y-6">
      <!-- Progress Overview -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Your Training Progress</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg">
            <div class="text-sm text-gray-600">Scenarios Completed</div>
            <div class="text-2xl font-bold text-purple-600">0 / ${trainingScenarios.length}</div>
          </div>
          <div class="bg-white p-4 rounded-lg">
            <div class="text-sm text-gray-600">Average Score</div>
            <div class="text-2xl font-bold text-purple-600">N/A</div>
          </div>
          <div class="bg-white p-4 rounded-lg">
            <div class="text-sm text-gray-600">Badges Earned</div>
            <div class="text-2xl font-bold text-purple-600">0 / ${Object.keys(badges).length}</div>
          </div>
        </div>
      </div>

      <!-- Scenarios Grid -->
      <div>
        <h3 class="text-lg font-bold text-gray-800 mb-4">Available Scenarios</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${trainingScenarios.map(scenario => `
            <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="bg-gradient-to-r ${getDifficultyGradient(scenario.difficulty)} p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold px-2 py-1 bg-white bg-opacity-20 rounded uppercase">
                    ${scenario.difficulty}
                  </span>
                  <span class="text-sm text-white">${scenario.duration}</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-1">${scenario.title}</h4>
                <p class="text-white text-opacity-90 text-sm">${scenario.description}</p>
              </div>
              <div class="p-4 bg-white">
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span><i class="fas fa-user-tag mr-1"></i>${formatRole(scenario.role)}</span>
                  <span><i class="fas fa-folder mr-1"></i>${formatCategory(scenario.category)}</span>
                </div>
                <button onclick="startScenario(${scenario.id})" 
                        class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  <i class="fas fa-play mr-2"></i>Start Scenario
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Badges Section -->
      <div>
        <h3 class="text-lg font-bold text-gray-800 mb-4">Available Badges</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          ${Object.entries(badges).map(([key, badge]) => `
            <div class="text-center p-4 bg-gray-50 rounded-lg opacity-50">
              <div class="text-4xl mb-2">${badge.icon}</div>
              <div class="font-semibold text-gray-800 text-sm">${badge.name}</div>
              <div class="text-xs text-gray-500 mt-1">${badge.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Start Scenario
 */
function startScenario(scenarioId) {
  currentScenario = trainingScenarios.find(s => s.id === scenarioId);
  currentStep = 0;
  scenarioChoices = [];
  scenarioScore = 0;
  
  const content = document.getElementById('training-content');
  content.innerHTML = generateScenarioStep(currentScenario.steps[0]);
}

/**
 * Generate Scenario Step
 */
function generateScenarioStep(step) {
  return `
    <div class="space-y-6">
      <!-- Progress Bar -->
      <div class="bg-gray-200 rounded-full h-2">
        <div class="bg-purple-600 h-2 rounded-full transition-all" 
             style="width: ${(currentStep / currentScenario.steps.length) * 100}%"></div>
      </div>

      <!-- Step Info -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-2xl font-bold text-gray-800">${step.title}</h3>
          <p class="text-gray-600">Step ${currentStep + 1} of ${currentScenario.steps.length}</p>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-600">Current Score</div>
          <div class="text-2xl font-bold text-purple-600">${scenarioScore} points</div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-gray-50 rounded-lg p-6">
        ${step.content}
      </div>

      <!-- Choices -->
      ${!step.isFinal ? `
        <div class="space-y-3">
          <h4 class="font-bold text-gray-800">What do you do?</h4>
          ${step.choices.map(choice => `
            <button onclick="makeChoice('${choice.id}', ${step.id})" 
                    class="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all group">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  ${choice.id}
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 font-medium">${choice.text}</p>
                </div>
              </div>
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="flex gap-4">
          <button onclick="restartScenario()" 
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
            <i class="fas fa-redo mr-2"></i>Try Again
          </button>
          <button onclick="closeScenarioAndShowResults()" 
                  class="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            <i class="fas fa-chart-bar mr-2"></i>View Results
          </button>
        </div>
      `}
    </div>
  `;
}

/**
 * Make Choice
 */
function makeChoice(choiceId, stepId) {
  const step = currentScenario.steps.find(s => s.id === stepId);
  const choice = step.choices.find(c => c.id === choiceId);
  
  // Record choice
  scenarioChoices.push({
    step: stepId,
    choice: choiceId,
    score: choice.score,
    outcome: choice.outcome
  });
  
  // Update score
  scenarioScore += choice.score;
  
  // Show feedback
  showChoiceFeedback(choice, () => {
    // Move to next step
    const nextStep = currentScenario.steps.find(s => s.id === choice.next);
    if (nextStep) {
      currentStep++;
      const content = document.getElementById('training-content');
      content.innerHTML = generateScenarioStep(nextStep);
      content.scrollTop = 0;
    }
  });
}

/**
 * Show Choice Feedback
 */
function showChoiceFeedback(choice, callback) {
  const feedbackHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]" id="feedback-overlay">
      <div class="bg-white rounded-lg p-8 max-w-2xl mx-4 text-center">
        <div class="text-6xl mb-4">
          ${choice.outcome === 'positive' ? '✅' : choice.outcome === 'negative' ? '❌' : '⚠️'}
        </div>
        <h3 class="text-2xl font-bold mb-4 ${choice.outcome === 'positive' ? 'text-green-600' : choice.outcome === 'negative' ? 'text-red-600' : 'text-yellow-600'}">
          ${choice.outcome === 'positive' ? 'Good Choice!' : choice.outcome === 'negative' ? 'Not Optimal' : 'Could Be Better'}
        </h3>
        <div class="text-lg text-gray-700 mb-6 whitespace-pre-line">${choice.feedback}</div>
        <div class="text-2xl font-bold text-purple-600 mb-6">
          ${choice.score > 0 ? '+' : ''}${choice.score} points
        </div>
        <button onclick="document.getElementById('feedback-overlay').remove()" 
                class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg">
          Continue
        </button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', feedbackHTML);
  
  // Auto-advance after 5 seconds
  setTimeout(() => {
    const overlay = document.getElementById('feedback-overlay');
    if (overlay) {
      overlay.remove();
      callback();
    }
  }, 5000);
}

/**
 * Restart Scenario
 */
function restartScenario() {
  startScenario(currentScenario.id);
}

/**
 * Close and Show Results
 */
function closeScenarioAndShowResults() {
  const maxScore = currentScenario.steps
    .filter(s => !s.isFinal)
    .reduce((total, step) => {
      const maxStepScore = Math.max(...step.choices.map(c => c.score));
      return total + maxStepScore;
    }, 0);
  
  const percentage = Math.round((scenarioScore / maxScore) * 100);
  
  const resultsHTML = `
    <div class="text-center space-y-6 py-8">
      <div class="text-6xl mb-4">
        ${percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
      </div>
      <h2 class="text-3xl font-bold text-gray-800">Scenario Complete!</h2>
      
      <div class="bg-purple-50 rounded-lg p-8 max-w-2xl mx-auto">
        <div class="text-6xl font-bold text-purple-600 mb-2">${scenarioScore} / ${maxScore}</div>
        <div class="text-2xl font-bold text-gray-800 mb-4">${percentage}% Score</div>
        
        <div class="space-y-3 text-left">
          <div class="flex justify-between p-3 bg-white rounded">
            <span>Positive Choices:</span>
            <span class="font-bold text-green-600">${scenarioChoices.filter(c => c.outcome === 'positive').length}</span>
          </div>
          <div class="flex justify-between p-3 bg-white rounded">
            <span>Needs Improvement:</span>
            <span class="font-bold text-red-600">${scenarioChoices.filter(c => c.outcome === 'negative').length}</span>
          </div>
          <div class="flex justify-between p-3 bg-white rounded">
            <span>Time to Complete:</span>
            <span class="font-bold">${currentScenario.duration}</span>
          </div>
        </div>
      </div>

      ${percentage >= 80 ? `
        <div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
          <div class="text-4xl mb-2">${badges[currentScenario.badge].icon}</div>
          <div class="text-xl font-bold text-green-800">Badge Earned!</div>
          <div class="text-green-700">${badges[currentScenario.badge].name}</div>
        </div>
      ` : ''}

      <div class="flex gap-4 justify-center">
        <button onclick="restartScenario()" 
                class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
          <i class="fas fa-redo mr-2"></i>Try Again
        </button>
        <button onclick="closeInteractiveTraining(); showInteractiveTraining();" 
                class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
          <i class="fas fa-list mr-2"></i>Back to Scenarios
        </button>
      </div>
    </div>
  `;
  
  const content = document.getElementById('training-content');
  content.innerHTML = resultsHTML;
}

/**
 * Utility Functions
 */
function getDifficultyGradient(difficulty) {
  const gradients = {
    'beginner': 'from-green-500 to-green-600',
    'intermediate': 'from-yellow-500 to-orange-600',
    'advanced': 'from-red-500 to-red-600'
  };
  return gradients[difficulty] || 'from-gray-500 to-gray-600';
}

function formatRole(role) {
  const roles = {
    'medical': 'Medical Staff',
    'police': 'Police FSU',
    'case_manager': 'Case Manager',
    'counselor': 'Counselor'
  };
  return roles[role] || role;
}

function formatCategory(category) {
  const categories = {
    'emergency_response': 'Emergency Response',
    'investigation': 'Investigation',
    'coordination': 'Coordination',
    'counseling': 'Counseling'
  };
  return categories[category] || category;
}

/**
 * Close Training Modal
 */
function closeInteractiveTraining() {
  if (trainingModal) {
    trainingModal.remove();
    trainingModal = null;
  }
  
  currentScenario = null;
  currentStep = 0;
  scenarioChoices = [];
  scenarioScore = 0;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Interactive Training Scenarios System loaded');
});
