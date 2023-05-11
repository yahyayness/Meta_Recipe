from rest_framework import serializers

from ingredients.models import Ingredients
from ingredients.serializers import IngredientsSerilizer
from meta_recipe.models import MetaRecipe


class MetaRecipeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=180,
        required=True
    )
    min = serializers.FloatField(required=False, allow_null=True, min_value=0)
    max = serializers.FloatField(required=False, allow_null=True, min_value=0)
    ingredient = serializers.PrimaryKeyRelatedField(
        required=False,
        read_only=False,
        queryset=Ingredients.objects.all()
    )
    dependent_ingredient = serializers.PrimaryKeyRelatedField(
        required=False,
        read_only=False,
        queryset=Ingredients.objects.all()
    )
    unit = serializers.CharField(
        max_length=180,
        required=False
    )

    class Meta:
        model = MetaRecipe
        fields = ["id", "name", "ingredient", "min", "max", "dependent_ingredient", 'unit']
