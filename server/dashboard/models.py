from django.db import models

class Config(models.Model):
    register_allowed = models.BooleanField(default=False)
    login_required = models.BooleanField(default=False)
    history_recored = models.BooleanField(default=True)