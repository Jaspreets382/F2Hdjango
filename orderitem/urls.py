from django.urls import path
from .views import choose_item
urlpatterns = [
    path("<int:order_id>/items/",choose_item)
]