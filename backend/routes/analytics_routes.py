from fastapi import APIRouter
from ai_engine.analytics_engine import generate_analytics

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    return generate_analytics()