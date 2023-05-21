from django.urls import path
from rest_framework.routers import DefaultRouter

from equipments.__views.Equipment import EquipmentView

urlpatterns = [
    path('', EquipmentView.as_view()),
    path('<int:pk>', EquipmentView.as_view()),
]