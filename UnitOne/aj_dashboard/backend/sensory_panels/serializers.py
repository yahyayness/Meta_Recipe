from rest_framework import serializers
from .models import SensoryPanel
from sample_descriptions.serializers import SampleDescriptionsCreateSerializers

 
class SensoryPanelsCreateSerializers(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(SensoryPanelsCreateSerializers, self).__init__(*args, **kwargs)
        if self.context.get('for_cloning'):
            self.Meta.fields = ['judge','date','sample_id','panel_type','panel_variable','panel_value']
    class Meta:
        model = SensoryPanel
        fields = ('__all__') 


class SensoryPanelsSerializers(serializers.ModelSerializer):
     sample_id=SampleDescriptionsCreateSerializers(read_only=True)
     class Meta:
        model = SensoryPanel
        fields = ['id','judge','date','sample_id','panel_type','panel_variable','panel_value', 'project']
 