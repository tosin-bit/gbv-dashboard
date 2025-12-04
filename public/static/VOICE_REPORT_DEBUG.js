// VOICE REPORT DEBUG - Ultra-verbose debugging
console.log('🔍 VOICE REPORT DEBUG Loading...');

// Log when voice-recording.js loads
console.log('🔍 Checking for loadVoiceReport function...');
console.log('🔍 typeof loadVoiceReport:', typeof loadVoiceReport);
console.log('🔍 typeof window.loadVoiceReport:', typeof window.loadVoiceReport);

// Monitor the voice-report section
setInterval(() => {
    const section = document.getElementById('voice-report-section');
    if (section) {
        const isHidden = section.classList.contains('hidden');
        const contentLength = section.innerHTML.length;
        
        if (!isHidden) {
            console.log('🔍 Voice Report section is VISIBLE');
            console.log('🔍 Content length:', contentLength);
            console.log('🔍 Content preview:', section.innerHTML.substring(0, 200));
        }
    }
}, 2000);

// Override loadVoiceReport with debugging version
setTimeout(() => {
    if (typeof window.loadVoiceReport === 'function') {
        console.log('✅ Found loadVoiceReport, creating debug wrapper');
        
        const original = window.loadVoiceReport;
        window.loadVoiceReport = function(section) {
            console.log('🔍 DEBUG: loadVoiceReport called');
            console.log('🔍 DEBUG: Section passed:', section);
            console.log('🔍 DEBUG: Section ID:', section?.id);
            console.log('🔍 DEBUG: Section exists in DOM:', document.body.contains(section));
            
            if (!section) {
                console.error('🔍 DEBUG: NO SECTION PROVIDED!');
                section = document.getElementById('voice-report-section');
                console.log('🔍 DEBUG: Fallback section found:', section);
            }
            
            console.log('🔍 DEBUG: Calling original function...');
            const result = original(section);
            
            console.log('🔍 DEBUG: Original function completed');
            console.log('🔍 DEBUG: Result:', result);
            console.log('🔍 DEBUG: Section innerHTML length after:', section?.innerHTML?.length);
            
            // Check if content was added
            setTimeout(() => {
                if (section) {
                    console.log('🔍 DEBUG: Final content length:', section.innerHTML.length);
                    if (section.innerHTML.length < 100) {
                        console.error('🔍 DEBUG: CONTENT NOT LOADED - Section is nearly empty!');
                        console.log('🔍 DEBUG: Actual content:', section.innerHTML);
                    } else {
                        console.log('✅ DEBUG: Content successfully loaded');
                    }
                }
            }, 200);
            
            return result;
        };
        
        console.log('✅ Debug wrapper installed');
    } else {
        console.error('❌ loadVoiceReport function not found!');
    }
}, 500);

console.log('✅ Voice Report Debug initialized');
