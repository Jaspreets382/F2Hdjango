from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(
        source="farmer.username",
        read_only=True
    )

    class Meta:
        model= Product
        fields=['id',
                'farmer_name',
                'created_at',
                'name',
                'price',
                'quantity',
                'harvest_date']
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than zero."
            )
        return value

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Stock quantity must be greater than zero."
            )
        return value
