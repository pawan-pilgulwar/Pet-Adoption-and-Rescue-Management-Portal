from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password

from core.mixins import ResponseMixin
from .models import PetReport
from .serializer import PetReportSerializer
from core.permission import IsAdmin, IsSuperAdmin

# Create your views here.
class PetReportViewSet(viewsets.ModelViewSet):
    queryset = PetReport.objects.all()
    serializer_class = PetReportSerializer