# Generated by Django 4.2.1 on 2023-05-18 10:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0004_alter_ingredientnode_ingredient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredients',
            name='unit',
        ),
    ]