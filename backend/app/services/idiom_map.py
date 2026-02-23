import json
import os

# Create the absolute path to your 55.json file
DATA_PATH = os.path.join(os.path.dirname(__file__), "../../data/55.json")

def load_idiom_data():
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading 55.json: {e}")
        return []

# This variable now holds your entire JSON array
IDIOM_DATA = load_idiom_data()