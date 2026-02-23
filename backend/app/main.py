from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import intake

app = FastAPI(
    title="LinguaBridge Health",
    description="Urdu–English AI Clinical Intake Engine",
    version="0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(intake.router)