from django.db import models
from hospitals.models import Hospital

class HospitalResource(models.Model):
    RESOURCE_CHOICES = [
        ("blood", "Blood"),
        ("oxygen", "Oxygen"),
        ("drug", "Drug"),
    ]
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_CHOICES)
    available_units = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.hospital.name} - {self.resource_type}"
