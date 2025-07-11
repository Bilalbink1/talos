
from fastapi import HTTPException
from uuid import UUID, uuid4
from datetime import datetime, timezone
from app.database import credentials
from app.models.credentials import Credentials, CredentialsCreate
from app.services.database import save_credentials_to_json_file
from app.services.crypto import generate_signature, verify_signature


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


def add_new_credential(user_id: int, credential: CredentialsCreate) -> None:
    """
    Adds the newly created credentials to the users credentials list.
    Checks if the user exists for the given user ID.
    If the user exists, the credential is serialized and appended to the users credentials list.

    Args:
        user_id: The unique identifier for the user.
        credential: The new credential to add
    """

    # generate the signature for the credential payload
    signature = generate_signature(user_id, credential.payload)

    # create the credential object by adding:
    # 1. a uuid as id
    # 2. the id of the user as issuer_id, this will be used to retrvie the Public key for verification of the payload
    # 2. the created date
    # 3. the digital signature
    full_credential = Credentials(
        id=uuid4(),
        issuer_id=user_id,
        created_date=datetime.now(timezone.utc),
        signature=signature,
        **credential.model_dump()
    )

    if user_id not in credentials:
        return HTTPException(status_code=400, detail="User does not exist.")
        

    # Serialize the credential model to a dict 
    credentials.get(str(user_id)).append(full_credential.model_dump())

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