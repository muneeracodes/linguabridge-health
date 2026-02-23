import type { AssessmentData } from '../types';

interface DashboardPanelProps {
  data: AssessmentData;
  onBack: () => void;
  onExportSoap: () => void; // New prop for navigating to the SOAP page
}

export default function DashboardPanel({ data, onBack, onExportSoap }: DashboardPanelProps) {
  
  // Handlers to make the secondary buttons functional for the demo
  const handleEdit = () => {
    alert("Edit Mode Activated: In a full release, this would unlock the text fields for manual physician overrides.");
  };

  const handleSave = () => {
    alert("Success! Patient record has been securely saved to the database.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans pb-10">
      
      {/* Header */}
      <header className="bg-white px-6 py-5 flex items-center gap-4 sticky top-0 z-10 shadow-sm animate-slide-up">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="w-1.5 h-6 bg-[#2563eb] rounded-full"></div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Structured Clinical Summary</h1>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        {/* Main Data Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6 animate-slide-up delay-100">
          <div className="border-b border-gray-100 pb-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Chief Complaint</h3>
            <p className="text-xl font-bold text-gray-900">{data.chiefComplaint}</p>
          </div>
          <div className="border-b border-gray-100 pb-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Onset</h3>
            <p className="text-lg font-bold text-gray-900">{data.onset}</p>
          </div>
          <div className="border-b border-gray-100 pb-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Associated Symptoms</h3>
            <p className="text-lg font-bold text-gray-900">{data.associatedSymptoms}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Clinical Phrase</h3>
            <p className="text-lg font-bold text-gray-900">{data.clinicalPhrase}</p>
          </div>
        </div>

        {/* Explainable AI Card */}
        <div className="bg-gradient-to-br from-[#e6fbf4] to-[#f0fdf9] rounded-[2rem] p-8 shadow-sm border border-[#bbf7d0] animate-slide-up delay-200">
          <div className="inline-flex items-center gap-2 bg-[#2ccb96] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Explainable AI Transformation
          </div>
          <p className="text-[#065f46] text-lg font-medium leading-relaxed">
            {data.explanation}
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex items-center justify-between pt-6 px-4 animate-slide-up delay-300">
          <button onClick={handleEdit} className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2563eb] transition-colors cursor-pointer">
            <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <span className="text-xs font-bold mt-1">Edit</span>
          </button>
          
          <button onClick={onExportSoap} className="bg-[#1e3a8a] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition-colors cursor-pointer active:scale-95 transform">
            Export SOAP
          </button>
          
          <button onClick={handleSave} className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2ccb96] transition-colors cursor-pointer">
            <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            </div>
            <span className="text-xs font-bold mt-1">Save</span>
          </button>
        </div>

      </main>
    </div>
  );
}