from django.db import models
from equipments.models import Equipment
# Create your models here.


class Sensors (models.Model):
    name = models.CharField(max_length = 255,unique=True)
    units=models.CharField(max_length = 255,null=True,blank=True)
    equipment=models.ForeignKey(Equipment,on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.name
 