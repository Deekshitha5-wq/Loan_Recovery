import json
import os


LOG_FILE = "interaction_logs.json"


def save_interaction(data):


    # Check if file exists
    if not os.path.exists(LOG_FILE):

        with open(LOG_FILE, "w") as file:

            json.dump([], file)


    # Read existing logs
    with open(LOG_FILE, "r") as file:

        logs = json.load(file)


    # Append new interaction
    logs.append(data)


    # Save updated logs
    with open(LOG_FILE, "w") as file:

        json.dump(logs, file, indent=4)