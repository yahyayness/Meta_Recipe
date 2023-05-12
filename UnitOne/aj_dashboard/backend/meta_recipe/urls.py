from django.urls import path

from meta_recipe.__views.MetaRecipeView import MetaRecipeView

urlpatterns = [
    path('', MetaRecipeView.as_view()),
    path('<int:meta_recipe_id>', MetaRecipeView.as_view()),
]