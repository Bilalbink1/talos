from fastapi import APIRouter, HTTPException
from uuid import UUID, uuid4
from datetime import datetime, timezone
from app.database import credentials
from app.models.credentials import CredentialsCreate, Credentials
from app.services.crypto import generate_signature

router = APIRouter()

@router.get("/credentials/", tags=["credentials"])
def get_credentials():
    return {
        "credentials": credentials
    }

@router.get("user/{user_id}/credentials/{credential_id}", tags=["credentials"])
def get_credentials(credential_id: UUID):
    if credential_id not in credentials:
        return HTTPException(status_code=404, detail="Credential does not exist.")
    
    return {
        "credential": credentials.get(credential_id)
    }

@router.put("user/{user_id}//credential/", tags=["credentials"])
def create_credential(user_id: int, credential: CredentialsCreate):
    print(credential)

    full_credential = Credentials(
        id=uuid4(),
        issuer_id=user_id,
        created_date=datetime.now(timezone.utc),
        signature=generate_signature(user_id, credential["payload"])
        **credential.model_dump()
    )

    
    
    