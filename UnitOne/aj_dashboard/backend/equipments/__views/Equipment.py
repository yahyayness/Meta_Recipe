from django.db.migrations import serializer
from rest_framework import generics, viewsets, mixins, status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSetMixin, GenericViewSet, ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from equipments.__serializers.Equipment import EquipmentSerializer
from equipments.models import Equipment


class EquipmentView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = EquipmentSerializer
    pagination_class = CustomPagination
    queryset = Equipment.objects.all()

    def post(self, request, *args, **kwargs):
        equipment = self.create(request, *args, **kwargs)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': equipment.data},
            status=status.HTTP_200_OK)

    def get(self, request, pk=None, *args, **kwargs):
        equipment = None
        if pk:
            equipment = self.retrieve(request, *args, **kwargs)
        else:
            equipment = self.list(request, *args, **kwargs)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': equipment.data},
            status=status.HTTP_200_OK)

    def put(self, request, pk=None, *args, **kwargs):
        equipment = Equipment.objects.get(id=pk)

        serializer = EquipmentSerializer(instance=equipment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def delete(self, request, pk=None, *args, **kwargs):
        self.destroy(self, request, *args, **kwargs)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Equipment deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
