from django.db import models
import uuid

# Create your models here.

class TaskList(models.Model):
    key = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lst = models.ForeignKey(TaskList, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    done = models.BooleanField(default=False)