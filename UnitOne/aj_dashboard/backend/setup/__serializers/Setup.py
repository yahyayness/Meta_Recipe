from rest_framework import serializers

from setup.models import Setup


class SetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setup
        fields = ['id', 'operation_level', 'cuisine_requirement_profile', 'culinary_cultural_profile']
