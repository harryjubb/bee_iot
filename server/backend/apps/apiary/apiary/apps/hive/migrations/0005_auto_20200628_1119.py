# Generated by Django 3.0.7 on 2020-06-28 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hive', '0004_auto_20200627_2245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hive',
            name='stream_key',
            field=models.CharField(blank=True, help_text='AV stream name for this hive', max_length=1024, null=True),
        ),
    ]
