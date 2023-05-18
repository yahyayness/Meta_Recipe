from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from protocols.__serializers.ProtocolSerializer import ProtocolSerializer
from protocols.models import Protocol


class ProtocolView(GenericViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ProtocolSerializer
    pagination_class = CustomPagination

    queryset = Protocol.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def update(self, request, protocol_id, *args, **kwargs):
        protocol = Protocol.objects.get(id=protocol_id)
        serializer = ProtocolSerializer(instance=protocol, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def list(self, request):
        queryset = Protocol.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = ProtocolSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ProtocolSerializer(instance)
        return Response({
            'status': 'success', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success',
            'payload': serializer.data,
        }, status=status.HTTP_200_OK)

    def destroy(self, request, protocol_id, *args, **kwargs):
        protocol = Protocol.objects.get(id=protocol_id)
        protocol.soft_delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Protocol deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
