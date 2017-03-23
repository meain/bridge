# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-13 18:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_events'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='id',
        ),
        migrations.AddField(
            model_name='class',
            name='timeTable',
            field=models.TextField(default=[]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='SID',
            field=models.CharField(default=[], max_length=120, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]