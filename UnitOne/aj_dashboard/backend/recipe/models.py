from django.db import models
from django.db.models import Model

from equipments.models import Equipment
from ingredients.models import Ingredients
from meta_recipe.models import MetaRecipe
from process.models import Process
from protocols.models import Protocol
from django.utils.translation import gettext as _


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
    quantity = models.FloatField(blank=False, null=False, default=0)

    class Meta:
        db_table = 'recipe_ingredients'
        verbose_name = 'RecipeIngredient'

    def __str__(self):
        return f"{self.recipe.name} : {self.unit} : {self.quantity}"


class RecipeProcess(models.Model):
    class TimeStep(models.TextChoices):
        SEQUENTIAL = "sequential", _("sequential")
        PARALLEL = "parallel", _("parallel")
        DISCRETIZED = "discretized ", _("discretized")

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_processes', blank=False,
                               null=False)
    process = models.ForeignKey(Process, on_delete=models.CASCADE, related_name='recipe_concrete_processes',
                                blank=False, null=False)
    start_time = models.DateTimeField(null=True)
    duration = models.IntegerField(null=True)
    duration_type = models.CharField(max_length=225, null=True)
    input_ingredients = models.JSONField(null=True)
    output_ingredients = models.JSONField(null=True)
    next_process_id = models.ForeignKey('self', on_delete=models.CASCADE, related_name='next_process', blank=False,
                                        null=True)
    time_step = models.CharField(
        max_length=12,
        choices=TimeStep.choices,
        default=TimeStep.SEQUENTIAL,
    )
    arguments = models.JSONField(null=True)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='equipment_processes', blank=False,
                                  null=True)
    value = models.CharField(max_length=225, null=True)

    class Meta:
        db_table = 'recipe_processes'
        verbose_name = 'RecipeProcess'

    def __str__(self):
        return f"{self.recipe.name}"


class RecipeNode(models.Model):
    class ModelType(models.TextChoices):
        INGREDIENT = "ingredient", _("ingredient")
        PROCESS = "process", _("process")
        MERGE = "merge ", _("merge")
        SERVE = "serve ", _("serve")

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_nodes', blank=False,
                               null=False)
    model_type = models.CharField(
        max_length=12,
        choices=ModelType.choices,
        null=True
    )

    model_id = models.BigIntegerField(null=True)
    container = models.CharField(max_length=225, null=True)
    slug = models.CharField(max_length=225, null=True)
    payload = models.JSONField(null=True)
    type = models.CharField(max_length=225, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'recipe_nodes'
        verbose_name = 'RecipeNode'

    def __str__(self):
        return self.recipe.name


class RecipeEdge(models.Model):
    source_node = models.ForeignKey(RecipeNode, on_delete=models.CASCADE, related_name='source_node_edges',
                                    blank=False,
                                    null=False)
    target_node = models.ForeignKey(RecipeNode, on_delete=models.CASCADE, related_name='target_node_edges',
                                    blank=False,
                                    null=False)

    class Meta:
        db_table = 'recipe_edges'
        verbose_name = 'RecipeEdge'

    def __str__(self):
        return f"{self.source_node}  >> {self.target_node}"
