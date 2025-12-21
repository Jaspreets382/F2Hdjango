from django.db import models
from orders.models import Order
from products.models import Product

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    STATUS_CHOICES=[("Pending","PENDING"),
                    ("Confirmed","CONFIRMED"),
                    ("Deliverd","DELIVERED")
                    ]

    product_id = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity_kg = models.PositiveIntegerField()
    price_at_time = models.PositiveIntegerField()
    
    status=models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    

    def __str__(self):
        return f"{self.quantity_kg}kg of {self.product.name}"
