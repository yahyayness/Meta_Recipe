from django.shortcuts import render
 
from .serializers import ProcessSerilizer,ProcessCreateSerilizer
from django.http import Http404
from rest_framework import generics, mixins, viewsets
from .models import Process
# Create your views here.
#5.1 mixins list
class Process_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = Process.objects.all()
    serializer_class = None 

    def get(self, request):
        self.serializer_class = ProcessSerilizer
        return self.list(request)
    def post(self, request):
        self.serializer_class = ProcessCreateSerilizer
        return self.create(request)

#5.2 mixins get patch delete 
class Process_pk(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerilizer
    def get(self, request, pk):
        return self.retrieve(request)
    def patch(self, request, pk):
        self.serializer_class = ProcessCreateSerilizer
        return self.update(request)
    def delete(self, request, pk):
        return self.destroy(request)
