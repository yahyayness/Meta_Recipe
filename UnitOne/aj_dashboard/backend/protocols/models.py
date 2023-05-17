from django.db import models
from django.utils.translation import gettext as _

from common.Models.SoftDeleteModel import SoftDeleteModel
from process.models import Process


# Create your models here.

class Protocol(SoftDeleteModel):
    description = models.CharField(max_length=225, null=True)
    reference_author = models.CharField(max_length=225, null=True)
    aliquot_date = models.DateField(null=True)
    reagent = models.CharField(max_length=225, null=True)
    name = models.CharField(max_length=225, null=False, blank=False, unique=True)
    processes = models.JSONField(null=True, blank=False)
    ingredients = models.JSONField(null=True, blank=False)

    class Meta:
        db_table = 'protocols'
        verbose_name = "Protocol"

    def __str__(self):
        return self.reference_author


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
    duration = models.IntegerField()
    duration_type = models.CharField(max_length=225)
    input_ingredients = models.JSONField()
    output_ingredients = models.JSONField()
    next_process_id = models.ForeignKey('self', on_delete=models.CASCADE, related_name='next_process', blank=False,
                                        null=True)
    time_step = models.CharField(
        max_length=12,
        choices=TimeStep.choices,
        default=TimeStep.SEQUENTIAL,
    )
    arguments = models.JSONField()

    class Meta:
        db_table = 'protocol_processes'
        verbose_name = 'ProtocolProcess'

    def __str__(self):
        return f"{self.protocol.reference_author} : {self.process.name}"
