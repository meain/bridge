from django.shortcuts import render, redirect

def index(request):
	# Return the page at ai/index.html
	return render(request, "core/index.html", None)

