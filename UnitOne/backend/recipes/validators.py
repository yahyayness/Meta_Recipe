from rest_framework.exceptions import ValidationError

from recipes.models import Ingredient


def SingleRecipeIngredientValidator(self, data):
    """
    validate the request of SingleRecipeIngredient
    :param self:
    :param data:
    :return:
    """
    min = data.get('min')
    max = data.get('max')
    value = data.get('value')
    entity_id = data.get('entity_id')
    result = max - min
    if result < 0:
        raise ValidationError({'min_max': f"Value {max} must be bigger than  {min}"})
    if not (value <= max and value >= min):
        raise ValidationError({'value': f"Value must be between {min} and {max}"})
    try:
        Ingredient.objects.get(pk=entity_id)
    except:
        raise ValidationError({'entity_id' : 'Invalid entity_id'})
    return data
