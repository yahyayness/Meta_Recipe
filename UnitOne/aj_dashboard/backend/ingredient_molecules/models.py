from django.db import models
from ingredients.models import IngredientNode
from molecules.models import MoleculesNode
# Create your models here.


class IngredientMolecules(models.Model):
    ingredient=models.ForeignKey(IngredientNode,null=True,blank=True,on_delete=models.DO_NOTHING,related_name="ingredientOpj")
    molecules=models.ForeignKey(MoleculesNode,null=True,blank=True,on_delete=models.DO_NOTHING,related_name="moleculesOpj")
    mass_concentration_min=models.FloatField(null=True,blank=True)
    mass_concentration_max=models.FloatField(null=True,blank=True)