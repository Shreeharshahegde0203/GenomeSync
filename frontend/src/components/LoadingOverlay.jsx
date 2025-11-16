import React from 'react';

const LoadingOverlay = ({ status, darkMode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        {/* DNA Helix Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-8 border-genome-a border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-8 border-genome-b border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              🧬
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {status || 'Processing...'}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-genome-a rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-genome-b rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-genome-a rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
