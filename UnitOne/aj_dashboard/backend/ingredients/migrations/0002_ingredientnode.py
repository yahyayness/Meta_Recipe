# Generated by Django 4.2.1 on 2023-05-08 08:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IngredientNode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(max_length=10)),
                ('ingredient', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ingredients.ingredients')),
            ],
        ),
    ]
