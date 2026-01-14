from rest_framework import serializers
from .models import Order
from orderitem.models import OrderItem
from orderitem.serializers import OrderItemSerializer,OrderItemHistorySerializer
from products.models import Product
from decimal import Decimal

class OrderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.CharField(
        source="buyer.username",
        read_only=True)
    
    total_price=serializers.SerializerMethodField()
    
    items=OrderItemSerializer(many=True,
                            read_only=True)
    class Meta:
        model=Order
        fields=['id','buyer_name','created_at','total_price','items']

    def get_total_price(self,obj):

        total = Decimal("0.00")
        for item in obj.items.all():
            total += item.price_at_time * item.quantity_kg
        return total
    
class FarmerDashboardSerializer(serializers.ModelSerializer):
    
    order_id = serializers.IntegerField(source="order.id", read_only=True)
    buyer_name = serializers.CharField(source="order.buyer.username", read_only=True)
    product_name = serializers.CharField(source="product_id.name", read_only=True)
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
            "order_created_at",
        ]

class FarmerDashSummarySerializer(serializers.Serializer):
    total_items = serializers.IntegerField()
    pending_items = serializers.IntegerField()
    confirmed_items = serializers.IntegerField()
    delivered_items = serializers.IntegerField()
    cancelled_items=serializers.IntegerField()

class OrderHistorySerializer(OrderSerializer):
    items = OrderItemHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "created_at", "total_price", "items"]
