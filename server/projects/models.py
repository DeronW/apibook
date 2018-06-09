from django.db import models
from django.utils.translation import gettext as _

METHODS = [(x, x) for x in ('GET', 'POST', 'PUT', 'DELETE')]

CONTENT_TYPES = [(x, x) for x in ('application/x-www-form-urlencoded',
                                  'multipart/form-data',
                                  'text/plain',
                                  'application/json')]

DATA_TYPES = [(x, x) for x in ('Number', 'String', 'Boolean', 'Empty')]


class BaseModel(models.Model):

    id = models.AutoField(primary_key=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True)
    created_by = models.CharField(blank=True, max_length=30)
    updated_by = models.CharField(blank=True, max_length=30)

    class Meta:
        abstract = True


class Group(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=80)


class Project(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=60)
    group = models.ForeignKey('Group', null=True, on_delete=models.SET_NULL)


class Readme(models.Model):
    entry = models.ForeignKey('Project', null=True,
                              on_delete=models.SET_NULL)
    content = models.CharField(max_length=3000)


class Module(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=60)
    base_url = models.CharField(max_length=30)
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)


class ApiEntry(BaseModel):
    method = models.CharField(max_length=20, choices=METHODS)
    path = models.CharField(max_length=400)
    deprecated = models.BooleanField(default=False)
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)
    module = models.ForeignKey('Module', null=True, on_delete=models.SET_NULL)


class ApiRequest(BaseModel):
    entry = models.ForeignKey('ApiEntry', null=True, on_delete=models.SET_NULL)
    content_type = models.CharField(max_length=30, choices=CONTENT_TYPES)
    field = models.OneToOneField(
        to='ApiRequestField', null=True, on_delete=models.SET_NULL)


class ApiResponse(BaseModel):
    entry = models.ForeignKey('ApiEntry', null=True, on_delete=models.SET_NULL)
    content_type = models.CharField(max_length=30, choices=CONTENT_TYPES)
    field = models.OneToOneField(
        to='ApiResponseField', null=True, on_delete=models.SET_NULL)


class FieldTemplate(BaseModel):
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)
    nodes = models.CharField(max_length=2000)


class DataObject(BaseModel):
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)
    nodes = models.CharField(max_length=2000)


class ApiRequestField(BaseModel):
    entry = models.ForeignKey('ApiRequest', null=True,
                              on_delete=models.SET_NULL)
    nodes = models.CharField(max_length=2000)


class ApiResponseField(BaseModel):
    entry = models.ForeignKey('ApiResponse', null=True,
                              on_delete=models.SET_NULL)
    nodes = models.CharField(max_length=2000)
