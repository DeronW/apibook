from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
    context = {'hello': 'kitty'}
    return render(request, 'projects/index.html', context)
