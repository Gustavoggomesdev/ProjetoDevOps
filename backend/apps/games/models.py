from django.db import models


class Game(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    release_year = models.PositiveIntegerField()
    genre = models.CharField(max_length=100)
    developer = models.CharField(max_length=255, blank=True)
    platform = models.CharField(max_length=100, blank=True)
    cover = models.ImageField(upload_to="games/covers/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Jogo"
        verbose_name_plural = "Jogos"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.release_year})"
