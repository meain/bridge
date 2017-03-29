from django.contrib import admin
from . import models
# Register your models here.
myModels = [models.Student,
            models.Teacher,
            models.Department,
            models.Subject,
            models.Class,
            models.Events]

admin.site.register(myModels)
