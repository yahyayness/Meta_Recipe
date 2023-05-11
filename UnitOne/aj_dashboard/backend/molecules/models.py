from django.db import models

# Create your models here.

class Molecules(models.Model):
    name=models.CharField( max_length=50)
    unit=models.CharField( max_length=50)
    

    class Meta:
        verbose_name = "Molecules"
        verbose_name_plural = "Molecules"

    def __str__(self):
        return self.name

class MoleculesNode(models.Model):
    quantity=models.IntegerField()
    molecule=models.ForeignKey(Molecules, null=True,on_delete=models.CASCADE,related_name="node")

    def __str__(self):
      
        if self.molecule is not None :
            return  self.molecule.name
        else:
            return ""
  

 