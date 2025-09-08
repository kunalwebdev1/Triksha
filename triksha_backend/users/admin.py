from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # Only import models from models.py


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("id", "name", "email", "phone", "role", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("name", "email", "phone")
    
    ordering = ("email",)  

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name", "phone", "aadhaar", "role")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name", "email", "phone", "aadhaar", "role", "password1", "password2", "is_staff", "is_superuser"),
        }),
    )

