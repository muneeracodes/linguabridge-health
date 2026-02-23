import { useState } from 'react';

interface IntakePanelProps {
  onAnalyze: (text: string) => void;
  loading: boolean;
}

export default function IntakePanel({ onAnalyze, loading }: IntakePanelProps) {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Intake</h2>
      
      <div className="flex-1 flex flex-col gap-4">
        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Narrative (Urdu/English)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Apni problem batain..."
          className="w-full flex-1 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-4 focus:ring-medical-light transition-all resize-none shadow-sm text-gray-800 text-lg leading-relaxed bg-gray-50/50"
        />
        
        <div className="flex items-center justify-between mt-4">
          <button className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors shadow-sm cursor-pointer">
            🎤 
          </button>
          <button
            onClick={() => onAnalyze(text)}
            disabled={loading || !text}
            className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-md shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Generate Clinical Note'}
          </button>
        </div>
      </div>
    </div>
  );
}