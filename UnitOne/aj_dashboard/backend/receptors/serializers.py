from rest_framework import serializers
from .models import Receptor

 

class ReceptorSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Receptor
        fields = ('__all__') 

 