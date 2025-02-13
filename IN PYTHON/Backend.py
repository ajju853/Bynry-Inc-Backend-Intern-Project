from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from rest_framework import serializers, viewsets, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
import os

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True, error_messages={
        'unique': _("A user with that email already exists."),
    })
    phone = models.CharField(_('phone number'), max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(_('verified'), default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
        ]

    def clean(self):
        super().clean()
        if self.phone and not self.phone.isdigit():
            raise ValidationError({'phone': _('Phone number must contain only digits.')})

class ServiceRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', _('Pending')
        IN_PROGRESS = 'in_progress', _('In Progress')
        RESOLVED = 'resolved', _('Resolved')
        CANCELLED = 'cancelled', _('Cancelled')

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='service_requests'
    )
    request_type = models.CharField(_('request type'), max_length=255)
    description = models.TextField(_('description'))
    status = models.CharField(
        _('status'),
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
        constraints = [
            models.CheckConstraint(
                check=Q(status__in=Status.values),
                name='valid_status_check'
            )
        ]

    def __str__(self):
        return f"{self.request_type} - {self.status}"

def validate_file_size(value):
    limit = 5 * 1024 * 1024  # 5MB
    if value.size > limit:
        raise ValidationError('File size must not exceed 5MB.')

class Attachment(models.Model):
    service_request = models.ForeignKey(
        ServiceRequest,
        on_delete=models.CASCADE,
        related_name='attachments'
    )
    file = models.FileField(
        _('file'),
        upload_to='attachments/%Y/%m/%d/',
        validators=[validate_file_size]
    )
    uploaded_at = models.DateTimeField(_('uploaded at'), auto_now_add=True)

    def filename(self):
        return os.path.basename(self.file.name)

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'file', 'uploaded_at', 'filename')
        read_only_fields = ('uploaded_at', 'filename')

    filename = serializers.SerializerMethodField()

    def get_filename(self, obj):
        return obj.filename()

class ServiceRequestSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    status = serializers.ChoiceField(
        choices=ServiceRequest.Status.choices,
        default=ServiceRequest.Status.PENDING
    )

    class Meta:
        model = ServiceRequest
        fields = [
            'id', 'user', 'request_type', 'description', 'status',
            'created_at', 'updated_at', 'attachments'
        ]
        read_only_fields = ('created_at', 'updated_at', 'user')

    def validate_request_type(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("Request type must be at least 5 characters long.")
        return value

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class ServiceRequestViewSet(viewsets.ModelViewSet):
    queryset = ServiceRequest.objects.all().select_related('user').prefetch_related('attachments')
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    pagination_class = StandardResultsSetPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['request_type', 'description']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def upload_attachment(self, request, pk=None):
        service_request = self.get_object()
        file_serializer = AttachmentSerializer(data=request.FILES)
        if file_serializer.is_valid():
            Attachment.objects.create(
                service_request=service_request,
                file=file_serializer.validated_data['file']
            )
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def mark_in_progress(self, request, pk=None):
        return self._update_status(request, pk, ServiceRequest.Status.IN_PROGRESS)

    @action(detail=True, methods=['patch'])
    def resolve(self, request, pk=None):
        return self._update_status(request, pk, ServiceRequest.Status.RESOLVED)

    @action(detail=True, methods=['patch'])
    def cancel(self, request, pk=None):
        return self._update_status(request, pk, ServiceRequest.Status.CANCELLED)

    def _update_status(self, request, pk, new_status):
        service_request = get_object_or_404(ServiceRequest, pk=pk, user=request.user)
        service_request.status = new_status
        service_request.save()
        return Response({'status': service_request.status})

router = DefaultRouter()
router.register(r'service-requests', ServiceRequestViewSet)

urlpatterns = [
    path('api/v1/', include([
        path('', include(router.urls)),
        path('auth/', include('rest_framework_simplejwt.urls')),
    ])),
]