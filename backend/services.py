from voice_ai.call_flow import generate_response
from database.crud import (
    create_interaction,
    get_interactions,
    create_log,
    get_logs,
)

def start_agent_service(request):
    return {
        "message": f"Agent started for user {request.user_id}"
    }


def process_input_service(request):
    ai_reply = generate_response(request.message)

    # Save interaction
    create_interaction(request.user_id, request.message, ai_reply)

    return {
        "user_text": request.message,
        "ai_reply": ai_reply,
        "status": "processed"
    }


def generate_response_service(request):
    ai_reply = generate_response(request.message)

    return {
        "ai_reply": ai_reply
    }


def log_interaction_service(request):
    create_log(
        request.user_id,
        request.user_text,
        request.ai_reply,
        request.status
    )

    return {
        "message": "Log saved successfully"
    }


def get_interactions_service():
    return get_interactions()


def get_call_logs_service():
    return get_logs()


def get_status_service():
    return {
        "status": "Agent running"
    }