from fastapi import APIRouter, HTTPException

from schemas import (
    StartAgentRequest,
    ProcessInputRequest,    
    LogRequest
)
from services import (
    start_agent_service,
    process_input_service,
    generate_response_service,
    log_interaction_service,
    get_interactions_service,
    get_call_logs_service,
    get_status_service,
)

from ai_engine.analytics_engine import generate_analytics, get_analytics


router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Loan Recovery Agent Backend is running"
    }


@router.post("/start-agent")
def start_agent(request: StartAgentRequest):
    try:
        return start_agent_service(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/process-input")
def process_input(request: ProcessInputRequest):
    try:
        return process_input_service(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-response")
def generate_response(request: ProcessInputRequest):
    try:
        return generate_response_service(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/log")
def log_interaction(request: LogRequest):
    try:
        return log_interaction_service(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/interactions")
def get_interactions():
    try:
        return get_interactions_service()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/call-logs")
def get_call_logs():
    try:
        return get_call_logs_service()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
def get_status():
    try:
        return get_status_service()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# AI Analytics Integration
# -----------------------------

@router.get("/analytics")
def analytics():
    try:
        return generate_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/ai-analytics")
def ai_analytics():
    return get_analytics()
    