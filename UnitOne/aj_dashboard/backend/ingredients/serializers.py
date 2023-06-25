from rest_framework import serializers
from .models import Ingredients, IngredientNode


class IngredientsSerilizer(serializers.ModelSerializer):

    def get_or_create(self):
        return Ingredients.objects.get_or_create(**self.validated_data)

    class Meta:
        model = Ingredients
        fields = ('__all__')


class IngredientNodesCreateSerilizer(serializers.ModelSerializer):
    class Meta:
        model = IngredientNode
        fields = ('id', 'ingredient', 'quantity')


class IngredientNodesSerilizer(serializers.ModelSerializer):
    ingredient = IngredientsSerilizer(read_only=True)

    class Meta:
        model = IngredientNode
        fields = ('ingredient', 'quantity')
