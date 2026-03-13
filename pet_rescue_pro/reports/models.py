from django.db import models
from core.constants import REPORT_STATUS_CHOICES
from pets.models import Pet
from users.models import User


class PetReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    admin_comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=REPORT_STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"{self.pet.name} - {self.status}"

    class Meta:
        db_table = 'pet_report'
