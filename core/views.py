import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import Student, Class


def index(request):
    # Return the page at ai/index.html
    return render(request, "core/index.html", None)


def get_timetable(request, user_id):
    timetable = {
        'monday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
        'tuesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
        'wednesday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
        'thursday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'],
        'friday': ['maths', 'physics', 'chemistry', 'computer science', 'party', 'boohoo'], }
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
    subject_data = {
        'maths': {
            'subject': 'Mathematics',
            'teacher': 'Adam Smith',
        },
        'physics': {
            'subject': 'Physics',
            'teacher': 'Delin Mathew',
        },
        'chemistry': {
            'subject': 'Chemistry',
            'teacher': 'Alex Philip',
        },
        'computer science': {
            'subject': 'Computer Science',
            'teacher': 'Hebin Hentry',
        },
        'party': {
            'subject': 'Partttyyy',
            'teacher': 'meain',
        },
        'boohoo': {
            'subject': 'BoooooHoooo',
            'teacher': 'Boo',
        }
    }

    return HttpResponse(subject_data)


def get_events(request, user_id):
    events = [
        {
            'name': 'Submit something',
            'due': '3-10-2017',
            'to': 'Sam Kodi',
            'description': 'Description for just something'
        },
        {
            'name': 'Kill Aayisha',
            'due': '5-11-2017',
            'to': 'Abhai Kollara',
            'description': 'Yaaaaay, we get to kill Aayisha for once. :)'
        },
        {
            'name': 'Ressuruct Aayisha',
            'due': '5-12-2017',
            'to': 'Abin Simon',
            'description': 'Well, I think we need her to complete the project. Let us get her back.'
        },
    ]

    return HttpResponse(events)


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
    c = Class.objects.get()
    user = Student(UID=user_id)
    user.save()


def get_data_for_id(user_id):
    user = Student.objects.get(SID=str(user_id))
    timetable = user.Class.timetable
    day_dict = {}
    for i, day in zip(range(5), timetable.splitlines()):
        day_dict[i] = day


def signin(request):
    data = request.context
    pass
