from django.utils.translation import gettext as _


from django.http import JsonResponse
from books.utils import Success, Fail
from django.contrib.auth.models import User
from django.db.models import Q

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
        return Success({'id': project.id})
    else:
        return Fail('Create Failed')


@need_login
def update(request):
    data = request.json
    project = Project.get(data.get('pid'))

    if project is None:
        return Fail('Project id:%s does not exist' % data.get('id'))

    project.name = data.get('name')
    project.describe = data.get('describe')
    project.status = data.get('status')
    project.scope = data.get('scope')
    project.group_id = data.get('group_id')
    project.save()

    return Success()


@need_login
def add_member(request):
    eu = request.json.get('email_or_username')
    user = User.objects.filter(Q(email=eu) | Q(username=eu))
    if user:
        project = Project.get(request.json.get('pid'))
        project.member.add(user[0])
        return Success()
    else:
        return Fail('User does not exist')
    return Success()


@need_login
def remove_member(request):
    data = request.json
    user = User.objects.get(id=data.get('uid'))
    project = Project.get(id=data.get('pid'))
    project.member.remove(user)
    return Success()


def info(request):
    project = Project.get(request.GET.get('pid'))
    if project:
        return Success(project.verbose_data)
    else:
        return Fail('Project id:%s not exist' % id)


@need_login
def all(request):
    projects = Project.objects.filter().order_by('name')
    data = [x.data for x in projects]
    return Success(data)


@need_login
def watching(request):
    if request.user.is_anonymous:
        return Success([])
    else:
        ps = request.user.project_favorites.all()
        return Success([x.data for x in ps])


@need_login
def watch(request):
    if request.user.is_anonymous:
        return Fail()
    else:
        p = Project.objects.get(id=request.GET.get('pid'))
        p.favorite.add(request.user)
        return Success()


@need_login
def unwatch(request):
    if request.user.is_anonymous:
        return Fail()
    else:
        p = Project.objects.get(id=request.GET.get('pid'))
        p.favorite.remove(request.user)
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
    modeuls_data = sorted(modeuls_data, key=lambda x: x.get('prefix'))
    return Success(modeuls_data)


def apis(request):
    pid = request.GET.get('pid')
    project = Project.objects.get(id=pid)
    apis = project.apientry_set.filter(deleted_at=None)
    return Success([x.data for x in apis])

def format_html(request):
    html = ''
    return Success(html)

def format_markdown(request):
    md = 'sdfg'
    return Success(md)