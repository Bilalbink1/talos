import json
from pathlib import Path


def save_credentials_to_json_file(new_credentials: dict) -> None:
    """
    Replaces the existing credentials.json file with the new value

    Args:
        new_credentials: The new JSON value for credentials.json
    """
    BASE_DIR = Path(__file__).parent.parent

    new_credentials_json_str = json.dumps(new_credentials, indent=2, default=str)
    
    with open(BASE_DIR / "database/credentials.json", 'w') as f:
        f.write(new_credentials_json_str)