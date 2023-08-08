from django.shortcuts import render
from django.http import JsonResponse
import json, requests

from django.core.paginator import Paginator
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
