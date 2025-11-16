# GenomeSync 2.0 - Setup & Usage Checklist

## ✅ Pre-Installation Checklist

### System Requirements
- [ ] **Python 3.8 or higher** installed
  - Check: `python --version`
- [ ] **Node.js 16 or higher** installed
  - Check: `node --version`
- [ ] **npm** package manager installed
  - Check: `npm --version`
- [ ] **PowerShell 5.1 or higher** (Windows)
  - Check: `$PSVersionTable.PSVersion`

### Files Present
- [ ] All documentation files (7 .md files)
- [ ] Backend folder with Python files
- [ ] Frontend folder with React files
- [ ] Setup scripts (.ps1 files)
- [ ] Sample FASTA files

---

## ✅ Installation Checklist

### Option 1: Automated Setup
- [ ] Navigate to GenomeSync folder
- [ ] Run `.\setup.ps1`
- [ ] Wait for backend virtual environment creation
- [ ] Wait for Python dependencies installation
- [ ] Wait for npm dependencies installation (may take 2-3 minutes)
- [ ] See success message

### Option 2: Manual Setup

#### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment: `.\venv\Scripts\Activate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Verify installation: `pip list`

#### Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete
- [ ] Verify installation: `npm list --depth=0`

---

## ✅ Running the Application

### Terminal 1: Backend
- [ ] Open PowerShell terminal
- [ ] Navigate to GenomeSync folder
- [ ] Run `.\start-backend.ps1` (or manually start)
- [ ] Wait for "Application startup complete" message
- [ ] Verify backend is running: http://localhost:8000
- [ ] Check API docs: http://localhost:8000/docs

### Terminal 2: Frontend
- [ ] Open second PowerShell terminal
- [ ] Navigate to GenomeSync folder
- [ ] Run `.\start-frontend.ps1` (or manually start)
- [ ] Wait for "Local: http://localhost:3000" message
- [ ] Browser should auto-open to http://localhost:3000
- [ ] Verify Upload Hub screen appears

---

## ✅ First Time Usage

### Upload Files
- [ ] See two upload zones on screen
- [ ] Drag `backend/genome_a_sample.fasta` to first zone **OR** click to browse
- [ ] See green checkmark appear for Genome A
- [ ] Drag `backend/genome_b_sample.fasta` to second zone **OR** click to browse
- [ ] See green checkmark appear for Genome B
- [ ] "Analyze Genomes" button becomes active (gradient colors)

### Run Analysis
- [ ] Click "Analyze Genomes" button
- [ ] See loading overlay appear with DNA helix animation
- [ ] Watch status messages change:
  - "Uploading files..."
  - "Calculating GC content..."
  - "Profiling 4-mers..."
  - "Building dashboard..."
- [ ] Wait for analysis to complete (5-10 seconds for samples)

### Explore Dashboard
- [ ] Dashboard appears with 4 widgets in 2x2 grid
- [ ] All charts animate in (staggered fade)
- [ ] See header with genome filenames

---

## ✅ Feature Testing

### Widget 1: Radar Chart (Top-Left)
- [ ] See "🌟 Genomic Fingerprint" title
- [ ] Radar chart displays with 7 axes
- [ ] Blue polygon for Genome A visible
- [ ] Green polygon for Genome B visible
- [ ] Hover over axes to see exact values
- [ ] Values show in tooltips
- [ ] Chart is interactive (can zoom/pan)

### Widget 2: Bar Chart (Top-Right)
- [ ] See "📊 Nucleotide Composition" title
- [ ] Bar chart shows A, T, C, G
- [ ] Blue bars for Genome A
- [ ] Green bars for Genome B
- [ ] Bars are grouped properly
- [ ] Hover shows exact counts with commas
- [ ] Legend shows at top

### Widget 3: Metric Cards (Bottom-Left)
- [ ] See "📈 Key Metrics" title
- [ ] 7 metric cards visible
- [ ] Each card shows both genomes side-by-side
- [ ] Higher value has subtle highlight
- [ ] Cards are scrollable (scroll down)
- [ ] All 7 metrics present:
  - Genome Size
  - GC Content
  - AT Content
  - Ambiguous Bases
  - CpG Dinucleotides
  - Molecular Weight
  - Melting Temp
- [ ] Hover effect works (cards scale slightly)

### Widget 4: Heatmap (Bottom-Right)
- [ ] See "🔥 4-mer Differential Heatmap" title
- [ ] Heatmap shows 50 k-mers
- [ ] K-mers displayed in monospace font
- [ ] Colors range from blue to white to green
- [ ] Blue means more frequent in Genome A
- [ ] Green means more frequent in Genome B
- [ ] White means equal frequencies
- [ ] Hover shows exact frequencies for both genomes
- [ ] Color bar visible on right

---

## ✅ Theme Testing

### Dark Mode (Default)
- [ ] Background is dark (slate gradient)
- [ ] Text is light colored (white/gray)
- [ ] Cards have glassmorphism effect
- [ ] Charts have dark theme colors
- [ ] All elements are readable

### Light Mode
- [ ] Click sun icon (☀️) in top-right
- [ ] Background transitions to light (blue/green gradient)
- [ ] Text transitions to dark (gray/black)
- [ ] Cards adjust to light theme
- [ ] Charts adjust to light theme
- [ ] All elements remain readable
- [ ] Transition is smooth (300ms)

### Theme Persistence
- [ ] Toggle theme multiple times
- [ ] All widgets update simultaneously
- [ ] No jarring transitions
- [ ] Charts remain functional

---

## ✅ Navigation Testing

### New Analysis
- [ ] Click "↻ New Analysis" button in dashboard header
- [ ] Returns to Upload Hub screen
- [ ] Previous data is cleared
- [ ] Upload zones are empty
- [ ] Theme preference is maintained

### Multiple Analyses
- [ ] Upload different genome files
- [ ] Run new analysis
- [ ] Verify new data displays
- [ ] Repeat 2-3 times
- [ ] No errors or crashes

---

## ✅ Error Handling

### Invalid Files
- [ ] Try uploading non-FASTA file (.txt, .docx, etc.)
- [ ] See error message
- [ ] Error is clear and helpful
- [ ] Can still use application

### Missing Files
- [ ] Try clicking "Analyze" with only one file
- [ ] See error message "Please upload both genome files"
- [ ] Upload completes successfully after adding second file

### Large Files
- [ ] Upload large genome (>100MB) if available
- [ ] See loading animation
- [ ] Analysis completes (may take 30-60 seconds)
- [ ] Dashboard displays correctly

---

## ✅ Performance Testing

### Small Genomes (Sample Files)
- [ ] Upload takes <1 second
- [ ] Analysis takes 5-10 seconds
- [ ] Dashboard loads instantly
- [ ] Charts render smoothly
- [ ] No lag or stuttering

### Interactions
- [ ] Hover over charts is responsive
- [ ] Theme toggle is instant
- [ ] Scrolling is smooth
- [ ] No visual glitches

---

## ✅ Browser Compatibility

Test in multiple browsers (if possible):
- [ ] **Chrome**: All features work
- [ ] **Firefox**: All features work
- [ ] **Edge**: All features work
- [ ] **Safari** (Mac): All features work

---

## ✅ Advanced Features

### API Documentation
- [ ] Visit http://localhost:8000/docs
- [ ] See Swagger UI
- [ ] Expand "/analyze" endpoint
- [ ] See request/response schemas
- [ ] Try "Try it out" feature

### Developer Tools
- [ ] Open browser DevTools (F12)
- [ ] Check Console for errors (should be none)
- [ ] Check Network tab during upload
- [ ] See POST request to /analyze
- [ ] See JSON response data
- [ ] Verify response structure matches docs

---

## ✅ Customization Testing

### Change Colors (Optional)
- [ ] Open `frontend/tailwind.config.js`
- [ ] Change `genome.a` and `genome.b` colors
- [ ] Restart frontend server
- [ ] See new colors in UI

### Change K-mer Size (Optional)
- [ ] Open `backend/genome_analyzer.py`
- [ ] Change `k=4` to `k=3` or `k=5`
- [ ] Restart backend server
- [ ] Run new analysis
- [ ] See different k-mer counts in heatmap

---

## ✅ Documentation Review

- [ ] Read through README.md
- [ ] Read through QUICKSTART.md
- [ ] Browse FEATURES.md for UI details
- [ ] Check ARCHITECTURE.md for system design
- [ ] Review ADVANCED.md for customization ideas

---

## ✅ Production Readiness

### Backend
- [ ] All endpoints responding
- [ ] Error handling works
- [ ] File validation works
- [ ] CORS configured correctly
- [ ] Logging is functional

### Frontend
- [ ] All components render
- [ ] All interactions work
- [ ] Responsive on different screen sizes
- [ ] No console errors
- [ ] Build succeeds: `npm run build`

---

## ✅ Final Verification

### Functionality
- [ ] ✅ Upload works
- [ ] ✅ Analysis completes
- [ ] ✅ All 4 charts display
- [ ] ✅ Interactivity works
- [ ] ✅ Theme toggle works
- [ ] ✅ New analysis works

### Performance
- [ ] ✅ No lag or stuttering
- [ ] ✅ Reasonable analysis time
- [ ] ✅ Smooth animations
- [ ] ✅ Responsive UI

### Quality
- [ ] ✅ No errors in console
- [ ] ✅ No broken features
- [ ] ✅ Professional appearance
- [ ] ✅ Clear error messages

---

## 🎉 Congratulations!

If all checkboxes are ✅, you have successfully:
- ✅ Installed GenomeSync 2.0
- ✅ Run the application
- ✅ Tested all features
- ✅ Verified it works correctly

### Next Steps:
1. **Use with real data**: Upload your own FASTA files
2. **Customize**: Modify colors, k-mer size, etc.
3. **Extend**: Add new features (see ADVANCED.md)
4. **Deploy**: Put it in production (see ADVANCED.md)
5. **Share**: Show it to colleagues!

---

## 🆘 Troubleshooting Reference

If any checkbox fails, see:
- **Installation issues**: [QUICKSTART.md](QUICKSTART.md) Troubleshooting section
- **Runtime errors**: Backend terminal logs + browser DevTools console
- **Chart issues**: Verify Plotly.js loaded in Network tab
- **API issues**: Check http://localhost:8000/docs

---

**GenomeSync 2.0** - *Ready to revolutionize your genomics workflow!* 🧬✨
