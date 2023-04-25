import json

from django.core.management.base import BaseCommand

from recipes.core.Exceptions.InvalidImportedDataException import InvalidImportedDataException
from recipes.core.constants import TABLE_TO_MODEL, CUSTOM_IMPORT_METHOD
from recipes.core.helpers import *


# python manage.py ImportData --path=data_to_upload.json reset

class Command(BaseCommand):
    help = 'import the content of data_to_upload'

    def add_arguments(self, parser):
        parser.add_argument('--path', help="this is the path of the file you want to import")
        parser.add_argument('reset', type=str, help='remove all data in the database before importing the new content')



    def save_data(self, data):
        """
        save data into database
        @author Amr
        """
        for row in data:
            try:
                model = TABLE_TO_MODEL[row['model']]
                primary_key = model._meta.pk.name
                row['fields'][primary_key] = row['pk']
                data = row['fields']
                if hasattr(model, 'import_data'):
                    data = model.import_data(row['fields'])
                elif row['model'] in CUSTOM_IMPORT_METHOD:
                    data = CUSTOM_IMPORT_METHOD[row['model']](row['fields'])
                TABLE_TO_MODEL[row['model']].objects.create(**data)
                print(f"\033[1;32mSuccess\033[0m: {row['model']} , {data} ")
            except KeyError as error:
                print(f"\033[1;31mError\033[0m: {error.__str__()}")
            except InvalidImportedDataException as invalidData:
                print(f"\033[1;31mFailed\033[0m: {row}, Invalid Imported Data")

    def truncate(self):
        """
        truncate all the table that we will fill 'em again
        @author Amr
        """
        print("Start removing database content")
        for key in TABLE_TO_MODEL:
            model = TABLE_TO_MODEL[key]
            model.objects.all().delete()
            print(f"\033[1;32mSuccess\033[0m: {key}'s content has been deleted successfully")
        print("Finished removing database content")

    def handle(self, *args, **options):
        """
        import data from the file of the passed path
        @author Amr
        """
        reset = options.get('reset', None)
        if reset:
            self.truncate()
        path = options['path']
        read_json_file(path, self.save_data)
