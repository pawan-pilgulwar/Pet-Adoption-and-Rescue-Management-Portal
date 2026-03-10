import re

from rest_framework import serializers
from .models import PetReport
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken

class PetReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetReport
        fields = '__all__'