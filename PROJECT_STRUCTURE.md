# GenomeSync 2.0 - Project Structure

```
GenomeSync/
│
├── README.md                          # Comprehensive documentation
├── setup.ps1                          # Quick setup script
├── start-backend.ps1                  # Backend launcher
├── start-frontend.ps1                 # Frontend launcher
│
├── backend/                           # Python FastAPI Backend
│   ├── main.py                        # FastAPI app & /analyze endpoint
│   ├── genome_analyzer.py             # Biopython analysis logic
│   ├── requirements.txt               # Python dependencies
│   ├── .gitignore                     # Python gitignore
│   ├── genome_a_sample.fasta          # Sample genome A for testing
│   └── genome_b_sample.fasta          # Sample genome B for testing
│
└── frontend/                          # React + Vite Frontend
    ├── index.html                     # HTML entry point
    ├── package.json                   # npm dependencies
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS config
    ├── postcss.config.js              # PostCSS config
    ├── .gitignore                     # Node gitignore
    │
    └── src/
        ├── main.jsx                   # React entry point
        ├── App.jsx                    # Main app component
        ├── index.css                  # Global styles (Tailwind)
        │
        └── components/
            ├── UploadHub.jsx          # Upload screen with drag-drop
            ├── LoadingOverlay.jsx     # Loading animation overlay
            ├── Dashboard.jsx          # Main dashboard layout
            │
            └── charts/
                ├── RadarChart.jsx     # Genomic fingerprint (Plotly)
                ├── NucleotideBarChart.jsx  # Bar chart comparison
                ├── MetricCards.jsx    # Key metrics display
                └── KmerHeatmap.jsx    # 4-mer differential heatmap
```

## File Descriptions

### Backend Files

**`main.py`**
- FastAPI application
- CORS middleware for frontend communication
- `/analyze` POST endpoint (accepts 2 FASTA files)
- Health check endpoints

**`genome_analyzer.py`**
- Core Biopython analysis functions
- Calculates 8 genomic parameters
- K-mer frequency profiling
- Metric normalization for radar chart

**`requirements.txt`**
- FastAPI, Uvicorn (server)
- Biopython (analysis)
- Python-multipart (file uploads)

### Frontend Files

**`App.jsx`**
- Main application component
- State management (view, data, loading, theme)
- Handles transitions between Upload and Dashboard

**`UploadHub.jsx`**
- Drag-and-drop file upload interface
- Glassmorphism/neumorphism styling
- File validation and submission
- API communication

**`LoadingOverlay.jsx`**
- Full-screen loading animation
- DNA helix spinner
- Dynamic status messages

**`Dashboard.jsx`**
- 2x2 grid layout
- Header with theme toggle and new analysis button
- Renders all 4 chart components

**`charts/RadarChart.jsx`**
- Plotly radar/spider chart
- 7-axis normalized metrics
- Overlaid genome fingerprints

**`charts/NucleotideBarChart.jsx`**
- Plotly grouped bar chart
- A, T, C, G comparison

**`charts/MetricCards.jsx`**
- Scrollable metric list
- Side-by-side comparison cards
- Highlights higher values

**`charts/KmerHeatmap.jsx`**
- Plotly heatmap
- Top 50 4-mers
- Diverging color scale (blue-white-green)

## Technology Decisions

### Why FastAPI?
- High performance (async)
- Automatic API documentation (Swagger/OpenAPI)
- Easy file upload handling
- Type hints and validation

### Why Biopython?
- Industry standard for genomics
- Comprehensive SeqIO support
- Built-in GC, molecular weight, Tm calculations

### Why Plotly.js?
- Interactive, professional charts
- Built-in hover tooltips
- Responsive and performant
- Wide range of chart types (radar, heatmap, bar)

### Why Tailwind CSS?
- Utility-first (fast prototyping)
- Easy dark mode support
- Consistent design system
- No CSS file bloat

### Why Vite?
- Lightning-fast HMR (Hot Module Replacement)
- Modern build tool
- Better than Create React App for performance

## Data Flow

```
User uploads 2 FASTA files
         ↓
UploadHub.jsx sends FormData to /analyze
         ↓
FastAPI receives files
         ↓
genome_analyzer.py processes both genomes
    • Parses FASTA with SeqIO
    • Calculates 8 parameters
    • Generates k-mer frequencies
    • Normalizes metrics
         ↓
JSON response sent back to frontend
         ↓
Dashboard.jsx receives data
         ↓
Charts render with Plotly.js
```

## API Contract

The `/analyze` endpoint returns this exact structure:

```json
{
  "genome_a": {
    "filename": string,
    "metrics": {
      "size_bp": int,
      "gc_content": float,
      "at_content": float,
      "n_count": int,
      "cpg_count": int,
      "mol_weight": float,
      "tm_wallace": float
    },
    "nucleotide_counts": {
      "A": int,
      "T": int,
      "C": int,
      "G": int
    },
    "kmer_freq": {
      "AAAA": int,
      "AAAT": int,
      ...
    }
  },
  "genome_b": { /* same structure */ },
  "normalized_metrics": {
    "genome_a_normalized": { /* 0-1 values */ },
    "genome_b_normalized": { /* 0-1 values */ }
  }
}
```

This contract ensures the frontend knows exactly what to expect!
