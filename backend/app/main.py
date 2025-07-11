from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import credentials_router

app = FastAPI()

# Configure CORS origins (allow your frontend URL)
origins = [
    "http://localhost:5173",  # React dev server URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],         # Allow all headers
)

app.include_router(credentials_router)