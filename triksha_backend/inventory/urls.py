from rest_framework.routers import DefaultRouter
from .views import HospitalResourceViewSet  # ✅ Correct import

router = DefaultRouter()
router.register(r"hospital-resources", HospitalResourceViewSet, basename="hospital-resources")

urlpatterns = router.urls
