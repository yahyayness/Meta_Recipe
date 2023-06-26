from django.db import models


# Create your models here.
class Setup(models.Model):
    operation_level = models.CharField(max_length=225, null=False)
    cuisine_requirement_profile = models.CharField(max_length=225, null=True)
    culinary_cultural_profile = models.CharField(max_length=225, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        db_table = 'setups'
        verbose_name = 'Setup'

    def __str__(self):
        return self.operation_level
