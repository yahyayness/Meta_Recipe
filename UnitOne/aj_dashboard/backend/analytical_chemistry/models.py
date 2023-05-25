from django.db import models
from sample_descriptions.models import SampleDescriptions
from sensors.models import Sensors
# Create your models here.

class AnalyticalChemistry(models.Model):
    sample=models.ForeignKey(SampleDescriptions,on_delete=models.CASCADE,related_name="analytical_chemistry_sample_description",null=True,blank=True)
    sensor=models.ForeignKey(Sensors,on_delete=models.CASCADE,related_name="analytical_chemistry_sensor",null=True,blank=True)
    date=models.DateField(null=True,blank=True)
    method=models.CharField(max_length=255,null=True,blank=True)
    assay_component=models.CharField(max_length=255,null=True,blank=True)
    variable=models.CharField(max_length=255,null=True,blank=True)
    value=models.CharField(max_length=255,null=True,blank=True)
    unit=models.CharField(max_length=255,null=True,blank=True)

   

    def __str__(self):
        return self.sensor.name + '' + self.sample.name

     
