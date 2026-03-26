from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Rating
        fields = ["id", "user", "content_type", "object_id", "score", "review", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
