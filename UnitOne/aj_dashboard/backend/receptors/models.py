from django.db import models

# Create your models here.


class Receptor(models.Model):
    name = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=255, unique=True)
    uniprot_id = models.CharField(max_length=255, null=True,blank=True)
    sensory_qualities = models.CharField(max_length=255, null=True,blank=True)
    
    def __str__(self):
        return self.name