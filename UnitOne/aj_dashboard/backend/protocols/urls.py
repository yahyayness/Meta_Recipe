from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from common.utilities.Router import CustomRouter
from protocols.__views.ProtocolView import ProtocolView

router = DefaultRouter(trailing_slash=False)
router.register(r'', ProtocolView)
router.register(r'<int:pk>/adjustments', ProtocolView, basename='adjustments')
router.register(r'<int:pk>/similar', ProtocolView, 'get_similar_protocols')
urlpatterns = router.urls
