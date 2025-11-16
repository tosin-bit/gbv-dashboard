// Language Switch System for Sierra Leone
// Simple language translation for local languages
console.log('🌐 Language Switch System Loading...');

// Translations for Sierra Leone languages
const translations = {
    en: {
        code: 'en',
        name: 'English',
        flag: '🇬🇧',
        // Dashboard
        dashboard: 'Dashboard',
        overview: 'Overview',
        reportCase: 'Report Case',
        viewCases: 'View Cases',
        districtMap: 'District Map',
        analytics: 'Analytics',
        resources: 'Resources',
        voiceReport: 'Voice Report',
        admin: 'Admin',
        // Stats
        totalCases: 'Total Cases',
        thisMonth: 'This Month',
        sexualAssault: 'Sexual Assault Cases',
        serviceCoverage: 'Service Coverage',
        // Actions
        reportIncident: 'Report an Incident',
        emergency: 'EMERGENCY: Call 116 (Toll-Free) for immediate GBV support',
        available247: 'Available 24/7 in Krio, English, Mende & Temne',
        refreshData: 'Refresh Data',
        // Common
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        search: 'Search',
        filter: 'Filter',
        export: 'Export',
        print: 'Print',
        help: 'Help',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        loading: 'Loading...',
        language: 'Language',
        // Form labels
        incidentReportForm: 'GBV Incident Report Form',
        completeAllFields: 'Complete all required fields to report a new GBV case',
        formID: 'Form ID',
        section1: 'Section 1: Incident Information',
        section2: 'Section 2: Survivor Information',
        section3: 'Section 3: Violence Details',
        section4: 'Section 4: Reporting Information',
        dateOfIncident: 'Date of Incident',
        timeOfIncident: 'Time of Incident',
        district: 'District',
        selectDistrict: 'Select District',
        chiefdom: 'Chiefdom/Ward',
        selectDistrictFirst: 'Select District First',
        locationDetails: 'Location Details (Village/Street/Landmark)',
        enterLocation: 'Enter specific location details',
        survivorAge: 'Survivor Age Group',
        selectAge: 'Select age group',
        survivorGender: 'Survivor Gender',
        male: 'Male',
        female: 'Female',
        other: 'Other',
        preferNotToSay: 'Prefer not to say',
        relationship: 'Relationship to Perpetrator',
        selectRelationship: 'Select relationship',
        typeOfViolence: 'Type of Violence',
        selectAll: 'Select all that apply',
        physicalViolence: 'Physical Violence',
        sexualViolence: 'Sexual Violence',
        psychologicalViolence: 'Psychological Violence',
        economicViolence: 'Economic Violence',
        incidentDescription: 'Incident Description',
        describeIncident: 'Describe what happened in detail',
        witnessesPresent: 'Were there any witnesses?',
        yes: 'Yes',
        no: 'No',
        unknown: 'Unknown',
        medicalAttention: 'Did survivor receive medical attention?',
        reportedBy: 'Reported By',
        selectReporter: 'Select who is reporting',
        contactNumber: 'Contact Number',
        optional: 'Optional',
        enterPhone: 'Enter phone number for follow-up',
        reportingChannel: 'Reporting Channel',
        selectChannel: 'Select channel',
        priorityLevel: 'Priority Level',
        selectPriority: 'Select priority',
        additionalNotes: 'Additional Notes',
        anyOtherInfo: 'Any other relevant information',
        privacyNotice: 'Privacy Notice',
        privacyText: 'All information provided is confidential and will only be shared with authorized service providers to ensure the survivor receives appropriate care and support.',
        required: 'Required',
        submitReport: 'Submit Report',
        clearForm: 'Clear Form',
        // View Cases
        allCases: 'All GBV Cases',
        searchFilter: 'Search and filter cases',
        caseNumber: 'Case Number',
        date: 'Date',
        location: 'Location',
        type: 'Type',
        status: 'Status',
        actions: 'Actions',
        pending: 'Pending',
        underInvestigation: 'Under Investigation',
        resolved: 'Resolved',
        viewDetails: 'View Details',
        // District Map
        districtCaseMap: 'District Case Distribution Map',
        selectDistrictView: 'Select a district to view detailed information',
        totalCasesInDistrict: 'Total Cases',
        highRisk: 'High Risk',
        mediumRisk: 'Medium Risk',
        lowRisk: 'Low Risk',
        // Analytics
        analyticsReports: 'Analytics & Reports',
        generateReports: 'Generate comprehensive reports and analytics',
        monthlyTrends: 'Monthly Trends',
        casesByType: 'Cases by Type',
        ageDistribution: 'Age Distribution',
        districtComparison: 'District Comparison',
        downloadReport: 'Download Report',
        // Resources
        resourceCenter: 'Resource Center',
        helpMaterials: 'Help materials and support information',
        emergencyContacts: 'Emergency Contacts',
        supportServices: 'Support Services',
        legalAid: 'Legal Aid',
        counseling: 'Counseling Services',
        // Voice Report
        voiceReporting: 'Voice Reporting System',
        recordYourReport: 'Record your report anonymously',
        startRecording: 'Start Recording',
        stopRecording: 'Stop Recording',
        playback: 'Playback',
        // Common messages
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        confirm: 'Confirm',
        processing: 'Processing...',
        pleaseWait: 'Please wait...',
        dataLoaded: 'Data loaded successfully',
        dataError: 'Error loading data',
        noCasesFound: 'No Cases Found',
        tryAdjusting: 'Try adjusting your filters or submit a new case',
        failedToLoad: 'Failed to Load Cases',
        pleaseRetry: 'Please try again or contact support',
        retry: 'Retry',
        incidentDate: 'Incident Date',
        violenceType: 'Violence Type',
        allGBVCases: 'All GBV Cases',
        loadingCases: 'Loading cases...',
        casesFor: 'Cases for',
        total: 'Total',
        filters: 'Filters',
        apply: 'Apply',
        reset: 'Reset',
        showingResults: 'Showing results',
        of: 'of'
    },
    krio: {
        code: 'krio',
        name: 'Krio',
        flag: '🇸🇱',
        // Dashboard
        dashboard: 'Dashboard',
        overview: 'Ɔvavyu',
        reportCase: 'Ripɔt Kes',
        viewCases: 'Si Kes dɛm',
        districtMap: 'Distrik Map',
        analytics: 'Analytics',
        resources: 'Rɛsɔs dɛm',
        voiceReport: 'Vɔys Ripɔt',
        admin: 'Admin',
        // Stats
        totalCases: 'Ɔl Di Kes dɛm',
        thisMonth: 'Dis Mɔnt',
        sexualAssault: 'Sɛks Atak Kes dɛm',
        serviceCoverage: 'Savis Kɔvarej',
        // Actions
        reportIncident: 'Ripɔt Wetin Apin',
        emergency: 'EMƐJENSI: Kɔl 116 (Fri) fɔ kwik GBV ɛp',
        available247: 'Ɛvride 24/7 pan Krio, English, Mende ɛn Temne',
        refreshData: 'Rifrɛsh Data',
        // Common
        submit: 'Sɛn',
        cancel: 'Kansul',
        save: 'Sev',
        delete: 'Dilit',
        edit: 'Ɛdit',
        view: 'Luk',
        search: 'Fɛn',
        filter: 'Filta',
        export: 'Ɛkspɔt',
        print: 'Print',
        help: 'Ɛp',
        close: 'Kloz',
        back: 'Go Bak',
        next: 'Nɛks',
        previous: 'Bifo',
        loading: 'De Lod...',
        language: 'Langwej',
        // Form labels
        incidentReportForm: 'GBV Kes Ripɔt Fɔm',
        completeAllFields: 'Fil ɔl di impɔtant pat dɛm fɔ ripɔt nyu GBV kes',
        formID: 'Fɔm Nɔmba',
        section1: 'Pat 1: Wetin Apin Infɔmɛshɔn',
        section2: 'Pat 2: Pɔsin we E Apin to Infɔmɛshɔn',
        section3: 'Pat 3: Vaɔlɛns Ditel dɛm',
        section4: 'Pat 4: Ripɔt Infɔmɛshɔn',
        dateOfIncident: 'Wetin Day E Apin',
        timeOfIncident: 'Wetin Taym E Apin',
        district: 'Distrik',
        selectDistrict: 'Pik Distrik',
        chiefdom: 'Chiefdom/Ward',
        selectDistrictFirst: 'Pik Distrik Fɔs',
        locationDetails: 'Ples Ditel dɛm (Vilej/Strit/Lanmak)',
        enterLocation: 'Put di ples we e apin',
        survivorAge: 'Aw Ol di Pɔsin',
        selectAge: 'Pik aw ol',
        survivorGender: 'Man ɔ Uman',
        male: 'Man',
        female: 'Uman',
        other: 'Ɔda',
        preferNotToSay: 'A nɔ wan tɔk',
        relationship: 'Usay Rilɛshɔn wit di Pɔsin we Mek Am',
        selectRelationship: 'Pik rilɛshɔn',
        typeOfViolence: 'Wetin Kayn Vaɔlɛns',
        selectAll: 'Pik ɔl we fit',
        physicalViolence: 'Bɔdi Vaɔlɛns',
        sexualViolence: 'Sɛks Vaɔlɛns',
        psychologicalViolence: 'Maynd Vaɔlɛns',
        economicViolence: 'Mɔni Vaɔlɛns',
        incidentDescription: 'Wetin Apin Dɛskripshɔn',
        describeIncident: 'Tɔk wetin apin wit ditel',
        witnessesPresent: 'Ɛni pɔsin si am?',
        yes: 'Yɛs',
        no: 'Nɔ',
        unknown: 'A nɔ no',
        medicalAttention: 'Dɔkta si di pɔsin?',
        reportedBy: 'Usay Ripɔt Am',
        selectReporter: 'Pik usay de ripɔt',
        contactNumber: 'Fon Nɔmba',
        optional: 'If yu want',
        enterPhone: 'Put fon nɔmba fɔ fɔlɔ-ɔp',
        reportingChannel: 'Aw Dɛm Ripɔt Am',
        selectChannel: 'Pik channel',
        priorityLevel: 'Aw E Impɔtant',
        selectPriority: 'Pik aw e impɔtant',
        additionalNotes: 'Ɔda Not dɛm',
        anyOtherInfo: 'Ɛni ɔda infɔmɛshɔn',
        privacyNotice: 'Pravasi Not',
        privacyText: 'Ɔl di infɔmɛshɔn na sikrit ɛn wi go ɔnli sheb am wit pɔsin dɛm we dɛm ɔtorayz fɔ mek shɔ di pɔsin gɛt di rayt kia ɛn sɔpɔt.',
        required: 'Impɔtant',
        submitReport: 'Sɛn Ripɔt',
        clearForm: 'Klin Fɔm',
        // View Cases
        allCases: 'Ɔl GBV Kes dɛm',
        searchFilter: 'Fɛn ɛn filta kes dɛm',
        caseNumber: 'Kes Nɔmba',
        date: 'Det',
        location: 'Ples',
        type: 'Kayn',
        status: 'Status',
        actions: 'Akshɔn dɛm',
        pending: 'I de Wet',
        underInvestigation: 'Dɛm de Chɛk Am',
        resolved: 'Dɛm Dɔn Sɔlv Am',
        viewDetails: 'Si Ditel dɛm',
        // District Map
        districtCaseMap: 'Distrik Kes Map',
        selectDistrictView: 'Pik distrik fɔ si ditel infɔmɛshɔn',
        totalCasesInDistrict: 'Ɔl Di Kes dɛm',
        highRisk: 'Big Risk',
        mediumRisk: 'Midul Risk',
        lowRisk: 'Smɔl Risk',
        // Analytics
        analyticsReports: 'Analytics ɛn Ripɔt dɛm',
        generateReports: 'Mek kɔmpriɛnsiv ripɔt dɛm ɛn analytics',
        monthlyTrends: 'Mɔnt bay Mɔnt',
        casesByType: 'Kes dɛm bay Kayn',
        ageDistribution: 'Aw Ol Dɛm Spred',
        districtComparison: 'Kɔmpia Distrik dɛm',
        downloadReport: 'Dawnlod Ripɔt',
        // Resources
        resourceCenter: 'Rɛsɔs Sɛnta',
        helpMaterials: 'Ɛp matɛrial dɛm ɛn sɔpɔt infɔmɛshɔn',
        emergencyContacts: 'Emɛjensi Kɔntakt dɛm',
        supportServices: 'Sɔpɔt Savis dɛm',
        legalAid: 'Lɔ Ɛp',
        counseling: 'Kaonselin Savis dɛm',
        // Voice Report
        voiceReporting: 'Vɔys Ripɔt Sistɛm',
        recordYourReport: 'Rikɔd yu ripɔt anɔnimas',
        startRecording: 'Stat Rikɔdin',
        stopRecording: 'Stɔp Rikɔdin',
        playback: 'Ple Am Bak',
        // Common messages
        success: 'Dɔn Wok',
        error: 'Ɛrɔ',
        warning: 'Wɔnin',
        info: 'Infɔmɛshɔn',
        confirm: 'Kɔnfam',
        processing: 'Wi de prosɛs am...',
        pleaseWait: 'Wet smɔl...',
        dataLoaded: 'Data dɔn lod fayn',
        dataError: 'Ɛrɔ fɔ lod data',
        noCasesFound: 'Nɔ Kes Dɛm Ya',
        tryAdjusting: 'Chenj yu filta ɔ sɛn nyu kes',
        failedToLoad: 'Kes dɛm Nɔ Lod',
        pleaseRetry: 'Tray bak ɔ kɔl sɔpɔt',
        retry: 'Tray Bak',
        incidentDate: 'Wetin Day E Apin',
        violenceType: 'Vaɔlɛns Kayn',
        allGBVCases: 'Ɔl GBV Kes dɛm',
        loadingCases: 'De lod kes dɛm...',
        casesFor: 'Kes dɛm fɔ',
        total: 'Ɔl Togɛda',
        filters: 'Filta dɛm',
        apply: 'Yuz Am',
        reset: 'Riset',
        showingResults: 'Wi de sho',
        of: 'pan'
    },
    mende: {
        code: 'mende',
        name: 'Mende',
        flag: '🇸🇱',
        // Dashboard
        dashboard: 'Dashboard',
        overview: 'Gɔmɛni',
        reportCase: 'Hɔtɛɛ lɔ',
        viewCases: 'Hɔtɛɛ ma',
        districtMap: 'Ndɔgɔ Map',
        analytics: 'Analytics',
        resources: 'Njɛwɔma',
        voiceReport: 'Ngɛwɔ Ripɔt',
        admin: 'Admin',
        // Stats
        totalCases: 'Hɔtɛɛ kpɔɔ',
        thisMonth: 'Ɓuɛi gɔ',
        sexualAssault: 'Sɛks Atak Hɔtɛɛ',
        serviceCoverage: 'Savis Kɔvarej',
        // Actions
        reportIncident: 'Hɔtɛɛ lɔ',
        emergency: 'NDƆPO: Holɛ 116 (Lɔhun) GBV kpɛlɛma yɔ',
        available247: 'Fɔlɔi 24/7 Krio, English, Mende, Temne',
        refreshData: 'Data gbɔyɔ',
        // Common
        submit: 'Tɔmɛ',
        cancel: 'Yila',
        save: 'Kpɛlɛ',
        delete: 'Pie',
        edit: 'Lɔ bɛ',
        view: 'Lɔk',
        search: 'Waa',
        filter: 'Pɛɛlɛ',
        export: 'Tɔmɛ',
        print: 'Print',
        help: 'Kpɛlɛma',
        close: 'Pie',
        back: 'Gbi',
        next: 'Hu',
        previous: 'Bifo',
        loading: 'Nga lod...',
        language: 'Ngɛwɔ',
        // Form labels
        incidentReportForm: 'GBV Hɔtɛɛ Ripɔt Fɔm',
        completeAllFields: 'Lɔ kpɔɔ fɔ hɔtɛɛ lɔma',
        formID: 'Fɔm Nɔmba',
        section1: 'Pat 1: Hɔtɛɛ Infɔmɛshɔn',
        section2: 'Pat 2: Pɔsin Infɔmɛshɔn',
        section3: 'Pat 3: Leɔma Ditel dɛm',
        section4: 'Pat 4: Ripɔt Infɔmɛshɔn',
        dateOfIncident: 'Nyaha',
        timeOfIncident: 'Fɔlɔi',
        district: 'Ndɔgɔ',
        selectDistrict: 'Pɛɛlɛ Ndɔgɔ',
        chiefdom: 'Chiefdom/Ward',
        selectDistrictFirst: 'Pɛɛlɛ Ndɔgɔ Fɔs',
        locationDetails: 'Ples (Kɔtɔ/Strit/Lanmak)',
        enterLocation: 'Lɔ ples',
        survivorAge: 'Nyaha Yaa',
        selectAge: 'Pɛɛlɛ nyaha yaa',
        survivorGender: 'Numu ɔ Nya',
        male: 'Numu',
        female: 'Nya',
        other: 'Ɔda',
        preferNotToSay: 'Nga nɔ bu lɔ',
        relationship: 'Yɛ rilɛshɔn',
        selectRelationship: 'Pɛɛlɛ rilɛshɔn',
        typeOfViolence: 'Leɔma Kayn',
        selectAll: 'Pɛɛlɛ kpɔɔ',
        physicalViolence: 'Bɔdi Leɔma',
        sexualViolence: 'Sɛks Leɔma',
        psychologicalViolence: 'Ngiɛ Leɔma',
        economicViolence: 'Mɔni Leɔma',
        incidentDescription: 'Hɔtɛɛ Lɔma',
        describeIncident: 'Lɔ ngi nyande',
        witnessesPresent: 'Pɔsin si?',
        yes: 'Ɛɛ',
        no: 'Kpɛ',
        unknown: 'Nga nɔ ma',
        medicalAttention: 'Dɔkta si?',
        reportedBy: 'Yɛ Lɔnga',
        selectReporter: 'Pɛɛlɛ yɛ lɔnga',
        contactNumber: 'Fon Nɔmba',
        optional: 'I bu',
        enterPhone: 'Lɔ fon nɔmba',
        reportingChannel: 'Lɔma Njia',
        selectChannel: 'Pɛɛlɛ channel',
        priorityLevel: 'Leɔma Lɛvɛl',
        selectPriority: 'Pɛɛlɛ leɔma',
        additionalNotes: 'Ɔda Lɔma dɛm',
        anyOtherInfo: 'Ɔda infɔmɛshɔn',
        privacyNotice: 'Pravasi',
        privacyText: 'Infɔmɛshɔn kpɔɔ na sikrit. Mu lɔ pɔsin dɛm we authorize fɔ kpɛlɛma.',
        required: 'Leɔma',
        submitReport: 'Tɔmɛ Ripɔt',
        clearForm: 'Klin Fɔm',
        // View Cases
        allCases: 'GBV Hɔtɛɛ Kpɔɔ',
        searchFilter: 'Waa hɔtɛɛ dɛm',
        caseNumber: 'Hɔtɛɛ Nɔmba',
        date: 'Nyaha',
        location: 'Ples',
        type: 'Kayn',
        status: 'Status',
        actions: 'Akshɔn dɛm',
        pending: 'Mu wet',
        underInvestigation: 'Mu chɛk',
        resolved: 'Dɔn sɔlv',
        viewDetails: 'Lɔk Ditel',
        // District Map
        districtCaseMap: 'Ndɔgɔ Hɔtɛɛ Map',
        selectDistrictView: 'Pɛɛlɛ ndɔgɔ fɔ lɔk',
        totalCasesInDistrict: 'Hɔtɛɛ Kpɔɔ',
        highRisk: 'Risk Gbɔyɔ',
        mediumRisk: 'Risk Midul',
        lowRisk: 'Risk Kpindi',
        // Analytics
        analyticsReports: 'Analytics ɛn Ripɔt',
        generateReports: 'Mek ripɔt dɛm',
        monthlyTrends: 'Ɓuɛi bay Ɓuɛi',
        casesByType: 'Hɔtɛɛ dɛm bay Kayn',
        ageDistribution: 'Nyaha Yaa',
        districtComparison: 'Ndɔgɔ Kɔmpia',
        downloadReport: 'Dawnlod Ripɔt',
        // Resources
        resourceCenter: 'Njɛwɔma Sɛnta',
        helpMaterials: 'Kpɛlɛma matɛrial',
        emergencyContacts: 'Ndɔpo Kɔntakt',
        supportServices: 'Kpɛlɛma Savis',
        legalAid: 'Lɔ Kpɛlɛma',
        counseling: 'Kaonselin',
        // Voice Report
        voiceReporting: 'Ngɛwɔ Ripɔt',
        recordYourReport: 'Rikɔd i ripɔt',
        startRecording: 'Stat Rikɔd',
        stopRecording: 'Stɔp Rikɔd',
        playback: 'Ple Bak',
        // Common messages
        success: 'Dɔn Wok',
        error: 'Ɛrɔ',
        warning: 'Wɔnin',
        info: 'Infɔmɛshɔn',
        confirm: 'Kɔnfam',
        processing: 'Mu prosɛs...',
        pleaseWait: 'Wet...',
        dataLoaded: 'Data dɔn lod',
        dataError: 'Data ɛrɔ',
        noCasesFound: 'Hɔtɛɛ Bɛ',
        tryAdjusting: 'Chenj filta ɔ tɔmɛ nyu hɔtɛɛ',
        failedToLoad: 'Hɔtɛɛ dɛm Nɔ Lod',
        pleaseRetry: 'Tray bak ɔ kɔl kpɛlɛma',
        retry: 'Tray Bak',
        incidentDate: 'Nyaha',
        violenceType: 'Leɔma Kayn',
        allGBVCases: 'GBV Hɔtɛɛ Kpɔɔ',
        loadingCases: 'Mu lod hɔtɛɛ...',
        casesFor: 'Hɔtɛɛ fɔ',
        total: 'Kpɔɔ',
        filters: 'Filta dɛm',
        apply: 'Yuz',
        reset: 'Riset',
        showingResults: 'Mu sho',
        of: 'pan'
    },
    temne: {
        code: 'temne',
        name: 'Temne',
        flag: '🇸🇱',
        // Dashboard
        dashboard: 'Dashboard',
        overview: 'Ro-lɔk',
        reportCase: 'Ka-bamp Poth',
        viewCases: 'Ka-bamp Yi',
        districtMap: 'Distrik Map',
        analytics: 'Analytics',
        resources: 'Kə-ren dɛm',
        voiceReport: 'Kə-mənth Ripɔt',
        admin: 'Admin',
        // Stats
        totalCases: 'Ka-bamp Yɛrɛ',
        thisMonth: 'Kə-ker Konii',
        sexualAssault: 'Sɛks Atak Ka-bamp',
        serviceCoverage: 'Savis Kɔvarej',
        // Actions
        reportIncident: 'Ka-tin Poth',
        emergency: 'RƆ-YOR: Phone 116 (Fri) GBV kə-ren yɔ',
        available247: 'Fɔli 24/7 Krio, English, Mende, Temne',
        refreshData: 'Data Ri-yir',
        // Common
        submit: 'Yir',
        cancel: 'Kansul',
        save: 'Kpɛl',
        delete: 'Bəl',
        edit: 'Poth bɛ',
        view: 'Lɔk',
        search: 'Waa',
        filter: 'Pik',
        export: 'Yir',
        print: 'Print',
        help: 'Kə-ren',
        close: 'Pəl',
        back: 'Gbi',
        next: 'Fo',
        previous: 'Bifo',
        loading: 'Ka lod...',
        language: 'Kə-mənth',
        // Form labels
        incidentReportForm: 'GBV Ka-bamp Ripɔt Fɔm',
        completeAllFields: 'Poth kpɔɔ fɔ ka-bamp lɔma',
        formID: 'Fɔm Nɔmba',
        section1: 'Pat 1: Ka-bamp Infɔmɛshɔn',
        section2: 'Pat 2: Pɔsin Infɔmɛshɔn',
        section3: 'Pat 3: Rə-yor Ditel',
        section4: 'Pat 4: Ripɔt Infɔmɛshɔn',
        dateOfIncident: 'A Yem',
        timeOfIncident: 'Fɔli',
        district: 'Ro-sənt',
        selectDistrict: 'Pik Ro-sənt',
        chiefdom: 'Chiefdom/Ward',
        selectDistrictFirst: 'Pik Ro-sənt Fɔs',
        locationDetails: 'Ples (Vilej/Strit/Lanmak)',
        enterLocation: 'Poth ples',
        survivorAge: 'Rə-yor',
        selectAge: 'Pik rə-yor',
        survivorGender: 'Man ɔ Woman',
        male: 'Man',
        female: 'Woman',
        other: 'Ɔda',
        preferNotToSay: 'N ka nɔ poth',
        relationship: 'Yɛ rilɛshɔn',
        selectRelationship: 'Pik rilɛshɔn',
        typeOfViolence: 'Rə-yor Kayn',
        selectAll: 'Pik yɛrɛ',
        physicalViolence: 'Bɔdi Rə-yor',
        sexualViolence: 'Sɛks Rə-yor',
        psychologicalViolence: 'Maynd Rə-yor',
        economicViolence: 'Mɔni Rə-yor',
        incidentDescription: 'Ka-bamp Lɔma',
        describeIncident: 'Poth ka-tin',
        witnessesPresent: 'Pɔsin si?',
        yes: 'Ɛɛ',
        no: 'Bɛ',
        unknown: 'N ka nɔ ma',
        medicalAttention: 'Dɔkta si?',
        reportedBy: 'Yɛ Pothnga',
        selectReporter: 'Pik yɛ pothnga',
        contactNumber: 'Phone Nɔmba',
        optional: 'I bu',
        enterPhone: 'Poth phone',
        reportingChannel: 'Pothma Njia',
        selectChannel: 'Pik channel',
        priorityLevel: 'Rə-yor Lɛvɛl',
        selectPriority: 'Pik rə-yor',
        additionalNotes: 'Ɔda Not',
        anyOtherInfo: 'Ɔda infɔmɛshɔn',
        privacyNotice: 'Pravasi',
        privacyText: 'Infɔmɛshɔn yɛrɛ na sikrit. An poth pɔsin we authorize fɔ kə-ren.',
        required: 'Rə-yor',
        submitReport: 'Yir Ripɔt',
        clearForm: 'Klin Fɔm',
        // View Cases
        allCases: 'GBV Ka-bamp Yɛrɛ',
        searchFilter: 'Waa ka-bamp',
        caseNumber: 'Ka-bamp Nɔmba',
        date: 'Yem',
        location: 'Ples',
        type: 'Kayn',
        status: 'Status',
        actions: 'Akshɔn',
        pending: 'An wet',
        underInvestigation: 'An chɛk',
        resolved: 'Dɔn sɔlv',
        viewDetails: 'Lɔk Ditel',
        // District Map
        districtCaseMap: 'Ro-sənt Ka-bamp Map',
        selectDistrictView: 'Pik ro-sənt fɔ lɔk',
        totalCasesInDistrict: 'Ka-bamp Yɛrɛ',
        highRisk: 'Risk Rə-bəy',
        mediumRisk: 'Risk Midul',
        lowRisk: 'Risk Kpindi',
        // Analytics
        analyticsReports: 'Analytics ɛn Ripɔt',
        generateReports: 'Mek ripɔt',
        monthlyTrends: 'Kə-ker Trends',
        casesByType: 'Ka-bamp bay Kayn',
        ageDistribution: 'Rə-yor',
        districtComparison: 'Ro-sənt Kɔmpia',
        downloadReport: 'Dawnlod Ripɔt',
        // Resources
        resourceCenter: 'Kə-ren Sɛnta',
        helpMaterials: 'Kə-ren matɛrial',
        emergencyContacts: 'Ndɔpo Kɔntakt',
        supportServices: 'Kə-ren Savis',
        legalAid: 'Lɔ Kə-ren',
        counseling: 'Kaonselin',
        // Voice Report
        voiceReporting: 'Kə-mənth Ripɔt',
        recordYourReport: 'Rikɔd i ripɔt',
        startRecording: 'Stat Rikɔd',
        stopRecording: 'Stɔp Rikɔd',
        playback: 'Ple Bak',
        // Common messages
        success: 'Dɔn Wok',
        error: 'Ɛrɔ',
        warning: 'Wɔnin',
        info: 'Infɔmɛshɔn',
        confirm: 'Kɔnfam',
        processing: 'An prosɛs...',
        pleaseWait: 'Wet...',
        dataLoaded: 'Data dɔn lod',
        dataError: 'Data ɛrɔ',
        noCasesFound: 'Ka-bamp Bɛ',
        tryAdjusting: 'Chenj filta ɔ yir nyu ka-bamp',
        failedToLoad: 'Ka-bamp Nɔ Lod',
        pleaseRetry: 'Tray bak ɔ kɔl kə-ren',
        retry: 'Tray Bak',
        incidentDate: 'A Yem',
        violenceType: 'Rə-yor Kayn',
        allGBVCases: 'GBV Ka-bamp Yɛrɛ',
        loadingCases: 'An lod ka-bamp...',
        casesFor: 'Ka-bamp fɔ',
        total: 'Yɛrɛ',
        filters: 'Filta',
        apply: 'Yuz',
        reset: 'Riset',
        showingResults: 'An sho',
        of: 'pan'
    }
};

// Current language
let currentLang = localStorage.getItem('gbv_language') || 'en';

// Get translation
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// Change language
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not supported:', lang);
        return;
    }
    
    currentLang = lang;
    localStorage.setItem('gbv_language', lang);
    
    // Update all translatable elements
    translatePage();
    
    // Update language button
    updateLanguageButton();
    
    console.log('Language changed to:', translations[lang].name);
}

// Translate page
function translatePage() {
    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translated = t(key);
        
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translated;
            }
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            // Only translate text nodes, preserve icons
            const icon = element.querySelector('i');
            if (icon) {
                const iconHTML = icon.outerHTML;
                element.innerHTML = iconHTML + ' ' + translated;
            } else {
                element.textContent = translated;
            }
        } else {
            element.textContent = translated;
        }
    });
    
    // Translate common text patterns (for dynamically loaded content)
    translateCommonPatterns();
}

// Translate common text patterns in dynamically loaded content
function translateCommonPatterns() {
    // Get all text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim()) {
            textNodes.push(node);
        }
    }
    
    // Translation mapping for common phrases
    const patterns = {
        // Form
        'GBV Incident Report Form': t('incidentReportForm'),
        'Complete all required fields to report a new GBV case': t('completeAllFields'),
        'Form ID': t('formID'),
        'Section 1: Incident Information': t('section1'),
        'Section 2: Survivor Information': t('section2'),
        'Section 3: Violence Details': t('section3'),
        'Section 4: Reporting Information': t('section4'),
        'Date of Incident': t('dateOfIncident'),
        'Time of Incident': t('timeOfIncident'),
        'District': t('district'),
        'Select District': t('selectDistrict'),
        'Chiefdom/Ward': t('chiefdom'),
        'Select District First': t('selectDistrictFirst'),
        'Submit Report': t('submitReport'),
        'Clear Form': t('clearForm'),
        'Required': t('required'),
        'Survivor Age Group': t('survivorAge'),
        'Select age group': t('selectAge'),
        'Survivor Gender': t('survivorGender'),
        'Male': t('male'),
        'Female': t('female'),
        'Other': t('other'),
        'Prefer not to say': t('preferNotToSay'),
        'Type of Violence': t('typeOfViolence'),
        'Select all that apply': t('selectAll'),
        'Physical Violence': t('physicalViolence'),
        'Sexual Violence': t('sexualViolence'),
        'Psychological Violence': t('psychologicalViolence'),
        'Economic Violence': t('economicViolence'),
        'Incident Description': t('incidentDescription'),
        'Were there any witnesses?': t('witnessesPresent'),
        'Yes': t('yes'),
        'No': t('no'),
        'Unknown': t('unknown'),
        'Did survivor receive medical attention?': t('medicalAttention'),
        'Reported By': t('reportedBy'),
        'Contact Number': t('contactNumber'),
        'Optional': t('optional'),
        // View Cases
        'All GBV Cases': t('allCases'),
        'Search and filter cases': t('searchFilter'),
        'Case Number': t('caseNumber'),
        'Date': t('date'),
        'Location': t('location'),
        'Type': t('type'),
        'Status': t('status'),
        'Actions': t('actions'),
        'Pending': t('pending'),
        'Under Investigation': t('underInvestigation'),
        'Resolved': t('resolved'),
        'View Details': t('viewDetails'),
        'Loading cases...': t('loading'),
        'No Cases Found': 'No Cases Found', // Will add translation
        'Failed to Load Cases': 'Failed to Load Cases', // Will add translation
        'Retry': 'Retry', // Will add translation
        'Incident Date': 'Incident Date', // Will add translation
        'Violence Type': 'Violence Type', // Will add translation
        // Common
        'Search': t('search'),
        'Filter': t('filter'),
        'Export': t('export'),
        'Print': t('print'),
        'Help': t('help'),
        'Close': t('close'),
        'Back': t('back'),
        'Next': t('next'),
        'Previous': t('previous'),
        'Submit': t('submit'),
        'Cancel': t('cancel'),
        'Save': t('save'),
        'Delete': t('delete'),
        'Edit': t('edit'),
        'View': t('view'),
        'Success': t('success'),
        'Error': t('error'),
        'Warning': t('warning'),
        'Confirm': t('confirm'),
        'Processing...': t('processing'),
        'Please wait...': t('pleaseWait'),
        // District Map
        'Sierra Leone District Map': t('districtCaseMap'),
        'GBV Case Distribution Across All 16 Districts': t('selectDistrictView'),
        'Total Cases': t('totalCases'),
        'Refresh': t('refreshData'),
        'Filter by Region:': 'Filter by Region:', // Will add
        'All Regions': 'All Regions', // Will add
        'Western Area': 'Western Area',
        'Southern Province': 'Southern Province',
        'Eastern Province': 'Eastern Province',
        'Northern Province': 'Northern Province',
        'Risk Level:': 'Risk Level:',
        'All Levels': 'All Levels',
        'High Risk': t('highRisk'),
        'Medium Risk': t('mediumRisk'),
        'Low Risk': t('lowRisk'),
        // Analytics
        'Analytics & Reports': t('analyticsReports'),
        'Generate comprehensive reports and analytics': t('generateReports'),
        'Monthly Trends': t('monthlyTrends'),
        'Cases by Type': t('casesByType'),
        'Age Distribution': t('ageDistribution'),
        'District Comparison': t('districtComparison'),
        'Download Report': t('downloadReport'),
        // Resources
        'Resource Center': t('resourceCenter'),
        'Emergency Contacts': t('emergencyContacts'),
        'Support Services': t('supportServices'),
        'Legal Aid': t('legalAid'),
        'Counseling Services': t('counseling'),
        // Voice Report
        'Voice Reporting System': t('voiceReporting'),
        'Record your report anonymously': t('recordYourReport'),
        'Start Recording': t('startRecording'),
        'Stop Recording': t('stopRecording')
    };
    
    // Apply translations to text nodes
    textNodes.forEach(node => {
        const text = node.nodeValue.trim();
        if (patterns[text]) {
            node.nodeValue = patterns[text];
        }
    });
}

// Update language button
function updateLanguageButton() {
    const langBtn = document.getElementById('language-btn');
    if (langBtn) {
        const currentTranslation = translations[currentLang];
        langBtn.innerHTML = `
            <i class="fas fa-globe mr-2"></i>
            <span>${currentTranslation.flag} ${currentTranslation.name}</span>
            <i class="fas fa-chevron-down ml-2"></i>
        `;
    }
}

// Show language menu
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const langBtn = document.getElementById('language-btn');
    const menu = document.getElementById('language-menu');
    
    if (menu && langBtn && !langBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

// Initialize on page load
function initLanguageSwitch() {
    // Add language button to header if not exists
    addLanguageButton();
    
    // Translate page on load
    translatePage();
    
    // Update button
    updateLanguageButton();
    
    console.log('Language Switch initialized. Current language:', translations[currentLang].name);
}

// Add language button to header
function addLanguageButton() {
    // Check if button already exists
    if (document.getElementById('language-btn')) {
        return;
    }
    
    // Find header right section
    const header = document.querySelector('header .text-right');
    if (!header) {
        console.warn('Header not found, will retry...');
        setTimeout(addLanguageButton, 500);
        return;
    }
    
    // Create language switch container
    const langContainer = document.createElement('div');
    langContainer.className = 'relative mt-2';
    langContainer.innerHTML = `
        <button 
            id="language-btn"
            onclick="toggleLanguageMenu()"
            class="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            style="background-color: #1e3a8a; color: white;"
            onmouseover="this.style.backgroundColor='#1e40af'"
            onmouseout="this.style.backgroundColor='#1e3a8a'"
        >
            <i class="fas fa-globe mr-2"></i>
            <span>🇬🇧 English</span>
            <i class="fas fa-chevron-down ml-2"></i>
        </button>
        
        <div 
            id="language-menu"
            class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
            <div class="py-1">
                ${Object.keys(translations).map(lang => `
                    <button
                        onclick="changeLanguage('${lang}'); toggleLanguageMenu();"
                        class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${currentLang === lang ? 'bg-blue-50 font-medium' : ''}"
                        style="color: #1e3a8a;"
                    >
                        <span class="text-lg">${translations[lang].flag}</span>
                        <span>${translations[lang].name}</span>
                        ${currentLang === lang ? '<i class="fas fa-check ml-auto" style="color: #32cd32;"></i>' : ''}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    header.appendChild(langContainer);
}

// Export functions
window.changeLanguage = changeLanguage;
window.toggleLanguageMenu = toggleLanguageMenu;
window.t = t;

// Watch for dynamically added content and translate it
function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                // Translate newly added content
                setTimeout(() => {
                    translatePage();
                }, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLanguageSwitch();
        setupMutationObserver();
    });
} else {
    initLanguageSwitch();
    setupMutationObserver();
}

console.log('🌐 Language Switch System Ready');
