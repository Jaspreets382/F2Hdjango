from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(
        source="farmer.username",
        read_only=True
    )

    class Meta:
        model= Product
        fields=['farmer_name',
                'created_at',
                'name',
                'price',
                'quantity',
                'harvest_date']
    
    