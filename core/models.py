from __future__ import unicode_literals

from django.db import models

# Create your models here.
sem_choices = (
    (1, 'S1'),
    (2, 'S2'),
    (3, 'S3'),
    (4, 'S4'),
    (5, 'S5'),
    (6, 'S6'),
    (7, 'S7'),
    (8, 'S8'),
)


class Student(models.Model):
    SID = models.CharField(max_length=120, primary_key=True)
    # register_no = models.CharField(max_length=20, null=True)
    stud_name = models.CharField(max_length=40, verbose_name="Name")
    current_class = models.ForeignKey('Class', on_delete=models.CASCADE, verbose_name="Class")
    attendence = models.TextField()

    def __str__(self):
        return str(self.stud_name)


class Department(models.Model):
    dep_code = models.CharField(max_length=3, verbose_name="Department Code", primary_key=True)
    dep_name = models.CharField(max_length=60, verbose_name="Department Name")

    def __str__(self):
        return str(self.dep_code)


class Subject(models.Model):
    subject_code = models.CharField(verbose_name="Subject Code", max_length=6, primary_key=True)
    subject_title = models.CharField(max_length=60, verbose_name="Subject Title")
    subject_short_name = models.CharField(max_length=3, verbose_name="Abbriviation")
    subject_dep = models.ForeignKey('Department', on_delete=models.CASCADE, verbose_name="Branch")
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
    batch = models.CharField(max_length=1)
    class_name = models.CharField(max_length=10, blank=True)
    timeTable = models.TextField()
    subjects = models.ManyToManyField('Subject', verbose_name='Subjects', through='TaughtBy')

    def save(self, *args, **kwargs):
        self.class_name = str(self.branch) + " " + str(self.current_sem) + str(self.batch)
        super(Class, self).save(*args, **kwargs)

    def get_subs(self):
        subs = [subject.subject_short_name for subject in self.subjects.all()]
        return subs

    def get_tt(self):
        tt_string = str(self.timeTable)
        tt_string = tt_string.splitlines()
        days = ['monday', 'tuesday', 'wednesday',
                'thursday', 'friday']
        tt_dict = {}
        for i in range(5):
            tt_dict[days[i]] = tt_string[i]

        return tt_dict

    def __str__(self):
        return str(self.class_name)

    class Meta:
        verbose_name_plural = "Classes"


class TaughtBy(models.Model):
    classes = models.ForeignKey('Class', on_delete=models.CASCADE)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)
    teachers = models.ForeignKey('Teacher', on_delete=models.CASCADE)


class Event(models.Model):
    title = models.CharField(max_length=40, verbose_name="Event title")
    due_date = models.DateField(verbose_name='Due date')
    description = models.TextField(verbose_name='Description', null=True)
    teacher = models.ForeignKey('Teacher', null=True)
    subject = models.ForeignKey('Subject', null=True)
    assigned_to = models.ForeignKey('Class', verbose_name='Assigned to class', null=True, blank=True)
    user = models.ForeignKey('Student', verbose_name='Assigned to student', null=True)

    def __str__(self):
        return self.title


class Note(models.Model):
    title = models.CharField(max_length=40, verbose_name="Note title", null=True)
    note_text = models.TextField(verbose_name="Note text", null=True)
    user = models.ForeignKey('Student', on_delete=models.CASCADE, null=True)