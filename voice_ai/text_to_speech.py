import pyttsx3

def speak_text(text):

    engine = pyttsx3.init()

    engine.setProperty('rate', 150)

    voices = engine.getProperty('voices')

    engine.setProperty('voice', voices[0].id)

    print("Speaking...")

    engine.say(text)

    engine.runAndWait()

    engine.stop()