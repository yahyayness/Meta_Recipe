from django.contrib.auth.models import Permission

from recipes.core.helpers import import_permission_data
from recipes.models import *

"""
    variable that binds between table and model
    @author Amr
"""
TABLE_TO_MODEL = {
    'recipes.singlerecipeingredient': SingleRecipeIngredient,
    'recipes.taste': Taste,
    'recipes.aroma': Aroma,
    'recipes.ingredient': Ingredient,
    'recipes.metarecipe': MetaRecipe,
    'recipes.singlerecipe': SingleRecipe,
    'recipes.environmentalimpact': EnvironmentalImpact,
    'contenttypes.contenttype' : ContentType,
    'auth.permission': Permission
}
"""
    here is the custom import methods that can not be defined inside the model of table
    @author Amr
"""
CUSTOM_IMPORT_METHOD = {
    'auth.permission': import_permission_data
}
