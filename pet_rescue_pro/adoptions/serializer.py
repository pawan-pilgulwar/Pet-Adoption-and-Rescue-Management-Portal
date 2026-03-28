from rest_framework import serializers
from .models import Pet
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken   


from core.constants import PET_STATUS_CHOICES
import re

class PetSerializer(serializers.ModelSerializer):

    created_by = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    created_by_detail = serializers.StringRelatedField(
        source="created_by",
        read_only=True
    )

    class Meta:
        model = Pet
        fields = [
            "id",
            "name",
            "pet_type",
            "breed",
            "color",
            "status",   
            "image",
            "created_at",
            "updated_at",
            "created_by",
            "created_by_detail"
        ]
        extra_kwargs = {
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
            "created_by_detail": {"read_only": True}
        }

    def validate_name(self, value):
        if not re.match(r'^[A-Za-z\s]+$', value):
            raise serializers.ValidationError("Name must contain only letters.")
        return value
    
    def validate_pet_type(self, value):
        if not re.match(r'^[A-Za-z\s]+$', value):
            raise serializers.ValidationError("Pet type must contain only letters.")
        return value
        
    