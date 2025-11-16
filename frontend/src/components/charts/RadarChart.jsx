import React from 'react';
import Plot from 'react-plotly.js';

const RadarChart = ({ genomeA, genomeB, normalized, darkMode }) => {
  const metrics = ['Size (bp)', 'GC %', 'AT %', 'N Count', 'CpG', 'Mol Weight', 'Tm (°C)'];
  
  const data = [
    {
      type: 'scatterpolar',
      r: [
        normalized.genome_a_normalized.size_bp,
        normalized.genome_a_normalized.gc_content,
        normalized.genome_a_normalized.at_content,
        normalized.genome_a_normalized.n_count,
        normalized.genome_a_normalized.cpg_count,
        normalized.genome_a_normalized.mol_weight,
        normalized.genome_a_normalized.tm_wallace
      ],
      theta: metrics,
      fill: 'toself',
      name: genomeA.filename,
      line: {
        color: '#3B82F6',
        width: 2
      },
      fillcolor: 'rgba(59, 130, 246, 0.3)',
      hovertemplate: '<b>%{theta}</b><br>' +
                     'Normalized: %{r:.3f}<br>' +
                     '<extra></extra>'
    },
    {
      type: 'scatterpolar',
      r: [
        normalized.genome_b_normalized.size_bp,
        normalized.genome_b_normalized.gc_content,
        normalized.genome_b_normalized.at_content,
        normalized.genome_b_normalized.n_count,
        normalized.genome_b_normalized.cpg_count,
        normalized.genome_b_normalized.mol_weight,
        normalized.genome_b_normalized.tm_wallace
      ],
      theta: metrics,
      fill: 'toself',
      name: genomeB.filename,
      line: {
        color: '#10B981',
        width: 2
      },
      fillcolor: 'rgba(16, 185, 129, 0.3)',
      hovertemplate: '<b>%{theta}</b><br>' +
                     'Normalized: %{r:.3f}<br>' +
                     '<extra></extra>'
    }
  ];

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1],
        gridcolor: darkMode ? '#374151' : '#E5E7EB',
        tickfont: {
          color: darkMode ? '#9CA3AF' : '#6B7280'
        }
      },
      angularaxis: {
        gridcolor: darkMode ? '#374151' : '#E5E7EB',
        tickfont: {
          color: darkMode ? '#F3F4F6' : '#1F2937',
          size: 11
        }
      },
      bgcolor: 'rgba(0,0,0,0)'
    },
    showlegend: true,
    legend: {
      x: 0.5,
      xanchor: 'center',
      y: -0.1,
      yanchor: 'top',
      orientation: 'h',
      font: {
        color: darkMode ? '#F3F4F6' : '#1F2937',
        size: 12
      },
      bgcolor: 'rgba(0,0,0,0)'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 40, b: 80, l: 80, r: 80 },
    height: 400
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d']
  };

  // Generate intelligent summary
  const generateSummary = () => {
    const gcDiff = Math.abs(genomeA.metrics.gc_content - genomeB.metrics.gc_content);
    const sizeDiff = Math.abs(genomeA.metrics.size_bp - genomeB.metrics.size_bp);
    const sizeRatio = Math.max(genomeA.metrics.size_bp, genomeB.metrics.size_bp) / Math.min(genomeA.metrics.size_bp, genomeB.metrics.size_bp);
    const tmDiff = Math.abs(genomeA.metrics.tm_wallace - genomeB.metrics.tm_wallace);
    
    let similarity = 'Highly similar';
    let interpretation = '';
    
    if (gcDiff < 2 && sizeRatio < 1.1) {
      similarity = 'Nearly identical';
      interpretation = 'Extremely similar genomic profiles - likely same species or very close strains.';
    } else if (gcDiff < 5 && sizeRatio < 1.3) {
      similarity = 'Closely related';
      interpretation = 'Similar composition and structure - possibly different strains or subspecies.';
    } else if (gcDiff < 15 && sizeRatio < 2) {
      similarity = 'Moderately different';
      interpretation = 'Notable differences in composition - may represent different species within same genus.';
    } else {
      similarity = 'Highly divergent';
      interpretation = 'Substantial genomic differences - likely distant evolutionary relationship.';
    }
    
    return { gcDiff, sizeDiff, tmDiff, similarity, interpretation };
  };
  
  const summary = generateSummary();

  return (
    <div className="w-full">
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
          ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30' 
          : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">📊</div>
          <div className="flex-1">
            <h4 className={`text-sm font-bold mb-2 ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Genomic Fingerprint Analysis
            </h4>
            <p className={`text-xs leading-relaxed mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span className="font-semibold">{summary.similarity}:</span> {summary.interpretation}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                GC Δ: <strong>{summary.gcDiff.toFixed(2)}%</strong>
              </div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Size Δ: <strong>{(summary.sizeDiff / 1000).toFixed(1)}kb</strong>
              </div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Tm Δ: <strong>{summary.tmDiff.toFixed(2)}°C</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
