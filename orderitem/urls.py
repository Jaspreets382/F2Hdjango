from django.urls import path
from .views import choose_item,update_order_item_status
urlpatterns = [
    path("<int:order_id>/items/",choose_item),
    path("order-items/<int:item_id>/status/", update_order_item_status)

]