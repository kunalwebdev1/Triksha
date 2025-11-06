from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id", "hospital", "patient", "doctor", "time", "status")
    list_filter = ("status", "hospital")
    search_fields = ("patient__name", "doctor__name")
