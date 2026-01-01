from django.contrib import admin
from .models import Order
# Register your models here
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=('id','buyer','created_at','total_price')
    list_filter=("created_at",)
    search_fields=('buyer',)