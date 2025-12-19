from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.CharField(
        source="buyer.username",
        read_only=True)
    
    class Meta:
        model=Order
        fields=['buyer_name','created_at','status']