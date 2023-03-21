from csv import DictReader
from datetime import datetime

from django.core.management import BaseCommand

from recipes.models import Ingredient
from pytz import UTC

ALREDY_LOADED_ERROR_MESSAGE = """
If you need to reload the pet data from the CSV file,
first delete the db.sqlite3 file to destroy the database.
Then, run `python manage.py migrate` for a new empty
database with tables"""


class Command(BaseCommand):
    # Show this when the user types help
    help = "Loads data from aromas.csv into our Aroma mode"

    def handle(self, *args, **options):
        if Ingredient.objects.exists():
            print('Aromas data already loaded...exiting.')
            print(ALREDY_LOADED_ERROR_MESSAGE)
            return
        print("Creating Ingredients data")
        for row in DictReader(open('./ingredient_by_id.csv', encoding="utf-8"), delimiter=','):
            ingredient = Ingredient()
            ingredient.entity_id = row['entity_id']
            ingredient.entity_alias_readable = row['entity_alias_readable']
            ingredient.save()
        print("Ingredients data successfully created")
