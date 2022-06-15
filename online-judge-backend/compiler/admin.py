from django.contrib import admin
from .models import Problem, User, Submission
# Register your models here.
admin.site.register(Problem)
admin.site.register(User)
admin.site.register(Submission)
