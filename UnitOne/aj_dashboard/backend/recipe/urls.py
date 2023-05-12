from django.urls import path

from recipe.__views.RecipeView import RecipeView

urlpatterns = [
    path('', RecipeView.as_view()),
    path('<int:recipe_id>', RecipeView.as_view()),
]