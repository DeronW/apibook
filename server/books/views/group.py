from django.utils.translation import gettext as _


from django.http import JsonResponse
from django.contrib.auth.models import User
from django.db.models import Q

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
        data = group.data
        data['projects'] = [x.data for x in group.project_set.all()]
        return JsonResponse({'success': True, 'data': data})
    else:
        return JsonResponse({'success': False, 'message': 'Group id:%s not exist' % id})


@need_login
def list(request):

    user = request.user
    favorite_groups = user.group_favorites.all()
    favorite_group_ids = [x.id for x in favorite_groups]

    groups = Group.objects.all()
    groups = [x.data for x in groups]
    for i in groups:
        if favorite_group_ids.count(i.get('id')):
            i['star'] = True
    return JsonResponse({'success': True, 'data': groups})


@need_login
def favorite(request):
    gid = request.json.get('id')
    cancel = request.json.get('action') == 'cancel'
    group = Group.objects.get(id=gid)
    if cancel:
        group.favorite.remove(request.user)
    else:
        group.favorite.add(request.user)
    return JsonResponse({'success': True})


@need_login
def add_member(request):
    eu = request.json.get('email_or_username')
    user = User.objects.filter(Q(email=eu) | Q(username=eu))[0]
    if user:
        group = Group.objects.get(id=request.json.get('id'))
        group.member.add(user)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'User does not exist'})

@need_login
def remove_member(request):
    user = User.objects.get(id=request.json.get('user_id'))
    group = Group.objects.get(id=request.json.get('id'))
    group.member.remove(user)
    return JsonResponse({'success': True})