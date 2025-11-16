# GenomeSync 2.0 - Differential Genomics Dashboard

A high-performance, visually stunning web application for comparative genomics. Upload two genome files (FASTA format) and perform comprehensive statistical analysis with interactive, mesmerizing visualizations.

![GenomeSync 2.0](https://img.shields.io/badge/GenomeSync-2.0-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-teal?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square)

## 🧬 Features

### Backend Analysis (Biopython)
The backend calculates **8 key genomic parameters**:

1. **Total Genome Size** (bp)
2. **GC Content** (%)
3. **AT Content** (%)
4. **Ambiguous Bases ('N')** count
5. **CpG Dinucleotide Count**
6. **Molecular Weight** (Da)
7. **Melting Temperature** (Tm - Wallace estimate)
8. **4-mer Frequency Profile** (256 possible 4-mers)

### Frontend Visualizations

#### 🌟 Widget 1: Genomic Fingerprint (Radar Chart)
- **Purpose**: Visual "fingerprint" overlay of both genomes
- **Features**: 
  - 7-axis radar chart with normalized metrics
  - Semi-transparent fills (Blue for Genome A, Green for Genome B)
  - Interactive hover showing exact values
  - The centerpiece visualization

#### 📊 Widget 2: Nucleotide Composition (Grouped Bar Chart)
- **Purpose**: Compare A, T, C, G counts side-by-side
- **Features**:
  - Grouped bars for easy comparison
  - Exact count tooltips
  - Color-coded by genome

#### 📈 Widget 3: Key Metrics (Data Cards)
- **Purpose**: Scannable list of all calculated metrics
- **Features**:
  - Side-by-side genome comparison
  - Highlights which genome has higher values (subtle color)
  - Clean, modern card design

#### 🔥 Widget 4: 4-mer Differential Heatmap
- **Purpose**: Advanced k-mer frequency analysis
- **Features**:
  - Top 50 most common k-mers
  - Diverging color scale (Red-White-Blue)
    - **Blue**: K-mer more frequent in Genome A
    - **Green**: K-mer more frequent in Genome B
    - **White**: Similar frequencies
  - Hover shows exact frequencies for both genomes

## 🚀 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.8+ with FastAPI |
| **Core Logic** | Biopython for genomic calculations |
| **Frontend** | React 18 with Vite |
| **Visualization** | Plotly.js (interactive charts) |
| **Styling** | Tailwind CSS (modern, responsive) |
| **Animations** | Framer Motion |
| **File Upload** | React Dropzone |

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Create a virtual environment (recommended):
```powershell
python -m venv venv
.\venv\Scripts\Activate
```

3. Install dependencies:
```powershell
pip install -r requirements.txt
```

4. Start the FastAPI server:
```powershell
python main.py
```

The backend will be available at `http://localhost:8000`

**API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI

### Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🎯 Usage

1. **Start both servers** (backend on :8000, frontend on :3000)

2. **Open the app** in your browser: `http://localhost:3000`

3. **Upload two FASTA files**:
   - Drag & drop or click to select
   - Supported formats: `.fasta`, `.fa`, `.fna`
   - Both files must be uploaded

4. **Click "Analyze Genomes"**:
   - Watch the loading animation
   - Backend processes both genomes
   - Dashboard appears with all visualizations

5. **Explore the Dashboard**:
   - Hover over charts for detailed info
   - Toggle between light/dark modes
   - Click "New Analysis" to compare different genomes

## 🧪 Sample Data

Sample FASTA files are included in `backend/sample_data/`:
- `genome_a_sample.fasta` - E. coli K-12 subset
- `genome_b_sample.fasta` - E. coli O157:H7 subset

## 📡 API Reference

### POST `/analyze`

**Request**: `multipart/form-data`
```
genome_a: File (FASTA)
genome_b: File (FASTA)
```

**Response**: JSON
```json
{
  "genome_a": {
    "filename": "genome_a.fasta",
    "metrics": {
      "size_bp": 4600000,
      "gc_content": 50.8,
      "at_content": 49.2,
      "n_count": 500,
      "cpg_count": 80000,
      "mol_weight": 1426000000,
      "tm_wallace": 85.4
    },
    "nucleotide_counts": { "A": 1150000, "T": 1150000, "C": 1150000, "G": 1150000 },
    "kmer_freq": { "AAAA": 15000, "AAAT": 12000, ... }
  },
  "genome_b": { ... },
  "normalized_metrics": {
    "genome_a_normalized": { ... },
    "genome_b_normalized": { ... }
  }
}
```

## 🎨 UI/UX Features

### Screen 1: Upload Hub
- **Glassmorphism** effects on upload zones
- **Drag & drop** file upload
- File validation with visual feedback
- Animated "Analyze" button
- Theme toggle (light/dark mode)

### Screen 2: Dashboard
- **2x2 grid layout** of visualization widgets
- **Staggered fade-in** animations for each widget
- **Hover effects** and scale transforms
- **Responsive design** for all screen sizes
- **Theme persistence** across views

### Loading Experience
- Full-screen overlay with DNA helix animation
- Dynamic status updates:
  - "Uploading files..."
  - "Calculating GC content..."
  - "Profiling 4-mers..."
  - "Building dashboard..."

## 🔧 Development

### Backend Development
```powershell
# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```powershell
# Run dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance Notes

- **4-mer Analysis**: For very large genomes (>100MB), k-mer counting may take 10-30 seconds
- **Melting Temp**: For sequences >1000bp, we sample the first 1000bp (Wallace rule limitation)
- **Visualization**: Plotly.js handles interactivity smoothly up to 50 k-mers in the heatmap

## 🛠️ Customization

### Change Genome Colors
Edit `frontend/tailwind.config.js`:
```js
genome: {
  a: '#3B82F6',  // Blue for Genome A
  b: '#10B981',  // Green for Genome B
}
```

### Modify K-mer Size
Edit `backend/genome_analyzer.py`:
```python
kmer_freq = calculate_kmer_frequencies(sequence_str, k=4)  # Change k value
```

### Adjust Top N K-mers in Heatmap
Edit `frontend/src/components/charts/KmerHeatmap.jsx`:
```js
.slice(0, 50)  // Change to desired number
```

## 📝 License

MIT License - feel free to use for academic or commercial projects!

## 👨‍💻 Author

Created with ❤️ for the genomics community

## 🙏 Acknowledgments

- **Biopython** - Comprehensive bioinformatics library
- **FastAPI** - Modern, fast web framework
- **Plotly.js** - Interactive scientific visualizations
- **Tailwind CSS** - Utility-first styling

---

**GenomeSync 2.0** - *Compare genomes, instantly.*
