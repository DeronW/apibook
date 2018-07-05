from django.utils.translation import gettext as _

from django.contrib.auth.models import User

from books.decorators import need_login

from books.models import ApiEntry
from books.utils import Success, Fail


@need_login
def create(request):
    data = request.json
    api = ApiEntry.objects.create(
        method=data.get('method'),
        describe=data.get('describe'),
        path=data.get('path')
    )
    if data.get('module_id'):
        api.module_id = data.get('module_id')
    else:
        api.project_id = data.get('project_id')
    api.save()

    if api.id:
        return Success({'id': api.id})
    else:
        return Fail()


def info(request):
    api = ApiEntry.objects.get(id=request.GET.get('id'))
    return Success(api.data)
