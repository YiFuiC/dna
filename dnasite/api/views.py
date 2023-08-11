from django.shortcuts import render
from django.http import JsonResponse
import json, requests, urllib.request, py3Dmol

from pathlib import Path
from .utils import Paginate

# Create your views here.
def listProteins(request):

    # Construct URL for Protein API
    requestURL = ""
    requestURL = "https://www.ebi.ac.uk/proteins/api/coordinates?size=-1"
    
    datadict = dict(json.loads(request.body))

    # Get input from forms, and add to URL
    for x,y in datadict.items():
        x ,y = x.strip(), y.strip()

        requestURL += f"&{x}={y}"
    
    # Gets response back from Protein API
    print(requestURL)

    r = requests.get(requestURL, headers={ "Accept" : "application/json"})

    data = []

    if not r.json():
        return JsonResponse({'status': False, 'message': 'Query Does Not Exist'}, status = 500)

    # Build dictionary with core info of proteins to display in paginations
    for i in r.json():
        datadict = {
            "name" : i["name"],
            "taxid": i["taxid"],
            "accession": i["accession"]
        }

        try:
            datadict["fullName"] = i["protein"]["recommendedName"]["fullName"]

        except:
            datadict["fullName"]= i["protein"]["submittedName"][0]["fullName"]

        data.append(datadict)

        datadict = {}

    # Setup pagination  
    p, total_pages = Paginate(data, 50)

    return JsonResponse({
        'ok' : True,
        'data' : p,
        'total_pages' : total_pages
    })


def getProteinDetails(request):

    protein_accession = request.GET.get('proteinAccession')

    requestURL = f"https://www.ebi.ac.uk/proteins/api/coordinates?size=-1&accession={protein_accession}"

    details = requests.get(requestURL, headers={ "Accept" : "application/json"})

    requestPDBURL = f"https://alphafold.ebi.ac.uk/api/prediction/{details.json()[0]['accession']}"

    r = requests.get(requestPDBURL, headers={ "Accept" : "application/json"})

    data = dict(details.json()[0])

    #easy example to get 3d model working Accession number: A0A1B0GWF4

    try:
        data["PDBURL"] = r.json()[0]['pdbUrl']
    except:
        pass

    return JsonResponse({
        'ok': True,
        'data': data
    })
