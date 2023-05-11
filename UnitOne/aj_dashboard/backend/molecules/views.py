from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status,filters
from .serializers import MoleculeNodesSerilizer,MoleculeNodesCreateSerilizer,MoleculesSerilizer
from django.http import Http404
from rest_framework import generics, mixins, viewsets
from .models import Molecules, MoleculesNode
#5 Mixins 
#5.1 mixins list
class molecules_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = Molecules.objects.all()
    serializer_class = MoleculesSerilizer

    def get(self, request):
        return self.list(request)
    def post(self, request):
        return self.create(request)

#5.2 mixins get put delete 
class molecules_pk(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Molecules.objects.all()
    serializer_class = MoleculesSerilizer 
    def get(self, request, pk):
        return self.retrieve(request)
    def patch(self, request, pk):
        return self.update(request)
    def delete(self, request, pk):
        return self.destroy(request)


#5.1 mixins list
class moleculeNode_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = MoleculesNode.objects.all()
    serializer_class = None 

    def get(self, request):
        self.serializer_class = MoleculeNodesSerilizer
        return self.list(request)
    def post(self, request):
        self.serializer_class = MoleculeNodesCreateSerilizer
        return self.create(request)

#5.2 mixins get patch delete 
class moleculeNode_pk(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = MoleculesNode.objects.all()
    serializer_class = MoleculeNodesSerilizer
    def get(self, request, pk):
        return self.retrieve(request)
    def patch(self, request, pk):
        self.serializer_class = MoleculeNodesCreateSerilizer
        return self.update(request)
    def delete(self, request, pk):
        return self.destroy(request)
