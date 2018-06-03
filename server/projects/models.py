from django.db import models
import uuid

METHODS = [(x, x) for x in ('GET', 'POST', 'PUT', 'DELETE')]

CONTENT_TYPES = [(x, x) for x in ('application/x-www-form-urlencoded',
                                  'multipart/form-data', 'text/plain', 'application/json')]


class Group(models.Model):
    code = models.CharField(primary_key=True, max_length=40)
    name = models.CharField(max_length=60)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Project(models.Model):
    code = models.CharField(primary_key=True, max_length=40)
    name = models.CharField(max_length=60)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey('Group', null=True, on_delete=models.SET_NULL)


class Module(models.Model):
    name = models.CharField(max_length=60)
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)


class ApiEntry(models.Model):
    method = models.CharField(max_length=20)
    path = models.CharField(max_length=400)
    project = models.ForeignKey(
        'Project', null=True, on_delete=models.SET_NULL)
    module = models.ForeignKey('Module', null=True, on_delete=models.SET_NULL)


class ApiDetail(models.Model):
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    entry = models.ForeignKey('ApiEntry', null=True, on_delete=models.SET_NULL)
    method = models.CharField(
        max_length=10, choices=METHODS, default=METHODS[0])
    content_type = models.CharField(
        max_length=20, choices=CONTENT_TYPES, default=CONTENT_TYPES[0])
