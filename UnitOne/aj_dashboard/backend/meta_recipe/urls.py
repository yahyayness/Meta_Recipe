from django.urls import path

from meta_recipe.__views.MetaRecipeView import MetaRecipeView
from meta_recipe.__views.MetaRecipeIngredientsView import MetaRecipeIngredientsView

urlpatterns = [
    path('meta_recipes/', MetaRecipeView.as_view()),
    path('meta_recipes/<int:meta_recipe_id>', MetaRecipeView.as_view()),
    path('meta-recipes-ingredients/', MetaRecipeIngredientsView.as_view()),
    path('meta-recipes-ingredients/<int:meta_recipe_id>', MetaRecipeIngredientsView.as_view()),
]