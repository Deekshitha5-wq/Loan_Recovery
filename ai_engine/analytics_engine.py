analytics_data = {

    "total_interactions": 0,

    "high_risk_cases": 0,

    "medium_risk_cases": 0,

    "low_risk_cases": 0,

    "payment_discussions": 0,

    "follow_up_requests": 0,

    "financial_difficulty_cases": 0
}


def update_analytics(intent, risk_level):


    # Total interactions
    analytics_data["total_interactions"] += 1


    # Risk tracking
    if risk_level == "HIGH":

        analytics_data["high_risk_cases"] += 1


    elif risk_level == "MEDIUM":

        analytics_data["medium_risk_cases"] += 1


    elif risk_level == "LOW":

        analytics_data["low_risk_cases"] += 1


    # Intent tracking
    if intent == "payment_discussion":

        analytics_data["payment_discussions"] += 1


    elif intent == "follow_up_request":

        analytics_data["follow_up_requests"] += 1


    elif intent == "financial_difficulty":

        analytics_data["financial_difficulty_cases"] += 1



def get_analytics():

    return analytics_data



def generate_analytics():

    data = get_analytics()

    return {

        "total_interactions": data["total_interactions"],

        "high_risk_cases": data["high_risk_cases"],

        "medium_risk_cases": data["medium_risk_cases"],

        "low_risk_cases": data["low_risk_cases"],

        "payment_discussions": data["payment_discussions"],

        "follow_up_requests": data["follow_up_requests"],

        "financial_difficulty_cases": data["financial_difficulty_cases"]
    }



# Test section
if __name__ == "__main__":

    update_analytics("payment_discussion", "LOW")

    update_analytics("financial_difficulty", "HIGH")

    update_analytics("follow_up_request", "MEDIUM")


    print("\nAnalytics Summary:\n")

    print(generate_analytics())