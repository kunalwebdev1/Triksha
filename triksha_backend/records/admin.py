from django.contrib import admin
from .models import PatientRecord

@admin.register(PatientRecord)
class PatientRecordAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "type", "status_color", "created_at")
    list_filter = ("type", "status_color")
    search_fields = ("patient__name",)
