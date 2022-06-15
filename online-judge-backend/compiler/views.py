from datetime import datetime
from django.http import Http404, HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render

from compiler.compilation.cpp_compilation import cppCompilation
from compiler.compilation.java_compilation import javaCompilation
from compiler.compilation.python_compilation import pythonCompilation

from .common.verdict_code import VerdictCode
from .models import User, Problem, Submission
from .serializers import ProblemSerializer, ProblemsSerializer, SubmissionSerializer, UserSerializer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import os
import uuid
from rest_framework.decorators import api_view
from .common.compiler_json_response import CompilerJsonResponse

# Create your views here.


def code(request):
    return render(request, "app/code.html", {})


@api_view(['POST'])
def users(request):
    body = JSONParser().parse(request)
    user = User(
        email=body['email'], password=body['password'], registeredOn=datetime.now())
    user.save()
    return Response(data="User added successfully", status=201)


@api_view(['POST', 'GET'])
def submission(request, id):
    if request.method == "GET":
        # TODO remove hardcoded user id
        user = User.objects.get(pk=1)
        problem = Problem.objects.get(pk=id)
        subs = Submission.objects.filter(user=user).filter(
            problem=problem).order_by('submittedOn')
        serializer = SubmissionSerializer(subs, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        try:
            problem = Problem.objects.get(pk=id)
        except Problem.DoesNotExist:
            return Response({
                "result": "Problem not found",
                "details": "Invalid question ID received"
            }, status=404)

        try:
            body = JSONParser().parse(request)
            codes = body['codes']
            language = body['language']
            if language not in ["cpp", "java", "python"] or codes == "":
                return Response({
                    "result": "Invalid body",
                    "details": "Invalid body provided"
                }, status=400)
        except:
            return Response({
                "result": "Invalid body",
                "details": "Invalid body provided"
            }, status=400)

        # TODO User is hardcoded, had to change this to dynamic user id
        user = User.objects.get(pk=1)

        if language == "cpp":
            return cppCompilation(problem, user, body)
        elif language == "java":
            return javaCompilation(problem, user, body)
        else:
            return pythonCompilation(problem, user, body)


@api_view(['GET'])
def problems(request):
    data = Problem.objects.all()
    serializer = ProblemsSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def problem(request, id):
    try:
        problem = Problem.objects.get(pk=id)
    except Problem.DoesNotExist:
        raise Http404("Problem not found")
    serializer = ProblemSerializer(problem)
    return JsonResponse(serializer.data, safe=False)


def testView(request):
    pass
