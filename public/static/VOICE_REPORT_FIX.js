// VOICE REPORT FIX - Ensure loadVoiceReport is called correctly
console.log('🎤 VOICE REPORT FIX Loading...');

// Wait for voice-recording.js to load
function waitForVoiceReport(callback) {
    if (typeof loadVoiceReport !== 'undefined') {
        console.log('✅ loadVoiceReport function found');
        callback();
    } else {
        console.log('⏳ Waiting for loadVoiceReport...');
        setTimeout(() => waitForVoiceReport(callback), 100);
    }
}

waitForVoiceReport(() => {
    console.log('✅ Voice Report system ready');
    
    // Override to add logging
    const originalLoadVoiceReport = window.loadVoiceReport;
    window.loadVoiceReport = function(section) {
        console.log('🎤 Loading Voice Report interface...');
        console.log('🎤 Section element:', section);
        
        if (!section) {
            console.error('❌ No section element provided to loadVoiceReport');
            return;
        }
        
        try {
            originalLoadVoiceReport(section);
            console.log('✅ Voice Report loaded successfully');
        } catch (error) {
            console.error('❌ Error loading Voice Report:', error);
        }
    };
});

console.log('✅ Voice Report Fix initialized');
