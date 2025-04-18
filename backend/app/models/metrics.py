from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .base import Base
import datetime

class ServerMetrics(Base):
    __tablename__ = "server_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    cpu_usage = Column(Float)
    memory_usage = Column(Float)
    disk_usage = Column(Float)
    network_in = Column(Float)
    network_out = Column(Float)
    alerts = Column(Integer)
    alert_level = Column(Enum("critical", "medium", "low", name="alert_level"))
    
    server = relationship("Server", back_populates="metrics")

# Add to Server model (in server.py)
Server.metrics = relationship("ServerMetrics", order_by=ServerMetrics.timestamp, back_populates="server")