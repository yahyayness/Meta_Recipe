# Generated by Django 3.0.7 on 2020-06-24 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Aroma',
            fields=[
                ('entity_id', models.IntegerField(primary_key=True, serialize=False)),
                ('entity_alias_readable', models.CharField(max_length=50, null=True)),
                ('Uncategorised', models.FloatField()),
                ('Decayed', models.FloatField()),
                ('Sweet', models.FloatField()),
                ('Woody', models.FloatField()),
                ('Medicinal', models.FloatField()),
                ('Sulfidic', models.FloatField()),
                ('Fruity', models.FloatField()),
                ('Smoky', models.FloatField()),
                ('Floral', models.FloatField()),
                ('Citrus', models.FloatField()),
                ('Mint', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('category', models.CharField(max_length=50)),
                ('entity_alias_readable', models.CharField(max_length=50)),
                ('entity_id', models.IntegerField(blank=True, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('diet', models.CharField(blank=True, choices=[('KOHSER', 'Kohser'), ('VEGAN', 'Vegan'), ('KETOGENIC', 'Ketogenic')], max_length=50)),
                ('category', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]
