import React from 'react';
import Plot from 'react-plotly.js';

const NucleotideBarChart = ({ genomeA, genomeB, darkMode }) => {
  const nucleotides = ['A', 'T', 'C', 'G'];
  
  const data = [
    {
      x: nucleotides,
      y: nucleotides.map(n => genomeA.nucleotide_counts[n]),
      name: genomeA.filename,
      type: 'bar',
      marker: {
        color: '#3B82F6',
        line: {
          color: darkMode ? '#1E40AF' : '#2563EB',
          width: 2
        }
      },
      hovertemplate: '<b>%{x}</b><br>' +
                     'Count: %{y:,}<br>' +
                     '<extra>' + genomeA.filename + '</extra>'
    },
    {
      x: nucleotides,
      y: nucleotides.map(n => genomeB.nucleotide_counts[n]),
      name: genomeB.filename,
      type: 'bar',
      marker: {
        color: '#10B981',
        line: {
          color: darkMode ? '#047857' : '#059669',
          width: 2
        }
      },
      hovertemplate: '<b>%{x}</b><br>' +
                     'Count: %{y:,}<br>' +
                     '<extra>' + genomeB.filename + '</extra>'
    }
  ];

  const layout = {
    barmode: 'group',
    xaxis: {
      title: {
        text: 'Nucleotide',
        font: {
          color: darkMode ? '#F3F4F6' : '#1F2937',
          size: 14
        }
      },
      tickfont: {
        color: darkMode ? '#F3F4F6' : '#1F2937',
        size: 12
      },
      gridcolor: darkMode ? '#374151' : '#E5E7EB'
    },
    yaxis: {
      title: {
        text: 'Count',
        font: {
          color: darkMode ? '#F3F4F6' : '#1F2937',
          size: 14
        }
      },
      tickfont: {
        color: darkMode ? '#9CA3AF' : '#6B7280',
        size: 11
      },
      gridcolor: darkMode ? '#374151' : '#E5E7EB'
    },
    showlegend: true,
    legend: {
      x: 0.5,
      xanchor: 'center',
      y: 1.15,
      yanchor: 'top',
      orientation: 'h',
      font: {
        color: darkMode ? '#F3F4F6' : '#1F2937',
        size: 11
      },
      bgcolor: 'rgba(0,0,0,0)'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 80, b: 60, l: 80, r: 40 },
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

export default NucleotideBarChart;
