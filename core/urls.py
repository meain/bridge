from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name = "index"), # initial request for page
    # http://localhost:8000/upcoming/12344/
    url(r'upcoming/(?P<user_id>[0-9]+)/$', views.signin, name = "signin"),
    # curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:8000/downcoming/1234/
    # actual request will be with content json as in js
    url(r'downcoming/(?P<user_id>[0-9]+)/$', views.something_post, name = "shi"),
]
