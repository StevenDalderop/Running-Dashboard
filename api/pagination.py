from rest_framework.pagination import PageNumberPagination

class UnpaginatedTable(PageNumberPagination):
    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get('get_all', False) == 'true':
            return None
        return super().paginate_queryset(queryset, request, view=view)

class SmallPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3