from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from equipments.models import Equipment


class EquipmentSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(EquipmentSerializer, self).__init__(*args, **kwargs)
        if self.context.get('for_cloning'):
            self.fields.pop('id')
            self.fields.pop('project')

    # name = serializers.CharField(max_length=225, required=True, validators=[
    #     UniqueValidator(queryset=Equipment.objects.all())
    # ])

    class Meta:
        model = Equipment
        fields = '__all__'
