from django.utils.translation import gettext as _
from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User

from books.decorators import need_login

from books.models import Module
from books.utils import Success, Fail
from IPython import embed


def info(request):
    m = Module.objects.get(id=request.GET.get('id'))
    return Success(m.data)


@need_login
def create(request):
    data = request.json
    m = Module.objects.create(
        name=data.get('name'),
        prefix=data.get('prefix'),
        project_id=data.get('project_id'))
    if m.id:
        return Success({'id': m.id})
    else:
        return Fail()


@need_login
def update(request):
    data = request.json
    try:
        m = Module.objects.get(id=data.get('module_id'))
    except ObjectDoesNotExist:
        return Fail('Module does not exist')
    m.name = data.get('name')
    m.prefix = data.get('prefix')
    m.save()
    return Success({'id': m.id})
