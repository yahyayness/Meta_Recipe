from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from protocols.models import Protocol


class ProtocolSerializer(serializers.ModelSerializer):
    # name = serializers.CharField(max_length=70, required=True, validators=[
    #     UniqueValidator(queryset=Protocol.objects.all())
    # ])

    flow = serializers.JSONField(required=False, initial=dict)

    class Meta:
        model = Protocol
        fields = ['id', 'description', 'reference_author', 'aliquot_date', 'reagent', 'name', 'processes',
                  'ingredients', 'flow', 'created_at', 'updated_at', 'project', 'project_id']
