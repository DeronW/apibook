from django.utils.translation import gettext as _


from django.http import JsonResponse
from books.utils import Success, Fail
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
        return Fail(text)

    if User.objects.filter(username=username):
        return err(_('username already exist'))

    if User.objects.filter(email=email):
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

    email_user = User.objects.filter(email=username_or_email)
    username = email_user[0].username if email_user else username_or_email

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


@need_login
def info(request):
    user = None
    if request.json.get('id'):
        user = User.objects.get(id=request.json.get('id'))
        if not request.user.is_superuser and user != request.user:
            user = None
    else:
        user = request.user

    if user:
        return JsonResponse({'data': get_user_info(user)})
    else:
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': _('Permission deny')
        }})

@need_login
def update(request):
    data = request.json
    user = None

    if request.json.get('id'):
        user = User.objects.get(id=request.json.get('id'))
        if not request.user.is_superuser and user != request.user:
            user = None
    else:
        user = request.user

    if user:
        user.username = data.get('username')
        if data.get('password'):
            user.set_password(data.get('password'))
        user.save()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': _('Permission deny')
        }})

def list(request):
    users = User.objects.all()
    data = [{
        'id': u.id,
        'username': u.username,
        'email': u.email,
        'admin': u.is_superuser
    } for u in users]
    return JsonResponse({'success': True, 'data': data})

def get_user_info(user):

    return {
        'username': user.username,
        'email': user.email,
        'id': user.id,
        'isAdmin': user.is_superuser
    } if user.is_authenticated else {
        'id': None
    }
