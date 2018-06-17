from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


from django.http import JsonResponse
from books.models import (
    Group, Project, Module, ApiEntry, ApiRequest,
    ApiResponse, ApiRequestField, ApiResponseField,
    GlobaConfig
)

import json
from IPython import embed


def index(request):
    return JsonResponse({'a': 123})


def register(request):

    user = User.objects.create_user(
        'john', 'lennon@thebeatles.com', 'johnpassword')
    return JsonResponse({})


def login_user(request):

    data = json.loads(request.body)

    user = authenticate(request, username=data.get(
        'username'), password=data.get('password'))
    if user is not None:
        login(request, user)
        return JsonResponse({'success': True})
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({'success': False})


@login_required
def logout_user(request):
    logout(request)
    return JsonResponse({'success': True})


def userinfo(request):
    user = request.user

    if user.is_authenticated:
        return JsonResponse({'isLogin': True,
                             'username': user.username, 'user_id': user.id})
    else:
        return JsonResponse({'isLogin': False})


@login_required
def user_detail(request):

    if request.user.is_authenticated:
        pass
    else:
        return JsonResponse({'isLogin': False})


@login_required
@require_http_methods(["GET", "POST"])
def settings(request):
    if request.method == 'GET':
        gcs = GlobaConfig.objects.all()
        return JsonResponse({base_url: gcs[0].base_url})
    else:
        return JsonResponse({})
