# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-23 10:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20170316_0725'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='subject_short_name',
            field=models.CharField(default='AAA', max_length=3, verbose_name='Abbriviation'),
            preserve_default=False,
        ),
    ]