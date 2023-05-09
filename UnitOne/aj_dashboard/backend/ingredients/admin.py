from django.contrib import admin
from .models import Ingredients
# Register your models here.


class IngredientsAdmin(admin.ModelAdmin):
    list_display=['name', 'unit']
    #list_editable = []
    search_fields=['name', 'unit']
    list_filter=['name']
    #fields=[]

admin.site.register(Ingredients,IngredientsAdmin)