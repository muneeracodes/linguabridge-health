# LinguaBridge Health

Real-time multilingual communication platform for healthcare settings —
bridges the language gap between patients and providers using NLP translation
and medical terminology support.

**Motivation:** 25% of patients in multilingual regions report communication
errors with healthcare providers due to language barriers. This tool is built
to close that gap.

---

## Architecture

Patient (non-English input)
│
▼
React frontend (voice/text input)
│
▼
FastAPI / Node backend (request routing)
│
▼
NLP Translation layer (medical-context aware)
│
▼
Medical terminology validator
│
▼
Provider dashboard (real-time translated output)


---

## Stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript · React |
| Backend | Python · Node.js |
| Translation | NLP translation API (medical context) |
| Styling | CSS |

---

## Key features

- Real-time patient-to-provider translation
- Medical terminology awareness — avoids mistranslation of clinical terms
- Supports multiple languages relevant to South Asian healthcare contexts
- Clean provider dashboard for rapid clinical communication

---

## Setup

```bash
git clone https://github.com/muneeracodes/linguabridge-health.git
cd linguabridge-health

# Backend
cd backend && pip install -r requirements.txt && python app.py

# Frontend
cd ../frontend && npm install && npm run dev
```

---

## Planned extensions

- Integration with hospital EMR systems
- Voice-to-voice real-time translation mode
- Offline model support for low-connectivity clinical settings
