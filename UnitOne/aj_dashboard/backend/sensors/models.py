from django.db import models
from equipments.models import Equipment
from projects.models import Projects


# Create your models here.


class Sensors(models.Model):
    name = models.CharField(max_length=255)
    units = models.CharField(max_length=255, null=True, blank=True)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='sensors',
                                blank=False,
                                null=True)

    class Meta:
        unique_together = ('name', 'project')

    def __str__(self):
        return self.name
