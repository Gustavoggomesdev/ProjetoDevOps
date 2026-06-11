"""
URL configuration for media_vault project.
"""

from django.contrib import admin
from django.db import connections
from django.http import JsonResponse
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.movies.views import MovieViewSet
from apps.games.views import GameViewSet


def health_check(request):
    try:
        with connections["default"].cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
    except Exception as exc:
        return JsonResponse(
            {"status": "error", "database": "unavailable", "detail": str(exc)},
            status=503,
        )

    return JsonResponse({"status": "ok", "database": "ok"})


router = DefaultRouter()
router.register(r"movies", MovieViewSet, basename="movie")
router.register(r"games", GameViewSet, basename="game")

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
]
