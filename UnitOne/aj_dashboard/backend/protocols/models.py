from django.db import models

from common.Models.SoftDeleteModel import SoftDeleteModel


# Create your models here.

class Protocol(SoftDeleteModel):
    description = models.CharField(max_length=225, null=True)
    reference_author = models.CharField(max_length=225, null=True)
    aliquot_date = models.DateField(null=True)
    reagent = models.CharField(max_length=225,null=True)

    class Meta:
        db_table = 'protocols'
        verbose_name = "Protocol"

    def __str__(self):
        return self.reference_author
