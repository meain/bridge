from django.shortcuts import render
from django.http import HttpResponse
from .models import Student, Class
import json


def index(request):
    # Return the page at ai/index.html
    return render(request, "core/index.html", None)


def signin(request):
    data = request.context
    # data = 'Supposed to return data for ' + str(user_id)
    print data
    # if Student.objects.filter(SID=str(user_id)).exists():
    #     data = get_data_for_id(user_id)
    # else:
    #     sems = Class.objects.order_by().values_list('current_sem', flat=True).distinct()
    #     branch = Class.objects.order_by().values_list('branch', flat=True).distinct()
    #     batch = Class.objects.order_by().values_list('batch', flat=True).distinct()
    #     data = {"sems" : sems,
    #             "branches" : branch,
    #             "batches" : batch
    #             }
    #     data = json.dumps(data)
    # print
    return HttpResponse(data)


def create_new_user(request):
    pass

def get_data_for_id(user_id):
    user = Student.objects.get(SID=str(user_id))
    timetable = user.Class.timetable
    day_dict = {}
    for i, day in zip(range(5),timetable.splitlines()):
        day_dict[i] = day
