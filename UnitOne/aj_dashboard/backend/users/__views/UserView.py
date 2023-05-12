from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication

from common.utilities.Pagination import CustomPagination
from users.__serializers.UserSerializer import UserSerializer
from users.models import User


class UserView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                    status=status.HTTP_200_OK)
            else:
                return Response({'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'error',
                                 'payload': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': str(e), 'payload': {}}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, user_id=None, *args, **kwargs):
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({
                    'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid user',
                    'payload': {},
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = UserSerializer(user)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            queryset = User.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = UserSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

    def put(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
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
        return Response(
            {'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'error', 'payload': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid user',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'User deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
