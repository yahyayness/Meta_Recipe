from rest_framework import serializers


from sensory_panels.models import AbstractSensoryPanel


class AbstractSensoryPanelSerializer(serializers.ModelSerializer):

    class Meta:
        model = AbstractSensoryPanel
        fields = ['id', 'name']