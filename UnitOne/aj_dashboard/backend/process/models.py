from django.db import models


# Create your models here.


class Process(models.Model):
    types = {
        ("choices", "choices"),
        ("time", "Time")
    }
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50, null=True, blank=True, choices=types)
    options = models.JSONField(blank=False, null=True)
    duration = models.IntegerField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    next_process = models.ForeignKey('self', null=True, blank=True, on_delete=models.DO_NOTHING, related_name="process")

    class Meta:
        db_table = 'processes'
        verbose_name = "Process"

    def __str__(self):
        return self.name
