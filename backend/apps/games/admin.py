from django.contrib import admin
from .models import Game


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["title", "genre", "platform", "release_year", "developer"]
    search_fields = ["title", "developer"]
    list_filter = ["genre", "platform", "release_year"]
