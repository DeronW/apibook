from django.utils.translation import gettext as _


from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from books.decorators import need_login
from IPython import embed


def register(request):
    data = request.json

    email = data.get('email')
    username = data.get('username')
    pwd = data.get('password')

    def err(text):
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': text
        }})

    if User.objects.filter(username=username)[0]:
        return err(_('username already exist'))

    if User.objects.filter(email=email)[0]:
        return err(_('emali already exist'))

    user = User.objects.create_user(username, email, pwd)
    if user.id:
        login(request, user)
        return JsonResponse({'success': True})
    else:
        return err(_('register failed'))


def login_user(request):
    username_or_email = request.json.get('username_or_email')
    pwd = request.json.get('password')

    real_user = User.objects.filter(email=username_or_email)[0]
    username = real_user.username if real_user else username_or_email

    user = authenticate(request, username=username, password=pwd)

    if user is None:
        return JsonResponse({
            'success': False,
            'message': {
                'type': 'error',
                'text': 'Wrong username or password'
            }})
    else:
        login(request, user)
        return JsonResponse({'success': True, 'data': get_user_info(user)})


@need_login
def logout_user(request):
    logout(request)
    return JsonResponse({'success': True, 'message': 'Logout Success'})


def info(request):
    return JsonResponse({'data': get_user_info(request.user)})


def get_user_info(user):

    return {
        'username': user.username,
        'id': user.id,
        'isAdmin': user.is_superuser
    } if user.is_authenticated else {
        'id': None
    }
