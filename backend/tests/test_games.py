import pytest
from apps.games.models import Game


@pytest.mark.django_db
class TestGameAPI:
    def test_list_games(self, api_client):
        Game.objects.create(title="Zelda", release_year=2023, genre="Adventure")
        response = api_client.get("/api/games/")
        assert response.status_code == 200
        assert response.data["count"] == 1

    def test_create_game_authenticated(self, auth_client):
        data = {"title": "Dark Souls", "release_year": 2011, "genre": "RPG"}
        response = auth_client.post("/api/games/", data)
        assert response.status_code == 201
