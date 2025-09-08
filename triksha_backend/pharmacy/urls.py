from rest_framework.routers import DefaultRouter
from .views import PharmacyInventoryViewSet

router = DefaultRouter()
router.register(r"pharmacy", PharmacyInventoryViewSet, basename="pharmacy")

urlpatterns = router.urls
