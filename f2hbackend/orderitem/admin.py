from django.contrib import admin
from .models import OrderItem,Order
# Register your models here.
# admin.site.register(OrderItem)
# admin.site.register(Order)
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display=('id','order','product_id','quantity_kg','price_at_time','status')


