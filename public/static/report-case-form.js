/**
 * Incident Report Form for GBV Cases
 * Comprehensive form for reporting new GBV incidents
 */

function loadReportCaseForm(section, source = 'ministry') {
    section.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <!-- Form Header -->
            <div class="border-b pb-4 mb-6" style="border-bottom-color: #1e3a8a;">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        ${source === 'survivor' ? `
                        <button onclick="goBackToSurvivorPortal()" 
                            class="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300">
                            <i class="fas fa-arrow-left mr-2"></i>Back to Portal
                        </button>
                        ` : ''}
                        <h2 class="text-2xl font-bold" style="color: #1e3a8a;">
                            <i class="fas fa-file-medical mr-2"></i>GBV Incident Report Form
                        </h2>
                        <p class="text-sm text-gray-600 mt-1">Complete all required fields to report a new GBV case</p>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-gray-500">Form ID</div>
                        <div class="text-sm font-semibold" style="color: #1e3a8a;" id="form-reference">GBV-SL-${Date.now()}</div>
                    </div>
                </div>
            </div>

            <!-- Form Content -->
            <form id="gbv-report-form" class="space-y-8">
                
                <!-- Section 1: Incident Information -->
                <div class="border-l-4 pl-4" style="border-left-color: #32cd32;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-info-circle mr-2"></i>Section 1: Incident Information
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Date of Incident <span class="text-red-500">*</span>
                            </label>
                            <input type="date" name="incident_date" required
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
                                   style="focus:ring-color: #1e3a8a;"
                                   max="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Time of Incident
                            </label>
                            <input type="time" name="incident_time"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                District <span class="text-red-500">*</span>
                            </label>
                            <select name="district_id" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                    onchange="loadChiefdoms(this.value)">
                                <option value="">Select District</option>
                                <option value="1">Western Area Urban</option>
                                <option value="2">Western Area Rural</option>
                                <option value="3">Bo</option>
                                <option value="4">Bonthe</option>
                                <option value="5">Moyamba</option>
                                <option value="6">Pujehun</option>
                                <option value="7">Kenema</option>
                                <option value="8">Kailahun</option>
                                <option value="9">Kono</option>
                                <option value="10">Bombali</option>
                                <option value="11">Kambia</option>
                                <option value="12">Koinadugu</option>
                                <option value="13">Port Loko</option>
                                <option value="14">Tonkolili</option>
                                <option value="15">Karene</option>
                                <option value="16">Falaba</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Chiefdom/Ward <span class="text-red-500">*</span>
                            </label>
                            <select name="chiefdom" required id="chiefdom-select"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select District First</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Location Details (Village/Street/Landmark)
                            </label>
                            <input type="text" name="location_details"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Enter specific location details">
                        </div>
                    </div>
                </div>

                <!-- Section 2: Type of Violence -->
                <div class="border-l-4 pl-4" style="border-left-color: #ffd700;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Section 2: Type of Violence
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                GBV Type <span class="text-red-500">*</span>
                            </label>
                            <select name="gbv_type_id" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                    onchange="updateGBVSubTypes(this.value)">
                                <option value="">Select Type</option>
                                <option value="1">Sexual Assault/Rape</option>
                                <option value="2">Attempted Rape</option>
                                <option value="3">Sexual Harassment</option>
                                <option value="4">Physical Assault</option>
                                <option value="5">Domestic Violence</option>
                                <option value="6">Early/Forced Marriage</option>
                                <option value="7">Female Genital Mutilation (FGM)</option>
                                <option value="8">Psychological/Emotional Abuse</option>
                                <option value="9">Economic Abuse</option>
                                <option value="10">Trafficking</option>
                                <option value="11">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Sub-Type/Specific Details
                            </label>
                            <select name="gbv_subtype" id="gbv-subtype"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select GBV Type First</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description of Incident <span class="text-red-500">*</span>
                            </label>
                            <textarea name="incident_description" required rows="4"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                      placeholder="Provide a detailed description of what happened (who, what, when, where, how)"></textarea>
                            <p class="text-xs text-gray-500 mt-1">Be as specific as possible while maintaining sensitivity</p>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Survivor Information -->
                <div class="border-l-4 pl-4" style="border-left-color: #1e3a8a;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-user-shield mr-2"></i>Section 3: Survivor Information
                    </h3>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                        <p class="text-sm text-yellow-800">
                            <i class="fas fa-lock mr-2"></i>
                            <strong>Confidentiality Notice:</strong> All survivor information is protected and will only be accessible to authorized personnel.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Survivor's Name (Optional for Anonymous Reports)
                            </label>
                            <input type="text" name="survivor_name"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Full name">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Age <span class="text-red-500">*</span>
                            </label>
                            <input type="number" name="survivor_age" required min="0" max="120"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Age in years" onchange="updateAgeGroup(this.value)">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Age Group <span class="text-red-500">*</span>
                            </label>
                            <select name="survivor_age_group" required id="age-group-select"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Auto-populated from age</option>
                                <option value="0-10">0-10 years (Child)</option>
                                <option value="11-15">11-15 years (Adolescent)</option>
                                <option value="16-17">16-17 years (Teen)</option>
                                <option value="18-25">18-25 years (Young Adult)</option>
                                <option value="26-35">26-35 years (Adult)</option>
                                <option value="36+">36+ years (Adult)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Gender <span class="text-red-500">*</span>
                            </label>
                            <select name="survivor_gender" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Contact Phone Number
                            </label>
                            <input type="tel" name="survivor_phone"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="+232 XX XXX XXXX">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Alternative Contact
                            </label>
                            <input type="tel" name="survivor_alt_contact"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Family member/trusted person">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Disability/Special Needs
                            </label>
                            <select name="survivor_disability"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="None">None</option>
                                <option value="Physical">Physical Disability</option>
                                <option value="Visual">Visual Impairment</option>
                                <option value="Hearing">Hearing Impairment</option>
                                <option value="Cognitive">Cognitive/Learning</option>
                                <option value="Mental Health">Mental Health Condition</option>
                                <option value="Pregnant">Pregnant</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Education Level
                            </label>
                            <select name="survivor_education"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select Level</option>
                                <option value="None">No Formal Education</option>
                                <option value="Primary">Primary</option>
                                <option value="Junior Secondary">Junior Secondary</option>
                                <option value="Senior Secondary">Senior Secondary</option>
                                <option value="Tertiary">Tertiary/University</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Section 4: Perpetrator Information -->
                <div class="border-l-4 pl-4" style="border-left-color: #ef4444;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-user-times mr-2"></i>Section 4: Perpetrator Information
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Perpetrator Name (if known)
                            </label>
                            <input type="text" name="perpetrator_name"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Full name if known">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Relationship to Survivor <span class="text-red-500">*</span>
                            </label>
                            <select name="perpetrator_relationship" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select Relationship</option>
                                <option value="Intimate Partner/Spouse">Intimate Partner/Spouse</option>
                                <option value="Ex-Partner">Ex-Partner</option>
                                <option value="Father">Father</option>
                                <option value="Step-Father">Step-Father</option>
                                <option value="Uncle">Uncle</option>
                                <option value="Brother">Brother</option>
                                <option value="Other Family Member">Other Family Member</option>
                                <option value="Friend">Friend</option>
                                <option value="Neighbor">Neighbor</option>
                                <option value="Teacher/Authority Figure">Teacher/Authority Figure</option>
                                <option value="Employer">Employer</option>
                                <option value="Stranger">Stranger</option>
                                <option value="Unknown">Unknown</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Approximate Age
                            </label>
                            <input type="number" name="perpetrator_age" min="0" max="120"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="Age if known">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Multiple Perpetrators?
                            </label>
                            <select name="multiple_perpetrators"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                    onchange="toggleMultiplePerps(this.value)">
                                <option value="No">No - Single Perpetrator</option>
                                <option value="Yes">Yes - Multiple Perpetrators</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2" id="multiple-perps-details" style="display: none;">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Number of Perpetrators & Details
                            </label>
                            <textarea name="multiple_perps_details" rows="2"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                      placeholder="Describe the other perpetrators"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Section 5: Reporting Information -->
                <div class="border-l-4 pl-4" style="border-left-color: #32cd32;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-clipboard-list mr-2"></i>Section 5: Reporting Information
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Date Reported <span class="text-red-500">*</span>
                            </label>
                            <input type="date" name="reported_date" required
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reported By <span class="text-red-500">*</span>
                            </label>
                            <select name="reported_by" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select Reporter</option>
                                <option value="Survivor">Survivor (Self-Report)</option>
                                <option value="Family Member">Family Member</option>
                                <option value="Community Member">Community Member</option>
                                <option value="Health Worker">Health Worker</option>
                                <option value="Social Worker">Social Worker</option>
                                <option value="Police Officer">Police Officer</option>
                                <option value="Teacher">Teacher</option>
                                <option value="NGO Worker">NGO Worker</option>
                                <option value="Anonymous">Anonymous</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reporter Contact (if not survivor)
                            </label>
                            <input type="tel" name="reporter_contact"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                   placeholder="+232 XX XXX XXXX">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reporting Channel <span class="text-red-500">*</span>
                            </label>
                            <select name="reporting_channel" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="">Select Channel</option>
                                <option value="Direct">Direct (In-Person)</option>
                                <option value="Phone">Phone Call</option>
                                <option value="116 Hotline">116 Hotline</option>
                                <option value="SMS">SMS/Text Message</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Online Form">Online Form</option>
                                <option value="Police Station">Police Station</option>
                                <option value="Health Facility">Health Facility</option>
                                <option value="Community Leader">Community Leader</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Section 6: Medical & Services -->
                <div class="border-l-4 pl-4" style="border-left-color: #1e90ff;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-heartbeat mr-2"></i>Section 6: Medical & Services Required
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Medical Attention Required? <span class="text-red-500">*</span>
                            </label>
                            <select name="medical_required" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                    onchange="toggleMedicalDetails(this.value)">
                                <option value="">Select Option</option>
                                <option value="Urgent - Immediate">Urgent - Immediate (Emergency)</option>
                                <option value="Yes - Within 24 hours">Yes - Within 24 hours</option>
                                <option value="Yes - Within 72 hours">Yes - Within 72 hours</option>
                                <option value="Not Required">Not Required</option>
                                <option value="Already Received">Already Received</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Services Needed (Select All That Apply)
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Medical Care" class="mr-2">
                                    <span class="text-sm">Medical Care/Treatment</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Psychosocial Support" class="mr-2">
                                    <span class="text-sm">Psychosocial Support/Counseling</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Legal Aid" class="mr-2">
                                    <span class="text-sm">Legal Aid/Justice</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Safe Shelter" class="mr-2">
                                    <span class="text-sm">Safe Shelter/Accommodation</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Economic Support" class="mr-2">
                                    <span class="text-sm">Economic Support</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="services[]" value="Police Report" class="mr-2">
                                    <span class="text-sm">Police Report/FSU</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Immediate Safety Concerns?
                            </label>
                            <textarea name="safety_concerns" rows="3"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                      placeholder="Describe any immediate safety risks for the survivor"></textarea>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Referral Needed To
                            </label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="Rainbo Initiative" class="mr-2">
                                    <span class="text-sm">Rainbo Initiative</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="One-Stop Center" class="mr-2">
                                    <span class="text-sm">One-Stop Center</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="Police FSU" class="mr-2">
                                    <span class="text-sm">Police FSU</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="Legal Aid Board" class="mr-2">
                                    <span class="text-sm">Legal Aid Board</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="Social Welfare" class="mr-2">
                                    <span class="text-sm">Ministry of Social Welfare</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" name="referrals[]" value="NGO Partner" class="mr-2">
                                    <span class="text-sm">NGO Partner</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 7: Additional Information -->
                <div class="border-l-4 pl-4" style="border-left-color: #6b7280;">
                    <h3 class="text-lg font-semibold mb-4" style="color: #1e3a8a;">
                        <i class="fas fa-file-alt mr-2"></i>Section 7: Additional Information
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Witnesses Present?
                            </label>
                            <select name="witnesses" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="No">No Witnesses</option>
                                <option value="Yes">Yes - Witnesses Present</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Evidence Available?
                            </label>
                            <select name="evidence_available" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="No">No Evidence</option>
                                <option value="Physical Evidence">Physical Evidence</option>
                                <option value="Medical Evidence">Medical Evidence</option>
                                <option value="Photos/Videos">Photos/Videos</option>
                                <option value="Witness Statements">Witness Statements</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Case Priority Level
                            </label>
                            <select name="priority_level" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2">
                                <option value="High">🔴 High Priority (Emergency)</option>
                                <option value="Medium" selected>🟡 Medium Priority</option>
                                <option value="Low">🟢 Low Priority (Routine)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes
                            </label>
                            <textarea name="additional_notes" rows="4"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                                      placeholder="Any additional information that may be relevant to this case"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="border-t pt-6 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button type="button" onclick="saveDraft()"
                                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            <i class="fas fa-save mr-2"></i>Save Draft
                        </button>
                        <button type="button" onclick="clearForm()"
                                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            <i class="fas fa-redo mr-2"></i>Clear Form
                        </button>
                    </div>
                    
                    <button type="submit"
                            class="px-6 py-3 rounded-md text-white font-semibold hover:opacity-90 transition-opacity"
                            style="background-color: #32cd32;">
                        <i class="fas fa-paper-plane mr-2"></i>Submit Report
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Setup form handlers
    setupFormHandlers();
}

// Setup form event handlers
function setupFormHandlers() {
    const form = document.getElementById('gbv-report-form');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    
    // Handle regular fields and arrays
    for (let [key, value] of formData.entries()) {
        // Handle checkboxes (violence_types[])
        if (key.endsWith('[]')) {
            const cleanKey = key.replace('[]', '');
            if (!data[cleanKey]) {
                data[cleanKey] = [];
            }
            data[cleanKey].push(value);
        } else if (formData.getAll(key).length > 1) {
            // Handle multiple values
            data[key] = formData.getAll(key);
        } else {
            // Single value
            data[key] = value;
        }
    }
    
    console.log('Submitting case data:', data);
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
    
    try {
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        console.log('Server response:', result);
        
        if (result.success) {
            showSuccessMessage(result.case_number);
            e.target.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Show detailed error information
            const errorMsg = result.error || 'Failed to submit report';
            const details = result.details ? `\n\nDetails: ${result.details}` : '';
            showErrorMessage(errorMsg + details);
            console.error('Server error details:', result);
        }
    } catch (error) {
        console.error('Submission error:', error);
        console.error('Error submitting form:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Helper functions
function updateAgeGroup(age) {
    const ageGroupSelect = document.getElementById('age-group-select');
    if (!ageGroupSelect) return;
    
    age = parseInt(age);
    let ageGroup = '';
    
    if (age >= 0 && age <= 10) ageGroup = '0-10';
    else if (age >= 11 && age <= 15) ageGroup = '11-15';
    else if (age >= 16 && age <= 17) ageGroup = '16-17';
    else if (age >= 18 && age <= 25) ageGroup = '18-25';
    else if (age >= 26 && age <= 35) ageGroup = '26-35';
    else if (age >= 36) ageGroup = '36+';
    
    ageGroupSelect.value = ageGroup;
}

function toggleMultiplePerps(value) {
    const detailsDiv = document.getElementById('multiple-perps-details');
    if (detailsDiv) {
        detailsDiv.style.display = value === 'Yes' ? 'block' : 'none';
    }
}

function saveDraft() {
    const formData = new FormData(document.getElementById('gbv-report-form'));
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('gbv-report-draft', JSON.stringify(data));
    alert('Draft saved successfully!');
}

function clearForm() {
    if (confirm('Are you sure you want to clear this form? All entered data will be lost.')) {
        document.getElementById('gbv-report-form').reset();
    }
}

function showSuccessMessage(caseNumber) {
    alert(`✅ Case successfully submitted!\\n\\nCase Number: ${caseNumber}\\n\\nThe case has been recorded and relevant services have been notified.`);
}

function showErrorMessage(message) {
    alert(`❌ Error: ${message}`);
}

function loadChiefdoms(districtId) {
    const chiefdomSelect = document.getElementById('chiefdom-select');
    if (!chiefdomSelect) return;
    
    // Chiefdoms/Wards by District
    const chiefdomsByDistrict = {
        '1': ['Central I', 'Central II', 'East I', 'East II', 'East III', 'West I', 'West II', 'West III'],
        '2': ['Rural Area', 'Waterloo', 'Leicester', 'Regent', 'York'],
        '3': ['Baoma', 'Bagbwe', 'Bagbo', 'Badjia', 'Bumpe Ngao', 'Kakua', 'Komboya', 'Lugbu', 'Niawa', 'Selenga', 'Tikonko', 'Valunia'],
        '4': ['Bendu Cha', 'Dema', 'Imperri', 'Jong', 'Kpanda Kemoh', 'Kwamebai Krim', 'Nongoba Bulliom', 'Sitia', 'Sittia', 'Sogbini', 'Yawbeko'],
        '5': ['Bagruwa', 'Bumpeh', 'Dasse', 'Fakunya', 'Kaiyamba', 'Kamajei', 'Kongbora', 'Kori', 'Kowa', 'Lower Banta', 'Ribbi', 'Upper Banta'],
        '6': ['Barri', 'Gallinas Perri', 'Kpaka', 'Makpele', 'Malen', 'Panga Kabonde', 'Panga Krim', 'Peje Bongre', 'Peje West', 'Soro Gbema', 'Sorogbeima', 'Yakemu Kpukumu Krim'],
        '7': ['Dama', 'Dodo', 'Gaura', 'Gorama Kono', 'Kandu Leppiama', 'Koya', 'Lower Bambara', 'Malegohun', 'Nomo', 'Nongowa', 'Simbaru', 'Small Bo', 'Tunkia', 'Upper Bambara', 'Wandor'],
        '8': ['Dea', 'Jawei', 'Kissi Kama', 'Kissi Teng', 'Kissi Tongi', 'Luawa', 'Malema', 'Njaluahun', 'Peje', 'Penguia', 'Upper Bambara', 'Yawei'],
        '9': ['Fiama', 'Gbane', 'Gbane Kandor', 'Gbense', 'Gorama Mende', 'Kamara', 'Lei', 'Mafindor', 'Nimikoro', 'Nimiyama', 'Sandor', 'Soa', 'Tankoro', 'Toli'],
        '10': ['Bombali Sebora', 'Bombali Shebora', 'Gbanti Kamaranka', 'Gbendembu Ngowahun', 'Libeisaygahun', 'Magbaimba Ndowahun', 'Makari Gbanti', 'Paki Masabong', 'Safroko Limba', 'Sanda Loko', 'Sanda Magbolontor', 'Sella Limba', 'Tambakha'],
        '11': ['Bramaia', 'Gbinleh-Dixon', 'Magbema', 'Mambolo', 'Masungbala', 'Samu', 'Tonko Limba'],
        '12': ['Dembelia Sinkunia', 'Follosaba Dembelia', 'Kasunko', 'Mongo', 'Neini', 'Nieni', 'Sengbeh', 'Sulima', 'Wara Wara Bafodia', 'Wara Wara Yagala'],
        '13': ['Bureh Kasseh Maconteh', 'Buya', 'Dibia', 'Kaffu Bullom', 'Koya', 'Lokomasama', 'Maforki', 'Marampa', 'Masimera', 'Sanda Magbolontor', 'TMS Kakuna'],
        '14': ['Gbonkolenken', 'Kafe Simiria', 'Kalansogoia', 'Kholifa Mabang', 'Kholifa Rowala', 'Kunike', 'Kunike Barina', 'Malal Mara', 'Sambaia', 'Tane', 'Yoni'],
        '15': ['Bramaia', 'Diang', 'Gbinleh Dixion', 'Kasirie Kono', 'Samu', 'Semini', 'Tonko Limba', 'Wara Wara Bafodea Baoma'],
        '16': ['Dembelia', 'Mongo', 'Neini', 'Nieni', 'Sengbe', 'Solima', 'Sulima', 'Upper Bambara', 'Wara Wara Bafodea', 'Wara Wara Yagala']
    };
    
    chiefdomSelect.disabled = false;
    
    if (districtId && chiefdomsByDistrict[districtId]) {
        const chiefdoms = chiefdomsByDistrict[districtId];
        chiefdomSelect.innerHTML = '<option value="">Select Chiefdom/Ward</option>' +
            chiefdoms.map(c => `<option value="${c}">${c}</option>`).join('');
    } else {
        chiefdomSelect.innerHTML = '<option value="">Select District First</option>';
        chiefdomSelect.disabled = true;
    }
}

function updateGBVSubTypes(typeId) {
    // This would update sub-types based on main GBV type
    const subtypeSelect = document.getElementById('gbv-subtype');
    if (subtypeSelect) {
        subtypeSelect.disabled = false;
        subtypeSelect.innerHTML = '<option value="">Select sub-type</option>';
        // Would normally fetch from API here
    }
}

function goBackToSurvivorPortal() {
    const section = document.getElementById('dashboard-content');
    if (section && typeof window.loadSurvivorPortal === 'function') {
        window.loadSurvivorPortal(section);
    } else {
        location.reload();
    }
}

// Export functions to window for use in other portals
window.loadReportCaseForm = loadReportCaseForm;
window.goBackToSurvivorPortal = goBackToSurvivorPortal;
window.updateAgeGroup = updateAgeGroup;
window.toggleMultiplePerps = toggleMultiplePerps;
window.saveDraft = saveDraft;
window.clearForm = clearForm;
window.loadChiefdoms = loadChiefdoms;
window.updateGBVSubTypes = updateGBVSubTypes;
