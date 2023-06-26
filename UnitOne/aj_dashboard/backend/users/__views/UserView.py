from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication

from common.utilities.Pagination import CustomPagination
from users.__serializers.UserSerializer import UserSerializer
from users.models import User


class UserView(GenericViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    ordering = '-updated_at'

    queryset = User.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UserSerializer(instance)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def list(self, request):
        queryset = User.objects.all().order_by('-updated_at')
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = UserSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def update(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid user',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def destroy(self, request, pk, *args, **kwargs):
        user = User.objects.get(id=pk)
        user.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'User deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['POST'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        self.queryset.filter(id__in=ids).delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Users deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
