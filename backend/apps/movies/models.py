from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    release_year = models.PositiveIntegerField()
    genre = models.CharField(max_length=100)
    director = models.CharField(max_length=255, blank=True)
    poster = models.ImageField(upload_to="movies/posters/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Filme"
        verbose_name_plural = "Filmes"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.release_year})"
