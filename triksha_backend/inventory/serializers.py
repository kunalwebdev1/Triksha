from rest_framework import serializers
from .models import HospitalResource

class HospitalResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalResource
        fields = "__all__"
