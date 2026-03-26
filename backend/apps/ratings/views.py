from rest_framework import viewsets, permissions
from .models import Rating
from .serializers import RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["content_type", "object_id"]

    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)
