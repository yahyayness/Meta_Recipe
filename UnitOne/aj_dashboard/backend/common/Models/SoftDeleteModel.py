from django.db import models
from django.utils import timezone

from common.utilities.SoftDeleteManager import SoftDeleteManager


class SoftDeleteModel(models.Model):
    deleted_at = models.DateTimeField(null=True, default=None,blank=True)
    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.deleted_at = None
        self.save()

    class Meta:
        abstract = True
