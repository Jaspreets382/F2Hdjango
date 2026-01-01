from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings
# Create your models here.
class Order(models.Model):
    
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    
    total_price = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    default=0
        )
    
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return f"Order #{self.id} - {self.buyer.username})"


    def clean(self):
        if self.buyer.is_farmer:
            raise ValidationError("Farmers cannot place orders.")
