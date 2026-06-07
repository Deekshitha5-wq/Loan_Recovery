from fastapi import FastAPI
from backend.voice_ai.voice_routes import router as voice_router
from backend.routes import router as backend_router

app = FastAPI()

app.include_router(voice_router)
app.include_router(backend_router)