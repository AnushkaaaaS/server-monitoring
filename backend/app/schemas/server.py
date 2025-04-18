from pydantic import BaseModel
from datetime import datetime

class ServerBase(BaseModel):
    name: str
    ip_address: str
    tag: str
    provider: str

class ServerCreate(ServerBase):
    pass

class Server(ServerBase):
    id: int
    created_at: datetime
    status: str
    
    class Config:
        orm_mode = True