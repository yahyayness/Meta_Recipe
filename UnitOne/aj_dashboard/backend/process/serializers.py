from rest_framework import serializers
from .models import Process
 
class ProcessCreateSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = ('__all__')   

class ProcessSerilizer(serializers.ModelSerializer):
    next_process=ProcessCreateSerilizer(read_only=True)
    class Meta:
        model = Process
        fields = ('id','name','type','options','duration','start_time','next_process')