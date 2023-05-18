from rest_framework import serializers

from ingredients.models import Ingredients
from meta_recipe.models import MetaRecipeIngredients,MetaRecipe


class MetaRecipeIngredientsSerializer(serializers.ModelSerializer):
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
    meta_recipe = serializers.PrimaryKeyRelatedField(
        required=True,
        read_only=False,
        queryset=MetaRecipe.objects.all()
    )


    class Meta:
        model = MetaRecipeIngredients
        fields = ["id", "ingredient", "min", "max", "dependent_ingredient", 'unit','meta_recipe']
