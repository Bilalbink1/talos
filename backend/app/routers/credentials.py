from fastapi import APIRouter, HTTPException
from uuid import UUID
from app.services.credentials import (
    get_user_credential, 
    get_user_credentials, 
    add_new_credential, 
    delete_user_credential, 
    verify_user_credential
)
from app.models.credentials import Credentials, CredentialsCreate

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

    add_new_credential(user_id, credential)

    return {
        "msg": "Credential created succesfully!"
    }

    
@router.delete("/users/{user_id}/credentials/{credential_id}", tags=["credentials"])
def delete_credential(user_id: int, credential_id: UUID):

    delete_user_credential(user_id, credential_id)

    return {
        "mgs": "Credential deleted succesfully!"
    }


@router.post("/credentials/verify", tags=["credentials"])
def verify_credential(credential: Credentials):

    is_credential_valid = verify_user_credential(credential)

    return {
        "is_valid": is_credential_valid
    }