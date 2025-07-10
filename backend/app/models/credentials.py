from pydantic import BaseModel
from uuid import UUID
from datetime import datetime 

class CredentialsCreate(BaseModel):
    name: str
    description: str
    payload: dict

class Credentials(BaseModel):
    id: UUID
    issuer_id: int
    name: str
    description: str
    payload: dict
    signature: dict
    created_date: datetime