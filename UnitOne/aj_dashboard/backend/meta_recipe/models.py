from django.db import models
from django.db.models import Model

from ingredients.models import Ingredients


# Create your models here.

class MetaRecipe(Model):
    name = models.CharField(max_length=180)
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='meta_recipe',blank=True, null=True)
    min = models.FloatField(null=True)
    max = models.FloatField(null=True)
    dependent_ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='dependent_meta_recipe', blank=True, null=True)
    unit = models.CharField(max_length=180, blank=True, null=True)

    class Meta:
        db_table = 'meta_recipe'
        verbose_name = "MetaRecipe"

    def __str__(self):
        return self.name
