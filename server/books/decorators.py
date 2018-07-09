
from books.utils import Success, Fail
from books.models import GlobalConfig
from django.contrib.auth.models import User
from django.contrib.auth import login


def anonymous():
    Anon = 'Anonymous'
    try:
        user = User.objects.get(username=Anon)
    except User.DoesNotExist:
        user = User(username=Anon)
        user.is_superuser = True
        user.save()
    return user


def need_login(function):
    def wrap(request, *args, **kwargs):
        if GlobalConfig.instance().freelance:
            # login(request, anonymous()) # login as anonymous user
            return function(request, *args, **kwargs)
        elif request.user.is_authenticated:
            return function(request, *args, **kwargs)
        else:
            return Fail({
                'type': "warning",
                'text': "Login required"
            })
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
