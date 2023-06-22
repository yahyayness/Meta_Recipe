from rest_framework import serializers

from protocols.models import ProtocolIngredient


class ProtocolIngredientSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.SerializerMethodField()

    class Meta:
        model = ProtocolIngredient
        fields = '__all__'

    def get_ingredient_name(self, obj):
        return obj.ingredient.name
