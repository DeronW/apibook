
from django.urls import path, include

from . import views

urlpatterns = [
    path('login.json', views.login_user),
    path('logout.json', views.logout_user),
    path('settings.json', views.settings),
    path('userinfo.json', views.userinfo),
]
