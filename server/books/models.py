from django.db import models
from django.utils.translation import gettext as _

METHODS = [(x, x) for x in ('GET', 'POST', 'PUT', 'DELETE')]

CONTENT_TYPES = [(x, x) for x in ('application/x-www-form-urlencoded',
                                  'multipart/form-data',
                                  'text/plain',
                                  'application/json')]

DATA_TYPES = [(x, x) for x in ('Number', 'String', 'Boolean', 'Empty')]

PROJECT_STATUS = [(x, x) for x in ('maintaining', 'deprecated', 'disabled')]

SCOPE_STATUS = [(x, x) for x in ('public', 'private')]


class BaseModel(models.Model):

    id = models.AutoField(primary_key=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    deleted_at = models.DateTimeField(blank=True, null=True, editable=False)
    created_by = models.CharField(blank=True, max_length=30, editable=False)
    updated_by = models.CharField(blank=True, max_length=30, editable=False)

    class Meta:
        abstract = True


class Group(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=80, blank=True)
    scope = models.CharField(
        max_length=30, choices=SCOPE_STATUS, default=SCOPE_STATUS[0][0])

    def __str__(self):
        return self.name

    @property
    def data(self):
        return {
            'id': self.id,
            'name': self.name,
            'describe': self.describe,
            'scope': self.scope
        }


class Project(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=60, blank=True)
    group = models.ForeignKey(
        'Group', blank=True, null=True, on_delete=models.SET_NULL)
    status = models.CharField(
        max_length=30, choices=PROJECT_STATUS, default=PROJECT_STATUS[0][0])
    scope = models.CharField(
        max_length=30, choices=SCOPE_STATUS, default=SCOPE_STATUS[0][0])

    def __str__(self):
        return self.name

    @property
    def data(self):
        return {
            'id': self.id,
            'name': self.name,
            'describe': self.describe,
            'scope': self.scope,
            'status': self.status,
            'group_id': self.group and self.group.id
        }


class Readme(models.Model):
    entry = models.ForeignKey('Project', null=True,
                              on_delete=models.SET_NULL)
    content = models.CharField(max_length=3000)


class Module(BaseModel):
    name = models.CharField(max_length=30)
    describe = models.CharField(max_length=60, blank=True, default='')
    base_url = models.CharField(max_length=30, blank=True, default='')
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return '%s - %s' % (self.base_url or '""', self.name)


class ApiEntry(BaseModel):
    method = models.CharField(max_length=20, choices=METHODS)
    path = models.CharField(max_length=400)
    deprecated = models.BooleanField(default=False)
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)
    module = models.ForeignKey('Module', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return '%s:%s' % (self.method, self.path)


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


class GlobaConfig(models.Model):
    base_url = models.CharField(blank=True, null=True, max_length=100)

    def save(self):
        if self.pk is not None:
            raise Exception(
                'GlobalConfig should be singleton, and we have already have one')
        else:
            self.pk = 1
            self.save()
