from django.db import models
from core.constants import REPORT_STATUS_CHOICES
from users.models import User


class PetReport(models.Model):
    REPORT_TYPE_CHOICES = [
        ("Lost", "Lost"),
        ("Found", "Found"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES, default="Lost")
    pet_name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=50)
    pet_breed = models.CharField(max_length=50, blank=True, null=True)
    pet_color = models.CharField(max_length=50, blank=True, null=True)
    pet_age = models.PositiveIntegerField(null=True, blank=True)
    pet_gender = models.CharField(max_length=15, blank=True, null=True)
    pet_size = models.CharField(max_length=30, blank=True, null=True)
    pet_image = models.ImageField(upload_to='pet_report_images/', blank=True, null=True)
    pet_status = models.CharField(max_length=20, choices=[("Lost", "Lost"), ("Found", "Found")], default="Lost")
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    report_status = models.CharField(max_length=20, choices=REPORT_STATUS_CHOICES, default="Pending")
    date_reported = models.DateTimeField(auto_now_add=True)
    admin_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=REPORT_STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"{self.pet_name} - {self.status}"

    class Meta:
        db_table = 'pet_report'
