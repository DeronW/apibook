from django.utils.translation import gettext as _


from django.http import JsonResponse
from django.contrib.auth.models import User

from books.decorators import need_login
from IPython import embed

from books.models import Project, Group
from books.utils import Success, Fail


@need_login
def create(request):
    data = request.json

    project = Project.objects.create(
        name=data.get('name'),
        describe=data.get('describe'),
        status=data.get('status'),
        scope=data.get('scope')
    )
    if data.get('group_id'):
        project.group = Group.objects.get(id=data.get('group_id'))
    project.save()
    if project.id:
        return JsonResponse({'success': True, 'data': {'id': project.id}})
    else:
        return JsonResponse({'success': False, 'message': {
            'type': 'error',
            'text': 'creation fail'
        }})


# @need_login
# def update(request):
#     data = request.json
#     group = Group.objects.filter(id=data.get('id'))[0]

#     if group is None:
#         return JsonResponse({'success': False, 'message': {
#             'type': 'error',
#             'text': 'Group id:%s does not exist' % data.get('id')
#         }})

#     group.name = data.get('name')
#     group.describe = data.get('describe')
#     group.status = data.get('status')
#     group.scope = data.get('scope')
#     group.save()

#     return JsonResponse({'success': True, 'data': {'id': group.id}})


@need_login
def info(request):
    id = request.GET.get('id')
    project = Project.objects.filter(id=id)[0]
    if project:
        return JsonResponse({'success': True, 'data': project.data})
    else:
        return JsonResponse({'success': False, 'message': 'Project id:%s not exist' % id})


@need_login
def list(request):
    projects = Project.objects.filter()
    return JsonResponse({'success': True, 'data': [x.data for x in projects]})


@need_login
def favorite(request):
    gid = request.json.get('id')
    cancel = request.json.get('action') == 'cancel'
    project = Project.objects.get(id=gid)
    if cancel:
        project.favorite.remove(request.user)
    else:
        project.favorite.add(request.user)
    return Success()


def modules(request):
    pid = request.GET.get('id')
    project = Project.objects.get(id=pid)
    modules = project.module_set.all()
    modeuls_data = []

    for i in modules:
        api_list = i.apientry_set.all()
        d = i.data
        d['apis'] = [x.data for x in api_list]
        modeuls_data.append(d)
    sorted(modeuls_data, key=lambda x: x.get('prefix'))
    return Success(modeuls_data)


def apis(request):
    pid = request.GET.get('id')
    project = Project.objects.get(id=pid)
    apis = project.apientry_set.filter(deleted_at=None)

    data = {
        'apis': [x.data for x in apis]
    }
    return Success(data)
