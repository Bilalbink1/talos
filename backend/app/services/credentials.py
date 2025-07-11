
from uuid import UUID
from fastapi import HTTPException
from app.database import credentials
from app.models.credentials import Credentials
from app.services.database import save_credentials_to_json_file

def get_user_credentials(user_id: int) -> list[Credentials]:
    """
    Retrieves all credentials for the given user ID.

    Args:
        user_id: The unique identifier of the user whose credentials are requested.

    Return:
        credentials: The list of credentials of the user
    """

    # Default to an empty array if no credentials exist for the user_id
    user_credentials = credentials.get(str(user_id), [])

    return user_credentials


def get_user_credential(user_id: int, credential_id: UUID) -> Credentials:
    """
    Retrieves the credential for the given user ID and credential ID.

    Args:
        user_id: The unique identifier of the user whose credential is requested.
        credential_id: The unique identifier of the credentials which is requested.


    Return:
        credentials: The list of credentials of the user
    """

    # Default to an empty array if no credentials exist for the user_id
    user_credentials = credentials.get(str(user_id), [])
    
    # Find the credential by matching the credential's id
    credential = next((credential for credential in user_credentials if credential["id"] == str(credential_id)), None)

    if not credential:
        return HTTPException(status_code=400, detail="User does not exist.")

    return credential


def add_new_credential(user_id: int, new_credential: Credentials) -> None:
    """
    Adds the newly created credentials to the users credentials list.
    Checks if the user exists for the given user ID.
    If the user exists, the credential is serialized and appended to the users credentials list.

    Args:
        user_id: The unique identifier for the user.
        new_credential: The new credential to add
    """

    if user_id not in credentials:
        return HTTPException(status_code=400, detail="User does not exist.")
        

    # Serialize the credential model to a dict 
    credentials.get(str(user_id)).append(new_credential.model_dump())

    save_credentials_to_json_file(credentials)


def delete_user_credential(user_id: int, credential_id: UUID) -> None:
    """
    Deletes the credential for the given user and credential ID.

    Args:
        user_id: The unique identifier of the user.
        credential_id: The unique identifier of the credentials which is requested.
    """

    user_credentials = get_user_credentials(user_id)

    user_credentials = [credential for credential in user_credentials if credential["id"] != str(credential_id)]

    credentials[str(user_id)] = user_credentials
    
    save_credentials_to_json_file(credentials)


