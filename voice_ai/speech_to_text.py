import speech_recognition as sr

def convert_speech_to_text():

    recognizer = sr.Recognizer()

    with sr.Microphone() as source:

        print("Listening...")

        recognizer.adjust_for_ambient_noise(source)

        audio = recognizer.listen(source)

    try:

        text = recognizer.recognize_google(audio)

        print("Customer:", text)

        return text

    except Exception as e:

        print("Error:", e)

        return ""