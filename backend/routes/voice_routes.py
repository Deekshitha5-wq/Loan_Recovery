from fastapi import APIRouter

router = APIRouter()


@router.get("/voice-agent")
def voice_agent_status():

    return {
        "status": "AI Voice Agent Ready",
        "language": "English",
        "voice": "Female",
        "accent": "Indian"
    }