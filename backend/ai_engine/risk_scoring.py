from ai_engine.sentiment_analysis import analyze_sentiment
from ai_engine.intent_detection import detect_customer_intent


def calculate_risk(intent, sentiment):

    # High-risk situations
    if intent == "financial_difficulty":

        return "HIGH"


    # Medium-risk situations
    elif intent == "follow_up_request":

        return "MEDIUM"


    # Low-risk situations
    elif (
        intent == "payment_discussion"
        or intent == "payment_status_update"
    ):

        return "LOW"


    # Incorrect contact response
    elif intent == "incorrect_contact":

        return "LOW"


    # General queries
    else:

        return "MEDIUM"



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


        # Display results
        print("\nIntent:")
        print(intent)

        print("\nSentiment:")
        print(sentiment)

        print("\nRisk Level:")
        print(risk)