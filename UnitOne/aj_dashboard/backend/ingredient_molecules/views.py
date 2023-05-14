from django.shortcuts import render

# Create your views here.

from .serializers import IngredientMoleculesCreateSerilizer,IngredientMoleculesSerilizer
from django.http import Http404
from rest_framework import generics, mixins, viewsets
from .models import IngredientMolecules
# Create your views here.
#5.1 mixins list

class ingredientMolecules_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = IngredientMolecules.objects.all()
    serializer_class = None 

    def get(self, request):
        self.serializer_class = IngredientMoleculesSerilizer
        return self.list(request)
    def post(self, request):
        self.serializer_class = IngredientMoleculesCreateSerilizer
        return self.create(request)

#5.2 mixins get patch delete 
class ingredientMolecules_pk(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = IngredientMolecules.objects.all()
    serializer_class = IngredientMoleculesSerilizer
    def get(self, request, pk):
        return self.retrieve(request)
    def patch(self, request, pk):
        self.serializer_class = IngredientMoleculesCreateSerilizer
        return self.update(request)
    def delete(self, request, pk):
        return self.destroy(request)
    