from datetime import datetime
import uuid

from ai_engine.groq_engine import generate_response
from ai_engine.intent_detection import detect_customer_intent
from ai_engine.sentiment_analysis import analyze_sentiment
from ai_engine.risk_scoring import calculate_risk
from ai_engine.decision_engine import decide_next_action
from ai_engine.analytics_engine import update_analytics
from ai_engine.interaction_logger import save_interaction


def generate_complete_analysis(customer_message):


    # Generate AI response
    ai_response = generate_response(customer_message)


    # Detect customer intent
    intent = detect_customer_intent(customer_message)


    # Analyze sentiment
    sentiment = analyze_sentiment(customer_message)


    # Calculate risk level
    risk = calculate_risk(intent, sentiment)


    # Decide next workflow action
    next_action = decide_next_action(intent, risk)


    # Update analytics
    update_analytics(intent, risk)


    # Generate metadata
    session_id = str(uuid.uuid4())[:8]

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


    # Final structured response
    result = {

        "session_id": session_id,

        "timestamp": timestamp,

        "status": "processed",

        "customer_message": customer_message,

        "ai_response": ai_response,

        "intent": intent,

        "sentiment": sentiment,

        "risk_level": risk,

        "next_action": next_action
    }


    # Save interaction log
    save_interaction(result)


    return result



# Main execution
if __name__ == "__main__":

    print("\n========== AI LOAN RECOVERY AGENT ==========\n")


    while True:

        customer_input = input("Customer: ")


        if customer_input.lower() == "exit":

            print("\nSession Ended.")
            break


        result = generate_complete_analysis(customer_input)


        print("\n========== AI ANALYSIS RESULT ==========\n")


        for key, value in result.items():

            print(f"{key}: {value}")


        print("\n========================================\n")