from django.urls import path
from .views import create_order,order_detail,get_farmer_dashboard,get_summary,get_order_history
urlpatterns = [
path('',create_order),
path("<int:order_id>/",order_detail),
path("farmer-dash/",get_farmer_dashboard),
path("farmer-dash/summary",get_summary),
path("history",get_order_history)

]