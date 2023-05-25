# Generated by Django 4.2.1 on 2023-05-25 10:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('protocols', '0002_protocol_flow_protocolprocess_value'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProtocolNode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_type', models.CharField(choices=[('ingredient', 'ingredient'), ('process', 'process'), ('merge ', 'merge'), ('serve ', 'serve')], max_length=12, null=True)),
                ('model_id', models.BigIntegerField(null=True)),
                ('container', models.CharField(max_length=225, null=True)),
                ('slug', models.CharField(max_length=225, null=True)),
                ('payload', models.JSONField(null=True)),
                ('type', models.CharField(max_length=225)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protocol_nodes', to='protocols.protocol')),
            ],
            options={
                'verbose_name': 'ProtocolNode',
                'db_table': 'protocol_nodes',
            },
        ),
    ]