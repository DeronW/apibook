
from django.contrib.sessions.models import Session

from books.decorators import need_login
from books.models import GlobalConfig
from books.utils import Success


def info(request):
    conf = GlobalConfig.instance()
    return Success(conf.data)


@need_login
def update(request):
    data = request.json
    conf = GlobalConfig.instance()

    conf.mount_url = data.get('mount_url')
    conf.allow_register = data.get('allow_register')
    conf.freelance = data.get('freelance')
    conf.save()

    if conf.freelance:
        # logout any user
        for s in Session.objects.all():
            s.delete()

    return Success()
