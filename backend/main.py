"""
GenomeSync - FastAPI Backend
High-performance comparative genomics API
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
import logging

from genome_analyzer import analyze_genome, normalize_metrics_for_radar

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="GenomeSync 2.0 API",
    description="Differential Genomics Analysis Backend",
    version="2.0.0"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "GenomeSync 2.0",
        "status": "operational",
        "version": "2.0.0"
    }


@app.post("/analyze")
async def analyze_genomes(
    genome_a: UploadFile = File(..., description="First genome FASTA file"),
    genome_b: UploadFile = File(..., description="Second genome FASTA file")
) -> Dict[str, Any]:
    """
    Analyze and compare two genome FASTA files.
    
    Returns comprehensive metrics including:
    - Genome size, GC/AT content, ambiguous bases
    - CpG dinucleotide count, molecular weight, melting temperature
    - Nucleotide composition
    - 4-mer frequency profiles
    - Normalized metrics for visualization
    """
    
    logger.info(f"Received analysis request: {genome_a.filename} vs {genome_b.filename}")
    
    # Validate file types
    for file in [genome_a, genome_b]:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="No filename provided"
            )
        if not file.filename.lower().endswith(('.fasta', '.fa', '.fna')):
            logger.error(f"Invalid file type: {file.filename}")
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type: {file.filename}. Please upload FASTA files (.fasta, .fa, .fna)"
            )
    
    try:
        # Read file contents
        logger.info("Reading file contents...")
        genome_a_content = await genome_a.read()
        genome_b_content = await genome_b.read()
        
        logger.info(f"File sizes: A={len(genome_a_content)} bytes, B={len(genome_b_content)} bytes")
        
        logger.info("Analyzing Genome A...")
        genome_a_results = analyze_genome(genome_a_content, genome_a.filename)
        
        logger.info("Analyzing Genome B...")
        genome_b_results = analyze_genome(genome_b_content, genome_b.filename)
        
        logger.info("Normalizing metrics for visualization...")
        normalized_metrics = normalize_metrics_for_radar(
            genome_a_results["metrics"],
            genome_b_results["metrics"]
        )
        
        # Construct response
        response = {
            "genome_a": genome_a_results,
            "genome_b": genome_b_results,
            "normalized_metrics": normalized_metrics
        }
        
        logger.info("Analysis complete!")
        return JSONResponse(content=response)
        
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "GenomeSync 2.0",
        "endpoints": {
            "analyze": "/analyze",
            "health": "/health"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
