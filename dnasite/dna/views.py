from django.shortcuts import render
from django.http import JsonResponse

import requests
# Create your views here.

def home(request):

    return render(request, "dna/home.html")


def protein_details(request, protein_accession):
    
    requestURL = f"https://www.ebi.ac.uk/proteins/api/coordinates?size=-1&accession={protein_accession}"

    r = requests.get(requestURL, headers={"Accept": "application/json"})

    if "errorMessage" in r.json():
        print(r.json())
        return JsonResponse({'status': False, 'message': 'Query Does Not Exist'}, status = 500)


    return render(request, "dna/protein_details.html")