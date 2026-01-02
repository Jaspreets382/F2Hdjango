from django.urls import path
from .views import product_list_create,edit_product,delete_product
urlpatterns = [
    path('',product_list_create),
    path('<int:product_id>/edit',edit_product),
    path('<int:product_id>/delete',delete_product)
]