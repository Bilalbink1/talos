from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from datetime import datetime, timezone
from app.services.crypto import generate_signature
from app.services.credentials import get_user_credential, get_user_credentials, add_new_credential, delete_user_credential
from app.models.credentials import CredentialsCreate, Credentials

router = APIRouter()

@router.get("/users/{user_id}/credentials", tags=["credentials"])
def get_credentials(user_id: int):

    credentials = get_user_credentials(user_id)

    return {
        "credentials": credentials
    }


@router.get("/users/{user_id}/credentials/{credential_id}", tags=["credentials"])
def get_credential(user_id: int, credential_id: UUID):
    
    credential = get_user_credential(user_id, credential_id)

    if not credential:
        return HTTPException(status_code=404, detail="Credential does not exist.")
    
    return {
        "credential": credential
    }


@router.put("/users/{user_id}/credentials", tags=["credentials"])
def create_credential(user_id: int, credential: CredentialsCreate):

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

    add_new_credential(full_credential)

    return {
        "msg": "Credential created succesfully!"
    }

    
@router.delete("/users/{user_id}/credentials/{credential_id}", tags=["credentials"])
def delete_credential(user_id: int, credential_id: UUID):

    delete_user_credential(user_id, credential_id)

    return {
        "mgs": "Credential deleted succesfully!"
    }
