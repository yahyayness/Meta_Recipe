from django.urls import path, include

from users.__views.UserView import UserView

urlpatterns = [
    path('', UserView.as_view()),
    path('<int:user_id>', UserView.as_view()),
]