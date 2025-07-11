from fastapi import HTTPException
from app.database import get_user_json
from app.models.users import User

def get_user_rsa_key_pair(user_id: int) -> tuple[str, str]:
    """
    Retrvies the users Public and Private Key pair from the user's sample data

    Args:
        user_id: The unique identifier of the user whose key pair is requested.

    Returns:
        - public_key: The users public key as string
        - private_key The users private key as string
    """

    # convert user_id to string in order to use it as a key for the users JSON
    user_id = str(user_id)

    users: list[User] = get_user_json()

    if user_id not in users:
        raise HTTPException(status_code=404, detail=f"User with id {user_id} not found")
    
    user = users.get(user_id)

    public_key = user.get("public_key")
    private_key = user.get("private_key")

    return public_key, private_key