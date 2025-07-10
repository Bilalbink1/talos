import json
from pathlib import Path
from .utils import *

BASE_DIR = Path(__file__).parent

def load_json(filename):
    with open(BASE_DIR / filename, 'r') as f:
        return json.load(f)

users: dict = load_json('users.json')
credentials: list = load_json('credentials.json')