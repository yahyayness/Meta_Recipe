from django.urls import path,include
from . import views


 

urlpatterns = [
    path('molecules/', views.molecules_list.as_view()),
    path('molecules/<int:pk>', views.molecules_pk.as_view()),
    path('moleculenodes/', views.moleculeNode_list.as_view()),
     path('moleculenodes/<int:pk>', views.moleculeNode_pk.as_view()),
] 
