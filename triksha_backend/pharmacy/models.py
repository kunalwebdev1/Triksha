from django.db import models
from users.models import User

class PharmacyInventory(models.Model):
    pharmacy = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={"role": "pharmacy"})
    medicine_name = models.CharField(max_length=255)
    stock_count = models.IntegerField()
    expiry_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medicine_name} ({self.stock_count})"
