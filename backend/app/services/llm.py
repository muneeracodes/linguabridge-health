import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# 1. CRITICAL FIX: We must point the base_url to Groq!
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1" 
)

def call_llm(raw_text, extracted_terms):
    prompt = f"""
    Patient narrative (Urdu-English mixed):
    "{raw_text}"
    
    Database matched terms:
    {extracted_terms}
    
    Generate a highly structured clinical summary. 
    You MUST return ONLY a valid JSON object with exactly these keys:
    {{
        "chiefComplaint": "string (main issue)",
        "onset": "string (when/how it starts)",
        "associatedSymptoms": "string (e.g., 'Shortness of breath')",
        "clinicalPhrase": "string (formal medical term)"
    }}
    """
    
    response = client.chat.completions.create(
        # 2. CRITICAL FIX: We must use a Groq model, not gpt-4o-mini
        model="llama-3.1-8b-instant", 
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={ "type": "json_object" }
    )
    
    content = response.choices[0].message.content
    return json.loads(content)