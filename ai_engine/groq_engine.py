import os

from groq import Groq
from dotenv import load_dotenv

from ai_engine.prompts import LOAN_AGENT_PROMPT

from ai_engine.conversation_memory import (
    add_conversation,
    get_conversation_history
)


# Load environment variables
load_dotenv()


# Create Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# Generate AI response
def generate_response(customer_message):


    # Store customer message in memory
    add_conversation("customer", customer_message)


    # Build conversation history
    messages = [

        {
            "role": "system",
            "content": LOAN_AGENT_PROMPT
        }
    ]


    # Add previous conversation history
    for item in get_conversation_history():

        if item["role"] == "customer":

            messages.append({

                "role": "user",
                "content": item["message"]
            })

        else:

            messages.append({

                "role": "assistant",
                "content": item["message"]
            })


    # Generate Groq response
    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=messages,

        temperature=0.3
    )


    # Extract AI response
    ai_response = completion.choices[0].message.content


    # Store AI response in memory
    add_conversation("agent", ai_response)


    return ai_response



# Test section
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")

        if customer_input.lower() == "exit":
            break


        response = generate_response(customer_input)


        print("\nAI Agent:")
        print(response)