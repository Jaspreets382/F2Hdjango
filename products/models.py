from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
# Create your models here.
class Product(models.Model):
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products",
        limit_choices_to={"is_farmer":True}
        )    
    name=models.CharField(max_length=50)
    description=models.TextField(max_length=200,blank=True)
    price=models.IntegerField()
    quantity=models.IntegerField()
    photo = models.ImageField(upload_to="products/", blank=True, null=True)   
    harvest_date=models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)



    def __str__(self):
        return f'{self.name} and {self.price}'
    
    def clean(self):
        if not self.farmer.is_farmer:
            raise ValidationError("only farmers can add products")
        if self.price<=0:
            raise ValidationError("Price must be positive")
        if self.quantity<=0:
            raise ValidationError("Quantity must be postive")