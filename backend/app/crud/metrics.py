from sqlalchemy.orm import Session
from app.models.metrics import ServerMetrics
from app.schemas.metrics import MetricsCreate

def get_metrics(db: Session, server_id: int, skip: int = 0, limit: int = 100):
    return db.query(ServerMetrics).filter(ServerMetrics.server_id == server_id).offset(skip).limit(limit).all()

def create_metrics(db: Session, metrics: MetricsCreate):
    db_metrics = ServerMetrics(**metrics.dict())
    db.add(db_metrics)
    db.commit()
    db.refresh(db_metrics)
    return db_metrics