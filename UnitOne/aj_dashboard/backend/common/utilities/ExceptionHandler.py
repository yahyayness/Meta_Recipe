from django.http import Http404
from rest_framework import exceptions
from rest_framework.exceptions import PermissionDenied, ValidationError, ErrorDetail
from rest_framework.fields import get_error_detail
from rest_framework.response import Response
from rest_framework.serializers import as_serializer_error
from rest_framework.views import exception_handler

from common.utilities.Exception import ProjectValidationError


def custom_exception_handler(exc, context):
    if isinstance(exc, ProjectValidationError):
        message = exc.default_detail
        if type(exc.detail) is dict:
            if len(exc.detail) > 0:
                first_model_key = list(exc.detail.keys())[0]
                first_model_value = exc.detail[first_model_key]
                first_prop_key = list(first_model_value.keys())[0]
                message = first_model_value[first_prop_key][0]

        return Response({
            'status': 'error',
            'code': exc.status_code,
            'message': message,
            'payload': exc.detail
        }, exc.status_code)

    if isinstance(exc, ValidationError):

        exc = exceptions.ValidationError(as_serializer_error(exc))
        response = exception_handler(exc, context)
        detail = exc.default_detail
        if (response.data is not None) & (type(response.data) is dict):
            if len(response.data) > 0:
                first = list(response.data.keys())[0]
                __detail = response.data[str(first)]
                if len(__detail) > 0:
                    detail = str(__detail[0])

        return Response({
            'status': 'error',
            'code': response.status_code,
            'message': detail,
            'payload': response.data
        }, response.status_code)

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
        }, 500)

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
