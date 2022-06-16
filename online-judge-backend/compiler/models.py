from django.db import models

# Create your models here.


class User(models.Model):
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    registeredOn = models.DateTimeField('date registered')

    def __str__(self):
        return str(self.email)


class Problem(models.Model):
    description = models.TextField(default="")
    createdOn = models.DateTimeField('created on')
    testcase = models.FileField(upload_to="testcases/%Y/%m/%d/")
    answer = models.FileField(upload_to="answers/%Y/%m/%d/")
    title = models.CharField(max_length=50, default="")
    level = models.CharField(max_length=6)  # easy, medium, hard
    timeout = models.IntegerField(default=1)
    input1 = models.TextField(default="")
    output1 = models.TextField(default="")
    input2 = models.TextField(default="")
    output2 = models.TextField(default="")
    constraint = models.TextField(default="")

    def __str__(self) -> str:
        return self.title


class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verdict = models.CharField(max_length=100)
    verdictCode = models.IntegerField(default=0)
    submittedOn = models.DateTimeField('time submitted')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    language = models.CharField(max_length=10, default="cpp")
    code = models.TextField(default="")

    def __str__(self):
        return self.user.email+"#"+str(self.problem.id)+"#"+str(self.verdictCode)
