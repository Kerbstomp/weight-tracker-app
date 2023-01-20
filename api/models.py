from django.db import models

class User(models.Model):
    name = models.TextField()
    created_datetime = models.DateTimeField(auto_now_add=True)

class UserWeight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.FloatField(null=False)
    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)
