from rest_framework import serializers
from .models import SampleDescriptions
from recipe.__serializers.RecipeSerializer import RecipeSerializer
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
class SampleDescriptionsCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = SampleDescriptions
        fields = ('__all__') 


class SampleDescriptionsSerializers(serializers.ModelSerializer):
    recipe=RecipeSerializer(read_only=True)
    metaRecipe=MetaRecipeSerializer(read_only=True)
    class Meta:
        model = SampleDescriptions
        fields = ['id','name','recipe','metaRecipe'] 
 