from rest_framework import serializers
from .models import SensoryPanel
from sample_descriptions.serializers import SampleDescriptionsCreateSerializers

 
class SensoryPanelsCreateSerializers(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(SensoryPanelsCreateSerializers, self).__init__(*args, **kwargs)
        if self.context.get('for_cloning'):
            self.fields.pop('id')
            self.fields.pop('project')

    def get_or_create(self, unique_fields=[]):
        unique_fields_dict = {}
        defaults = self.validated_data
        if len(unique_fields):
            unique_fields_dict = {key: self.validated_data[key] for key in unique_fields}
            defaults = {key: defaults[key] for key in defaults if key not in unique_fields}
        return self.Meta.model.objects.get_or_create(**unique_fields_dict, **defaults)

    def update_or_create(self, unique_fields=[]):
        unique_fields_dict = {}
        defaults = self.validated_data
        if len(unique_fields):
            unique_fields_dict = {key: self.validated_data[key] for key in unique_fields}
            defaults = {key: defaults[key] for key in defaults if key not in unique_fields}
        return self.Meta.model.objects.update_or_create(**unique_fields_dict, **defaults)

    class Meta:
        model = SensoryPanel
        fields = ('__all__') 


class SensoryPanelsSerializers(serializers.ModelSerializer):
     sample_id=SampleDescriptionsCreateSerializers(read_only=True)
     class Meta:
        model = SensoryPanel
        fields = ['id','judge','date','sample_id','panel_type','panel_variable','panel_value', 'project']
 