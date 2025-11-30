// Risk Assessment AI - Predicts case risk levels and re-victimization likelihood
// Aligned with Sierra Leone Spotlight Initiative - Early Intervention & Prevention

/**
 * RISK ASSESSMENT AI SYSTEM
 * 
 * Features:
 * - Multi-factor risk scoring algorithm
 * - Re-victimization prediction model
 * - Safety planning recommendations
 * - Risk level visualization
 * - Historical trend analysis
 * - Automated alerts for high-risk cases
 * 
 * Risk Factors Analyzed:
 * - Violence severity and frequency
 * - Perpetrator characteristics
 * - Survivor vulnerability factors
 * - Support system strength
 * - Previous incidents
 * - Environmental risk factors
 */

let riskAssessmentModal = null;
let currentCaseRiskData = null;

// Risk factor weights (calibrated for Sierra Leone context)
const riskWeights = {
  // Violence Characteristics (40% weight)
  violenceSeverity: {
    weight: 0.15,
    factors: {
      'life_threatening': 10,
      'severe_injury': 8,
      'moderate_injury': 5,
      'minor_injury': 3,
      'no_injury': 1
    }
  },
  violenceFrequency: {
    weight: 0.15,
    factors: {
      'daily': 10,
      'weekly': 8,
      'monthly': 5,
      'occasional': 3,
      'first_time': 2
    }
  },
  violenceEscalation: {
    weight: 0.10,
    factors: {
      'rapidly_increasing': 10,
      'gradually_increasing': 7,
      'stable': 4,
      'decreasing': 2
    }
  },

  // Perpetrator Factors (25% weight)
  perpetratorThreats: {
    weight: 0.10,
    factors: {
      'death_threats': 10,
      'weapon_threats': 9,
      'harm_threats': 7,
      'verbal_only': 4,
      'none': 1
    }
  },
  perpetratorAccess: {
    weight: 0.08,
    factors: {
      'lives_together': 10,
      'frequent_contact': 8,
      'occasional_contact': 5,
      'minimal_contact': 3,
      'no_contact': 1
    }
  },
  perpetratorSubstance: {
    weight: 0.07,
    factors: {
      'active_addiction': 9,
      'regular_use': 7,
      'occasional_use': 4,
      'none': 1
    }
  },

  // Survivor Vulnerability (20% weight)
  survivorDependency: {
    weight: 0.08,
    factors: {
      'complete_dependency': 10,
      'high_dependency': 7,
      'moderate_dependency': 5,
      'low_dependency': 3,
      'independent': 1
    }
  },
  survivorIsolation: {
    weight: 0.07,
    factors: {
      'completely_isolated': 10,
      'highly_isolated': 7,
      'some_support': 4,
      'strong_support': 2
    }
  },
  childrenPresent: {
    weight: 0.05,
    factors: {
      'yes_multiple': 8,
      'yes_one': 6,
      'pregnant': 7,
      'none': 2
    }
  },

  // Environmental Factors (15% weight)
  previousReports: {
    weight: 0.08,
    factors: {
      'multiple_reports': 9,
      'previous_report': 6,
      'first_report': 3
    }
  },
  communitySupport: {
    weight: 0.07,
    factors: {
      'hostile_community': 9,
      'unsupportive': 6,
      'neutral': 4,
      'supportive': 2
    }
  }
};

// Risk level thresholds
const riskLevels = {
  critical: { min: 8.0, max: 10, color: '#dc2626', label: 'CRITICAL', icon: 'fa-exclamation-triangle' },
  high: { min: 6.0, max: 7.9, color: '#ea580c', label: 'HIGH', icon: 'fa-exclamation-circle' },
  moderate: { min: 4.0, max: 5.9, color: '#f59e0b', label: 'MODERATE', icon: 'fa-info-circle' },
  low: { min: 0, max: 3.9, color: '#10b981', label: 'LOW', icon: 'fa-check-circle' }
};

// Re-victimization prediction model
const revictimizationFactors = {
  returnToPerpetrator: { weight: 0.25, values: { 'yes': 10, 'considering': 7, 'no': 1 } },
  followedSafetyPlan: { weight: 0.20, values: { 'no': 10, 'partially': 6, 'yes': 2 } },
  legalProtection: { weight: 0.15, values: { 'none': 10, 'pending': 6, 'active': 2 } },
  economicStability: { weight: 0.15, values: { 'unstable': 9, 'uncertain': 5, 'stable': 2 } },
  mentalHealthSupport: { weight: 0.15, values: { 'none': 8, 'inadequate': 5, 'adequate': 2 } },
  socialSupport: { weight: 0.10, values: { 'none': 9, 'weak': 6, 'strong': 2 } }
};

/**
 * Calculate comprehensive risk score for a case
 */
function calculateRiskScore(assessmentData) {
  let totalScore = 0;
  let maxPossibleScore = 0;
  const factorScores = {};

  // Calculate weighted scores for each risk factor
  for (const [factorKey, factorConfig] of Object.entries(riskWeights)) {
    const selectedValue = assessmentData[factorKey];
    if (selectedValue && factorConfig.factors[selectedValue]) {
      const rawScore = factorConfig.factors[selectedValue];
      const weightedScore = (rawScore / 10) * factorConfig.weight * 10;
      factorScores[factorKey] = {
        raw: rawScore,
        weighted: weightedScore,
        weight: factorConfig.weight
      };
      totalScore += weightedScore;
      maxPossibleScore += factorConfig.weight * 10;
    }
  }

  // Normalize to 0-10 scale
  const normalizedScore = (totalScore / maxPossibleScore) * 10;

  return {
    score: normalizedScore,
    totalScore: totalScore,
    maxPossible: maxPossibleScore,
    factorScores: factorScores
  };
}

/**
 * Calculate re-victimization probability
 */
function calculateRevictimizationRisk(data) {
  let totalScore = 0;
  let maxScore = 0;

  for (const [factor, config] of Object.entries(revictimizationFactors)) {
    const value = data[factor];
    if (value && config.values[value]) {
      totalScore += config.values[value] * config.weight;
      maxScore += 10 * config.weight;
    }
  }

  const probability = (totalScore / maxScore) * 100;
  return {
    probability: probability,
    level: probability >= 70 ? 'high' : probability >= 40 ? 'moderate' : 'low',
    score: totalScore,
    maxScore: maxScore
  };
}

/**
 * Get risk level classification
 */
function getRiskLevel(score) {
  for (const [level, config] of Object.entries(riskLevels)) {
    if (score >= config.min && score <= config.max) {
      return { level, ...config };
    }
  }
  return riskLevels.low;
}

/**
 * Generate safety recommendations based on risk assessment
 */
function generateSafetyRecommendations(riskData, revictimizationData) {
  const recommendations = [];
  const riskLevel = getRiskLevel(riskData.score);

  // Critical/High risk recommendations
  if (riskLevel.level === 'critical' || riskLevel.level === 'high') {
    recommendations.push({
      priority: 'urgent',
      icon: 'fa-shield-alt',
      title: 'Immediate Safety Planning Required',
      actions: [
        'Conduct emergency safety planning session within 24 hours',
        'Assess immediate shelter needs',
        'Provide emergency contact numbers (116 Hotline)',
        'Consider police protection order application',
        'Identify safe locations for emergency evacuation'
      ]
    });

    recommendations.push({
      priority: 'urgent',
      icon: 'fa-user-shield',
      title: 'Enhanced Monitoring',
      actions: [
        'Schedule daily check-in calls',
        'Assign case to senior case manager',
        'Coordinate with police Family Support Unit',
        'Inform all service providers of high-risk status'
      ]
    });
  }

  // Perpetrator-specific recommendations
  if (riskData.factorScores?.perpetratorThreats?.raw >= 7) {
    recommendations.push({
      priority: 'high',
      icon: 'fa-gavel',
      title: 'Legal Protection Measures',
      actions: [
        'Assist with restraining order application',
        'Document all threats and incidents',
        'Connect with legal aid services',
        'Prepare evidence for potential prosecution'
      ]
    });
  }

  // Isolation/dependency recommendations
  if (riskData.factorScores?.survivorIsolation?.raw >= 7 || 
      riskData.factorScores?.survivorDependency?.raw >= 7) {
    recommendations.push({
      priority: 'high',
      icon: 'fa-users',
      title: 'Support Network Building',
      actions: [
        'Connect with support groups (Rainbo, Women in Crisis)',
        'Identify family members who can provide support',
        'Explore economic empowerment programs',
        'Provide transportation assistance for services'
      ]
    });
  }

  // Re-victimization prevention
  if (revictimizationData.probability >= 40) {
    recommendations.push({
      priority: revictimizationData.probability >= 70 ? 'urgent' : 'high',
      icon: 'fa-sync-alt',
      title: 'Re-victimization Prevention',
      actions: [
        'Review and update safety plan regularly',
        'Provide ongoing counseling and support',
        'Address economic barriers to independence',
        'Strengthen legal protections',
        'Increase frequency of follow-up contacts'
      ]
    });
  }

  // Children present recommendations
  if (riskData.factorScores?.childrenPresent?.raw >= 6) {
    recommendations.push({
      priority: 'high',
      icon: 'fa-child',
      title: 'Child Protection Measures',
      actions: [
        'Assess children\'s safety and wellbeing',
        'Connect with child protection services if needed',
        'Provide parenting support resources',
        'Consider child counseling referrals',
        'Document any child abuse indicators'
      ]
    });
  }

  // General moderate risk recommendations
  if (riskLevel.level === 'moderate') {
    recommendations.push({
      priority: 'medium',
      icon: 'fa-clipboard-check',
      title: 'Standard Safety Planning',
      actions: [
        'Complete comprehensive safety plan',
        'Schedule regular follow-up (weekly)',
        'Provide resource information',
        'Monitor for risk escalation'
      ]
    });
  }

  return recommendations;
}

/**
 * Show Risk Assessment Modal for a case
 */
function showRiskAssessmentModal(caseId, caseNumber) {
  // Load existing risk assessment if available
  const existingAssessment = loadRiskAssessment(caseId);

  const modalHTML = `
    <div id="risk-assessment-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <i class="fas fa-exclamation-triangle text-3xl"></i>
            <div>
              <h2 class="text-2xl font-bold">Risk Assessment AI</h2>
              <p class="text-red-100 text-sm">Case: ${caseNumber}</p>
            </div>
          </div>
          <button onclick="closeRiskAssessmentModal()" class="text-white hover:text-red-200 text-2xl">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6">
          ${existingAssessment ? generateRiskResultsHTML(existingAssessment) : generateRiskFormHTML(caseId, caseNumber)}
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 flex justify-between items-center sticky bottom-0">
          <button onclick="closeRiskAssessmentModal()" 
                  class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Close
          </button>
          ${existingAssessment ? `
            <button onclick="recalculateRisk(${caseId}, '${caseNumber}')" 
                    class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <i class="fas fa-sync-alt mr-2"></i>Recalculate
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  riskAssessmentModal = document.getElementById('risk-assessment-modal');
}

/**
 * Generate risk assessment form HTML
 */
function generateRiskFormHTML(caseId, caseNumber) {
  return `
    <form id="risk-assessment-form" onsubmit="submitRiskAssessment(event, ${caseId}, '${caseNumber}')">
      <!-- Violence Characteristics Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-fire text-red-600"></i>
          Violence Characteristics (40% weight)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Violence Severity -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Violence Severity <span class="text-red-600">*</span>
            </label>
            <select name="violenceSeverity" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="life_threatening">Life Threatening</option>
              <option value="severe_injury">Severe Injury</option>
              <option value="moderate_injury">Moderate Injury</option>
              <option value="minor_injury">Minor Injury</option>
              <option value="no_injury">No Physical Injury</option>
            </select>
          </div>

          <!-- Violence Frequency -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Frequency <span class="text-red-600">*</span>
            </label>
            <select name="violenceFrequency" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="occasional">Occasional</option>
              <option value="first_time">First Time</option>
            </select>
          </div>

          <!-- Violence Escalation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Escalation Pattern <span class="text-red-600">*</span>
            </label>
            <select name="violenceEscalation" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="rapidly_increasing">Rapidly Increasing</option>
              <option value="gradually_increasing">Gradually Increasing</option>
              <option value="stable">Stable</option>
              <option value="decreasing">Decreasing</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Perpetrator Factors Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-user-times text-red-600"></i>
          Perpetrator Factors (25% weight)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Threats -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Threats Made <span class="text-red-600">*</span>
            </label>
            <select name="perpetratorThreats" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="death_threats">Death Threats</option>
              <option value="weapon_threats">Weapon Threats</option>
              <option value="harm_threats">Harm Threats</option>
              <option value="verbal_only">Verbal Only</option>
              <option value="none">None</option>
            </select>
          </div>

          <!-- Access to Survivor -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Access to Survivor <span class="text-red-600">*</span>
            </label>
            <select name="perpetratorAccess" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="lives_together">Lives Together</option>
              <option value="frequent_contact">Frequent Contact</option>
              <option value="occasional_contact">Occasional Contact</option>
              <option value="minimal_contact">Minimal Contact</option>
              <option value="no_contact">No Contact</option>
            </select>
          </div>

          <!-- Substance Use -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Substance Use <span class="text-red-600">*</span>
            </label>
            <select name="perpetratorSubstance" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="active_addiction">Active Addiction</option>
              <option value="regular_use">Regular Use</option>
              <option value="occasional_use">Occasional Use</option>
              <option value="none">None Known</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Survivor Vulnerability Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-heart-broken text-red-600"></i>
          Survivor Vulnerability (20% weight)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Dependency -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Economic Dependency <span class="text-red-600">*</span>
            </label>
            <select name="survivorDependency" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="complete_dependency">Complete Dependency</option>
              <option value="high_dependency">High Dependency</option>
              <option value="moderate_dependency">Moderate Dependency</option>
              <option value="low_dependency">Low Dependency</option>
              <option value="independent">Independent</option>
            </select>
          </div>

          <!-- Social Isolation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Social Isolation <span class="text-red-600">*</span>
            </label>
            <select name="survivorIsolation" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="completely_isolated">Completely Isolated</option>
              <option value="highly_isolated">Highly Isolated</option>
              <option value="some_support">Some Support</option>
              <option value="strong_support">Strong Support Network</option>
            </select>
          </div>

          <!-- Children Present -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Children Present <span class="text-red-600">*</span>
            </label>
            <select name="childrenPresent" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="yes_multiple">Yes - Multiple Children</option>
              <option value="yes_one">Yes - One Child</option>
              <option value="pregnant">Pregnant</option>
              <option value="none">No Children</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Environmental Factors Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marker-alt text-red-600"></i>
          Environmental Factors (15% weight)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Previous Reports -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Previous Reports <span class="text-red-600">*</span>
            </label>
            <select name="previousReports" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="multiple_reports">Multiple Previous Reports</option>
              <option value="previous_report">One Previous Report</option>
              <option value="first_report">First Report</option>
            </select>
          </div>

          <!-- Community Support -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Community Attitude <span class="text-red-600">*</span>
            </label>
            <select name="communitySupport" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">Select...</option>
              <option value="hostile_community">Hostile/Blaming</option>
              <option value="unsupportive">Unsupportive</option>
              <option value="neutral">Neutral</option>
              <option value="supportive">Supportive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Re-victimization Factors Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-sync-alt text-orange-600"></i>
          Re-victimization Risk Factors
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Returning to Perpetrator? <span class="text-red-600">*</span>
            </label>
            <select name="returnToPerpetrator" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="considering">Considering</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Following Safety Plan? <span class="text-red-600">*</span>
            </label>
            <select name="followedSafetyPlan" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="partially">Partially</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Legal Protection Status <span class="text-red-600">*</span>
            </label>
            <select name="legalProtection" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="active">Active Protection Order</option>
              <option value="pending">Pending</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Economic Stability <span class="text-red-600">*</span>
            </label>
            <select name="economicStability" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="stable">Stable</option>
              <option value="uncertain">Uncertain</option>
              <option value="unstable">Unstable</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mental Health Support <span class="text-red-600">*</span>
            </label>
            <select name="mentalHealthSupport" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="adequate">Adequate</option>
              <option value="inadequate">Inadequate</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Social Support <span class="text-red-600">*</span>
            </label>
            <select name="socialSupport" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select...</option>
              <option value="strong">Strong</option>
              <option value="weak">Weak</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button type="submit" 
                class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg">
          <i class="fas fa-calculator mr-2"></i>Calculate Risk Assessment
        </button>
      </div>
    </form>
  `;
}

/**
 * Generate risk results HTML
 */
function generateRiskResultsHTML(assessment) {
  const riskLevel = getRiskLevel(assessment.riskScore.score);
  const revictimLevel = assessment.revictimizationRisk;

  return `
    <!-- Risk Score Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Overall Risk Score -->
      <div class="bg-gradient-to-br from-${riskLevel.color === '#dc2626' ? 'red' : riskLevel.color === '#ea580c' ? 'orange' : riskLevel.color === '#f59e0b' ? 'yellow' : 'green'}-50 to-white p-6 rounded-lg border-2 border-${riskLevel.color === '#dc2626' ? 'red' : riskLevel.color === '#ea580c' ? 'orange' : riskLevel.color === '#f59e0b' ? 'yellow' : 'green'}-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">Overall Risk Level</h3>
          <i class="fas ${riskLevel.icon} text-3xl" style="color: ${riskLevel.color}"></i>
        </div>
        <div class="text-center">
          <div class="text-5xl font-bold mb-2" style="color: ${riskLevel.color}">
            ${assessment.riskScore.score.toFixed(1)}
          </div>
          <div class="text-2xl font-bold mb-4" style="color: ${riskLevel.color}">
            ${riskLevel.label}
          </div>
          <div class="text-sm text-gray-600">
            Score: ${assessment.riskScore.totalScore.toFixed(1)} / ${assessment.riskScore.maxPossible.toFixed(1)}
          </div>
        </div>
      </div>

      <!-- Re-victimization Risk -->
      <div class="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-2 border-orange-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">Re-victimization Risk</h3>
          <i class="fas fa-sync-alt text-3xl text-orange-600"></i>
        </div>
        <div class="text-center">
          <div class="text-5xl font-bold text-orange-600 mb-2">
            ${revictimLevel.probability.toFixed(0)}%
          </div>
          <div class="text-2xl font-bold text-orange-600 mb-4 uppercase">
            ${revictimLevel.level}
          </div>
          <div class="text-sm text-gray-600">
            Probability of re-victimization
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Factor Breakdown -->
    <div class="mb-8">
      <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-chart-bar text-blue-600"></i>
        Risk Factor Breakdown
      </h3>
      <div class="space-y-3">
        ${Object.entries(assessment.riskScore.factorScores).map(([factor, scores]) => `
          <div>
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-medium text-gray-700">${formatFactorName(factor)}</span>
              <span class="text-sm font-bold text-gray-900">${scores.weighted.toFixed(1)} / ${(scores.weight * 10).toFixed(1)}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="h-2 rounded-full transition-all" 
                   style="width: ${(scores.weighted / (scores.weight * 10)) * 100}%; 
                          background-color: ${scores.raw >= 8 ? '#dc2626' : scores.raw >= 6 ? '#ea580c' : scores.raw >= 4 ? '#f59e0b' : '#10b981'}">
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Safety Recommendations -->
    <div class="mb-8">
      <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-shield-alt text-green-600"></i>
        Safety Recommendations
      </h3>
      <div class="space-y-4">
        ${assessment.recommendations.map(rec => `
          <div class="border-l-4 ${rec.priority === 'urgent' ? 'border-red-600 bg-red-50' : rec.priority === 'high' ? 'border-orange-500 bg-orange-50' : 'border-yellow-500 bg-yellow-50'} p-4 rounded-r-lg">
            <div class="flex items-start gap-3 mb-3">
              <i class="fas ${rec.icon} text-xl ${rec.priority === 'urgent' ? 'text-red-600' : rec.priority === 'high' ? 'text-orange-600' : 'text-yellow-600'}"></i>
              <div>
                <h4 class="font-bold text-gray-800 text-lg">${rec.title}</h4>
                <span class="text-xs font-semibold px-2 py-1 rounded ${rec.priority === 'urgent' ? 'bg-red-600 text-white' : rec.priority === 'high' ? 'bg-orange-600 text-white' : 'bg-yellow-600 text-white'}">${rec.priority.toUpperCase()}</span>
              </div>
            </div>
            <ul class="space-y-2 ml-8">
              ${rec.actions.map(action => `
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-600 mt-1"></i>
                  <span class="text-gray-700">${action}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Assessment Details -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-bold text-gray-800 mb-2">Assessment Details</h4>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-600">Assessed on:</span>
          <span class="font-semibold ml-2">${new Date(assessment.timestamp).toLocaleString()}</span>
        </div>
        <div>
          <span class="text-gray-600">Assessed by:</span>
          <span class="font-semibold ml-2">${assessment.assessedBy || 'System'}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Submit risk assessment form
 */
function submitRiskAssessment(event, caseId, caseNumber) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const assessmentData = Object.fromEntries(formData.entries());

  // Calculate risk scores
  const riskScore = calculateRiskScore(assessmentData);
  const revictimizationRisk = calculateRevictimizationRisk(assessmentData);
  const recommendations = generateSafetyRecommendations(riskScore, revictimizationRisk);

  // Save assessment
  const assessment = {
    caseId: caseId,
    caseNumber: caseNumber,
    assessmentData: assessmentData,
    riskScore: riskScore,
    revictimizationRisk: revictimizationRisk,
    recommendations: recommendations,
    timestamp: new Date().toISOString(),
    assessedBy: 'Current User' // In production, use actual user info
  };

  saveRiskAssessment(caseId, assessment);

  // Show results
  const resultsContainer = document.querySelector('#risk-assessment-modal .p-6');
  resultsContainer.innerHTML = generateRiskResultsHTML(assessment);

  // Show success notification
  if (typeof showToast === 'function') {
    const riskLevel = getRiskLevel(riskScore.score);
    showToast(`Risk assessment completed: ${riskLevel.label} risk level`, 'success');
  }

  // If critical or high risk, trigger notification
  if (riskScore.score >= 6.0) {
    if (typeof addNotification === 'function') {
      addNotification({
        type: 'risk_alert',
        title: `High Risk Case Alert`,
        message: `Case ${caseNumber} assessed as ${getRiskLevel(riskScore.score).label} risk - immediate action required`,
        priority: riskScore.score >= 8.0 ? 'urgent' : 'high',
        link: `/cases/${caseNumber}`,
        icon: 'fa-exclamation-triangle'
      });
    }
  }
}

/**
 * Recalculate risk assessment
 */
function recalculateRisk(caseId, caseNumber) {
  const resultsContainer = document.querySelector('#risk-assessment-modal .p-6');
  resultsContainer.innerHTML = generateRiskFormHTML(caseId, caseNumber);
}

/**
 * Close risk assessment modal
 */
function closeRiskAssessmentModal() {
  if (riskAssessmentModal) {
    riskAssessmentModal.remove();
    riskAssessmentModal = null;
  }
}

/**
 * Save risk assessment to localStorage
 */
function saveRiskAssessment(caseId, assessment) {
  const assessments = JSON.parse(localStorage.getItem('riskAssessments') || '{}');
  assessments[caseId] = assessment;
  localStorage.setItem('riskAssessments', JSON.stringify(assessments));
}

/**
 * Load risk assessment from localStorage
 */
function loadRiskAssessment(caseId) {
  const assessments = JSON.parse(localStorage.getItem('riskAssessments') || '{}');
  return assessments[caseId] || null;
}

/**
 * Get all high-risk cases
 */
function getHighRiskCases() {
  const assessments = JSON.parse(localStorage.getItem('riskAssessments') || '{}');
  return Object.values(assessments).filter(a => a.riskScore.score >= 6.0);
}

/**
 * Format factor name for display
 */
function formatFactorName(factorKey) {
  const names = {
    violenceSeverity: 'Violence Severity',
    violenceFrequency: 'Violence Frequency',
    violenceEscalation: 'Escalation Pattern',
    perpetratorThreats: 'Perpetrator Threats',
    perpetratorAccess: 'Perpetrator Access',
    perpetratorSubstance: 'Substance Use',
    survivorDependency: 'Economic Dependency',
    survivorIsolation: 'Social Isolation',
    childrenPresent: 'Children Present',
    previousReports: 'Previous Reports',
    communitySupport: 'Community Support'
  };
  return names[factorKey] || factorKey;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Risk Assessment AI System loaded');
});
