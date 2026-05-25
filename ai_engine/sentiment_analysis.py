from textblob import TextBlob


def analyze_sentiment(text):

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

        print("\nDetected Sentiment:")
        print(sentiment)