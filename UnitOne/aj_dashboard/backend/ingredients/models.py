from django.db import models

# Create your models here.

class Ingredients(models.Model):
    name=models.CharField( max_length=50)
     
    

    class Meta:
        verbose_name = "Ingredients"
        verbose_name_plural = "Ingredients"

    def __str__(self):
        return self.name

class IngredientNode(models.Model):
    quantity=models.IntegerField()
    ingredient=models.ForeignKey(Ingredients, null=True,on_delete=models.CASCADE,related_name="node")

    def __str__(self):
      
        if self.ingredient is not None :
            return  self.ingredient.name
        else:
            return ""
  

 