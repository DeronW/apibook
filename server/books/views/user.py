from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from books.decorators import need_login
import json
from IPython import embed


def register(request):
    data = request.json
    email = data.get('email')
    pwd = data.get('password')

    user = User.objects.create_user(email, email, pwd)
    if user.id:
        login(request, user)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})


def login_user(request):
    username = request.json.get('username')
    pwd = request.json.get('password')
    user = authenticate(request, username=username, password=pwd)
    if user is not None:
        login(request, user)
        return JsonResponse({'success': True})
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({
            'success': False,
            'message': {
                'type': 'error',
                'text': 'Wrong username or password'
            }})


@need_login
def logout_user(request):
    logout(request)
    return JsonResponse({'success': True})


def info(request):
    user = request.user
    if user.is_authenticated:
        return JsonResponse({
            'username': user.username,
            'id': user.id,
            'isAdmin': user.is_superuser
        })
    else:
        return JsonResponse({
            'id': None
        })
