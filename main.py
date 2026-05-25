from fastapi import FastAPI
from voice_ai.voice_routes import router

app = FastAPI()

app.include_router(router)