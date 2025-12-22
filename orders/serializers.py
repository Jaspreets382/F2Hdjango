from rest_framework import serializers
from .models import Order
from orderitem.models import OrderItem
from orderitem.serializers import OrderItemSerializer
from products.models import Product

class OrderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.CharField(
        source="buyer.username",
        read_only=True)
    
    total_price=serializers.SerializerMethodField()
    
    items=OrderItemSerializer(many=True,
                            read_only=True)
    class Meta:
        model=Order
        fields=['buyer_name','created_at','status']

    def get_total_price(self,obj):
        total=0
        for item in obj.items.all():
            total+=item.price_at_time*item.quantity_kg
        return total
    
class FarmerDashboardSerializer(serializers.ModelSerializer):
    
    order_id = serializers.IntegerField(source="order.id", read_only=True)
    buyer_name = serializers.CharField(source="order.buyer.username", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    order_status = serializers.CharField(source="order.status", read_only=True)
    order_created_at = serializers.DateTimeField(source="order.created_at", read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order_id",
            "buyer_name",
            "product_name",
            "quantity_kg",
            "price_at_time",
            "status",
            "order_status",
            "order_created_at",
        ]
        