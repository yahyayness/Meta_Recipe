from rest_framework.routers import DefaultRouter

from setup.__views.Setup import SetupView

router = DefaultRouter(trailing_slash=False)
router.register(r'', SetupView)
urlpatterns = router.urls
