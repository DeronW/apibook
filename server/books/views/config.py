
from django.http import JsonResponse
from books.decorators import need_login

from books.models import GlobalConfig


@need_login
def info(request):
    conf = GlobalConfig.objects.first()
    if conf is None:
        conf = GlobalConfig.objects.create()
    return JsonResponse({'success': True, 'data': conf.data})

@need_login
def update(request):
    data = request.json
    conf = GlobalConfig.objects.first()
    conf.base_url = data.get('base_url')
    conf.allow_register = data.get('allow_register')
    conf.need_login = data.get('need_login')
    conf.save()
    return JsonResponse({'success': True})