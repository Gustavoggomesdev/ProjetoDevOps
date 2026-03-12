from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Game
from .serializers import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if query:
            games = self.get_queryset().filter(
                Q(title__icontains=query) | Q(description__icontains=query)
            )
        else:
            games = self.get_queryset()
        
        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_platform(self, request):
        platform = request.query_params.get('platform', '')
        if platform:
            games = self.get_queryset().filter(platform=platform)
        else:
            games = self.get_queryset()
        
        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        queryset = self.get_queryset()
        return Response({
            'total_games': queryset.count(),
            'completed': queryset.filter(status='completed').count(),
            'playing': queryset.filter(status='playing').count(),
            'wishlist': queryset.filter(status='wishlist').count(),
            'total_hours': sum([g.hours_played for g in queryset]),
        })
