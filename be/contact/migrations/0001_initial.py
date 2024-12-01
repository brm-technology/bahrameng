# Generated by Django 5.1.3 on 2024-12-01 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('title', models.CharField(max_length=100)),
                ('date', models.DateTimeField(auto_now=True)),
                ('text', models.TextField()),
            ],
        ),
    ]
