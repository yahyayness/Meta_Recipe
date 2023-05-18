from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ingredients.serializers import IngredientsSerilizer
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
from meta_recipe.__serializers.MetaRecipeIngredientsSerializer import MetaRecipeIngredientsSerializer
from meta_recipe.models import MetaRecipe,MetaRecipeIngredients
from recipe.models import Recipe
from .serializers import ProjrctSerilizer
from ingredients.models import Ingredients
from .models import Projects

# Create your views here.
import json


def getOrCreateIngredientByName(iname):
    ingredientExist={}
    try:
        ingredientExist=Ingredients.objects.get(name=iname)
    except Ingredients.DoesNotExist:
        Ingserializer = IngredientsSerilizer(data = {'name':iname})
        if Ingserializer.is_valid():
            Ingserializer.save()
            ingredientExist=Ingserializer.data
    return ingredientExist

# Get POST FBV_List
@api_view(['GET','POST'])
def ProjectList(request):
    #GET
    if request.method=='GET':
        #queryset= IngredientNode.objects.all()
        #serializer_class=IngredientNodesSerilizer(queryset, many=True)

        return Response("GET")
        
    #POST
    elif request.method=='POST':
        #check if Ingredients not Exists Create a new
        #print(request.data)
        projectExist=Projects.objects.filter(name=request.data['name']).first()
        if not projectExist :
            serializer = ProjrctSerilizer(data=request.data)
            if serializer.is_valid():
                serializer.save()
        if "data" in request.FILES:
            for f in request.FILES.getlist('data'):
                data =  json.loads(f.read())
                ingredients_list=data["ingredients"]
                #print(ingredients_list)
                for ing in ingredients_list:
                    #quantity_values=ing['quantity'].split()
                    opj={"name":ing['name']}
                    #check if Ingredients not Exists Create a new
                    try:
                        ingredientExist=Ingredients.objects.get(name=ing['name'])
                    except Ingredients.DoesNotExist:
                        Ingserializer = IngredientsSerilizer(data = opj)
                        if Ingserializer.is_valid():
                            Ingserializer.save()
                
                #Save metaRecipe  Data     
                metaRecipe=data["meta_recipe"]
                #print(metaRecipe)
                metaRecipeExist={}
                try:
                    metaRecipeExist=MetaRecipe.objects.get(name=metaRecipe['name'])
                except MetaRecipe.DoesNotExist:
                    metaRecipeserializer = MetaRecipeSerializer(data={'name':metaRecipe['name']})
                    if metaRecipeserializer.is_valid():
                        metaRecipeserializer.save()
                        metaRecipeExist=metaRecipeserializer.data

                meta_recipe_ingredients_list=metaRecipe["meta_recipe_ingredients"]
                print(meta_recipe_ingredients_list)
                for mRIItem in meta_recipe_ingredients_list:
                    
                    #get Ingredients if not Exists Create a new
                    mRIngredient=getOrCreateIngredientByName(mRIItem['ingredient_name'])
                    mRDependentIngredient=getOrCreateIngredientByName(mRIItem['dependent_ingredient_name'])
                    mRI={
                        'meta_recipe':metaRecipeExist['id'],
                        'ingredient':mRIngredient.id,
                        'min':float(mRIItem['min']),
                        'max':float(mRIItem['mx']),
                        'dependent_ingredient':mRDependentIngredient['id'],
                        'unit':mRIItem['unit'],
                    }
                    #savemeta recipe ingredients 
                    mRISerializer = MetaRecipeIngredientsSerializer(data=mRI)
                    if mRISerializer.is_valid():
                        mRISerializer.save()

                #Save metaRecipe Recipes        
                meta_recipe_recipes_list=metaRecipe["recipes"]    
                for mRRecipe in meta_recipe_recipes_list:
                    try:
                        recipeExist=MetaRecipe.objects.get(name=metaRecipe['name'])
                    except MetaRecipe.DoesNotExist:
                        metaRecipeserializer = MetaRecipeSerializer(data={'name':metaRecipe['name']})
                        if metaRecipeserializer.is_valid():
                            metaRecipeserializer.save()
                            metaRecipeExist=metaRecipeserializer.data
                    pass
                    
                
        return Response("POST")