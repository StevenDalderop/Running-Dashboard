# Generated by Django 4.0.4 on 2022-08-25 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_article'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Article',
        ),
        migrations.DeleteModel(
            name='Training',
        ),
    ]
