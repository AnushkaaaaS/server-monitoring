from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, schemas, models
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/servers/", response_model=schemas.Server)
def create_server(server: schemas.ServerCreate, db: Session = Depends(get_db)):
    return crud.create_server(db=db, server=server)

@app.get("/servers/", response_model=list[schemas.Server])
def read_servers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_servers(db, skip=skip, limit=limit)

@app.get("/metrics/{server_id}", response_model=list[schemas.ServerMetrics])
def read_metrics(server_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_metrics(db, server_id=server_id, skip=skip, limit=limit)