from rest_framework import status, serializers ,viewsets

from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import SearchFilter

from .serializers import *
from .models import *
from rest_framework.response import Response


class AromasPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100


class AromaList(ListAPIView):
    queryset = Aroma.objects.all()
    serializer_class = AromaSerializer
    # filter_backends = (DjangoFilterBackend, SearchFilter)
    # filter_fields = ('entity_id', 'entity_alias_readable',)
    search_fields = ('entity_id', 'entity_alias_readable',)
    pagination_class = AromasPagination


#  override create's example
# class RecipeCreate(CreateAPIView):
#     serializer_class = RecipeSerializer
#
#     def create(self, request, *args, **kwargs):
#
#         data = request.data
#         if isinstance(data, list):
#             serializer = self.get_serializer(data=request.data, many=True)
#         else:
#             serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#         # try:
#         #     name = request.data.get('name')
#         #     if name is None:
#         #         raise ValidationError({"name: A required field "})
#         # except ValueError:
#         #     raise ValidationError({"name: A required field "})
#
#
class RecipeNameView(ListAPIView):
    queryset = MetaRecipe.objects.all().values('id', 'name')
    serializer_class = RecipeNamesSerializer

