from rest_framework import serializers
from .models import OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name=serializers.CharField(
        source="product_id.name",
        read_only=True
    )
    class Meta:
        model=OrderItem
        fields=['id',
                'product_name',
                'price_at_time',
                'quantity_kg',
                'product_id',
                'status'
        ]
        
        read_only_fields=['price_at_time',]

    def validate_quantity_kg(self, value):
            if value <= 0:
                raise serializers.ValidationError("Quantity must be greater than 0")
            return value
        
    def validate(self, attrs):
            order = self.context.get("order")
            if order and order.status == "CANCELLED":
                raise serializers.ValidationError(
                    "Cannot add items to a cancelled order"
                    )
            return attrs



class OrderItemHistorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product_id.name",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product_name",
            "quantity_kg",
            "price_at_time",
            "status",
        ]
