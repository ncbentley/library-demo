# Generated by Django 5.0.4 on 2024-04-18 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0005_remove_book_checked_out_by_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
        migrations.AlterField(
            model_name='book',
            name='body',
            field=models.TextField(default='...', max_length=10000),
        ),
    ]