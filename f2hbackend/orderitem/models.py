from django.db import models
from orders.models import Order
from products.models import Product

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    STATUS_CHOICES=[("PENDING","Pending"),
                    ("CONFIRMED","Confirmed"),
                    ("DELIVERED","Delivered"),
                    ("CANCELLED","Cancelled")
                    ]

    product_id = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity_kg = models.PositiveIntegerField()
    price_at_time = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    
    status=models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING",
        db_index=True
    )

    

    def __str__(self):
        return f"{self.quantity_kg}kg of {self.product_id.name}"
