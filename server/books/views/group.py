from django.utils.translation import gettext as _


from django.http import JsonResponse
from books.utils import Success, Fail
from django.contrib.auth.models import User
from django.db.models import Q

from books.decorators import need_login
from IPython import embed

from books.models import Group, Project


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
    group = Group.get(data.get('gid'))

    if group is None:
        return Fail('Group id:%s does not exist' % data.get('gid'))
    group.name = data.get('name')
    group.describe = data.get('describe')
    group.scope = data.get('scope')
    group.save()

    return Success()


@need_login
def info(request):
    gid = request.GET.get('gid')
    group = Group.get(gid)
    if group:
        data = group.verbose_data
        return Success(data)
    else:
        return Fail('Group id:%s not exist' % gid)


def all(request):
    groups = []
    if request.user.is_authenticated:
        private_groups = request.user.group_members.all().order_by('name')
        groups.extend([x.data for x in private_groups])

    public_groups = Group.objects.filter(scope='public').order_by('name')
    groups.extend([x.data for x in public_groups])
    return Success(groups)


@need_login
def watching(request):
    if request.user.is_anonymous:
        return Success()
    else:
        groups = request.user.group_favorites.all()
    return Success([x.data for x in groups])


@need_login
def watch(request):
    gid = request.GET.get('id')
    group = Group.objects.get(id=gid)
    group.favorite.add(request.user)
    return Success()


@need_login
def unwatch(request):
    gid = request.GET.get('id')
    group = Group.objects.get(id=gid)
    group.favorite.remove(request.user)
    return Success()


@need_login
def add_member(request):
    eu = request.json.get('email_or_username')
    user = User.objects.filter(Q(email=eu) | Q(username=eu))
    if user:
        group = Group.get(request.json.get('gid'))
        group.member.add(user[0])
        return Success()
    else:
        return Fail('User does not exist')


@need_login
def remove_member(request):
    data = request.json
    user = User.objects.get(id=data.get('uid'))
    group = Group.get(id=data.get('gid'))
    group.member.remove(user)
    return Success()


@need_login
def remove_project(request):
    data = request.json
    project = Project.objects.get(id=data.get('project_id'))
    group = Group.objects.get(id=data.get('id'))
    group.project_set.remove(project)
    return Success()
