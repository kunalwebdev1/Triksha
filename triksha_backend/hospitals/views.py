from rest_framework import viewsets
from .models import Hospital
from .serializers import HospitalSerializer

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all().order_by("-created_at")
    serializer_class = HospitalSerializer
