from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [
            'id',
            'title',
            'description',
            'genres',
            'platform',
            'developer',
            'publisher',
            'release_year',
            'rating',
            'user_rating',
            'status',
            'progress',
            'hours_played',
            'completed_date',
            'cover_url',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
