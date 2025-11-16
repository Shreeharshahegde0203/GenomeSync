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
      [0, '#3B82F6'],      // Blue (more in A)
      [0.5, '#F3F4F6'],    // White (equal)
      [1, '#10B981']       // Green (more in B)
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

  return (
    <div className="w-full">
      <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Top 50 most frequent 4-mers • Blue = More in A • Green = More in B
      </div>
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default KmerHeatmap;
