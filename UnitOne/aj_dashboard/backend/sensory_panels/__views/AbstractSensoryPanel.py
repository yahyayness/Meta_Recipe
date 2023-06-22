from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from sensory_panels.__serializers.AbstrctSensoryPanel import AbstractSensoryPanelSerializer
from sensory_panels.models import AbstractSensoryPanel


class AbstractSensoryPanelView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = AbstractSensoryPanelSerializer
    pagination_class = CustomPagination

    def get(self, request, abstract_sensory_panel_id=None, *args, **kwargs):
        if abstract_sensory_panel_id:
            try:
                sensory_panel = AbstractSensoryPanel.objects.get(id=abstract_sensory_panel_id)
            except AbstractSensoryPanel.DoesNotExist:
                return Response({
                    'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid sensory panel',
                    'payload': {},
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = AbstractSensoryPanelSerializer(sensory_panel)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            queryset = AbstractSensoryPanel.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = AbstractSensoryPanelSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)
