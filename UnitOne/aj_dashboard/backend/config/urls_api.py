 
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include("ingredients.urls")),
    path('', include("molecules.urls")),
    path('', include("process.urls")),
    path('', include("ingredient_molecules.urls")),
    path('', include("projects.urls")),
    path('users/', include('users.urls')),
    path('', include('meta_recipe.urls')),
    path('recipes/', include('recipe.urls')),
    path('protocols/', include('protocols.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)