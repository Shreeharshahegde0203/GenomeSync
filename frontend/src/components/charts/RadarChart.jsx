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

  return (
    <div className="w-full">
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

export default RadarChart;
