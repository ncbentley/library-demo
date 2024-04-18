from django.db import models
    
class Book(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=100, blank=False)
    title = models.CharField(max_length=100, blank=False)
    body = models.TextField(max_length=10000, blank=False, default="...")
    checked_out = models.BooleanField(default=False)

    class Meta:
        ordering = ['created']