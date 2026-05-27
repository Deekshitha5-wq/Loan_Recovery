from fastapi import APIRouter

from voice_ai.speech_to_text import convert_speech_to_text
from voice_ai.call_flow import generate_response

router = APIRouter()

@router.get("/voice-agent")

def voice_agent():

    user_text = convert_speech_to_text()

    ai_reply = generate_response(user_text)

    return {
        "customer_text": user_text,
        "ai_reply": ai_reply
    }