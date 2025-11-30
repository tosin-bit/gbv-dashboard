/**
 * Unified Case Management System
 * Syncs cases across all portals (Ministry, Police FSU, Rainbo, Survivor Portal)
 * Prevents duplicate reporting with intelligent deduplication
 */

// Ministry Brand Colors - Used consistently across all pages
const MINISTRY_COLORS = {
    primary: '#1e3a8a',      // Dark Blue
    secondary: '#1e90ff',    // Dodger Blue
    accent: '#32cd32',       // Lime Green
    warning: '#ffd700',      // Gold
    success: '#008000',      // Green
    danger: '#dc2626',       // Red
    info: '#1e90ff'          // Cyan
};

// Case source types
const CASE_SOURCES = {
    MINISTRY: 'ministry',
    POLICE: 'police',
    RAINBO: 'rainbo',
    SURVIVOR: 'survivor',
    COMMUNITY: 'community',
    HOTLINE: 'hotline'
};

// Unified case storage key
const UNIFIED_CASES_KEY = 'gbv_unified_cases';
const CASE_INDEX_KEY = 'gbv_case_index';

/**
 * Generate a unique case fingerprint for deduplication
 * Uses incident details to detect potential duplicates
 */
function generateCaseFingerprint(caseData) {
    const {
        incidentDate,
        incidentLocation,
        survivorAge,
        gbvType,
        perpetratorInfo
    } = caseData;

    // Create a normalized fingerprint
    const parts = [
        incidentDate ? new Date(incidentDate).toISOString().split('T')[0] : '',
        (incidentLocation || '').toLowerCase().trim(),
        survivorAge ? String(survivorAge) : '',
        (gbvType || '').toLowerCase().trim()
    ].filter(Boolean);

    // Simple hash function
    const str = parts.join('|');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}

/**
 * Check if a case might be a duplicate
 * Returns potential duplicate cases with similarity score
 */
function findPotentialDuplicates(newCase) {
    const allCases = getAllUnifiedCases();
    const fingerprint = generateCaseFingerprint(newCase);
    
    const duplicates = allCases.filter(existingCase => {
        // Check fingerprint match
        if (existingCase.fingerprint === fingerprint) {
            return true;
        }

        // Check date + location match
        const sameDate = existingCase.incidentDate === newCase.incidentDate;
        const sameLocation = (existingCase.incidentLocation || '').toLowerCase() === 
                             (newCase.incidentLocation || '').toLowerCase();
        const ageMatch = Math.abs((existingCase.survivorAge || 0) - (newCase.survivorAge || 0)) <= 2;

        if (sameDate && sameLocation && ageMatch) {
            return true;
        }

        return false;
    });

    return duplicates;
}

/**
 * Save a new case to the unified system
 * Handles deduplication and cross-portal sync
 */
async function saveUnifiedCase(caseData, source = CASE_SOURCES.MINISTRY) {
    try {
        // Map frontend data to backend schema
        const apiData = {
            // Incident details
            incident_date: caseData.incidentDate || caseData.date || new Date().toISOString().split('T')[0],
            incident_description: caseData.incidentDescription || caseData.description || '',
            
            // Location
            district: caseData.district || caseData.survivorLocation || 'Western Area Urban',
            location_details: caseData.location || caseData.whereHappened || '',
            
            // Survivor info
            survivor_age_group: mapAgeToGroup(caseData.survivorAge),
            survivor_gender: caseData.survivorGender || 'Not Specified',
            survivor_marital_status: caseData.survivorMaritalStatus || null,
            survivor_disability: caseData.survivorDisability || null,
            
            // Perpetrator info
            perpetrator_relationship: caseData.perpetratorRelationship || null,
            perpetrator_info: caseData.perpetratorInfo || null,
            
            // Case management
            reported_by: caseData.survivorName || 'Anonymous',
            reporting_channel: mapSourceToChannel(source),
            priority_level: caseData.urgentHelp === 'yes' ? 'high' : 'medium',
            
            // Services
            immediate_needs: caseData.urgentHelp === 'yes' ? 'urgent_support' : null,
            services_required: JSON.stringify([]),
            
            // Additional metadata
            violence_types: caseData.violenceTypes || ['Physical Violence']
        };

        // Submit to backend API
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to save case');
        }

        // Handle duplicate response
        if (result.duplicate) {
            console.warn('⚠️ Duplicate case detected:', result.case_number);
            
            // Also save to localStorage for backward compatibility
            saveToLocalStorage(caseData, source);
            
            return {
                success: true,
                isDuplicate: true,
                linkedToCaseId: result.case_number,
                message: result.message
            };
        }

        // Success - also save to localStorage for backward compatibility
        caseData.caseId = result.case_number;
        caseData.source = source;
        caseData.createdAt = new Date().toISOString();
        saveToLocalStorage(caseData, source);

        console.log('✅ Case saved successfully:', result.case_number);

        // Trigger sync event for other portals to update
        window.dispatchEvent(new CustomEvent('caseSynced', { 
            detail: { caseId: result.case_number, source: source }
        }));

        return {
            success: true,
            isDuplicate: false,
            caseId: result.case_number,
            message: result.message || 'Case saved successfully'
        };

    } catch (error) {
        console.error('❌ Error saving case:', error);
        
        // Fallback to localStorage if API fails
        try {
            console.log('⚠️ API failed, saving to localStorage as backup...');
            caseData.caseId = caseData.caseId || generateCaseId(source);
            saveToLocalStorage(caseData, source);
            
            return {
                success: true,
                isDuplicate: false,
                caseId: caseData.caseId,
                message: 'Case saved locally (offline mode)'
            };
        } catch (localError) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

/**
 * Helper: Map age to age group
 */
function mapAgeToGroup(age) {
    if (!age) return '18-25';
    const ageNum = parseInt(age);
    if (ageNum < 11) return '0-10';
    if (ageNum < 16) return '11-15';
    if (ageNum < 18) return '16-17';
    if (ageNum < 26) return '18-25';
    if (ageNum < 36) return '26-35';
    return '36+';
}

/**
 * Helper: Map source to reporting channel
 */
function mapSourceToChannel(source) {
    const channelMap = {
        [CASE_SOURCES.MINISTRY]: 'web_portal',
        [CASE_SOURCES.POLICE]: 'police',
        [CASE_SOURCES.RAINBO]: 'health_facility',
        [CASE_SOURCES.SURVIVOR]: 'survivor_portal',
        [CASE_SOURCES.COMMUNITY]: 'community_worker',
        [CASE_SOURCES.HOTLINE]: 'hotline'
    };
    return channelMap[source] || 'web_portal';
}

/**
 * Helper: Save to localStorage for backward compatibility
 */
function saveToLocalStorage(caseData, source) {
    // Add metadata
    caseData.source = source;
    if (!caseData.createdAt) {
        caseData.createdAt = new Date().toISOString();
    }
    caseData.updatedAt = new Date().toISOString();

    // Get all cases
    const allCases = getAllUnifiedCases();
    
    // Add new case if not already exists
    const existingIndex = allCases.findIndex(c => c.caseId === caseData.caseId);
    if (existingIndex === -1) {
        allCases.push(caseData);
    } else {
        allCases[existingIndex] = caseData;
    }

    // Save to localStorage
    localStorage.setItem(UNIFIED_CASES_KEY, JSON.stringify(allCases));

    // Update index for faster lookups
    updateCaseIndex(caseData);
}

/**
 * Update an existing case
 */
function updateUnifiedCase(caseData) {
    try {
        const allCases = getAllUnifiedCases();
        const index = allCases.findIndex(c => c.caseId === caseData.caseId);

        if (index === -1) {
            throw new Error('Case not found');
        }

        // Update timestamp
        caseData.updatedAt = new Date().toISOString();

        // Replace the case
        allCases[index] = caseData;

        // Save
        localStorage.setItem(UNIFIED_CASES_KEY, JSON.stringify(allCases));

        console.log('✅ Case updated successfully:', caseData.caseId);

        // Trigger sync event
        window.dispatchEvent(new CustomEvent('caseSynced', { 
            detail: { caseId: caseData.caseId, action: 'update' }
        }));

        return { success: true };

    } catch (error) {
        console.error('❌ Error updating case:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get all unified cases
 */
function getAllUnifiedCases() {
    try {
        const casesJson = localStorage.getItem(UNIFIED_CASES_KEY);
        return casesJson ? JSON.parse(casesJson) : [];
    } catch (error) {
        console.error('Error loading unified cases:', error);
        return [];
    }
}

/**
 * Get cases by source
 */
function getCasesBySource(source) {
    const allCases = getAllUnifiedCases();
    return allCases.filter(c => c.source === source);
}

/**
 * Get a specific case by ID
 */
function getCaseById(caseId) {
    const allCases = getAllUnifiedCases();
    return allCases.find(c => c.caseId === caseId);
}

/**
 * Get cases by district
 */
function getCasesByDistrict(districtName) {
    const allCases = getAllUnifiedCases();
    return allCases.filter(c => 
        (c.incidentLocation || '').toLowerCase() === districtName.toLowerCase() ||
        (c.district || '').toLowerCase() === districtName.toLowerCase()
    );
}

/**
 * Get cases by date range
 */
function getCasesByDateRange(startDate, endDate) {
    const allCases = getAllUnifiedCases();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allCases.filter(c => {
        const caseDate = new Date(c.incidentDate || c.createdAt);
        return caseDate >= start && caseDate <= end;
    });
}

/**
 * Get case statistics
 */
function getCaseStatistics() {
    const allCases = getAllUnifiedCases();

    const stats = {
        total: allCases.length,
        bySource: {},
        byStatus: {},
        byDistrict: {},
        byMonth: {},
        duplicatesLinked: 0
    };

    allCases.forEach(c => {
        // By source
        stats.bySource[c.source] = (stats.bySource[c.source] || 0) + 1;

        // By status
        stats.byStatus[c.status] = (stats.byStatus[c.status] || 0) + 1;

        // By district
        const district = c.incidentLocation || c.district || 'Unknown';
        stats.byDistrict[district] = (stats.byDistrict[district] || 0) + 1;

        // By month
        const date = new Date(c.incidentDate || c.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        stats.byMonth[monthKey] = (stats.byMonth[monthKey] || 0) + 1;

        // Count duplicates linked
        if (c.crossReferences && c.crossReferences.length > 0) {
            stats.duplicatesLinked += c.crossReferences.length;
        }
    });

    return stats;
}

/**
 * Generate case ID based on source
 */
function generateCaseId(source) {
    const prefix = {
        [CASE_SOURCES.MINISTRY]: 'MIN',
        [CASE_SOURCES.POLICE]: 'POL',
        [CASE_SOURCES.RAINBO]: 'RNB',
        [CASE_SOURCES.SURVIVOR]: 'GBV',
        [CASE_SOURCES.COMMUNITY]: 'COM',
        [CASE_SOURCES.HOTLINE]: 'HOT'
    };

    const sourcePrefix = prefix[source] || 'GBV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();

    return `${sourcePrefix}-${timestamp}-${random}`;
}

/**
 * Update case index for faster lookups
 */
function updateCaseIndex(caseData) {
    try {
        const indexJson = localStorage.getItem(CASE_INDEX_KEY);
        const index = indexJson ? JSON.parse(indexJson) : {};

        // Index by fingerprint
        if (!index.byFingerprint) index.byFingerprint = {};
        index.byFingerprint[caseData.fingerprint] = caseData.caseId;

        // Index by district
        if (!index.byDistrict) index.byDistrict = {};
        const district = caseData.incidentLocation || caseData.district || 'Unknown';
        if (!index.byDistrict[district]) index.byDistrict[district] = [];
        index.byDistrict[district].push(caseData.caseId);

        // Save index
        localStorage.setItem(CASE_INDEX_KEY, JSON.stringify(index));

    } catch (error) {
        console.error('Error updating case index:', error);
    }
}

/**
 * Migrate existing cases to unified system
 * Run this once to import old cases from different storage locations
 */
function migrateExistingCases() {
    try {
        console.log('🔄 Starting case migration...');

        // Migrate survivor reports
        const survivorReports = localStorage.getItem('survivor_reports');
        if (survivorReports) {
            const reports = JSON.parse(survivorReports);
            reports.forEach(report => {
                const unifiedCase = {
                    caseId: report.caseNumber,
                    source: CASE_SOURCES.SURVIVOR,
                    incidentDate: report.incidentDate,
                    incidentLocation: report.incidentLocation,
                    incidentDescription: report.incidentDescription,
                    survivorAge: report.survivorAge,
                    survivorName: report.survivorName || 'Anonymous',
                    survivorPhone: report.survivorPhone,
                    perpetratorInfo: report.perpetratorInfo,
                    injuries: report.injuries,
                    medicalAttention: report.medicalAttention,
                    policeReport: report.policeReport,
                    urgentHelp: report.urgentHelp,
                    hasAudioRecording: report.hasAudioRecording,
                    language: report.language,
                    status: 'pending',
                    createdAt: report.submittedAt,
                    fingerprint: generateCaseFingerprint(report)
                };

                // Check if not already migrated
                if (!getCaseById(unifiedCase.caseId)) {
                    const allCases = getAllUnifiedCases();
                    allCases.push(unifiedCase);
                    localStorage.setItem(UNIFIED_CASES_KEY, JSON.stringify(allCases));
                }
            });
        }

        console.log('✅ Case migration complete');
        console.log('📊 Total unified cases:', getAllUnifiedCases().length);

    } catch (error) {
        console.error('❌ Error during migration:', error);
    }
}

/**
 * Sync cases with backend API (when available)
 */
async function syncWithBackend() {
    try {
        console.log('🔄 Syncing with backend...');

        const localCases = getAllUnifiedCases();
        const unsyncedCases = localCases.filter(c => !c.syncedToBackend);

        if (unsyncedCases.length === 0) {
            console.log('✅ All cases already synced');
            return;
        }

        // Send to backend API
        const response = await fetch('/api/cases/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cases: unsyncedCases })
        });

        if (response.ok) {
            // Mark cases as synced
            unsyncedCases.forEach(c => {
                c.syncedToBackend = true;
                c.syncedAt = new Date().toISOString();
                updateUnifiedCase(c);
            });

            console.log('✅ Synced', unsyncedCases.length, 'cases to backend');
        }

    } catch (error) {
        console.log('⚠️ Backend sync failed (will retry):', error.message);
    }
}

/**
 * Clear all unified cases (admin only - use with caution)
 */
function clearAllCases() {
    if (confirm('⚠️ WARNING: This will delete ALL unified cases. Are you absolutely sure?')) {
        if (confirm('This action cannot be undone. Click OK to proceed.')) {
            localStorage.removeItem(UNIFIED_CASES_KEY);
            localStorage.removeItem(CASE_INDEX_KEY);
            console.log('🗑️ All cases cleared');
            window.dispatchEvent(new CustomEvent('casesCleared'));
        }
    }
}

/**
 * Export cases for backup
 */
function exportCasesBackup() {
    const allCases = getAllUnifiedCases();
    const stats = getCaseStatistics();

    const backup = {
        exportDate: new Date().toISOString(),
        totalCases: allCases.length,
        statistics: stats,
        cases: allCases
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `gbv-cases-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    console.log('✅ Cases exported:', allCases.length, 'cases');
}

// Auto-migrate on first load
window.addEventListener('DOMContentLoaded', () => {
    const hasMigrated = localStorage.getItem('cases_migrated');
    if (!hasMigrated) {
        migrateExistingCases();
        localStorage.setItem('cases_migrated', 'true');
    }

    // Auto-sync every 5 minutes (if backend available)
    setInterval(syncWithBackend, 5 * 60 * 1000);
});

// Export functions
window.MINISTRY_COLORS = MINISTRY_COLORS;
window.CASE_SOURCES = CASE_SOURCES;
window.saveUnifiedCase = saveUnifiedCase;
window.updateUnifiedCase = updateUnifiedCase;
window.getAllUnifiedCases = getAllUnifiedCases;
window.getCasesBySource = getCasesBySource;
window.getCaseById = getCaseById;
window.getCasesByDistrict = getCasesByDistrict;
window.getCasesByDateRange = getCasesByDateRange;
window.getCaseStatistics = getCaseStatistics;
window.findPotentialDuplicates = findPotentialDuplicates;
window.migrateExistingCases = migrateExistingCases;
window.syncWithBackend = syncWithBackend;
window.exportCasesBackup = exportCasesBackup;
window.clearAllCases = clearAllCases;
