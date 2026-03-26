from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


class Rating(models.Model):
    CONTENT_TYPE_CHOICES = [
        ("movie", "Filme"),
        ("game", "Jogo"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="ratings")
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    object_id = models.PositiveIntegerField()
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    review = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Avaliação"
        verbose_name_plural = "Avaliações"
        unique_together = ["user", "content_type", "object_id"]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.content_type}:{self.object_id} ({self.score}/10)"
