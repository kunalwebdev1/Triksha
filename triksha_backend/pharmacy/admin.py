from django.contrib import admin
from .models import PharmacyInventory

@admin.register(PharmacyInventory)
class PharmacyInventoryAdmin(admin.ModelAdmin):
    list_display = ("id", "pharmacy", "medicine_name", "stock_count", "expiry_date")
    search_fields = ("medicine_name", "pharmacy__name")
