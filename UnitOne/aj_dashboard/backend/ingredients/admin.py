from django.contrib import admin
from .models import Ingredients
from .models import IngredientNode
# Register your models here.


class IngredientsAdmin(admin.ModelAdmin):
    list_display=['name', 'unit']
    #list_editable = []
    search_fields=['name', 'unit']
    list_filter=['name']
    #fields=[]
admin.site.register(Ingredients,IngredientsAdmin)

class IngredientsNodeAdmin(admin.ModelAdmin):
    list_display=['ingredient', 'quantity']
    #list_editable = []
    search_fields=['ingredient__name']
    list_filter=['ingredient'] 
    #fields=[]
    exclude = (["deleted_at"])

admin.site.register(IngredientNode,IngredientsNodeAdmin)