from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    
    is_farmer=models.BooleanField(default=False)
    
    address=models.CharField(max_length=100)
    phone_number=models.CharField(max_length=15,blank=True)

    def __str__(self):
        role = "Farmer" if self.is_farmer else "Buyer"
        return f"{self.username} ({role})"