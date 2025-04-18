from pydantic import BaseModel
from datetime import datetime

class MetricsBase(BaseModel):
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    network_in: float
    network_out: float
    alerts: int
    alert_level: str

class MetricsCreate(MetricsBase):
    server_id: int

class ServerMetrics(MetricsBase):
    id: int
    server_id: int
    timestamp: datetime
    
    class Config:
        orm_mode = True