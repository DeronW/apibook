from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse


@login_required
@require_http_methods(["GET", "POST"])
def settings(request):
    if request.method == 'GET':
        gcs = GlobaConfig.objects.all()
        return JsonResponse({base_url: gcs[0].base_url})
    else:
        return JsonResponse({})
