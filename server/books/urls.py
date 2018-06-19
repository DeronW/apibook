
from django.urls import path, include

from .views import user

users = [
    path('info.json', user.info),
    path('register.json', user.register),
    path('login.json', user.login_user),
    path('logout.json', user.logout_user),
]

urlpatterns = [
    # path('login.json', views.login_user),
    # path('logout.json', views.logout_user),
    # path('settings.json', views.settings),
    path('user/', include(users))
]
