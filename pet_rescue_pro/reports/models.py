from django.db import models
from core.constants import REPORT_STATUS_CHOICES
from pets.models import Pet
from users.models import User


class PetReport(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    admin_comment = models.TextField()
    report_status = models.CharField(
        max_length=20,
        choices=REPORT_STATUS_CHOICES,
        default="Pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pet.name} - {self.report_status}"

    class Meta:
        db_table = 'pet_report'
