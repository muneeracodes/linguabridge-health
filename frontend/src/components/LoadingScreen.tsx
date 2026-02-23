import { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing clinical narrative...",
  "Mapping regional idioms...",
  "Structuring clinical data...",
  "Generating Explainable AI summary..."
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through messages every 800ms
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 800);

    // Smoothly animate the progress bar to 100% over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans p-6">
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-8">
        
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 bg-[#2ccb96] rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#2ccb96]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Cycling Text */}
        <div className="h-8">
          <p className="text-[#1e3a8a] font-semibold text-lg animate-fade-in transition-opacity duration-300">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-[#2ccb96] h-2.5 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
      </div>
    </div>
  );
}