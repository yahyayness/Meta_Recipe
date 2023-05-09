from rest_framework import serializers
from .models import Ingredients,IngredientNode

class IngredientsSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ('__all__') 

class IngredientNodesCreateSerilizer(serializers.ModelSerializer):
    class Meta:
        model = IngredientNode
        fields = ('ingredient','quantity') 

class IngredientNodesSerilizer(serializers.ModelSerializer):
    ingredient=IngredientsSerilizer(read_only=True)
    class Meta:
        model = IngredientNode
        fields = ('ingredient','quantity') 