from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from common.utilities.Pagination import CustomPagination
from recipe.__serializers.RecipeSerializer import RecipeSerializer
from recipe.models import Recipe


class RecipeView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = RecipeSerializer
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid()
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                    status=status.HTTP_200_OK)
            else:
                return Response({'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'error',
                                 'payload': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            raise ValidationError(
                {'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': str(e), 'payload': {}})

    def get(self, request, recipe_id=None, *args, **kwargs):
        if recipe_id:
            try:
                recipe = Recipe.objects.get(id=recipe_id)
            except Recipe.DoesNotExist:
                return Response({
                    'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid recipe',
                    'payload': {},
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = RecipeSerializer(recipe)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        else:
            queryset = Recipe.objects.all()
            paginator = self.pagination_class()
            result_page = paginator.paginate_queryset(queryset, request)
            serializer = RecipeSerializer(result_page, many=True)

            return paginator.get_paginated_response(serializer.data)

    def put(self, request, recipe_id=None, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid recipe',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecipeSerializer(instance=recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_200_OK)
        return Response(
            {'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'error', 'payload': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, recipe_id=None, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({
                'status': 'error', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'Invalid recipe',
                'payload': {},
            }, status=status.HTTP_400_BAD_REQUEST)
        recipe.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'Recipe deleted!', 'payload': {}},
            status=status.HTTP_200_OK
        )
