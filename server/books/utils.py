
from django.http import JsonResponse


def Success(data=None):
    return JsonResponse({'success': True, 'data': data})


def Fail(msg='failed'):
    return JsonResponse({'success': False, 'message': msg})
