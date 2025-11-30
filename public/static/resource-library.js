/**
 * GBV Dashboard - Resource Library
 * Comprehensive library based on Sierra Leone Spotlight Initiative 4 Pillars
 * - Laws, Policies & Institutions
 * - Prevention & Education
 * - Response Services
 * - Women's Movements & Advocacy
 */

// Sample resource data (will be replaced with API calls when database is ready)
const sampleResources = {
  laws: [
    {
      id: 1,
      title: 'Sexual Offences Act 2012',
      description: 'The Sexual Offences Act 2012 criminalizes sexual offenses including rape, sexual assault, and child sexual abuse.',
      content_type: 'document',
      category: 'Laws & Legislation',
      is_featured: true,
      tags: ['law', 'sexual offences', 'rape', 'child protection'],
      content: `KEY PROVISIONS:

Part I: Preliminary
- Defines sexual assault, rape, sexual penetration, child sexual abuse
- Age of consent: 18 years

Part II: Sexual Offenses
Section 4 - Rape: Any person who commits rape is liable on conviction to life imprisonment
Section 5 - Sexual Penetration: Liable to imprisonment for a minimum of 5 years and maximum of 15 years
Section 6 - Sexual Assault: Minimum of 3 years, maximum of 10 years
Section 19 - Child Sexual Abuse: Life imprisonment

Part III: Protection of Survivors
- Right to legal representation
- Right to privacy and protection from intimidation
- Right to medical examination and treatment
- Right to psychosocial support

Part IV: Special Court for Sexual Offences
- Fast-track adjudication of sexual offence cases
- Survivor-sensitive procedures
- In-camera hearings for survivor protection`
    },
    {
      id: 2,
      title: 'Domestic Violence Act 2007',
      description: 'Provides legal protection against domestic violence, including physical, sexual, psychological, and economic abuse.',
      content_type: 'document',
      category: 'Laws & Legislation',
      is_featured: true,
      tags: ['law', 'domestic violence', 'protection orders'],
      content: `KEY PROVISIONS:

Section 3 - Definition of Domestic Violence:
- Physical abuse: assault, battery, harm
- Sexual abuse: forced sexual acts
- Psychological abuse: threats, intimidation, harassment
- Economic abuse: control of finances, denial of resources

Section 4 - Protection Orders:
- Occupation Orders (remove abuser from home)
- Tenancy Orders (transfer tenancy rights)
- Protection Orders (prohibit contact/harassment)

Section 5 - Powers of Police:
- Arrest without warrant
- Immediate protection of survivors
- Referral to support services

Section 7 - Offences and Penalties:
- Violation of protection order: up to 2 years imprisonment
- Domestic violence offences: fines and imprisonment`
    },
    {
      id: 3,
      title: 'Child Rights Act 2007',
      description: 'Comprehensive legislation protecting children from abuse, neglect, and exploitation. Minimum age for marriage: 18.',
      content_type: 'document',
      category: 'Laws & Legislation',
      is_featured: true,
      tags: ['law', 'child rights', 'child protection', 'child marriage', 'FGM'],
      content: `KEY PROVISIONS:

Part III - Protection from Abuse and Neglect
Section 26 - Physical and sexual abuse
Section 27 - Child marriage prohibited (minimum age 18)
Section 28 - FGM/C prohibited
Section 29 - Child trafficking prohibited

Part IV - Child Justice System
Section 65 - Child-friendly court procedures
Section 66 - Best interests of the child principle
Section 67 - Rehabilitation over punishment

Part V - Responsibilities
- Parental responsibilities and rights
- State responsibility to protect children
- Community duty to report abuse`
    }
  ],
  education: [
    {
      id: 101,
      title: 'Your Rights as a GBV Survivor',
      description: 'Know your rights: Every survivor has the right to safety, dignity, confidentiality, and justice.',
      content_type: 'interactive',
      category: 'Educational Content',
      is_featured: true,
      tags: ['survivor rights', 'education', 'empowerment'],
      content: `SURVIVOR RIGHTS:

1. RIGHT TO SAFETY
- Protection from further violence
- Safe accommodation if needed
- Police protection and escort services
- Emergency response (Call 116 - National GBV Hotline)

2. RIGHT TO MEDICAL CARE
- Free emergency medical treatment at Rainbo Centers
- Post-exposure prophylaxis (PEP) within 72 hours
- Emergency contraception
- Treatment for injuries
- HIV testing and counseling
- Documentation of injuries for legal proceedings

3. RIGHT TO CONFIDENTIALITY
- Your information is protected
- Services are provided in private settings
- Your identity is protected in court (can testify behind screen)
- Medical records are confidential

4. RIGHT TO JUSTICE
- Free legal representation
- Right to report to police
- Fast-track court procedures (Sexual Offences Court)
- Right to be heard in court
- Protection from intimidation
- Right to compensation

5. RIGHT TO PSYCHOSOCIAL SUPPORT
- Counseling services
- Support groups
- Crisis intervention
- Mental health services
- Long-term support

6. RIGHT TO INFORMATION
- Right to understand the legal process
- Right to know your options
- Right to ask questions
- Right to updates on your case

REMEMBER: You did nothing wrong. Help is available. You are not alone.`
    },
    {
      id: 102,
      title: 'Understanding GBV: Types and Forms',
      description: 'Learn about different types of gender-based violence including physical, sexual, psychological, and economic abuse.',
      content_type: 'interactive',
      category: 'Educational Content',
      is_featured: true,
      tags: ['GBV', 'education', 'prevention', 'awareness'],
      content: `TYPES OF GENDER-BASED VIOLENCE:

1. PHYSICAL VIOLENCE
- Hitting, slapping, punching, kicking
- Burning, scalding
- Use of weapons
- Physical restraint
- Any act causing physical harm

2. SEXUAL VIOLENCE
- Rape and sexual assault
- Forced sexual acts
- Sexual harassment
- Female Genital Mutilation (FGM/C)
- Child sexual abuse
- Sex trafficking

3. PSYCHOLOGICAL/EMOTIONAL ABUSE
- Threats and intimidation
- Verbal abuse and humiliation
- Isolation from friends and family
- Stalking and harassment
- Controlling behavior
- Constant criticism

4. ECONOMIC ABUSE
- Controlling finances
- Preventing access to money
- Preventing employment or education
- Stealing money or property
- Forcing financial dependency

WARNING SIGNS:
- Extreme jealousy or possessiveness
- Controlling behavior
- Isolation from support networks
- Unpredictable mood swings
- Blaming others for their actions
- History of violence
- Threats of violence
- Use of force during arguments

IF YOU OR SOMEONE YOU KNOW NEEDS HELP:
📞 Call 116 - National GBV Hotline (24/7)
🏥 Visit nearest Rainbo Center
👮 Report to Police FSU
🤝 Seek support from trusted friends/family`
    },
    {
      id: 103,
      title: 'Bystander Intervention: How to Safely Help',
      description: 'Learn safe and effective ways to intervene when you witness GBV or support someone experiencing violence.',
      content_type: 'interactive',
      category: 'Educational Content',
      is_featured: true,
      tags: ['bystander intervention', 'prevention', 'community'],
      content: `THE 5 Ds OF BYSTANDER INTERVENTION:

1. DIRECT
- Directly address the situation if it's safe
- "That's not okay" or "Stop"
- Speak up against harmful comments or jokes
- Only if you feel safe and confident

2. DISTRACT
- Create a distraction to interrupt the situation
- Ask for directions or the time
- Spill something accidentally
- Start a conversation about something else
- Give the person an "out"

3. DELEGATE
- Get help from others
- Call security, police, or authorities
- Ask a friend or bystander to help
- Inform someone in authority
- Use the buddy system

4. DELAY
- Check in with the person after the incident
- Ask if they're okay
- Offer support and resources
- Listen without judgment
- Respect their decisions

5. DOCUMENT
- Record evidence if it's safe to do so
- Take photos or videos
- Write down what you witnessed
- Save messages or screenshots
- Share with authorities if appropriate

SAFETY FIRST:
✓ Assess the situation before acting
✓ Your safety and the survivor's safety come first
✓ Don't put yourself at risk
✓ There's always something you can do
✓ Any action is better than doing nothing

SUPPORTING A SURVIVOR:
- Believe them
- Listen without judgment
- Respect their autonomy and choices
- Provide information about services
- Don't pressure them to take action
- Maintain confidentiality
- Follow up if they want support

TAKING CARE OF YOURSELF:
Witnessing or responding to GBV can be traumatic:
- Seek support for yourself
- Practice self-care
- Connect with others
- Know your limits
- It's okay to say no if you don't feel safe`
    }
  ],
  training: [
    {
      id: 201,
      title: 'Case Management Best Practices',
      description: 'Comprehensive training for service providers on survivor-centered case management.',
      content_type: 'document',
      category: 'Training Materials',
      is_featured: true,
      tags: ['case management', 'training', 'service providers'],
      content: `SURVIVOR-CENTERED CASE MANAGEMENT:

CORE PRINCIPLES:
1. Safety First
2. Confidentiality
3. Respect and Dignity
4. Survivor Autonomy
5. Non-Discrimination

INITIAL CONTACT:
✓ Ensure privacy
✓ Introduce yourself and explain your role
✓ Explain confidentiality and its limits
✓ Listen actively and non-judgmentally
✓ Believe the survivor
✓ Let them tell their story at their own pace

SAFETY ASSESSMENT:
- Is the survivor in immediate danger?
- Where is the perpetrator now?
- Are there children involved?
- Does survivor have a safe place to go?
- What are the immediate safety concerns?

SERVICE COORDINATION:
1. Medical Services
   - Emergency medical care
   - PEP within 72 hours
   - Documentation of injuries
   - HIV testing and counseling

2. Legal Services
   - Legal information and options
   - Assistance with protection orders
   - Support through legal process
   - Referral to legal aid

3. Psychosocial Support
   - Crisis counseling
   - Ongoing mental health support
   - Support groups
   - Follow-up care

4. Safety Planning
   - Identify safe people and places
   - Emergency contacts
   - Safety at home, work, school
   - Document evidence safely

DOCUMENTATION:
- Use standard forms
- Be accurate and detailed
- Maintain confidentiality
- Store securely
- Document for legal proceedings if needed

FOLLOW-UP:
- Schedule follow-up appointments
- Check referral outcomes
- Monitor safety
- Provide ongoing support
- Respect survivor's pace

SELF-CARE FOR PROVIDERS:
- Recognize secondary trauma
- Set boundaries
- Seek peer support
- Regular supervision
- Maintain work-life balance
- Practice self-care activities`
    }
  ],
  procedures: [
    {
      id: 301,
      title: 'GBV Referral Pathways',
      description: 'Standard procedures for referring GBV survivors to appropriate services.',
      content_type: 'document',
      category: 'Procedures & Protocols',
      is_featured: true,
      tags: ['referrals', 'procedures', 'coordination'],
      content: `GBV REFERRAL PATHWAYS:

MEDICAL SERVICES:
Primary Contact: Rainbo Centers
Phone: [Specific center numbers]
Services:
- Emergency medical care
- Post-exposure prophylaxis (PEP)
- Emergency contraception
- STI treatment
- Documentation of injuries
- Counseling and psychosocial support
Operating Hours: 24/7 emergency services

POLICE & LEGAL:
Primary Contact: Police Family Support Units (FSU)
Services:
- Case reporting
- Investigation
- Evidence collection
- Protection
- Referral to legal aid
When to Refer: Immediately if survivor wants to report

PSYCHOSOCIAL SUPPORT:
Services:
- Individual counseling
- Group therapy
- Crisis intervention
- Long-term mental health support
When to Refer: All survivors should be offered

SAFE ACCOMMODATION:
Services:
- Emergency shelter
- Safe houses
- Temporary accommodation
When to Refer: If survivor is in immediate danger

LEGAL AID:
Services:
- Legal information
- Court representation
- Assistance with protection orders
When to Refer: If survivor wants legal action

REFERRAL PROCEDURE:
1. Obtain survivor's consent
2. Explain available services
3. Complete referral form
4. Contact receiving organization
5. Follow up on referral outcome
6. Document in case file

WARM REFERRALS:
- Contact service provider first
- Introduce survivor
- Ensure appointment is scheduled
- Provide survivor with contact info
- Follow up to confirm attendance`
    }
  ]
};

// Initialize the resource library page
function initResourceLibrary() {
  loadCategories();
  loadFeaturedResources();
  setupEventListeners();
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('resource-search');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase();
  if (query.length < 2) {
    loadFeaturedResources();
    return;
  }

  const allResources = [
    ...sampleResources.laws,
    ...sampleResources.education,
    ...sampleResources.training,
    ...sampleResources.procedures
  ];

  const filtered = allResources.filter(resource =>
    resource.title.toLowerCase().includes(query) ||
    resource.description.toLowerCase().includes(query) ||
    resource.tags.some(tag => tag.includes(query))
  );

  displayResources(filtered);
}

function loadCategories() {
  const categories = [
    { id: 1, name: 'Laws & Legislation', icon: 'fa-gavel', count: sampleResources.laws.length, color: 'blue' },
    { id: 2, name: 'Educational Content', icon: 'fa-book-open', count: sampleResources.education.length, color: 'green' },
    { id: 3, name: 'Training Materials', icon: 'fa-graduation-cap', count: sampleResources.training.length, color: 'purple' },
    { id: 4, name: 'Procedures & Protocols', icon: 'fa-list-check', count: sampleResources.procedures.length, color: 'orange' }
  ];

  const container = document.getElementById('category-cards');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="filterByCategory('${cat.name}')">
      <div class="flex items-center justify-between mb-4">
        <i class="fas ${cat.icon} text-3xl text-${cat.color}-600"></i>
        <span class="text-2xl font-bold text-gray-700">${cat.count}</span>
      </div>
      <h3 class="text-lg font-semibold text-gray-800">${cat.name}</h3>
      <p class="text-sm text-gray-600 mt-2">Click to view resources</p>
    </div>
  `).join('');
}

function loadFeaturedResources() {
  const featured = [
    ...sampleResources.laws.filter(r => r.is_featured),
    ...sampleResources.education.filter(r => r.is_featured),
    ...sampleResources.training.filter(r => r.is_featured),
    ...sampleResources.procedures.filter(r => r.is_featured)
  ];

  displayResources(featured);
}

function filterByCategory(categoryName) {
  let resources = [];
  switch(categoryName) {
    case 'Laws & Legislation':
      resources = sampleResources.laws;
      break;
    case 'Educational Content':
      resources = sampleResources.education;
      break;
    case 'Training Materials':
      resources = sampleResources.training;
      break;
    case 'Procedures & Protocols':
      resources = sampleResources.procedures;
      break;
  }

  displayResources(resources);

  // Update breadcrumb
  const breadcrumb = document.getElementById('resource-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <span class="text-blue-600 cursor-pointer" onclick="loadFeaturedResources()">All Resources</span>
      <span class="mx-2">/</span>
      <span class="text-gray-700">${categoryName}</span>
    `;
  }
}

function displayResources(resources) {
  const container = document.getElementById('resources-list');
  if (!container) return;

  if (resources.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i class="fas fa-search text-gray-400 text-5xl mb-4"></i>
        <p class="text-gray-600 text-lg">No resources found matching your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = resources.map(resource => `
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div class="p-6">
        <div class="flex items-start justify-between mb-3">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <i class="fas fa-${getIconForType(resource.content_type)} mr-1"></i>
            ${resource.category}
          </span>
          ${resource.is_featured ? '<i class="fas fa-star text-yellow-500"></i>' : ''}
        </div>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2">${resource.title}</h3>
        <p class="text-gray-600 text-sm mb-4">${resource.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${resource.tags.map(tag => `
            <span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              #${tag}
            </span>
          `).join('')}
        </div>
        
        <div class="flex items-center justify-between">
          <button onclick="viewResource(${resource.id})" class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
            <i class="fas fa-eye mr-2"></i>
            View Full Content
          </button>
          <button onclick="downloadResource(${resource.id})" class="text-gray-600 hover:text-gray-800 text-sm">
            <i class="fas fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getIconForType(type) {
  const icons = {
    'document': 'file-alt',
    'video': 'video',
    'audio': 'headphones',
    'interactive': 'laptop-code',
    'link': 'link',
    'infographic': 'image'
  };
  return icons[type] || 'file';
}

function viewResource(resourceId) {
  // Find the resource
  const allResources = [
    ...sampleResources.laws,
    ...sampleResources.education,
    ...sampleResources.training,
    ...sampleResources.procedures
  ];

  const resource = allResources.find(r => r.id === resourceId);
  if (!resource) return;

  showResourceModal(resource);
}

function showResourceModal(resource) {
  const modalHTML = `
    <div id="resource-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="closeResourceModal(event)">
      <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 mb-3">
                <i class="fas fa-${getIconForType(resource.content_type)} mr-1"></i>
                ${resource.category}
              </span>
              <h2 class="text-2xl font-bold">${resource.title}</h2>
              <p class="text-blue-100 mt-2">${resource.description}</p>
            </div>
            <button onclick="closeResourceModal()" class="text-white hover:text-gray-200 ml-4">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="prose max-w-none">
            <pre class="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">${resource.content}</pre>
          </div>

          <!-- Tags -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Tags:</h4>
            <div class="flex flex-wrap gap-2">
              ${resource.tags.map(tag => `
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  #${tag}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div class="flex gap-2">
            <button onclick="downloadResource(${resource.id})" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
              <i class="fas fa-download"></i>
              Download
            </button>
            <button onclick="printResource(${resource.id})" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center gap-2">
              <i class="fas fa-print"></i>
              Print
            </button>
          </div>
          <button onclick="closeResourceModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeResourceModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('resource-modal');
  if (modal) modal.remove();
}

function downloadResource(resourceId) {
  // Find the resource
  const allResources = [
    ...sampleResources.laws,
    ...sampleResources.education,
    ...sampleResources.training,
    ...sampleResources.procedures
  ];

  const resource = allResources.find(r => r.id === resourceId);
  if (!resource) return;

  // Create a downloadable text file
  const content = `${resource.title}\n${'='.repeat(resource.title.length)}\n\n${resource.description}\n\n${resource.content}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printResource(resourceId) {
  // Find the resource
  const allResources = [
    ...sampleResources.laws,
    ...sampleResources.education,
    ...sampleResources.training,
    ...sampleResources.procedures
  ];

  const resource = allResources.find(r => r.id === resourceId);
  if (!resource) return;

  // Create a print-friendly version
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(`
    <html>
      <head>
        <title>${resource.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          .description { font-style: italic; color: #666; margin: 20px 0; }
          .content { white-space: pre-wrap; }
          .tags { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
          .tag { background: #e5e7eb; padding: 4px 8px; border-radius: 4px; margin-right: 8px; }
        </style>
      </head>
      <body>
        <h1>${resource.title}</h1>
        <div class="description">${resource.description}</div>
        <div class="content">${resource.content}</div>
        <div class="tags">
          <strong>Tags:</strong> 
          ${resource.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Export functions to window
window.initResourceLibrary = initResourceLibrary;
window.viewResource = viewResource;
window.closeResourceModal = closeResourceModal;
window.downloadResource = downloadResource;
window.printResource = printResource;
window.filterByCategory = filterByCategory;
window.loadFeaturedResources = loadFeaturedResources;

// Auto-initialize when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResourceLibrary);
} else {
  initResourceLibrary();
}
