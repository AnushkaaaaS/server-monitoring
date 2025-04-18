from sqlalchemy import Column, Integer, String, DateTime, Enum
from .base import Base
import datetime

class Server(Base):
    __tablename__ = "servers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    ip_address = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    tag = Column(String)
    provider = Column(String)
    status = Column(Enum("online", "offline", "maintenance", name="server_status"), default="online")