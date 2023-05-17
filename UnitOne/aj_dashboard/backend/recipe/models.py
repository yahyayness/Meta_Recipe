from django.db import models
from django.db.models import Model

from meta_recipe.models import MetaRecipe
from protocols.models import Protocol


# Create your models here.

class Recipe(Model):
    meta_recipe = models.ForeignKey(MetaRecipe, on_delete=models.CASCADE, related_name='recipes_for_meta', blank=False,
                                    null=False)
    name = models.CharField(unique=True, blank=False, null=False)
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='recipes_for_protocol', blank=False,
                                 null=False)

    # amount = models.FloatField(null=False, default=0)

    class Meta:
        db_table = 'recipe'
        verbose_name = "Recipe"

    def __str__(self):
        return f"{self.meta_recipe.name} : {self.amount}"

