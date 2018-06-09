from django.shortcuts import render
from django.http import HttpResponse
from projects.models import (
    Group, Project, Module, ApiEntry, ApiRequest, 
    ApiResponse, ApiRequestField, ApiResponseField
)


from django.utils.translation import gettext_lazy as _


def index(request):
    return render(request, 'dashboard/index.html', {
    })
