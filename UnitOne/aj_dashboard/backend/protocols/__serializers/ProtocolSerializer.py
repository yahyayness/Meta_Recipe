from rest_framework import serializers

from protocols.models import Protocol


class ProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Protocol
        fields = ['id', 'description', 'reference_author', 'aliquot_date', 'reagent']
