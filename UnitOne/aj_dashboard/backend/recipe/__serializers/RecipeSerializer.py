from rest_framework import serializers

from meta_recipe.models import MetaRecipe
from recipe.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ['id', 'name','meta_recipe','protocol']
