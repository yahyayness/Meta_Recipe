from django.core.exceptions import PermissionDenied, ValidationError
from django.http import Http404
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.serializers import as_serializer_error
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    if isinstance(exc, ValidationError):
        exc = exceptions.ValidationError(as_serializer_error(exc))

    if isinstance(exc, Http404):
        exc = exceptions.NotFound()

    if isinstance(exc, PermissionDenied):
        exc = exceptions.PermissionDenied()

    response = exception_handler(exc, context)

    # If unexpected error occurs (server error, etc.)
    if isinstance(exc, TypeError) | (response is None):
        return Response({
            'status': 'error',
            'code': 500,
            'message': str(exc),
            'payload': {}
        })

    detail = exc.default_detail

    if exc.detail is not None:
        if "detail" in exc.detail:
            detail = exc.detail['detail']

    payload = {
        'status': 'error',
        'code': response.status_code,
        'message': detail,
        'payload': response.data
    }

    return Response(payload, response.status_code)
