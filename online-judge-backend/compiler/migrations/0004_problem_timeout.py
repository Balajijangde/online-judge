# Generated by Django 4.0.4 on 2022-06-03 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compiler', '0003_submission_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='timeout',
            field=models.IntegerField(default=1),
        ),
    ]