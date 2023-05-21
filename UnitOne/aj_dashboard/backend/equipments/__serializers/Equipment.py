from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from equipments.models import Equipment


class EquipmentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=225, required=True, validators=[
        UniqueValidator(queryset=Equipment.objects.all())
    ])

    class Meta:
        model = Equipment
        fields = ['id', 'name', 'type']
