# Generated by Django 4.2.1 on 2023-05-25 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protocols', '0007_alter_protocolprocess_arguments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='protocol',
            name='flow',
            field=models.JSONField(default=dict),
        ),
    ]
