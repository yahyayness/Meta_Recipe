import json
import random
import string

from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Helper import generate_random_string
from common.utilities.Pagination import CustomPagination
from ingredients.models import Ingredients
from ingredients.serializers import IngredientsSerilizer
from meta_recipe.models import MetaRecipe
from process.models import Process
from protocols.__serializers.ProtocolSerializer import ProtocolSerializer
from protocols.models import Protocol, ProtocolNode, ProtocolEdge, ProtocolIngredient, ProtocolProcess
from recipe.models import Recipe, RecipeIngredients


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

    @action(detail=False, methods=['POST'])
    # @transaction.atomic
    def test(self, request, *args, **kwargs):
        sid = transaction.savepoint()
        try:
            flag = True
            protocol = Protocol.objects.create(name=''.join(generate_random_string(5)),
                                               flow=request.data)
            nodes = {}
            if flag:
                if 'nodes' in request.data:
                    for node in request.data['nodes']:
                        if node['type'] == 'ingredient-container':
                            for child in node['data']['children']:
                                ing_name = child['data']['value']['name']
                                ing_amount = child['data']['value']['amount']
                                ing_unit = 'g'
                                obj, created = Ingredients.objects.get_or_create(
                                    name=ing_name
                                )
                                protocol_ingredient = ProtocolIngredient.objects.create(protocol=protocol,
                                                                                        ingredient=obj,
                                                                                        unit=ing_unit,
                                                                                        quantity=ing_amount)
                                protocol_node = ProtocolNode.objects.create(protocol=protocol,
                                                                            model_type='ProtocolIngredient',
                                                                            model_id=protocol_ingredient.id,
                                                                            container=node['id'],
                                                                            slug=child['id'],
                                                                            type='ingredient',
                                                                            payload=child['data'])
                                nodes[child['id']] = protocol_node.id
                        elif node['type'] == 'process':
                            for child in node['data']['children']:
                                process = Process.objects.get(name__iexact=node['data']['label'])
                                protocol_process = ProtocolProcess.objects.create(protocol=protocol,
                                                                                  process=process,
                                                                                  arguments=child['data'],
                                                                                  value=child['data']['value']
                                                                                  )
                                protocol_node = ProtocolNode.objects.create(protocol=protocol,
                                                                            model_type='ProtocolProcess',
                                                                            model_id=protocol_process.id,
                                                                            container=node['id'],
                                                                            slug=child['id'],
                                                                            type='process',
                                                                            payload=child['data'])
                                nodes[child['id']] = protocol_node.id
                        elif node['type'] in ['merge', 'serve']:
                            protocol_node = ProtocolNode.objects.create(protocol=protocol,
                                                                        container=node['id'],
                                                                        slug=node['id'],
                                                                        type=node['type'])
                            nodes[node['id']] = protocol_node.id

                if 'edges' in request.data:
                    for edge in request.data['edges']:
                        source_id = nodes[edge['sourceHandle'].replace('-source', '')]
                        target_id = nodes[edge['targetHandle'].replace('-target', '')]
                        ProtocolEdge.objects.create(source_node_id=source_id, target_node_id=target_id)

            transaction.savepoint_commit(sid)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Protocol Created!',
                 'payload': ProtocolSerializer(protocol).data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            transaction.savepoint_rollback(sid)
            raise Exception(str(e))
