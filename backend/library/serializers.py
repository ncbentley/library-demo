from rest_framework import serializers
from library.models import Book
    
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'created', 'title', 'body', 'author', 'checked_out']