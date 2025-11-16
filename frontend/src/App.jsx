import React, { useState, useEffect } from 'react';
import UploadHub from './components/UploadHub';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState('upload'); // 'upload' or 'dashboard'
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setView('dashboard');
    setIsLoading(false);
  };

  const handleNewAnalysis = () => {
    setView('upload');
    setAnalysisData(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gradient-to-br from-genome-dark via-slate-900 to-slate-800' : 'bg-gradient-to-br from-genome-light via-blue-50 to-green-50'
    }`}>
      {isLoading && <LoadingOverlay status={loadingStatus} darkMode={darkMode} />}
      
      {view === 'upload' && (
        <UploadHub 
          onAnalysisStart={() => setIsLoading(true)}
          onAnalysisComplete={handleAnalysisComplete}
          onStatusUpdate={setLoadingStatus}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      )}
      
      {view === 'dashboard' && analysisData && (
        <Dashboard 
          data={analysisData}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
    </div>
  );
}

export default App;
