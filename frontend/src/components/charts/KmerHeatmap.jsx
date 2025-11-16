import React from 'react';
import Plot from 'react-plotly.js';

const KmerHeatmap = ({ genomeA, genomeB, darkMode }) => {
  // Get top 50 k-mers by combined frequency
  const allKmers = new Set([
    ...Object.keys(genomeA.kmer_freq),
    ...Object.keys(genomeB.kmer_freq)
  ]);

  // Calculate total counts for normalization
  const totalA = Object.values(genomeA.kmer_freq).reduce((sum, val) => sum + val, 0);
  const totalB = Object.values(genomeB.kmer_freq).reduce((sum, val) => sum + val, 0);

  // Calculate frequencies and differences
  const kmerData = Array.from(allKmers).map(kmer => {
    const freqA = ((genomeA.kmer_freq[kmer] || 0) / totalA) * 100;
    const freqB = ((genomeB.kmer_freq[kmer] || 0) / totalB) * 100;
    const diff = freqA - freqB;
    const avgFreq = (freqA + freqB) / 2;
    
    return { kmer, freqA, freqB, diff, avgFreq };
  });

  // Sort by average frequency and take top 50
  const top50 = kmerData
    .sort((a, b) => b.avgFreq - a.avgFreq)
    .slice(0, 50);

  // Prepare data for heatmap
  const kmers = top50.map(d => d.kmer);
  const differences = top50.map(d => [d.diff]); // 2D array for heatmap

  // Create hover text
  const hoverText = top50.map(d => 
    `K-mer: ${d.kmer}<br>` +
    `Genome A: ${d.freqA.toFixed(3)}%<br>` +
    `Genome B: ${d.freqB.toFixed(3)}%<br>` +
    `Difference: ${d.diff > 0 ? '+' : ''}${d.diff.toFixed(3)}%`
  );

  const data = [{
    z: differences,
    y: kmers,
    x: ['Frequency Diff'],
    type: 'heatmap',
    colorscale: [
      [0, '#1E40AF'],      // Deep Blue (more in A)
      [0.5, '#F3F4F6'],    // White (equal)
      [1, '#F97316']       // Orange (more in B)
    ],
    zmid: 0,
    text: hoverText.map(t => [t]),
    hovertemplate: '%{text}<extra></extra>',
    colorbar: {
      title: {
        text: 'Diff (%)',
        side: 'right',
        font: {
          color: darkMode ? '#F3F4F6' : '#1F2937',
          size: 11
        }
      },
      tickfont: {
        color: darkMode ? '#9CA3AF' : '#6B7280',
        size: 10
      },
      len: 0.7,
      thickness: 15
    }
  }];

  const layout = {
    xaxis: {
      visible: false
    },
    yaxis: {
      tickfont: {
        color: darkMode ? '#F3F4F6' : '#1F2937',
        size: 9,
        family: 'monospace'
      },
      automargin: true
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 20, b: 20, l: 60, r: 80 },
    height: 400
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'zoom2d', 'pan2d']
  };

  // Generate summary insights
  const generateSummary = () => {
    const enrichedInA = top50.filter(d => d.diff > 0.01).length;
    const enrichedInB = top50.filter(d => d.diff < -0.01).length;
    const similar = top50.length - enrichedInA - enrichedInB;
    const maxDiff = Math.max(...top50.map(d => Math.abs(d.diff)));
    const mostDifferent = top50.find(d => Math.abs(d.diff) === maxDiff);
    
    let interpretation = '';
    if (enrichedInA > enrichedInB * 1.5) {
      interpretation = 'Genome A shows distinct k-mer signature - may indicate different codon usage or repeat patterns.';
    } else if (enrichedInB > enrichedInA * 1.5) {
      interpretation = 'Genome B has unique sequence composition - suggests divergent evolutionary pressures.';
    } else if (similar > top50.length * 0.6) {
      interpretation = 'High k-mer similarity indicates closely related genomes or similar functional constraints.';
    } else {
      interpretation = 'Balanced k-mer differences suggest moderate genomic divergence.';
    }
    
    return {
      enrichedInA,
      enrichedInB,
      similar,
      mostDifferent,
      interpretation
    };
  };
  
  const summary = generateSummary();

  return (
    <div className="w-full">
      <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Top 50 most frequent 4-mers • <span className="text-blue-600 font-semibold">Blue</span> = More in A • <span className="text-orange-600 font-semibold">Orange</span> = More in B
      </div>
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
      
      {/* AI Summary */}
      <div className={`mt-4 p-4 rounded-xl border ${
        darkMode 
          ? 'bg-gradient-to-r from-blue-500/10 to-orange-500/10 border-blue-500/30' 
          : 'bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">🧬</div>
          <div className="flex-1">
            <h4 className={`text-sm font-bold mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              K-mer Analysis Summary
            </h4>
            <p className={`text-xs leading-relaxed mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {summary.interpretation}
            </p>
            <div className="flex gap-4 text-xs">
              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                <strong>{summary.enrichedInA}</strong> enriched in A
              </span>
              <span className={darkMode ? 'text-orange-400' : 'text-orange-600'}>
                <strong>{summary.enrichedInB}</strong> enriched in B
              </span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                <strong>{summary.similar}</strong> similar
              </span>
            </div>
            {summary.mostDifferent && (
              <div className={`mt-2 text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Most different: <span className="font-mono font-bold">{summary.mostDifferent.kmer}</span> (Δ{Math.abs(summary.mostDifferent.diff).toFixed(3)}%)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KmerHeatmap;
