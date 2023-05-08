from django.db import models

# Create your models here.

class Ingredients(models.Model):
    name=models.CharField( max_length=50)
    unit=models.CharField( max_length=50)
    

    class Meta:
        verbose_name = "Ingredients"
        verbose_name_plural = "Ingredients"

    def __str__(self):
        return self.name

 