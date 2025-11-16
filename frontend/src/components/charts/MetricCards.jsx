import React from 'react';

const MetricCards = ({ genomeA, genomeB, darkMode }) => {
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  const metrics = [
    { key: 'size_bp', label: 'Genome Size', unit: 'bp', format: formatNumber },
    { key: 'gc_content', label: 'GC Content', unit: '%', format: (v) => v.toFixed(2) },
    { key: 'at_content', label: 'AT Content', unit: '%', format: (v) => v.toFixed(2) },
    { key: 'n_count', label: 'Ambiguous Bases', unit: '', format: formatNumber },
    { key: 'cpg_count', label: 'CpG Dinucleotides', unit: '', format: formatNumber },
    { key: 'mol_weight', label: 'Molecular Weight', unit: 'Da', format: formatNumber },
    { key: 'tm_wallace', label: 'Melting Temp', unit: '°C', format: (v) => v.toFixed(1) }
  ];

  const MetricRow = ({ metric }) => {
    const valA = genomeA.metrics[metric.key];
    const valB = genomeB.metrics[metric.key];
    const isAHigher = valA > valB;
    const isEqual = valA === valB;

    return (
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100/50'} mb-2 hover:scale-[1.02] transition-transform`}>
        <div className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {metric.label}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`text-center p-2 rounded ${isAHigher && !isEqual ? 'bg-genome-a/20' : ''}`}>
            <div className="text-xs text-genome-a font-semibold mb-1">Genome A</div>
            <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {metric.format(valA)}
              {metric.unit && <span className="text-xs ml-1">{metric.unit}</span>}
            </div>
          </div>
          <div className={`text-center p-2 rounded ${!isAHigher && !isEqual ? 'bg-genome-b/20' : ''}`}>
            <div className="text-xs text-genome-b font-semibold mb-1">Genome B</div>
            <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {metric.format(valB)}
              {metric.unit && <span className="text-xs ml-1">{metric.unit}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Generate intelligent summary
  const generateSummary = () => {
    const gcDiff = Math.abs(genomeA.metrics.gc_content - genomeB.metrics.gc_content);
    const nCountA = genomeA.metrics.n_count;
    const nCountB = genomeB.metrics.n_count;
    const sizeRatio = Math.max(genomeA.metrics.size_bp, genomeB.metrics.size_bp) / 
                      Math.min(genomeA.metrics.size_bp, genomeB.metrics.size_bp);
    
    const biggerGenome = genomeA.metrics.size_bp > genomeB.metrics.size_bp ? 'A' : 'B';
    const sizeDiffPercent = ((sizeRatio - 1) * 100).toFixed(1);
    
    let qualityA = nCountA === 0 ? 'Perfect' : nCountA < 100 ? 'Excellent' : nCountA < 1000 ? 'Good' : 'Draft';
    let qualityB = nCountB === 0 ? 'Perfect' : nCountB < 100 ? 'Excellent' : nCountB < 1000 ? 'Good' : 'Draft';
    
    let mainInsight = '';
    if (sizeRatio > 2) {
      mainInsight = `Genome ${biggerGenome} is ${sizeDiffPercent}% larger - significant genomic expansion or assembly differences.`;
    } else if (gcDiff > 10) {
      mainInsight = `Large GC content difference (${gcDiff.toFixed(1)}%) indicates distinct evolutionary lineages or ecological niches.`;
    } else if (nCountA + nCountB > 5000) {
      mainInsight = `High ambiguous base count suggests draft assemblies - consider additional sequencing for improved resolution.`;
    } else if (gcDiff < 2 && sizeRatio < 1.1) {
      mainInsight = `Nearly identical metrics - highly similar genomes, likely same species or very close strains.`;
    } else {
      mainInsight = `Moderate differences across metrics - related but distinct genomic profiles.`;
    }
    
    return { qualityA, qualityB, mainInsight, biggerGenome, sizeDiffPercent };
  };
  
  const summary = generateSummary();

  return (
    <div className="w-full">
      {/* AI Summary at top */}
      <div className={`mb-4 p-4 rounded-xl border ${
        darkMode 
          ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30' 
          : 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">📊</div>
          <div className="flex-1">
            <h4 className={`text-sm font-bold mb-2 ${
              darkMode ? 'text-pink-300' : 'text-pink-700'
            }`}>
              Key Metrics Insight
            </h4>
            <p className={`text-xs leading-relaxed mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {summary.mainInsight}
            </p>
            <div className="flex gap-4 text-xs">
              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                Assembly Quality A: <strong>{summary.qualityA}</strong>
              </span>
              <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                Assembly Quality B: <strong>{summary.qualityB}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {metrics.map((metric) => (
          <MetricRow key={metric.key} metric={metric} />
        ))}
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#E5E7EB'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6B7280' : '#9CA3AF'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#9CA3AF' : '#6B7280'};
        }
      `}</style>
    </div>
  );
};

export default MetricCards;
