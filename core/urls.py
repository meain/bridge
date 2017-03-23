from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),      # initial request for page
    url(r'signin/$', views.signin, name='signin'),
    url(r'timetable/(?P<user_id>[0-9]+)$', views.get_timetable, name='timetable'),
    url(r'notes/(?P<user_id>[0-9]+)$', views.get_notes, name='notes'),
    url(r'subject_data/(?P<user_id>[0-9]+)$', views.get_sub_data, name='subject_data'),
    url(r'events/(?P<user_id>[0-9]+)$', views.get_events, name='events'),
    url(r'track_data/(?P<user_id>[0-9]+)$', views.get_track_data, name='events'),
]