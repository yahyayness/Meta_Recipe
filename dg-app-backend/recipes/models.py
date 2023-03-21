from django.contrib.postgres.fields import JSONField
from django.db import models


class Ingredient(models.Model):
    entity_id = models.IntegerField(primary_key=True, null=False, blank=True)
    entity_alias_readable = models.CharField(max_length=50)
    category = models.CharField(max_length=32, default='dish')

    def __str__(self):
        return self.entity_alias_readable


class Aroma(models.Model):
    entity_id = models.IntegerField(null=False, primary_key=True)
    entity_alias_readable = models.CharField(max_length=50, null=True)
    Uncategorised = models.FloatField()
    Decayed = models.FloatField()
    Sweet = models.FloatField()
    Woody = models.FloatField()
    Medicinal = models.FloatField()
    Sulfidic = models.FloatField()
    Fruity = models.FloatField()
    Smoky = models.FloatField()
    Floral = models.FloatField()
    Citrus = models.FloatField()
    Mint = models.FloatField()

    def __str__(self):
        return self.entity_id


class Taste(models.Model):
    entity_id = models.IntegerField(null=False, primary_key=True)
    taste_name = models.CharField(max_length=50, null=True)
    sweet = models.FloatField(default=0.0)
    salty = models.FloatField(default=0.0)
    sour = models.FloatField(default=0.0)
    bitter = models.FloatField(default=0.0)
    umami = models.FloatField(default=0.0)
    fat = models.FloatField(default=0.0)

    def __str__(self):
        return self.entity_id + " - " + self.taste_name


class MetaRecipe(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SingleRecipe(models.Model):
    DIET_CHOICES = [('KOSHER', 'Kosher'), ('VEGAN', 'Vegan'), ('KETOGENIC', 'Ketogenic')]
    name = models.CharField(max_length=50)
    diet = models.CharField(max_length=50, choices=DIET_CHOICES)
    metarecipe = models.ForeignKey(MetaRecipe, related_name='single_recipe', blank=True, null=True, default=None,
                                   on_delete=models.SET_NULL)

    # ingredient
    # instruction
    def __str__(self):
        return str(self.id) + ": " + self.diet


class SingleRecipeIngredient(models.Model):
    name = models.CharField(max_length=50)
    entity_id = models.IntegerField()
    min = models.FloatField(default=0.0)
    max = models.FloatField(default=0.0)
    value = models.FloatField(default=0.0)
    single_recipe = models.ForeignKey(SingleRecipe, related_name='single_recipe_ingredients', blank=True, null=True,
                                      default=None,
                                      on_delete=models.SET_NULL)
    UNIT_CHOICES = [('kg', 'kg'), ('g', 'g'), ('l', 'l'), ('ml', 'ml')]
    unit = models.CharField(max_length=8, choices=UNIT_CHOICES, default='G')
    unit_convertor_g = models.FloatField(default=0.001)


"""


Land Use (m2/FU)
GHG Emissions (kg CO2eq/FU, IPCC 2013 incl. CC feedbacks)
Acidifying Emissions (g SO2eq/FU, CML2 Baseline)
Eutrophying Emissions (g PO43-eq/FU, CML2 Baseline)	
Freshwater Withdrawals (L/FU)
Stress-Weighted Water Use (L/FU)

land_use
ghg_emissions
acidifying_emissions
eutrophying_emissions
freshwater_withdrawals
stress_weighted_water_use

"""


class EnvironmentalImpact(models.Model):
    entity_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=32, null=True)
    land_use = models.FloatField(default=0.0)
    ghg_emissions = models.FloatField(default=0.0)
    acidifying_emissions = models.FloatField(default=0.0)
    eutrophying_emissions = models.FloatField(default=0.0)
    freshwater_withdrawals = models.FloatField(default=0.0)
    stress_weighted_water_use = models.FloatField(default=0.0)

    def __str__(self):
        return self.name + ": " + str(self.entity_id)

#
# class Recipe(models.Model):
#     DIET_CHOICES = [('KOHSER', 'Kohser'), ('VEGAN', 'Vegan'), ('KETOGENIC', 'Ketogenic')]
#     name = models.CharField(max_length=50)
#     diet = models.CharField(max_length=50, choices=DIET_CHOICES, blank=True)
#     category = models.CharField(max_length=50, null=True, blank=True)
#     ingredients = models.ManyToManyField('IngredientOfRecipe', related_name='recipe', blank=True)
#
#     def __str__(self):
#         return self.name


#
# class TestRecipe(models.Model):
#     name = models.CharField(max_length=50)
#     rate = models.IntegerField(default=3)
#     ingredients = JSONField()
#
#     def __str__(self):
#         return self.name

#
# class IngredientOfRecipe(models.Model):
#     name = models.CharField(max_length=50)
#     entity_id = models.IntegerField()
#     min = models.IntegerField(default=0)
#     max = models.IntegerField(default=0)
#     kosher_value = models.FloatField(default=0.0)
#     vegan_value = models.FloatField(default=0.0)
#     ketogenic_value = models.FloatField(default=0.0)
#
#     def __str__(self):
#         return " " + str(self.name) + ": { min: " + str(self.min) + ", max: " + str(self.max) + " }"

#
# class LandUse(models.Model):
#     entity_id = models.IntegerField(null=False)
#     name = models.CharField(max_length=30, null=True)
#     use_per_km = models.FloatField(default=0)
#
#     def __str__(self):
#         return self.name + ": " + str(self.use_per_km)
