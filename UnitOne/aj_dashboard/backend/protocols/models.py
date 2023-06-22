from django.db import models
from django.utils.translation import gettext as _

from common.Models.SoftDeleteModel import SoftDeleteModel
from ingredients.models import Ingredients
from process.models import Process
from projects.models import Projects


# Create your models here.

class Protocol(SoftDeleteModel):
    description = models.CharField(max_length=225, null=True)
    reference_author = models.CharField(max_length=225, null=True)
    aliquot_date = models.DateField(null=True)
    reagent = models.CharField(max_length=225, null=True)
    name = models.CharField(max_length=225, null=False, blank=False)
    processes = models.JSONField(null=True, blank=False)
    ingredients = models.JSONField(null=True, blank=False)
    flow = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='protocols',
                                null=True, default=None)
    extra = models.JSONField(null=True, blank=False, default=dict)
    ingredients_list = models.ManyToManyField(Ingredients, through='ProtocolIngredient',
                                              related_name='ingredients_list', blank=True)

    class Meta:
        db_table = 'protocols'
        verbose_name = "Protocol"
        unique_together = ('name', 'project')

    def __str__(self):
        return self.name


class ProtocolProcess(models.Model):
    class TimeStep(models.TextChoices):
        SEQUENTIAL = "sequential", _("sequential")
        PARALLEL = "parallel", _("parallel")
        DISCRETIZED = "discretized ", _("discretized")

    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='protocol_processes', blank=False,
                                 null=False)
    process = models.ForeignKey(Process, on_delete=models.CASCADE, related_name='protocol_concrete_processes',
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
    value = models.CharField(max_length=225, null=True)

    class Meta:
        db_table = 'protocol_processes'
        verbose_name = 'ProtocolProcess'

    def __str__(self):
        return f"{self.protocol.reference_author} : {self.process.name}"


class ProtocolNode(models.Model):
    class ModelType(models.TextChoices):
        INGREDIENT = "ingredient", _("ingredient")
        PROCESS = "process", _("process")
        MERGE = "merge ", _("merge")
        SERVE = "serve ", _("serve")

    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='protocol_nodes', blank=False,
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
        db_table = 'protocol_nodes'
        verbose_name = 'ProtocolNode'

    def __str__(self):
        return self.protocol.name


class ProtocolEdge(models.Model):
    source_node = models.ForeignKey(ProtocolNode, on_delete=models.CASCADE, related_name='source_node_edges',
                                    blank=False,
                                    null=False)
    target_node = models.ForeignKey(ProtocolNode, on_delete=models.CASCADE, related_name='target_node_edges',
                                    blank=False,
                                    null=False)

    class Meta:
        db_table = 'protocol_edges'
        verbose_name = 'ProtocolEdge'

    def __str__(self):
        return f"{self.source_node}  >> {self.target_node}"


class ProtocolIngredient(models.Model):
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='protocol_ingredient',
                                 blank=False,
                                 null=False)
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='protocol_ingredient',
                                   blank=False,
                                   null=False)
    unit = models.CharField(max_length=225, blank=False, null=False)
    quantity = models.FloatField(blank=False, null=False, default=0)

    class Meta:
        db_table = 'protocol_ingredients'
        verbose_name = 'ProtocolIngredient'

    def __str__(self):
        return f"{self.unit}  >> {self.quantity}"


class ProtocolSensoryPanel(models.Model):
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, related_name='custom_sensory_panels',
                                 blank=False,
                                 null=False)
    variable = models.CharField(max_length=225, null=False, blank=False)
    value = models.FloatField(default=0)

    class Meta:
        db_table = 'protocol_sensory_panels'
        verbose_name = 'ProtocolSensoryPanel'

    def __str__(self):
        return f"{self.variable}  >> {self.value}"
