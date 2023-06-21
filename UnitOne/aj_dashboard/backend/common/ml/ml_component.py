import os


def predict(saved_state, changed_state):
    import numpy as np
    import pandas as pd
    import pickle
    import sklearn
    from copy import deepcopy
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'FlavorGraph Node Embedding.pickle'), 'rb') as file:
        fg_data = pickle.load(file)

    def load_fwd_model(filepath='save.pkl'):
        neigh = pickle.load(open(os.path.join(__location__, 'save.pkl'), "rb"))
        # placeholder
        return None

    nodes = pd.read_csv(os.path.join(__location__, 'nodes_191120.csv'))
    fwd_model = load_fwd_model()

    def predict_fwd(fwd_model, saved_state, changed_state):
        def to_nearest(num, decimal):
            return round(num / decimal) * decimal

        fwd_updated_state = deepcopy(changed_state)
        saved_ings = saved_state["ingredients"]
        changed_ings = changed_state["ingredients"]
        updated_ings = []
        if len(saved_ings) == len(changed_ings):
            for ing_x, ing_y in zip(saved_ings, changed_ings):
                # Random modification in lieu of trained model
                if ing_x["name"] != ing_y["name"] or ing_x["quantity"] != ing_y["quantity"]:
                    temp_ing = ing_y
                    temp_ing["quantity"] = round(0.5 * temp_ing["quantity"] * (np.abs(1 + np.random.normal()))) / 0.5
                    i = np.random.choice(12)
                    fwd_updated_state["sensory_panel"][i]["value"] = round(
                        2 * int(fwd_updated_state["sensory_panel"][i]["value"]) * (1 + np.random.normal())) / 2
                    fwd_updated_state["sensory_panel"][i]["updated"] = "True"
                    if fwd_updated_state["sensory_panel"][i]["value"] < 0.0:
                        fwd_updated_state["sensory_panel"][i]["value"] = 0.0
                    elif fwd_updated_state["sensory_panel"][i]["value"] > 10.0:
                        fwd_updated_state["sensory_panel"][i]["value"] = 10.0
                    updated_ings.append(temp_ing)
                else:
                    updated_ings.append(ing_y)
            fwd_updated_state["ingredients"] = updated_ings
        return fwd_updated_state

    updated_state = predict_fwd(fwd_model, saved_state, changed_state)
    return updated_state
