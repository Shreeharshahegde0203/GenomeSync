import React, { useState } from 'react';
import RadarChart from './charts/RadarChart';
import NucleotideBarChart from './charts/NucleotideBarChart';
import MetricCards from './charts/MetricCards';
import KmerHeatmap from './charts/KmerHeatmap';

const Dashboard = ({ data, darkMode, toggleTheme, onNewAnalysis }) => {
  const [selectedChart, setSelectedChart] = useState(null);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* DNA Helix Background Animation */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="dna-helix" />
      </div>
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className={`mb-8 p-8 rounded-3xl relative overflow-hidden ${
          darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'
        } animate-fade-in border-2 border-opacity-20 ${
          darkMode ? 'border-cyan-400' : 'border-blue-400'
        }`}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 animate-pulse" />
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl animate-bounce">🧬</div>
                <h1 className={`text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent`}>
                  Genomic Analysis Portal
                </h1>
              </div>
              <div className={`flex items-center gap-3 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="font-semibold">{data.genome_a.filename}</span>
                </div>
                <span className="text-xl">⚡</span>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold">{data.genome_b.filename}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
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
              
              <button
                onClick={onNewAnalysis}
                className={`px-6 py-3 rounded-full font-semibold ${
                  darkMode 
                    ? 'bg-gradient-to-r from-genome-a to-genome-b text-white hover:shadow-xl' 
                    : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-xl'
                } transition-all transform hover:scale-105`}
              >
                ↻ New Analysis
              </button>
            </div>
          </div>
        </div>

        {/* 2x2 Grid of Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Widget 1: Radar Chart */}
          <div 
            className={`rounded-3xl p-6 relative overflow-hidden group ${
              darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'
            } animate-slide-up transition-all hover:scale-[1.02] border-2 ${
              darkMode ? 'border-cyan-500/30 hover:border-cyan-400/50' : 'border-blue-400/30 hover:border-blue-500/50'
            } hover:shadow-2xl hover:shadow-cyan-500/20`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl animate-pulse">📊</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                  Genomic Fingerprint
                </h2>
              </div>
              <RadarChart 
                genomeA={data.genome_a}
                genomeB={data.genome_b}
                normalized={data.normalized_metrics}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Widget 2: Bar Chart */}
          <div 
            className={`rounded-3xl p-6 relative overflow-hidden group ${
              darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'
            } animate-slide-up transition-all hover:scale-[1.02] border-2 ${
              darkMode ? 'border-green-500/30 hover:border-green-400/50' : 'border-green-400/30 hover:border-green-500/50'
            } hover:shadow-2xl hover:shadow-green-500/20`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl animate-pulse">🧬</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent`}>
                  Nucleotide Distribution
                </h2>
              </div>
              <NucleotideBarChart 
                genomeA={data.genome_a}
                genomeB={data.genome_b}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Widget 3: Metric Cards */}
          <div 
            className={`rounded-3xl p-6 relative overflow-hidden group ${
              darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'
            } animate-slide-up transition-all hover:scale-[1.02] border-2 ${
              darkMode ? 'border-purple-500/30 hover:border-purple-400/50' : 'border-purple-400/30 hover:border-purple-500/50'
            } hover:shadow-2xl hover:shadow-purple-500/20`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl animate-pulse">📈</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                  Key Metrics
                </h2>
              </div>
              <MetricCards 
                genomeA={data.genome_a}
                genomeB={data.genome_b}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Widget 4: K-mer Heatmap */}
          <div 
            className={`rounded-3xl p-6 relative overflow-hidden group ${
              darkMode ? 'glass-morphism-enhanced' : 'glass-morphism-light'
            } animate-slide-up transition-all hover:scale-[1.02] border-2 ${
              darkMode ? 'border-orange-500/30 hover:border-orange-400/50' : 'border-orange-400/30 hover:border-orange-500/50'
            } hover:shadow-2xl hover:shadow-orange-500/20`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl animate-pulse">🔥</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent`}>
                  4-mer Frequency Heatmap
                </h2>
              </div>
              <KmerHeatmap 
                genomeA={data.genome_a}
                genomeB={data.genome_b}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>Analysis completed • All metrics calculated using Biopython</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
