from django.shortcuts import render
from django.http import JsonResponse




# Create your views here.
def transcribe(request, seq):
    
    if type(seq) != str:
        return JsonResponse({"error":"invalid input type"})

    seq = seq.replace("\n","").replace("\r","")
    seq = seq.upper()

    mRNA = seq.replace("T","U")
    
    #if coding:
    #    mRNA = seq.replace("T","U")
    #else:
    #    seq = complement(seq)
    #    mRNA = seq.replace("T","U")
    
    return JsonResponse({
        "ok": True,
        "mRNA": mRNA
    })



def complement(seq):

    comp_table = str.maketrans("ACGT","TGCA")

    seq = seq[::-1]

    seq = seq.translate(comp_table)

    return seq