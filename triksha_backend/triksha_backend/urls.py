from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),          # Django admin
    path('api/users/', include('users.urls')),  # Users app
    path('api/hospitals/', include('hospitals.urls')),
    path('api/records/', include('records.urls')),
    path('api/appointments/', include('appointments.urls')),
    path('api/pharmacy/', include('pharmacy.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/insurance/', include('insurance.urls')),
]
