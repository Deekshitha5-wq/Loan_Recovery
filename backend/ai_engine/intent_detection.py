def detect_customer_intent(text):

    text = text.lower()


    # Financial difficulty
    if (
        "cannot pay" in text or
        "can't pay" in text or
        "not able to pay" in text or
        "financial problem" in text or
        "no money" in text
    ):

        return "financial_difficulty"


    # Payment status update
    elif (
        "already paid" in text or
        "paid yesterday" in text or
        "payment done" in text
    ):

        return "payment_status_update"


    # Incorrect contact
    elif "wrong number" in text:

        return "incorrect_contact"


    # Follow-up request
    elif (
        "call later" in text or
        "call tomorrow" in text or
        "next week" in text or
        "later" in text
    ):

        return "follow_up_request"


    # Payment discussion
    elif (
        "pay" in text or
        "payment" in text or
        "emi" in text or
        "amount" in text
    ):

        return "payment_discussion"


    # General customer query
    else:

        return "general_query"



# Test section
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")

        if customer_input.lower() == "exit":
            break


        intent = detect_customer_intent(customer_input)

        print("\nIntent:")
        print(intent)