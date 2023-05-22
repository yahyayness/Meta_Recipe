from rest_framework import serializers
from .models import Sensors
from equipments.__serializers.Equipment import EquipmentSerializer

class SensorsCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sensors
        fields = ('__all__') 


class SensorsSerializers(serializers.ModelSerializer):
    equipment = EquipmentSerializer(read_only=True)
    class Meta:
        model = Sensors
        fields = ['id','name','units','equipment'] 
 