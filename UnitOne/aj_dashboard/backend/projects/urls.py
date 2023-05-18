from django.urls import path,include
from . import views


urlpatterns = [
   
    path('project/', views.ProjectList),
    #path('project/<int:pk>', views.IngredientNodeItem),
] 

