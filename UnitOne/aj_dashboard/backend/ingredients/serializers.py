from rest_framework import serializers
from .models import Ingredients, IngredientNode


class IngredientsSerilizer(serializers.ModelSerializer):

    def get_or_create(self, unique_fields=[]):
        unique_fields_dict = {}
        defaults = self.validated_data
        if len(unique_fields):
            unique_fields_dict = {key: self.validated_data[key] for key in unique_fields}
            defaults = {key: defaults[key] for key in defaults if key not in unique_fields}
        return self.Meta.model.objects.get_or_create(**unique_fields_dict, **defaults)

    def update_or_create(self, unique_fields=[]):
        unique_fields_dict = {}
        defaults = self.validated_data
        if len(unique_fields):
            unique_fields_dict = {key: self.validated_data[key] for key in unique_fields}
            defaults = {key: defaults[key] for key in defaults if key not in unique_fields}
        return self.Meta.model.objects.update_or_create(**unique_fields_dict, **defaults)

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
