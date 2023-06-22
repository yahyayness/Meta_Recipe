import random
import string
import pandas as pd


def generate_random_string(length=5):
    return random.choices(string.ascii_uppercase, k=length)


def prepare_model_dict(idict, attrs):
    data_dict = {}
    for attr in attrs:
        if attr in idict:
            if not pd.isna(idict[attr]):
                data_dict[attr] = idict[attr].strip() if isinstance(idict[attr], str) else idict[attr]
    return data_dict
