from django.contrib import admin
from .models import HospitalResource

@admin.register(HospitalResource)
class HospitalResourceAdmin(admin.ModelAdmin):
    list_display = ("id", "hospital", "resource_type", "available_units", "updated_at")
    list_filter = ("resource_type",)
    search_fields = ("hospital__name",)
