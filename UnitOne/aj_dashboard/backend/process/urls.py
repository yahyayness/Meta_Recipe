from django.urls import path,include
from . import views

from rest_framework import routers
 

urlpatterns = [
   
    path('process/', views.Process_list.as_view()),
    path('process/<int:pk>', views.Process_pk.as_view()),
] 

