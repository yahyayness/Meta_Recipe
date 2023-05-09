from django.conf import settings
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken, BlacklistMixin, Token
from rest_framework_simplejwt.utils import datetime_from_epoch
from django.utils import timezone
from auths.models import CustomOutstandingToken, CustomBlacklistedToken


class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        """
        Adds this token to the outstanding token list.
        """
        token = cls.get_token(user)

        jti = token[api_settings.JTI_CLAIM]

        CustomOutstandingToken.objects.create(
            user=user,
            jti=jti,
            token=str(token),
            created_at=timezone.now(),
            expires_at=timezone.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        )

        return token

    @classmethod
    def get_token(cls, user):
        """
        Returns an authorization token for the given user that will be provided
        after authenticating the user's credentials.
        """
        user_id = getattr(user, api_settings.USER_ID_FIELD)
        if not isinstance(user_id, int):
            user_id = str(user_id)

        token = cls()
        token[api_settings.USER_ID_CLAIM] = user_id

        return token

    def blacklist(self):
        """
        Ensures this token is included in the outstanding token list and
        adds it to the blacklist.
        """
        jti = self.payload[api_settings.JTI_CLAIM]
        exp = self.payload["exp"]

        # Ensure outstanding token exists with given jti
        token, _ = CustomOutstandingToken.objects.get_or_create(
            jti=jti,
            defaults={
                "token": str(self),
                "expires_at": datetime_from_epoch(exp),
            },
        )

        return CustomBlacklistedToken.objects.get_or_create(token=token)

