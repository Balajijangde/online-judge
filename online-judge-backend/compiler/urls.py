from django import views
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # legacy
    path('code', views.code, name="code"),
    path('user', views.users, name='user'),
    path('testView', views.testView, name='testView'),

    # api
    path('problems', views.problems, name='problems'),
    path('problems/<int:id>', views.problem, name='problem'),
    path('problems/<int:id>/submission', views.submission, name="submission"),
]
