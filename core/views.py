import json
from datetime import datetime as date
from django.shortcuts import render
from django.http import HttpResponse
from .models import Class, Student, Event, Teacher, Department, Note, Subject


period_time = {0: '9:00',
               1: '10:00',
               2: '11:00',
               3: '13:00',
               4: '14:00',
               5: '15:00'}

def index(request):
    # Return the page at core/index.html
    return render(request, "core/index.html", None)


def get_timetable_dummy(request, user_id):
    timetable = {
            'monday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
            'tuesday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
            'wednessday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
            'thursday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
            'friday': ['MCS', 'DSP', 'DSP', 'OS', 'OS', 'CC'],
            }
    return HttpResponse(json.dumps(timetable), content_type="application/json")


def get_timetable(request, user_id):
    user = Student.objects.get(SID=user_id)
    timetable = user.current_class.get_tt()
    return HttpResponse(timetable)


def get_notes(request, user_id):
    user = Student.objects.get(SID=user_id)
    notes = Note.objects.filter(user=user)

    notes = []
    for note in notes:
        n = {}
        n['date'] = note.date
        n['subject'] = note.subject.subject_title
        n['note'] = note.data
        notes.append(note)

    return HttpResponse(json.dumps(notes))

def get_notes_dummy(request, user_id):
    notes_data = [
            {
                'date': '24-3-2014',
                'subject': 'Modern Control Systems',
                'note': '# Control Theory \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list'
                },
            {
                'date': '21-3-2014',
                'subject': 'Modern Control Systems',
                'note': '# Eeks \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list'
                },
            {
                'date': '22-3-2014',
                'subject': 'Digital Signal Processing',
                'note': '# Image support \n\n` it is very very important ` \n\n![image](https://img.buzzfeed.com/buzzfeed-static/static/2015-04/21/16/enhanced/webdr05/enhanced-31550-1429646952-7.jpg)'
                },
            {
                'date': '25-3-2014',
                'subject': 'Operating Systems',
                'note': '# Multilevel headings\n\n ## second level\n\n### third level\n\n#### forth level\n\n and more ...'
                },
            {
                'date': '26-3-2014',
                'subject': 'Compiler Construction',
                'note': '# Hyperlinks too \n\n[Google](http://google.com)'
                },
            {
                'date': '28-3-2014',
                'subject': 'Control Thory',
                'note': '# Full markdown support\n\n`even code snippet`\n\n```python\nprint "hai"```'
                },
            ]
    return_data = {}
    return_data['data'] = notes_data
    return HttpResponse(json.dumps(return_data), content_type="application/json")

def get_sub_data_dummy(request, user_id):
    subject_data = {
            'MCS': {
                'subject': 'Modern Control Systems',
                'teacher':'Jisha Joseph',
                },
            'DSP': {
                'subject': 'Digital Signal Processing',
                'teacher':'Razia Rahim',
                },
            'OS': {
                'subject': 'Operating Systems',
                'teacher':'Damodaran V',
                },
            'CC': {
                'subject': 'Compiler Construction',
                'teacher':'Sheena Mathew',
                }
            }
    return HttpResponse(json.dumps(subject_data), content_type="application/json")

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


def get_events_dummy(request, user_id):
    upcoming_events = [
            {
                'name': 'Project interim submission',
                'due': '30-03-2017',
                'to': 'Damodaran V',
                'subject' : 'Mini Project',
                'description': 'Interim submission of mini project'
                },
            {
                'name': 'SP Lab Record submission',
                'due': '30-03-2017',
                'to': 'Deepa Paul',
                'subject' : 'SP-Laboratory',
                'description': 'Fair record submission of Systems Programming Laboratory'
                },
            ]
    return_data = {}
    return_data['data'] = upcoming_events
    return HttpResponse(json.dumps(return_data), content_type="application/json")

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


def get_track_data(request):
    if request.method == "POST":
        data = json.loads(request.POST.get('data'))
        user_id = data['id']
        date = data['date']
        day = data['day']
    user = Student.objects.get(SID=user_id)
    day_tt = user.current_class.get_tt()[day].split(',')

    def get_notes_for_period(period):
        if Note.objects.filter(user=user, date=date, period=period).exists():
            return Note.objects.get(user=user, date=date, period=period)
        else:
            return None

    track_data = []
    for i in range(6):
        note = get_notes_for_period(i)
        p = {}

        p['period'] = i
        if note is not None:
            p['notes'] = note.data
            p['subject'] = note.subject.subject_short_name
        else:
            p['notes'] = ''
            p['subject'] = day_tt[i]

        p['time'] = period_time[i]
        track_data.append(p)

    return HttpResponse(json.dumps(track_data))


def set_track_data(request):
    if request.method == "POST":
            user_id = request.POST.get('id')
            date = request.POST.get('date')
            day = request.POST.get('day')
            track_data = request.POST.get('track_data')[1:][:-1]
            # a wild bodge appeared
            track_data = [e+'}' for e in track_data.split('},') if e]
            track_data[-1] = track_data[-1][:-1]
            track_data = [json.loads(e) for e in track_data]

    user = Student.objects.get(SID=user_id)
    day_tt = user.current_class.get_tt()[day].split(',')

    for entry in track_data:
        period = entry['period']
        subject = Subject.objects.get(subject_short_name=day_tt[period])
        note = Note.objects.filter(user=user, period=period, date=date)
        if note.exists():
            note.update(data=entry['notes'])
        else:
            new_note = Note(user=user, period=period, date=date, data=entry['notes'])
            new_note.save()
    return HttpResponse(json.dumps({ 'status': 'OK' }))

def get_track_data_dummy(request, user_id):
    track_data = [
            {
                'period': 0,
                'notes': '# Control Theory \n\n` it is something important ` \n\n> e=mc^2\n\n* it\n* even\n* support\n* bulleted list',
                'attendece' : '',
                'time': '9:00'
                },
            {
                'period': 1,
                'notes': '',
                'attendece' : '',
                'time': '10:00'
                },
            {
                'period': 2,
                'notes': '',
                'attendece' : '',
                'time': '11:00'
                },
            {
                'period': 3,
                'notes': '',
                'attendece' : '',
                'time': '13:00'
                },
            {
                'period': 4,
                'notes': '',
                'attendece' : '',
                'time': '14:00'
                },
            {
                'period': 5,
                'notes': '',
                'attendece' : '',
                'time': '15:00'
                }
            ]

    return_data = {}
    return_data['data'] = track_data
    return HttpResponse(json.dumps(return_data), content_type="application/json")


def create_new_user(request):
    if request.method == "POST":
        user_id = json.loads(request.POST.get('user_data'))['id']
        _class = request.POST.get('class')
        c = Class.objects.filter(class_name=_class)[0]
        #Initialize attendence
        attendence = {}
        subs = c.get_subs()
        for sub in subs:
            attendence[sub] = {'attended': 0, 'total': 0}
        attendence = json.dumps(attendence)

        user = Student(SID=user_id)
        user.current_class = c
        user.attendence = attendence
        user.save()
        return HttpResponse(json.dumps({'exists': True}))


def signin(request):
    if request.method == "POST":
        data = json.loads(request.POST.get('data'))
        sid = data['id']
        if Student.objects.filter(SID=sid).exists():
            return HttpResponse(json.dumps({'exists': True}))
        else:
            classes = [name.class_name for name in Class.objects.all()]
            data = json.dumps({'exists': False, 'options': classes})
            return HttpResponse(json.dumps(data), content_type="application/json")


def get_cal_data_dummy(request, user_id):
    cal_events = [
            {
                'title': 'New Event',
                'start': '2017-05-01'
                },
            {
                'title': 'Some big event',
                'start': '2017-04-07',
                'end': '2017-04-10'
                },
            ]
    return_data = {}
    return_data['data'] = cal_events
    return HttpResponse(json.dumps(return_data), content_type="application/json")

def get_attendence(request, user_id):
    user = Student.objects.get(SID=user_id)
    attendence_data = user.get_attendence_data()

    print attendence_data
    if len(attendence_data) is 0:
        # quick patch ( issue only if new user already created)
        daytable = user.current_class.get_tt()
        subs = {}
        for key in daytable:
            daysubs = daytable[key].split(',')
            for item in daysubs:
                # if item not in subs:  ( its a dict, lol )
                subs[item] = {'total':0, 'attended':0 }
        attendence_data = subs

    return_data = {}
    return_data['data'] = attendence_data
    return HttpResponse(json.dumps(return_data), content_type="application/json")

def update_attendence(request):
    if request.method == "POST":
        data =  json.loads(request.POST.get('data'))
        user_id = data['id']
        attendence = json.dumps(data['attendance'])

        user = Student.objects.get(SID=user_id)
        user.attendence = attendence
        user.save()
    return_data = { 'status':'OK' }
    return HttpResponse(json.dumps(return_data), content_type="application/json")


def get_subject_attendence_dummy(request, user_id):
    subject_attendence = [
            {
                'name': 'MCS',
                'attended': 15,
                'total': 22
                },
            {
                'name': 'DSP',
                'attended': 18,
                'total': 20
                },
            {
                'name': 'SIC',
                'attended': 15,
                'total': 27
                },
            {
                'name': 'OS',
                'attended': 5,
                'total': 20
                },
            {
                'name': 'CC',
                'attended': 15,
                'total': 15
                },
            {
                'name': 'PDG',
                'attended': 10,
                'total': 21
                },
            ]
    return_data = {}
    return_data['data'] = subject_attendence
    return HttpResponse(json.dumps(return_data), content_type="application/json")
