from django.shortcuts import render
from rest_framework import permissions, status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ingredients.serializers import IngredientsSerilizer
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
from meta_recipe.__serializers.MetaRecipeIngredientsSerializer import MetaRecipeIngredientsSerializer
from meta_recipe.models import MetaRecipe,MetaRecipeIngredients
from recipe.models import Recipe,RecipeIngredients
from recipe.__serializers.RecipeSerializer import RecipeSerializer
from recipe.__serializers.RecipeIngredientsSerializer import RecipeIngredientsSerializer
from .serializers import ProjrctSerilizer
from ingredients.models import Ingredients
from equipments.models import Equipment
from equipments.__serializers.Equipment import EquipmentSerializer
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
            ingredientExist=Ingserializer.instance
    return ingredientExist

# Get POST FBV_List
@api_view(['GET','POST'])
def ProjectList(request):
    #GET
    if request.method=='GET':
        queryset= Projects.objects.all()
        serializer_class=ProjrctSerilizer(queryset, many=True)

        return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer_class.data},
                status=status.HTTP_200_OK)
        
    #POST
    elif request.method=='POST':
        #check if Ingredients not Exists Create a new
        #print(request.data)
        projectExist=Projects.objects.filter(name=request.data['name']).first()
        if not projectExist :
            pSerializer = ProjrctSerilizer(data=request.data)
            if pSerializer.is_valid():
                pSerializer.save()
                projectExist=pSerializer.instance

        ## import ingredients data from ingredients files
        if "ingredients" in request.FILES:
            for iF in request.FILES.getlist('ingredients'):
                iData =  json.loads(iF.read())
                ingredients_list=iData["ingredients"]
                #print(ingredients_list)
                for ing in ingredients_list:
                    opj={"name":ing['name']}
                    #check if Ingredients not Exists Create a new
                    try:
                        ingredientExist=Ingredients.objects.get(name=ing['name'])
                    except Ingredients.DoesNotExist:
                        Ingserializer = IngredientsSerilizer(data = opj)
                        if Ingserializer.is_valid():
                            Ingserializer.save()
                            ingredientExist=Ingserializer.instance

         ## import equipments data from equipments files                   
        if "equipments" in request.FILES:
            for eF in request.FILES.getlist('equipments'):
                eData =  json.loads(eF.read())
                equipments_list=eData["equipment"]
              
                for equ in equipments_list:
                    opj={'name':equ['name'], 'type':equ['equipment_type'],'brand':equ['brand'],'model':equ['model']}
                    #check if Ingredients not Exists Create a new
                    try:
                        equipmentExist=Equipment.objects.get(name=equ['name'])
                    except Equipment.DoesNotExist:
                        equSerializer = EquipmentSerializer(data = opj)
                        if equSerializer.is_valid():
                            equSerializer.save()
                            equipmentExist=equSerializer.instance


        ## import Projcet data from files
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
 
                metaRecipeExist={}
                try:
                    metaRecipeExist=MetaRecipe.objects.get(name=metaRecipe['name'])
                except MetaRecipe.DoesNotExist:
                    metaRecipeserializer = MetaRecipeSerializer(data={'name':metaRecipe['name'],'project':projectExist.id})
                    if metaRecipeserializer.is_valid():
                        metaRecipeserializer.save()
                        metaRecipeExist=metaRecipeserializer.instance
                   
                meta_recipe_ingredients_list=metaRecipe["meta_recipe_ingredients"]
                #print(meta_recipe_ingredients_list)
                for mRIItem in meta_recipe_ingredients_list:
                    
                    #get Ingredients if not Exists Create a new
                    mRIngredient=getOrCreateIngredientByName(mRIItem['ingredient_name'])
                    mRDependentIngredient=getOrCreateIngredientByName(mRIItem['dependent_ingredient_name'])

                    mRI={
                        'meta_recipe':metaRecipeExist.id,
                        'ingredient':mRIngredient.id,
                        'min':float(mRIItem['min']),
                        'max':float(mRIItem['mx']),
                        'dependent_ingredient':mRDependentIngredient.id,
                        'unit':mRIItem['unit'],
                    }
                    
                    #savemeta recipe ingredients 
                    mRISerializer = MetaRecipeIngredientsSerializer(data=mRI)
                    if mRISerializer.is_valid():
                        mRISerializer.save()

                #Save metaRecipe Recipes      
                print(metaRecipe)
                recipes_list=metaRecipe["recipes"]   
                print("22")  
                for rcipeItem in recipes_list:
                    print(rcipeItem)
                    recipeExist={}
                    try:
                        recipeExist=Recipe.objects.get(name=rcipeItem['name'])
                    except Recipe.DoesNotExist:
                        recipeopject={
                            'name':rcipeItem['name'],
                            'meta_recipe':metaRecipeExist.id,
                            'protocol':1,
                        }
                        recipeserializer = RecipeSerializer(data=recipeopject)
                        print(recipeserializer.is_valid())
                        if recipeserializer.is_valid():
                            recipeserializer.save()
                            recipeExist=recipeserializer.instance
                    
                    recipe_ingredients=rcipeItem["recipe_ingredients"]   
                    for rIng in recipe_ingredients:
                        print(rIng)
                        rIngredient=getOrCreateIngredientByName(rIng['ingredient_name'])

                        rI={
                            'recipe':recipeExist.id,
                            'ingredient':rIngredient.id,
                            'unit':rIng['unit'],
                            'amount':rIng['amount'],
                        }
                        
                        #savemeta recipe ingredients 
                        rISerializer = RecipeIngredientsSerializer(data=rI)
                        if rISerializer.is_valid():
                            rISerializer.save()
                     
                    
                
        return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
                status=status.HTTP_200_OK)
    

#GET PUT PATCH 
@api_view(['GET', 'DELETE','PATCH'])
def ProjectItem(request,pk):
    #GET
    
    try:
        project=Projects.objects.get(pk=pk)
    except :
        return Response(status=status.HTTP_404_NOT_FOUND )

    #GET
    if request.method=='GET':
        serializer_class=ProjrctSerilizer(project)
        return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer_class.data},
                status=status.HTTP_200_OK)
    
    #PUT
    elif request.method=='PATCH':
         serializer_class=ProjrctSerilizer(project,data=request.data)
         if serializer_class.is_valid():
                serializer_class.save()
                return Response(
                {'status': 'success', 'code': status.HTTP_201_CREATED, 'message': 'success', 'payload': serializer_class.data},
                status=status.HTTP_201_CREATED)
                 
         return Response(
                {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success', 'payload': serializer_class.errors},
                status=status.HTTP_400_BAD_REQUEST)
   
    #DELETE
    elif request.method=='DELETE':
        project.delete()
        return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
                status=status.HTTP_204_NO_CONTENT)
    
    else:
        return Response(
                {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success', 'payload': {}},
                status=status.HTTP_204_NO_CONTENT)
         