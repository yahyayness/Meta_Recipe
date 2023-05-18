from django.db import models
from django.db.models import Model

from ingredients.models import Ingredients
from meta_recipe.models import MetaRecipe
from protocols.models import Protocol


# Create your models here.

class Recipe(Model):
    meta_recipe = models.ForeignKey(MetaRecipe, on_delete=models.CASCADE, related_name='recipes_for_meta', blank=False,
                                    null=False)
    name = models.CharField(max_length=225, unique=True, null=False, default='')
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='recipes_for_protocol', blank=False,
                                 null=False)

    class Meta:
        db_table = 'recipe'
        verbose_name = "Recipe"

    def __str__(self):
        return f"{self.meta_recipe.name} : {self.name}"


class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients', blank=False,
                               null=False)
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='recipes', blank=False,
                                   null=False)
    unit = models.CharField(max_length=225, blank=False, null=False)
    amount = models.FloatField(blank=False, null=False, default=0)

    class Meta:
        db_table = 'recipe_ingredients'
        verbose_name = 'RecipeIngredient'

    def __str__(self):
        return f"{self.recipe.name} : {self.unit} : {self.amount}"
