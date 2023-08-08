from django.urls import path

from . import views

urlpatterns = [
    path("listProteins",
         views.listProteins,
         name="listProteins"),
]