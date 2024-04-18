# Generated by Django 5.0.4 on 2024-04-17 21:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(default='', max_length=100)),
                ('body', models.TextField()),
                ('checked_out_on', models.DateTimeField(default=None)),
                ('checked_out_by', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='checked_out_by', to='library.user')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to='library.user')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]