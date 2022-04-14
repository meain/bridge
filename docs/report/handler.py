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


def get_attendence(request, user_id):
    user = Student.objects.get(SID=user_id)
    attendence_data = user.get_attendence_data()

    print(attendence_data)
    if len(attendence_data) is 0:
        # quick patch ( issue only if new user already
        # created)
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
