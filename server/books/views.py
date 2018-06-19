

from django.http import JsonResponse

def index(request):
    return JsonResponse({'a': 123})
