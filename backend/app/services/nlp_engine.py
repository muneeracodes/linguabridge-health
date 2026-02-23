from app.services.idiom_map import IDIOM_DATA
from app.services.llm import call_llm

def process_patient_input(text: str):
    matched_terms = []
    explanations = []
    
    # 1. Scan patient text against the 55.json dataset
    lower_text = text.lower()
    for item in IDIOM_DATA:
        phrase = item.get("urdu_phrase", "").lower()
        
        if phrase and phrase in lower_text:
            matched_terms.append(item["clinical_reference_terms"])
            
            # Format the explanation to show the clinical logic and risk factors
            explanations.append(
                f"'{item['urdu_phrase']}' flagged for {item['clinical_reference_terms']}. Risk Note: {item['risk_note']}."
            )
            
    # 2. Remove any duplicate matches (since many phrases map to the same disease)
    matched_terms = list(set(matched_terms))
    explanations = list(set(explanations))
            
    # 3. Get the structured summary from the LLM
    llm_summary = call_llm(text, matched_terms)
    
    # 4. If no idioms matched, provide a fallback
    final_explanation = "\n".join(explanations) if explanations else "Standard clinical narrative processed."
    
    # 5. Return exactly what the React frontend expects
    return {
        "chiefComplaint": llm_summary.get("chiefComplaint", "Unknown"),
        "onset": llm_summary.get("onset", "Not specified"),
        "associatedSymptoms": llm_summary.get("associatedSymptoms", "None"),
        "clinicalPhrase": llm_summary.get("clinicalPhrase", "Unspecified condition"),
        "explanation": final_explanation
    }