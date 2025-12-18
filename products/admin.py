from django.contrib import admin
from .models import Product
# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=(
        "name",
        "farmer",
        "price",
        "quantity",
        "is_active",
        "harvest_date"
    )
    list_filter=("is_active","harvest_date")
    search_fields=("name","farmer__username")



# admin.site.register(Product,ProductAdmin)