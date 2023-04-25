from math import ceil
from pprint import pprint

from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import *
from .validators import SingleRecipeIngredientValidator

WATER_FACTOR = 0.1


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # fields = "__all__"
        fields = ('entity_id', 'entity_alias_readable', 'category')


class AromaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aroma
        fields = '__all__'


class TasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taste
        fields = '__all__'


class SingleRecipeIngredientSerializer(serializers.ModelSerializer):
    aromas = serializers.SerializerMethodField()
    # land_use = serializers.SerializerMethodField()
    tastes = serializers.SerializerMethodField()
    env_impact = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = SingleRecipeIngredient
        # fields = ('id', 'name', 'entity_id', 'min', 'max', 'value',
        #           'aromas',  'single_recipe', )
        fields = ('id', 'name', 'entity_id', 'category', 'min', 'max', 'value', 'unit', 'unit_convertor_g',
                  'aromas', 'tastes', 'env_impact', 'single_recipe')

        extra_kwargs = {
            # 'ingredient recipe number': {'source': 'id'},
            # 'single_recipe': {'write_only': True},
            # 'category' : {'required': True}
        }
    def validate(self,data):
       return SingleRecipeIngredientValidator(self,data)

    def get_aromas(self, ing):
        aroma = Aroma.objects.filter(entity_id=ing.entity_id).values()
        return aroma.first() # aroma  # [0]  because filter return array

    def get_env_impact(self, ing):
        # return "land use data..."
        env_impact = EnvironmentalImpact.objects.filter(entity_id=ing.entity_id).values()
        if env_impact:
            return env_impact.first()
        else:
            return []

    def get_tastes(self, ing):
        # return "taste data..."
        tastes = Taste.objects.filter(entity_id=ing.entity_id).values()
        if tastes:
            return tastes.first()
        else:
            return []

    def get_category(self, ing):
        try:
            data = Ingredient.objects.get(pk=ing.entity_id)
            return data.category
        except:
            request = self.context.get('request')
            if request and request.method == 'POST':
                raise ValidationError("Invalid entity_id")
            return ""


class SingleRecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = SingleRecipe
        # fields = ('id', 'diet', 'metarecipe')
        fields = ('id', 'diet', 'ingredients', 'metarecipe')
        extra_kwargs = {
            'metarecipe': {'write_only': True},
        }

    def get_ingredients(self, recipe):
        ingredients_by_recipe = SingleRecipeIngredient.objects.filter(single_recipe=recipe.id)
        data = SingleRecipeIngredientSerializer(ingredients_by_recipe, many=True).data
        print(type(data))
        return data

    def to_representation(self, instance):
        response = super().to_representation(instance)
        # print(response["ingredients"])
        response["ingredients"] = sorted(response["ingredients"], key=lambda x: x["category"])
        return response


def noramlize_value(val, min, max):
    return ((val * (max - min)) + min)


def env_impact_score(env_score, ing_factor, convertor):
    return env_score * ing_factor * convertor


class MetaRecipeSerializer(serializers.ModelSerializer):
    recipes = serializers.SerializerMethodField()
    # land_use_avg = serializers.SerializerMethodField()
    env_impact_avg = serializers.SerializerMethodField()
    env_impact_max = serializers.SerializerMethodField()
    aroma_max = serializers.SerializerMethodField()
    taste_max = serializers.SerializerMethodField()

    class Meta:
        model = MetaRecipe
        fields = ('id', 'name', 'recipes', "env_impact_avg", 'env_impact_max',
                  'aroma_max' , 'taste_max')

    def get_recipes(self, metarecipe):
        single_recipes_by_metarecipe = SingleRecipe.objects.filter(metarecipe=metarecipe.id)
        return SingleRecipeSerializer(single_recipes_by_metarecipe, many=True).data

    def get_env_impact_avg(self, metarecipe):
        single_recipes_by_metarecipe = self.get_recipes(metarecipe)
        print(single_recipes_by_metarecipe)
        try:
            avg_factor = 1 / len(single_recipes_by_metarecipe)
        except ZeroDivisionError as error:
            avg_factor = 0
        metarecipe_env_impact_avg = {
            "land_use": 0,
            "ghg": 0,
            "acid": 0,
            "eutrophy": 0,
            "freshwater": 0,
        }

        for recipe in single_recipes_by_metarecipe:

            #  score for each scale by ingredient
            for ing in recipe['ingredients']:
                val = ing['value']
                factor = noramlize_value(val, ing['min'], ing['max'])
                env_impact = ing['env_impact']
                # print('here we go')
                #Actuvally,we don't need to walk throgh this callculation if I did not have env_impact

                if val > 0 & len(env_impact) > 0:
                    convertor = ing['unit_convertor_g']
                    metarecipe_env_impact_avg['land_use'] += env_impact_score(env_impact['land_use'], factor, convertor) * avg_factor
                    metarecipe_env_impact_avg['ghg'] += env_impact_score(env_impact['ghg_emissions'], factor,
                                                                         convertor) * avg_factor

                    metarecipe_env_impact_avg['acid'] += env_impact_score(env_impact['acidifying_emissions'],
                                                                          factor,
                                                                          convertor) * avg_factor
                    metarecipe_env_impact_avg['eutrophy'] += (env_impact_score(env_impact['eutrophying_emissions'],
                                                                               factor,
                                                                               convertor) * avg_factor)
                    metarecipe_env_impact_avg['freshwater'] += (env_impact_score(env_impact['freshwater_withdrawals'],
                                                                                 factor,
                                                                                 convertor) * avg_factor * WATER_FACTOR)

        # round values
        for key, val in metarecipe_env_impact_avg.items():
            metarecipe_env_impact_avg[key] = round(val, 2)

        return metarecipe_env_impact_avg

    def get_env_impact_max(self, metarecipe):
        single_recipes_by_metarecipe = self.get_recipes(metarecipe)
        max_env = 0

        for recipe in single_recipes_by_metarecipe:
            recipe_count = 0
            #  score for each scale by ingredient
            for ing in recipe['ingredients']:
                val = ing['value']
                factor = noramlize_value(val, ing['min'], ing['max'])
                env_impact = ing['env_impact']
                if val > 0 & len(env_impact) > 0:
                    convertor = ing['unit_convertor_g']
                    recipe_count += env_impact_score(env_impact['freshwater_withdrawals'], factor,
                                                     convertor) * WATER_FACTOR
            # print(metarecipe.name, recipe['diet'], recipe_count)
            if recipe_count > max_env:
                max_env = ceil(recipe_count)
        return max_env

    def get_aroma_max(self, metarecipe):
        single_recipes_by_metarecipe = self.get_recipes(metarecipe)
        max_aroma = 0

        for recipe in single_recipes_by_metarecipe:
            avg_factor = self.calculate_avg_factor(len(recipe['ingredients']))
            if avg_factor == 0:
                return 0

            aromas_avg = {}
            #  score for each scale by ingredient
            for ing in recipe['ingredients']:
                factor = noramlize_value(ing['value'], ing['min'], ing['max'])
                if ing['aromas']:
                    aroma_intensities = {k: v for k, v in ing['aromas'].items() if
                                       not k.startswith(('entity_id', 'entity_alias_readable'))}
                    for category, intensity in aroma_intensities.items():
                        if category in aromas_avg:
                            aromas_avg[category] += (intensity * factor )
                        else:
                            aromas_avg[category] = (intensity * factor )
            aromas_avg = {}
            recipe_aroma = max(aromas_avg.values()) if len(aromas_avg.values()) > 0 else 0
            if recipe_aroma > max_aroma:
                max_aroma = recipe_aroma * avg_factor

        return ceil(max_aroma)

    def calculate_avg_factor(self , ingredients_length):
        """
        this function calculates the avg factor
        according to the given length off ingredients
        :param ingredients_length:
        :return:
        @author Amr
        """
        try:
            return 1 / ingredients_length
        except ZeroDivisionError as error:
            return 0
    def get_taste_max(self, metarecipe):
        single_recipes_by_metarecipe = self.get_recipes(metarecipe)
        max_taste = 0

        for recipe in single_recipes_by_metarecipe:
            avg_factor = self.calculate_avg_factor(len(recipe['ingredients']))
            if avg_factor == 0:
                return 0
            tastes_avg = {}
            #  score for each scale by ingredient
            for ing in recipe['ingredients']:
                if ing['tastes']:
                    factor = noramlize_value(ing['value'], ing['min'], ing['max'])
                    taste_intensities = {k: v for k, v in ing['tastes'].items() if
                                         not k.startswith(('entity_id', 'taste_name'))}
                    for category, intensity in taste_intensities.items():
                        if category in tastes_avg:
                            tastes_avg[category] += (intensity * 0.1 * factor)
                        else:
                            tastes_avg[category] = (intensity * 0.1 * factor)

            recipe_taste = max(tastes_avg.values()) if len(tastes_avg.values()) > 0 > 0 else 0
            if recipe_taste > max_taste:
                max_taste = recipe_taste * avg_factor

        return ceil(max_taste)


class EnvironmentalImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalImpact
        fields = '__all__'


class RecipeNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaRecipe
        fields = ('id', 'name')
        extra_kwargs = {
            'name': {'read_only': True}
        }
