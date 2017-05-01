from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),      # initial request for page
    url(r'^signin/$', views.signin, name='signin'),
    url(r'^create_user/(?P<user_id>[0-9]+)/(?P<user_class>([a-z])+)$', views.create_new_user, name='new_user'),
    url(r'^timetable/(?P<user_id>[0-9]+)$', views.get_timetable, name='timetable'),
    url(r'^notes/(?P<user_id>[0-9]+)$', views.get_notes, name='notes'),
    url(r'^subject_data/(?P<user_id>[0-9]+)$', views.get_sub_data, name='subject_data'),
    url(r'^events/(?P<user_id>[0-9]+)$', views.get_events, name='events'),
    url(r'^track_data/$', views.get_track_data, name='events'),
    url(r'^calendar/(?P<user_id>[0-9]+)$', views.get_cal_data, name='events'),
    url(r'^subject_attendence/(?P<user_id>[0-9]+)$', views.get_attendence, name='get_attendence'),
    url(r'^create_user/$', views.create_new_user, name='new_user'),
    url(r'^update_attendence/$', views.update_attendence, name='update_attendence'),
    url(r'^set_track_data/$', views.set_track_data, name='set_track_data'),
]
