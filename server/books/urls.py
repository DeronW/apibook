
from django.urls import path, include

from .views import group, project, user, index, config

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
    path('info.json', group.info)
]

projects = [
    path('create.json', project.create),
    # path('update.json', project.update),
    path('list.json', project.list),
    path('info.json', project.info)
]

configs = [
    path('info.json', config.info),
    path('update.json', config.update)
]

urlpatterns = [
    path('', index),
    path('config/', include(configs)),
    path('project/', include(projects)),
    path('group/', include(groups)),
    path('user/', include(users))
]
