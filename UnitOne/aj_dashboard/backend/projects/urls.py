from django.urls import path,include
from . import views


urlpatterns = [
   
    path('project/', views.ProjectList),
    path('project/<int:pk>', views.ProjectItem),
    path('project/clone', views.clone),
    path('project/bulk_destroy', views.bulk_destroy),
]

