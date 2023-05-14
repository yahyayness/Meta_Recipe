from django.urls import path,include
from . import views

 

urlpatterns = [
   
    path('ingredient-molecules/', views.ingredientMolecules_list.as_view()),
    path('ingredient-molecules/<int:pk>', views.ingredientMolecules_pk.as_view()),
] 

