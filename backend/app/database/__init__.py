import json
from pathlib import Path
from app.models.credentials import Credentials
from app.models.users import User

BASE_DIR = Path(__file__).parent

def load_json(filename):
    with open(BASE_DIR / filename, 'r') as f:
        return json.load(f)

def get_credentials_json():
    credentials: list[Credentials] = load_json('credentials.json')
    return credentials

def get_user_json():
    users: User = load_json('users.json')
    return users
