from django.utils.translation import gettext as _


from django.http import JsonResponse
from django.contrib.auth.models import User

from books.decorators import need_login
from IPython import embed

from books.models import Project, Group


@need_login
def create(request):
    data = request.json
    group = Group.objects.filter(id=data.get('group_id'))[0]
    if group is None:
        return JsonResponse({
            'success': False,
            'message': 'Group id:%s does not exist' % data.get('group')
        })

    project = Project.objects.create(
        name=data.get('name'),
        describe=data.get('describe'),
        status=data.get('status'),
        scope=data.get('scope'),
        group=group
    )
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
