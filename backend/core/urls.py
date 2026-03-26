from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


@api_view(["GET"])
@permission_classes([AllowAny])
def api_root(request):
    return Response({
        "message": "Bem-vindo à Media Vault API",
        "endpoints": {
            "admin": "/admin/",
            "token": "/api/token/",
            "token_refresh": "/api/token/refresh/",
            "users": "/api/users/",
            "movies": "/api/movies/",
            "games": "/api/games/",
            "ratings": "/api/ratings/",
        }
    })


urlpatterns = [
    path("", api_root, name="api-root"),
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/", include("apps.users.urls")),
    path("api/movies/", include("apps.movies.urls")),
    path("api/games/", include("apps.games.urls")),
    path("api/ratings/", include("apps.ratings.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
