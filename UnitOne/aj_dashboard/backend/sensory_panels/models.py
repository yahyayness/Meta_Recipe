from django.db import models

from projects.models import Projects
from sample_descriptions.models import SampleDescriptions


# Create your models here.

class SensoryPanel(models.Model):
    sample_id = models.ForeignKey(SampleDescriptions, on_delete=models.CASCADE, related_name='sensory_panel_sample',
                                  null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    judge = models.UUIDField(null=True, blank=True)
    panel_type = models.CharField(max_length=255, null=True, blank=True)
    panel_variable = models.CharField(max_length=255, null=True, blank=True)
    panel_value = models.FloatField(default=0)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='sensory_panels',
                                blank=False,
                                null=True)

    def __str__(self):
        return self.panel_type if self.panel_type else ''

    class Meta:
        unique_together = ('panel_variable', 'project')

class AbstractSensoryPanel(models.Model):
    name = models.CharField(max_length=225, unique=True)

    class Meta:
        db_table = 'abstract_sensory_panels'
        verbose_name = 'AbstractSensoryPanel'

    def __str__(self):
        return self.name
