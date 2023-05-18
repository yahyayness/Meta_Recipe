from django.db import models

# Create your models here.
class Projects(models.Model):
    name=models.CharField(max_length=100)
    date=models.DateField(auto_now_add=True, blank=True, null=True)
    description=models.CharField(max_length=255, blank=True, null=True)
   
    def __str__(self):
        return self.name
