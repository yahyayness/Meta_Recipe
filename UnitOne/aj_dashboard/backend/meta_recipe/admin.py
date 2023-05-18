from django.contrib import admin
from meta_recipe.models import MetaRecipeIngredients,MetaRecipe

# Register your models here.

class MetaRecipeIngredientsAdmin(admin.ModelAdmin):
    exclude = (["deleted_at"])

admin.site.register(MetaRecipe,MetaRecipeIngredientsAdmin)
admin.site.register(MetaRecipeIngredients,MetaRecipeIngredientsAdmin)