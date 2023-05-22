from rest_framework import serializers
from .models import SensoryPanel
from sample_descriptions.serializers import SampleDescriptionsCreateSerializers

 
class SensoryPanelsCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = SensoryPanel
        fields = ('__all__') 


class SensoryPanelsSerializers(serializers.ModelSerializer):
     sample_id=SampleDescriptionsCreateSerializers(read_only=True)
     class Meta:
        model = SensoryPanel
        fields = ['id','judge','data','sample_id','panel_type','panel_variable','panel_value'] 
 