from functools import reduce
from operator import or_

from django.db import transaction
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import permissions, status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from ingredients.serializers import IngredientsSerilizer
from meta_recipe.__serializers.MetaRecipeSerializer import MetaRecipeSerializer
from meta_recipe.__serializers.MetaRecipeIngredientsSerializer import MetaRecipeIngredientsSerializer
from meta_recipe.models import MetaRecipe, MetaRecipeIngredients
from recipe.models import Recipe, RecipeIngredients
from recipe.__serializers.RecipeSerializer import RecipeSerializer
from recipe.__serializers.RecipeIngredientsSerializer import RecipeIngredientsSerializer
from .serializers import ProjrctSerilizer
from ingredients.models import Ingredients
from equipments.models import Equipment
from equipments.__serializers.Equipment import EquipmentSerializer
from sensory_panels.models import SensoryPanel
from sensory_panels.serializers import SensoryPanelsCreateSerializers, SensoryPanelsSerializers
from .models import Projects
from sensors.models import Sensors
from sensors.serializers import SensorsCreateSerializers, SensorsSerializers
from analytical_chemistry.models import AnalyticalChemistry
from analytical_chemistry.serializers import AnalyticalChemistryCreateSerializers, AnalyticalChemistrySerializers
from common.utilities.Pagination import CustomPagination

# Create your views here.
import json


def getOrCreateIngredientByName(iname):
    ingredientExist = {}
    try:
        ingredientExist = Ingredients.objects.get(name=iname)
    except Ingredients.DoesNotExist:
        Ingserializer = IngredientsSerilizer(data={'name': iname})
        if Ingserializer.is_valid():
            Ingserializer.save()
            ingredientExist = Ingserializer.instance
    return ingredientExist


# Get POST FBV_List
@api_view(['GET', 'POST'])
def ProjectList(request):
    # GET
    if request.method == 'GET':
        pagination_class = CustomPagination
        queryset = Projects.objects.all().order_by('-updated_at')
        paginator = pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer_class = ProjrctSerilizer(result_page, many=True)
        return paginator.get_paginated_response(serializer_class.data)

    # POST
    elif request.method == 'POST':
        # check if Ingredients not Exists Create a new
        # print(request.data)
        projectExist = Projects.objects.filter(name=request.data['name']).first()
        if not projectExist:
            pSerializer = ProjrctSerilizer(data=request.data)
            if pSerializer.is_valid():
                pSerializer.save()
                projectExist = pSerializer.instance

        import_data(request=request, project_id=projectExist.id)

        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
            status=status.HTTP_200_OK)


def import_data(request, project_id):
    ## import ingredients data from ingredients files
    if "ingredients" in request.FILES:
        for iF in request.FILES.getlist('ingredients'):
            iData = json.loads(iF.read())
            ingredients_list = iData["ingredients"]
            # print(ingredients_list)
            for ing in ingredients_list:
                opj = {"name": ing['name']}
                # check if Ingredients not Exists Create a new
                try:
                    ingredientExist = Ingredients.objects.get(name=ing['name'])
                except Ingredients.DoesNotExist:
                    Ingserializer = IngredientsSerilizer(data=opj)
                    if Ingserializer.is_valid():
                        Ingserializer.save()
                        ingredientExist = Ingserializer.instance
                    else:
                        print(ValidationError(Ingserializer.errors))

    ## import equipments data from equipments files
    if "equipments" in request.FILES:
        for eF in request.FILES.getlist('equipments'):
            eData = json.loads(eF.read())
            equipments_list = eData["equipment"]
            for equ in equipments_list:
                opj = {'name': equ['name'], 'type': equ['equipment_type'], 'brand': equ['brand'],
                       'model': equ['model'], 'project': project_id}
                # check if Ingredients not Exists Create a new
                try:
                    equipmentExist = Equipment.objects.get(name=equ['name'])
                except Equipment.DoesNotExist:
                    equSerializer = EquipmentSerializer(data=opj)
                    if equSerializer.is_valid():
                        equSerializer.save()
                        equipmentExist = equSerializer.instance
                    else:
                        print(ValidationError(equSerializer.errors))
    ## import sensory_panels data from sensory_panels files
    if "sensory_panels" in request.FILES:
        for sPF in request.FILES.getlist('sensory_panels'):
            sPData = json.loads(sPF.read())
            sensoryPanels_list = sPData["sensory_panels"]

            for spi in sensoryPanels_list:
                opj = {'judge': spi['judge_id'], 'data': spi['date'],
                       'panel_type': spi['panel_type'], 'panel_variable': spi['panel_variable'],
                       'panel_value': spi['panel_value'], 'project': project_id}
                # check if Ingredients not Exists Create a new
                # try:
                #    sensoryPanelsExist=SensoryPanel.objects.get(name=equ['name'])
                # except SensoryPanel.DoesNotExist:
                spiSerializer = SensoryPanelsCreateSerializers(data=opj)
                print(spiSerializer.is_valid())
                if spiSerializer.is_valid():
                    spiSerializer.save()
                    sensoryPanelsExist = spiSerializer.instance
                else:
                    print(ValidationError(spiSerializer.errors))
    ## import Sensors data from sensors files
    if "sensors" in request.FILES:
        for sF in request.FILES.getlist('sensors'):
            sData = json.loads(sF.read())
            sensors_list = sData["sensor_data"]

            for sI in sensors_list:
                opj = {'name': sI['name'], 'units': sI['units'],
                       'project': project_id}

                # check if sensor not Exists Create a new
                try:
                    sensorsExist = Sensors.objects.get(name=sI['name'])
                except Sensors.DoesNotExist:
                    sensorSerializer = SensorsCreateSerializers(data=opj)
                    if sensorSerializer.is_valid():
                        sensorSerializer.save()
                        sensorsExist = sensorSerializer.instance
                    else:
                        print(ValidationError(sensorSerializer.errors))

    ## import analytical_chemistry data from analytical_chemistry files
    if "analytical_chemistry" in request.FILES:
        for aCF in request.FILES.getlist('analytical_chemistry'):
            aCData = json.loads(aCF.read())
            analytical_chemistry_list = aCData["sensor_data"]

            for aCI in analytical_chemistry_list:
                opj = {'date': aCI['date'],
                       'method': aCI['method'], 'assay_component': aCI['assay_component'],
                       'variable': aCI['variable'], 'value': aCI['value'], 'unit': aCI['unit'],
                       'project': project_id}

                # check if sensor not Exists Create a new
                # try:
                #    analyticalChemistryExist=AnalyticalChemistry.objects.get(name=sI['name'])
                # except AnalyticalChemistry.DoesNotExist:
                analyticalChemistrySerializer = AnalyticalChemistryCreateSerializers(data=opj)
                if analyticalChemistrySerializer.is_valid():
                    analyticalChemistrySerializer.save()
                    analyticalChemistryExist = analyticalChemistrySerializer.instance
                else:
                    print(ValidationError(analyticalChemistrySerializer.errors))

    ## import Projcet data from files
    if "data" in request.FILES:
        for f in request.FILES.getlist('data'):
            data = json.loads(f.read())
            ingredients_list = data["ingredients"]
            # print(ingredients_list)
            for ing in ingredients_list:
                # quantity_values=ing['quantity'].split()
                opj = {"name": ing['name']}
                # check if Ingredients not Exists Create a new
                try:
                    ingredientExist = Ingredients.objects.get(name=ing['name'])
                except Ingredients.DoesNotExist:
                    Ingserializer = IngredientsSerilizer(data=opj)
                    if Ingserializer.is_valid():
                        Ingserializer.save()
                    else:
                        print(ValidationError(spiSerializer.errors))

            # Save metaRecipe  Data
            metaRecipe = data["meta_recipe"]

            metaRecipeExist = {}
            try:
                metaRecipeExist = MetaRecipe.objects.get(name=metaRecipe['name'])
            except MetaRecipe.DoesNotExist:
                metaRecipeserializer = MetaRecipeSerializer(
                    data={'name': metaRecipe['name'], 'project': project_id})
                if metaRecipeserializer.is_valid():
                    metaRecipeserializer.save()
                    metaRecipeExist = metaRecipeserializer.instance

            meta_recipe_ingredients_list = metaRecipe["meta_recipe_ingredients"]
            # print(meta_recipe_ingredients_list)
            for mRIItem in meta_recipe_ingredients_list:

                # get Ingredients if not Exists Create a new
                mRIngredient = getOrCreateIngredientByName(mRIItem['ingredient_name'])
                mRDependentIngredient = getOrCreateIngredientByName(mRIItem['dependent_ingredient_name'])

                mRI = {
                    'meta_recipe': metaRecipeExist.id,
                    'ingredient': mRIngredient.id,
                    'min': float(mRIItem['min']),
                    'max': float(mRIItem['mx']),
                    'dependent_ingredient': mRDependentIngredient.id,
                    'unit': mRIItem['unit'],
                }

                # savemeta recipe ingredients
                mRISerializer = MetaRecipeIngredientsSerializer(data=mRI)
                if mRISerializer.is_valid():
                    mRISerializer.save()

            # Save metaRecipe Recipes
            print(metaRecipe)
            recipes_list = metaRecipe["recipes"]
            print("22")
            for rcipeItem in recipes_list:
                print(rcipeItem)
                recipeExist = {}
                try:
                    recipeExist = Recipe.objects.get(name=rcipeItem['name'])
                except Recipe.DoesNotExist:
                    recipeopject = {
                        'name': rcipeItem['name'],
                        'meta_recipe': metaRecipeExist.id,
                        'protocol': 1,
                    }
                    recipeserializer = RecipeSerializer(data=recipeopject)
                    print(recipeserializer.is_valid())
                    if recipeserializer.is_valid():
                        recipeserializer.save()
                        recipeExist = recipeserializer.instance
                    else:
                        print(ValidationError(spiSerializer.errors))

                recipe_ingredients = rcipeItem["recipe_ingredients"]
                for rIng in recipe_ingredients:
                    print(rIng)
                    rIngredient = getOrCreateIngredientByName(rIng['ingredient_name'])

                    rI = {
                        'recipe': recipeExist.id,
                        'ingredient': rIngredient.id,
                        'unit': rIng['unit'],
                        'amount': rIng['amount'],
                    }

                    # savemeta recipe ingredients
                    rISerializer = RecipeIngredientsSerializer(data=rI)
                    if rISerializer.is_valid():
                        rISerializer.save()


# GET PUT PATCH
@api_view(['GET', 'DELETE', 'PATCH'])
def ProjectItem(request, pk):
    # GET

    try:
        project = Projects.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # GET
    if request.method == 'GET':
        serializer_class = ProjrctSerilizer(project)
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer_class.data},
            status=status.HTTP_200_OK)

    # PUT
    elif request.method == 'PATCH':
        serializer_class = ProjrctSerilizer(project, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(
                {'status': 'success', 'code': status.HTTP_201_CREATED, 'message': 'success',
                 'payload': serializer_class.data},
                status=status.HTTP_201_CREATED)

        return Response(
            {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success',
             'payload': serializer_class.errors},
            status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    elif request.method == 'DELETE':
        project.delete()
        return Response(
            {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': {}},
            status=status.HTTP_204_NO_CONTENT)

    else:
        return Response(
            {'status': 'fail', 'code': status.HTTP_400_BAD_REQUEST, 'message': 'success', 'payload': {}},
            status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@transaction.atomic
def clone(request):
    try:
        with transaction.atomic():
            ids = request.data['ids']
            result = Projects.objects.filter(
                reduce(or_, [Q(id=n) for n in ids])
            ).count() == len(ids)

            if not result:
                raise ValidationError("At least one ID is not in DB")

            count = Projects.objects.filter().count()

            for id in request.data['ids']:
                project = Projects.objects.get(id=id)
                ex_serializer = ProjrctSerilizer(project, many=False)
                __project = Projects.objects.create(name=f"{project.name}_clone_{++count}", date=project.date,
                                                    description=project.description)
                for equipment in ex_serializer.data['equipments']:
                    __project.equipments.create(name=equipment['name'],
                                                brand=equipment['brand'],
                                                type=equipment['type'],
                                                model=equipment['model'])

                for panel in ex_serializer.data['sensory_panels']:
                    __project.sensory_panels.create(judge=panel['judge'],
                                                    data=panel['data'],
                                                    sample_id=panel['sample_id'],
                                                    panel_type=panel['panel_type'],
                                                    panel_variable=panel['panel_variable'],
                                                    panel_value=panel['panel_value'],
                                                    )

                for sensor in ex_serializer.data['sensors']:
                    __project.sensors.create(name=sensor['name'],
                                             units=sensor['units'],
                                             )

                for analytical in ex_serializer.data['analytical_chemistry']:
                    __project.analytical_chemistry.create(date=analytical['date'],
                                                          method=analytical['method'],
                                                          assay_component=analytical['assay_component'],
                                                          variable=analytical['variable'],
                                                          value=analytical['value'],
                                                          unit=analytical['unit'],
                                                          )
            serializer = ProjrctSerilizer(__project, many=False)
            return Response(
                {'status': 'success', 'code': status.HTTP_200_OK, 'message': 'success', 'payload': serializer.data},
                status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        raise Exception(str(e))
