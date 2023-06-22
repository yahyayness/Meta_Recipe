from django.db import transaction

from ingredients.models import Ingredients
from process.models import Process
from recipe.models import RecipeNode, RecipeIngredients, RecipeProcess, RecipeEdge


def create_recipe_flow(flow, recipe_id=None):
    try:
        with transaction.atomic():
            nodes = {}
            if 'nodes' in flow:
                for node in flow['nodes']:
                    if node['type'] == 'ingredient-container':
                        for child in node['data']['children']:
                            ing_name = child['data']['value']['name']
                            ing_amount = child['data']['value']['amount']
                            ing_unit = 'g'
                            obj, created = Ingredients.objects.get_or_create(
                                name=ing_name
                            )
                            recipe_ingredient = RecipeIngredients.objects.create(recipe_id=recipe_id,
                                                                                 ingredient=obj,
                                                                                 unit=ing_unit,
                                                                                 quantity=ing_amount)
                            recipe_node = RecipeNode.objects.create(recipe_id=recipe_id,
                                                                    model_type='RecipeIngredients',
                                                                    model_id=recipe_ingredient.id,
                                                                    container=node['id'],
                                                                    slug=child['id'],
                                                                    type='ingredient',
                                                                    payload=child['data'])
                            nodes[child['id']] = recipe_node.id
                    elif node['type'] == 'process':
                        for child in node['data']['children']:
                            process = Process.objects.get(name__iexact=node['data']['label'])
                            recipe_process = RecipeProcess.objects.create(recipe_id=recipe_id,
                                                                          process=process,
                                                                          arguments=child['data'],
                                                                          value=child['data']['value']
                                                                          )
                            recipe_node = RecipeNode.objects.create(recipe_id=recipe_id,
                                                                    model_type='RecipeProcess',
                                                                    model_id=recipe_process.id,
                                                                    container=node['id'],
                                                                    slug=child['id'],
                                                                    type='process',
                                                                    payload=child['data'])
                            nodes[child['id']] = recipe_node.id
                    elif node['type'] in ['merge', 'serve']:
                        recipe_node = RecipeNode.objects.create(recipe_id=recipe_id,
                                                                container=node['id'],
                                                                slug=node['id'],
                                                                type=node['type'])
                        nodes[node['id']] = recipe_node.id

            if 'edges' in flow:
                for edge in flow['edges']:
                    source_id = nodes[edge['sourceHandle'].replace('-source', '')]
                    target_id = nodes[edge['targetHandle'].replace('-target', '')]
                    RecipeEdge.objects.create(source_node_id=source_id, target_node_id=target_id)
            return {}
    except Exception as e:
        raise e
