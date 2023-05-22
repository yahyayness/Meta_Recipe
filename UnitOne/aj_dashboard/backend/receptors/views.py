from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from .serializers import ReceptorSerilizer
from .models import Receptor


class receptorView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ReceptorSerilizer
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            try:
                receptor = Receptor.objects.get(id=pk)
            except Receptor.DoesNotExist:
                return Response({
                    'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid Receptor',
                    'payload': {},
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = ReceptorSerilizer(receptor)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            queryset = Receptor.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = ReceptorSerilizer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

    def put(self, request, pk=None, *args, **kwargs):
        try:
            receptor = Receptor.objects.get(id=pk)
        except Receptor.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid Receptor',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = ReceptorSerilizer(instance=receptor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def delete(self, request, pk=None, *args, **kwargs):
        try:
            receptor = Receptor.objects.get(id=pk)
        except Receptor.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid Receptor',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)
        receptor.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Recipe deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
