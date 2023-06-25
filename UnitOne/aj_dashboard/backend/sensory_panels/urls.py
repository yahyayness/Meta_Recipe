from django.urls import path

from sensory_panels.__views.AbstractSensoryPanel import AbstractSensoryPanelView

urlpatterns = [
    path('abstract', AbstractSensoryPanelView.as_view()),
    path('abstract/<int:abstract_sensory_panel_id>', AbstractSensoryPanelView.as_view()),
]