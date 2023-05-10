from django.urls import path
from .views import MyObtainTokenPairView, RestLogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/logout', RestLogoutView.as_view(), name='logout_token'),
]
