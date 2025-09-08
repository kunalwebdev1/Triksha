from rest_framework import viewsets
from .models import HospitalResource  # ✅ Use the correct model name
from .serializers import HospitalResourceSerializer

class HospitalResourceViewSet(viewsets.ModelViewSet):
    queryset = HospitalResource.objects.all()
    serializer_class = HospitalResourceSerializer
