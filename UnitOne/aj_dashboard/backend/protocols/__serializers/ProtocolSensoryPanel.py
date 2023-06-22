from rest_framework import serializers

from protocols.models import ProtocolSensoryPanel


class ProtocolSensoryPanelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProtocolSensoryPanel
        fields = '__all__'