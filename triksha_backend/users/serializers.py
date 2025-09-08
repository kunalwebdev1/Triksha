from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "role", "email", "phone", "aadhaar", "created_at", "updated_at"]
