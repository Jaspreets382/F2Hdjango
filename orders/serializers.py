from rest_framework import serializers
from .models import Order
from orderitem.serializers import OrderItemSerializer

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