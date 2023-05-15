from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from protocols.__serializers.ProtocolSerializer import ProtocolSerializer
from protocols.models import Protocol


class ProtocolView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ProtocolSerializer
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def put (self, request, protocol_id, *args, **kwargs):
        protocol = Protocol.objects.get(id=protocol_id)
        serializer = ProtocolSerializer(instance=protocol, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def get(self, request, protocol_id=None, *args, **kwargs):
        if protocol_id:
            protocol = Protocol.objects.get(id=protocol_id)
            serializer = ProtocolSerializer(protocol)
            return Response({
                'status': 'success', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success',
                'payload': serializer.data,
            }, status=status.HTTP_200_OK)

        else:
            queryset = Protocol.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = ProtocolSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

    def delete(self, request, protocol_id, *args, **kwargs):
        protocol = Protocol.objects.get(id=protocol_id)
        protocol.soft_delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Protocol deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
