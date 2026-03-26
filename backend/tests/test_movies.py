import pytest
from apps.movies.models import Movie


@pytest.mark.django_db
class TestMovieAPI:
    def test_list_movies(self, api_client):
        Movie.objects.create(title="Inception", release_year=2010, genre="Sci-Fi")
        response = api_client.get("/api/movies/")
        assert response.status_code == 200
        assert response.data["count"] == 1

    def test_create_movie_authenticated(self, auth_client):
        data = {"title": "The Matrix", "release_year": 1999, "genre": "Sci-Fi"}
        response = auth_client.post("/api/movies/", data)
        assert response.status_code == 201

    def test_create_movie_unauthenticated(self, api_client):
        data = {"title": "The Matrix", "release_year": 1999, "genre": "Sci-Fi"}
        response = api_client.post("/api/movies/", data)
        assert response.status_code == 403
