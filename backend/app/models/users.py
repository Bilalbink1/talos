from pydantic import BaseModel

class User(BaseModel):
    username: int
    private_key: str
    public_key: dict