# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-29 18:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_student_register_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='note_text',
            field=models.TextField(null=True, verbose_name='Note text'),
        ),
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.CharField(max_length=40, null=True, verbose_name='Note title'),
        ),
    ]
