from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from common.utilities.Pagination import CustomPagination
from setup.__serializers.Setup import SetupSerializer
from setup.models import Setup


class SetupView(GenericViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SetupSerializer
    pagination_class = CustomPagination
    ordering = '-updated_at'

    queryset = Setup.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def update(self, request, pk, *args, **kwargs):
        setup = Setup.objects.get(id=pk)
        serializer = SetupSerializer(instance=setup, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
            status=status.HTTP_200_OK)

    def list(self, request):
        queryset = Setup.objects.all().order_by('-updated_at')
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = SetupSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SetupSerializer(instance)
        return Response({
            'status': 'success', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success',
            'payload': serializer.data,
        }, status=status.HTTP_200_OK)

    def destroy(self, request, pk, *args, **kwargs):
        setup = Setup.objects.get(id=pk)
        setup.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Setup deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )