from rest_framework import serializers

from meta_recipe.models import MetaRecipe
from recipe.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    amount = serializers.FloatField(required=True, allow_null=False, min_value=0)
    meta_recipe = serializers.PrimaryKeyRelatedField(
        required=True,
        read_only=False,
        queryset=MetaRecipe.objects.all()
    )

    class Meta:
        model = Recipe
        fields = ["id", "amount", "meta_recipe"]
