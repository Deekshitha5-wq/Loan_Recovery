from datetime import datetime

def save_log(user_text, ai_reply):

    with open("conversation_logs.txt", "a") as file:

        file.write(f"""
Time: {datetime.now()}

Customer: {user_text}

AI: {ai_reply}

-------------------------
""")