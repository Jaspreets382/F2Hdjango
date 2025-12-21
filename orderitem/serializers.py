from rest_framework import serializers
from .models import OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name=serializers.CharField(
        source="product.name",
        read_only=True
    )
    class Meta:
        model=OrderItem
        fields=['id',
                'product_name',
                'price_at_time',
                'quantity_kg',
                'product_id',
                'status']
        
        read_only_fields=['price_at_time']