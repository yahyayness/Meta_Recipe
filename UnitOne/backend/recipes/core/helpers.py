import json

from django.contrib.contenttypes.models import ContentType

from recipes.core.Exceptions.InvalidImportedDataException import InvalidImportedDataException

""" 
    this method is used to read json file of the given path
    @author Amr
"""
def read_json_file(path, callback):
    with open(path) as file:
        data = json.load(file)
        callback(data)

def import_permission_data(data = {}):
    print(f"Single {data}")
    if data['content_type'] == None:
        raise InvalidImportedDataException()
    data['content_type'] = ContentType.objects.get(id=data['content_type'])
    return data