# Generated by Django 4.2.1 on 2023-05-22 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipment',
            name='brand',
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='equipment',
            name='model',
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
    ]
