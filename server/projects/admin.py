from django.contrib import admin

from projects.models import (
    Group, Project, Module, ApiEntry, ApiRequest, ApiResponse, ApiRequestField, ApiResponseField
)

admin.site.register(Group)
admin.site.register(Project)
admin.site.register(Module)
admin.site.register(ApiEntry)
admin.site.register(ApiRequest)
admin.site.register(ApiResponse)