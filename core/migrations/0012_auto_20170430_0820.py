# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-30 08:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_student_attendence'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='note_text',
        ),
        migrations.RemoveField(
            model_name='note',
            name='title',
        ),
        migrations.AddField(
            model_name='note',
            name='date',
            field=models.DateField(null=True, verbose_name='date'),
        ),
        migrations.AddField(
            model_name='note',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Subject'),
        ),
    ]