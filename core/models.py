from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Student(models.Model):
	roll_no = models.SmallIntegerField() #For reference only, database primary is key different
	stud_name = models.CharField(max_length=40)
	current_class = models.ForiegnKey('Class', on_delete=models.CASCADE)
	department = models.ForiegnKey('Department', on_delete=models.CASCADE)
	
	def __str__(self):
		return str(self.stud_name)

class Department(models.Model):
	dep_names = (
		('CE', 'Civil Engineering'),
		('CS', 'Computer Science and Engineering'),
		('EE', 'Electrical and Electronics Engineering'),
		('EC', 'Electronics and Communications Engineering'),
		('IT', 'Information Technology'),
		('SF', 'Fire and Safety Engineering'),
		('ME', 'Mechanical Engineering'),
	)
	dep_name = models.CharField(max_length=60,choices=dep_names)

	def __str__(self):
		return str(self.dep_name)

class Subject(models.Model):
	subject_code = models.CharField(max_length=6,primary_key=True)
	subject_title = models.CharField(max_length=60)
	subject_dep = models.ForiegnKey('Department', on_delete=models.CASCADE)

	def __str__(self):
		return str(self.subject_title)

class Teacher(models.Model):
	teacher_name = models.CharField(max_length=40)
	dept = models.ForiegnKey('Department', on_delete=models.CASCADE)
	subjects = models.ManyToManyField('Subject')

class Class(models.Model):
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
	current_sem = models.PositiveSmallIntegerField(choices=sem_choices)
	branch = models.ForiegnKey('Department', on_delete=models.CASCADE)