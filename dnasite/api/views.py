from django.shortcuts import render
from django.http import JsonResponse
import json




# Create your views here.
def transcribe(request):
    seq = (json.loads(request.body).get("seq"))
    seq = seq.replace("\n","").replace("\r","").replace("%","").replace("0","")
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