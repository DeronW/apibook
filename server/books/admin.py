from django.contrib import admin

from books.models import *

admin.site.register(Group)
admin.site.register(Project)
admin.site.register(Module)
admin.site.register(ApiEntry)
admin.site.register(ApiRequest)
admin.site.register(ApiResponse)