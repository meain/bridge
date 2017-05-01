from django.contrib import admin
from . import models
# Register your models here.


class TaughtByInline(admin.TabularInline):
    model = models.TaughtBy
    extra = 1


class ClassAdmin(admin.ModelAdmin):
    exclude = ('class_name',)
    inlines = (TaughtByInline,)
    list_display = ('class_name',)


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('subject_short_name', 'subject_code',
                    'subject_dep', 'subject_sem')


class StudentAdmin(admin.ModelAdmin):
    list_display = ('stud_name', 'SID', 'current_class')


class TeacherAdmin(admin.ModelAdmin):
    list_display = ('teacher_name', 'dept')


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('dep_code', 'dep_name')


class EventsAdmin(admin.ModelAdmin):
    list_display = ('title', 'due_date', 'assigned_to')

myModels = [models.Student,
            models.Teacher,
            models.Department,
            models.Event, ]

admin.site.register(models.Class, ClassAdmin)
admin.site.register(models.Subject, SubjectAdmin)
admin.site.register(models.Student, StudentAdmin)
admin.site.register(models.Teacher, TeacherAdmin)
admin.site.register(models.Department, DepartmentAdmin)
admin.site.register(models.Event, EventsAdmin)

admin.site.site_header = "Bridge"