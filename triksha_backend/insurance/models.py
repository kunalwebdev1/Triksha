from django.db import models
from users.models import User
from hospitals.models import Hospital

class Insurance(models.Model):
    CLAIM_STATUS = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="insurance_claims")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="insurance_claims")
    insurance_provider = models.CharField(max_length=255)
    claim_status = models.CharField(max_length=20, choices=CLAIM_STATUS, default="pending")

    def __str__(self):
        return f"{self.insurance_provider} - {self.patient.name}"
