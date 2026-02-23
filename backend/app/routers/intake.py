from fastapi import APIRouter
from pydantic import BaseModel
from app.services.nlp_engine import process_patient_input

router = APIRouter(prefix="/intake", tags=["Clinical Intake"])

class IntakeRequest(BaseModel):
    patient_text: str

@router.post("/analyze")
def analyze_intake(request: IntakeRequest):
    return process_patient_input(request.patient_text)