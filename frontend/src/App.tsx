import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import IntakePage from './components/IntakePage';
import LoadingScreen from './components/LoadingScreen';
import DashboardPanel from './components/DashboardPanel';
import SoapNotePage from './components/SoapNotePage';
import type { AssessmentData } from './types';

// Added 'soap' to the view states
type ViewState = 'welcome' | 'intake' | 'loading' | 'dashboard' | 'soap';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('welcome');
  const [results, setResults] = useState<AssessmentData | null>(null);
  
  const handleAnalyze = async (text: string) => {
    setCurrentView('loading');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/intake/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_text: text })
      });
      
      const data = await response.json();
      setResults(data);
      setCurrentView('dashboard');
      
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Make sure your Python backend is running!");
      setCurrentView('intake');
    }
  };

  if (currentView === 'welcome') {
    return <WelcomePage onContinue={() => setCurrentView('intake')} />;
  }

  if (currentView === 'intake') {
    return (
      <IntakePage 
        onBack={() => setCurrentView('welcome')} 
        onGenerate={handleAnalyze} 
        loading={false} 
      />
    );
  }

if (currentView === 'loading') {
    return <LoadingScreen />;
  }
  if (currentView === 'dashboard' && results) {
    return (
      <DashboardPanel 
        data={results} 
        onBack={() => setCurrentView('intake')}
        onExportSoap={() => setCurrentView('soap')} // Transition to SOAP page
      />
    );
  }

  
  if (currentView === 'soap' && results) {
    return (
      <SoapNotePage 
        data={results}
        onBack={() => setCurrentView('dashboard')} // Goes back to the Dashboard
      />
    );
  }

  return null;
}

export default App;