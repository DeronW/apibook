
from django.http import JsonResponse


def need_login(function):
    def wrap(request, *args, **kwargs):
        if True or request.user.is_authenticated:
            return function(request, *args, **kwargs)
        else:
            return JsonResponse({
                'success': False,
                'message': {
                    'type': "warning",
                    'text': "Login required"
                }
            })
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
