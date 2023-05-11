from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)
    payload = {
        'status': 'error',
        'code': response.status_code,
        'message': exc.default_detail,
        'payload': response.data
    }

    return Response(payload, response.status_code)
