# GenomeSync 2.0 - Quick Start Guide

## 🚀 Installation (First Time Only)

### Option 1: Automated Setup
```powershell
cd GenomeSync
.\setup.ps1
```

### Option 2: Manual Setup

#### Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
```

#### Frontend
```powershell
cd frontend
npm install
```

## ▶️ Running the Application

You need **2 terminal windows**:

### Terminal 1: Backend (Port 8000)
```powershell
cd backend
.\venv\Scripts\Activate
python main.py
```
**OR use the launcher:**
```powershell
.\start-backend.ps1
```

### Terminal 2: Frontend (Port 3000)
```powershell
cd frontend
npm run dev
```
**OR use the launcher:**
```powershell
.\start-frontend.ps1
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger UI)

## 🧪 Testing with Sample Data

1. Start both servers
2. Open http://localhost:3000
3. Upload the sample files:
   - **Genome A**: `backend/genome_a_sample.fasta`
   - **Genome B**: `backend/genome_b_sample.fasta`
4. Click **"Analyze Genomes"**
5. Explore the interactive dashboard!

## 🎨 Features to Try

### Upload Hub
- ✅ Drag & drop files
- ✅ Toggle light/dark theme (top-right button)
- ✅ Watch the loading animation

### Dashboard
- 🌟 **Radar Chart**: Hover over axes to see exact values
- 📊 **Bar Chart**: Compare nucleotide counts
- 📈 **Metric Cards**: Scroll through all 7 parameters
- 🔥 **Heatmap**: See which k-mers differ most (blue = more in A, green = more in B)

## 🛠️ Development Commands

### Backend
```powershell
# Run with auto-reload
uvicorn main:app --reload

# Check API health
curl http://localhost:8000/health
```

### Frontend
```powershell
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Understanding the Metrics

| Metric | What it means |
|--------|---------------|
| **Size (bp)** | Total base pairs in the genome |
| **GC Content** | Percentage of G and C nucleotides (important for stability) |
| **AT Content** | Percentage of A and T nucleotides |
| **N Count** | Number of ambiguous/unknown bases |
| **CpG Count** | CG dinucleotides (important for gene regulation) |
| **Molecular Weight** | Total mass of the DNA molecule (Daltons) |
| **Melting Temp** | Temperature at which DNA denatures (Wallace estimate) |

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check Python version: `python --version` (need 3.8+)
- ✅ Activate venv: `.\venv\Scripts\Activate`
- ✅ Reinstall dependencies: `pip install -r requirements.txt`

### Frontend won't start
- ✅ Check Node version: `node --version` (need 16+)
- ✅ Delete `node_modules` and `package-lock.json`, then `npm install`

### "Connection refused" error
- ✅ Make sure backend is running on port 8000
- ✅ Check CORS settings in `backend/main.py`

### Charts not rendering
- ✅ Check browser console for errors
- ✅ Ensure Plotly.js loaded: check Network tab
- ✅ Verify API response in Network tab

### Analysis fails
- ✅ Ensure files are valid FASTA format
- ✅ Check backend logs for detailed errors
- ✅ Try sample files first to verify setup

## 📁 File Format Requirements

Your FASTA files should look like this:

```
>sequence_name_or_id
ATGCGATCGATCGATCGATCG
GCTAGCTAGCTAGCTAGCTAG
ATCGATCGATCGATCGATCGA
```

- Header line starts with `>`
- Sequence can span multiple lines
- Only A, T, C, G, N characters (N = ambiguous)

## 🎯 Next Steps

1. ✅ Test with sample data
2. ✅ Upload your own genome files
3. ✅ Explore all visualizations
4. ✅ Try light/dark themes
5. ✅ Compare different genome pairs

## 💡 Pro Tips

- **Large genomes?** Analysis may take 10-30 seconds for 100MB+ files
- **Multiple comparisons?** Use "New Analysis" button to reset
- **Want to share?** Take screenshots of the dashboard (charts are high-res!)
- **Customize colors?** Edit `frontend/tailwind.config.js`
- **Change k-mer size?** Edit `backend/genome_analyzer.py` (k=4 by default)

## 📚 Learning Resources

- **Biopython**: https://biopython.org/
- **FastAPI**: https://fastapi.tiangolo.com/
- **Plotly**: https://plotly.com/javascript/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Need help?** Check `README.md` for full documentation or `PROJECT_STRUCTURE.md` for technical details.

**GenomeSync 2.0** - *Compare genomes, instantly.* 🧬
