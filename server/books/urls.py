
from django.urls import path, include

from .views import user, index

users = [
    path('info.json', user.info),
    path('register.json', user.register),
    path('login.json', user.login_user),
    path('logout.json', user.logout_user),
]

urlpatterns = [
    path('', index),
    # path('settings.json', views.settings),
    path('user/', include(users))
]
