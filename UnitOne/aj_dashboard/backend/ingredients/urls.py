from django.urls import path,include
from . import views

from rest_framework import routers
 

router = routers.DefaultRouter()
router.register('', views.Ingredients)
router2 = routers.DefaultRouter()
router2.register('', views.Ingredient_Node)



urlpatterns = [
    path('ingredients/', include(router.urls)),
    path('ingredientnodes/', views.IngredientNodeF),
    path('ingredientnodes/<int:pk>', views.IngredientNodeItem),
] 

