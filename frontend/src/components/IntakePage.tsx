import { useState, useRef, useEffect } from 'react';

interface IntakePageProps {
  onBack: () => void;
  onGenerate: (text: string) => void;
  loading: boolean;
}

export default function IntakePage({ onBack, onGenerate, loading }: IntakePageProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup recognition if component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    // Initialize Web Speech API
    // We cast window as any to bypass strict TypeScript checks for browser APIs
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try using Google Chrome for the demo.");
      return;
    }

    const recognition = new SpeechRecognition();
    
    // Set to Urdu (Pakistan) which surprisingly handles Urdu-English code-mixing very well!
    recognition.lang = 'ur-PK'; 
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      
      if (finalTranscript) {
        // Append the new spoken words to whatever is already in the text box
        setText((prev) => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-white px-6 py-5 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="w-1.5 h-6 bg-[#008f8f] rounded-full"></div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">New Patient Intake</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl space-y-6">
          
          {/* Voice Input Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center relative transition-all duration-300">
            <div className="absolute top-6 left-6 flex items-center gap-2 text-[#008f8f] font-semibold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
              </svg>
              Speak in Urdu or English
            </div>
            
            <button 
              onClick={toggleRecording}
              className={`mt-12 mb-4 w-28 h-28 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
                isRecording 
                  ? 'bg-red-500 animate-pulse shadow-red-500/40 scale-110' 
                  : 'bg-[#2ccb96] shadow-[#2ccb96]/30 hover:scale-105'
              }`}
            >
              {isRecording ? (
                // Stop/Square Icon when recording
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                // Mic Icon when idle
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              )}
            </button>
            <p className={`text-sm font-bold transition-colors ${isRecording ? 'text-red-500' : 'text-gray-400'}`}>
              {isRecording ? 'Listening... Tap to stop' : 'Tap to start recording'}
            </p>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center">
             <span className="bg-[#f1f5f9] text-gray-400 text-xs font-bold px-5 py-2 rounded-full tracking-wider">
               OR
             </span>
          </div>

          {/* Text Input Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Type your symptoms</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Doctor sahab chest heavy lagta hai jab tez chalun..."
              className="w-full h-32 bg-[#f8fafc] rounded-2xl p-5 border border-transparent focus:border-medical-blue focus:ring-2 focus:ring-medical-light resize-none text-gray-800 text-lg placeholder-gray-400 outline-none transition-all"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={() => onGenerate(text)}
            disabled={loading || !text.trim()}
            className="w-full bg-[#1e3a8a] text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Generate Clinical Summary'}
          </button>
          
        </div>
      </main>
    </div>
  );
}