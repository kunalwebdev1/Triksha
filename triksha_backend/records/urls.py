from rest_framework.routers import DefaultRouter
from .views import PatientRecordViewSet

router = DefaultRouter()
router.register(r"records", PatientRecordViewSet, basename="record")

urlpatterns = router.urls
