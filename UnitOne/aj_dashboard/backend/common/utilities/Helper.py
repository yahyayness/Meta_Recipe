import random
import string


def generate_random_string(length=5):
    return random.choices(string.ascii_uppercase, k=length)