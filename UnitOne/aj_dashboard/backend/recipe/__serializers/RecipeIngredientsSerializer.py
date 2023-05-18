from rest_framework import serializers

from recipe.models import RecipeIngredients


class RecipeIngredientsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RecipeIngredients
        fields = ["recipe","ingredient","unit","amount"]
