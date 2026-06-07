from ai_engine.intent_detection import detect_customer_intent
from ai_engine.sentiment_analysis import analyze_sentiment
from ai_engine.risk_scoring import calculate_risk


def decide_next_action(intent, risk):


    # High-risk customers
    if risk == "HIGH":

        return "escalate_for_manual_follow_up"


    # Medium-risk customers
    elif risk == "MEDIUM":

        return "schedule_follow_up"


    # Low-risk customers
    elif risk == "LOW":

        return "continue_monitoring"


    # Default fallback
    else:

        return "review_required"



# Test section
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")

        if customer_input.lower() == "exit":
            break


        # Detect intent
        intent = detect_customer_intent(customer_input)


        # Analyze sentiment
        sentiment = analyze_sentiment(customer_input)


        # Calculate risk
        risk = calculate_risk(intent, sentiment)


        # Decide workflow action
        next_action = decide_next_action(intent, risk)


        # Display results
        print("\nIntent:")
        print(intent)

        print("\nSentiment:")
        print(sentiment)

        print("\nRisk Level:")
        print(risk)

        print("\nNext Action:")
        print(next_action)