# Generated by Django 5.1.3 on 2024-12-01 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calcpipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Titlec', models.CharField(max_length=50)),
                ('Descriptionc', models.CharField(max_length=200)),
                ('Componc', models.CharField(max_length=200)),
                ('Componclink', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]
