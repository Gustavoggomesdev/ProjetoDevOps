from django.contrib import admin
from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ["title", "genre", "release_year", "director"]
    search_fields = ["title", "director"]
    list_filter = ["genre", "release_year"]
