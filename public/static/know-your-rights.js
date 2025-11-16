/**
 * Know Your Rights - Legal Information and Support
 * Multi-language legal information for GBV survivors
 */

function loadKnowYourRights(section) {
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
            <div class="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-balance-scale text-5xl mr-4 opacity-90"></i>
                    <div>
                        <h1 class="text-4xl font-bold mb-2">Know Your Rights</h1>
                        <p class="text-xl text-orange-50">Legal information to empower you</p>
                    </div>
                </div>
            </div>

            <!-- Your Basic Rights -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-shield-alt mr-2 text-green-600"></i>Your Basic Rights as a Survivor
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Safety</h4>
                        <p class="text-sm text-gray-700">You have the right to live free from violence and abuse.</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Report</h4>
                        <p class="text-sm text-gray-700">You can report violence to police at any time.</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Medical Care</h4>
                        <p class="text-sm text-gray-700">You have the right to free medical treatment at Rainbo Centres.</p>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Legal Help</h4>
                        <p class="text-sm text-gray-700">You can get free legal aid and support.</p>
                    </div>
                    <div class="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Protection</h4>
                        <p class="text-sm text-gray-700">You can request a protection order from court.</p>
                    </div>
                    <div class="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-600">
                        <h4 class="font-bold text-gray-800 mb-2">Right to Privacy</h4>
                        <p class="text-sm text-gray-700">Your case information is confidential.</p>
                    </div>
                </div>
            </div>

            <!-- Laws That Protect You -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-gavel mr-2 text-blue-600"></i>Laws That Protect You in Sierra Leone
                </h3>
                <div class="space-y-4">
                    <div class="border-l-4 border-red-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">Sexual Offences Act 2012</h4>
                        <p class="text-sm text-gray-600">Makes sexual violence a serious crime with prison sentences.</p>
                        <ul class="text-sm text-gray-600 mt-2 ml-4 list-disc">
                            <li>Rape: Up to 15 years to life imprisonment</li>
                            <li>Sexual assault: Up to 15 years imprisonment</li>
                            <li>Child sexual abuse: Life imprisonment</li>
                        </ul>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">Domestic Violence Act 2007</h4>
                        <p class="text-sm text-gray-600">Protects people from violence by partners or family members.</p>
                        <ul class="text-sm text-gray-600 mt-2 ml-4 list-disc">
                            <li>Physical abuse, emotional abuse, economic abuse all covered</li>
                            <li>Courts can issue protection orders</li>
                            <li>Police must take reports seriously</li>
                        </ul>
                    </div>
                    <div class="border-l-4 border-green-600 pl-4 py-2">
                        <h4 class="font-bold text-gray-800">Child Rights Act 2007</h4>
                        <p class="text-sm text-gray-600">Special protection for children under 18.</p>
                        <ul class="text-sm text-gray-600 mt-2 ml-4 list-disc">
                            <li>All forms of child abuse are illegal</li>
                            <li>No marriage before age 18</li>
                            <li>Special courts for child cases</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- How to Get a Protection Order -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-file-alt mr-2 text-purple-600"></i>How to Get a Protection Order
                </h3>
                <p class="text-gray-600 mb-4">A protection order is a court order that keeps the abuser away from you.</p>
                <div class="space-y-3">
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">1</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Go to Family Support Unit (FSU)</div>
                            <div class="text-sm text-gray-600">Visit the nearest police FSU and tell them you need protection</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">2</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Fill Out Application Form</div>
                            <div class="text-sm text-gray-600">FSU will help you fill out the form. It's free.</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">3</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Court Hearing</div>
                            <div class="text-sm text-gray-600">You'll go to court. A lawyer can help you for free.</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span class="font-bold">4</span>
                        </div>
                        <div>
                            <div class="font-bold text-gray-800">Get Your Order</div>
                            <div class="text-sm text-gray-600">If granted, the order says the abuser must stay away from you</div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <p class="text-sm text-yellow-800">
                        <i class="fas fa-info-circle mr-2"></i><strong>Important:</strong> 
                        If the abuser breaks the protection order, call police immediately. It's a crime.
                    </p>
                </div>
            </div>

            <!-- The Court Process -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-landmark mr-2 text-blue-600"></i>What Happens in Court?
                </h3>
                <p class="text-gray-600 mb-4">Understanding the court process can make it less scary.</p>
                <div class="space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Before Court</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li><i class="fas fa-check mr-2 text-green-600"></i>You'll meet with a lawyer or paralegal</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>They'll explain what will happen</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>You can practice what to say</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>Bring a support person if you want</li>
                        </ul>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">During Court</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li><i class="fas fa-check mr-2 text-green-600"></i>You'll tell the judge what happened</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>Speak clearly and truthfully</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>Your lawyer will be with you</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>The judge may ask you questions</li>
                        </ul>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">After Court</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li><i class="fas fa-check mr-2 text-green-600"></i>The judge will make a decision</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>You'll get a copy of the order</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>Keep it with you always</li>
                            <li><i class="fas fa-check mr-2 text-green-600"></i>Give a copy to police</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Free Legal Services -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-user-tie mr-2 text-green-600"></i>Where to Get Free Legal Help
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Court User Committee</h4>
                        <p class="text-sm text-gray-600 mb-2">Free legal aid for GBV survivors</p>
                        <p class="text-sm"><strong>Phone:</strong> 076 200 200</p>
                    </div>
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Legal Aid Board</h4>
                        <p class="text-sm text-gray-600 mb-2">Government legal assistance</p>
                        <p class="text-sm"><strong>Phone:</strong> 076 250 250</p>
                    </div>
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">AdvocAid</h4>
                        <p class="text-sm text-gray-600 mb-2">Legal support for women</p>
                        <p class="text-sm"><strong>Phone:</strong> 076 300 300</p>
                    </div>
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-800 mb-2">Rainbo Legal Team</h4>
                        <p class="text-sm text-gray-600 mb-2">Legal aid at Rainbo Centres</p>
                        <p class="text-sm"><strong>Phone:</strong> 076 777 777</p>
                    </div>
                </div>
            </div>

            <!-- FAQs -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-question-circle mr-2 text-orange-600"></i>Common Questions
                </h3>
                <div class="space-y-4">
                    <details class="border-b pb-4">
                        <summary class="font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                            Do I have to report to police?
                        </summary>
                        <p class="text-sm text-gray-600 mt-2">
                            No, reporting is your choice. However, reporting helps you get protection and justice. 
                            Police Family Support Units are specially trained to help GBV survivors.
                        </p>
                    </details>
                    <details class="border-b pb-4">
                        <summary class="font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                            Will I have to pay for court?
                        </summary>
                        <p class="text-sm text-gray-600 mt-2">
                            No. GBV cases are free. You don't pay court fees, and you can get a free lawyer through 
                            Legal Aid Board or Court User Committee.
                        </p>
                    </details>
                    <details class="border-b pb-4">
                        <summary class="font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                            What if I'm married to the abuser?
                        </summary>
                        <p class="text-sm text-gray-600 mt-2">
                            Being married doesn't give anyone the right to hurt you. You can still report abuse and 
                            get protection orders against your spouse.
                        </p>
                    </details>
                    <details class="border-b pb-4">
                        <summary class="font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                            How long does a court case take?
                        </summary>
                        <p class="text-sm text-gray-600 mt-2">
                            It varies, but Fast Track Courts for sexual offences aim to complete cases within 6 months. 
                            Emergency protection orders can be issued within days.
                        </p>
                    </details>
                    <details class="border-b pb-4">
                        <summary class="font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                            What if I'm afraid of the abuser?
                        </summary>
                        <p class="text-sm text-gray-600 mt-2">
                            Tell police about your fears. They can provide protection. The court can also order the 
                            abuser to stay away from you during the case.
                        </p>
                    </details>
                </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 class="text-lg font-bold text-red-800 mb-2">
                    <i class="fas fa-phone-volume mr-2"></i>Need Help Now?
                </h3>
                <p class="text-red-700 mb-4">If you're in danger or need urgent legal advice:</p>
                <div class="flex gap-4">
                    <a href="tel:116" class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-center font-bold">
                        <i class="fas fa-phone-alt mr-2"></i>Call 116 Hotline
                    </a>
                    <a href="tel:999" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-center font-bold">
                        <i class="fas fa-shield-alt mr-2"></i>Call 999 Police
                    </a>
                </div>
            </div>
        </div>
    `;
}

window.loadKnowYourRights = loadKnowYourRights;
