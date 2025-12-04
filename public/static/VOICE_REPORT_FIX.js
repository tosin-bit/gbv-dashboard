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
    
    // Store original function
    const originalLoadVoiceReport = window.loadVoiceReport;
    
    // Override with enhanced version
    window.loadVoiceReport = function(section) {
        console.log('🎤 Loading Voice Report interface...');
        console.log('🎤 Section element:', section);
        console.log('🎤 Section ID:', section?.id);
        
        if (!section) {
            console.error('❌ No section element provided to loadVoiceReport');
            // Try to find the section
            section = document.getElementById('voice-report-section');
            console.log('🎤 Found section from DOM:', section);
        }
        
        if (!section) {
            console.error('❌ Still no section element found');
            return;
        }
        
        try {
            console.log('🎤 Calling original loadVoiceReport...');
            originalLoadVoiceReport(section);
            console.log('✅ Voice Report loaded successfully');
            
            // Verify content was added
            setTimeout(() => {
                console.log('🎤 Section innerHTML length:', section.innerHTML.length);
                if (section.innerHTML.length < 100) {
                    console.error('❌ Section appears empty after loading');
                } else {
                    console.log('✅ Voice Report content verified');
                }
            }, 100);
        } catch (error) {
            console.error('❌ Error loading Voice Report:', error);
            console.error('❌ Error stack:', error.stack);
        }
    };
    
    console.log('✅ Voice Report function override complete');
});

console.log('✅ Voice Report Fix initialized');
