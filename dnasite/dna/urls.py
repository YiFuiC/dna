from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("view/<path:protein_accession>", views.protein_details, name="protein_details")
]