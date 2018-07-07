
from django.urls import path, include

from .views import group, project, module, user, index, config, api

users = [
    path('info.json', user.info),
    path('list.json', user.list),
    path('update.json', user.update),
    path('register.json', user.register),
    path('login.json', user.login_user),
    path('logout.json', user.logout_user),
]

groups = [
    path('create.json', group.create),
    path('update.json', group.update),
    path('list.json', group.list),
    path('favorite.json', group.favorite),
    path('add_member.json', group.add_member),
    path('remove_member.json', group.remove_member),
    path('remove_project.json', group.remove_project),
    path('info.json', group.info)
]

projects = [
    path('create.json', project.create),
    # path('update.json', project.update),
    path('favorite.json', project.favorite),
    path('list.json', project.list),
    path('apis.json', project.apis),
    path('modules.json', project.modules),
    path('info.json', project.info)
]

modules = [
    path('create.json', module.create),
    path('update.json', module.update),
    path('info.json', module.info)
]

apis = [
    path('create.json', api.create)
]

configs = [
    path('info.json', config.info),
    path('update.json', config.update)
]

urlpatterns = [
    path('', index),
    path('config/', include(configs)),
    path('project/', include(projects)),
    path('api/', include(apis)),
    path('module/', include(modules)),
    path('group/', include(groups)),
    path('user/', include(users))
]
