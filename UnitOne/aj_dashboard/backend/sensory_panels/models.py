from django.db import models
from sample_descriptions.models import SampleDescriptions
# Create your models here.

class SensoryPanel(models.Model):
    sample_id=models.ForeignKey(SampleDescriptions,on_delete=models.CASCADE,related_name='sensory_panel_sample',null=True, blank=True)
    data=models.DateField(null=True, blank=True)
    judge=models.UUIDField(null=True, blank=True)
    panel_type=models.CharField(max_length=255,null=True, blank=True)
    panel_variable=models.CharField(max_length=255,null=True, blank=True)
    panel_value=models.CharField(max_length=255,null=True, blank=True)


    def __str__(self):
        return self.panel_type if self.panel_type else ''