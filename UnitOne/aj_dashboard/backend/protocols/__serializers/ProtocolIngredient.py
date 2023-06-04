from rest_framework import serializers

from protocols.models import ProtocolIngredient


class ProtocolIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProtocolIngredient
        fields = '__all__'
