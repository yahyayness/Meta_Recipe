from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.__views.UserView import UserView

router = DefaultRouter(trailing_slash=False)
router.register(r'', UserView)
urlpatterns = router.urls
