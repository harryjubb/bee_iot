# Generated by Django 3.0.7 on 2020-06-21 00:07

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hive',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('uid', models.CharField(help_text='Unique hive ID: to match the same hive across other apiary services', max_length=1024, unique=True)),
                ('name', models.CharField(help_text='Human-friendly hive name', max_length=1024)),
                ('active', models.BooleanField(help_text='Determines if any data or streaming should be collected from this hive')),
                ('stream_key', models.CharField(help_text='AV stream name for this hive', max_length=1024)),
                ('stream_active', models.BooleanField(help_text="Determines if this hive's stream should be viewable")),
            ],
        ),
    ]
