from django.db import models
from django.db.models import Model

from ingredients.models import Ingredients
from common.Models.SoftDeleteModel import SoftDeleteModel


# Create your models here.

class MetaRecipe(SoftDeleteModel):
    name = models.CharField(max_length=180)

    class Meta:
        db_table = 'meta_recipe'
        verbose_name = "MetaRecipe"

    def __str__(self):
        return self.name
    
class MetaRecipeIngredients(SoftDeleteModel):
    meta_recipe = models.ForeignKey(MetaRecipe, on_delete=models.CASCADE, related_name='meta_recipe_parent',blank=True, null=True)
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='meta_recipe_ingredient',blank=True, null=True)
    min = models.FloatField(null=True)
    max = models.FloatField(null=True)
    dependent_ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='dependent_meta_recipe_ingredient', blank=True, null=True)
    unit = models.CharField(max_length=180, blank=True, null=True)

    class Meta:
        db_table = 'meta_recipe_ingredients'
        verbose_name = "MetaRecipe Ingredients"

    def __str__(self):
        return self.ingredient.name
