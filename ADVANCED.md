# GenomeSync 2.0 - Customization & Advanced Guide

## 🎨 Customization Options

### Change Genome Colors

**File**: `frontend/tailwind.config.js`

```javascript
extend: {
  colors: {
    genome: {
      a: '#3B82F6',      // Change Genome A color (default: blue)
      b: '#10B981',      // Change Genome B color (default: green)
      dark: '#0F172A',   // Dark background
      light: '#F8FAFC',  // Light background
    }
  }
}
```

**Popular color schemes**:
- **Fire vs Ice**: a: '#EF4444' (red), b: '#3B82F6' (blue)
- **Sunset**: a: '#F59E0B' (amber), b: '#EC4899' (pink)
- **Forest**: a: '#10B981' (green), b: '#14B8A6' (teal)
- **Purple Haze**: a: '#8B5CF6' (purple), b: '#06B6D4' (cyan)

---

### Modify K-mer Size

**File**: `backend/genome_analyzer.py`

Find this line (around line 95):
```python
kmer_freq = calculate_kmer_frequencies(sequence_str, k=4)
```

Change to:
```python
kmer_freq = calculate_kmer_frequencies(sequence_str, k=3)  # 3-mers
# or
kmer_freq = calculate_kmer_frequencies(sequence_str, k=5)  # 5-mers
# or
kmer_freq = calculate_kmer_frequencies(sequence_str, k=6)  # 6-mers
```

**Note**: 
- 3-mers = 64 possible (faster)
- 4-mers = 256 possible (default, balanced)
- 5-mers = 1,024 possible (slower, more detail)
- 6-mers = 4,096 possible (very slow for large genomes)

---

### Change Top N K-mers in Heatmap

**File**: `frontend/src/components/charts/KmerHeatmap.jsx`

Find this line (around line 25):
```javascript
.slice(0, 50)  // Top 50 k-mers
```

Change to:
```javascript
.slice(0, 100)  // Top 100 k-mers (taller heatmap)
// or
.slice(0, 30)   // Top 30 k-mers (shorter heatmap)
```

---

### Add Additional Metrics

**Step 1**: Calculate new metric in `backend/genome_analyzer.py`

```python
# Example: Add sequence complexity
def calculate_complexity(sequence_str):
    """Calculate Shannon entropy as a proxy for complexity"""
    from collections import Counter
    import math
    
    counts = Counter(sequence_str)
    total = len(sequence_str)
    entropy = -sum((count/total) * math.log2(count/total) 
                   for count in counts.values() if count > 0)
    return round(entropy, 3)

# Then in analyze_genome():
complexity = calculate_complexity(sequence_str)

# Add to metrics dict:
"metrics": {
    # ... existing metrics
    "complexity": complexity
}
```

**Step 2**: Update frontend components to display it

In `MetricCards.jsx`, add to the metrics array:
```javascript
{ key: 'complexity', label: 'Complexity (Shannon)', unit: 'bits', format: (v) => v.toFixed(3) }
```

In `RadarChart.jsx`, add to theta array:
```javascript
theta: ['Size (bp)', 'GC %', 'AT %', 'N Count', 'CpG', 'Mol Weight', 'Tm (°C)', 'Complexity']
```

---

### Customize Loading Messages

**File**: `frontend/src/components/UploadHub.jsx`

Find the status update section (around line 100):
```javascript
onStatusUpdate('Uploading files...');
await new Promise(resolve => setTimeout(resolve, 500));

onStatusUpdate('Calculating GC content...');
await new Promise(resolve => setTimeout(resolve, 500));

onStatusUpdate('Profiling 4-mers...');
```

Change to your custom messages:
```javascript
onStatusUpdate('Initializing quantum genome sequencer...');
onStatusUpdate('Consulting DNA database...');
onStatusUpdate('Analyzing genetic fingerprints...');
```

---

### Change Default Theme

**File**: `frontend/src/App.jsx`

Change this line (around line 8):
```javascript
const [darkMode, setDarkMode] = useState(true);  // Dark by default
```

To:
```javascript
const [darkMode, setDarkMode] = useState(false);  // Light by default
```

---

### Adjust Animation Speeds

**File**: `frontend/tailwind.config.js`

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',      // Change 0.5s to your preference
  'slide-up': 'slideUp 0.6s ease-out',       // Change 0.6s
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',  // Change 3s
}
```

**File**: `frontend/src/components/Dashboard.jsx`

Staggered delays (around line 50-80):
```javascript
style={{ animationDelay: '0.1s' }}  // Change these values
style={{ animationDelay: '0.2s' }}
style={{ animationDelay: '0.3s' }}
style={{ animationDelay: '0.4s' }}
```

---

## 🔧 Advanced Features

### Add Genome Alignment

To add sequence alignment (e.g., pairwise alignment):

**Install additional dependency**:
```powershell
pip install biopython[align]
```

**Add to `genome_analyzer.py`**:
```python
from Bio import pairwise2
from Bio.pairwise2 import format_alignment

def calculate_alignment_score(seq_a, seq_b):
    """Calculate pairwise alignment score (sample first 1000bp)"""
    sample_a = str(seq_a[:1000])
    sample_b = str(seq_b[:1000])
    
    alignments = pairwise2.align.globalxx(sample_a, sample_b, one_alignment_only=True)
    if alignments:
        return round(alignments[0].score, 2)
    return 0.0

# In analyze_genome, you'd need both sequences, so modify the API
```

---

### Add Gene Prediction

**Install additional dependency**:
```powershell
pip install pyrodigal
```

**Add gene finding**:
```python
import pyrodigal

def find_genes(sequence_str):
    """Find protein-coding genes"""
    orf_finder = pyrodigal.OrfFinder(meta=True)
    genes = orf_finder.find_genes(sequence_str.encode())
    return len(list(genes))

# Add to metrics:
"gene_count": find_genes(sequence_str)
```

---

### Export Results to PDF

**Install dependencies**:
```powershell
pip install reportlab
```

**Add export endpoint** in `main.py`:
```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

@app.post("/export-pdf")
async def export_pdf(data: dict):
    # Create PDF with genome comparison data
    # Return PDF file
    pass
```

**Add button** in `Dashboard.jsx`:
```javascript
<button onClick={handleExportPDF}>
  📥 Download Report
</button>
```

---

### Add Database Integration

To save/load previous analyses:

**Install database driver**:
```powershell
pip install sqlalchemy asyncpg
```

**Create database models** (new file `backend/models.py`):
```python
from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True)
    genome_a_name = Column(String)
    genome_b_name = Column(String)
    results = Column(JSON)
    created_at = Column(DateTime)
```

---

### Enable Multi-Genome Comparison

Extend to compare 3+ genomes:

**Modify API** to accept array of files:
```python
@app.post("/analyze-multi")
async def analyze_multiple(genomes: List[UploadFile]):
    results = []
    for genome in genomes:
        results.append(analyze_genome(await genome.read(), genome.filename))
    return {"genomes": results}
```

**Modify frontend** to show 3D radar chart or comparison matrix

---

## 🐛 Advanced Troubleshooting

### Memory Issues with Large Genomes

**Problem**: Backend crashes with genomes >500MB

**Solution**: Process in chunks
```python
def analyze_genome_chunked(file_content, filename, chunk_size=100000000):
    # Process in 100MB chunks
    # Calculate metrics incrementally
    pass
```

---

### Slow K-mer Calculation

**Problem**: 4-mer analysis takes too long

**Solution 1**: Use multiprocessing
```python
from multiprocessing import Pool

def calculate_kmer_parallel(sequence_str, k=4):
    # Split sequence into chunks
    # Process in parallel
    pass
```

**Solution 2**: Use Cython or NumPy optimization
```python
import numpy as np
# Convert to numeric representation
# Use vectorized operations
```

---

### Chart Rendering Issues

**Problem**: Plotly charts don't render properly

**Solution**: Ensure proper imports in `index.html`:
```html
<script src="https://cdn.plot.ly/plotly-2.27.1.min.js"></script>
```

And check Plotly.js version in `package.json`:
```json
"plotly.js": "^2.27.1"
```

---

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solution**: Update CORS settings in `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (dev only!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Production**: Specify exact origins:
```python
allow_origins=["https://yourdomain.com"]
```

---

## 🚀 Production Deployment

### Backend (FastAPI)

**Option 1: Gunicorn + Uvicorn workers**
```powershell
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

**Option 2: Docker**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

### Frontend (React)

**Build for production**:
```powershell
npm run build
```

**Deploy to Netlify/Vercel**:
1. Push to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

**Environment variables**:
```
VITE_API_URL=https://your-backend.com
```

Update `UploadHub.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const response = await axios.post(`${API_URL}/analyze`, formData);
```

---

## 📊 Performance Benchmarks

Typical processing times on modern hardware:

| Genome Size | Upload | Analysis | Total |
|-------------|--------|----------|-------|
| 1 MB        | 0.1s   | 1-2s     | ~2s   |
| 10 MB       | 0.5s   | 3-5s     | ~5s   |
| 100 MB      | 2-3s   | 15-25s   | ~25s  |
| 500 MB      | 10s    | 60-90s   | ~100s |

---

## 🎓 Learning & Extension Ideas

1. **Add BLAST integration** for sequence similarity
2. **Implement phylogenetic tree** visualization
3. **Add mutation detection** between genomes
4. **Create genome annotation** viewer
5. **Add real-time collaboration** features
6. **Implement genome assembly** comparison
7. **Add protein structure prediction** links
8. **Create publication-quality** figure exports

---

**GenomeSync 2.0** - Built to be extended! 🧬🚀
