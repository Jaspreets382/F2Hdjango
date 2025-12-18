from django.urls import path
from .views import user_creation,login_user

urlpatterns = [
        path('register',user_creation),
    path('login', login_user),
]