from fastapi import APIRouter
from ai_engine.analytics_engine import generate_analytics

router = APIRouter()

@router.get("/call-analytics")
def get_call_analytics():
    return generate_analytics()