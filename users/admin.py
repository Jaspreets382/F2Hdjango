from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = (
        'username',
        'is_farmer',
        'phone_number',
        'address',
    )

    list_filter = ('is_farmer',)
    search_fields = ('username', 'phone_number')

    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Extra Info', {
            'fields': ('phone_number', 'address', 'is_farmer'),
        }),
    )

    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ('Extra Info', {
            'fields': ('phone_number', 'address', 'is_farmer'),
        }),
    )
