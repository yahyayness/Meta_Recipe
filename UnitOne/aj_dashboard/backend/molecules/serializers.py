from rest_framework import serializers
from .models import Molecules,MoleculesNode

class MoleculesSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Molecules
        fields = ('__all__') 

class MoleculeNodesCreateSerilizer(serializers.ModelSerializer):
    class Meta:
        model = MoleculesNode
        fields = ('id','molecule','quantity') 

class MoleculeNodesSerilizer(serializers.ModelSerializer):
    molecule=MoleculesSerilizer(read_only=True)
    class Meta:
        model = MoleculesNode
        fields = ('id','molecule','quantity') 