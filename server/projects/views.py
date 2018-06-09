from django.shortcuts import render
from django.http import HttpResponse
from projects.models import (
    Group, Project, Module, ApiEntry, ApiRequest, 
    ApiResponse, ApiRequestField, ApiResponseField
)


# from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext as _


def index(request):
    gs = Group.objects.all()
    ps = Project.objects.all()

    return render(request, 'projects/index.html', {
        'groups': [{
            'name': x.name,
            'updated_at': x.updated_at
        } for x in gs],
        'projects': [{
            'name': x.name,
            'updated_at': x.updated_at
        } for x in ps],
        "t": _("ttt")
    })
