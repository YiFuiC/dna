import json
from django.shortcuts import render
from django.http import JsonResponse


def check_sequence(seq: str, seq_type: str):
    
    # Determine the type of sequence that is being passed
    if seq_type == "DNA":
        bases = set("ACGT")
    elif seq_type == "RNA":
        bases = set("ACGU")
    else:
        return JsonResponse({
            'ok': False,
            'error': "Invalid Sequence"
        })
    
    # Check that the sequence only contains specified bases
    if bases.issubset(seq):
        return True
    else :
        return False









