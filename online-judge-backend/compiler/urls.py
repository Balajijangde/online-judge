from django.urls import path
from . import views

urlpatterns = [
    # api
    path('problems', views.problems, name='problems'),
    path('problems/<int:id>', views.problem, name='problem'),
    path('problems/<int:id>/submission', views.submission, name="submission"),
    path('user', views.users, name='user'),
    path('signup_verification/<str:email>/<str:token>',
         views.signupVerification, name="signup verification"),
    path('login', views.login, name="login"),
    path('forgotPassword', views.forgotPassword, name="forgot password"),
    path('forgotPassword_verification/<str:email>/<str:token>',
         views.forgotPasswordVerification, name="forgot password verification"),
]
