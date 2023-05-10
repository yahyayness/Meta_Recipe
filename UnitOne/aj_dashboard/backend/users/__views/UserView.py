from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication

from users.__serializers.UserSerializer import UserSerializer
from users.models import User


class UserView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid()
            if serializer.is_valid():
                serializer.save()
                return Response({"payload": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"payload": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            raise ValidationError({"payload": str(e)})

    def get(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                "payload": "Invalid user",
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user)
        return Response({"payload": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                "payload": "Invalid user",
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"payload": serializer.data}, status=status.HTTP_200_OK)
        return Response({"payload": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.filter(id=user_id)
        except User.DoesNotExist:
            return Response({
                "payload": "Invalid user",
            }, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response(
            {"payload": "User deleted!"},
            status=status.HTTP_200_OK
        )
