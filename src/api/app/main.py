from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from . import models, schemas
from .database import engine, get_db

# Create tables if they don't exist (though they should be created by migrations)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fatec Women API - Python")

@app.get("/")
async def root():
    return {"status": "ok", "data": None, "message": None}

@app.get("/health")
async def health(db: Session = Depends(get_db)):
    try:
        # Simple query to check DB connectivity
        result = db.execute("SELECT NOW()").scalar()
        return {
            "status": "ok", 
            "data": {
                "datetime": datetime.utcnow().isoformat(), 
                "now": str(result)
            }, 
            "message": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/reports", status_code=201, response_model=schemas.ReportResponse)
async def create_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):
    db_report = models.Report(**report.model_dump())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@app.get("/reports", response_model=list[schemas.ReportResponse])
async def read_reports(db: Session = Depends(get_db)):
    return db.query(models.Report).order_by(models.Report.created_at.desc()).all()
