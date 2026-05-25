from fastapi import FastAPI
from voice_ai.voice_routes import router as voice_router
from backend.routes import router as backend_router
from database.db import Base, engine
from database import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(voice_router)
app.include_router(backend_router)