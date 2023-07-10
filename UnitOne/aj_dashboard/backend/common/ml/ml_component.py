"""AJX EIT MVP TasteTuner ML component v0.2.2.

Updated 30.06.2023: Converting changed ingredients back to original unit. 

Only the `predict` function and the files it loads need to be ported. 
The variables `saved_state` and `changed_state` are included to demonstrate and verify 
expected behavior from the predict function. 
To see this behavior, in the appropriate environment call
```
python ml_component.py
```
and output updated_state should be (pprint omitted from code below):
```
{'ingredients': [{'name': 'frozen strawberries', 'quantity': 250, 'unit': 'g'},
                 {'name': 'frozen blueberries', 'quantity': 250, 'unit': 'g'},
                 {'name': 'walnuts', 'quantity': 116.0, 'unit': 'g'},
                 {'name': 'milk', 'quantity': 250, 'unit': 'g'},
                 {'name': 'honey', 'quantity': 192.0, 'unit': 'g'},
                 {'name': 'banana', 'quantity': 250, 'unit': 'g'}],
 'sensory_panel': [{'value': 8.5, 'variable': 'Fruity'},
                   {'value': 1.0, 'variable': 'Cacao / Chocolate'},
                   {'value': 8.0, 'variable': 'Soft'},
                   {'value': 1.5, 'variable': 'Salty'},
                   {'value': 2.5, 'variable': 'Hard'},
                   {'value': 1.5, 'variable': 'Nutty'},
                   {'value': 0.5, 'variable': 'Cereal'},
                   {'value': 2.5, 'variable': 'Fatty'},
                   {'value': 5.5, 'variable': 'Sticky'},
                   {'value': 0.5, 'variable': 'Dry'},
                   {'value': 2.0, 'variable': 'Crunchy'},
                   {'value': 8.0, 'variable': 'Sweet'}]}
```
"""
import json
import os

from pprint import pprint

saved_state = {
    "ingredients": [
        {"name": "frozen strawberries", "quantity": 250, "unit": "g"},
        {"name": "frozen blueberries", "quantity": 250, "unit": "g"},
        {"name": "frozen raspberries", "quantity": 250, "unit": "g"},
        {"name": "milk", "quantity": 250, "unit": "g"},
        {"name": "honey", "quantity": 15, "unit": "g"},
        {"name": "banana", "quantity": 250, "unit": "g"}],
    "sensory_panel": [
        {"variable": "Fruity", "value": 9.5},
        {"variable": "Cacao / Chocolate", "value": 1.5},
        {"variable": "Soft", "value": 7.5},
        {"variable": "Salty", "value": 2.0},
        {"variable": "Hard", "value": 4.0},
        {"variable": "Nutty", "value": 1.5},
        {"variable": "Cereal", "value": 1.0},
        {"variable": "Fatty", "value": 0.5},
        {"variable": "Sticky", "value": 6.5},
        {"variable": "Dry", "value": 0.5},
        {"variable": "Crunchy", "value": 2.5},
        {"variable": "Sweet", "value": 8.5}]
}

changed_state = {
    "ingredients": [
        {"name": "frozen strawberries", "quantity": 250, "unit": "g"},
        {"name": "frozen blueberries", "quantity": 250, "unit": "g"},
        {"name": "frozen raspberries", "quantity": 250, "unit": "g"},
        {"name": "milk", "quantity": 250, "unit": "g"},
        {"name": "honey", "quantity": 115, "unit": "g"},
        {"name": "banana", "quantity": 250, "unit": "g"}],
    "sensory_panel": [
        {"variable": "Fruity", "value": 8.5},
        {"variable": "Cacao / Chocolate", "value": 1.5},
        {"variable": "Soft", "value": 7.5},
        {"variable": "Salty", "value": 2.0},
        {"variable": "Hard", "value": 4.0},
        {"variable": "Nutty", "value": 1.5},
        {"variable": "Cereal", "value": 1.0},
        {"variable": "Fatty", "value": 0.5},
        {"variable": "Sticky", "value": 6.5},
        {"variable": "Dry", "value": 0.5},
        {"variable": "Crunchy", "value": 2.5},
        {"variable": "Sweet", "value": 8.5}]
}


def predict(saved_state, changed_state):
    # Package dependencies
    import numpy as np
    import pandas as pd
    import pickle
    import sklearn
    from copy import deepcopy
    # Boolean states for flow control
    backward = False
    forward = False
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__)))
    # Reference structures
    sensory_keys = ["Fruity", "Cacao / Chocolate", "Soft", "Salty", "Hard", "Nutty", "Cereal", "Fatty", "Sticky", "Dry",
                    "Crunchy", "Sweet"]
    with open(os.path.join(__location__, 'known_units.json'), "r") as f:
        known_units = json.load(f)
    # Load embedding nodes
    with open(os.path.join(__location__, 'ingredient_node_vecs.pickle'), 'rb') as file:
        ing_node_vecs = pickle.load(file)
    # Load trained models
    # neigh = pickle.load(open("neigh.pkl", "rb"))
    reg = pickle.load(open(os.path.join(__location__, 'reg.pkl'), "rb"))
    revreg = pickle.load(open(os.path.join(__location__, 'revreg.pkl'), "rb"))
    # Load the input
    updated_state = deepcopy(changed_state)
    saved_ings = saved_state['ingredients']
    changed_ings = changed_state['ingredients']
    # Check which directions to predict
    if saved_ings != changed_ings:
        # Difference on the X side, thus forward prediction
        forward = True
        #print("Predicting forward")
    saved_panel = saved_state['sensory_panel']
    changed_panel = changed_state['sensory_panel']

    def dictify_panel(panel_list):
        panel_dict = {}
        for subdict in panel_list:
            # 'value': 9.5, 'variable':
            if subdict["variable"] in sensory_keys:
                panel_dict[subdict["variable"]] = subdict["value"]
        return panel_dict

    saved_panel = dictify_panel(saved_panel)
    changed_panel = dictify_panel(changed_panel)

    def listify_panel_dict(panel_dict):
        panel_list = []
        for skey in sensory_keys:
            temp_dict = {}
            temp_dict['variable'] = skey
            temp_dict['value'] = panel_dict[skey]
            panel_list.append(temp_dict)
        return panel_list

    if saved_panel != changed_panel:
        backward = True
        #print("Predicting backward")
    if not forward and not backward:
        #print("Do not generate anything new if there is no delta between input states.")
        return updated_state
    if len(saved_ings) != len(changed_ings):
        #print("For MVP we only consider unchanged number of ingredients.")
        return updated_state

    # Assume all ingredients are on the whitelist, else ignore
    # Convert quantities to grams (g).
    def grams_and_normalize(ings):
        raw_quant = []
        new_ings = []
        for ing in ings:
            new_ing = {}
            if ing['name'] not in ing_node_vecs:
                new_ing = deepcopy(ing)
                new_ing['ignore'] = True
                new_ings.append(new_ing)
                raw_quant.append(0)
                continue
            else:
                new_ing['name'] = ing['name']
            found_unit = False
            for unit_name, unit_dict in known_units.items():
                if ing['unit'] == unit_name or ing['unit'] in unit_dict['abbreviation']:
                    new_ing['original_unit'] = ing['unit']
                    new_ing['equivalentInGrams'] = unit_dict['equivalentInGrams']
                    new_ing['quantity'] = ing['quantity'] * unit_dict['equivalentInGrams']
                    new_ing['unit'] = "g"
                    raw_quant.append(new_ing['quantity'])
                    new_ings.append(new_ing)
                    found_unit = True
                    continue
            if not found_unit:
                new_ing = deepcopy(ing)
                new_ing['ignore'] = True
                new_ings.append(new_ing)
                raw_quant.append(0)
        norm_quant = [float(q) / sum(raw_quant) for q in raw_quant]
        # print(raw_quant)
        # print(norm_quant)
        for i, nq in enumerate(norm_quant):
            new_ings[i]['normalized_quantity'] = nq
        return new_ings

    updated_ings = []
    saved_ings = grams_and_normalize(saved_ings)
    changed_ings = grams_and_normalize(changed_ings)

    def panel_vec(panel):  # Convert panel dict into panel vector
        vec_list = []
        for skey in sensory_keys:
            vec_list.append(float(panel[skey]))
        return np.array(vec_list)

    saved_panel_vec = panel_vec(saved_panel)
    changed_panel_vec = panel_vec(changed_panel)
    updated_panel_vec = changed_panel_vec

    def vec_panel(vec):  # Convert panel vector into panel dict
        vec_list = [round(2 * min(np.abs(x), 10.0)) / 2 for x in list(vec)]
        panel = {}
        for skey, x, in zip(sensory_keys, vec_list):
            panel[skey] = float(x)
        return panel

    def remove_nq(updated_ings):  # Remove normalized quantities
        new_updated_ings = []
        for updated_ing in updated_ings:
            new_ing = {}
            new_ing["name"] = updated_ing["name"]
            if "original_unit" in updated_ing:
                new_ing["quantity"] = updated_ing["quantity"]/updated_ing["equivalentInGrams"]
                new_ing["unit"] = updated_ing["original_unit"]
            else:
                new_ing["quantity"] = updated_ing["quantity"]
                new_ing["unit"] = updated_ing["unit"]
            new_updated_ings.append(new_ing)
        return new_updated_ings

    if forward:
        X = np.zeros(300)
        for sing, cing in zip(saved_ings, changed_ings):
            if "ignore" in sing or "ignore" in cing:
                updated_ing = cing
                updated_ings.append(updated_ing)
            # more elifs can be articulated later
            # elif "normalized_quantity" in sing and "normalized_quantity" in cing:
            #  new_ing = {}
            #  new_ing["name"] = cing["name"]
            else:  # To maintain size and order and respect user wishes
                X += cing["normalized_quantity"] * ing_node_vecs[cing["name"]]
                updated_ing = cing
                updated_ings.append(updated_ing)
        updated_panel_vec = reg.predict([X])[0]
        updated_panel = vec_panel(updated_panel_vec)
        updated_state['sensory_panel'] = listify_panel_dict(updated_panel)
        updated_state['ingredients'] = remove_nq(updated_ings)
    if backward:
        middle_panel_vec = 0.33 * saved_panel_vec + 0.33 * changed_panel_vec + 0.34 * updated_panel_vec
        b_update = revreg.predict([middle_panel_vec])[0]
        # temporary comparison vectors
        component_names = []
        component_vecs = []
        component_solved_coeffs = {}
        for cing in changed_ings:
            if "ignore" not in cing:
                component_names.append(cing["name"])
                component_vecs.append(cing["normalized_quantity"] * ing_node_vecs[cing["name"]])
        A = np.stack(component_vecs).T
        x, residuals, rank, s = np.linalg.lstsq(A, b_update, rcond=None)
        for xi, name in zip(x, component_names):
            #print(f"Backward ingredient coeffs - {name}: {xi}")
            if name not in component_solved_coeffs:
                component_solved_coeffs[name] = [xi]
            else:
                component_solved_coeffs[name].append(xi)
        if updated_ings == []:
            for cing in changed_ings:
                if cing["name"] in component_solved_coeffs:
                    updated_ing = {}
                    updated_ing["name"] = cing["name"]
                    xi = component_solved_coeffs[cing["name"]].pop(0)
                    updated_ing['quantity'] = round(0.2 * cing['quantity'] * np.abs(xi)) / 0.2
                    updated_ing['unit'] = "g"
                    if 'original_unit' in cing:
                        updated_ing['original_unit'] = cing['original_unit']
                        updated_ing['equivalentInGrams'] = cing['equivalentInGrams']
                else:
                    updated_ing = cing
                updated_ings.append(updated_ing)
        else:
            twice_updated_ings = []
            for uing in updated_ings:
                if uing["name"] in component_solved_coeffs:
                    updated_ing = {}
                    updated_ing["name"] = uing["name"]
                    xi = component_solved_coeffs[uing["name"]].pop(0)
                    updated_ing['quantity'] = round(0.2 * uing['quantity'] * np.abs(xi)) / 0.2
                    updated_ing['unit'] = "g"
                    if 'original_unit' in uing:
                        updated_ing['original_unit'] = uing['original_unit']
                        updated_ing['equivalentInGrams'] = uing['equivalentInGrams']
                else:
                    updated_ing = uing
                twice_updated_ings.append(updated_ing)
            updated_ings = twice_updated_ings
        updated_state['ingredients'] = remove_nq(updated_ings)
        updated_state['sensory_panel'] = listify_panel_dict(vec_panel(middle_panel_vec))
    return updated_state


if __name__ == "__main__":
    pprint(predict(saved_state, changed_state))
