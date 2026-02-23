interface WelcomePageProps {
  onContinue: () => void;
}

export default function WelcomePage({ onContinue }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#eff6ff] flex flex-col items-center justify-center font-sans px-4">
      
      {/* Logo Container with Soft Glow */}
      <div className="relative mb-8 group cursor-pointer">
        <div className="absolute inset-0 bg-medical-blue rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="relative w-28 h-28 bg-[#284f9e] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
          {/* Stethoscope SVG */}
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2.5" />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div className="text-center max-w-lg mb-12 space-y-4">
        <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight">
          LinguaBridge Health
        </h1>
        <p className="text-lg text-[#64748b] font-medium leading-relaxed">
          The AI clinical intake engine built for how patients actually speak.
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={onContinue}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#254ea0] text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#1e3a8a] transition-all active:scale-95"
      >
        <span>Continue</span>
        <svg 
          className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

    </div>
  );
}