from django.contrib import admin
from .models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ["user", "content_type", "object_id", "score", "created_at"]
    list_filter = ["content_type", "score"]
