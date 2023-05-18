from django.db import models


# Create your models here.


class Process(models.Model):
    types = {
        ("choices", "choices"),
        ("time", "Time")
    }
    name = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=50, null=True, blank=True, choices=types)
    options = models.JSONField(blank=False, null=True)

    class Meta:
        db_table = 'processes'
        verbose_name = "Process"

    def __str__(self):
        return self.name
