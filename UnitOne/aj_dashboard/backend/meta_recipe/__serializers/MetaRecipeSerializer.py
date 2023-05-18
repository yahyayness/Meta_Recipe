from rest_framework import serializers

from ingredients.models import Ingredients
from meta_recipe.models import MetaRecipe


class MetaRecipeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=180,
        required=True
    )
     

    class Meta:
        model = MetaRecipe
        fields = ["id", "name"]
