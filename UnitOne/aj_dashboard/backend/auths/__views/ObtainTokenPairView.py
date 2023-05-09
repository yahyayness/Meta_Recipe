from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from auths.__serializers.TokenSerializer import MyTokenObtainPairSerializer


class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
