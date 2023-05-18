from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
from meta_recipe.__serializers.MetaRecipeIngredientsSerializer import MetaRecipeIngredientsSerializer
from meta_recipe.models import MetaRecipe,MetaRecipeIngredients


class MetaRecipeIngredientsView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = MetaRecipeIngredientsSerializer
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def get(self, request, meta_recipe_id=None, *args, **kwargs):
        if meta_recipe_id:
            try:
                meta_recipe = MetaRecipeIngredients.objects.get(id=meta_recipe_id)
            except MetaRecipeIngredients.DoesNotExist:
                return Response({
                    'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid meta recipe',
                    'payload': {},
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = MetaRecipeIngredientsSerializer(meta_recipe)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            queryset = MetaRecipeIngredients.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = MetaRecipeIngredientsSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

    def patch(self, request, meta_recipe_id=None, *args, **kwargs):
        try:
            meta_recipe = MetaRecipeIngredients.objects.get(id=meta_recipe_id)
        except MetaRecipeIngredients.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid meta recipe',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = MetaRecipeIngredientsSerializer(instance=meta_recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def delete(self, request, meta_recipe_id=None, *args, **kwargs):
        try:
            meta_recipe = MetaRecipeIngredients.objects.get(id=meta_recipe_id)
        except MetaRecipeIngredients.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid meta recipe',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)
        meta_recipe.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Meta Recipe deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
