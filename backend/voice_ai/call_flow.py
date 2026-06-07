from groq import Groq
from dotenv import load_dotenv
import os
from ai_engine.response_formatter import generate_complete_analysis

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

conversation_history = [
    {
        "role": "system",
        "content": """
        You are an AI Loan Recovery Agent.

        Rules:
        - Keep replies short
        - Speak politely
        - Ask one question at a time
        - Maximum 2 sentences
        """
    }
]
def generate_response(user_text):
    generate_complete_analysis(user_text)
    print("Analytics Updated")

    conversation_history.append({
        "role": "user",
        "content": user_text
    })

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=conversation_history
    )

    ai_reply = response.choices[0].message.content

    conversation_history.append({
        "role": "assistant",
        "content": ai_reply
    })

    return ai_reply