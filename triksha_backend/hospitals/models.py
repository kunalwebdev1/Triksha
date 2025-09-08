from django.db import models

class Hospital(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    geo_location = models.JSONField(null=True, blank=True)  # latitude/longitude
    verified_status = models.BooleanField(default=False)
    services_json = models.JSONField(null=True, blank=True)  # e.g. {"OPD": true, "ICU": false}

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
