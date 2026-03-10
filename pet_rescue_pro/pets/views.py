from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import Pet
from .serializer import PetSerializer
from core.mixins import ResponseMixin
from core.permission import IsAdmin

# Create your views here.
class PetViewSet(viewsets.ModelViewSet, ResponseMixin):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    #  NEW LOOKUP LOGIC
    # def get_object(self):
    #     lookup = self.kwargs.get("lookup")
    #     queryset = self.get_queryset()
    #     return get_object_or_404(
    #         queryset,
    #         Q(username=lookup) | Q(email=lookup) | Q(id=lookup)
    #     )

    @action(detail=False, methods=['get'], url_path='get', permission_classes=[AllowAny])
    def get_all_pets(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        print(queryset)
        serializer = self.serializer_class(queryset, many=True)
        return self.success_response(
            data={
                "count": queryset.count(),
                "Pets": serializer.data
            },
            message="Pets fetched successfully",
            status_code = status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['get'], url_path="pet-detail", permission_classes=[AllowAny])
    def get_pet_detail(self, request, *args, **kwargs):
        pet = self.get_object()
        serializer = self.get_serializer(pet)
        return self.success_response(
            data=serializer.data,
            message="Pet fetched successfully",
            status_code = status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['post'], url_path="register-pet", permission_classes=[IsAuthenticated])
    def register_pet(self, request, *args, **kwrags):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return self.success_response(
            data=serializer.data,
            message="Pet Registered Successfully",
            status_code = status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['put', 'patch'], url_path='update-pet', permission_classes=[IsAuthenticated])
    def update_pet(self, request, *args, **kwrags):
        partial = request.method == "PATCH"
        instance = self.get_object()
        serializer = self.get_serializer(instance, data = request.data, partial = partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.success_response(
            data=serializer.data,
            message="Pet updated successfully",
            status_code=status.HTTP_202_ACCEPTED
        )
    
    @action(detail=True, methods=['delete'], url_path='delete-pet', permission_classes=[IsAdmin | IsAuthenticated])
    def delete_pet(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return self.success_response(
            data={"deleted_user_id": instance.id},
            message="Pet deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )

