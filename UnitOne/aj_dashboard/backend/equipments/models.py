from django.db import models
from django.utils.translation import gettext as _


# Create your models here.

class Equipment(models.Model):
    class EquipmentTypes(models.TextChoices):
        COOKING = "cooking", _("cooking")
        SENSOR = "sensor", _("sensor")

    name = models.CharField(max_length=225, unique=True)
    type = models.CharField(
        max_length=225,
        choices=EquipmentTypes.choices,
        default=EquipmentTypes.COOKING,
    )

    class Meta:
        db_table = 'equipments'
        verbose_name = 'Equipment'

    def __str__(self):
        return self.name
