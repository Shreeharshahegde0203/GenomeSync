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

  // Generate intelligent summary
  const generateSummary = () => {
    const totalA = Object.values(genomeA.nucleotide_counts).reduce((sum, val) => sum + val, 0);
    const totalB = Object.values(genomeB.nucleotide_counts).reduce((sum, val) => sum + val, 0);
    
    // Calculate percentages
    const percA = nucleotides.map(n => (genomeA.nucleotide_counts[n] / totalA) * 100);
    const percB = nucleotides.map(n => (genomeB.nucleotide_counts[n] / totalB) * 100);
    
    // Check Chargaff's rules (A≈T, C≈G)
    const atBalanceA = Math.abs(percA[0] - percA[1]); // A vs T in genome A
    const cgBalanceA = Math.abs(percA[2] - percA[3]); // C vs G in genome A
    const atBalanceB = Math.abs(percB[0] - percB[1]);
    const cgBalanceB = Math.abs(percB[2] - percB[3]);
    
    const avgBalance = (atBalanceA + cgBalanceA + atBalanceB + cgBalanceB) / 4;
    
    let interpretation = '';
    let quality = '';
    
    if (avgBalance < 0.5) {
      quality = 'Excellent';
      interpretation = 'Perfect Chargaff\'s rule compliance (A≈T, C≈G) - high-quality double-stranded DNA data.';
    } else if (avgBalance < 2) {
      quality = 'Good';
      interpretation = 'Good base-pair balance - typical for genomic DNA with minor strand biases.';
    } else if (avgBalance < 5) {
      quality = 'Moderate';
      interpretation = 'Some strand asymmetry detected - may indicate single-stranded regions or sequencing bias.';
    } else {
      quality = 'Poor';
      interpretation = 'Significant imbalance - check for RNA sequences, strand-specific bias, or data quality issues.';
    }
    
    return { atBalanceA, cgBalanceA, atBalanceB, cgBalanceB, quality, interpretation };
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
          ? 'bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/30' 
          : 'bg-gradient-to-r from-green-50 to-cyan-50 border-green-200'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">🔬</div>
          <div className="flex-1">
            <h4 className={`text-sm font-bold mb-2 ${
              darkMode ? 'text-green-300' : 'text-green-700'
            }`}>
              Nucleotide Balance Assessment: <span className={summary.quality === 'Excellent' ? 'text-green-400' : summary.quality === 'Good' ? 'text-blue-400' : 'text-yellow-400'}>{summary.quality}</span>
            </h4>
            <p className={`text-xs leading-relaxed mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {summary.interpretation}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                <strong>Genome A:</strong> A-T balance: {summary.atBalanceA.toFixed(2)}% | C-G balance: {summary.cgBalanceA.toFixed(2)}%
              </div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                <strong>Genome B:</strong> A-T balance: {summary.atBalanceB.toFixed(2)}% | C-G balance: {summary.cgBalanceB.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NucleotideBarChart;
