from rest_framework import serializers
from .models import PetReport
from adoptions.models import Pet
from adoptions.serializer import PetSerializer


class PetReportSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    user_detail = serializers.StringRelatedField(
        source="user",
        read_only=True
    )

    pet_data = serializers.SerializerMethodField()
    user_contact = serializers.SerializerMethodField()

    class Meta:
        model = PetReport
        fields = [
            "id",
            "user",
            "user_detail",
            "user_contact",
            "pet_data",
            "report_type",
            "pet_name",
            "pet_type",
            "pet_breed",
            "pet_color",
            "pet_age",
            "pet_gender",
            "pet_size",
            "pet_image",
            "pet_status",
            "location",
            "description",
            "report_status",
            "status",
            "date_reported",
            "admin_comment",
            "created_at",
            "reviewed_at",
        ]
        read_only_fields = [
            "created_at",
            "reviewed_at",
            "admin_comment",
            "date_reported",
        ]

    def get_pet_data(self, obj):
        return {
            "name": obj.pet_name,
            "pet_type": obj.pet_type,
            "breed": obj.pet_breed,
            "color": obj.pet_color,
            "age": obj.pet_age,
            "gender": obj.pet_gender,
            "size": obj.pet_size,
            "status": obj.pet_status,
            "image": obj.pet_image.url if obj.pet_image else None,
        }

    def get_user_contact(self, obj):
        return {
            "email": obj.user.email,
            "phone": obj.user.phone_number,
            "address": obj.user.address,
        }


class PetReportCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    pet_data = serializers.DictField(write_only=True, required=False)

    class Meta:
        model = PetReport
        fields = [
            "user",
            "report_type",
            "pet_data",
            "pet_name",
            "pet_type",
            "pet_breed",
            "pet_color",
            "pet_age",
            "pet_gender",
            "pet_size",
            "pet_image",
            "pet_status",
            "location",
            "description",
            "admin_comment",
            "status",
            "report_status",
        ]
        read_only_fields = [
            "admin_comment",
            "status",
            "report_status",
            "date_reported",
        ]

    def create(self, validated_data):
        pet_data = validated_data.pop("pet_data", {})

        report = PetReport.objects.create(
            user=validated_data.get("user"),
            report_type=validated_data.get("report_type", pet_data.get("status", "Lost")),
            pet_name=validated_data.get("pet_name") or pet_data.get("name"),
            pet_type=validated_data.get("pet_type") or pet_data.get("pet_type"),
            pet_breed=validated_data.get("pet_breed") or pet_data.get("breed"),
            pet_color=validated_data.get("pet_color") or pet_data.get("color"),
            pet_age=validated_data.get("pet_age") or pet_data.get("age"),
            pet_gender=validated_data.get("pet_gender") or pet_data.get("gender"),
            pet_size=validated_data.get("pet_size") or pet_data.get("size"),
            pet_image=validated_data.get("pet_image") or pet_data.get("image"),
            pet_status=validated_data.get("pet_status") or pet_data.get("status", "Lost"),
            location=validated_data.get("location"),
            description=validated_data.get("description"),
        )

        return report


