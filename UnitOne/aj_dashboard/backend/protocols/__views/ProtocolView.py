import json
import random
import string
from functools import reduce
from operator import or_

from django.core import serializers
from django.db import transaction
from django.db.models import Q
from django.forms import model_to_dict
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
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
    ordering = '-updated_at'

    queryset = Protocol.objects.all()

    def create(self, request):
        data = request.data
        if 'name' not in data:
            data['name'] = 'Protocol-0'
            if Protocol.objects.filter().count():
                last_id = Protocol.objects.latest('id')
                if last_id:
                    data['name'] = f"Protocol-{last_id.id + 1}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        flow = {}
        if 'flow' in request.data:
            flow = request.data['flow']
        else:
            flow = request.data
        result = self.create_flow(flow=flow, protocol_id=obj.id)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': result},
            status=status.HTTP_200_OK)

    def update(self, request, pk, *args, **kwargs):
        protocol = Protocol.objects.get(id=pk)
        serializer = ProtocolSerializer(instance=protocol, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        obj.protocol_processes.all().delete()
        obj.protocol_nodes.all().delete()
        obj.protocol_ingredient.all().delete()
        result = self.create_flow(flow=request.data['flow'], protocol_id=obj.id)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': result},
            status=status.HTTP_200_OK)

    def list(self, request):
        queryset = Protocol.objects.all().order_by('-updated_at')
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

    def destroy(self, request, pk, *args, **kwargs):
        protocol = Protocol.objects.get(id=pk)
        protocol.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Protocol deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['POST'])
    @transaction.atomic
    def create_flow(self, flow, protocol_id=None, *args, **kwargs):
        try:
            with transaction.atomic():
                protocol = Protocol.objects.get(id=protocol_id)
                protocol.flow = flow
                protocol.save()
                protocol.refresh_from_db()
                nodes = {}
                if 'nodes' in flow:
                    for node in flow['nodes']:
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

                if 'edges' in flow:
                    for edge in flow['edges']:
                        source_id = nodes[edge['sourceHandle'].replace('-source', '')]
                        target_id = nodes[edge['targetHandle'].replace('-target', '')]
                        ProtocolEdge.objects.create(source_node_id=source_id, target_node_id=target_id)
                return ProtocolSerializer(protocol).data
        except Exception as e:
            raise e

    @action(detail=False, methods=['POST'], name='clone')
    def clone(self, request, *args, **kwargs):
        ids = request.data['ids']
        result = Protocol.objects.filter(
            reduce(or_, [Q(id=n) for n in ids])
        ).count() == len(ids)
        if not result:
            raise ValidationError("At least one ID is not in DB")

        count = Protocol.objects.filter().count()

        for id in ids:
            protocol = Protocol.objects.get(id=id)
            clone_protocol = Protocol.objects.create(name=f"{protocol.name}_clone_{++count}")
            self.create_flow(flow=protocol.flow, protocol_id=clone_protocol.id)

        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
            status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    @transaction.atomic
    def adjustments(self, request, pk=None, *args, **kwargs):
        try:
            with transaction.atomic():
                params = ['sugar', 'salt', 'spicy', 'water']
                protocol = Protocol.objects.get(id=pk)
                flow = protocol.flow
                if 'nodes' in flow:
                    for node in flow['nodes']:
                        if node['type'] == 'ingredient-container':
                            for child in node['data']['children']:
                                if any(substring in child['data']['value']['name'].lower() for substring in
                                       (param.lower() for param in params)):
                                    for param in params[:-1]:
                                        child['data']['value']['amount'] = int(child['data']['value']['amount']) + \
                                                                           request.data[
                                                                               param]
                                    ProtocolIngredient.objects.filter(
                                        ingredient__name__iexact=child['data']['value']['name']).update(
                                        quantity=child['data']['value']['amount'])
                    protocol.flow = flow
                    if (request.data['sugar'] != 0) | (request.data['salt'] != 0) | (request.data['spicy'] != 0):
                        protocol.extra = {'sugar': request.data['sugar'], 'salt': request.data['salt'],
                                          'spicy': request.data['spicy']}
                    protocol.save()
                # ingredient_container = filter(lambda ic: ic['type'] == 'ingredient-container', protocol.flow['nodes'])
                # print(list(ingredient_container))
                return Response(
                    {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success',
                     'payload': model_to_dict(protocol)},
                    status=status.HTTP_200_OK)
        except Exception as e:
            raise e
