from django.db import models
from users.models import User  # FK to users

class PatientRecord(models.Model):
    RECORD_TYPES = [
        ("report", "Report"),
        ("prescription", "Prescription"),
        ("bill", "Bill"),
        ("other", "Other"),
    ]

    STATUS_COLORS = [
        ("red", "Red"),
        ("yellow", "Yellow"),
        ("green", "Green"),
    ]

    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="records")
    type = models.CharField(max_length=20, choices=RECORD_TYPES)
    file_url = models.TextField()
    status_color = models.CharField(max_length=10, choices=STATUS_COLORS)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient.name} - {self.type} ({self.status_color})"
