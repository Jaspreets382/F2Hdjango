from django.urls import path
from .views import create_order,order_detail,get_farmer_dashboard
urlpatterns = [
path('',create_order),
path("<int:order_id>/",order_detail),
path("farmer-dash/",get_farmer_dashboard)

]