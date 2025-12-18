from django.db import models
from django.conf import settings
# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    # products=models.ManyToManyField()
    total_price = models.IntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return f' Order {self.buyer} {self.status} created at {self.created_at}'
    