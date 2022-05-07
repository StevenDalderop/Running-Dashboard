from django.urls import path, re_path
from . import views
from django.contrib.auth.decorators import login_required

urlpatterns = [    
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("", views.index, name="index"),
    path('<path:resource>', views.index)
]
