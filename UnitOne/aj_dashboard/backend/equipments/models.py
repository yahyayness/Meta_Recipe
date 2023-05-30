from django.db import models
from django.utils.translation import gettext as _

from projects.models import Projects


# Create your models here.

class Equipment(models.Model):
    class EquipmentTypes(models.TextChoices):
        COOKING = "cooking", _("cooking")
        SENSOR = "sensor", _("sensor")

    name = models.CharField(max_length=225)
    brand = models.CharField(max_length=225, null=True, blank=True)
    model = models.CharField(max_length=225, null=True, blank=True)
    type = models.CharField(
        max_length=225,
        choices=EquipmentTypes.choices,
        default=EquipmentTypes.COOKING,
    )
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='equipments',
                                blank=False,
                                null=True)

    class Meta:
        db_table = 'equipments'
        verbose_name = 'Equipment'
        unique_together = ('name', 'project')

    def __str__(self):
        return self.name
