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

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {metrics.map((metric) => (
        <MetricRow key={metric.key} metric={metric} />
      ))}
      
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
