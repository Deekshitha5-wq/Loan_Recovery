import os

from groq import Groq
from dotenv import load_dotenv

from ai_engine.prompts import LOAN_AGENT_PROMPT


# Load .env variables
load_dotenv()


# Create Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# Generate AI response dynamically
def generate_response(customer_message):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",
                "content": LOAN_AGENT_PROMPT
            },

            {
                "role": "user",
                "content": customer_message
            }
        ],

        temperature=0.3
    )

    return completion.choices[0].message.content


# Dynamic interaction loop
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")

        if customer_input.lower() == "exit":
            break

        ai_response = generate_response(customer_input)

        print("\nAI Agent:")
        print(ai_response)