from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'page'

    def get_paginated_response(self, data, message='success'):
        return Response({
            'status': 'success',
            'code': 200,
            'message': message,
            'payload': {
                'count': self.page.paginator.count,
                'num_pages': self.page.paginator.num_pages,
                'links': {
                    'next': self.get_next_link(),
                    'previous': self.get_previous_link()
                },
                'results': data
            }
        })
