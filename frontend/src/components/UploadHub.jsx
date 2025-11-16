import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UploadHub = ({ onAnalysisStart, onAnalysisComplete, onStatusUpdate, darkMode, toggleTheme }) => {
  const [genomeA, setGenomeA] = useState(null);
  const [genomeB, setGenomeB] = useState(null);
  const [error, setError] = useState('');

  const createDropzone = (onDropCallback, genome, label) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onDropCallback,
      accept: {
        'text/plain': ['.fasta', '.fa', '.fna']
      },
      maxFiles: 1,
      multiple: false
    });

    return (
      <div
        {...getRootProps()}
        className={`
          relative w-full h-64 rounded-3xl cursor-pointer group
          transition-all duration-300 transform hover:scale-105
          ${darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'}
          ${isDragActive ? 'ring-4 scale-105' : ''}
          ${label === 'A' 
            ? (isDragActive ? 'ring-blue-400 border-blue-400' : 'border-2 border-blue-500/30 hover:border-blue-400/60')
            : (isDragActive ? 'ring-green-400 border-green-400' : 'border-2 border-green-500/30 hover:border-green-400/60')
          }
          ${genome ? 'border-green-500 border-2 shadow-green-500/30 shadow-xl' : ''}
          hover:shadow-2xl
        `}
      >
        {/* Glow effect on hover */}
        <div className={`absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity ${
          label === 'A' 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-green-500 to-emerald-500'
        }`} />
        
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 relative z-10">
          {!genome ? (
            <>
              <div className={`text-7xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                darkMode ? (label === 'A' ? 'text-blue-400' : 'text-green-400') : 'text-gray-600'
              }`}>
                {label === 'A' ? '🧬' : '🔬'}
              </div>
              <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${
                label === 'A' 
                  ? 'from-blue-400 to-cyan-400' 
                  : 'from-green-400 to-emerald-400'
              } bg-clip-text text-transparent`}>
                Genome {label}
              </h3>
              <p className={`text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {isDragActive ? '🎯 Drop it here!' : '📂 Drag & drop or click'}
              </p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Supported: .fasta, .fa, .fna
              </p>
              
              {/* Upload indicator */}
              <div className={`mt-4 flex gap-2 ${
                isDragActive ? 'opacity-100' : 'opacity-50'
              } transition-opacity`}>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </>
          ) : (
            <>
              <div className="text-7xl mb-4 animate-bounce">✅</div>
              <h3 className={`text-xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {genome.name}
              </h3>
              <div className={`px-4 py-2 rounded-full mb-4 ${
                label === 'A'
                  ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
                  : 'bg-green-500/20 border border-green-400/40 text-green-300'
              }`}>
                💾 {(genome.size / 1024).toFixed(2)} KB
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  label === 'A' ? setGenomeA(null) : setGenomeB(null);
                }}
                className="px-6 py-2 rounded-full bg-red-500/20 border-2 border-red-400/40 text-red-300 hover:bg-red-500/40 hover:border-red-400 transition-all transform hover:scale-105 font-semibold"
              >
                ❌ Remove
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const onDropA = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setGenomeA(acceptedFiles[0]);
      setError('');
    }
  }, []);

  const onDropB = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setGenomeB(acceptedFiles[0]);
      setError('');
    }
  }, []);

  const handleAnalyze = async () => {
    if (!genomeA || !genomeB) {
      setError('Please upload both genome files');
      return;
    }

    try {
      setError('');
      onAnalysisStart();
      
      const formData = new FormData();
      formData.append('genome_a', genomeA);
      formData.append('genome_b', genomeB);

      // Simulate status updates
      onStatusUpdate('Uploading files...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onStatusUpdate('Calculating GC content...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onStatusUpdate('Profiling 4-mers...');
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onStatusUpdate('Building dashboard...');
      await new Promise(resolve => setTimeout(resolve, 500));

      onAnalysisComplete(response.data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.detail || 'Analysis failed. Please check your files and try again.');
      onStatusUpdate('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated DNA Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="dna-helix" />
      </div>
      
      {/* Floating Molecules */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)'
                : 'radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent)'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full ${
                darkMode 
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                  : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              } transition-all transform hover:scale-110`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <div className="mb-4">
            <div className="text-7xl mb-4 inline-block animate-bounce">🧬</div>
          </div>
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
            GenomeSync
          </h1>
          <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Advanced Differential Genomics Analysis
          </p>
          <div className="flex items-center justify-center gap-2 text-sm mb-4">
            <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300">
              ⚡ FastAPI
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/40 text-green-300">
              🧬 Biopython
            </div>
            <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300">
              📈 Plotly
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
            <div className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>×</div>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
          </div>
        </div>

        {/* Upload Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {createDropzone(onDropA, genomeA, 'A')}
          {createDropzone(onDropB, genomeB, 'B')}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!genomeA || !genomeB}
            className={`
              relative px-12 py-4 rounded-full text-xl font-bold overflow-visible
              transition-all duration-300 transform
              ${genomeA && genomeB
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white hover:scale-110 hover:shadow-2xl'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {/* Animated glow effect when ready */}
            {genomeA && genomeB && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full blur-md opacity-50 animate-pulse" />
            )}
            <span className="relative z-10">🚀 Analyze Genomes</span>
          </button>
        </div>

        {/* Info Footer */}
        <div className={`mt-12 text-center animate-fade-in`}>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className={`px-4 py-2 rounded-full border ${
              darkMode 
                ? 'bg-blue-500/10 border-blue-400/30 text-blue-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <span className="font-semibold">🧬 FASTA Upload</span>
            </div>
            <div className={`px-4 py-2 rounded-full border ${
              darkMode 
                ? 'bg-purple-500/10 border-purple-400/30 text-purple-300'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <span className="font-semibold">📊 8+ Metrics</span>
            </div>
            <div className={`px-4 py-2 rounded-full border ${
              darkMode 
                ? 'bg-green-500/10 border-green-400/30 text-green-300'
                : 'bg-green-50 border-green-200 text-green-700'
            }`}>
              <span className="font-semibold">⚡ Real-time</span>
            </div>
          </div>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Powered by Biopython • FastAPI • React • Plotly.js
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadHub;
