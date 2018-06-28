

from django.http import JsonResponse
from django.utils.translation import gettext as _

from IPython import embed

def index(request):

    # embed()

    return JsonResponse({'hello': _('world')})
