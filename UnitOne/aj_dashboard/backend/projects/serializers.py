from rest_framework import serializers

from analytical_chemistry.serializers import AnalyticalChemistryCreateSerializers
from equipments.__serializers.Equipment import EquipmentSerializer
from protocols.__serializers.ProtocolSerializer import ProtocolSerializer
from sensors.serializers import SensorsCreateSerializers
from sensory_panels.serializers import SensoryPanelsSerializers, SensoryPanelsCreateSerializers
from .models import Projects


class ProjrctSerilizer(serializers.ModelSerializer):
    context = {
        'for_cloning': True
    }
    sensory_panels = SensoryPanelsCreateSerializers(many=True, read_only=True, context=context)
    sensors = SensorsCreateSerializers(many=True, read_only=True, context=context)
    equipments = EquipmentSerializer(many=True, read_only=True, context=context)
    analytical_chemistry = AnalyticalChemistryCreateSerializers(many=True, read_only=True, context=context)
    protocols = ProtocolSerializer(many=True, read_only=True, context=context)

    class Meta:
        model = Projects
        fields = '__all__'
