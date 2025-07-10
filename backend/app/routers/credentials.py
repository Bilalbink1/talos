from fastapi import APIRouter
from app.database import credentials

router = APIRouter()

@router.get("/credentials/", tags=["credentials"])
async def get_credentials():
    return {
        "credentials": credentials
    }