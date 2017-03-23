from django.shortcuts import render
from django.http import HttpResponse
from .models import Student, Class
import json


def index(request):
    # Return the page at ai/index.html
    return render(request, "core/index.html", None)


def signin(request):
    data = request.context
    pass


def get_timetable_for_user(request):
    timetable = {
                'monday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
                'tuesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
                'wednesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
                'thursday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
                'friday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],}

    return HttpResponse(timetable)

def create_new_user(request):
    pass

def get_data_for_id(user_id):
    user = Student.objects.get(SID=str(user_id))
    timetable = user.Class.timetable
    day_dict = {}
    for i, day in zip(range(5),timetable.splitlines()):
        day_dict[i] = day
