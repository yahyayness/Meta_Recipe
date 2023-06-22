from rest_framework import serializers
from .models import Sensors
from equipments.__serializers.Equipment import EquipmentSerializer

class SensorsCreateSerializers(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(SensorsCreateSerializers, self).__init__(*args, **kwargs)
        if self.context.get('for_cloning'):
            self.fields.pop('id')
            self.fields.pop('project')
    class Meta:
        model = Sensors
        fields = ('__all__') 


class SensorsSerializers(serializers.ModelSerializer):
    equipment = EquipmentSerializer(read_only=True)
    class Meta:
        model = Sensors
        fields = ['id','name','units','equipment','project']
 