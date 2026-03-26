from rest_framework import viewsets
from .models import Game
from .serializers import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    search_fields = ["title", "genre", "developer", "platform"]
    filterset_fields = ["genre", "release_year", "platform"]
    ordering_fields = ["title", "release_year", "created_at"]
