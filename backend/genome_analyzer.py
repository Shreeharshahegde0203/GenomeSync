"""
GenomeSync - Genome Analysis Module
Comprehensive genomic statistics using Biopython
"""

from Bio import SeqIO
from Bio.SeqUtils import gc_fraction, molecular_weight
from Bio.SeqUtils.MeltingTemp import Tm_Wallace
from collections import Counter
from typing import Dict, Any
import io


def calculate_nucleotide_counts(sequence: str) -> Dict[str, int]:
    """Calculate counts for A, T, C, G nucleotides."""
    return {
        'A': sequence.count('A'),
        'T': sequence.count('T'),
        'C': sequence.count('C'),
        'G': sequence.count('G')
    }


def calculate_kmer_frequencies(sequence: str, k: int = 4, max_length: int = 100000) -> Dict[str, int]:
    """
    Calculate k-mer frequencies for the given sequence.
    Default k=4 for 4-mers analysis.
    For very long sequences, sample to avoid slow processing.
    """
    kmers = {}
    sequence_upper = str(sequence).upper()
    
    # Sample if sequence is too long to speed up processing
    if len(sequence_upper) > max_length:
        # Take multiple samples across the sequence
        step = len(sequence_upper) // 5
        sequence_upper = sequence_upper[::step][:max_length]
    
    for i in range(len(sequence_upper) - k + 1):
        kmer = sequence_upper[i:i + k]
        # Only count valid k-mers (no ambiguous bases)
        if all(base in 'ATCG' for base in kmer):
            kmers[kmer] = kmers.get(kmer, 0) + 1
    
    return kmers


def analyze_genome(file_content: bytes, filename: str) -> Dict[str, Any]:
    """
    Perform comprehensive genomic analysis on a FASTA file.
    
    Args:
        file_content: Raw bytes of the FASTA file
        filename: Original filename
    
    Returns:
        Dictionary containing all calculated metrics
    """
    # Parse FASTA file
    fasta_io = io.StringIO(file_content.decode('utf-8'))
    records = list(SeqIO.parse(fasta_io, "fasta"))
    
    if not records:
        raise ValueError(f"No valid sequences found in {filename}")
    
    # Use the first/primary sequence (or concatenate all if needed)
    # For V1, we'll use the longest sequence if multiple exist
    record = max(records, key=lambda r: len(r.seq))
    sequence = record.seq
    sequence_str = str(sequence).upper()
    
    # Calculate all 8 key parameters
    size_bp = len(sequence)
    gc_content = round(gc_fraction(sequence) * 100, 2)
    at_content = round(100 - gc_content, 2)
    n_count = sequence_str.count('N')
    cpg_count = sequence_str.count('CG')
    
    # Molecular weight (in Daltons)
    # Filter out N's for molecular weight calculation
    clean_seq = sequence_str.replace('N', '')
    if clean_seq:
        from Bio.Seq import Seq
        mol_weight = round(molecular_weight(Seq(clean_seq), seq_type='DNA'), 2)
    else:
        mol_weight = 0.0
    
    # Melting temperature using Wallace rule (simple estimate)
    # For very long sequences, use a sample to avoid computation issues
    tm_sample = str(sequence[:1000] if len(sequence) > 1000 else sequence)
    # Remove N's for Tm calculation
    tm_sample_clean = tm_sample.replace('N', '')
    try:
        if tm_sample_clean:
            tm_wallace = round(Tm_Wallace(tm_sample_clean), 2)
        else:
            tm_wallace = 0.0
    except:
        tm_wallace = 0.0  # Fallback if calculation fails
    
    # Nucleotide composition
    nucleotide_counts = calculate_nucleotide_counts(sequence_str)
    
    # 4-mer frequency analysis
    kmer_freq = calculate_kmer_frequencies(sequence_str, k=4, max_length=100000)
    
    # Sort k-mers by frequency and keep only top 100 for performance
    sorted_kmers = dict(sorted(kmer_freq.items(), key=lambda x: x[1], reverse=True)[:100])
    
    return {
        "filename": filename,
        "metrics": {
            "size_bp": size_bp,
            "gc_content": gc_content,
            "at_content": at_content,
            "n_count": n_count,
            "cpg_count": cpg_count,
            "mol_weight": mol_weight,
            "tm_wallace": tm_wallace
        },
        "nucleotide_counts": nucleotide_counts,
        "kmer_freq": sorted_kmers
    }


def normalize_metrics_for_radar(genome_a_metrics: Dict, genome_b_metrics: Dict) -> Dict:
    """
    Normalize metrics to 0-1 scale for radar chart display.
    Returns normalized values for both genomes.
    """
    metrics_to_normalize = ['size_bp', 'gc_content', 'at_content', 'n_count', 'cpg_count', 'mol_weight', 'tm_wallace']
    
    normalized_a = {}
    normalized_b = {}
    
    for metric in metrics_to_normalize:
        val_a = genome_a_metrics[metric]
        val_b = genome_b_metrics[metric]
        
        # Find min and max for normalization
        min_val = min(val_a, val_b)
        max_val = max(val_a, val_b)
        
        # Normalize to 0-1 (handle case where both values are equal)
        if max_val == min_val:
            normalized_a[metric] = 0.5
            normalized_b[metric] = 0.5
        else:
            normalized_a[metric] = round((val_a - min_val) / (max_val - min_val), 3)
            normalized_b[metric] = round((val_b - min_val) / (max_val - min_val), 3)
    
    return {
        "genome_a_normalized": normalized_a,
        "genome_b_normalized": normalized_b
    }
