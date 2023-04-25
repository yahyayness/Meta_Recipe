from csv import DictReader
from datetime import datetime

from django.core.management import BaseCommand

from recipes.models import Aroma
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
        if Aroma.objects.exists():
            print('Aromas data already loaded...exiting.')
            print(ALREDY_LOADED_ERROR_MESSAGE)
            return
        print("Creating aroma data")
        for row in DictReader(open('./statistical_aroma_matrix.csv' , encoding="utf-8"), delimiter=',' ):
            aroma = Aroma()
            aroma.entity_id = row['entity_id']
            aroma.entity_alias_readable = row['entity_alias_readable']
            aroma.Uncategorised = row['Uncategorised']
            aroma.Decayed = row['Decayed']
            aroma.Sweet = row['Sweet']
            aroma.Woody = row['Woody']
            aroma.Medicinal = row['Medicinal']
            aroma.Sulfidic = row['Sulfidic']
            aroma.Fruity = row['Fruity']
            aroma.Smoky = row['Smoky']
            aroma.Floral = row['Floral']
            aroma.Fruity = row['Fruity']
            aroma.Citrus = row['Citrus']
            aroma.Mint = row['Mint']
            aroma.save()
