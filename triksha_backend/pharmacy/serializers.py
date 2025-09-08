from rest_framework import serializers
from .models import PharmacyInventory

class PharmacyInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyInventory
        fields = "__all__"
