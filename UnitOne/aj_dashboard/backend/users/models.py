from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        # managed = False
        db_table = 'recipe_users'
