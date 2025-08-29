from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json, os, faiss
from sentence_transformers import SentenceTransformer

# ---------------- Paths ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VECTOR_STORE_FILE = os.path.join(BASE_DIR, "vector_store", "faiss_index.bin")
DATASET_FILE = os.path.join(BASE_DIR, "vector_store", "dataset.json")
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 1

# ---------------- Load resources ----------------
if not os.path.exists(VECTOR_STORE_FILE):
    raise FileNotFoundError(f"{VECTOR_STORE_FILE} not found! Run build_index.py first.")

index = faiss.read_index(VECTOR_STORE_FILE)

with open(DATASET_FILE, "r", encoding="utf-8") as f:
    dataset = json.load(f)

model = SentenceTransformer(EMBEDDING_MODEL)

# ---------------- FastAPI app ----------------
app = FastAPI(title="Medical Q&A API")

# Allow CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for security
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Request model ----------------
class QuestionRequest(BaseModel):
    question: str

# ---------------- API route ----------------
@app.post("/get_answers")
async def get_answers(request: QuestionRequest):
    try:
        q_emb = model.encode([request.question], convert_to_numpy=True)
        D, I = index.search(q_emb, TOP_K)
        idx = I[0][0]
        entry = dataset[idx]
        return {
            "patientAnswer": entry.get("patient_answer", ""),
            "doctorAnswer": entry.get("doctor_answer", "")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
