
from django.http import JsonResponse


def need_login(function):
    def wrap(request, *args, **kwargs):
        if request.user.is_authenticated:
            return function(request, *args, **kwargs)
        else:
            return JsonResponse({
                'code': 401,
                'message': "Login required"
            })
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
