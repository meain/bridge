from __future__ import unicode_literals

from django.db import models

# Create your models here.
sem_choices = (
	(1,'S1'),
	(2,'S2'),
	(3,'S3'),
	(4,'S4'),
	(5,'S5'),
	(6,'S6'),
	(7,'S7'),
	(8,'S8'),
)

class Student(models.Model):
	SID = models.CharField(max_length=120, primary_key=True)
	stud_name = models.CharField(max_length=40,verbose_name="Name")
	current_class = models.ForeignKey('Class', on_delete=models.CASCADE,verbose_name="Class")

	def __str__(self):
		return str(self.stud_name)


class Department(models.Model):
	dep_code = models.CharField(max_length=3, verbose_name="Department Code", primary_key=True)
	dep_name = models.CharField(max_length=60, verbose_name="Department Name")

	def __str__(self):
		return str(self.dep_name)


class Subject(models.Model):
	subject_code = models.CharField(verbose_name="Subject Code",max_length=6,primary_key=True)
	subject_title = models.CharField(max_length=60, verbose_name="Subject Title")
	subject_dep = models.ForeignKey('Department', on_delete=models.CASCADE,verbose_name="Branch")
	subject_sem = models.SmallIntegerField(choices=sem_choices, null=True)

	def __str__(self):
		return self.subject_title


class Teacher(models.Model):
	teacher_name = models.CharField(max_length=40)
	dept = models.ForeignKey('Department', on_delete=models.CASCADE)
	subjects = models.ManyToManyField('Subject', verbose_name="Subjects")


	def __str__(self):
		return self.teacher_name


class Class(models.Model):
	current_sem = models.PositiveSmallIntegerField(choices=sem_choices)
	branch = models.ForeignKey('Department', on_delete=models.CASCADE)
	batch  = models.CharField(max_length=1)
	timeTable = models.TextField()

	def __str__(self):
		return str(self.branch.dep_code)+" "+str(self.current_sem)+str(self.batch)


class Events(models.Model):
	title = models.CharField(max_length=40, verbose_name="Event title")
	due_date = models.DateField(verbose_name='Due date')
	event_description = models.TextField(verbose_name='Description')
	assigned_to = models.ForeignKey('Class', verbose_name='Assigned to')

	def __str__(self):
		return self.title