from backend.voice_ai.speech_to_text import convert_speech_to_text
from backend.voice_ai.call_flow import generate_response
from backend.voice_ai.text_to_speech import speak_text
from backend.voice_ai.utils import save_log

print("===================================")
print(" AI Loan Recovery Agent Started ")
print(" Say 'bye' to stop the conversation ")
print("===================================")

while True:

    # Listen to customer voice
    user_text = convert_speech_to_text()

    # If no speech detected
    if user_text == "":
        print("Please speak again...")
        continue

    # Stop condition
    if user_text.lower() in ["bye", "exit", "stop"]:

        goodbye_message = "Thank you. Have a good day."

        print("AI:", goodbye_message)

        speak_text(goodbye_message)

        break

    # Generate AI response
    ai_reply = generate_response(user_text)

    # Print AI response
    print("AI:", ai_reply)

    # Speak AI response
    speak_text(ai_reply)

    # Save conversation log
    save_log(user_text, ai_reply)