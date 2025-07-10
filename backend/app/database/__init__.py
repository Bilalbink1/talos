import json
from pathlib import Path

BASE_DIR = Path(__file__).parent

def load_json(filename):
    with open(BASE_DIR / filename, 'r') as f:
        return json.load(f)

users = load_json('users.json')
credentials = load_json('credentials.json')