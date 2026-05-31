from backend.voice_ai.speech_to_text import convert_speech_to_text
from backend.voice_ai.call_flow import generate_response
from backend.voice_ai.text_to_speech import speak_text

user_text = convert_speech_to_text()

reply = generate_response(user_text)

print("AI:", reply)

speak_text(reply)