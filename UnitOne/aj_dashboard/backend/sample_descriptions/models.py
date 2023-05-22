from django.db import models

from recipe.models import Recipe
from meta_recipe.models import MetaRecipe
# Create your models here.


class SampleDescriptions(models.Model):
    name=models.CharField(max_length=255,  unique=True)
    recipe=models.ForeignKey(Recipe, null=True,on_delete=models.CASCADE,related_name="recipe_sample_descriptions")
    metaRecipe=models.ForeignKey(MetaRecipe, null=True,on_delete=models.CASCADE,related_name="metarecipe_sample_descriptions")

    def __str__(self):
        return self.name