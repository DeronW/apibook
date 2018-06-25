from django.utils.translation import gettext as _


from django.http import JsonResponse
from django.contrib.auth.models import User

from books.decorators import need_login
from IPython import embed

from books.models import Group


@need_login
def create(request):
    data = request.json
    group = Group.objects.create(
        name=data.get('name'),
        describe=data.get('describe'),
        scope=data.get('scope')
    )
    group.save()
    if group.id:
        return JsonResponse({'success': True, 'data': {'id': group.id}})
    else:
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': 'creation fail'
        }})


@need_login
def update(request):
    data = request.json
    group = Group.objects.filter(id=data.get('id'))[0]

    if group is None:
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': 'Group id:%s does not exist' % data.get('id')
        }})

    group.name = data.get('name')
    group.describe = data.get('describe')
    group.scope = data.get('scope')
    group.save()

    return JsonResponse({'success': True, 'data': {'id': group.id}})


@need_login
def info(request):
    id = request.GET.get('id')
    group = Group.objects.filter(id=id)[0]
    if group:
        return JsonResponse({'success': True, 'data': group.data})
    else:
        return JsonResponse({'success': False, 'message': 'Group id:%s not exist' % id})


@need_login
def list(request):
    groups = Group.objects.filter()
    return JsonResponse({'success': True, 'data': [x.data for x in groups]})
