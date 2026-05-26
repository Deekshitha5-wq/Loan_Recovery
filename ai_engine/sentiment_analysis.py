from textblob import TextBlob


def analyze_sentiment(text):

    text_lower = text.lower()


    # Negative financial/stress indicators
    negative_keywords = [

        "cannot pay",
        "can't pay",
        "not able to pay",
        "financial problem",
        "no money",
        "loss",
        "lost job",
        "problem",
        "issue",
        "difficult",
        "delay",
        "late payment",
        "not possible"

    ]


    # Positive/cooperative indicators
    positive_keywords = [

        "thank you",
        "will pay",
        "payment done",
        "already paid",
        "paid",
        "okay",
        "sure",
        "confirmed"

    ]


    # Check negative keywords first
    for word in negative_keywords:

        if word in text_lower:

            return "negative"


    # Check positive keywords
    for word in positive_keywords:

        if word in text_lower:

            return "positive"


    # Fallback to TextBlob
    analysis = TextBlob(text)

    polarity = analysis.sentiment.polarity


    if polarity > 0:

        return "positive"


    elif polarity < 0:

        return "negative"


    else:

        return "neutral"



# Test section
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")

        if customer_input.lower() == "exit":
            break


        sentiment = analyze_sentiment(customer_input)

        print("\nSentiment:")
        print(sentiment)