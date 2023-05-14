from rest_framework import serializers
from ingredients.serializers import IngredientNodesCreateSerilizer
from molecules.serializers import MoleculeNodesCreateSerilizer
from .models import IngredientMolecules



class IngredientMoleculesCreateSerilizer(serializers.ModelSerializer):
    class Meta:
        model = IngredientMolecules
        fields = ('__all__') 

class IngredientMoleculesSerilizer(serializers.ModelSerializer):
    ingredient=IngredientNodesCreateSerilizer(read_only=True)
    molecules=MoleculeNodesCreateSerilizer(read_only=True)
    class Meta:
        model = IngredientMolecules
        fields = ('id','ingredient','molecules','mass_concentration_min','mass_concentration_max') 