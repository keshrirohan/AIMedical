# Medical Summarization Challenge – NeuroSpartans

Team Members:

- Chetan Thakur
- Ansh Sharma
- Rohan Keshri
- Ashmit Singh

## Overview

Built a custom model for perspective-aware medical summaries from Q&A pairs.
Outputs:

- Patient-Friendly: Simple, actionable language
- Clinician-Focused: Detailed, medically precise
  No external APIs or pre-built LLMs used. Delivered via a web application.

## Problem

- Lightweight model without external APIs
- Dual-perspective summaries
- Safety disclaimers & provenance tracking
- Web accessibility

## Solution

Workflow:

1. Input PDFs, notes, or Q&A pairs
2. OCR & text preprocessing
3. Section classification (Symptoms, Diagnosis, Treatment)
4. Summarization (Patient & Clinician perspectives)
5. Post-processing with safety disclaimers
6. Browser-based deployment

## Evaluation

- Readability (Patient)
- Medical Accuracy (Clinician)
- Human evaluation

## Impact

- Patients: Clear understanding, reduced anxiety
- Clinicians: Time-saving, reliable summaries
- Healthcare systems: Improved communication & efficiency

## Future Scope

- Multilingual support
- Voice-based summaries
- Real-time updates & interactive Q&A

## Revenue Model

- Subscriptions
- Ads & sponsored content
- Consulting & B2B healthcare integration

## Journey

- OCR and medical text preprocessing
- Designing dual-perspective summarization model
- Lightweight web deployment
- Team collaboration & iterative development

## Conclusion

NeuroSpartans presents a reliable, accessible, and dual-perspective medical summarization solution for patients and clinicians.

## Project Structure

Backend: FastAPI + Python
Frontend: React + Tailwind CSS

## Run Locally:

cd backend
uvicorn api:app --reload --host 0.0.0.0 --port 5000

cd frontend
npm run dev
