import json
from datetime import datetime as date
from django.shortcuts import render
from django.http import HttpResponse
from .models import Class, Student, Event, Teacher, Department


def index(request):
    # Return the page at core/index.html
    return render(request, "core/index.html", None)


def get_timetable(request, user_id):
    user = Student.objects.get(UID=user_id)
    timetable = user.current_class.get_tt()
    return HttpResponse(timetable)


def get_notes(request, user_id):
    notes_data = [
        {
            'date': '24-3-2014',
            'note': 'lot of garbage'
        },
        {
            'date': '21-3-2014',
            'note': "random sutff for the heck of it, don't think I have time to use *lorem ipsum*"
        },
        {
            'date': '22-3-2014',
            'note': '# Lorem Ipsum'
        },
        {
            'date': '25-3-2014',
            'note': 'you bet it is soemtig not useful, just like you'
        },
        {
            'date': '26-3-2014',
            'note': 'dummy text, we really need to script this once the backed is set up'
        },
        {
            'date': '28-3-2014',
            'note': 'even more garbage, hahaa. crap, I hate my life'
        },
    ]

    return HttpResponse(notes_data)


def get_sub_data(request, user_id):
    day = (date.today().strftime("%A")).lower()
    user = Student.objects.get(SID=user_id)
    daytable = user.current_class.get_tt()[day].split(',')

    query = TaughtBy.objects.filter(classes__class_name=user.current_class)
    ts_dict = {x.subject.subject_short_name: (x.teachers, x.subject_title) for x in query}

    return_dict = {}
    for sub_code in daytable:
        return_dict[sub_code] = {'teacher': ts_dict[sub_code][0],
                                 'subject': ts_dict[sub_code][1]}

    return HttpResponse(return_dict)


def get_events(request, user_id):
    user = Student.objects.get(SID=user_id)
    elist = set(list(Event.objects.filter(assigned_to__class_name=user.current_class)) + list(Event.objects.filter(user__SID=user_id)))
    return_list = []
    for event in elist:
        d = {}
        d['name'] = event.title
        d['due'] = str(event.due_date)
        d['to'] = event.Teacher
        d['subject'] = event.subject
        d['description'] = event.description
        return_list.append(d)
    return HttpResponse(return_list)


def get_track_data(request, user_id):
    track_data = [
        {
            'period': 0,
            'notes': 'random notes in period 0',
            'attendece': '',
            'time': '9:00'
        },
        {
            'period': 1,
            'notes': '',
            'attendece': '',
            'time': '10:00'
        },
        {
            'period': 2,
            'notes': '',
            'attendece': '',
            'time': '11:00'
        },
        {
            'period': 3,
            'notes': '',
            'attendece': '',
            'time': '13:00'
        },
        {
            'period': 4,
            'notes': '',
            'attendece': '',
            'time': '14:00'
        },
        {
            'period': 5,
            'notes': '',
            'attendece': '',
            'time': '15:00'
        }
    ]

    return HttpResponse(track_data)


def create_new_user(request, user_id, Class):
    c = Class.objects.filter(class_name=Class)[0]
    user = Student(UID=user_id)
    user.current_class = c
    user.save()


def signin(request):
    data = request.context
    uid = data['id']
    if Student.objects.get(UID=uid).exists():
        return HttpResponse({'exists': True})
    else:
        classes = [name.class_name for name in Class.objects.all()]
        return HttpResponse({'exists': True, 'options': classes})
