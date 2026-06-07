# Store conversation history temporarily

conversation_history = []


def add_conversation(role, message):

    conversation_history.append({

        "role": role,
        "message": message

    })


def get_conversation_history():

    return conversation_history


def clear_conversation_history():

    conversation_history.clear()



# Test section
if __name__ == "__main__":

    add_conversation("customer", "I will pay tomorrow")

    add_conversation("agent", "Your response has been noted.")

    history = get_conversation_history()

    print("\nConversation History:\n")

    for item in history:

        print(item)