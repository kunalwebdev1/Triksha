from rest_framework import viewsets
from .models import PharmacyInventory
from .serializers import PharmacyInventorySerializer

class PharmacyInventoryViewSet(viewsets.ModelViewSet):
    queryset = PharmacyInventory.objects.all().order_by("-updated_at")
    serializer_class = PharmacyInventorySerializer
