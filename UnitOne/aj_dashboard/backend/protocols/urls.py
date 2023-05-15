from django.urls import path

from protocols.__views.ProtocolView import ProtocolView

urlpatterns = [
    path('', ProtocolView.as_view()),
    path('<int:protocol_id>', ProtocolView.as_view()),
]