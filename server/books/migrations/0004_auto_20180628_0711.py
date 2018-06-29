# Generated by Django 2.0.5 on 2018-06-28 07:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('books', '0003_auto_20180628_0446'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='manager',
        ),
        migrations.RemoveField(
            model_name='group',
            name='reader',
        ),
        migrations.RemoveField(
            model_name='project',
            name='manager',
        ),
        migrations.RemoveField(
            model_name='project',
            name='reader',
        ),
        migrations.AddField(
            model_name='group',
            name='member',
            field=models.ManyToManyField(related_name='group_members', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='project',
            name='member',
            field=models.ManyToManyField(related_name='project_members', to=settings.AUTH_USER_MODEL),
        ),
    ]
