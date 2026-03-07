from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password

from core.mixins import ResponseMixin
from .models import PetReport, User
from .seralizer import PetReportSerializer, UserWriteSerializer, LoginSerializer, UserReadSerializer
from core.permission import IsAdmin, IsSuperAdmin

# Create your views here.
class UserViewSet(viewsets.ModelViewSet, ResponseMixin):
    queryset = User.objects.all()   
    serializer_class = UserWriteSerializer

    #  NEW LOOKUP LOGIC
    def get_object(self):
        lookup = self.kwargs.get("pk")
        queryset = self.get_queryset()
        return get_object_or_404(
            queryset,
            Q(username=lookup) | Q(email=lookup) | Q(id=lookup)
        )

    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = UserReadSerializer(queryset, many=True)

        return self.success_response(
            data={
                "count": queryset.count(),
                "users": serializer.data
            },
            message="Users fetched successfully",
            status_code=status.HTTP_200_OK
        )
    

    @action(detail=False, methods=['get'], url_path='me', permission_classes=[IsAuthenticated])
    def get_user(self, request, *args, **kwargs):
        serializer = UserReadSerializer(request.user, context={"request": request})
        return self.success_response(
            data = serializer.data,
            message="User fetched successfully",
            status_code = status.HTTP_200_OK
        )


    @action(detail=False, methods=['post'], url_path='register', permission_classes=[AllowAny])
    def register(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.success_response(
            data=serializer.data,
            message="User registered successfully",
            status_code=status.HTTP_201_CREATED
        )
    

    @action(detail=False, methods=['post'], url_path='login', permission_classes=[AllowAny])
    def login(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return self.success_response(
            data=serializer.validated_data,
            message="Login successful",
            status_code=status.HTTP_200_OK
        )
        

    @action(detail=True, methods=['put', 'patch'], url_path='update-user', permission_classes=[IsAuthenticated])
    def update_user(self, request, *args, **kwargs):
        partial = request.method == "PATCH"
        instance = self.get_object()

        if request.user != instance and request.user.role != "admin":
            return self.error_response(
                message="Permission denied",
                status_code=status.HTTP_403_FORBIDDEN
            )
    
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return self.success_response(
            data=serializer.data,
            message="User updated successfully",
            status_code=status.HTTP_200_OK
        )
    

    @action(detail=True, methods=['delete'], url_path='delete-user', permission_classes=[IsAdmin | IsAuthenticated])
    def delete_user(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return self.success_response(
            data={"deleted_user_id": instance.id},
            message="User deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    
    @action(detail=False, methods=['patch'], url_path='update-password', permission_classes=[IsAuthenticated])
    def update_password(self, request, *args, **kwargs):
        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not old_password or not new_password:
            return self.error_response(
                message="Old password and new password are required",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        if not check_password(old_password, user.password):
            return self.error_response(
                message="Old password is incorrect",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        if new_password != confirm_password:
            return self.error_response(
                message="Passwords do not match",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        if len(new_password) < 8:
            return self.error_response(
                message="Password must be at least 8 characters",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        user.password = make_password(new_password)
        user.save()

        return self.success_response(
            message="Password updated successfully",
            status_code=status.HTTP_200_OK
        )



    # ---------------    ADMIN ROUTES     -------------

    @action(detail=False, methods=['get'], url_path='admin-dashboard', permission_classes=[IsAdmin | IsSuperAdmin] )
    def admin_dashboard(self, request):
        total_users = User.objects.filter(role ="User").count()
        total_reports = PetReport.objects.count()

        total_admin_users = None

        if request.user.role == "SuperAdmin":
            total_admin_users = User.objects.filter(role="Admin").count()

        data = {
            "total_users": total_users,
            "total_reports": total_reports,
        }

        if total_admin_users is not None:
            data["total_admin_users"] = total_admin_users

        return self.success_response(
            data=data,
            message="Admin dashboard data fetched successfully",
            status_code=status.HTTP_200_OK
        )
    
    @action( detail=False, methods=['get'], url_path='admin-users', permission_classes=[IsAdmin | IsSuperAdmin] )
    def admin_users(self, request):

        if request.user.role == "SuperAdmin":
            users = User.objects.exclude(id=request.user.id)
        else:
            users = User.objects.filter(role="User")
    
        serializer = UserReadSerializer(users, many=True)

        return self.success_response(
            data={
                "count": users.count(),
                "users": serializer.data
            },
            message="All users fetched successfully",
            status_code=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['delete'], url_path='admin-delete-user', permission_classes=[IsSuperAdmin])
    def admin_delete_user(self, request, pk=None):
        user = self.get_object()
        user.delete()

        return self.success_response(
            data={"deleted_user_id": pk},
            message="User deleted by admin",
            status_code=status.HTTP_204_NO_CONTENT
        )
    
    @action(detail=True, methods=['patch'], url_path='promote-user', permission_classes=[IsSuperAdmin])
    def promote_user(self, request, pk=None):
        user = self.get_object()
        user.role = "Admin"
        user.save()

        return self.success_response(
            data={"user_id": user.id, "role": user.role},
            message="User promoted to admin",
            status_code=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'], url_path='admin-pet-reports', permission_classes=[IsAdmin])
    def admin_pet_reports(self, request):
        reports = PetReport.objects.all()
        serializer = PetReportSerializer(reports, many=True)

        return self.success_response(
            data={
                "count": reports.count(),
                "reports": serializer.data
            },
            message="Pet reports fetched successfully",
            status_code=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['delete'], url_path='admin-delete-report', permission_classes=[IsAdmin])
    def admin_delete_report(self, request, pk=None):
        report = get_object_or_404(PetReport, id=pk)
        report.delete()

        return self.success_response(
            data={"deleted_report_id": pk},
            message="Pet report deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )



class PetReportViewSet(viewsets.ModelViewSet):
    queryset = PetReport.objects.all()
    serializer_class = PetReportSerializer

