from django.urls import path

from .views import sampleDescriptionsView

urlpatterns = [
    path('', sampleDescriptionsView.as_view()),
    path('<int:pk>', sampleDescriptionsView.as_view()),
]