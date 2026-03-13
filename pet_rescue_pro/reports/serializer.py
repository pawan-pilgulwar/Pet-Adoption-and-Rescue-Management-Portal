from rest_framework import serializers
from .models import PetReport
from pets.models import Pet
from pets.serializer import PetSerializer


class PetReportSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    user_detail = serializers.StringRelatedField(
        source="user",
        read_only=True
    )

    pet_detail = PetSerializer(
        source="pet",
        read_only=True
    )

    class Meta:
        model = PetReport
        fields = [
            "id",
            "user",
            "user_detail",
            "pet",
            "pet_detail",
            "location",
            "description",
            "admin_comment",
            "created_at",
            "reviewed_at",
            "status"
        ]
        read_only_fields = [
            "created_at",
            "reviewed_at",
            "admin_comment",
        ]


class PetReportCreateSerializer(serializers.ModelSerializer):
    pet_data = PetSerializer(write_only=True)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = PetReport
        fields = [
            "user",
            "pet_data",
            "location",
            "description",
            "admin_comment",
            "status"
        ]
        read_only_fields = [
            "admin_comment",
            "status"
        ]

    def create(self, validated_data):
        pet_data = validated_data.pop('pet_data')
        # Assign the user who reported as the one who 'created' the pet object initially
        user = self.context['request'].user
        pet_data['created_by'] = user
        pet = Pet.objects.create(**pet_data)
        
        report = PetReport.objects.create(pet=pet, **validated_data)
        return report


