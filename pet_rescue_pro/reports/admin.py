from django.contrib import admin
from .models import PetReport

# Register your models here.

@admin.register(PetReport)
class PetReportAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "pet",
        "user",
        "status",
        "pet__status",
        "location",
        "created_at",
        "reviewed_at"
    )   

    search_fields = (
        "pet__name",
        "user__username",
        "pet__status",
        "location",
        "status",
    )   

    list_filter = (
        "status",
        "created_at",
        "pet__status"
    )

    readonly_fields = ("created_at", "reviewed_at")
