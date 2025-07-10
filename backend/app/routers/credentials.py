from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from datetime import datetime, timezone
from app.services.crypto import generate_signature
from app.database import credentials, save_credentials
from app.models.credentials import CredentialsCreate, Credentials

router = APIRouter()

@router.get("/user/{user_id}/credentials/", tags=["credentials"])
def get_credentials():
    return {
        "credentials": credentials
    }


@router.get("/user/{user_id}/credentials/{credential_id}/", tags=["credentials"])
def get_credentials(credential_id: UUID):
    
    credential = next(credential for credential in credentials if credential["id"] == str(credential_id))

    if not credential:
        return HTTPException(status_code=404, detail="Credential does not exist.")
    
    return {
        "credential": credential
    }


@router.put("/user/{user_id}/credentials/", tags=["credentials"])
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

    credentials.append(full_credential.model_dump())

    save_credentials(credentials)

    return {
        "msg": "Credential created succesfully!"
    }

    
    
    