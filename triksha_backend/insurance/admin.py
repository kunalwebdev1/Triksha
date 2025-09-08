from django.contrib import admin
from .models import Insurance

@admin.register(Insurance)
class InsuranceAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "hospital", "insurance_provider", "claim_status")
    list_filter = ("claim_status",)
    search_fields = ("patient__name", "insurance_provider")
