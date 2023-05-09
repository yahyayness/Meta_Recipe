from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from auths.Utilities.APIRefreshToken import CustomRefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = CustomRefreshToken


