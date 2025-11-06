from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "role",
        "gender",
        "city",
        "state",
        "created_at",
    )
    list_filter = ("role", "gender", "state", "created_at")
    search_fields = ("name", "email", "phone", "city", "state", "district")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal Info",
            {
                "fields": (
                    "name",
                    "phone",
                    "gender",
                    "role",
                    "speciality",
                    "hospital_name",
                    "lab_name",
                    "experience",
                )
            },
        ),
        (
            "Location Info",
            {"fields": ("city", "district", "state", "pin")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "name",
                    "email",
                    "phone",
                    "gender",
                    "role",
                    "speciality",
                    "hospital_name",
                    "lab_name",
                    "experience",
                    "city",
                    "district",
                    "state",
                    "pin",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )
