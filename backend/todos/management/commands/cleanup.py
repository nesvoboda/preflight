from django.core.management.base import BaseCommand, CommandError
from todos.models import TaskList, Task
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Cleans up task lists without tasks'

    def handle(self, *args, **options):
        q = TaskList.objects.annotate(num=Count('task'))
        q = q.filter(num=0)
        res = q.delete()
        self.stdout.write(self.style.SUCCESS(f"Deleted {res[0]} empty lists"))
        old = TaskList.objects.filter(created__lte=timezone.now()-timedelta(days=2))
        c = old.count()
        if c > 0:
            old.delete()
        self.stdout.write(self.style.SUCCESS(f"Deleted {c} old lists"))