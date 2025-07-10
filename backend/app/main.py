from fastapi import FastAPI
from app.routers import credentials_router

app = FastAPI()

app.include_router(credentials_router)