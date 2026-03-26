from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    search_fields = ["title", "genre", "director"]
    filterset_fields = ["genre", "release_year"]
    ordering_fields = ["title", "release_year", "created_at"]
