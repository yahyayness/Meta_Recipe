from django.urls import path, include
from . import views
from rest_framework import routers

import recipes.api_views


router = routers.DefaultRouter()
# router.register('recipes', views.RecipeView)
router.register('ingredients', views.IngredientView)
router.register('aromas', views.AromaView)
router.register('taste', views.TasteView)
# router.register('landuse', views.LandUseView)
router.register('environmental-impact', views.EnvironmentalImpactView)
# router.register('testrecipes', views.TestRecipeView, basename='TestRecipes')
# router.register('ingofrecipe', views.IngOfRecipeView)
router.register('metarecipe', views.MetaRecipeView  )
router.register('single-recipe', views.SingleRecipeView  )
router.register('single-recipe-ingredient', views.SingleRecipeIngredientView  )
# router.register('eRecipe', views.RecipeIngsView.as_view({'get': 'list'}))
# router.register('eRecipe', views.RecipeIngsView)


urlpatterns = [
    # path('api/recipes/new/', recipes.api_views.RecipeCreate.as_view()),
    path('api/aromas/', recipes.api_views.AromaList.as_view()),
    path('api/aromas/<int:entity_id>/', recipes.api_views.AromaList.as_view()),
    path('api/recipesnames/', recipes.api_views.RecipeNameView.as_view()),
    # path('api/eRecipe/', views.RecipeIngsView.as_view({'get': 'list'})),
    path('', include(router.urls))
]