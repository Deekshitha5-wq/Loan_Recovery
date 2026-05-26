from fastapi import APIRouter
from pydantic import BaseModel

from ai_engine.groq_engine import generate_response
from ai_engine.intent_detection import detect_customer_intent
from ai_engine.sentiment_analysis import analyze_sentiment
from ai_engine.risk_scoring import calculate_risk
from ai_engine.decision_engine import decide_next_action


# Create router
router = APIRouter()


# Request model
class CustomerMessage(BaseModel):

    message: str


# Main AI analysis endpoint
@router.post("/analyze")


def analyze_customer_interaction(data: CustomerMessage):


    customer_message = data.message


    # Generate AI response
    ai_response = generate_response(customer_message)


    # Detect intent
    intent = detect_customer_intent(customer_message)


    # Analyze sentiment
    sentiment = analyze_sentiment(customer_message)


    # Calculate risk
    risk = calculate_risk(intent, sentiment)


    # Decide next action
    next_action = decide_next_action(intent, risk)


    # Return structured response
    return {

        "customer_message": customer_message,

        "ai_response": ai_response,

        "intent": intent,

        "sentiment": sentiment,

        "risk_level": risk,

        "next_action": next_action
    }