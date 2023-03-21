from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import *
from .serializers import *


class IngredientView(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class AromaView(viewsets.ModelViewSet):
    queryset = Aroma.objects.all()
    serializer_class = AromaSerializer


class TasteView(viewsets.ModelViewSet):
    queryset = Taste.objects.all()
    serializer_class = TasteSerializer


class MetaRecipeView(viewsets.ModelViewSet):
    queryset = MetaRecipe.objects.all()
    serializer_class = MetaRecipeSerializer


class SingleRecipeView(viewsets.ModelViewSet):
    queryset = SingleRecipe.objects.all()
    serializer_class = SingleRecipeSerializer


class SingleRecipeIngredientView(viewsets.ModelViewSet):
    queryset = SingleRecipeIngredient.objects.all()
    serializer_class = SingleRecipeIngredientSerializer


"""
https://science.sciencemag.org/content/sci/suppl/2018/05/30/360.6392.987.DC1/aaq0216-Poore-SM-revision1.pdf
page 5

"""


class EnvironmentalImpactView(viewsets.ModelViewSet):
    queryset = EnvironmentalImpact.objects.all()
    serializer_class = EnvironmentalImpactSerializer

# class RecipeView(viewsets.ModelViewSet):
#     queryset = Recipe.objects.all()
#     serializer_class = RecipeSerializer
#
#     def create(self, request, *args, **kwargs):
#         data = request.data
#
#         new_recipe = Recipe.objects.create(
#             name=data['name'],
#             diet=data['diet'],
#             category=data['category'],
#             # ingredients=IngredientOfRecipe.objects.get(data['ingredients']),
#             # for ing in data['ingredients']:
#
#         )
#         new_recipe.save()
#
#         serializer = self.get_serializer(new_recipe)
#         return Response(serializer.data)

# if isinstance(data, list):
#     serializer = self.get_serializer(data=request.data, many=True)
# else:
#     serializer = self.get_serializer(data=request.data)
# if serializer.is_valid():
#     serializer.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)
# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#
# class LandUseView(viewsets.ModelViewSet):
#     queryset = LandUse.objects.all()
#     serializer_class = LandUseSerializer


# class TestRecipeView(viewsets.ModelViewSet):
#     queryset = TestRecipe.objects.all()
#     serializer_class = TestRecipeSerializer

#
# class IngOfRecipeView(viewsets.ModelViewSet):
#     queryset = IngredientOfRecipe.objects.all()
#     serializer_class = IngOfRecipeSerializer
#
#     # def create(self, request, *args, **kwargs):
#     def create(self, request, *args, **kwargs):
#         data = request.data
#
#         if isinstance(data, list):
#             serializer = self.get_serializer(data=request.data, many=True)
#         else:
#             serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#
# class RecipeIngsView(viewsets.ViewSet):
#
#     def list(self, request):
#         queryset = IngredientOfRecipe.objects.select_related('recipe').all()
#         serializer = RecipeIngsSerializer(queryset, many=True)
#         return Response(serializer.data)
