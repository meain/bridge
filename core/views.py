import json
from datetime import datetime as date
from django.shortcuts import render
from django.http import HttpResponse
from .models import Class, Student, Event, Teacher, Department, Note, Subject, TaughtBy
from datetime import datetime

period_time = {0: "9:00", 1: "10:00", 2: "11:00", 3: "13:00", 4: "14:00", 5: "15:00"}


def index(request):
    # Return the page at core/index.html
    return render(request, "core/index.html", None)


def get_timetable(request, user_id):
    user = Student.objects.get(SID=user_id)
    timetable = user.current_class.get_tt()
    return HttpResponse(json.dumps(timetable), content_type="application/json")


def get_notes(request, user_id):
    user = Student.objects.get(SID=user_id)
    notes = Note.objects.filter(user=user)

    notes_list = []
    for note in notes:
        n = {}
        n["date"] = note.date
        n["subject"] = note.subject.subject_title
        n["note"] = note.data
        notes_list.append(n)

    return HttpResponse(json.dumps(notes_list))


def get_sub_data(request, user_id):
    day = (date.today().strftime("%A")).lower()
    # day = 'monday'
    return_dict = {}
    if not (day == "sunday" or day == "saturday"):
        user = Student.objects.get(SID=user_id)
        daytable = user.current_class.get_tt()[day].split(",")

        query = TaughtBy.objects.filter(classes__class_name=user.current_class)
        ts_dict = {
            x.subject.subject_short_name: (
                x.teachers.teacher_name,
                x.subject.subject_title,
            )
            for x in query
        }

        print("ts_dict:", ts_dict)
        print("daytable:", daytable)
        for sub_code in daytable:
            return_dict[sub_code] = {
                "teacher": ts_dict[sub_code][0],
                "subject": ts_dict[sub_code][1],
            }

    return HttpResponse(json.dumps(return_dict))


def get_events(request, user_id):
    user = Student.objects.get(SID=user_id)
    elist = Event.objects.filter(
        assigned_to=user.current_class, due_date__gte=datetime.now()
    )
    # elist = set(list(Event.objects.filter(assigned_to__class_name=user.current_class)) + list(Event.objects.filter(user__SID=user_id)))
    return_list = []
    for event in elist:
        d = {}
        d["name"] = event.title
        d["due"] = str(event.due_date)
        d["to"] = event.teacher.teacher_name
        d["subject"] = event.subject.subject_title
        d["description"] = event.description
        return_list.append(d)
    return HttpResponse(json.dumps(return_list))


def get_track_data(request):
    if request.method == "POST":
        data = json.loads(request.POST.get("data"))
        user_id = data["id"]
        date = data["date"]
        day = data["day"]
    user = Student.objects.get(SID=user_id)
    day_tt = user.current_class.get_tt()[day].split(",")

    def get_notes_for_period(period):
        if Note.objects.filter(user=user, date=date, period=period).exists():
            return Note.objects.get(user=user, date=date, period=period)
        else:
            return None

    track_data = []
    for i in range(6):
        note = get_notes_for_period(i)
        p = {}

        p["period"] = i
        if note is not None:
            p["notes"] = note.data
            p["subject"] = note.subject.subject_short_name
        else:
            p["notes"] = ""
            p["subject"] = day_tt[i]

        p["time"] = period_time[i]
        track_data.append(p)

    return HttpResponse(json.dumps(track_data))


def set_track_data(request):
    if request.method == "POST":
        user_id = request.POST.get("id")
        date = request.POST.get("date")
        day = request.POST.get("day")
        track_data = request.POST.get("track_data")[1:][:-1]
        # a wild bodge appeared
        track_data = [e + "}" for e in track_data.split("},") if e]
        track_data[-1] = track_data[-1][:-1]
        track_data = [json.loads(e) for e in track_data]

    user = Student.objects.get(SID=user_id)
    day_tt = user.current_class.get_tt()[day].split(",")

    for entry in track_data:
        period = entry["period"]
        subject = Subject.objects.get(subject_short_name=day_tt[period])
        note = Note.objects.filter(user=user, period=period, date=date)
        if note.exists():
            note.update(data=entry["notes"])
        else:
            new_note = Note(
                user=user,
                period=period,
                date=date,
                data=entry["notes"],
                subject=subject,
            )
            new_note.save()
    return HttpResponse(json.dumps({"status": "OK"}))


def create_new_user(request):
    if request.method == "POST":
        user_id = json.loads(request.POST.get("user_data"))["id"]
        _class = request.POST.get("class")
        c = Class.objects.filter(class_name=_class)[0]
        # Initialize attendence
        attendence = {}
        subs = c.get_subs()
        for sub in subs:
            attendence[sub] = {"attended": 0, "total": 0}
        attendence = json.dumps(attendence)

        user = Student(SID=user_id)
        user.current_class = c
        user.attendence = attendence
        user.save()
        return HttpResponse(json.dumps({"exists": True}))


def signin(request):
    if request.method == "POST":
        data = json.loads(request.POST.get("data"))
        sid = data["id"]
        if Student.objects.filter(SID=sid).exists():
            return HttpResponse(json.dumps({"exists": True}))
        else:
            classes = [name.class_name for name in Class.objects.all()]
            data = json.dumps({"exists": False, "options": classes})
            return HttpResponse(json.dumps(data), content_type="application/json")


def get_cal_data(request, user_id):
    user = Student.objects.get(SID=user_id)
    elist = Event.objects.filter(assigned_to=user.current_class)
    return_list = []
    for event in elist:
        d = {}
        d["name"] = event.title
        d["due"] = str(event.due_date)
        d["to"] = event.teacher.teacher_name
        d["subject"] = event.subject.subject_title
        d["description"] = event.description
        return_list.append(d)
    return HttpResponse(json.dumps(return_list))


def get_attendence(request, user_id):
    user = Student.objects.get(SID=user_id)
    attendence_data = user.get_attendence_data()
    if len(attendence_data) == 0:
        # quick patch ( issue only if new user already created)
        daytable = user.current_class.get_tt()
        subs = {}
        for key in daytable:
            daysubs = daytable[key].split(",")
            for item in daysubs:
                # if item not in subs:  ( its a dict, lol )
                subs[item] = {"total": 0, "attended": 0}
        attendence_data = subs

    return_data = {}
    return_data["data"] = attendence_data
    return HttpResponse(json.dumps(return_data), content_type="application/json")


def update_attendence(request):
    if request.method == "POST":
        data = json.loads(request.POST.get("data"))
        user_id = data["id"]
        attendence = json.dumps(data["attendance"])

        user = Student.objects.get(SID=user_id)
        user.attendence = attendence
        user.save()
    return_data = {"status": "OK"}
    return HttpResponse(json.dumps(return_data), content_type="application/json")
