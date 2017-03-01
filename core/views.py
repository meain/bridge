from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # Return the page at ai/index.html
    return render(request, "core/index.html", None)


def signin(request, user_id):
    data = 'Supposed to return data for ' + str(user_id)
    return HttpResponse(data)

def something_post(request, user_id):
    print request.body
    return HttpResponse('eeks')
