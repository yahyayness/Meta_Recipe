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
        extra_kwargs = {
            'project': {
                'required': False,
            },
        }
        fields = ['id', 'description', 'reference_author', 'aliquot_date', 'reagent', 'name', 'processes',
                  'ingredients', 'flow', 'created_at', 'updated_at', 'project', 'extra']

    def to_representation(self, instance):
        data = super(ProtocolSerializer, self).to_representation(instance)
        data['project_name'] = instance.project.name if instance.project else None
        data['meta_recipes_count'] = instance.protocol_meta_recipes.count()
        return data
