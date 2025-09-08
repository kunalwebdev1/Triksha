from rest_framework import serializers
from .models import PatientRecord

class PatientRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientRecord
        fields = "__all__"   # include all fields
