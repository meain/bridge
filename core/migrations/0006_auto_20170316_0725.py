# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-16 07:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20170313_1801'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='department',
            name='id',
        ),
        migrations.RemoveField(
            model_name='student',
            name='roll_no',
        ),
        migrations.AlterField(
            model_name='department',
            name='dep_code',
            field=models.CharField(max_length=3, primary_key=True, serialize=False, verbose_name='Department Code'),
        ),
    ]