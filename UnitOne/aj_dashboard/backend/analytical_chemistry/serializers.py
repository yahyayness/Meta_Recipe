from rest_framework import serializers
from .models import AnalyticalChemistry
from sensors.serializers import SensorsSerializers
from sample_descriptions.serializers import SampleDescriptionsSerializers

class AnalyticalChemistryCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = AnalyticalChemistry
        fields = ('__all__') 


class AnalyticalChemistrySerializers(serializers.ModelSerializer):
    sensor = SensorsSerializers(read_only=True)
    sample = SampleDescriptionsSerializers(read_only=True)
    class Meta:
        model = AnalyticalChemistry
        fields = ['id','sample','sensor','date','method','assay_component','variable','value','unit'] 
 