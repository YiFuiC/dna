import json
from django.shortcuts import render
from django.http import JsonResponse


def Paginate(items: list, items_per_page: int):

    pages = {}

    total_pages = len(items) // items_per_page

    for i in range(0, total_pages+1):
        pages[i+1] = [item for item in items[i*items_per_page: (i+1)*items_per_page]]

    total_pages = list(pages.keys())[-1]
    
    return pages, total_pages
    







